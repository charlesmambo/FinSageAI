import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatCurrency, formatPercent } from '../../utils/helpers';
import { mockInvestments } from '../../utils/mockData';

export const PortfolioOverview: React.FC = () => {
  const totalValue = mockInvestments.reduce((sum, inv) => sum + inv.totalValue, 0);
  const totalDayChange = mockInvestments.reduce((sum, inv) => sum + (inv.dayChange * inv.shares), 0);
  const totalDayChangePercent = (totalDayChange / (totalValue - totalDayChange)) * 100;

  const bankBalance = 3500; // Example bank account balance
  const suggestedInvestment = bankBalance * 0.3; // Suggest investing 30%

  const portfolioStats = [
    {
      title: 'Total Portfolio Value',
      value: totalValue,
      icon: DollarSign,
      color: 'primary'
    },
    {
      title: "Today's Change",
      value: totalDayChange,
      percentage: totalDayChangePercent,
      icon: totalDayChange >= 0 ? TrendingUp : TrendingDown,
      color: totalDayChange >= 0 ? 'success' : 'error'
    },
    {
      title: 'Total Holdings',
      value: mockInvestments.length,
      suffix: ' stocks',
      icon: PieChart,
      color: 'secondary'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolioStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {typeof stat.value === 'number' && stat.title.includes('Value') || stat.title.includes('Change')
                        ? formatCurrency(stat.value)
                        : stat.value}
                    </span>
                    {stat.suffix && (
                      <span className="text-lg font-medium text-gray-600">{stat.suffix}</span>
                    )}
                  </div>
                  {stat.percentage && (
                    <p
                      className={`text-sm font-medium mt-1 ${
                        stat.percentage >= 0 ? 'text-success-600' : 'text-error-600'
                      }`}
                    >
                      {stat.percentage >= 0 ? '+' : ''}
                      {formatPercent(stat.percentage)}
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Bank Balance and Suggested Investment */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-600">Bank Account Balance</h4>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(bankBalance)}</p>
          </div>
          <div className="text-right">
            <h4 className="text-sm font-medium text-gray-600">Suggested Investment</h4>
            <p className="text-xl font-semibold text-primary-600">
              {formatCurrency(suggestedInvestment)}
              <span className="text-sm font-normal text-gray-500"> (30%)</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">Consider diversifying into ETFs or index funds.</p>
          </div>
        </div>
      </Card>

      {/* Investment Advice */}
      <Card>
        <h4 className="text-md font-semibold text-gray-900 mb-2">💡 How to Invest</h4>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Start with low-cost index funds (e.g., S&P 500).</li>
          <li>Use dollar-cost averaging to invest gradually.</li>
          <li>Keep an emergency fund before investing heavily.</li>
        </ul>
      </Card>

      {/* Holdings */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Your Holdings</h3>
          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            Add Investment
          </button>
        </div>

        <div className="space-y-4">
          {mockInvestments.map((investment) => (
            <div
              key={investment.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-bold text-sm">
                    {investment.symbol.split(':')[1].slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{investment.name}</h4>
                  <p className="text-sm text-gray-500">{investment.symbol}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">{investment.shares} shares</p>
                    <p className="font-medium text-gray-900">{formatCurrency(investment.currentPrice)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{formatCurrency(investment.totalValue)}</p>
                    <div className="flex items-center">
                      {investment.dayChangePercent >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-success-600 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-error-600 mr-1" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          investment.dayChangePercent >= 0
                            ? 'text-success-600'
                            : 'text-error-600'
                        }`}
                      >
                        {investment.dayChangePercent >= 0 ? '+' : ''}
                        {formatPercent(investment.dayChangePercent)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
