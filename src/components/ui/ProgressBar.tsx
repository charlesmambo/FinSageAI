import React from 'react';
import { clsx } from 'clsx';

interface ProgressBarProps {
  progress: number;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'primary',
  size = 'md',
  showLabel = false,
  className
}) => {
  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    error: 'bg-error-600'
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={clsx('w-full', className)}>
      <div className={clsx('bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={clsx('transition-all duration-500 ease-out rounded-full', colorClasses[color])}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-sm text-gray-600 text-right">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};