'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

// Tooltip component for step hover - renders as a portal-like overlay
function StepTooltip({
  content,
  description,
  show
}: {
  content: string;
  description?: string;
  show: boolean;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 pointer-events-none"
        >
          <motion.div className="bg-neutral-dark text-white px-3 py-2 text-sm font-bold whitespace-nowrap border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            {content}
            {description && (
              <motion.p className="font-normal text-xs text-gray-300 mt-0.5">{description}</motion.p>
            )}
          </motion.div>
          {/* Arrow */}
          <motion.div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-neutral-dark border-l-2 border-t-2 border-black rotate-45" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
  onStepAnimationComplete?: () => void;
  onStepClick?: (stepIndex: number) => void;
  showDescriptions?: boolean;
  compact?: boolean;
  selectable?: boolean;
  /** When true, all steps appear active (not grayed out) - useful for preview/intro screens */
  previewMode?: boolean;
}

// Animation phases when transitioning from vertical to horizontal
type AnimationPhase = 'vertical' | 'collapsing-text' | 'repositioning' | 'horizontal';

// Step completion animation phases
type StepAnimationPhase = 'idle' | 'shrinking' | 'checkmark' | 'line-fill' | 'next-active' | 'show-label';

export function AnimatedStepProgress({
  steps,
  currentStep,
  mode,
  className,
  onTransitionComplete,
  onStepAnimationComplete,
  onStepClick,
  showDescriptions = true,
  compact = false,
  selectable = false,
  previewMode = false,
}: AnimatedStepProgressProps) {
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>(
    mode === 'vertical' ? 'vertical' : 'horizontal'
  );
  const [stepAnimPhase, setStepAnimPhase] = useState<StepAnimationPhase>('idle');
  const [animatingStepIndex, setAnimatingStepIndex] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  // Start with label visible if in horizontal mode (no animation on mount)
  const [showCurrentLabel, setShowCurrentLabel] = useState(mode === 'horizontal');
  const previousMode = useRef(mode);
  const previousStep = useRef(currentStep);
  const isTransitioning = useRef(false);
  const isAnimatingStep = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Size for the indicator (always square boxes with numbers)
  const indicatorSize = compact ? 36 : 40;
  const gap = 8; // gap-2 = 8px
  const lineWidth = 16;

  // Calculate the horizontal position offset for each step during repositioning
  // This calculates where each step should move to (relative to its current position)
  const getRepositionTransform = (index: number) => {
    if (animationPhase !== 'repositioning') return { x: 0, y: 0 };

    // Calculate the total width of horizontal layout
    const totalWidth = steps.length * indicatorSize + (steps.length - 1) * (gap + lineWidth + gap);

    // Get container width (or estimate if not available)
    const containerWidth = containerRef.current?.offsetWidth || 600;

    // Starting X position for the first item (centered)
    const startX = (containerWidth - totalWidth) / 2;

    // Target X position for this item
    const targetX = startX + index * (indicatorSize + gap + lineWidth + gap);

    // Current X position (left-aligned, so it's 0 for the indicator)
    // In vertical mode, items are full width, indicator is at left
    const currentX = 0;

    // Calculate Y offset - all items should move to the same Y position
    // In vertical mode, items are stacked with gap-5 (20px)
    const verticalGap = 20; // gap-5
    const currentY = index * (indicatorSize + verticalGap);
    const targetY = 0; // All items at same Y in horizontal

    return {
      x: targetX - currentX,
      y: targetY - currentY,
    };
  };

  // Handle mode transitions
  useEffect(() => {
    if (mode === previousMode.current) return;

    const prevMode = previousMode.current;
    previousMode.current = mode;
    isTransitioning.current = true;

    if (mode === 'horizontal' && prevMode === 'vertical') {
      // Phase 1: Collapse text
      setAnimationPhase('collapsing-text');
      setShowCurrentLabel(false);

      const timers: NodeJS.Timeout[] = [];

      // Phase 2: Reposition items (after text collapse)
      timers.push(setTimeout(() => {
        setAnimationPhase('repositioning');
      }, 300));

      // Phase 3: Switch to horizontal layout (items already in position)
      timers.push(setTimeout(() => {
        setAnimationPhase('horizontal');
        isTransitioning.current = false;
        // Show label after transition
        setTimeout(() => setShowCurrentLabel(true), 100);
        onTransitionComplete?.();
      }, 700));

      return () => timers.forEach(t => clearTimeout(t));
    } else if (mode === 'vertical' && prevMode === 'horizontal') {
      // Reverse transition: horizontal -> vertical
      setAnimationPhase('collapsing-text');
      setShowCurrentLabel(false);

      const timer = setTimeout(() => {
        setAnimationPhase('vertical');
        isTransitioning.current = false;
        onTransitionComplete?.();
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [mode, onTransitionComplete]);

  // Handle step changes with sequenced animation
  useEffect(() => {
    if (currentStep === previousStep.current) return;

    const prevStep = previousStep.current;
    previousStep.current = currentStep;

    // Only animate forward progress in horizontal mode
    if (currentStep > prevStep && animationPhase === 'horizontal') {
      const stepToAnimate = prevStep;

      // Mark that we're animating - prevents other effects from showing label
      isAnimatingStep.current = true;
      setAnimatingStepIndex(stepToAnimate);
      setShowCurrentLabel(false); // Hide label immediately

      // Sequence: shrink number -> checkmark pops in -> line fills -> next step activates -> show label
      setStepAnimPhase('shrinking');

      const timers: NodeJS.Timeout[] = [];

      // Phase 1: Checkmark appears
      timers.push(setTimeout(() => {
        setStepAnimPhase('checkmark');
      }, 150));

      // Phase 2: Line fills
      timers.push(setTimeout(() => {
        setStepAnimPhase('line-fill');
      }, 350));

      // Phase 3: Next step border turns blue
      timers.push(setTimeout(() => {
        setStepAnimPhase('next-active');
      }, 550));

      // Phase 4: Step animation complete, clear animating index
      timers.push(setTimeout(() => {
        setAnimatingStepIndex(null);
        setStepAnimPhase('show-label');
      }, 700));

      // Phase 5: NOW show the label (after step animations are done)
      timers.push(setTimeout(() => {
        setShowCurrentLabel(true);
      }, 800));

      // Phase 6: Final cleanup
      timers.push(setTimeout(() => {
        setStepAnimPhase('idle');
        isAnimatingStep.current = false;
        onStepAnimationComplete?.();
      }, 1000));

      return () => {
        timers.forEach(t => clearTimeout(t));
        isAnimatingStep.current = false;
      };
    } else {
      // No animation needed, immediately notify completion
      onStepAnimationComplete?.();
    }
  }, [currentStep, animationPhase, onStepAnimationComplete]);

  // Determine visual states based on animation phase
  const showText = animationPhase === 'vertical';
  const isHorizontalLayout = animationPhase === 'horizontal';
  const showLines = animationPhase === 'horizontal';
  const isRepositioning = animationPhase === 'repositioning';

  const handleStepClick = (index: number) => {
    if (selectable && onStepClick) {
      onStepClick(index);
    }
  };

  // During repositioning, we need a relative container for absolute positioning
  const containerClasses = cn(
    'w-full',
    isRepositioning ? 'relative' : 'flex',
    !isRepositioning && (isHorizontalLayout ? 'flex-row items-center justify-center gap-2' : 'flex-col items-stretch gap-5'),
    className
  );

  // Calculate container height during repositioning (height of one row)
  const repositioningHeight = isRepositioning ? indicatorSize : undefined;

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      style={isRepositioning ? { height: repositioningHeight } : undefined}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isClickable = selectable && onStepClick;

        // Animation states for this specific step
        const isAnimatingThis = animatingStepIndex === index;
        const showCheckmark = isCompleted || (isAnimatingThis && (stepAnimPhase === 'checkmark' || stepAnimPhase === 'line-fill' || stepAnimPhase === 'next-active'));
        const isBecomingCompleted = isAnimatingThis && stepAnimPhase !== 'idle';

        // Next step becomes active
        const isNextStep = animatingStepIndex !== null && index === animatingStepIndex + 1;
        const shouldShowAsActive = isCurrent || previewMode || (isNextStep && (stepAnimPhase === 'next-active'));

        // Determine background color
        const getBgColor = () => {
          if (isCompleted || isBecomingCompleted) return '#2F3BBD';
          if (shouldShowAsActive) return '#FFFFFF';
          return '#F3F4F6'; // gray-100
        };

        // Determine border color
        const getBorderColor = () => {
          if (isCompleted || isBecomingCompleted) return '#000000';
          if (shouldShowAsActive) return '#2F3BBD';
          return '#000000';
        };

        // Determine if we should show tooltip on hover for this step
        const showTooltip = isHorizontalLayout && !isCurrent && hoveredStep === index;

        // Get transform for repositioning phase
        const repoTransform = getRepositionTransform(index);

        // Common props for the step container
        const stepContainerProps = {
          className: cn(
            'flex items-center gap-2 flex-none',
            isClickable && 'cursor-pointer group',
            isRepositioning && 'absolute'
          ),
          onClick: () => handleStepClick(index),
          onMouseEnter: () => setHoveredStep(index),
          onMouseLeave: () => setHoveredStep(null),
        };

        // Use motion.div only during repositioning to avoid transform conflicts
        const StepContainer = isRepositioning ? motion.div : 'div';

        return (
          <StepContainer
            key={step.id}
            {...stepContainerProps}
            {...(isRepositioning ? {
              style: {
                left: 0,
                top: index * (indicatorSize + 20), // Initial vertical position
              },
              animate: {
                x: repoTransform.x,
                y: repoTransform.y,
              },
              transition: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1], // ease-out cubic
              },
            } : {})}
          >
            {/* Step indicator */}
            <motion.div
              className={cn(
                'flex items-center justify-center font-bold text-sm flex-none border-2 overflow-hidden',
                isClickable && [
                  'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
                  'group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]',
                  'group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
                  'group-active:translate-x-[2px] group-active:translate-y-[2px]',
                  'group-active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
                  'transition-shadow duration-150',
                ]
              )}
              style={{
                width: indicatorSize,
                height: indicatorSize,
                minWidth: indicatorSize,
                minHeight: indicatorSize,
                maxWidth: indicatorSize,
                maxHeight: indicatorSize,
              }}
              animate={{
                backgroundColor: getBgColor(),
                borderColor: getBorderColor(),
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {showCheckmark ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                    className="text-white"
                  >
                    <Check className="w-5 h-5" strokeWidth={3} />
                  </motion.div>
                ) : (
                  <motion.span
                    key="number"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, transition: { duration: 0.1 } }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                    className={cn(
                      shouldShowAsActive ? 'text-[#2F3BBD]' : 'text-gray-400 dark:text-gray-500'
                    )}
                  >
                    {index + 1}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Tooltip for non-current steps in horizontal mode */}
            {isHorizontalLayout && !isCurrent && (
              <StepTooltip
                content={step.label}
                description={step.description}
                show={showTooltip}
              />
            )}

            {/* Current step label - animated in horizontal mode AFTER other animations */}
            {isHorizontalLayout && isCurrent && (
              <AnimatePresence mode="wait">
                {showCurrentLabel && (
                  <motion.div
                    key="current-label"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden flex-shrink-0"
                  >
                    <span className="font-bold text-sm text-[#2F3BBD] whitespace-nowrap pl-1 block">
                      {step.label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Step content - only render when not in horizontal mode and not repositioning */}
            {!isHorizontalLayout && !isRepositioning && (
              <motion.div
                className="overflow-hidden"
                animate={{
                  width: showText ? 'auto' : 0,
                  opacity: showText ? 1 : 0,
                }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <div
                  className={cn(
                    'min-w-max pl-2',
                    isClickable && 'group-hover:text-[#2F3BBD] transition-colors'
                  )}
                >
                  <p
                    className={cn(
                      'font-bold whitespace-nowrap',
                      compact ? 'text-sm' : 'text-base',
                      previewMode || isCompleted || isCurrent
                        ? 'text-neutral-dark dark:text-white'
                        : 'text-gray-400 dark:text-gray-500',
                      isClickable && 'group-hover:text-[#2F3BBD] dark:group-hover:text-[#2F3BBD]'
                    )}
                  >
                    {step.label}
                  </p>
                  {showDescriptions && step.description && (
                    <p
                      className={cn(
                        'text-sm whitespace-nowrap',
                        previewMode || isCompleted || isCurrent
                          ? 'text-neutral dark:text-gray-400'
                          : 'text-gray-300 dark:text-gray-600'
                      )}
                    >
                      {step.description}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Connecting line - appears in horizontal mode */}
            {index < steps.length - 1 && (
              <div
                className={cn('relative h-0.5 overflow-hidden', selectable && 'ml-1')}
                style={{ width: showLines ? lineWidth : 0 }}
              >
                {/* Background line (gray) */}
                <motion.div
                  className="absolute inset-0 bg-gray-200 dark:bg-gray-600"
                  animate={{
                    opacity: showLines ? 1 : 0,
                  }}
                  transition={{ duration: 0.2, delay: showLines ? 0.15 : 0 }}
                />
                {/* Fill line (blue) - animates from left to right */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#2F3BBD]"
                  initial={{ width: 0 }}
                  animate={{
                    width: (isCompleted || (isAnimatingThis && (stepAnimPhase === 'line-fill' || stepAnimPhase === 'next-active'))) ? lineWidth : 0,
                  }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{ height: '100%' }}
                />
              </div>
            )}
          </StepContainer>
        );
      })}
    </div>
  );
}

// Demo component that showcases the animation
export function AnimatedStepProgressDemo() {
  const [mode, setMode] = useState<'vertical' | 'horizontal'>('vertical');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectable, setSelectable] = useState(true);

  const demoSteps: Step[] = [
    { id: 'explore', label: 'Explore Policies', description: 'Read about civic issues' },
    { id: 'position', label: 'Share Opinion', description: 'Tell us what you think' },
    { id: 'discuss', label: 'Discuss', description: 'Engage with classmates' },
    { id: 'revise', label: 'Reflect & Revise', description: 'Update your views' },
    { id: 'profile', label: 'Get Profile', description: 'Share your journey' },
  ];

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setMode('vertical')}
          className={cn(
            "px-4 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all",
            mode === 'vertical' ? 'bg-[#2F3BBD] text-white' : 'bg-white text-[#2F3BBD]'
          )}
        >
          Vertical
        </button>
        <button
          onClick={() => setMode('horizontal')}
          className={cn(
            "px-4 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all",
            mode === 'horizontal' ? 'bg-[#2F3BBD] text-white' : 'bg-white text-[#2F3BBD]'
          )}
        >
          Horizontal
        </button>
        <button
          onClick={() => setSelectable(!selectable)}
          className={cn(
            "px-4 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all",
            selectable ? 'bg-[#2F3BBD] text-white' : 'bg-white text-[#2F3BBD]'
          )}
        >
          Selectable
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
          selectable={selectable}
          onStepClick={(index) => setCurrentStep(index)}
        />
      </div>
    </div>
  );
}
