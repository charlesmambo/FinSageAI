import React from 'react';
import { 
  LayoutDashboard, 
  PiggyBank, 
  TrendingUp, 
  Target, 
  Brain, 
  BookOpen,
  CreditCard,
  Settings,
  HelpCircle,
  DollarSign,
  TrendingDown,
  User // 👈 import for Profile icon
} from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'income', label: 'Income Sources', icon: DollarSign },
  { id: 'expenses', label: 'Expense Tracking', icon: TrendingDown },
  { id: 'budget', label: 'Budget & Planning', icon: PiggyBank },
  { id: 'investments', label: 'Investments', icon: TrendingUp },
  { id: 'goals', label: 'Financial Goals', icon: Target },
  { id: 'insights', label: 'AI Insights', icon: Brain },
  { id: 'education', label: 'Learn & Grow', icon: BookOpen },
  { id: 'accounts', label: 'Accounts', icon: CreditCard },
];

const bottomItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
  { id: 'profile', label: 'Profile', icon: User } // 👈 Profile added here
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={clsx(
                  'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200',
                  activeTab === item.id
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={clsx(
                  'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200',
                  activeTab === item.id
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
