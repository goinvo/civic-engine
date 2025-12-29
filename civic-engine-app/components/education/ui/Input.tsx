'use client';

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-bold text-neutral-dark dark:text-white mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-2.5 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600',
            'text-neutral-dark dark:text-white placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] focus:ring-offset-1',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-shadow',
            error && 'border-[#C91A2B] focus:ring-[#C91A2B]',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="mt-1.5 text-sm text-neutral dark:text-gray-400">{hint}</p>
        )}
        {error && (
          <p className="mt-1.5 text-sm text-[#C91A2B] font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  charCount?: boolean;
  maxLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, charCount, maxLength, value, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-bold text-neutral-dark dark:text-white mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          value={value}
          maxLength={maxLength}
          className={cn(
            'w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600',
            'text-neutral-dark dark:text-white placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] focus:ring-offset-1',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-shadow resize-none',
            error && 'border-[#C91A2B] focus:ring-[#C91A2B]',
            className
          )}
          {...props}
        />
        <div className="flex justify-between mt-1.5">
          <div>
            {hint && !error && (
              <p className="text-sm text-neutral dark:text-gray-400">{hint}</p>
            )}
            {error && (
              <p className="text-sm text-[#C91A2B] font-medium">{error}</p>
            )}
          </div>
          {charCount && maxLength && (
            <p
              className={cn(
                'text-sm',
                currentLength >= maxLength
                  ? 'text-[#C91A2B] font-medium'
                  : 'text-neutral dark:text-gray-400'
              )}
            >
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input, Textarea };
