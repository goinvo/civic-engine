'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, ArrowRight, X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '@/lib/utils';

interface PolicyOption {
  id: string;
  title: string;
  hook: string;
  category: string;
}

interface PolicyPickerProps {
  policies: PolicyOption[];
  minRequired?: number;
  maxAllowed?: number;
  onConfirm: (selectedPolicyIds: string[]) => void;
  className?: string;
}

export function PolicyPicker({
  policies,
  minRequired = 4,
  maxAllowed = 8,
  onConfirm,
  className,
}: PolicyPickerProps) {
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const togglePolicy = (policyId: string) => {
    setSelectedPolicies(prev => {
      if (prev.includes(policyId)) {
        return prev.filter(id => id !== policyId);
      }
      if (prev.length >= maxAllowed) {
        return prev;
      }
      return [...prev, policyId];
    });
  };

  const meetsMinimum = selectedPolicies.length >= minRequired;
  const atMaximum = selectedPolicies.length >= maxAllowed;

  const handleConfirm = () => {
    if (meetsMinimum) {
      onConfirm(selectedPolicies);
    }
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2">
          Choose Your Policies
        </h1>
        <p className="text-neutral dark:text-gray-400 mb-4">
          Your class has {policies.length} policies to discuss. You don&apos;t have to
          engage deeply with all of them — pick the ones that matter to you.
        </p>
        <div className="inline-block bg-blue-50 dark:bg-blue-900/20 px-4 py-2 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Choose at least {minRequired} policies</strong> to focus on. For these, you&apos;ll
            read, answer a quick check, and share your position.
          </p>
        </div>
      </div>

      {/* Selection counter */}
      <div className="flex items-center justify-between mb-4 p-3 bg-neutral-light dark:bg-gray-800">
        <span className="text-sm text-neutral dark:text-gray-400">
          Selected: <strong className="text-neutral-dark dark:text-white">{selectedPolicies.length}</strong> of {policies.length}
        </span>
        <Badge
          variant={meetsMinimum ? 'success' : 'warning'}
          size="sm"
        >
          {meetsMinimum ? `Minimum met ✓` : `Pick ${minRequired - selectedPolicies.length} more`}
        </Badge>
      </div>

      {/* Policy Grid */}
      <div className="space-y-3 mb-6">
        {policies.map((policy) => {
          const isSelected = selectedPolicies.includes(policy.id);
          const isDisabled = atMaximum && !isSelected;

          return (
            <motion.button
              key={policy.id}
              onClick={() => togglePolicy(policy.id)}
              disabled={isDisabled}
              whileTap={{ scale: isDisabled ? 1 : 0.98 }}
              className={cn(
                'w-full text-left p-4 border-2 transition-all',
                isSelected
                  ? 'border-[#2F3BBD] bg-[#AFC5F5]/30'
                  : isDisabled
                  ? 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-400 bg-white dark:bg-gray-900'
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'w-6 h-6 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors',
                    isSelected
                      ? 'border-[#2F3BBD] bg-[#2F3BBD]'
                      : 'border-gray-300 dark:border-gray-600'
                  )}
                >
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-neutral-dark dark:text-white">
                    {policy.title}
                  </p>
                  <p className="text-sm text-neutral dark:text-gray-400 italic">
                    &ldquo;{policy.hook}&rdquo;
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Note */}
      <p className="text-sm text-neutral dark:text-gray-400 text-center mb-6">
        <Info className="w-4 h-4 inline mr-1" />
        You can still browse the other policies, but you&apos;ll only be graded on the ones you choose.
      </p>

      {/* Confirm Button */}
      <Button
        variant="primary"
        className="w-full"
        size="lg"
        disabled={!meetsMinimum}
        onClick={handleConfirm}
        rightIcon={<ArrowRight className="w-5 h-5" />}
      >
        Confirm My Choices
      </Button>
    </div>
  );
}

// Progress tracker for selected policies
interface PolicyProgressProps {
  policies: Array<{
    id: string;
    title: string;
    completed: {
      read: boolean;
      comprehension: boolean;
      position: boolean;
    };
  }>;
  onPolicyClick: (policyId: string) => void;
  className?: string;
}

export function PolicyProgress({ policies, onPolicyClick, className }: PolicyProgressProps) {
  const completedCount = policies.filter(
    p => p.completed.read && p.completed.comprehension && p.completed.position
  ).length;

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      <div className="mb-6">
        <h2 className="font-display text-xl font-black text-neutral-dark dark:text-white mb-2">
          Your Policies
        </h2>
        <p className="text-neutral dark:text-gray-400">
          Complete these {policies.length} policies to move on:
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-4 p-3 bg-neutral-light dark:bg-gray-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-neutral-dark dark:text-white">
            Progress
          </span>
          <span className="text-sm font-bold text-[#2F3BBD]">
            {completedCount}/{policies.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 border-2 border-black dark:border-gray-600 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / policies.length) * 100}%` }}
            className="bg-[#2F3BBD] h-full"
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Policy cards */}
      <div className="space-y-3 mb-6">
        {policies.map((policy) => {
          const isComplete = policy.completed.read && policy.completed.comprehension && policy.completed.position;
          const inProgress = (policy.completed.read || policy.completed.comprehension) && !isComplete;

          return (
            <Card
              key={policy.id}
              variant="default"
              padding="md"
              className="cursor-pointer hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              onClick={() => onPolicyClick(policy.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-neutral-dark dark:text-white">
                    {policy.title}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <ProgressStep
                      label="Read"
                      completed={policy.completed.read}
                    />
                    <ProgressStep
                      label="Quick check"
                      completed={policy.completed.comprehension}
                    />
                    <ProgressStep
                      label="Position"
                      completed={policy.completed.position}
                    />
                  </div>
                </div>
                <Button
                  variant={isComplete ? 'secondary' : 'primary'}
                  size="sm"
                >
                  {isComplete ? 'Review' : inProgress ? 'Continue' : 'Start'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Continue button */}
      <Button
        variant="primary"
        className="w-full"
        size="lg"
        disabled={completedCount < policies.length}
        rightIcon={<ArrowRight className="w-5 h-5" />}
      >
        {completedCount < policies.length
          ? `Complete all ${policies.length} to continue`
          : 'Continue to Discussion'}
      </Button>
    </div>
  );
}

function ProgressStep({ label, completed }: { label: string; completed: boolean }) {
  return (
    <div className="flex items-center gap-1">
      <div
        className={cn(
          'w-4 h-4 rounded-full flex items-center justify-center',
          completed ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700 border border-gray-300'
        )}
      >
        {completed && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className={cn(
        'text-xs',
        completed ? 'text-green-600 font-medium' : 'text-neutral dark:text-gray-400'
      )}>
        {label}
      </span>
    </div>
  );
}
