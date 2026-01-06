'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Copy,
  Check,
  Calendar,
  ChevronRight,
  Settings,
  BarChart2,
  BookOpen,
  QrCode
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Cohort, CohortPhase } from '@/types/education';
import { cn } from '@/lib/utils';

interface CohortCardProps {
  cohort: Cohort;
  onViewClass?: () => void;
  onConfigure?: () => void;
  onViewAnalytics?: () => void;
  onViewGuide?: () => void;
  className?: string;
}

const phaseLabels: Record<CohortPhase, string> = {
  not_started: 'Not started',
  exploration: 'Policy Exploration',
  positions: 'Initial Positions',
  discussion: 'Discussion',
  revision: 'Position Revision',
  reflection: 'Final Reflection',
  completed: 'Completed',
};

const phaseBadgeVariants: Record<CohortPhase, 'default' | 'primary' | 'success' | 'warning'> = {
  not_started: 'default',
  exploration: 'primary',
  positions: 'primary',
  discussion: 'warning',
  revision: 'primary',
  reflection: 'primary',
  completed: 'success',
};

export function CohortCard({
  cohort,
  onViewClass,
  onConfigure,
  onViewAnalytics,
  onViewGuide,
  className,
}: CohortCardProps) {
  const [copied, setCopied] = useState(false);

  const copyJoinCode = async () => {
    await navigator.clipboard.writeText(cohort.joinCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isConfigurable = cohort.currentPhase === 'not_started';
  const hasStarted = cohort.currentPhase !== 'not_started';

  return (
    <Card variant="default" padding="lg" className={cn('relative', className)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-display text-xl font-black text-neutral-dark dark:text-white mb-1">
            {cohort.name}
          </h3>
          <div className="flex items-center gap-3 text-sm text-neutral dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {cohort.studentCount} students
            </span>
            <Badge variant={phaseBadgeVariants[cohort.currentPhase]} size="sm">
              {phaseLabels[cohort.currentPhase]}
            </Badge>
          </div>
        </div>
      </div>

      {/* Join Code */}
      <div className="mb-4 p-3 bg-neutral-light dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-neutral dark:text-gray-400 mb-0.5">
              Join Code
            </p>
            <p className="font-mono text-lg font-black text-neutral-dark dark:text-white tracking-wider">
              {cohort.joinCode}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyJoinCode}
              leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>
      </div>

      {/* Dates */}
      {(cohort.startDate || cohort.endDate) && (
        <div className="mb-4 flex items-center gap-2 text-sm text-neutral dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          {cohort.startDate && (
            <span>
              Started: {new Date(cohort.startDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          )}
          {cohort.startDate && cohort.endDate && <span>|</span>}
          {cohort.endDate && (
            <span>
              Ends: {new Date(cohort.endDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {hasStarted ? (
          <>
            <Button
              variant="primary"
              size="sm"
              onClick={onViewClass}
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              View Class
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onViewGuide}
              leftIcon={<BookOpen className="w-4 h-4" />}
            >
              Guide
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onViewAnalytics}
              leftIcon={<BarChart2 className="w-4 h-4" />}
            >
              Analytics
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              size="sm"
              onClick={onViewClass}
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              View Class
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onConfigure}
              leftIcon={<Settings className="w-4 h-4" />}
            >
              Configure
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}

// Compact version for lists
interface CohortCardCompactProps {
  cohort: Cohort;
  onClick?: () => void;
  className?: string;
}

export function CohortCardCompact({ cohort, onClick, className }: CohortCardCompactProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        'w-full text-left p-4 bg-white dark:bg-gray-900',
        'border-2 border-black dark:border-gray-600',
        'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(75,85,99,1)]',
        'hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]',
        'transition-all',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-neutral-dark dark:text-white">
            {cohort.name}
          </h4>
          <p className="text-sm text-neutral dark:text-gray-400">
            {cohort.studentCount} students
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={phaseBadgeVariants[cohort.currentPhase]} size="sm">
            {phaseLabels[cohort.currentPhase]}
          </Badge>
          <ChevronRight className="w-5 h-5 text-neutral dark:text-gray-400" />
        </div>
      </div>
    </motion.button>
  );
}
