'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center font-bold rounded-full';

    // Colors updated for WCAG AA contrast (4.5:1 minimum)
    const variants = {
      default: 'bg-neutral-light text-neutral-dark border border-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600',
      primary: 'bg-[#E8EEFF] text-[#1E2A78] border border-[#1E2A78] dark:bg-[#1E2A78] dark:text-[#E8EEFF] dark:border-[#4F5FBD]',
      secondary: 'bg-gray-100 text-gray-800 border border-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500',
      success: 'bg-green-50 text-green-800 border border-green-600 dark:bg-green-900 dark:text-green-100 dark:border-green-500',
      warning: 'bg-yellow-50 text-yellow-800 border border-yellow-600 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-500',
      danger: 'bg-red-50 text-red-800 border border-red-600 dark:bg-red-900 dark:text-red-100 dark:border-red-500',
      outline: 'bg-transparent text-neutral-dark border-2 border-black dark:text-white dark:border-white',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
