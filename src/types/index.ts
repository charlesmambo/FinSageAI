export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

export interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  color: string;
}

export interface Investment {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  currentPrice: number;
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

export interface AIInsight {
  id: string;
  type: 'tip' | 'warning' | 'opportunity';
  title: string;
  description: string;
  actionable: boolean;
  category: string;
}

export interface EducationalModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  progress: number;
}

export interface IncomeSource {
  id: string;
  source: string;
  amount: number;
  frequency: 'monthly' | 'weekly' | 'bi-weekly' | 'annually' | 'one-time';
  category: string;
  isActive: boolean;
  nextPayment?: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  isRecurring: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly' | 'annually';
  tags?: string[];
}

export interface ExpenseCategory {
  id: string;
  name: string;
  budgetLimit: number;
  spent: number;
  color: string;
  icon: string;
}