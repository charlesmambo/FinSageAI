import React from 'react';
import { Bell, Settings, User, Search } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onTabChange }) => {
  
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FA</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">FinSageAI</h1>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search transactions, goals, insights..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" icon={<Bell className="w-4 h-4" />}>
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="sm" icon={<Settings className="w-4 h-4" />}>
            <span className="sr-only">Settings</span>
          </Button>
            <Button 
            variant="ghost" 
            size="sm" 
            icon={<User className="w-4 h-4" />} 
          >
            Profile
          </Button>
        </div>
      </div>
    </header>
  );
};