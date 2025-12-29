'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Star,
  Info,
  ArrowRight
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Input';
import { cn } from '@/lib/utils';

interface PolicyOption {
  id: string;
  title: string;
}

interface ReflectionFormProps {
  policies: PolicyOption[];
  onSubmit: (data: ReflectionData) => void;
  className?: string;
}

export interface ReflectionData {
  topPriorities: string[]; // Policy IDs, ordered
  priorityReasoning: string;
  learningReflection: string;
  discussionReflection: string;
}

const MIN_LENGTH = 50;

export function ReflectionForm({
  policies,
  onSubmit,
  className,
}: ReflectionFormProps) {
  const [topPriorities, setTopPriorities] = useState<string[]>([]);
  const [priorityReasoning, setPriorityReasoning] = useState('');
  const [learningReflection, setLearningReflection] = useState('');
  const [discussionReflection, setDiscussionReflection] = useState('');
  const [showRubric, setShowRubric] = useState(false);

  const togglePriority = (policyId: string) => {
    setTopPriorities(prev => {
      if (prev.includes(policyId)) {
        return prev.filter(id => id !== policyId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, policyId];
    });
  };

  const isValid =
    topPriorities.length === 3 &&
    priorityReasoning.length >= MIN_LENGTH &&
    learningReflection.length >= MIN_LENGTH &&
    discussionReflection.length >= MIN_LENGTH;

  const handleSubmit = () => {
    if (isValid) {
      onSubmit({
        topPriorities,
        priorityReasoning,
        learningReflection,
        discussionReflection,
      });
    }
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2">
          Final Reflection
        </h1>
        <p className="text-neutral dark:text-gray-400">
          You&apos;ve explored {policies.length} policies, discussed them with your
          classmates, and refined your positions. Nice work!
        </p>
      </div>

      {/* Rubric Toggle */}
      <ReflectionRubricToggle
        isExpanded={showRubric}
        onToggle={() => setShowRubric(!showRubric)}
      />

      <div className="space-y-6 mt-6">
        {/* Top 3 Priorities */}
        <Card variant="default" padding="lg">
          <h2 className="font-display text-lg font-black text-neutral-dark dark:text-white mb-2">
            Your Top 3 Priorities
          </h2>
          <p className="text-neutral dark:text-gray-400 mb-4">
            If you could only focus on 3 policies, which would matter most to you?
            {topPriorities.length < 3 && (
              <span className="font-medium"> (Select {3 - topPriorities.length} more)</span>
            )}
          </p>

          {/* Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {policies.map((policy) => {
              const index = topPriorities.indexOf(policy.id);
              const isSelected = index !== -1;
              const isDisabled = !isSelected && topPriorities.length >= 3;

              return (
                <button
                  key={policy.id}
                  onClick={() => togglePriority(policy.id)}
                  disabled={isDisabled}
                  className={cn(
                    'text-left p-3 border-2 transition-all flex items-center gap-3',
                    isSelected
                      ? 'border-[#2F3BBD] bg-[#AFC5F5]/30'
                      : isDisabled
                      ? 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                  )}
                >
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-[#2F3BBD] flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                  )}
                  <span className="text-sm font-medium text-neutral-dark dark:text-white">
                    {policy.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Reorder display */}
          {topPriorities.length > 0 && (
            <div className="mb-4 p-3 bg-neutral-light dark:bg-gray-800">
              <p className="text-xs text-neutral dark:text-gray-400 mb-2">
                Your ranking (drag to reorder):
              </p>
              <Reorder.Group values={topPriorities} onReorder={setTopPriorities} className="space-y-2">
                {topPriorities.map((policyId, index) => {
                  const policy = policies.find(p => p.id === policyId);
                  return (
                    <Reorder.Item
                      key={policyId}
                      value={policyId}
                      className="flex items-center gap-2 p-2 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 cursor-grab active:cursor-grabbing"
                    >
                      <GripVertical className="w-4 h-4 text-neutral" />
                      <span className="font-bold text-[#2F3BBD]">{index + 1}.</span>
                      <span className="text-sm text-neutral-dark dark:text-white">
                        {policy?.title}
                      </span>
                    </Reorder.Item>
                  );
                })}
              </Reorder.Group>
            </div>
          )}

          <Textarea
            label="Why these three? (Be specific — what makes these more important to you than the others?)"
            placeholder="These three are connected for me because..."
            value={priorityReasoning}
            onChange={(e) => setPriorityReasoning(e.target.value)}
            rows={4}
            charCount
            maxLength={2000}
          />
        </Card>

        {/* What did you learn */}
        <Card variant="default" padding="lg">
          <h2 className="font-display text-lg font-black text-neutral-dark dark:text-white mb-4">
            What Did You Learn?
          </h2>

          <div className="space-y-4">
            <Textarea
              label="Did any of your positions change during this process? What specifically made you reconsider?"
              placeholder="I went from [X] to [Y] on [policy] because..."
              value={learningReflection}
              onChange={(e) => setLearningReflection(e.target.value)}
              rows={4}
              charCount
              maxLength={2000}
            />

            <Textarea
              label="What was it like discussing politics with classmates?"
              placeholder="It was [better/harder/different] than expected because..."
              value={discussionReflection}
              onChange={(e) => setDiscussionReflection(e.target.value)}
              rows={4}
              charCount
              maxLength={2000}
            />
          </div>
        </Card>

        {/* Submit */}
        <Button
          variant="primary"
          className="w-full"
          size="lg"
          disabled={!isValid}
          onClick={handleSubmit}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          Complete Reflection
        </Button>
      </div>
    </div>
  );
}

// Reflection rubric toggle
function ReflectionRubricToggle({ isExpanded, onToggle }: { isExpanded: boolean; onToggle: () => void }) {
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
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
              {/* Priority Reasoning */}
              <RubricBlock
                title="PRIORITY REASONING"
                subtitle="Why these 3?"
                levels={[
                  {
                    stars: 3,
                    label: 'Strong',
                    description: 'Explains specific reasons for each policy. Connects to your life, community, or values.',
                    example: 'These three are connected for me. My sister works full-time but can\'t afford her own place because rent is too high and wages are too low. The stress has really affected her mental health.',
                  },
                  {
                    stars: 2,
                    label: 'Okay',
                    description: 'Gives reasons but they\'re generic or don\'t explain why these matter MORE than others.',
                    example: 'These are important issues that affect a lot of people.',
                  },
                  {
                    stars: 1,
                    label: 'Weak',
                    description: 'No real reasons ("I just picked these") or joke answers.',
                    example: 'I picked these because they were at the top of the list.',
                  },
                ]}
              />

              {/* Learning Reflection */}
              <RubricBlock
                title="LEARNING REFLECTION"
                subtitle="What changed? What did you learn?"
                levels={[
                  {
                    stars: 3,
                    label: 'Strong',
                    description: 'Describes specific moments where your thinking changed. Names what you learned from a classmate or from the reading.',
                    example: 'I went from "strongly support" to "somewhat support" on minimum wage after Jordan pointed out it might hurt small towns. I still support raising it, but now I think maybe it should vary by location.',
                  },
                  {
                    stars: 2,
                    label: 'Okay',
                    description: 'Says something changed but doesn\'t explain what or why.',
                    example: 'I learned some new things and changed my mind a little.',
                  },
                  {
                    stars: 1,
                    label: 'Weak',
                    description: '"Nothing changed" with no reflection, or clearly didn\'t engage with the process.',
                    example: 'I didn\'t learn anything new.',
                  },
                ]}
              />

              <p className="text-sm text-neutral dark:text-gray-400 italic">
                Note: It&apos;s fine if your positions DIDN&apos;T change — just explain why.
                Good thinkers can be strengthened in their views through deliberation.
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

function RubricBlock({ title, subtitle, levels }: { title: string; subtitle: string; levels: RubricLevel[] }) {
  return (
    <div>
      <p className="font-bold text-neutral-dark dark:text-white mb-1">{title}</p>
      <p className="text-sm text-neutral dark:text-gray-400 mb-2">({subtitle})</p>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
        {levels.map((level) => (
          <div key={level.stars} className="p-3">
            <div className="flex items-start gap-2 mb-1">
              <div className="flex">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-3 h-3',
                      i < level.stars
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    )}
                  />
                ))}
              </div>
              <span className="font-bold text-sm text-neutral-dark dark:text-white">
                {level.label}:
              </span>
              <span className="text-xs text-neutral dark:text-gray-400">
                {level.description}
              </span>
            </div>
            <div className="ml-5 p-2 bg-neutral-light dark:bg-gray-800 rounded text-xs text-neutral dark:text-gray-400 italic">
              Example: &ldquo;{level.example}&rdquo;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
