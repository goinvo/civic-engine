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

    const variants = {
      default: 'bg-neutral-light text-neutral-dark border border-gray-300',
      primary: 'bg-[#AFC5F5] text-[#2F3BBD] border border-[#2F3BBD]',
      secondary: 'bg-gray-100 text-gray-700 border border-gray-300',
      success: 'bg-green-100 text-green-700 border border-green-300',
      warning: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
      danger: 'bg-[#FEB0B4] text-[#C91A2B] border border-[#C91A2B]',
      outline: 'bg-transparent text-neutral-dark border-2 border-black',
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
