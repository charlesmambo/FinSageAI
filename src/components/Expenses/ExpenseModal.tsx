import React, { useState } from 'react';
import { DollarSign, Calendar, Tag, Repeat } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Expense } from '../../types';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
}

const categoryOptions = [
  { value: 'housing', label: 'Housing & Rent' },
  { value: 'groceries', label: 'Groceries & Food' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'education', label: 'Education' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'debt', label: 'Debt Payments' },
  { value: 'savings', label: 'Savings & Investments' },
  { value: 'other', label: 'Other' }
];

const frequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'annually', label: 'Annually' }
];

export const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    isRecurring: false,
    frequency: '',
    tags: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.isRecurring && !formData.frequency) {
      newErrors.frequency = 'Frequency is required for recurring expenses';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const expenseData: Omit<Expense, 'id'> = {
      description: formData.description.trim(),
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      isRecurring: formData.isRecurring,
      frequency: formData.isRecurring ? formData.frequency as Expense['frequency'] : undefined,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : []
    };

    onSubmit(expenseData);
    
    // Reset form
    setFormData({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      isRecurring: false,
      frequency: '',
      tags: ''
    });
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setFormData({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      isRecurring: false,
      frequency: '',
      tags: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Expense" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Description"
          placeholder="e.g., Grocery shopping, Rent payment, Coffee"
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          required
          error={errors.description}
          icon={<Tag className="w-4 h-4" />}
        />

        <Input
          label="Amount (ZAR)"
          type="number"
          placeholder="0.00"
          value={formData.amount}
          onChange={(value) => setFormData({ ...formData, amount: value })}
          required
          error={errors.amount}
          icon={<DollarSign className="w-4 h-4" />}
        />

        <Select
          label="Category"
          value={formData.category}
          onChange={(value) => setFormData({ ...formData, category: value })}
          options={categoryOptions}
          placeholder="Select category"
          required
          error={errors.category}
        />

        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(value) => setFormData({ ...formData, date: value })}
          required
          icon={<Calendar className="w-4 h-4" />}
        />

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isRecurring"
              checked={formData.isRecurring}
              onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked, frequency: '' })}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="isRecurring" className="text-sm font-medium text-gray-700 flex items-center">
              <Repeat className="w-4 h-4 mr-2" />
              This is a recurring expense
            </label>
          </div>

          {formData.isRecurring && (
            <Select
              label="Frequency"
              value={formData.frequency}
              onChange={(value) => setFormData({ ...formData, frequency: value })}
              options={frequencyOptions}
              placeholder="Select frequency"
              required={formData.isRecurring}
              error={errors.frequency}
            />
          )}
        </div>

        <Input
          label="Tags (Optional)"
          placeholder="e.g., work, personal, urgent (comma separated)"
          value={formData.tags}
          onChange={(value) => setFormData({ ...formData, tags: value })}
          icon={<Tag className="w-4 h-4" />}
        />

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
            Add Expense
          </Button>
        </div>
      </form>
    </Modal>
  );
};