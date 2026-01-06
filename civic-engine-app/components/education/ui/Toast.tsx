'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  actions?: ToastAction[];
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: Toast = { ...toast, id };

    setToasts(prev => [...prev, newToast]);

    // Auto-dismiss if no actions and duration is set (default 5 seconds)
    if (!toast.actions) {
      const duration = toast.duration ?? 5000;
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={hideToast} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-md">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onDismiss: () => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
  };

  const bgColors: Record<ToastType, string> = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-500',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-500',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-500',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'relative p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
        'bg-white dark:bg-gray-900'
      )}
    >
      {/* Colored accent bar */}
      <div className={cn('absolute left-0 top-0 bottom-0 w-1', bgColors[toast.type].split(' ')[2])} />

      <div className="flex items-start gap-3 pl-2">
        <div className="shrink-0 mt-0.5">
          {icons[toast.type]}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-neutral-dark dark:text-white">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="text-sm text-neutral dark:text-gray-400 mt-0.5">
              {toast.message}
            </p>
          )}

          {toast.actions && toast.actions.length > 0 && (
            <div className="flex gap-2 mt-3">
              {toast.actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant === 'primary' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => {
                    action.onClick();
                    onDismiss();
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onDismiss}
          className="shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
        >
          <X className="w-4 h-4 text-neutral dark:text-gray-400" />
        </button>
      </div>
    </motion.div>
  );
}
