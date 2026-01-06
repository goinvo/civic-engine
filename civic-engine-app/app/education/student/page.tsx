'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  MessageSquare,
  PenTool,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import { useDemoAuth } from '@/lib/auth/demo-auth-context';
import { CohortPhase } from '@/types/education';
import { Button } from '@/components/education/ui/Button';
import { Badge } from '@/components/education/ui/Badge';
import { AnimatedStepProgress } from '@/components/education/ui';
import { studentSteps } from '@/components/education/student';

// Map cohort phases to step indices (0-indexed: 0=Enter Code, 1=Explore, 2=Rubric, 3=Discussion, 4=Reflect)
const phaseToStepIndex: Record<CohortPhase, number> = {
  not_started: 1,
  exploration: 1,
  positions: 1,
  discussion: 2,  // View Rubric & Examples
  revision: 3,    // Class Discussion
  reflection: 4,
  completed: 4,
};

// Map phases to actions with routes
const phaseActions: Record<CohortPhase, { icon: typeof BookOpen; label: string; description: string; route: string }> = {
  not_started: { icon: BookOpen, label: 'View Policies', description: 'Get ready to explore the assigned policies', route: '/education/student/explore' },
  exploration: { icon: BookOpen, label: 'Explore Policies', description: 'Read and learn about each policy', route: '/education/student/explore' },
  positions: { icon: PenTool, label: 'Submit Positions', description: 'Share your stance on each policy', route: '/education/student/explore' },
  discussion: { icon: MessageSquare, label: 'View Rubric & Examples', description: 'See grading criteria and example responses', route: '/education/student/discuss' },
  revision: { icon: PenTool, label: 'Revise Positions', description: 'Update your positions based on what you learned', route: '/education/student/explore' },
  reflection: { icon: CheckCircle, label: 'Complete Reflection', description: 'Reflect on your experience', route: '/education/student/reflect' },
  completed: { icon: CheckCircle, label: 'View Profile', description: 'See your completed civic profile', route: '/education/student/reflect' },
};

export default function StudentDemoPage() {
  const router = useRouter();
  const { isAuthenticated, userType, user, loginAsStudent, currentCohort } = useDemoAuth();

  // Auto-login as student when visiting this page
  useEffect(() => {
    if (!isAuthenticated || userType !== 'student') {
      loginAsStudent(0);
    }
  }, [isAuthenticated, userType, loginAsStudent]);

  // Get current phase info
  const currentPhase = currentCohort?.currentPhase || 'exploration';
  const phaseAction = phaseActions[currentPhase];
  const ActionIcon = phaseAction.icon;
  const currentStepIndex = phaseToStepIndex[currentPhase];

  // Navigate to the appropriate route based on phase
  const handleNextStep = () => {
    router.push(phaseAction.route);
  };

  if (!isAuthenticated || userType !== 'student') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg font-bold">Loading demo...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-light dark:bg-gray-950 flex flex-col">
      {/* Header with Progress */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="py-3 px-6">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-neutral dark:text-gray-400 hover:text-neutral-dark dark:hover:text-white transition-colors text-sm font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
            <Badge variant="warning" size="sm">Demo Mode</Badge>
          </div>
        </div>
        <div className="py-4 px-6 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-2xl mx-auto">
            <AnimatedStepProgress
              steps={studentSteps}
              currentStep={currentStepIndex}
              mode="horizontal"
              compact={true}
            />
          </div>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-lg text-center">
          {/* Greeting */}
          <p className="text-neutral dark:text-gray-400 mb-2">
            {currentCohort?.name || 'US Government - Period 3'}
          </p>
          <h1 className="font-display text-3xl font-black text-neutral-dark dark:text-white mb-8">
            Hi, {user?.displayName || 'Student'}!
          </h1>

          {/* Next Step Card */}
          <div className="bg-white dark:bg-gray-900 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#2F3BBD] border-2 border-black flex items-center justify-center">
              <ActionIcon className="w-8 h-8 text-white" />
            </div>

            <p className="text-sm font-bold text-neutral dark:text-gray-400 uppercase tracking-wide mb-1">
              Next Step
            </p>
            <h2 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2">
              {phaseAction.label}
            </h2>
            <p className="text-neutral dark:text-gray-400 mb-6">
              {phaseAction.description}
            </p>

            <Button
              variant="primary"
              size="lg"
              onClick={handleNextStep}
              rightIcon={<ChevronRight className="w-5 h-5" />}
              className="w-full"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
