'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Badge } from '@/components/education/ui/Badge';
import { AnimatedStepProgress } from '@/components/education/ui';
import { studentSteps } from '@/components/education/student';
import { OnboardProvider, useOnboard } from './OnboardContext';

function OnboardLayoutContent({ children }: { children: ReactNode }) {
  const { progressMode, showWelcome, showContent, currentStep, onLayoutTransitionComplete, onStepAnimationComplete } = useOnboard();

  return (
    <div className="min-h-screen bg-neutral-light dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-4 px-6">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Badge variant="warning" size="sm">Demo Mode</Badge>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${currentStep === 0 ? 'bg-[#2F3BBD]' : 'bg-gray-300 dark:bg-gray-600'}`} />
            <div className={`w-3 h-3 rounded-full ${currentStep >= 1 ? 'bg-[#2F3BBD]' : 'bg-gray-300 dark:bg-gray-600'}`} />
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="flex-1 flex flex-col items-center p-6"
        animate={{
          justifyContent: showContent ? 'flex-start' : 'center',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <LayoutGroup>

          <motion.div layout className="w-full max-w-lg flex-1 flex flex-col">
            {/* Welcome Section - Collapses/expands vertically */}
            <AnimatePresence initial={false}>
              {showWelcome && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <motion.div
                    layout
                    className="text-center mb-6"
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  >
                    <motion.div
                      layout
                      className="w-20 h-20 mx-auto mt-8 mb-6 bg-[#2F3BBD] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      <BookOpen className="w-10 h-10 text-white" />
                    </motion.div>
                    <motion.h1
                      layout
                      className="font-display text-3xl font-black text-neutral-dark dark:text-white mb-4"
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      Welcome to Civic Engine
                    </motion.h1>
                    <motion.p
                      layout
                      className="text-lg text-neutral dark:text-gray-400"
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      Here&apos;s what you&apos;ll do:
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step Progress - Always visible, transforms from vertical to horizontal */}
            <motion.div
              layout
              animate={{
                marginBottom: progressMode === 'horizontal' ? 24 : 32,
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <AnimatedStepProgress
                steps={studentSteps}
                currentStep={currentStep}
                mode={progressMode}
                showDescriptions={progressMode === 'vertical'}
                previewMode={progressMode === 'vertical'}
                onTransitionComplete={onLayoutTransitionComplete}
                onStepAnimationComplete={onStepAnimationComplete}
              />
            </motion.div>

            {/* Page Content - Children slot */}
            <div className={showContent ? 'flex-1 flex items-center justify-center' : ''}>
              <AnimatePresence mode="wait">
                {children}
              </AnimatePresence>
            </div>
          </motion.div>
        </LayoutGroup>
      </motion.div>
    </div>
  );
}

export default function OnboardLayout({ children }: { children: ReactNode }) {
  return (
    <OnboardProvider>
      <OnboardLayoutContent>{children}</OnboardLayoutContent>
    </OnboardProvider>
  );
}
