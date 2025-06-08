import React from 'react';
import { Target, Calendar, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { formatCurrency, calculateProgress, getDaysUntil } from '../../utils/helpers';
import { mockGoals } from '../../utils/mockData';

export const GoalsOverview: React.FC = () => {
  const totalGoalAmount = mockGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentAmount = mockGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const overallProgress = calculateProgress(totalCurrentAmount, totalGoalAmount);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-700">Total Goal Amount</p>
              <p className="text-2xl font-bold text-primary-900">{formatCurrency(totalGoalAmount)}</p>
            </div>
            <Target className="w-8 h-8 text-primary-600" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-success-50 to-success-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-success-700">Amount Saved</p>
              <p className="text-2xl font-bold text-success-900">{formatCurrency(totalCurrentAmount)}</p>
            </div>
            <Target className="w-8 h-8 text-success-600" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-secondary-50 to-secondary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-700">Overall Progress</p>
              <p className="text-2xl font-bold text-secondary-900">{Math.round(overallProgress)}%</p>
            </div>
            <Target className="w-8 h-8 text-secondary-600" />
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Your Financial Goals</h3>
          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            Add New Goal
          </button>
        </div>

        <div className="space-y-6">
          {mockGoals.map((goal) => {
            const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
            const daysUntil = getDaysUntil(goal.targetDate);
            const remaining = goal.targetAmount - goal.currentAmount;

            return (
              <div key={goal.id} className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        goal.priority === 'high' ? 'bg-error-100 text-error-700' :
                        goal.priority === 'medium' ? 'bg-warning-100 text-warning-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {goal.priority} priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{goal.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                    </p>
                    <p className="text-sm text-gray-500">{formatCurrency(remaining)} remaining</p>
                  </div>
                </div>

                <ProgressBar 
                  progress={progress} 
                  color={progress >= 75 ? 'success' : progress >= 50 ? 'warning' : 'primary'} 
                  showLabel 
                />

                <div className="flex items-center justify-between mt-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    {daysUntil < 30 && (
                      <AlertCircle className="w-4 h-4 text-warning-500 mr-1" />
                    )}
                    <span className={daysUntil < 30 ? 'text-warning-600' : 'text-gray-600'}>
                      {daysUntil} days left
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};