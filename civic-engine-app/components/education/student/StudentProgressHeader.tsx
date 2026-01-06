'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/education/ui/Badge';
import { AnimatedStepProgress, Step } from '@/components/education/ui';
import { useDemoAuth } from '@/lib/auth/demo-auth-context';
import type { GradeLevel } from '@/types/education';

// Shared student journey steps (default for older students)
export const studentSteps: Step[] = [
  { id: 'join', label: 'Enter Class Code', description: 'Join your class with the code from your teacher' },
  { id: 'explore', label: 'Explore Policies', description: 'Read about policies that most Americans agree on' },
  { id: 'rubric', label: 'View Rubric & Examples', description: 'See grading criteria and example responses' },
  { id: 'discuss', label: 'Class Discussion', description: 'Discuss with your classmates' },
  { id: 'reflect', label: 'Reflect & Finish', description: 'Get your civic profile to share' },
];

// Elementary-specific steps (K-5)
export const elementarySteps: Step[] = [
  { id: 'join', label: 'Join Your Class', description: 'Enter the code from your teacher' },
  { id: 'learn', label: 'What is a Policy?', description: 'Learn about rules and how they help us' },
  { id: 'rubric', label: 'How to Share Ideas', description: 'Learn how to share your thoughts' },
  { id: 'discuss', label: 'Share Your Ideas', description: 'Tell us what you think!' },
  { id: 'reflect', label: 'All Done!', description: 'See what you learned' },
];

// Map step indices to routes
const stepRoutes: Record<number, string> = {
  0: '/education/student/onboard',
  1: '/education/student/explore',
  2: '/education/student/rubric',
  3: '/education/student/discuss',
  4: '/education/student/reflect',
};

const gradeLevelLabels: Record<GradeLevel, string> = {
  'K-5': 'Elementary (K-5)',
  '6-8': 'Middle School (6-8)',
  '9-10': 'High School (9-10)',
  '11-12': 'High School (11-12)',
  'college': 'College',
};

export interface StudentProgressHeaderProps {
  currentStep: number;
  backHref?: string;
  backLabel?: string;
}

export function StudentProgressHeader({
  currentStep,
  backHref = '/education/student',
  backLabel = 'Back',
}: StudentProgressHeaderProps) {
  const router = useRouter();
  const { gradeLevel, setGradeLevel } = useDemoAuth();

  // Use elementary-specific steps for K-5
  const isElementary = gradeLevel === 'K-5';
  const steps = isElementary ? elementarySteps : studentSteps;

  const handleGradeLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGradeLevel(e.target.value as GradeLevel);
  };

  const handleStepClick = (stepIndex: number) => {
    const route = stepRoutes[stepIndex];
    if (route) {
      router.push(route);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="py-3 px-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-neutral dark:text-gray-400 hover:text-neutral-dark dark:hover:text-white transition-colors text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Link>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={gradeLevel}
                onChange={handleGradeLevelChange}
                className="appearance-none bg-amber-50 text-amber-800 text-xs font-bold px-3 py-1.5 pr-7 border-2 border-amber-300 cursor-pointer hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
              >
                {(Object.keys(gradeLevelLabels) as GradeLevel[]).map((level) => (
                  <option key={level} value={level}>
                    {gradeLevelLabels[level]}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-amber-600 pointer-events-none" />
            </div>
            <Badge variant="warning" size="sm">Demo</Badge>
          </div>
        </div>
      </div>
      <div className="py-4 px-6 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-2xl mx-auto">
          <AnimatedStepProgress
            steps={steps}
            currentStep={currentStep}
            mode="horizontal"
            compact={true}
            selectable={true}
            onStepClick={handleStepClick}
          />
        </div>
      </div>
    </div>
  );
}
