import React, { useState, useEffect } from 'react';
import { DollarSign, Tag, Palette, FileText } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface CategoryBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (category: any) => void;
  editingCategory?: any;
}

const categoryTemplates = [
  { value: 'housing', label: 'Housing & Utilities', icon: '🏠', color: '#3b82f6', description: 'Rent, mortgage, utilities' },
  { value: 'food', label: 'Food & Groceries', icon: '🛒', color: '#10b981', description: 'Groceries, dining out' },
  { value: 'transportation', label: 'Transportation', icon: '🚗', color: '#f59e0b', description: 'Fuel, public transport, car maintenance' },
  { value: 'healthcare', label: 'Healthcare', icon: '🏥', color: '#ef4444', description: 'Medical expenses, insurance' },
  { value: 'entertainment', label: 'Entertainment', icon: '🎬', color: '#8b5cf6', description: 'Movies, hobbies, subscriptions' },
  { value: 'education', label: 'Education', icon: '🎓', color: '#06b6d4', description: 'School fees, books, courses' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️', color: '#ec4899', description: 'Clothing, electronics, personal items' },
  { value: 'savings', label: 'Savings & Investments', icon: '💰', color: '#059669', description: 'Emergency fund, investments' },
  { value: 'insurance', label: 'Insurance', icon: '🛡️', color: '#dc2626', description: 'Life, car, home insurance' },
  { value: 'debt', label: 'Debt Payments', icon: '💳', color: '#7c2d12', description: 'Credit cards, loans' },
  { value: 'personal', label: 'Personal Care', icon: '💄', color: '#be185d', description: 'Beauty, fitness, wellness' },
  { value: 'travel', label: 'Travel & Vacation', icon: '✈️', color: '#0891b2', description: 'Holidays, weekend trips' },
  { value: 'gifts', label: 'Gifts & Donations', icon: '🎁', color: '#7c3aed', description: 'Presents, charity, special occasions' },
  { value: 'pets', label: 'Pet Care', icon: '🐕', color: '#ea580c', description: 'Pet food, vet bills, supplies' },
  { value: 'other', label: 'Other', icon: '📝', color: '#6b7280', description: 'Miscellaneous expenses' }
];

const colorOptions = [
  { value: '#3b82f6', label: 'Blue' },
  { value: '#10b981', label: 'Green' },
  { value: '#f59e0b', label: 'Orange' },
  { value: '#ef4444', label: 'Red' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#06b6d4', label: 'Cyan' },
  { value: '#ec4899', label: 'Pink' },
  { value: '#059669', label: 'Emerald' },
  { value: '#dc2626', label: 'Rose' },
  { value: '#7c2d12', label: 'Brown' },
  { value: '#6b7280', label: 'Gray' }
];

export const CategoryBudgetModal: React.FC<CategoryBudgetModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingCategory
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    budgeted: '',
    color: '#3b82f6',
    icon: '📝',
    template: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        description: editingCategory.description || '',
        budgeted: editingCategory.budgeted.toString(),
        color: editingCategory.color,
        icon: editingCategory.icon,
        template: ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        budgeted: '',
        color: '#3b82f6',
        icon: '📝',
        template: ''
      });
    }
  }, [editingCategory]);

  const handleTemplateChange = (templateValue: string) => {
    const template = categoryTemplates.find(t => t.value === templateValue);
    if (template) {
      setFormData({
        ...formData,
        name: template.label,
        description: template.description,
        color: template.color,
        icon: template.icon,
        template: templateValue
      });
    } else {
      setFormData({
        ...formData,
        template: templateValue
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }
    
    if (!formData.budgeted || parseFloat(formData.budgeted) <= 0) {
      newErrors.budgeted = 'Please enter a valid budget amount';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const categoryData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      budgeted: parseFloat(formData.budgeted),
      spent: editingCategory?.spent || 0,
      color: formData.color,
      icon: formData.icon
    };

    onSubmit(categoryData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      budgeted: '',
      color: '#3b82f6',
      icon: '📝',
      template: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      title={editingCategory ? 'Edit Category' : 'Add Budget Category'} 
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {!editingCategory && (
          <Select
            label="Category Template (Optional)"
            value={formData.template}
            onChange={handleTemplateChange}
            options={[
              { value: '', label: 'Custom Category' },
              ...categoryTemplates
            ]}
            placeholder="Choose a template or create custom"
          />
        )}

        <Input
          label="Category Name"
          placeholder="e.g., Groceries, Entertainment, Rent"
          value={formData.name}
          onChange={(value) => setFormData({ ...formData, name: value })}
          required
          error={errors.name}
          icon={<Tag className="w-4 h-4" />}
        />

        <Input
          label="Description (Optional)"
          placeholder="Brief description of this category"
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          icon={<FileText className="w-4 h-4" />}
        />

        <Input
          label="Budget Amount (ZAR)"
          type="number"
          placeholder="0.00"
          value={formData.budgeted}
          onChange={(value) => setFormData({ ...formData, budgeted: value })}
          required
          error={errors.budgeted}
          icon={<DollarSign className="w-4 h-4" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category Icon
            </label>
            <div className="grid grid-cols-6 gap-2">
              {['🏠', '🛒', '🚗', '🏥', '🎬', '🎓', '🛍️', '💰', '🛡️', '💳', '💄', '✈️', '🎁', '🐕', '📝', '⚡', '🍕', '🎵'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: emoji })}
                  className={`p-2 text-xl border rounded-lg hover:bg-gray-50 ${
                    formData.icon === emoji ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <Select
            label="Category Color"
            value={formData.color}
            onChange={(value) => setFormData({ ...formData, color: value })}
            options={colorOptions}
          />
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Preview</h4>
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
              style={{ backgroundColor: formData.color }}
            >
              {formData.icon}
            </div>
            <div>
              <p className="font-medium text-gray-900">{formData.name || 'Category Name'}</p>
              <p className="text-sm text-gray-500">{formData.description || 'Category description'}</p>
            </div>
          </div>
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
            {editingCategory ? 'Update Category' : 'Add Category'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};