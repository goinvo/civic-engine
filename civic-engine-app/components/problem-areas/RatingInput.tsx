'use client';

import { motion } from 'framer-motion';
import { RATING_VALUES, RATING_LABELS, type ImplementationRating } from '@/types/problem-areas';

interface RatingInputProps {
  value: ImplementationRating | undefined;
  onChange: (rating: ImplementationRating) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** Compact mode hides labels and reduces padding */
  compact?: boolean;
}

// Consistent red-blue gradient for all selected ratings (matches brand gradient)
const SELECTED_GRADIENT = 'bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B]';
const SELECTED_BORDER = 'border-black';

// Neutral expressions - no color bias
const RATING_FACES: Record<ImplementationRating, string> = {
  [-2]: '😠',
  [-1]: '🙁',
  [0]: '😐',
  [1]: '🙂',
  [2]: '😀',
};

export function RatingInput({
  value,
  onChange,
  disabled = false,
  size = 'md',
}: RatingInputProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  };

  return (
    <div
      className="flex flex-wrap gap-3"
      role="radiogroup"
      aria-label="Rate this approach"
    >
      {RATING_VALUES.map((rating) => {
        const isSelected = value === rating;

        return (
          <button
            key={rating}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onChange(rating)}
            className={`
              ${sizeClasses[size]}
              font-medium rounded-full transition-all
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${
                isSelected
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
            `}
          >
            {RATING_LABELS[rating]}
          </button>
        );
      })}
    </div>
  );
}

// Spring animation config for satisfying bounce
const springTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 17,
};

// Custom easing for bouncy effect
const bouncyEase: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

// Emoji bounce animation
const emojiVariants = {
  idle: { y: 0, scale: 1 },
  selected: {
    y: [0, -8, 0, -4, 0],
    scale: [1, 1.15, 1, 1.08, 1],
    transition: { duration: 0.4, ease: bouncyEase },
  },
};

// Button pop animation
const buttonVariants = {
  idle: { scale: 1 },
  selected: {
    scale: [1, 1.08, 0.97, 1.02],
    transition: { duration: 0.35, ease: bouncyEase },
  },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

/**
 * Compact horizontal rating scale with face emojis - neobrutalist style
 * Uses Framer Motion for animations
 */
export function RatingScale({
  value,
  onChange,
  disabled = false,
  compact = false,
}: RatingInputProps) {
  return (
    <div className="flex items-stretch gap-0" role="radiogroup" aria-label="Rate this approach">
      {RATING_VALUES.map((rating, index) => {
        const isSelected = value === rating;
        const isFirst = index === 0;

        return (
          <motion.button
            key={rating}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={RATING_LABELS[rating]}
            disabled={disabled}
            onClick={() => onChange(rating)}
            variants={buttonVariants}
            initial="idle"
            animate={isSelected ? 'selected' : 'idle'}
            whileHover={!disabled ? 'hover' : undefined}
            whileTap={!disabled ? 'tap' : undefined}
            transition={springTransition}
            className={`
              flex-1 flex flex-col items-center border-2 transition-all duration-200
              ${compact ? 'py-2 gap-0' : 'py-3 gap-1'}
              ${!isFirst ? '-ml-[2px]' : ''}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${
                isSelected
                  ? `${SELECTED_GRADIENT} ${SELECTED_BORDER} text-white z-10 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`
                  : 'bg-white dark:bg-gray-900 border-black dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
              }
              focus:outline-none focus:z-10
            `}
          >
            <motion.span
              className="text-2xl"
              variants={emojiVariants}
              initial="idle"
              animate={isSelected ? 'selected' : 'idle'}
              aria-hidden="true"
            >
              {RATING_FACES[rating]}
            </motion.span>
            <motion.span
              className={`text-xs font-bold overflow-hidden ${isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}
              animate={{
                height: compact ? 0 : 'auto',
                opacity: compact ? 0 : 1,
                marginTop: compact ? 0 : 4,
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {RATING_LABELS[rating]}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}

/**
 * Display-only rating badge - neutral styling
 */
export function RatingBadge({
  rating,
  size = 'md',
}: {
  rating: ImplementationRating;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'text-xs gap-1',
    md: 'text-sm gap-1.5',
    lg: 'text-base gap-2',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium text-gray-700 dark:text-gray-300
        ${sizeClasses[size]}
      `}
    >
      <span>{RATING_FACES[rating]}</span>
      <span>{RATING_LABELS[rating]}</span>
    </span>
  );
}
