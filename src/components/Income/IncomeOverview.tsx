import React, { useState } from 'react';
import { Plus, DollarSign, Calendar, Edit, Trash2, MoreVertical } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { IncomeModal } from './IncomeModal';
import { formatCurrency } from '../../utils/helpers';
import { IncomeSource } from '../../types';

interface IncomeOverviewProps {
  incomeSources: IncomeSource[];
  onAddIncome: (income: Omit<IncomeSource, 'id'>) => void;
  onUpdateIncome: (id: string, income: Partial<IncomeSource>) => void;
  onDeleteIncome: (id: string) => void;
}

export const IncomeOverview: React.FC<IncomeOverviewProps> = ({
  incomeSources,
  onAddIncome,
  onUpdateIncome,
  onDeleteIncome
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getFrequencyLabel = (frequency: string) => {
    const labels = {
      monthly: 'Monthly',
      weekly: 'Weekly',
      'bi-weekly': 'Bi-weekly',
      annually: 'Annually',
      'one-time': 'One-time'
    };
    return labels[frequency as keyof typeof labels] || frequency;
  };

  const getFrequencyColor = (frequency: string) => {
    const colors = {
      monthly: 'bg-primary-100 text-primary-700',
      weekly: 'bg-success-100 text-success-700',
      'bi-weekly': 'bg-secondary-100 text-secondary-700',
      annually: 'bg-warning-100 text-warning-700',
      'one-time': 'bg-gray-100 text-gray-700'
    };
    return colors[frequency as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const calculateMonthlyTotal = () => {
    return incomeSources.reduce((total, source) => {
      if (!source.isActive) return total;
      
      switch (source.frequency) {
        case 'monthly':
          return total + source.amount;
        case 'weekly':
          return total + (source.amount * 4.33);
        case 'bi-weekly':
          return total + (source.amount * 2.17);
        case 'annually':
          return total + (source.amount / 12);
        case 'one-time':
          return total; // Don't include one-time in monthly calculation
        default:
          return total;
      }
    }, 0);
  };

  const monthlyTotal = calculateMonthlyTotal();
  const activeSourcesCount = incomeSources.filter(source => source.isActive).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-700">Monthly Income</p>
              <p className="text-2xl font-bold text-primary-900">{formatCurrency(monthlyTotal)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-primary-600" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-success-50 to-success-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-success-700">Active Sources</p>
              <p className="text-2xl font-bold text-success-900">{activeSourcesCount}</p>
            </div>
            <Calendar className="w-8 h-8 text-success-600" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-secondary-50 to-secondary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-700">Annual Projection</p>
              <p className="text-2xl font-bold text-secondary-900">{formatCurrency(monthlyTotal * 12)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-secondary-600" />
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Income Sources</h3>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Income
          </Button>
        </div>

        {incomeSources.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Income Sources</h4>
            <p className="text-gray-600 mb-4">Start by adding your income sources to track your earnings.</p>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsModalOpen(true)}
            >
              Add Your First Income Source
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {incomeSources.map((source) => (
              <div
                key={source.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{source.source}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getFrequencyColor(source.frequency)}`}>
                        {getFrequencyLabel(source.frequency)}
                      </span>
                      {!source.isActive && (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 capitalize">{source.category}</p>
                    {source.nextPayment && (
                      <p className="text-sm text-gray-500">
                        Next: {new Date(source.nextPayment).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(source.amount)}</p>
                    <p className="text-sm text-gray-500">{getFrequencyLabel(source.frequency)}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Edit className="w-4 h-4" />}
                      onClick={() => {
                        // TODO: Implement edit functionality
                        console.log('Edit income source:', source.id);
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Trash2 className="w-4 h-4" />}
                      onClick={() => onDeleteIncome(source.id)}
                      className="text-error-600 hover:text-error-700 hover:bg-error-50"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <IncomeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onAddIncome}
      />
    </div>
  );
};