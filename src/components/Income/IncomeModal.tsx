import React, { useState } from 'react';
import { DollarSign, Calendar, Tag } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { IncomeSource } from '../../types';

interface IncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (income: Omit<IncomeSource, 'id'>) => void;
}

const frequencyOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-weekly' },
  { value: 'annually', label: 'Annually' },
  { value: 'one-time', label: 'One-time' }
];

const categoryOptions = [
  { value: 'salary', label: 'Salary' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'business', label: 'Business Income' },
  { value: 'investment', label: 'Investment Returns' },
  { value: 'rental', label: 'Rental Income' },
  { value: 'bonus', label: 'Bonus' },
  { value: 'other', label: 'Other' }
];

export const IncomeModal: React.FC<IncomeModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    source: '',
    amount: '',
    frequency: '',
    category: '',
    nextPayment: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.source.trim()) {
      newErrors.source = 'Income source is required';
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!formData.frequency) {
      newErrors.frequency = 'Frequency is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const incomeData: Omit<IncomeSource, 'id'> = {
      source: formData.source.trim(),
      amount: parseFloat(formData.amount),
      frequency: formData.frequency as IncomeSource['frequency'],
      category: formData.category,
      isActive: true,
      nextPayment: formData.nextPayment || undefined
    };

    onSubmit(incomeData);
    
    // Reset form
    setFormData({
      source: '',
      amount: '',
      frequency: '',
      category: '',
      nextPayment: ''
    });
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setFormData({
      source: '',
      amount: '',
      frequency: '',
      category: '',
      nextPayment: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Income Source" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Income Source"
          placeholder="e.g., Main Job, Freelance Project, Rental Property"
          value={formData.source}
          onChange={(value) => setFormData({ ...formData, source: value })}
          required
          error={errors.source}
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
          label="Frequency"
          value={formData.frequency}
          onChange={(value) => setFormData({ ...formData, frequency: value })}
          options={frequencyOptions}
          placeholder="Select frequency"
          required
          error={errors.frequency}
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
          label="Next Payment Date (Optional)"
          type="date"
          value={formData.nextPayment}
          onChange={(value) => setFormData({ ...formData, nextPayment: value })}
          icon={<Calendar className="w-4 h-4" />}
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
            Add Income Source
          </Button>
        </div>
      </form>
    </Modal>
  );
};