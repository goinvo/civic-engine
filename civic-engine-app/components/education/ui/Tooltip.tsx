'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-black border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-black border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-black border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-black border-y-transparent border-l-transparent',
  };

  return (
    <span
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      onClick={() => setIsVisible(!isVisible)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 px-3 py-2 text-sm bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
              'min-w-[200px] max-w-sm whitespace-normal',
              positionClasses[position],
              className
            )}
          >
            {content}
            <span
              className={cn(
                'absolute w-0 h-0 border-4',
                arrowClasses[position]
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

// Inline definition tooltip for policy terms
interface DefinitionTooltipProps {
  term: string;
  definition: string;
  children: ReactNode;
}

export function DefinitionTooltip({ term, definition, children }: DefinitionTooltipProps) {
  return (
    <Tooltip
      content={
        <div>
          <p className="font-bold text-neutral-dark mb-1">{term}</p>
          <p className="text-neutral">{definition}</p>
        </div>
      }
      position="top"
    >
      <span className="underline decoration-dotted decoration-[#2F3BBD] underline-offset-2 cursor-help">
        {children}
      </span>
    </Tooltip>
  );
}
