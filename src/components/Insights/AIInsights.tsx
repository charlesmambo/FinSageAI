import React, { useState } from 'react';
import { Brain, Lightbulb, AlertTriangle, Rocket, ChevronRight, BookOpen, TrendingUp, Star, Clock, Target, ExternalLink, DollarSign } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { mockAIInsights, mockBookRecommendations, mockInvestmentSuggestions } from '../../utils/mockData';
import { formatCurrency } from '../../utils/helpers';

export const AIInsights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'investments' | 'books' | 'tips'>('all');

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'tip':
        return <Lightbulb className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'opportunity':
        return <Rocket className="w-5 h-5" />;
      case 'investment':
        return <TrendingUp className="w-5 h-5" />;
      case 'book':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'tip':
        return 'bg-primary-100 text-primary-700';
      case 'warning':
        return 'bg-warning-100 text-warning-700';
      case 'opportunity':
        return 'bg-success-100 text-success-700';
      case 'investment':
        return 'bg-secondary-100 text-secondary-700';
      case 'book':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-error-100 text-error-700';
      case 'medium':
        return 'bg-warning-100 text-warning-700';
      case 'low':
        return 'bg-success-100 text-success-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-success-100 text-success-700';
      case 'low-moderate':
        return 'bg-primary-100 text-primary-700';
      case 'moderate':
        return 'bg-warning-100 text-warning-700';
      case 'high':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredInsights = activeTab === 'all' 
    ? mockAIInsights 
    : mockAIInsights.filter(insight => {
        if (activeTab === 'investments') return insight.type === 'investment';
        if (activeTab === 'books') return insight.type === 'book';
        if (activeTab === 'tips') return ['tip', 'warning', 'opportunity'].includes(insight.type);
        return true;
      });

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-full">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Financial Coach</h2>
            <p className="text-primary-100">
              Personalized insights, investment suggestions, and curated book recommendations
            </p>
          </div>
        </div>
      </Card>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'all', label: 'All Insights', icon: Brain },
          { id: 'investments', label: 'Investments', icon: TrendingUp },
          { id: 'books', label: 'Books', icon: BookOpen },
          { id: 'tips', label: 'Tips & Alerts', icon: Lightbulb }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Investment Suggestions Section */}
      {(activeTab === 'all' || activeTab === 'investments') && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-secondary-600" />
            Smart Investment Suggestions
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockInvestmentSuggestions.map((suggestion) => (
              <Card key={suggestion.id} hover className="h-full">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-gray-900">{suggestion.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(suggestion.riskLevel)}`}>
                      {suggestion.riskLevel} risk
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600">{suggestion.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Minimum:</span>
                      <span className="font-medium">{formatCurrency(suggestion.minimumAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Expected Return:</span>
                      <span className="font-medium text-success-600">{suggestion.expectedReturn}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-900">Asset Allocation:</h5>
                    {Object.entries(suggestion.allocation).map(([asset, percentage]) => (
                      <div key={asset} className="flex justify-between text-sm">
                        <span className="text-gray-600">{asset}</span>
                        <span className="font-medium">{percentage}%</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Available on:</p>
                    <div className="flex flex-wrap gap-1">
                      {suggestion.platforms.map((platform) => (
                        <span key={platform} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button variant="primary" size="sm" className="w-full">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Start Investing
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Book Recommendations Section */}
      {(activeTab === 'all' || activeTab === 'books') && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
            Curated Book Recommendations
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockBookRecommendations.map((book) => (
              <Card key={book.id} hover className="h-full">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 leading-tight">{book.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">by {book.author}</p>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{book.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">{book.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {book.readingTime}
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      book.difficulty === 'beginner' ? 'bg-success-100 text-success-700' :
                      book.difficulty === 'intermediate' ? 'bg-warning-100 text-warning-700' :
                      'bg-error-100 text-error-700'
                    }`}>
                      {book.difficulty}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-900">Key Topics:</h5>
                    <div className="flex flex-wrap gap-1">
                      {book.keyTopics.map((topic) => (
                        <span key={topic} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">{book.localAvailability}</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Buy Online
                      </Button>
                      <Button variant="primary" size="sm" className="flex-1">
                        <Target className="w-3 h-3 mr-1" />
                        Add to List
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* General AI Insights */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-primary-600" />
          {activeTab === 'all' ? 'All Insights' : 
           activeTab === 'investments' ? 'Investment Insights' :
           activeTab === 'books' ? 'Reading Insights' : 'Tips & Alerts'}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInsights.map((insight) => (
            <Card key={insight.id} hover className="h-full">
              <div className="flex items-start space-x-4 h-full">
                <div className={`p-3 rounded-full ${getInsightColor(insight.type)}`}>
                  {getInsightIcon(insight.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 leading-tight">
                      {insight.title}
                    </h3>
                    <div className="flex items-center space-x-1 ml-2">
                      {insight.priority && (
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(insight.priority)}`}>
                          {insight.priority}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    {insight.description}
                  </p>

                  {insight.keyTopics && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {insight.keyTopics.map((topic) => (
                          <span key={topic} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {insight.bookAuthor && (
                    <div className="mb-3 text-sm text-gray-600">
                      <p><strong>Author:</strong> {insight.bookAuthor}</p>
                      {insight.readingTime && <p><strong>Reading Time:</strong> {insight.readingTime}</p>}
                    </div>
                  )}

                  {insight.estimatedImpact && (
                    <div className="mb-3 p-2 bg-success-50 rounded-lg">
                      <p className="text-sm text-success-700">
                        <strong>Potential Impact:</strong> {insight.estimatedImpact}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500 capitalize">
                      {insight.category}
                    </span>
                    {insight.actionable && (
                      <Button size="sm" variant="outline">
                        Take Action
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Insights</h3>
          <p className="text-gray-600 mb-4">
            Our AI analyzes your financial patterns to provide increasingly personalized recommendations as you use the platform.
          </p>
          <Button variant="primary">
            Refresh Insights
          </Button>
        </div>
      </Card>
    </div>
  );
};