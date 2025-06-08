import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { formatCurrency, getBudgetStatus } from '../../utils/helpers';
import { mockBudgetCategories } from '../../utils/mockData';

export const BudgetOverview: React.FC = () => {
  const totalBudgeted = mockBudgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = mockBudgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalBudgeted - totalSpent;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-700">Total Budget</p>
              <p className="text-2xl font-bold text-primary-900">{formatCurrency(totalBudgeted)}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-primary-600" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warning-700">Total Spent</p>
              <p className="text-2xl font-bold text-warning-900">{formatCurrency(totalSpent)}</p>
            </div>
            <Clock className="w-8 h-8 text-warning-600" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-success-50 to-success-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-success-700">Remaining</p>
              <p className="text-2xl font-bold text-success-900">{formatCurrency(remaining)}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-success-600" />
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Budget Categories</h3>
          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            Adjust Budget
          </button>
        </div>

        <div className="space-y-6">
          {mockBudgetCategories.map((category) => {
            const { status, percentage } = getBudgetStatus(category.spent, category.budgeted);
            const remaining = category.budgeted - category.spent;

            return (
              <div key={category.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    {status === 'danger' && (
                      <AlertTriangle className="w-4 h-4 text-error-500" />
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(category.spent)} / {formatCurrency(category.budgeted)}
                    </p>
                    <p className={`text-sm ${
                      remaining >= 0 ? 'text-success-600' : 'text-error-600'
                    }`}>
                      {remaining >= 0 ? `${formatCurrency(remaining)} left` : `${formatCurrency(Math.abs(remaining))} over`}
                    </p>
                  </div>
                </div>
                <ProgressBar
                  progress={percentage}
                  color={status === 'good' ? 'success' : status === 'warning' ? 'warning' : 'error'}
                  showLabel
                />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};