'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      variant = 'primary',
      size = 'md',
      showLabel = false,
      label,
      animated = true,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const trackSizes = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
    };

    const barColors = {
      default: 'bg-neutral-dark',
      primary: 'bg-[#2F3BBD]',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      danger: 'bg-[#C91A2B]',
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {(showLabel || label) && (
          <div className="flex justify-between items-center mb-1.5">
            {label && (
              <span className="text-sm font-medium text-neutral-dark dark:text-white">
                {label}
              </span>
            )}
            {showLabel && (
              <span className="text-sm font-bold text-neutral dark:text-gray-400">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          className={cn(
            'w-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-black dark:border-gray-600',
            trackSizes[size]
          )}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <motion.div
            className={cn('h-full', barColors[variant])}
            initial={animated ? { width: 0 } : { width: `${percentage}%` }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

// Step progress for multi-step flows
interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  steps?: string[];
  descriptions?: string[];
  className?: string;
  /** When true, all steps are styled uniformly without highlighting current/completed */
  previewMode?: boolean;
  /** Show steps vertically with labels */
  vertical?: boolean;
}

export function StepProgress({
  currentStep,
  totalSteps,
  steps,
  descriptions,
  className,
  previewMode = false,
  vertical = false,
}: StepProgressProps) {
  if (vertical) {
    return (
      <div className={cn('w-full', className)}>
        <div className="space-y-4">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-start gap-4">
              {/* Circle */}
              <div
                className={cn(
                  'w-10 h-10 aspect-square flex items-center justify-center border-2 border-black font-bold text-sm shrink-0',
                  previewMode
                    ? 'bg-[#2F3BBD] text-white'
                    : index < currentStep
                    ? 'bg-[#2F3BBD] text-white'
                    : index === currentStep
                    ? 'bg-white text-[#2F3BBD]'
                    : 'bg-gray-100 text-gray-400'
                )}
              >
                {index + 1}
              </div>
              {/* Content */}
              <div className="flex-1 pt-1">
                {steps && steps[index] && (
                  <p className="font-bold text-neutral-dark dark:text-white">
                    {steps[index]}
                  </p>
                )}
                {descriptions && descriptions[index] && (
                  <p className="text-sm text-neutral dark:text-gray-400">
                    {descriptions[index]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            {/* Circle - fixed size */}
            <div
              className={cn(
                'w-8 h-8 aspect-square rounded-full flex items-center justify-center border-2 border-black font-bold text-sm transition-colors',
                previewMode
                  ? 'bg-[#2F3BBD] text-white'
                  : index < currentStep
                  ? 'bg-[#2F3BBD] text-white'
                  : index === currentStep
                  ? 'bg-white text-[#2F3BBD]'
                  : 'bg-gray-100 text-gray-400'
              )}
            >
              {index + 1}
            </div>
            {/* Connecting line */}
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  'h-0.5 flex-1 mx-2 transition-colors',
                  previewMode ? 'bg-[#2F3BBD]' : index < currentStep ? 'bg-[#2F3BBD]' : 'bg-gray-200'
                )}
              />
            )}
          </div>
        ))}
      </div>
      {steps && steps[currentStep] && !previewMode && (
        <p className="text-sm text-center font-medium text-neutral-dark dark:text-white">
          {steps[currentStep]}
        </p>
      )}
    </div>
  );
}

export { Progress };
