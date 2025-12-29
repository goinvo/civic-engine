'use client';

import { forwardRef, createContext, useContext, useId } from 'react';
import { cn } from '@/lib/utils';

// Context for RadioGroup
interface RadioGroupContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup');
  }
  return context;
}

// RadioGroup component
export interface RadioGroupProps {
  name?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function RadioGroup({
  name,
  value,
  onChange,
  label,
  error,
  required,
  disabled,
  className,
  children,
}: RadioGroupProps) {
  const generatedName = useId();
  const groupName = name || generatedName;
  const errorId = error ? `${groupName}-error` : undefined;

  return (
    <RadioGroupContext.Provider value={{ name: groupName, value, onChange, disabled }}>
      <fieldset
        className={cn('w-full', className)}
        aria-describedby={errorId}
        aria-invalid={error ? 'true' : undefined}
        disabled={disabled}
      >
        {label && (
          <legend className="block text-sm font-bold text-neutral-dark dark:text-white mb-3">
            {label}
            {required && <span className="text-[#C91A2B] ml-1" aria-hidden="true">*</span>}
          </legend>
        )}
        <div role="radiogroup" aria-required={required}>
          {children}
        </div>
        {error && (
          <p id={errorId} role="alert" className="mt-2 text-sm text-[#C91A2B] font-medium">
            {error}
          </p>
        )}
      </fieldset>
    </RadioGroupContext.Provider>
  );
}

// RadioGroupItem component
export interface RadioGroupItemProps {
  value: string;
  label: string;
  description?: string;
  className?: string;
}

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ value, label, description, className }, ref) => {
    const { name, value: selectedValue, onChange, disabled } = useRadioGroupContext();
    const id = useId();
    const isSelected = selectedValue === value;

    return (
      <label
        htmlFor={id}
        className={cn(
          'flex items-start gap-3 p-4 cursor-pointer',
          'border-2 transition-all',
          isSelected
            ? 'border-[#2F3BBD] bg-[#E8EEFF] dark:bg-[#1E2A78]/20'
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
          disabled && 'opacity-50 cursor-not-allowed',
          'focus-within:ring-2 focus-within:ring-[#2F3BBD] focus-within:ring-offset-1',
          className
        )}
      >
        <input
          ref={ref}
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={isSelected}
          onChange={() => onChange(value)}
          disabled={disabled}
          className="sr-only"
          aria-describedby={description ? `${id}-description` : undefined}
        />
        <div
          className={cn(
            'w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5',
            isSelected
              ? 'border-[#2F3BBD] bg-[#2F3BBD]'
              : 'border-gray-400 dark:border-gray-500'
          )}
          aria-hidden="true"
        >
          {isSelected && (
            <div className="w-2 h-2 rounded-full bg-white" />
          )}
        </div>
        <div className="flex-1">
          <span className="font-medium text-neutral-dark dark:text-white">
            {label}
          </span>
          {description && (
            <p
              id={`${id}-description`}
              className="mt-1 text-sm text-neutral dark:text-gray-400"
            >
              {description}
            </p>
          )}
        </div>
      </label>
    );
  }
);

RadioGroupItem.displayName = 'RadioGroupItem';

// Vertical stack layout for RadioGroup items
export function RadioGroupStack({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('space-y-2', className)}>{children}</div>;
}

// Horizontal layout for RadioGroup items (useful for stance selection)
export function RadioGroupRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {children}
    </div>
  );
}

// Compact radio item (for inline selections like stance)
export const RadioGroupChip = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ value, label, className }, ref) => {
    const { name, value: selectedValue, onChange, disabled } = useRadioGroupContext();
    const id = useId();
    const isSelected = selectedValue === value;

    return (
      <label
        htmlFor={id}
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2 cursor-pointer',
          'border-2 rounded-full transition-all font-medium',
          isSelected
            ? 'border-[#2F3BBD] bg-[#2F3BBD] text-white'
            : 'border-gray-300 dark:border-gray-600 text-neutral-dark dark:text-white hover:border-gray-400',
          disabled && 'opacity-50 cursor-not-allowed',
          'focus-within:ring-2 focus-within:ring-[#2F3BBD] focus-within:ring-offset-2',
          className
        )}
      >
        <input
          ref={ref}
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={isSelected}
          onChange={() => onChange(value)}
          disabled={disabled}
          className="sr-only"
        />
        {label}
      </label>
    );
  }
);

RadioGroupChip.displayName = 'RadioGroupChip';
