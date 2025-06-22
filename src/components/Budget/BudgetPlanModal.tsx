import React, { useState, useEffect } from 'react';
import { Target, Calendar, DollarSign, FileText } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { BudgetPlan } from '../../types';

interface BudgetPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (plan: Omit<BudgetPlan, 'id'>) => void;
  editingPlan?: BudgetPlan | null;
}

const periodOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annually', label: 'Annually' }
];

const templateOptions = [
  { value: 'custom', label: 'Custom Plan' },
  { value: 'basic', label: 'Basic Essentials' },
  { value: 'family', label: 'Family Budget' },
  { value: 'student', label: 'Student Budget' },
  { value: 'retirement', label: 'Retirement Planning' }
];

const budgetTemplates = {
  basic: [
    { name: 'Housing', budgeted: 8000, color: '#3b82f6', icon: '🏠', description: 'Rent, utilities, maintenance' },
    { name: 'Food & Groceries', budgeted: 3000, color: '#10b981', icon: '🛒', description: 'Groceries and dining' },
    { name: 'Transportation', budgeted: 2000, color: '#f59e0b', icon: '🚗', description: 'Fuel, public transport, maintenance' },
    { name: 'Healthcare', budgeted: 1000, color: '#ef4444', icon: '🏥', description: 'Medical expenses and insurance' },
    { name: 'Entertainment', budgeted: 1500, color: '#8b5cf6', icon: '🎬', description: 'Movies, dining out, hobbies' }
  ],
  family: [
    { name: 'Housing', budgeted: 12000, color: '#3b82f6', icon: '🏠', description: 'Rent, utilities, maintenance' },
    { name: 'Food & Groceries', budgeted: 5000, color: '#10b981', icon: '🛒', description: 'Groceries and family dining' },
    { name: 'Transportation', budgeted: 3500, color: '#f59e0b', icon: '🚗', description: 'Family vehicle expenses' },
    { name: 'Children & Education', budgeted: 4000, color: '#06b6d4', icon: '🎓', description: 'School fees, supplies, activities' },
    { name: 'Healthcare', budgeted: 2000, color: '#ef4444', icon: '🏥', description: 'Family medical expenses' },
    { name: 'Entertainment', budgeted: 2000, color: '#8b5cf6', icon: '🎬', description: 'Family activities and outings' },
    { name: 'Savings', budgeted: 3000, color: '#059669', icon: '💰', description: 'Emergency fund and investments' }
  ],
  student: [
    { name: 'Accommodation', budgeted: 4000, color: '#3b82f6', icon: '🏠', description: 'Rent and utilities' },
    { name: 'Food', budgeted: 1500, color: '#10b981', icon: '🛒', description: 'Groceries and meals' },
    { name: 'Transportation', budgeted: 800, color: '#f59e0b', icon: '🚗', description: 'Public transport and travel' },
    { name: 'Education', budgeted: 2000, color: '#06b6d4', icon: '🎓', description: 'Books, supplies, fees' },
    { name: 'Entertainment', budgeted: 1000, color: '#8b5cf6', icon: '🎬', description: 'Social activities and hobbies' },
    { name: 'Personal Care', budgeted: 500, color: '#ec4899', icon: '💄', description: 'Clothing, hygiene, health' }
  ],
  retirement: [
    { name: 'Housing', budgeted: 6000, color: '#3b82f6', icon: '🏠', description: 'Mortgage-free living expenses' },
    { name: 'Healthcare', budgeted: 3000, color: '#ef4444', icon: '🏥', description: 'Medical aid and treatments' },
    { name: 'Food & Groceries', budgeted: 2500, color: '#10b981', icon: '🛒', description: 'Healthy eating and dining' },
    { name: 'Travel & Leisure', budgeted: 4000, color: '#8b5cf6', icon: '✈️', description: 'Retirement adventures' },
    { name: 'Insurance', budgeted: 1500, color: '#f59e0b', icon: '🛡️', description: 'Life and disability insurance' },
    { name: 'Emergency Fund', budgeted: 2000, color: '#059669', icon: '💰', description: 'Unexpected expenses' }
  ]
};

export const BudgetPlanModal: React.FC<BudgetPlanModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingPlan
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    period: 'monthly',
    totalBudget: '',
    template: 'custom',
    isActive: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingPlan) {
      setFormData({
        name: editingPlan.name,
        description: editingPlan.description || '',
        period: editingPlan.period,
        totalBudget: editingPlan.categories.reduce((sum, cat) => sum + cat.budgeted, 0).toString(),
        template: 'custom',
        isActive: editingPlan.isActive
      });
    } else {
      setFormData({
        name: '',
        description: '',
        period: 'monthly',
        totalBudget: '',
        template: 'custom',
        isActive: false
      });
    }
  }, [editingPlan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Plan name is required';
    }
    
    if (!formData.period) {
      newErrors.period = 'Period is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const categories = formData.template !== 'custom' && !editingPlan
      ? budgetTemplates[formData.template as keyof typeof budgetTemplates].map((cat, index) => ({
          id: `cat-${index}`,
          ...cat,
          spent: 0
        }))
      : editingPlan?.categories || [];

    const planData: Omit<BudgetPlan, 'id'> = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      period: formData.period as BudgetPlan['period'],
      isActive: formData.isActive,
      categories,
      createdAt: editingPlan?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSubmit(planData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      period: 'monthly',
      totalBudget: '',
      template: 'custom',
      isActive: false
    });
    setErrors({});
    onClose();
  };

  const selectedTemplate = formData.template !== 'custom' ? budgetTemplates[formData.template as keyof typeof budgetTemplates] : null;
  const templateTotal = selectedTemplate ? selectedTemplate.reduce((sum, cat) => sum + cat.budgeted, 0) : 0;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      title={editingPlan ? 'Edit Budget Plan' : 'Create Budget Plan'} 
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Plan Name"
            placeholder="e.g., Monthly Budget 2024, Family Expenses"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            required
            error={errors.name}
            icon={<Target className="w-4 h-4" />}
          />

          <Select
            label="Budget Period"
            value={formData.period}
            onChange={(value) => setFormData({ ...formData, period: value })}
            options={periodOptions}
            required
            error={errors.period}
          />
        </div>

        <Input
          label="Description (Optional)"
          placeholder="Brief description of this budget plan"
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          icon={<FileText className="w-4 h-4" />}
        />

        {!editingPlan && (
          <div className="space-y-4">
            <Select
              label="Budget Template"
              value={formData.template}
              onChange={(value) => setFormData({ ...formData, template: value })}
              options={templateOptions}
            />

            {selectedTemplate && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Template Preview</h4>
                <div className="space-y-2 mb-4">
                  {selectedTemplate.map((category, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                      <span className="font-medium">R{category.budgeted.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between font-semibold">
                    <span>Total Budget:</span>
                    <span>R{templateTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Set as active budget plan
          </label>
        </div>

        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
          >
            {editingPlan ? 'Update Plan' : 'Create Plan'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};