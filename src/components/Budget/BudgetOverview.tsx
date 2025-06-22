import React, { useState } from 'react';
import { Plus, Target, TrendingUp, AlertTriangle, CheckCircle, Edit, Trash2, Copy, Calendar, DollarSign, PieChart, MoreVertical, Settings } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { BudgetPlanModal } from './BudgetPlanModal';
import { CategoryBudgetModal } from './CategoryBudgetModal';
import { formatCurrency, getBudgetStatus } from '../../utils/helpers';
import { mockBudgetPlans } from '../../utils/mockData';
import { BudgetPlan } from '../../types';


interface BudgetOverviewProps {
  budgetPlans?: BudgetPlan[];
}

export const BudgetOverview: React.FC<BudgetOverviewProps> = ({
  budgetPlans = mockBudgetPlans
}) => {
  const [activePlanId, setActivePlanId] = useState(budgetPlans[0]?.id || '');
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<BudgetPlan | null>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const activePlan = budgetPlans.find(plan => plan.id === activePlanId) || budgetPlans[0];

  const calculatePlanSummary = (plan: BudgetPlan) => {
    const totalBudgeted = plan.categories.reduce((sum, cat) => sum + cat.budgeted, 0);
    const totalSpent = plan.categories.reduce((sum, cat) => sum + cat.spent, 0);
    const remaining = totalBudgeted - totalSpent;
    const percentageUsed = totalBudgeted > 0 ? (totalSpent / totalBudgeted) * 100 : 0;

    return {
      totalBudgeted,
      totalSpent,
      remaining,
      percentageUsed,
      categoriesOverBudget: plan.categories.filter(cat => cat.spent > cat.budgeted).length,
      categoriesOnTrack: plan.categories.filter(cat => cat.spent <= cat.budgeted * 0.8).length
    };
  };

  const summary = activePlan ? calculatePlanSummary(activePlan) : null;

  const handleAddPlan = (planData: Omit<BudgetPlan, 'id'>) => {
    // TODO: Implement add plan functionality
    console.log('Add plan:', planData);
  };

  const handleUpdatePlan = (id: string, updates: Partial<BudgetPlan>) => {
    // TODO: Implement update plan functionality
    console.log('Update plan:', id, updates);
  };

  const handleDeletePlan = (id: string) => {
    // TODO: Implement delete plan functionality
    console.log('Delete plan:', id);
  };

  const handleAddCategory = (categoryData: any) => {
    // TODO: Implement add category functionality
    console.log('Add category:', categoryData);
  };

  const handleUpdateCategory = (categoryId: string, updates: any) => {
    // TODO: Implement update category functionality
    console.log('Update category:', categoryId, updates);
  };

  const handleDeleteCategory = (categoryId: string) => {
    // TODO: Implement delete category functionality
    console.log('Delete category:', categoryId);
  };

  const duplicatePlan = (plan: BudgetPlan) => {
    const newPlan = {
      ...plan,
      name: `${plan.name} (Copy)`,
      categories: plan.categories.map(cat => ({ ...cat, spent: 0 }))
    };
    handleAddPlan(newPlan);
  };

  if (!activePlan || !summary) {
    return (
      <div className="space-y-6">
        <Card>
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Budget Plans</h3>
            <p className="text-gray-600 mb-4">Create your first budget plan to start managing your finances effectively.</p>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsPlanModalOpen(true)}
            >
              Create Budget Plan
            </Button>
          </div>
        </Card>

        <BudgetPlanModal
          isOpen={isPlanModalOpen}
          onClose={() => setIsPlanModalOpen(false)}
          onSubmit={handleAddPlan}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Budget Plan Selector */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Budget Plans</h2>
            <p className="text-gray-600">Manage multiple budget scenarios and track your spending</p>
          </div>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsPlanModalOpen(true)}
          >
            New Plan
          </Button>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {budgetPlans.map((plan) => {
            const planSummary = calculatePlanSummary(plan);
            const isActive = plan.id === activePlanId;
            
            return (
              <div
                key={plan.id}
                onClick={() => setActivePlanId(plan.id)}
                className={`flex-shrink-0 p-4 rounded-lg border-2 cursor-pointer transition-all min-w-[280px] ${
                  isActive 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className={`font-semibold ${isActive ? 'text-primary-900' : 'text-gray-900'}`}>
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-600">{plan.period}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {plan.isActive && (
                      <span className="px-2 py-1 text-xs bg-success-100 text-success-700 rounded-full">
                        Active
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingPlan(plan);
                        setIsPlanModalOpen(true);
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-medium">{formatCurrency(planSummary.totalBudgeted)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Spent:</span>
                    <span className={`font-medium ${
                      planSummary.totalSpent > planSummary.totalBudgeted ? 'text-error-600' : 'text-gray-900'
                    }`}>
                      {formatCurrency(planSummary.totalSpent)}
                    </span>
                  </div>
                  <ProgressBar
                    progress={planSummary.percentageUsed}
                    color={planSummary.percentageUsed > 100 ? 'error' : planSummary.percentageUsed > 80 ? 'warning' : 'success'}
                    size="sm"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Active Plan Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-700">Total Budget</p>
              <p className="text-2xl font-bold text-primary-900">{formatCurrency(summary.totalBudgeted)}</p>
              <p className="text-sm text-primary-600 mt-1">{activePlan.period}</p>
            </div>
            <Target className="w-8 h-8 text-primary-600" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warning-700">Total Spent</p>
              <p className="text-2xl font-bold text-warning-900">{formatCurrency(summary.totalSpent)}</p>
              <p className="text-sm text-warning-600 mt-1">{Math.round(summary.percentageUsed)}% of budget</p>
            </div>
            <TrendingUp className="w-8 h-8 text-warning-600" />
          </div>
        </Card>

        <Card className={`bg-gradient-to-br ${
          summary.remaining >= 0 
            ? 'from-success-50 to-success-100' 
            : 'from-error-50 to-error-100'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                summary.remaining >= 0 ? 'text-success-700' : 'text-error-700'
              }`}>
                {summary.remaining >= 0 ? 'Remaining' : 'Over Budget'}
              </p>
              <p className={`text-2xl font-bold ${
                summary.remaining >= 0 ? 'text-success-900' : 'text-error-900'
              }`}>
                {formatCurrency(Math.abs(summary.remaining))}
              </p>
              <p className={`text-sm mt-1 ${
                summary.remaining >= 0 ? 'text-success-600' : 'text-error-600'
              }`}>
                {summary.remaining >= 0 ? 'Available to spend' : 'Budget exceeded'}
              </p>
            </div>
            {summary.remaining >= 0 ? (
              <CheckCircle className="w-8 h-8 text-success-600" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-error-600" />
            )}
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-secondary-50 to-secondary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-700">Categories</p>
              <p className="text-2xl font-bold text-secondary-900">{activePlan.categories.length}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-success-600">{summary.categoriesOnTrack} on track</span>
                {summary.categoriesOverBudget > 0 && (
                  <span className="text-xs text-error-600">{summary.categoriesOverBudget} over</span>
                )}
              </div>
            </div>
            <PieChart className="w-8 h-8 text-secondary-600" />
          </div>
        </Card>
      </div>

      {/* Budget Categories */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{activePlan.name} - Categories</h3>
            <p className="text-gray-600">Track spending across different budget categories</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Copy className="w-4 h-4" />}
              onClick={() => duplicatePlan(activePlan)}
            >
              Duplicate Plan
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsCategoryModalOpen(true)}
            >
              Add Category
            </Button>
          </div>
        </div>

        {activePlan.categories.length === 0 ? (
          <div className="text-center py-12">
            <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Categories</h4>
            <p className="text-gray-600 mb-4">Add budget categories to start tracking your spending.</p>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsCategoryModalOpen(true)}
            >
              Add Your First Category
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activePlan.categories.map((category) => {
              const { status, percentage } = getBudgetStatus(category.spent, category.budgeted);
              const remaining = category.budgeted - category.spent;

              return (
                <Card key={category.id} className="relative overflow-hidden">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-500">{category.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {status === 'danger' && (
                        <AlertTriangle className="w-4 h-4 text-error-500" />
                      )}
                      <button
                        onClick={() => {
                          setEditingCategory(category);
                          setIsCategoryModalOpen(true);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-1 text-gray-400 hover:text-error-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Budget vs Spent</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(category.spent)} / {formatCurrency(category.budgeted)}
                      </span>
                    </div>

                    <ProgressBar
                      progress={percentage}
                      color={status === 'good' ? 'success' : status === 'warning' ? 'warning' : 'error'}
                      showLabel
                    />

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Remaining</p>
                          <p className={`text-sm font-semibold ${
                            remaining >= 0 ? 'text-success-600' : 'text-error-600'
                          }`}>
                            {remaining >= 0 ? formatCurrency(remaining) : `-${formatCurrency(Math.abs(remaining))}`}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Daily Avg</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {formatCurrency(category.spent / 30)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Status</p>
                        <span className={`text-sm font-semibold ${
                          status === 'good' ? 'text-success-600' : 
                          status === 'warning' ? 'text-warning-600' : 'text-error-600'
                        }`}>
                          {status === 'good' ? 'On Track' : 
                           status === 'warning' ? 'Watch' : 'Over Budget'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress indicator background */}
                  <div 
                    className="absolute bottom-0 left-0 h-1 transition-all duration-500"
                    style={{ 
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: status === 'good' ? '#10b981' : status === 'warning' ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </Card>
              );
            })}
          </div>
        )}
      </Card>

      {/* Budget Plan Modal */}
      <BudgetPlanModal
        isOpen={isPlanModalOpen}
        onClose={() => {
          setIsPlanModalOpen(false);
          setEditingPlan(null);
        }}
        onSubmit={editingPlan ? 
          (data) => handleUpdatePlan(editingPlan.id, data) : 
          handleAddPlan
        }
        editingPlan={editingPlan}
      />

      {/* Category Modal */}
      <CategoryBudgetModal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        onSubmit={editingCategory ? 
          (data) => handleUpdateCategory(editingCategory.id, data) : 
          handleAddCategory
        }
        editingCategory={editingCategory}
      />
    </div>
  );
};