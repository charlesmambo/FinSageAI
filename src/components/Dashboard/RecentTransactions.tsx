import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { mockTransactions } from '../../utils/mockData';

export const RecentTransactions: React.FC = () => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {mockTransactions.slice(0, 5).map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                transaction.type === 'income' ? 'bg-success-100' : 'bg-error-100'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowUpRight className="w-4 h-4 text-success-600" />
                ) : (
                  <ArrowDownLeft className="w-4 h-4 text-error-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'income' ? 'text-success-600' : 'text-gray-900'
              }`}>
                {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
              </p>
              <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};