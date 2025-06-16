import React, { useState } from 'react';
import { CreditCard, Building, Hash, DollarSign, Calendar, Percent } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Account } from '../../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (account: Omit<Account, 'id'>) => void;
}

const accountTypeOptions = [
  { value: 'checking', label: 'Checking Account' },
  { value: 'savings', label: 'Savings Account' },
  { value: 'credit', label: 'Credit Card' },
  { value: 'investment', label: 'Investment Account' },
  { value: 'mortgage', label: 'Home Loan' },
  { value: 'loan', label: 'Personal Loan' }
];

const bankOptions = [
  { value: 'standard-bank', label: 'Standard Bank' },
  { value: 'fnb', label: 'First National Bank (FNB)' },
  { value: 'absa', label: 'Absa Bank' },
  { value: 'nedbank', label: 'Nedbank' },
  { value: 'capitec', label: 'Capitec Bank' },
  { value: 'investec', label: 'Investec' },
  { value: 'discovery-bank', label: 'Discovery Bank' },
  { value: 'african-bank', label: 'African Bank' },
  { value: 'easy-equities', label: 'Easy Equities' },
  { value: 'allan-gray', label: 'Allan Gray' },
  { value: 'other', label: 'Other' }
];

const colorOptions = [
  { value: '#3b82f6', label: 'Blue' },
  { value: '#10b981', label: 'Green' },
  { value: '#ef4444', label: 'Red' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#f59e0b', label: 'Orange' },
  { value: '#06b6d4', label: 'Cyan' },
  { value: '#ec4899', label: 'Pink' },
  { value: '#6b7280', label: 'Gray' }
];

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    bank: '',
    accountNumber: '',
    balance: '',
    accountHolder: '',
    branch: '',
    interestRate: '',
    creditLimit: '',
    minimumPayment: '',
    dueDate: '',
    color: '#3b82f6'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Account name is required';
    }
    
    if (!formData.type) {
      newErrors.type = 'Account type is required';
    }
    
    if (!formData.bank) {
      newErrors.bank = 'Bank is required';
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    }

    if (!formData.balance || isNaN(parseFloat(formData.balance))) {
      newErrors.balance = 'Please enter a valid balance';
    }

    if (!formData.accountHolder.trim()) {
      newErrors.accountHolder = 'Account holder name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const accountData: Omit<Account, 'id'> = {
      name: formData.name.trim(),
      type: formData.type as Account['type'],
      bank: formData.bank,
      accountNumber: formData.accountNumber.trim(),
      balance: parseFloat(formData.balance),
      currency: 'ZAR',
      isActive: true,
      lastUpdated: new Date().toISOString(),
      accountHolder: formData.accountHolder.trim(),
      branch: formData.branch.trim() || undefined,
      interestRate: formData.interestRate ? parseFloat(formData.interestRate) : undefined,
      creditLimit: formData.creditLimit ? parseFloat(formData.creditLimit) : undefined,
      minimumPayment: formData.minimumPayment ? parseFloat(formData.minimumPayment) : undefined,
      dueDate: formData.dueDate || undefined,
      color: formData.color
    };

    onSubmit(accountData);
    
    // Reset form
    setFormData({
      name: '',
      type: '',
      bank: '',
      accountNumber: '',
      balance: '',
      accountHolder: '',
      branch: '',
      interestRate: '',
      creditLimit: '',
      minimumPayment: '',
      dueDate: '',
      color: '#3b82f6'
    });
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      type: '',
      bank: '',
      accountNumber: '',
      balance: '',
      accountHolder: '',
      branch: '',
      interestRate: '',
      creditLimit: '',
      minimumPayment: '',
      dueDate: '',
      color: '#3b82f6'
    });
    setErrors({});
    onClose();
  };

  const showCreditFields = formData.type === 'credit';
  const showInterestFields = ['savings', 'mortgage', 'loan'].includes(formData.type);
  const showLoanFields = ['mortgage', 'loan'].includes(formData.type);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Account" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Account Name"
            placeholder="e.g., Primary Checking, Emergency Savings"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            required
            error={errors.name}
            icon={<CreditCard className="w-4 h-4" />}
          />

          <Select
            label="Account Type"
            value={formData.type}
            onChange={(value) => setFormData({ ...formData, type: value })}
            options={accountTypeOptions}
            placeholder="Select account type"
            required
            error={errors.type}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Bank"
            value={formData.bank}
            onChange={(value) => setFormData({ ...formData, bank: value })}
            options={bankOptions}
            placeholder="Select your bank"
            required
            error={errors.bank}
          />

          <Input
            label="Account Number"
            placeholder="Enter account number"
            value={formData.accountNumber}
            onChange={(value) => setFormData({ ...formData, accountNumber: value })}
            required
            error={errors.accountNumber}
            icon={<Hash className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Current Balance (ZAR)"
            type="number"
            placeholder="0.00"
            value={formData.balance}
            onChange={(value) => setFormData({ ...formData, balance: value })}
            required
            error={errors.balance}
            icon={<DollarSign className="w-4 h-4" />}
          />

          <Input
            label="Account Holder"
            placeholder="Full name on account"
            value={formData.accountHolder}
            onChange={(value) => setFormData({ ...formData, accountHolder: value })}
            required
            error={errors.accountHolder}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Branch (Optional)"
            placeholder="e.g., Sandton City, Rosebank"
            value={formData.branch}
            onChange={(value) => setFormData({ ...formData, branch: value })}
            icon={<Building className="w-4 h-4" />}
          />

          <Select
            label="Color Theme"
            value={formData.color}
            onChange={(value) => setFormData({ ...formData, color: value })}
            options={colorOptions}
            placeholder="Choose a color"
          />
        </div>

        {/* Credit Card Specific Fields */}
        {showCreditFields && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900">Credit Card Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Credit Limit (ZAR)"
                type="number"
                placeholder="0.00"
                value={formData.creditLimit}
                onChange={(value) => setFormData({ ...formData, creditLimit: value })}
                icon={<DollarSign className="w-4 h-4" />}
              />
              <Input
                label="Minimum Payment (ZAR)"
                type="number"
                placeholder="0.00"
                value={formData.minimumPayment}
                onChange={(value) => setFormData({ ...formData, minimumPayment: value })}
                icon={<DollarSign className="w-4 h-4" />}
              />
            </div>
            <Input
              label="Payment Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(value) => setFormData({ ...formData, dueDate: value })}
              icon={<Calendar className="w-4 h-4" />}
            />
          </div>
        )}

        {/* Interest Rate Fields */}
        {showInterestFields && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900">Interest Information</h4>
            <Input
              label="Interest Rate (%)"
              type="number"
              placeholder="0.00"
              value={formData.interestRate}
              onChange={(value) => setFormData({ ...formData, interestRate: value })}
              icon={<Percent className="w-4 h-4" />}
            />
          </div>
        )}

        {/* Loan Specific Fields */}
        {showLoanFields && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900">Loan Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Monthly Payment (ZAR)"
                type="number"
                placeholder="0.00"
                value={formData.minimumPayment}
                onChange={(value) => setFormData({ ...formData, minimumPayment: value })}
                icon={<DollarSign className="w-4 h-4" />}
              />
              <Input
                label="Payment Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(value) => setFormData({ ...formData, dueDate: value })}
                icon={<Calendar className="w-4 h-4" />}
              />
            </div>
          </div>
        )}

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
            Add Account
          </Button>
        </div>
      </form>
    </Modal>
  );
};