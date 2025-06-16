import React, { useState } from 'react';
import { Plus, CreditCard, PiggyBank, TrendingUp, Home, AlertCircle, Eye, EyeOff, RefreshCw, MoreVertical, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AccountModal } from './AccountModal';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { mockAccounts, mockAccountTransactions } from '../../utils/mockData';
import { Account, AccountTransaction, AccountSummary } from '../../types';

interface AccountsOverviewProps {
  accounts?: Account[];
  transactions?: AccountTransaction[];
}

export const AccountsOverview: React.FC<AccountsOverviewProps> = ({
  accounts = mockAccounts,
  transactions = mockAccountTransactions
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBalances, setShowBalances] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking':
        return <CreditCard className="w-6 h-6" />;
      case 'savings':
        return <PiggyBank className="w-6 h-6" />;
      case 'credit':
        return <CreditCard className="w-6 h-6" />;
      case 'investment':
        return <TrendingUp className="w-6 h-6" />;
      case 'mortgage':
      case 'loan':
        return <Home className="w-6 h-6" />;
      default:
        return <CreditCard className="w-6 h-6" />;
    }
  };

  const getAccountTypeLabel = (type: string) => {
    const labels = {
      checking: 'Checking Account',
      savings: 'Savings Account',
      credit: 'Credit Card',
      investment: 'Investment Account',
      mortgage: 'Home Loan',
      loan: 'Loan Account'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const calculateSummary = (): AccountSummary => {
    const assets = accounts
      .filter(acc => ['checking', 'savings', 'investment'].includes(acc.type) && acc.balance > 0)
      .reduce((sum, acc) => sum + acc.balance, 0);
    
    const liabilities = accounts
      .filter(acc => ['credit', 'mortgage', 'loan'].includes(acc.type) || acc.balance < 0)
      .reduce((sum, acc) => sum + Math.abs(acc.balance), 0);

    return {
      totalAssets: assets,
      totalLiabilities: liabilities,
      netWorth: assets - liabilities,
      totalChecking: accounts.filter(acc => acc.type === 'checking').reduce((sum, acc) => sum + acc.balance, 0),
      totalSavings: accounts.filter(acc => acc.type === 'savings').reduce((sum, acc) => sum + acc.balance, 0),
      totalCredit: Math.abs(accounts.filter(acc => acc.type === 'credit').reduce((sum, acc) => sum + acc.balance, 0)),
      totalInvestments: accounts.filter(acc => acc.type === 'investment').reduce((sum, acc) => sum + acc.balance, 0)
    };
  };

  const summary = calculateSummary();
  const recentTransactions = transactions.slice(0, 8);

  const handleAddAccount = (accountData: Omit<Account, 'id'>) => {
    // TODO: Implement add account functionality
    console.log('Add account:', accountData);
  };

  return (
    <div className="space-y-6">
      {/* Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-700">Net Worth</p>
              <p className="text-2xl font-bold text-primary-900">
                {showBalances ? formatCurrency(summary.netWorth) : '••••••'}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary-600" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-success-50 to-success-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-success-700">Total Assets</p>
              <p className="text-2xl font-bold text-success-900">
                {showBalances ? formatCurrency(summary.totalAssets) : '••••••'}
              </p>
            </div>
            <PiggyBank className="w-8 h-8 text-success-600" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warning-700">Total Liabilities</p>
              <p className="text-2xl font-bold text-warning-900">
                {showBalances ? formatCurrency(summary.totalLiabilities) : '••••••'}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-warning-600" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-secondary-50 to-secondary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-700">Active Accounts</p>
              <p className="text-2xl font-bold text-secondary-900">
                {accounts.filter(acc => acc.isActive).length}
              </p>
            </div>
            <CreditCard className="w-8 h-8 text-secondary-600" />
          </div>
        </Card>
      </div>

      {/* Accounts List */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Your Accounts</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              icon={showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              onClick={() => setShowBalances(!showBalances)}
            >
              {showBalances ? 'Hide' : 'Show'} Balances
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={<RefreshCw className="w-4 h-4" />}
            >
              Refresh
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsModalOpen(true)}
            >
              Add Account
            </Button>
          </div>
        </div>

        {accounts.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Accounts Added</h4>
            <p className="text-gray-600 mb-4">Connect your bank accounts to get a complete financial overview.</p>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsModalOpen(true)}
            >
              Add Your First Account
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setSelectedAccount(selectedAccount === account.id ? null : account.id)}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: account.color }}
                  >
                    {getAccountIcon(account.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{account.name}</h4>
                      {!account.isActive && (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                          Inactive
                        </span>
                      )}
                      {account.type === 'credit' && account.dueDate && (
                        <span className="px-2 py-1 text-xs rounded-full bg-warning-100 text-warning-700">
                          Due {formatDate(account.dueDate)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-sm text-gray-500">{account.bank}</p>
                      <p className="text-sm text-gray-500">{account.accountNumber}</p>
                      <p className="text-sm text-gray-500">{getAccountTypeLabel(account.type)}</p>
                    </div>
                    {account.interestRate && (
                      <p className="text-sm text-gray-500 mt-1">
                        Interest Rate: {account.interestRate}%
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className={`font-semibold text-lg ${
                      account.balance >= 0 ? 'text-gray-900' : 'text-error-600'
                    }`}>
                      {showBalances ? formatCurrency(account.balance) : '••••••'}
                    </p>
                    {account.creditLimit && (
                      <p className="text-sm text-gray-500">
                        Limit: {showBalances ? formatCurrency(account.creditLimit) : '••••••'}
                      </p>
                    )}
                    {account.minimumPayment && (
                      <p className="text-sm text-warning-600">
                        Min Payment: {showBalances ? formatCurrency(account.minimumPayment) : '••••••'}
                      </p>
                    )}
                    <p className="text-xs text-gray-400">
                      Updated {formatDate(account.lastUpdated)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<MoreVertical className="w-4 h-4" />}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Recent Transactions */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <Button variant="ghost" size="sm">
            View All Transactions
          </Button>
        </div>

        {recentTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No recent transactions</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTransactions.map((transaction) => {
              const account = accounts.find(acc => acc.id === transaction.accountId);
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'credit' ? 'bg-success-100' : 'bg-error-100'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <ArrowUpRight className="w-4 h-4 text-success-600" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4 text-error-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{account?.name}</span>
                        <span>•</span>
                        <span>{transaction.category}</span>
                        {transaction.merchant && (
                          <>
                            <span>•</span>
                            <span>{transaction.merchant}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'credit' ? 'text-success-600' : 'text-gray-900'
                    }`}>
                      {transaction.type === 'credit' ? '+' : ''}
                      {showBalances ? formatCurrency(transaction.amount) : '••••••'}
                    </p>
                    <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <AccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAccount}
      />
    </div>
  );
};