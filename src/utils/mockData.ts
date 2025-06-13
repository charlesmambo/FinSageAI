import { Transaction, BudgetCategory, Investment, FinancialGoal, AIInsight, EducationalModule, IncomeSource, Expense } from '../types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-01-15',
    description: 'Salary Deposit',
    amount: 45000,
    category: 'Salary',
    type: 'income'
  },
  {
    id: '2',
    date: '2024-01-14',
    description: 'Woolworths',
    amount: -1250,
    category: 'Groceries',
    type: 'expense'
  },
  {
    id: '3',
    date: '2024-01-13',
    description: 'Uber',
    amount: -180,
    category: 'Transportation',
    type: 'expense'
  },
  {
    id: '4',
    date: '2024-01-12',
    description: 'Netflix',
    amount: -199,
    category: 'Entertainment',
    type: 'expense'
  },
  {
    id: '5',
    date: '2024-01-11',
    description: 'Shell Petrol',
    amount: -850,
    category: 'Transportation',
    type: 'expense'
  }
];

export const mockBudgetCategories: BudgetCategory[] = [
  {
    id: '1',
    name: 'Groceries',
    budgeted: 4000,
    spent: 2850,
    color: '#10b981'
  },
  {
    id: '2',
    name: 'Transportation',
    budgeted: 2500,
    spent: 1830,
    color: '#3b82f6'
  },
  {
    id: '3',
    name: 'Entertainment',
    budgeted: 1500,
    spent: 1199,
    color: '#f59e0b'
  },
  {
    id: '4',
    name: 'Utilities',
    budgeted: 1800,
    spent: 1450,
    color: '#ef4444'
  }
];

export const mockInvestments: Investment[] = [
  {
    id: '1',
    symbol: 'JSE:SHP',
    name: 'Shoprite Holdings',
    shares: 100,
    currentPrice: 165.50,
    totalValue: 16550,
    dayChange: 2.30,
    dayChangePercent: 1.41
  },
  {
    id: '2',
    symbol: 'JSE:NPN',
    name: 'Naspers',
    shares: 25,
    currentPrice: 3284.00,
    totalValue: 82100,
    dayChange: -45.20,
    dayChangePercent: -1.36
  },
  {
    id: '3',
    symbol: 'JSE:ABG',
    name: 'Absa Group',
    shares: 50,
    currentPrice: 186.75,
    totalValue: 9337.50,
    dayChange: 3.15,
    dayChangePercent: 1.71
  }
];

export const mockGoals: FinancialGoal[] = [
  {
    id: '1',
    title: 'Emergency Fund',
    targetAmount: 100000,
    currentAmount: 68500,
    targetDate: '2024-12-31',
    category: 'Safety',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Holiday to Europe',
    targetAmount: 45000,
    currentAmount: 12300,
    targetDate: '2024-11-15',
    category: 'Travel',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'New Car Down Payment',
    targetAmount: 80000,
    currentAmount: 23400,
    targetDate: '2025-06-30',
    category: 'Transportation',
    priority: 'low'
  }
];

export const mockAIInsights: AIInsight[] = [
  {
    id: '1',
    type: 'tip',
    title: 'Optimize Your Grocery Spending',
    description: 'You\'re spending 28% less on groceries this month. Consider allocating R400 from your grocery budget to your emergency fund.',
    actionable: true,
    category: 'budgeting'
  },
  {
    id: '2',
    type: 'opportunity',
    title: 'Investment Opportunity',
    description: 'Based on your risk profile, consider diversifying with a low-cost ETF. Your current portfolio is heavily weighted in retail stocks.',
    actionable: true,
    category: 'investments'
  },
  {
    id: '3',
    type: 'warning',
    title: 'Transportation Budget Alert',
    description: 'You\'re approaching 75% of your transportation budget with 2 weeks left in the month. Consider carpooling or using public transport.',
    actionable: true,
    category: 'budgeting'
  },
  {
  id: "opportunity-1",
  type: "opportunity",
  title: "Lower Your Energy Bill",
  description: "By switching to a time-of-use plan, you could save $120 monthly.",
  category: "Utilities",
  actionable: true,
  suggestions: [
    "Invest the $120 in a high-yield savings account",
    "Use it to pay off debt faster",
    "Start a rainy day fund",
    "Enroll in an online course",
    "Build up a travel fund"
  ]
}

];

export const mockEducationalModules: EducationalModule[] = [
  {
    id: '1',
    title: 'Understanding Compound Interest',
    description: 'Learn how compound interest can accelerate your wealth building over time.',
    duration: '15 min',
    difficulty: 'beginner',
    completed: true,
    progress: 100
  },
  {
    id: '2',
    title: 'Building Your First Investment Portfolio',
    description: 'Step-by-step guide to creating a diversified investment portfolio.',
    duration: '25 min',
    difficulty: 'intermediate',
    completed: false,
    progress: 60
  },
  {
    id: '3',
    title: 'Advanced Tax Optimization Strategies',
    description: 'Learn advanced techniques to minimize your tax burden legally.',
    duration: '35 min',
    difficulty: 'advanced',
    completed: false,
    progress: 0
  }
];

export const mockIncomeSources: IncomeSource[] = [
  {
    id: '1',
    source: 'Software Developer - TechCorp',
    amount: 45000,
    frequency: 'monthly',
    category: 'salary',
    isActive: true,
    nextPayment: '2024-02-01'
  },
  {
    id: '2',
    source: 'Freelance Web Development',
    amount: 8500,
    frequency: 'monthly',
    category: 'freelance',
    isActive: true
  },
  {
    id: '3',
    source: 'Rental Property - Cape Town',
    amount: 12000,
    frequency: 'monthly',
    category: 'rental',
    isActive: true,
    nextPayment: '2024-02-01'
  },
  {
    id: '4',
    source: 'Annual Bonus',
    amount: 50000,
    frequency: 'annually',
    category: 'bonus',
    isActive: true,
    nextPayment: '2024-12-15'
  }
];

export const mockExpenses: Expense[] = [
  {
    id: '1',
    description: 'Rent Payment',
    amount: 12000,
    category: 'housing',
    date: '2024-01-01',
    isRecurring: true,
    frequency: 'monthly',
    tags: ['essential', 'fixed']
  },
  {
    id: '2',
    description: 'Woolworths Grocery Shopping',
    amount: 1250,
    category: 'groceries',
    date: '2024-01-14',
    isRecurring: false,
    tags: ['food', 'weekly']
  },
  {
    id: '3',
    description: 'Uber to Work',
    amount: 180,
    category: 'transportation',
    date: '2024-01-13',
    isRecurring: false,
    tags: ['work', 'transport']
  },
  {
    id: '4',
    description: 'Netflix Subscription',
    amount: 199,
    category: 'entertainment',
    date: '2024-01-12',
    isRecurring: true,
    frequency: 'monthly',
    tags: ['subscription', 'entertainment']
  },
  {
    id: '5',
    description: 'Shell Petrol',
    amount: 850,
    category: 'transportation',
    date: '2024-01-11',
    isRecurring: false,
    tags: ['fuel', 'car']
  },
  {
    id: '6',
    description: 'Electricity Bill',
    amount: 450,
    category: 'utilities',
    date: '2024-01-10',
    isRecurring: true,
    frequency: 'monthly',
    tags: ['essential', 'utilities']
  }
];