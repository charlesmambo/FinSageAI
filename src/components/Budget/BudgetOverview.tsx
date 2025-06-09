import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { formatCurrency, getBudgetStatus } from '../../utils/helpers';
import { mockBudgetCategories } from '../../utils/mockData';
import { IoSettingsOutline } from "react-icons/io5";

export const BudgetOverview: React.FC = () => {
  const totalBudgeted = mockBudgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = mockBudgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalBudgeted - totalSpent;

  const sharedBudget = 1800;
  const sharedSpent = 1450;
  const progressPercentage = Math.min((sharedSpent / sharedBudget) * 100, 100);
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
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

      {/* Standalone Budget Categories */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Standalone Budget Categories</h3>
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
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    {status === 'danger' && (
                      <AlertTriangle className="w-4 h-4 text-error-500" />
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(category.spent)} / {formatCurrency(category.budgeted)}
                    </p>
                    <p className={`text-sm ${remaining >= 0 ? 'text-success-600' : 'text-error-600'}`}>
                      {remaining >= 0
                        ? `${formatCurrency(remaining)} left`
                        : `${formatCurrency(Math.abs(remaining))} over`}
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

      {/* Family Budget Categories */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Family Budget Categories</h3>
          <button
            className="text-white text-sm font-medium px-4 py-2 rounded-md shadow"
            style={{ backgroundColor: '#3361ec' }}
          >
            Invite Family Member
          </button>
        </div>

        <div className="p-6 border-2 border-gray-100 rounded-xl space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-medium font-semibold text-gray-900">Family Members (0)</h4>
            <button className="flex items-center gap-2 text-sm font-small px-4 py-2 rounded-md shadow text-[#3361ec] border border-[#3361ec] opacity-60">
              <IoSettingsOutline className="w-4 h-4" />
              Manage Permissions
            </button>
          </div>

          {/* Family Member Cards */}
          {[{
            name: 'you',
            email: 'you@example.com',
            joined: '6/4/2025',
            initials: 'Y',
            role: 'Owner'
          }, {
            name: 'Carol M',
            email: 'you@example.com',
            joined: '6/9/2025',
            initials: 'CM',
            role: 'Editor'
          }].map((member, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="bg-[#3361ec] rounded-full w-14 h-14 text-white text-center flex items-center justify-center uppercase text-lg font-semibold">
                  {member.initials}
                </div>
                <div className="flex flex-col text-sm space-y-0.5">
                  <span className="text-black font-medium capitalize">{member.name}</span>
                  <span className="text-gray-600">{member.email}</span>
                  <span className="text-gray-600">Joined {member.joined}</span>
                </div>
              </div>
              <div className="status flex items-center gap-2">
                <span className={`bg-${member.role === 'Owner' ? 'orange' : 'blue'}-500 text-white text-xs border-2 border-${member.role === 'Owner' ? 'orange' : 'blue'}-500 px-3 py-1 rounded-full`}>
                  {member.role}
                </span>
                <span className="bg-green-500 bg-opacity-50 text-green-700 text-xs px-3 py-1 border-2 border-green-500 rounded-full">
                  active
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="budget mt-8">
           <h3 className='text-lg font-semibold text-gray-900'>Shared Budgets & Goals</h3>

<div className="flex items-center justify-between gap-2 flex-wrap">
  {/* First Budget Card */}
  <div className="budget-card mt-3 p-6 border-2 border-gray-100 rounded-xl space-y-4 w-full md:w-[48%]">
    <h3 className="text-lg font-semibold text-gray-900">Monthly Household Budget</h3>
    <span className="text-gray-600">Shared budget</span>

    <div className="amnt flex items-center justify-between">
      <span className="text-green-600">R 350 left</span>
      <span>R 1,450 / R 1,800</span>
    </div>

    <div className="progress">
      <ProgressBar
        progress={progressPercentage}
        color={
          progressPercentage < 50
            ? 'success'
            : progressPercentage < 90
            ? 'warning'
            : 'error'
        }
        showLabel
      />
    </div>

    <div className="mt-1">
      <div className="contributers flex justify-between">
        <div>
          <h4>Contributors</h4>
          <div className="members flex items-center gap-1 mt-1">
            <span className="bg-[#3361ec] rounded-full w-10 h-10 text-white text-center flex items-center justify-center uppercase text-sm font-semibold">Y</span>
            <span className="bg-[#3361ec] rounded-full w-10 h-10 text-white text-center flex items-center justify-center uppercase text-sm font-semibold">CM</span>
          </div>
        </div>
        <div className="members-num text-gray-600">2 members</div>
      </div>
    </div>
  </div>

  {/* Second Budget Card */}
  <div className="budget-card mt-3 p-6 border-2 border-gray-100 rounded-xl space-y-4 w-full md:w-[50%]">
    <h3 className="text-lg font-semibold text-gray-900">Vacation Fund 2025</h3>
    <span className="text-gray-600">Shared budget</span>

    <div className="amnt flex items-center justify-between mt-2">
      <span className="text-green-600">R 750 left</span>
      <span>R 1,450 / R 2,800</span>
    </div>

    <div className="progress">
      <ProgressBar
        progress={progressPercentage}
        color={
          progressPercentage < 50
            ? 'success'
            : progressPercentage < 90
            ? 'warning'
            : 'error'
        }
        showLabel
      />
    </div>

    <div className="">
      <div className="contributers flex justify-between">
        <div>
          <h4>Contributors</h4>
          <div className="members flex items-center gap-1 mt-1">
            <span className="bg-[#3361ec] rounded-full w-10 h-10 text-white text-center flex items-center justify-center uppercase text-sm font-semibold">Y</span>
            <span className="bg-[#3361ec] rounded-full w-10 h-10 text-white text-center flex items-center justify-center uppercase text-sm font-semibold">CM</span>
          </div>
        </div>
        <div className="members-num text-gray-600">2 members</div>
      </div>
    </div>
  </div>
  {/* third Budget Card */}
  <div className="budget-card mt-3 p-6 border-2 border-gray-100 rounded-xl space-y-4 w-full md:w-[48%]">
    <h3 className="text-lg font-semibold text-gray-900">Emergency Fund</h3>
    <span className="text-gray-600">Shared budget</span>

    <div className="amnt flex items-center justify-between mt-2">
      <span className="text-green-600">R 11,350 left</span>
      <span>R 1,450 / R 12,800</span>
    </div>

    <div className="progress">
      <ProgressBar
        progress={progressPercentage}
        color={
          progressPercentage < 50
            ? 'success'
            : progressPercentage < 90
            ? 'warning'
            : 'error'
        }
        showLabel
      />
    </div>

    <div className="">
      <div className="contributers flex justify-between">
        <div>
          <h4>Contributors</h4>
          <div className="members flex items-center gap-1 mt-1">
            <span className="bg-[#3361ec] rounded-full w-10 h-10 text-white text-center flex items-center justify-center uppercase text-sm font-semibold">Y</span>
            <span className="bg-[#3361ec] rounded-full w-10 h-10 text-white text-center flex items-center justify-center uppercase text-sm font-semibold">CM</span>
          </div>
        </div>
        <div className="members-num text-gray-600">2 members</div>
      </div>
    </div>
  </div>
  {/* fourth Budget Card */}
  <div className="budget-card mt-3 p-6 border-2 border-gray-100 rounded-xl space-y-4 w-full md:w-[50%]">
    <h3 className="text-lg font-semibold text-gray-900">Kids Education</h3>
    <span className="text-gray-600">Shared budget</span>

    <div className="amnt flex items-center justify-between mt-2">
      <span className="text-green-600">R 450 left</span>
      <span>R 1,450 / R 1,800</span>
    </div>

    <div className="progress">
      <ProgressBar
        progress={progressPercentage}
        color={
          progressPercentage < 50
            ? 'success'
            : progressPercentage < 90
            ? 'warning'
            : 'error'
        }
        showLabel
      />
    </div>

    <div className="">
      <div className="contributers flex justify-between">
        <div>
          <h4>Contributors</h4>
          <div className="members flex items-center gap-1 mt-1">
            <span className="bg-[#3361ec] rounded-full w-10 h-10 text-white text-center flex items-center justify-center uppercase text-sm font-semibold">Y</span>
            <span className="bg-[#3361ec] rounded-full w-10 h-10 text-white text-center flex items-center justify-center uppercase text-sm font-semibold">CM</span>
          </div>
        </div>
        <div className="members-num text-gray-600">2 members</div>
      </div>
    </div>
  </div>
</div>


        </div>
      </Card>
    </div>
  );
};
