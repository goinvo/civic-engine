'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface Step {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface AnimatedStepProgressProps {
  steps: Step[];
  currentStep: number;
  mode: 'vertical' | 'horizontal';
  className?: string;
  onTransitionComplete?: () => void;
  showDescriptions?: boolean;
  compact?: boolean;
}

export function AnimatedStepProgress({
  steps,
  currentStep,
  mode,
  className,
  onTransitionComplete,
  showDescriptions = true,
  compact = false,
}: AnimatedStepProgressProps) {
  const [internalMode, setInternalMode] = useState(mode);

  useEffect(() => {
    if (mode !== internalMode) {
      setInternalMode(mode);
    }
  }, [mode, internalMode]);

  // Spring configuration for smooth animation
  const springConfig = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  };

  // Container variants
  const containerVariants = {
    vertical: {
      flexDirection: 'column' as const,
      gap: compact ? 12 : 16,
      alignItems: 'stretch' as const,
    },
    horizontal: {
      flexDirection: 'row' as const,
      gap: 4,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
  };

  // Step item variants
  const stepVariants = {
    vertical: (index: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { ...springConfig, delay: index * 0.05 },
    }),
    horizontal: (index: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { ...springConfig, delay: index * 0.05 },
    }),
  };

  // Number circle variants
  const circleVariants = {
    vertical: {
      width: compact ? 36 : 40,
      height: compact ? 36 : 40,
      borderRadius: 0,
      transition: springConfig,
    },
    horizontal: {
      width: 12,
      height: 12,
      borderRadius: 12,
      transition: springConfig,
    },
  };

  // Text variants
  const textVariants = {
    vertical: {
      opacity: 1,
      width: 'auto',
      marginLeft: compact ? 12 : 16,
      transition: { duration: 0.3 },
    },
    horizontal: {
      opacity: 0,
      width: 0,
      marginLeft: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className={cn('w-full', className)}
      layout
      animate={containerVariants[internalMode]}
      transition={springConfig}
      style={{
        display: 'flex',
        flexDirection: containerVariants[internalMode].flexDirection,
        gap: containerVariants[internalMode].gap,
        alignItems: containerVariants[internalMode].alignItems,
        justifyContent: internalMode === 'horizontal' ? 'center' : undefined,
      }}
      onAnimationComplete={onTransitionComplete}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isPending = index > currentStep;

        return (
          <motion.div
            key={step.id}
            custom={index}
            variants={stepVariants}
            animate={internalMode}
            layout
            className={cn(
              'flex items-center',
              internalMode === 'vertical' ? 'w-full' : ''
            )}
          >
            {/* Step indicator */}
            <motion.div
              layout
              variants={circleVariants}
              animate={internalMode}
              className={cn(
                'flex items-center justify-center font-bold text-sm border-2 border-black shrink-0 overflow-hidden',
                isCompleted
                  ? 'bg-[#2F3BBD] text-white'
                  : isCurrent
                  ? 'bg-white text-[#2F3BBD] border-[#2F3BBD]'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              )}
              style={{
                width: internalMode === 'horizontal' ? 12 : (compact ? 36 : 40),
                height: internalMode === 'horizontal' ? 12 : (compact ? 36 : 40),
                borderRadius: internalMode === 'horizontal' ? 12 : 0,
              }}
            >
              <AnimatePresence mode="wait">
                {internalMode === 'vertical' && (
                  <motion.span
                    key="number"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Step content - only in vertical mode */}
            <AnimatePresence>
              {internalMode === 'vertical' && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    marginLeft: compact ? 12 : 16,
                  }}
                  exit={{
                    opacity: 0,
                    x: -10,
                    width: 0,
                    marginLeft: 0,
                  }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="flex-1 min-w-0"
                >
                  <p
                    className={cn(
                      'font-bold',
                      compact ? 'text-sm' : 'text-base',
                      isCompleted || isCurrent
                        ? 'text-neutral-dark dark:text-white'
                        : 'text-gray-400 dark:text-gray-500'
                    )}
                  >
                    {step.label}
                  </p>
                  {showDescriptions && step.description && (
                    <p
                      className={cn(
                        'text-sm',
                        isCompleted || isCurrent
                          ? 'text-neutral dark:text-gray-400'
                          : 'text-gray-300 dark:text-gray-600'
                      )}
                    >
                      {step.description}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Connecting line in horizontal mode */}
            {internalMode === 'horizontal' && index < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className={cn(
                  'h-0.5 w-4 mx-1',
                  isCompleted ? 'bg-[#2F3BBD]' : 'bg-gray-200 dark:bg-gray-600'
                )}
              />
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// Demo component that showcases the animation
export function AnimatedStepProgressDemo() {
  const [mode, setMode] = useState<'vertical' | 'horizontal'>('vertical');
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps: Step[] = [
    { id: 'explore', label: 'Explore Policies', description: 'Read about civic issues' },
    { id: 'position', label: 'Share Opinion', description: 'Tell us what you think' },
    { id: 'discuss', label: 'Discuss', description: 'Engage with classmates' },
    { id: 'revise', label: 'Reflect & Revise', description: 'Update your views' },
    { id: 'profile', label: 'Get Profile', description: 'Share your journey' },
  ];

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setMode(mode === 'vertical' ? 'horizontal' : 'vertical')}
          className="px-4 py-2 bg-[#2F3BBD] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Toggle: {mode}
        </button>
        <button
          onClick={() => setCurrentStep((prev) => (prev + 1) % demoSteps.length)}
          className="px-4 py-2 bg-white text-[#2F3BBD] font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Next Step
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <AnimatedStepProgress
          steps={demoSteps}
          currentStep={currentStep}
          mode={mode}
        />
      </div>
    </div>
  );
}
