import React from 'react';
import { BookOpen, Clock, Award, Play, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { mockEducationalModules } from '../../utils/mockData';

export const EducationModules: React.FC = () => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-success-100 text-success-700';
      case 'intermediate':
        return 'bg-warning-100 text-warning-700';
      case 'advanced':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-secondary-600 to-primary-600 text-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-full">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Financial Education Hub</h2>
            <p className="text-secondary-100">
              Master your finances with expert-curated learning modules
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEducationalModules.map((module) => (
          <Card key={module.id} hover className="h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 leading-tight">
                  {module.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {module.description}
                </p>
              </div>
              {module.completed && (
                <CheckCircle className="w-5 h-5 text-success-600 ml-2 flex-shrink-0" />
              )}
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {module.duration}
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(module.difficulty)}`}>
                {module.difficulty}
              </span>
            </div>

            {module.progress > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium text-gray-900">{module.progress}%</span>
                </div>
                <ProgressBar 
                  progress={module.progress} 
                  color={module.completed ? 'success' : 'primary'} 
                />
              </div>
            )}

            <div className="mt-auto">
              <Button 
                variant={module.completed ? 'secondary' : 'primary'}
                size="sm"
                className="w-full"
                icon={module.completed ? <Award className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              >
                {module.completed ? 'Review' : module.progress > 0 ? 'Continue' : 'Start Learning'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="text-center py-8">
          <Award className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unlock Your Financial Potential</h3>
          <p className="text-gray-600 mb-4 max-w-md mx-auto">
            Complete learning modules to earn badges and unlock advanced financial strategies tailored to your goals.
          </p>
          <Button variant="primary">
            View All Courses
          </Button>
        </div>
      </Card>
    </div>
  );
};