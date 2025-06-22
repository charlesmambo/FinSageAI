import React, { useState } from 'react';
import { Plus, DollarSign, TrendingDown, Calendar, Filter, Search, Trash2, Edit, Camera, Receipt } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ExpenseModal } from './ExpenseModal';
import { ReceiptScanner } from './ReceiptScanner';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { Expense } from '../../types';

interface ExpenseOverviewProps {
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  onUpdateExpense: (id: string, expense: Partial<Expense>) => void;
  onDeleteExpense: (id: string) => void;
}

export const ExpenseOverview: React.FC<ExpenseOverviewProps> = ({
  expenses,
  onAddExpense,
  onUpdateExpense,
  onDeleteExpense
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('this-month');

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'housing', label: 'Housing & Rent' },
    { value: 'groceries', label: 'Groceries & Food' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'education', label: 'Education' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'debt', label: 'Debt Payments' },
    { value: 'savings', label: 'Savings & Investments' },
    { value: 'other', label: 'Other' }
  ];

  const periodOptions = [
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'this-year', label: 'This Year' },
    { value: 'all', label: 'All Time' }
  ];

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      housing: '🏠',
      groceries: '🛒',
      transportation: '🚗',
      utilities: '⚡',
      healthcare: '🏥',
      entertainment: '🎬',
      shopping: '🛍️',
      education: '📚',
      insurance: '🛡️',
      debt: '💳',
      savings: '💰',
      other: '📝'
    };
    return icons[category] || '📝';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      housing: 'bg-blue-100 text-blue-700',
      groceries: 'bg-green-100 text-green-700',
      transportation: 'bg-yellow-100 text-yellow-700',
      utilities: 'bg-purple-100 text-purple-700',
      healthcare: 'bg-red-100 text-red-700',
      entertainment: 'bg-pink-100 text-pink-700',
      shopping: 'bg-indigo-100 text-indigo-700',
      education: 'bg-orange-100 text-orange-700',
      insurance: 'bg-gray-100 text-gray-700',
      debt: 'bg-red-100 text-red-700',
      savings: 'bg-green-100 text-green-700',
      other: 'bg-gray-100 text-gray-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const filterExpenses = () => {
    return expenses.filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !filterCategory || expense.category === filterCategory;
      
      // Simple period filtering (you can enhance this based on your needs)
      const matchesPeriod = true; // For now, show all expenses
      
      return matchesSearch && matchesCategory && matchesPeriod;
    });
  };

  const filteredExpenses = filterExpenses();
  
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = filteredExpenses.length > 0 ? totalExpenses / filteredExpenses.length : 0;
  const recurringExpenses = filteredExpenses.filter(expense => expense.isRecurring);
  const scannedExpenses = filteredExpenses.filter(expense => expense.tags?.includes('scanned'));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-error-50 to-error-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-error-700">Total Expenses</p>
              <p className="text-2xl font-bold text-error-900">{formatCurrency(totalExpenses)}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-error-600" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warning-700">Average Expense</p>
              <p className="text-2xl font-bold text-warning-900">{formatCurrency(averageExpense)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-warning-600" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-secondary-50 to-secondary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-700">Recurring Expenses</p>
              <p className="text-2xl font-bold text-secondary-900">{recurringExpenses.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-secondary-600" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-700">Scanned Receipts</p>
              <p className="text-2xl font-bold text-primary-900">{scannedExpenses.length}</p>
            </div>
            <Receipt className="w-8 h-8 text-primary-600" />
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Expense Tracking</h3>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Camera className="w-4 h-4" />}
              onClick={() => setIsScannerOpen(true)}
            >
              Scan Receipt
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsModalOpen(true)}
            >
              Add Expense
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={setSearchTerm}
            icon={<Search className="w-4 h-4" />}
          />
          <Select
            value={filterCategory}
            onChange={setFilterCategory}
            options={categoryOptions}
            placeholder="Filter by category"
          />
          <Select
            value={filterPeriod}
            onChange={setFilterPeriod}
            options={periodOptions}
            placeholder="Filter by period"
          />
        </div>

        {filteredExpenses.length === 0 ? (
          <div className="text-center py-12">
            <TrendingDown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Expenses Found</h4>
            <p className="text-gray-600 mb-4">
              {expenses.length === 0 
                ? "Start tracking your expenses to better manage your budget."
                : "Try adjusting your search or filter criteria."
              }
            </p>
            <div className="flex justify-center space-x-3">
              <Button
                variant="outline"
                icon={<Camera className="w-4 h-4" />}
                onClick={() => setIsScannerOpen(true)}
              >
                Scan Receipt
              </Button>
              <Button
                variant="primary"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => setIsModalOpen(true)}
              >
                Add Expense Manually
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="text-2xl">
                    {getCategoryIcon(expense.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">{expense.description}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(expense.category)}`}>
                        {expense.category}
                      </span>
                      {expense.isRecurring && (
                        <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700">
                          {expense.frequency}
                        </span>
                      )}
                      {expense.tags?.includes('scanned') && (
                        <span className="px-2 py-1 text-xs rounded-full bg-secondary-100 text-secondary-700 flex items-center">
                          <Receipt className="w-3 h-3 mr-1" />
                          Scanned
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{formatDate(expense.date)}</p>
                    {expense.tags && expense.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {expense.tags.filter(tag => tag !== 'scanned').map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(expense.amount)}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Edit className="w-4 h-4" />}
                      onClick={() => {
                        // TODO: Implement edit functionality
                        console.log('Edit expense:', expense.id);
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Trash2 className="w-4 h-4" />}
                      onClick={() => onDeleteExpense(expense.id)}
                      className="text-error-600 hover:text-error-700 hover:bg-error-50"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onAddExpense}
      />

      <ReceiptScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onSubmit={onAddExpense}
      />
    </div>
  );
};