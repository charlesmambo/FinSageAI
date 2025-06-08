import React, { useState, useEffect } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { OverviewStats } from './components/Dashboard/OverviewStats';
import { RecentTransactions } from './components/Dashboard/RecentTransactions';
import { SpendingChart } from './components/Dashboard/SpendingChart';
import { BudgetOverview } from './components/Budget/BudgetOverview';
import { PortfolioOverview } from './components/Investments/PortfolioOverview';
import { GoalsOverview } from './components/Goals/GoalsOverview';
import { AIInsights } from './components/Insights/AIInsights';
import { EducationModules } from './components/Education/EducationModules';
import { IncomeOverview } from './components/Income/IncomeOverview';
import { ExpenseOverview } from './components/Expenses/ExpenseOverview';
import { Alert } from './components/ui/Alert';
import { mockIncomeSources, mockExpenses } from './utils/mockData';
import { IncomeSource, Expense } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>(mockIncomeSources);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [showExpensePrompt, setShowExpensePrompt] = useState(false);

  // Check if user has income but no expenses to show prompt
  useEffect(() => {
    const hasIncome = incomeSources.length > 0;
    const hasExpenses = expenses.length > 0;
    
    if (hasIncome && !hasExpenses && activeTab === 'dashboard') {
      setShowExpensePrompt(true);
    }
  }, [incomeSources, expenses, activeTab]);

  const handleAddIncome = (newIncome: Omit<IncomeSource, 'id'>) => {
    const income: IncomeSource = {
      ...newIncome,
      id: Date.now().toString()
    };
    setIncomeSources(prev => [...prev, income]);
  };

  const handleUpdateIncome = (id: string, updates: Partial<IncomeSource>) => {
    setIncomeSources(prev => 
      prev.map(income => 
        income.id === id ? { ...income, ...updates } : income
      )
    );
  };

  const handleDeleteIncome = (id: string) => {
    setIncomeSources(prev => prev.filter(income => income.id !== id));
  };

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExpense,
      id: Date.now().toString()
    };
    setExpenses(prev => [...prev, expense]);
    setShowExpensePrompt(false);
  };

  const handleUpdateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === id ? { ...expense, ...updates } : expense
      )
    );
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Financial Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your financial overview.</p>
            </div>
            
            {showExpensePrompt && (
              <Alert
                type="info"
                title="Complete Your Financial Profile"
                message="Great! You've added your income sources. Now let's track your expenses to get a complete picture of your finances."
                onClose={() => setShowExpensePrompt(false)}
              />
            )}
            
            <OverviewStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentTransactions />
              <SpendingChart />
            </div>
          </div>
        );
      case 'income':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Income Management</h1>
              <p className="text-gray-600">Track and manage all your income sources.</p>
            </div>
            <IncomeOverview
              incomeSources={incomeSources}
              onAddIncome={handleAddIncome}
              onUpdateIncome={handleUpdateIncome}
              onDeleteIncome={handleDeleteIncome}
            />
          </div>
        );
      case 'expenses':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Expense Tracking</h1>
              <p className="text-gray-600">Monitor and categorize your spending to stay on budget.</p>
            </div>
            <ExpenseOverview
              expenses={expenses}
              onAddExpense={handleAddExpense}
              onUpdateExpense={handleUpdateExpense}
              onDeleteExpense={handleDeleteExpense}
            />
          </div>
        );
      case 'budget':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Budget & Expenses</h1>
              <p className="text-gray-600">Track your spending and manage your budget categories.</p>
            </div>
            <BudgetOverview />
          </div>
        );
      case 'investments':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Investment Portfolio</h1>
              <p className="text-gray-600">Monitor your investments and track performance.</p>
            </div>
            <PortfolioOverview />
          </div>
        );
      case 'goals':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Financial Goals</h1>
              <p className="text-gray-600">Set, track, and achieve your financial objectives.</p>
            </div>
            <GoalsOverview />
          </div>
        );
      case 'insights':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Insights</h1>
              <p className="text-gray-600">Personalized recommendations from your AI financial coach.</p>
            </div>
            <AIInsights />
          </div>
        );
      case 'education':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Financial Education</h1>
              <p className="text-gray-600">Learn and master financial concepts with interactive modules.</p>
            </div>
            <EducationModules />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
              <p className="text-gray-600">This feature is under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;