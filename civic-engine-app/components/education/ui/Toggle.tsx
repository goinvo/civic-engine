'use client';

import { cn } from '@/lib/utils';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelPosition?: 'left' | 'right';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  labelPosition = 'right',
  disabled = false,
  size = 'md',
  className,
}: ToggleProps) {
  const sizes = {
    sm: { track: 'w-14 h-8', thumb: 'w-6 h-6', translate: 'translate-x-6', shadow: '3px 3px 0px 0px' },
    md: { track: 'w-16 h-9', thumb: 'w-7 h-7', translate: 'translate-x-7', shadow: '4px 4px 0px 0px' },
    lg: { track: 'w-20 h-11', thumb: 'w-9 h-9', translate: 'translate-x-9', shadow: '4px 4px 0px 0px' },
  };

  const { track, thumb, translate, shadow } = sizes[size];

  return (
    <label
      className={cn(
        'inline-flex items-center gap-3 group',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className
      )}
    >
      {label && labelPosition === 'left' && (
        <span className={cn(
          'font-bold text-neutral-dark dark:text-white select-none transition-colors',
          size === 'sm' ? 'text-sm' : 'text-base',
          !disabled && 'group-hover:text-[#2F3BBD]'
        )}>
          {label}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex items-center shrink-0 rounded-full border-2 border-black transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F3BBD] focus-visible:ring-offset-2',
          track,
          checked
            ? 'bg-[#2F3BBD]'
            : 'bg-gray-200 dark:bg-gray-700',
          !disabled && [
            'hover:translate-x-[-1px] hover:translate-y-[-1px]',
            'active:translate-x-[1px] active:translate-y-[1px]',
          ]
        )}
        style={{
          boxShadow: disabled ? 'none' : `${shadow} rgba(0,0,0,1)`,
        }}
      >
        <span
          className={cn(
            'inline-block bg-white rounded-full border-2 border-black transition-all duration-200',
            thumb,
            checked ? translate : 'translate-x-0.5',
            !disabled && 'group-hover:scale-105'
          )}
        />
      </button>
      {label && labelPosition === 'right' && (
        <span className={cn(
          'font-bold text-neutral-dark dark:text-white select-none transition-colors',
          size === 'sm' ? 'text-sm' : 'text-base',
          !disabled && 'group-hover:text-[#2F3BBD]'
        )}>
          {label}
        </span>
      )}
    </label>
  );
}
