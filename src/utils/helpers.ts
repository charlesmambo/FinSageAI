export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercent = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const calculateProgress = (current: number, target: number): number => {
  return Math.min((current / target) * 100, 100);
};

export const getDaysUntil = (dateString: string): number => {
  const targetDate = new Date(dateString);
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getInsightIcon = (type: string): string => {
  switch (type) {
    case 'tip':
      return '💡';
    case 'warning':
      return '⚠️';
    case 'opportunity':
      return '🚀';
    default:
      return '📊';
  }
};

export const getBudgetStatus = (spent: number, budgeted: number): {
  status: 'good' | 'warning' | 'danger';
  percentage: number;
} => {
  const percentage = (spent / budgeted) * 100;
  
  if (percentage <= 70) {
    return { status: 'good', percentage };
  } else if (percentage <= 90) {
    return { status: 'warning', percentage };
  } else {
    return { status: 'danger', percentage };
  }
};