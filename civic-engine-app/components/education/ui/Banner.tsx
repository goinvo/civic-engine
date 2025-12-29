'use client';

import { ReactNode } from 'react';
import { Info, Lightbulb, AlertTriangle, CheckCircle, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BannerVariant = 'info' | 'tip' | 'warning' | 'success' | 'error';

export interface BannerProps {
  variant?: BannerVariant;
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles: Record<BannerVariant, { bg: string; border: string; text: string; icon: ReactNode }> = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-[#2F3BBD]',
    text: 'text-blue-800 dark:text-blue-300',
    icon: <Info className="w-5 h-5 text-[#2F3BBD]" />,
  },
  tip: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-500',
    text: 'text-yellow-800 dark:text-yellow-300',
    icon: <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />,
  },
  warning: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-500',
    text: 'text-orange-800 dark:text-orange-300',
    icon: <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-600',
    text: 'text-green-800 dark:text-green-300',
    icon: <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />,
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-[#C91A2B]',
    text: 'text-red-800 dark:text-red-300',
    icon: <XCircle className="w-5 h-5 text-[#C91A2B]" />,
  },
};

export function Banner({
  variant = 'info',
  title,
  children,
  icon,
  dismissible = false,
  onDismiss,
  className,
}: BannerProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
        styles.bg,
        className
      )}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">
        {icon ?? styles.icon}
      </div>
      <div className={cn('flex-1 text-sm', styles.text)}>
        {title && (
          <strong className="block font-bold mb-1">{title}</strong>
        )}
        {children}
      </div>
      {dismissible && onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            'flex-shrink-0 p-1 hover:bg-black/10 transition-colors',
            styles.text
          )}
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// Compact variant for inline alerts
export interface InlineBannerProps {
  variant?: BannerVariant;
  children: ReactNode;
  className?: string;
}

export function InlineBanner({
  variant = 'info',
  children,
  className,
}: InlineBannerProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 text-sm border-2 border-black',
        styles.bg,
        styles.text,
        className
      )}
      role="alert"
    >
      <span className="flex-shrink-0">
        {styles.icon}
      </span>
      {children}
    </div>
  );
}
