import { Transaction, BudgetCategory, Investment, FinancialGoal, AIInsight, EducationalModule, IncomeSource, Expense, Account, AccountTransaction, UserProfile } from '../types';

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
    type: 'investment',
    title: 'Smart Investment Opportunity',
    description: 'Based on your R16,550 available balance, consider investing R10,000 in a diversified ETF like Satrix Top 40 (STX40) and R5,000 in a bond fund for balanced growth.',
    actionable: true,
    category: 'investments',
    priority: 'high',
    estimatedImpact: 'R2,100 potential annual returns'
  },
  {
    id: '2',
    type: 'book',
    title: 'Recommended Reading: "The Richest Man in Babylon"',
    description: 'Perfect for your current financial journey. This classic teaches fundamental money management principles through engaging parables. Focus on the "Seven Cures for a Lean Purse" - especially relevant given your strong savings discipline.',
    actionable: true,
    category: 'education',
    priority: 'medium',
    bookAuthor: 'George S. Clason',
    readingTime: '3-4 hours',
    keyTopics: ['Saving principles', 'Wealth building', 'Financial discipline']
  },
  {
    id: '3',
    type: 'tip',
    title: 'Optimize Your Grocery Spending',
    description: 'You\'re spending 28% less on groceries this month. Consider allocating R400 from your grocery budget to your emergency fund to reach your goal faster.',
    actionable: true,
    category: 'budgeting',
    priority: 'medium',
    estimatedImpact: 'R4,800 additional annual savings'
  },
  {
    id: '4',
    type: 'book',
    title: 'Next Level Reading: "A Random Walk Down Wall Street"',
    description: 'Ready to dive deeper into investments? Burton Malkiel\'s masterpiece explains index fund investing and market efficiency. Perfect timing as you\'re building your investment portfolio.',
    actionable: true,
    category: 'education',
    priority: 'medium',
    bookAuthor: 'Burton G. Malkiel',
    readingTime: '8-10 hours',
    keyTopics: ['Index investing', 'Market analysis', 'Portfolio theory']
  },
  {
    id: '5',
    type: 'investment',
    title: 'Tax-Efficient Investment Strategy',
    description: 'Consider maxing out your Tax-Free Savings Account (TFSA) with R36,000 annually. Your current surplus allows for R3,000 monthly contributions, saving you significant tax over time.',
    actionable: true,
    category: 'investments',
    priority: 'high',
    estimatedImpact: 'R540,000 tax-free growth over 15 years'
  },
  {
    id: '6',
    type: 'warning',
    title: 'Transportation Budget Alert',
    description: 'You\'re approaching 75% of your transportation budget with 2 weeks left in the month. Consider carpooling or using public transport to stay on track.',
    actionable: true,
    category: 'budgeting',
    priority: 'high',
    estimatedImpact: 'R500 monthly savings potential'
  },
  {
    id: '7',
    type: 'book',
    title: 'South African Focus: "How to Manage Your Money Like a F*cking Grown Up"',
    description: 'Sam Beckbessinger\'s practical guide tailored for South African financial realities. Covers local investment options, tax implications, and retirement planning specific to SA.',
    actionable: true,
    category: 'education',
    priority: 'high',
    bookAuthor: 'Sam Beckbessinger',
    readingTime: '4-5 hours',
    keyTopics: ['SA investments', 'Local tax laws', 'Retirement annuities']
  },
  {
    id: '8',
    type: 'investment',
    title: 'Diversification Opportunity',
    description: 'Your portfolio is 76% weighted in South African stocks. Consider adding international exposure through ETFs like Ashburton Global 1200 or Satrix MSCI World for better diversification.',
    actionable: true,
    category: 'investments',
    priority: 'medium',
    estimatedImpact: 'Reduced portfolio risk by 15-20%'
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

// Book recommendations data
export const mockBookRecommendations = [
  {
    id: '1',
    title: 'The Richest Man in Babylon',
    author: 'George S. Clason',
    category: 'Fundamentals',
    difficulty: 'beginner',
    readingTime: '3-4 hours',
    rating: 4.8,
    keyTopics: ['Saving principles', 'Wealth building', 'Financial discipline'],
    description: 'Timeless financial wisdom through engaging parables',
    amazonLink: '#',
    localAvailability: 'Available at Exclusive Books'
  },
  {
    id: '2',
    title: 'How to Manage Your Money Like a F*cking Grown Up',
    author: 'Sam Beckbessinger',
    category: 'South African Focus',
    difficulty: 'beginner',
    readingTime: '4-5 hours',
    rating: 4.9,
    keyTopics: ['SA investments', 'Local tax laws', 'Retirement annuities'],
    description: 'Practical guide tailored for South African financial realities',
    amazonLink: '#',
    localAvailability: 'Available at Takealot'
  },
  {
    id: '3',
    title: 'A Random Walk Down Wall Street',
    author: 'Burton G. Malkiel',
    category: 'Investment Strategy',
    difficulty: 'intermediate',
    readingTime: '8-10 hours',
    rating: 4.7,
    keyTopics: ['Index investing', 'Market analysis', 'Portfolio theory'],
    description: 'The definitive guide to index fund investing and market efficiency',
    amazonLink: '#',
    localAvailability: 'Available at Loot.co.za'
  }
];

// Investment suggestions data
export const mockInvestmentSuggestions = [
  {
    id: '1',
    title: 'Balanced Growth Portfolio',
    riskLevel: 'moderate',
    minimumAmount: 10000,
    expectedReturn: '8-12% annually',
    allocation: {
      'SA Equity ETF (STX40)': 40,
      'Global Equity ETF': 30,
      'SA Bond Fund': 20,
      'Money Market': 10
    },
    description: 'Diversified portfolio perfect for long-term growth with moderate risk',
    platforms: ['Easy Equities', 'Satrix', 'Allan Gray']
  },
  {
    id: '2',
    title: 'Tax-Free Savings Account',
    riskLevel: 'low-moderate',
    minimumAmount: 500,
    expectedReturn: '6-10% annually',
    allocation: {
      'Balanced Fund': 60,
      'Equity Fund': 30,
      'Bond Fund': 10
    },
    description: 'Maximize your R36,000 annual TFSA allowance for tax-free growth',
    platforms: ['Allan Gray', 'Coronation', 'Investec']
  },
  {
    id: '3',
    title: 'High-Growth Equity Focus',
    riskLevel: 'high',
    minimumAmount: 5000,
    expectedReturn: '10-15% annually',
    allocation: {
      'SA Top 40 ETF': 50,
      'Global Tech ETF': 30,
      'Emerging Markets': 20
    },
    description: 'Higher risk, higher reward strategy for aggressive growth',
    platforms: ['Easy Equities', 'Purple Group', 'Standard Bank']
  }
];

// Accounts data
export const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Primary Checking',
    type: 'checking',
    bank: 'Standard Bank',
    accountNumber: '****1234',
    balance: 28750,
    currency: 'ZAR',
    isActive: true,
    lastUpdated: '2024-01-15T10:30:00Z',
    accountHolder: 'John Doe',
    branch: 'Sandton City',
    color: '#3b82f6'
  },
  {
    id: '2',
    name: 'Emergency Savings',
    type: 'savings',
    bank: 'FNB',
    accountNumber: '****5678',
    balance: 68500,
    currency: 'ZAR',
    isActive: true,
    lastUpdated: '2024-01-15T09:15:00Z',
    interestRate: 5.25,
    accountHolder: 'John Doe',
    branch: 'Rosebank',
    color: '#10b981'
  },
  {
    id: '3',
    name: 'Visa Credit Card',
    type: 'credit',
    bank: 'Absa',
    accountNumber: '****9012',
    balance: -4250,
    currency: 'ZAR',
    isActive: true,
    lastUpdated: '2024-01-14T16:45:00Z',
    creditLimit: 25000,
    minimumPayment: 850,
    dueDate: '2024-02-05',
    accountHolder: 'John Doe',
    color: '#ef4444'
  },
  {
    id: '4',
    name: 'Investment Account',
    type: 'investment',
    bank: 'Easy Equities',
    accountNumber: '****3456',
    balance: 108000,
    currency: 'ZAR',
    isActive: true,
    lastUpdated: '2024-01-15T15:20:00Z',
    accountHolder: 'John Doe',
    color: '#8b5cf6'
  },
  {
    id: '5',
    name: 'Home Loan',
    type: 'mortgage',
    bank: 'Nedbank',
    accountNumber: '****7890',
    balance: -1250000,
    currency: 'ZAR',
    isActive: true,
    lastUpdated: '2024-01-01T08:00:00Z',
    interestRate: 11.75,
    minimumPayment: 12500,
    dueDate: '2024-02-01',
    accountHolder: 'John Doe',
    color: '#f59e0b'
  },
  {
    id: '6',
    name: 'Tax-Free Savings',
    type: 'savings',
    bank: 'Allan Gray',
    accountNumber: '****2468',
    balance: 23400,
    currency: 'ZAR',
    isActive: true,
    lastUpdated: '2024-01-15T11:00:00Z',
    interestRate: 7.8,
    accountHolder: 'John Doe',
    color: '#06b6d4'
  }
];

// Account transactions data
export const mockAccountTransactions: AccountTransaction[] = [
  {
    id: '1',
    accountId: '1',
    date: '2024-01-15',
    description: 'Salary Deposit - TechCorp',
    amount: 45000,
    balance: 28750,
    category: 'Income',
    type: 'credit',
    reference: 'SAL001',
    merchant: 'TechCorp (Pty) Ltd'
  },
  {
    id: '2',
    accountId: '1',
    date: '2024-01-14',
    description: 'Woolworths - Groceries',
    amount: -1250,
    balance: -16250,
    category: 'Groceries',
    type: 'debit',
    reference: 'POS001',
    merchant: 'Woolworths',
    location: 'Sandton City'
  },
  {
    id: '3',
    accountId: '1',
    date: '2024-01-13',
    description: 'Uber Trip',
    amount: -180,
    balance: -15000,
    category: 'Transportation',
    type: 'debit',
    reference: 'UBR001',
    merchant: 'Uber Technologies'
  },
  {
    id: '4',
    accountId: '3',
    date: '2024-01-12',
    description: 'Netflix Subscription',
    amount: -199,
    balance: -4250,
    category: 'Entertainment',
    type: 'debit',
    reference: 'SUB001',
    merchant: 'Netflix'
  },
  {
    id: '5',
    accountId: '2',
    date: '2024-01-10',
    description: 'Interest Payment',
    amount: 285,
    balance: 68500,
    category: 'Interest',
    type: 'credit',
    reference: 'INT001'
  },
  {
    id: '6',
    accountId: '4',
    date: '2024-01-09',
    description: 'Dividend - Shoprite Holdings',
    amount: 450,
    balance: 108000,
    category: 'Dividends',
    type: 'credit',
    reference: 'DIV001',
    merchant: 'Shoprite Holdings'
  }
];

// User profile data
export const mockUserProfile: UserProfile = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+27 82 123 4567',
  dateOfBirth: '1990-05-15',
  idNumber: '9005155555555',
  address: {
    street: '123 Main Street, Sandton',
    city: 'Johannesburg',
    province: 'Gauteng',
    postalCode: '2196',
    country: 'South Africa'
  },
  employment: {
    status: 'employed',
    company: 'TechCorp (Pty) Ltd',
    position: 'Senior Software Developer',
    industry: 'Technology',
    monthlyIncome: 45000
  },
  financialProfile: {
    riskTolerance: 'moderate',
    investmentExperience: 'intermediate',
    financialGoals: ['Emergency Fund', 'Retirement Planning', 'Property Investment'],
    timeHorizon: 'long'
  },
  preferences: {
    currency: 'ZAR',
    language: 'English',
    timezone: 'Africa/Johannesburg',
    notifications: {
      email: true,
      sms: true,
      push: true,
      budgetAlerts: true,
      goalReminders: true,
      investmentUpdates: true
    },
    privacy: {
      showBalances: true,
      shareData: false,
      marketingEmails: false
    }
  },
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: '2024-01-01T00:00:00Z',
    loginHistory: [
      {
        date: '2024-01-15T08:30:00Z',
        device: 'iPhone 15 Pro',
        location: 'Johannesburg, GP',
        ip: '196.xxx.xxx.xxx'
      },
      {
        date: '2024-01-14T18:45:00Z',
        device: 'MacBook Pro',
        location: 'Johannesburg, GP',
        ip: '196.xxx.xxx.xxx'
      },
      {
        date: '2024-01-13T12:15:00Z',
        device: 'iPhone 15 Pro',
        location: 'Cape Town, WC',
        ip: '41.xxx.xxx.xxx'
      }
    ]
  },
  subscription: {
    plan: 'premium',
    status: 'active',
    nextBilling: '2024-02-15',
    features: ['Advanced Analytics', 'AI Insights', 'Priority Support', 'Export Data']
  },
  createdAt: '2023-06-15T10:00:00Z',
  lastLogin: '2024-01-15T08:30:00Z',
  profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
};