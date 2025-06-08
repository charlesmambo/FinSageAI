import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/helpers';

const stats = [
  {
    title: 'Total Balance',
    value: 156750,
    change: +5.2,
    changeType: 'positive',
    icon: DollarSign,
    color: 'primary'
  },
  {
    title: 'Monthly Income',
    value: 45000,
    change: +2.1,
    changeType: 'positive',
    icon: TrendingUp,
    color: 'success'
  },
  {
    title: 'Monthly Expenses',
    value: 28450,
    change: -3.2,
    changeType: 'negative',
    icon: TrendingDown,
    color: 'error'
  },
  {
    title: 'Savings',
    value: 16550,
    change: +8.7,
    changeType: 'positive',
    icon: PiggyBank,
    color: 'secondary'
  }
];

export const OverviewStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} hover className="animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(stat.value)}
                </p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'positive' ? (
                    <TrendingUp className="w-4 h-4 text-success-600 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-error-600 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-success-600' : 'text-error-600'
                  }`}>
                    {stat.changeType === 'positive' ? '+' : ''}{stat.change}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <Icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};