'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';

interface ToggleIconProps {
  isOpen: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export default function ToggleIcon({ isOpen, size = 'lg', className = '' }: ToggleIconProps) {
  const sizeClass = sizeMap[size];

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
            transition={{ duration: 0.15 }}
          >
            <X className={`${sizeClass} text-gray-600 dark:text-gray-400`} strokeWidth={2.5} />
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ opacity: 0, scale: 0.8, rotate: 90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: -90 }}
            transition={{ duration: 0.15 }}
          >
            <ChevronDown className={`${sizeClass} text-gray-500 dark:text-gray-400`} strokeWidth={2.5} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
