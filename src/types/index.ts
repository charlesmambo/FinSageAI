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
  description?: string;
  budgeted: number;
  spent: number;
  color: string;
  icon: string;
}

export interface BudgetPlan {
  id: string;
  name: string;
  description?: string;
  period: 'weekly' | 'monthly' | 'quarterly' | 'annually';
  categories: BudgetCategory[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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
  type: 'tip' | 'warning' | 'opportunity' | 'investment' | 'book';
  title: string;
  description: string;
  actionable: boolean;
  category: string;
  priority?: 'high' | 'medium' | 'low';
  estimatedImpact?: string;
  bookAuthor?: string;
  readingTime?: string;
  keyTopics?: string[];
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
  receiptData?: {
    merchant: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    taxAmount?: number;
    paymentMethod?: string;
    confidence: number;
  };
}

export interface ExpenseCategory {
  id: string;
  name: string;
  budgetLimit: number;
  spent: number;
  color: string;
  icon: string;
}

export interface BookRecommendation {
  id: string;
  title: string;
  author: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readingTime: string;
  rating: number;
  keyTopics: string[];
  description: string;
  amazonLink: string;
  localAvailability: string;
}

export interface InvestmentSuggestion {
  id: string;
  title: string;
  riskLevel: 'low' | 'low-moderate' | 'moderate' | 'high';
  minimumAmount: number;
  expectedReturn: string;
  allocation: Record<string, number>;
  description: string;
  platforms: string[];
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment' | 'loan' | 'mortgage';
  bank: string;
  accountNumber: string;
  balance: number;
  currency: string;
  isActive: boolean;
  lastUpdated: string;
  interestRate?: number;
  creditLimit?: number;
  minimumPayment?: number;
  dueDate?: string;
  accountHolder: string;
  branch?: string;
  swiftCode?: string;
  color: string;
}

export interface AccountTransaction {
  id: string;
  accountId: string;
  date: string;
  description: string;
  amount: number;
  balance: number;
  category: string;
  type: 'debit' | 'credit';
  reference?: string;
  merchant?: string;
  location?: string;
}

export interface AccountSummary {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  totalChecking: number;
  totalSavings: number;
  totalCredit: number;
  totalInvestments: number;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  idNumber: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  employment: {
    status: 'employed' | 'self-employed' | 'unemployed' | 'retired' | 'student';
    company?: string;
    position?: string;
    industry?: string;
    monthlyIncome?: number;
  };
  financialProfile: {
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
    investmentExperience: 'beginner' | 'intermediate' | 'advanced';
    financialGoals: string[];
    timeHorizon: 'short' | 'medium' | 'long';
  };
  preferences: {
    currency: string;
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
      budgetAlerts: boolean;
      goalReminders: boolean;
      investmentUpdates: boolean;
    };
    privacy: {
      showBalances: boolean;
      shareData: boolean;
      marketingEmails: boolean;
    };
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    loginHistory: Array<{
      date: string;
      device: string;
      location: string;
      ip: string;
    }>;
  };
  subscription: {
    plan: 'free' | 'premium' | 'pro';
    status: 'active' | 'cancelled' | 'expired';
    nextBilling?: string;
    features: string[];
  };
  createdAt: string;
  lastLogin: string;
  profilePicture?: string;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  budgetAlerts: boolean;
  goalReminders: boolean;
  investmentUpdates: boolean;
  weeklyReports: boolean;
  monthlyStatements: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
  sessionTimeout: number;
  loginNotifications: boolean;
  deviceTrust: boolean;
}

export interface ReceiptData {
  merchant: string;
  amount: number;
  date: string;
  category: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  taxAmount?: number;
  paymentMethod?: string;
  confidence: number;
}