'use client';

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';

type OnboardPhase = 'intro' | 'transitioning' | 'joined';
type ProgressMode = 'vertical' | 'horizontal';

interface OnboardContextType {
  phase: OnboardPhase;
  progressMode: ProgressMode;
  showWelcome: boolean;
  showContent: boolean;
  currentStep: number;
  startTransition: () => void;
  completeTransition: () => void;
  goBackToIntro: () => void;
  onLayoutTransitionComplete: () => void;
  onStepAnimationComplete: () => void;
}

const OnboardContext = createContext<OnboardContextType | null>(null);

export function OnboardProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<OnboardPhase>('intro');
  const [progressMode, setProgressMode] = useState<ProgressMode>('vertical');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Track if we're waiting for animations
  const waitingForLayout = useRef(false);
  const waitingForStep = useRef(false);

  const startTransition = useCallback(() => {
    setPhase('transitioning');
    setShowContent(false);
    waitingForLayout.current = true;
    waitingForStep.current = true;

    // Step 1: Hide welcome content
    setShowWelcome(false);

    // Step 2: After welcome fades, switch to horizontal mode (step stays at 0)
    setTimeout(() => {
      setProgressMode('horizontal');
    }, 400);
  }, []);

  // Called when AnimatedStepProgress finishes mode transition
  const onLayoutTransitionComplete = useCallback(() => {
    if (waitingForLayout.current) {
      waitingForLayout.current = false;
      // Stay on step 0 (Enter Class Code) - don't advance yet
      // Step advances when user completes the join form
      setPhase('joined');
      setShowContent(true);
      waitingForStep.current = false;
    }
  }, []);

  // Called when AnimatedStepProgress finishes step animation
  const onStepAnimationComplete = useCallback(() => {
    if (waitingForStep.current) {
      waitingForStep.current = false;
      // Now show the content
      setPhase('joined');
      setShowContent(true);
    }
  }, []);

  const completeTransition = useCallback(() => {
    setPhase('joined');
  }, []);

  const goBackToIntro = useCallback(() => {
    setPhase('transitioning');
    setShowContent(false);
    // Step 1: Switch back to vertical mode
    setProgressMode('vertical');
    setCurrentStep(0);

    // Step 2: After layout settles, show welcome content
    setTimeout(() => {
      setShowWelcome(true);
      setPhase('intro');
    }, 400);
  }, []);

  return (
    <OnboardContext.Provider
      value={{
        phase,
        progressMode,
        showWelcome,
        showContent,
        currentStep,
        startTransition,
        completeTransition,
        goBackToIntro,
        onLayoutTransitionComplete,
        onStepAnimationComplete,
      }}
    >
      {children}
    </OnboardContext.Provider>
  );
}

export function useOnboard() {
  const context = useContext(OnboardContext);
  if (!context) {
    throw new Error('useOnboard must be used within an OnboardProvider');
  }
  return context;
}
