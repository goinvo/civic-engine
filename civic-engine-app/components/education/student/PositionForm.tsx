'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Star,
  ArrowRight,
  Info
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Input';
import { Stance } from '@/types/education';
import { cn } from '@/lib/utils';

interface PositionFormProps {
  policyId: string;
  policyTitle: string;
  onSubmit: (data: PositionData) => void;
  initialData?: Partial<PositionData>;
  className?: string;
}

export interface PositionData {
  stance: Stance;
  reasoning: string;
  steelman: string;
}

const STANCE_OPTIONS: { value: Stance; label: string }[] = [
  { value: 'strongly_support', label: 'Strongly support' },
  { value: 'somewhat_support', label: 'Somewhat support' },
  { value: 'neutral', label: 'Neutral / Unsure' },
  { value: 'somewhat_oppose', label: 'Somewhat oppose' },
  { value: 'strongly_oppose', label: 'Strongly oppose' },
];

const MIN_REASONING_LENGTH = 50; // About 2 sentences

export function PositionForm({
  policyId,
  policyTitle,
  onSubmit,
  initialData,
  className,
}: PositionFormProps) {
  const [stance, setStance] = useState<Stance | null>(initialData?.stance || null);
  const [reasoning, setReasoning] = useState(initialData?.reasoning || '');
  const [steelman, setSteelman] = useState(initialData?.steelman || '');
  const [showRubric, setShowRubric] = useState(false);

  const isValid = stance && reasoning.length >= MIN_REASONING_LENGTH && steelman.length >= MIN_REASONING_LENGTH;

  const handleSubmit = () => {
    if (stance && isValid) {
      onSubmit({ stance, reasoning, steelman });
    }
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2">
          Your Positions
        </h1>
        <p className="text-neutral dark:text-gray-400 mb-4">
          Now that you&apos;ve explored the policies, share your views.
          Your teacher will grade your reasoning, but responses are
          anonymized — they won&apos;t know which position is yours.
        </p>

        {/* Rubric Toggle */}
        <RubricToggle isExpanded={showRubric} onToggle={() => setShowRubric(!showRubric)} />
      </div>

      {/* Position Entry */}
      <Card variant="default" padding="lg">
        <h2 className="font-display text-xl font-black text-neutral-dark dark:text-white mb-6">
          {policyTitle}
        </h2>

        {/* Stance Selection */}
        <div className="mb-6">
          <p className="font-bold text-neutral-dark dark:text-white mb-3">
            How do you feel about this policy?
          </p>
          <div className="space-y-2">
            {STANCE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setStance(option.value)}
                className={cn(
                  'w-full text-left p-3 border-2 transition-all flex items-center gap-3',
                  stance === option.value
                    ? 'border-[#2F3BBD] bg-[#AFC5F5]/30'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-400 bg-white dark:bg-gray-900'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex-shrink-0',
                    stance === option.value
                      ? 'border-[#2F3BBD] bg-[#2F3BBD]'
                      : 'border-gray-300 dark:border-gray-500'
                  )}
                >
                  {stance === option.value && (
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  )}
                </div>
                <span className="text-neutral-dark dark:text-white">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Reasoning */}
        <div className="mb-6">
          <Textarea
            label="Why? (2+ sentences required)"
            placeholder="I support/oppose this policy because..."
            value={reasoning}
            onChange={(e) => setReasoning(e.target.value)}
            rows={4}
            charCount
            maxLength={2000}
            hint={reasoning.length < MIN_REASONING_LENGTH ? `Write at least ${MIN_REASONING_LENGTH - reasoning.length} more characters` : undefined}
          />
        </div>

        {/* Steelman */}
        <div className="mb-6">
          <div className="flex items-start gap-2 mb-1.5">
            <label className="text-sm font-bold text-neutral-dark dark:text-white">
              What&apos;s the strongest argument AGAINST your position?
            </label>
          </div>
          <p className="text-sm text-neutral dark:text-gray-400 mb-2">
            This is called &ldquo;steelmanning&rdquo; — state the other side&apos;s BEST case, not a weak version of it.
          </p>
          <Textarea
            placeholder="The strongest argument against my position is..."
            value={steelman}
            onChange={(e) => setSteelman(e.target.value)}
            rows={4}
            charCount
            maxLength={2000}
            hint={steelman.length < MIN_REASONING_LENGTH ? `Write at least ${MIN_REASONING_LENGTH - steelman.length} more characters` : undefined}
          />
        </div>

        {/* Submit */}
        <Button
          variant="primary"
          className="w-full"
          size="lg"
          disabled={!isValid}
          onClick={handleSubmit}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          Save & Continue to Next Policy
        </Button>
      </Card>
    </div>
  );
}

// Rubric component
interface RubricToggleProps {
  isExpanded: boolean;
  onToggle: () => void;
}

function RubricToggle({ isExpanded, onToggle }: RubricToggleProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-neutral-light dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-[#2F3BBD]" />
          <span className="font-bold text-neutral-dark dark:text-white">
            How You&apos;ll Be Graded
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-neutral" />
        ) : (
          <ChevronDown className="w-5 h-5 text-neutral" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-6">
              <p className="text-sm text-neutral dark:text-gray-400">
                Your teacher will grade your written responses on:
              </p>

              {/* Reasoning Rubric */}
              <RubricSection
                title="REASONING"
                subtitle="Why do you hold this position?"
                levels={[
                  {
                    stars: 3,
                    label: 'Strong',
                    description: 'Uses specific facts or examples from the reading. Explains HOW the policy would affect people. Shows you thought about it.',
                    example: 'I support raising the minimum wage because $7.25 hasn\'t changed since 2009, and according to the reading, 30 million workers would get a raise. My sister works two jobs and still can\'t afford rent.',
                  },
                  {
                    stars: 2,
                    label: 'Okay',
                    description: 'Has a reason, but it\'s vague or doesn\'t connect to the actual policy details.',
                    example: 'I support this because workers deserve more money.',
                  },
                  {
                    stars: 1,
                    label: 'Weak',
                    description: 'No real reason, or just restates the position ("I support it because it\'s good").',
                    example: 'I picked this one because it seems right.',
                  },
                ]}
              />

              {/* Steelman Rubric */}
              <RubricSection
                title="STEELMAN"
                subtitle="What's the other side's best argument?"
                levels={[
                  {
                    stars: 3,
                    label: 'Strong',
                    description: 'Shows you actually understand why someone might disagree. Uses their real concerns, not a made-up weak version.',
                    example: 'The strongest argument against is that $17/hr might work in NYC but could hurt small businesses in rural areas where cost of living is lower. A local coffee shop might have to cut hours or close.',
                  },
                  {
                    stars: 2,
                    label: 'Okay',
                    description: 'Mentions a counterargument but doesn\'t explain it fully or makes it sound dumb.',
                    example: 'Some people say it\'s bad for businesses.',
                  },
                  {
                    stars: 1,
                    label: 'Weak',
                    description: 'Doesn\'t engage with the other side, or just says "some people disagree."',
                    example: 'I don\'t know why anyone would disagree with this.',
                  },
                ]}
              />

              <p className="text-sm text-neutral dark:text-gray-400 italic">
                Note: You&apos;re graded on the QUALITY of your thinking, not on which position you take.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface RubricLevel {
  stars: 1 | 2 | 3;
  label: string;
  description: string;
  example: string;
}

interface RubricSectionProps {
  title: string;
  subtitle: string;
  levels: RubricLevel[];
}

function RubricSection({ title, subtitle, levels }: RubricSectionProps) {
  return (
    <div>
      <p className="font-bold text-neutral-dark dark:text-white mb-1">{title}</p>
      <p className="text-sm text-neutral dark:text-gray-400 mb-3">({subtitle})</p>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
        {levels.map((level) => (
          <div key={level.stars} className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < level.stars
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    )}
                  />
                ))}
              </div>
              <span className="font-bold text-neutral-dark dark:text-white">
                {level.label}:
              </span>
              <span className="text-sm text-neutral dark:text-gray-400">
                {level.description}
              </span>
            </div>
            <div className="ml-6 p-3 bg-neutral-light dark:bg-gray-800">
              <p className="text-sm text-neutral dark:text-gray-400 italic">
                Example: &ldquo;{level.example}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Revision form for after discussion
interface PositionRevisionFormProps {
  policyId: string;
  policyTitle: string;
  originalStance: Stance;
  onSubmit: (data: RevisionData) => void;
  className?: string;
}

export interface RevisionData {
  keepOriginal: boolean;
  newStance?: Stance;
  changeReason?: string;
}

export function PositionRevisionForm({
  policyId,
  policyTitle,
  originalStance,
  onSubmit,
  className,
}: PositionRevisionFormProps) {
  const [keepOriginal, setKeepOriginal] = useState(true);
  const [newStance, setNewStance] = useState<Stance | null>(null);
  const [changeReason, setChangeReason] = useState('');

  const originalLabel = STANCE_OPTIONS.find(o => o.value === originalStance)?.label || originalStance;

  const handleSubmit = () => {
    if (keepOriginal) {
      onSubmit({ keepOriginal: true });
    } else if (newStance && changeReason.length >= MIN_REASONING_LENGTH) {
      onSubmit({ keepOriginal: false, newStance, changeReason });
    }
  };

  const isValid = keepOriginal || (newStance && changeReason.length >= MIN_REASONING_LENGTH);

  return (
    <Card variant="default" padding="lg" className={className}>
      <h2 className="font-display text-xl font-black text-neutral-dark dark:text-white mb-2">
        {policyTitle}
      </h2>
      <p className="text-neutral dark:text-gray-400 mb-4">
        Your original position: <strong>{originalLabel}</strong>
      </p>

      <p className="font-medium text-neutral-dark dark:text-white mb-3">
        After discussion, do you want to revise?
      </p>

      <div className="space-y-3 mb-6">
        <button
          onClick={() => setKeepOriginal(true)}
          className={cn(
            'w-full text-left p-3 border-2 transition-all flex items-center gap-3',
            keepOriginal
              ? 'border-[#2F3BBD] bg-[#AFC5F5]/30'
              : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
          )}
        >
          <div className={cn(
            'w-5 h-5 rounded-full border-2 flex-shrink-0',
            keepOriginal ? 'border-[#2F3BBD] bg-[#2F3BBD]' : 'border-gray-300'
          )}>
            {keepOriginal && <div className="w-full h-full rounded-full flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white" /></div>}
          </div>
          <span className="text-neutral-dark dark:text-white">
            Keep my position ({originalLabel})
          </span>
        </button>

        <button
          onClick={() => setKeepOriginal(false)}
          className={cn(
            'w-full text-left p-3 border-2 transition-all flex items-center gap-3',
            !keepOriginal
              ? 'border-[#2F3BBD] bg-[#AFC5F5]/30'
              : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
          )}
        >
          <div className={cn(
            'w-5 h-5 rounded-full border-2 flex-shrink-0',
            !keepOriginal ? 'border-[#2F3BBD] bg-[#2F3BBD]' : 'border-gray-300'
          )}>
            {!keepOriginal && <div className="w-full h-full rounded-full flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white" /></div>}
          </div>
          <span className="text-neutral-dark dark:text-white">
            Change my position
          </span>
        </button>
      </div>

      <AnimatePresence>
        {!keepOriginal && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-8 border-l-2 border-[#2F3BBD] space-y-4 mb-6">
              <div>
                <p className="font-medium text-neutral-dark dark:text-white mb-2">New position:</p>
                <div className="space-y-2">
                  {STANCE_OPTIONS.filter(o => o.value !== originalStance).map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setNewStance(option.value)}
                      className={cn(
                        'w-full text-left p-2 border transition-all flex items-center gap-2 text-sm',
                        newStance === option.value
                          ? 'border-[#2F3BBD] bg-[#AFC5F5]/30'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                      )}
                    >
                      <div className={cn(
                        'w-4 h-4 rounded-full border-2 flex-shrink-0',
                        newStance === option.value ? 'border-[#2F3BBD] bg-[#2F3BBD]' : 'border-gray-300'
                      )}>
                        {newStance === option.value && <div className="w-full h-full rounded-full flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-white" /></div>}
                      </div>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <Textarea
                label="What changed your mind?"
                placeholder="I changed my position because..."
                value={changeReason}
                onChange={(e) => setChangeReason(e.target.value)}
                rows={3}
                charCount
                maxLength={1000}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        variant="primary"
        className="w-full"
        disabled={!isValid}
        onClick={handleSubmit}
        rightIcon={<ArrowRight className="w-4 h-4" />}
      >
        Save Revisions & Continue
      </Button>
    </Card>
  );
}
