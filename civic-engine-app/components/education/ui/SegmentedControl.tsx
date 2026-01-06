'use client';

import { cn } from '@/lib/utils';

export interface SegmentedControlOption<T extends string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = 'md',
  disabled = false,
  className,
}: SegmentedControlProps<T>) {
  const sizes = {
    sm: { container: 'h-9', text: 'text-sm px-4', shadow: '3px 3px 0px 0px' },
    md: { container: 'h-10', text: 'text-sm px-5', shadow: '4px 4px 0px 0px' },
    lg: { container: 'h-12', text: 'text-base px-6', shadow: '4px 4px 0px 0px' },
  };

  const { container, text, shadow } = sizes[size];

  return (
    <div
      className={cn(
        'inline-flex border-2 border-black bg-gray-100 dark:bg-gray-800',
        container,
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      style={{
        boxShadow: disabled ? 'none' : `${shadow} rgba(0,0,0,1)`,
      }}
    >
      {options.map((option, index) => {
        const isSelected = value === option.value;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        return (
          <button
            key={option.value}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onChange(option.value)}
            className={cn(
              'font-bold transition-all duration-150 h-full',
              text,
              isSelected
                ? 'bg-[#2F3BBD] text-white'
                : 'bg-transparent text-neutral-dark dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
              !isFirst && 'border-l-2 border-black',
              disabled && 'cursor-not-allowed'
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
