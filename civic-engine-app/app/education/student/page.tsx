'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  MessageSquare,
  PenTool,
  CheckCircle,
  ChevronRight,
  Users,
  BarChart2
} from 'lucide-react';
import { useDemoAuth } from '@/lib/auth/demo-auth-context';
import {
  demoPositions,
  demoDiscussions,
  demoPolicySet,
  demoReflections,
  phaseDescriptions
} from '@/lib/demo-data';
import { CohortPhase } from '@/types/education';
import { Card } from '@/components/education/ui/Card';
import { Button } from '@/components/education/ui/Button';
import { Badge } from '@/components/education/ui/Badge';
import { CivicProfileCard } from '@/components/education/student/CivicProfile';
import { getPolicyById } from '@/data/policies';

// Map phases to actions
const phaseActions: Record<CohortPhase, { icon: typeof BookOpen; label: string; description: string }> = {
  not_started: { icon: BookOpen, label: 'View Policies', description: 'Get ready to explore the assigned policies' },
  exploration: { icon: BookOpen, label: 'Explore Policies', description: 'Read and learn about each policy' },
  positions: { icon: PenTool, label: 'Submit Positions', description: 'Share your stance on each policy' },
  discussion: { icon: MessageSquare, label: 'Join Discussion', description: 'Discuss with your classmates' },
  revision: { icon: PenTool, label: 'Revise Positions', description: 'Update your positions based on what you learned' },
  reflection: { icon: CheckCircle, label: 'Complete Reflection', description: 'Reflect on your experience' },
  completed: { icon: CheckCircle, label: 'View Profile', description: 'See your completed civic profile' },
};

type ViewMode = 'home' | 'policies' | 'discussions' | 'profile' | 'progress';

export default function StudentDemoPage() {
  const router = useRouter();
  const { isAuthenticated, userType, user, loginAsStudent, currentCohort } = useDemoAuth();
  const [view, setView] = useState<ViewMode>('home');

  // Auto-login as student when visiting this page
  useEffect(() => {
    if (!isAuthenticated || userType !== 'student') {
      loginAsStudent(0);
    }
  }, [isAuthenticated, userType, loginAsStudent]);

  // Get policies from the demo policy set
  const policies = demoPolicySet.policies.map(p => getPolicyById(p.policyId)).filter(Boolean);

  // Get current student's positions
  const studentPositions = demoPositions.filter(p => p.studentId === user?.id);

  // Get current phase info
  const currentPhase = currentCohort?.currentPhase || 'discussion';
  const phaseInfo = phaseDescriptions[currentPhase];
  const phaseAction = phaseActions[currentPhase];
  const ActionIcon = phaseAction.icon;

  // Determine which view to show based on phase action
  const handleNextStep = () => {
    if (currentPhase === 'discussion') {
      setView('discussions');
    } else if (currentPhase === 'completed' || currentPhase === 'reflection') {
      setView('profile');
    } else {
      setView('policies');
    }
  };

  if (!isAuthenticated || userType !== 'student') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg font-bold">Loading demo...</div>
      </div>
    );
  }

  // Home view - clean, focused on the next action
  if (view === 'home') {
    return (
      <div className="min-h-screen bg-neutral-light dark:bg-gray-950 flex flex-col">
        {/* Minimal Header */}
        <div className="py-4 px-6">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-neutral dark:text-gray-400 hover:text-neutral-dark dark:hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
            <Badge variant="warning" size="sm">Demo Mode</Badge>
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
            <div className="bg-white dark:bg-gray-900 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
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

            {/* Secondary Actions */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setView('progress')}
                className="flex items-center gap-2 text-sm font-bold text-neutral dark:text-gray-400 hover:text-neutral-dark dark:hover:text-white transition-colors"
              >
                <BarChart2 className="w-4 h-4" />
                View Progress
              </button>
              <button
                onClick={() => setView('profile')}
                className="flex items-center gap-2 text-sm font-bold text-neutral dark:text-gray-400 hover:text-neutral-dark dark:hover:text-white transition-colors"
              >
                <Users className="w-4 h-4" />
                My Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Other views with back navigation
  return (
    <div className="min-h-screen bg-neutral-light dark:bg-gray-950">
      {/* Header with back button */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setView('home')}
            className="inline-flex items-center gap-2 text-neutral dark:text-gray-400 hover:text-neutral-dark dark:hover:text-white transition-colors font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <Badge variant="warning" size="sm">Demo Mode</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {view === 'progress' && (
          <div className="max-w-lg mx-auto">
            <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-6 text-center">
              Your Progress
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white dark:bg-gray-800 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-2xl font-black text-[#2F3BBD]">{policies.length}</p>
                <p className="text-xs font-bold text-neutral dark:text-gray-400 uppercase">Policies</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-2xl font-black text-[#2F3BBD]">{studentPositions.length}</p>
                <p className="text-xs font-bold text-neutral dark:text-gray-400 uppercase">Positions</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-2xl font-black text-[#2F3BBD]">
                  {demoDiscussions.filter(d => d.authorId === user?.id).length}
                </p>
                <p className="text-xs font-bold text-neutral dark:text-gray-400 uppercase">Posts</p>
              </div>
            </div>

            {/* Phase Progress */}
            <Card variant="default" padding="lg">
              <h2 className="font-bold text-neutral-dark dark:text-white mb-4">Phases</h2>
              <div className="space-y-3">
                {['exploration', 'positions', 'discussion', 'revision', 'reflection'].map((phase, index) => {
                  const isComplete = ['exploration', 'positions'].includes(phase);
                  const isCurrent = phase === currentPhase;
                  const info = phaseDescriptions[phase as CohortPhase];
                  return (
                    <div key={phase} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0 ${
                          isComplete
                            ? 'bg-green-500 text-white'
                            : isCurrent
                            ? 'bg-[#2F3BBD] text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                        }`}
                      >
                        {isComplete ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold ${isCurrent ? 'text-[#2F3BBD]' : 'text-neutral-dark dark:text-white'}`}>
                          {info.title}
                        </p>
                        {isCurrent && (
                          <p className="text-sm text-neutral dark:text-gray-400">{info.studentAction}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {view === 'policies' && (
          <div className="max-w-lg mx-auto">
            <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-6 text-center">
              Assigned Policies
            </h1>
            <div className="space-y-4">
              {policies.map((policy, index) => {
                const position = studentPositions.find(p => p.policyId === policy?.id);
                return (
                  <Card key={policy?.id || index} variant="default" padding="md">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={position ? 'success' : 'default'} size="sm">
                            {position ? 'Position Submitted' : 'Pending'}
                          </Badge>
                        </div>
                        <h3 className="font-bold text-neutral-dark dark:text-white mb-1">
                          {policy?.title || 'Unknown Policy'}
                        </h3>
                        <p className="text-sm text-neutral dark:text-gray-400 line-clamp-2">
                          {policy?.description}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/education/student/policy/${policy?.id}`)}
                      >
                        View
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {view === 'discussions' && (
          <div className="max-w-lg mx-auto">
            <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-6 text-center">
              Class Discussion
            </h1>
            <div className="space-y-4">
              {demoDiscussions.filter(d => !d.parentId).map((post) => (
                <Card key={post.id} variant="default" padding="md">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#E8EEFF] border-2 border-black flex items-center justify-center font-bold text-[#2F3BBD] shrink-0">
                      {post.authorName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-neutral-dark dark:text-white">
                          {post.authorName}
                        </span>
                        {post.authorStance && (
                          <Badge variant="primary" size="sm">
                            {post.authorStance.replace('_', ' ')}
                          </Badge>
                        )}
                      </div>
                      <p className="text-neutral dark:text-gray-300 text-sm mb-2">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-neutral dark:text-gray-500">
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        <span>{post.replyCount} replies</span>
                      </div>

                      {/* Replies */}
                      {demoDiscussions.filter(d => d.parentId === post.id).map((reply) => (
                        <div key={reply.id} className="mt-3 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm text-neutral-dark dark:text-white">
                              {reply.authorName}
                            </span>
                          </div>
                          <p className="text-neutral dark:text-gray-300 text-sm">
                            {reply.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {view === 'profile' && (
          <div className="max-w-lg mx-auto">
            <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2 text-center">
              Your Civic Profile
            </h1>
            <p className="text-center text-neutral dark:text-gray-400 mb-6">
              Complete the reflection phase to unlock your full profile!
            </p>
            <CivicProfileCard
              studentName={user?.displayName || 'Alex'}
              topPriorities={[
                { id: 'medicare-drug-negotiation', title: 'Medicare Drug Negotiation' },
                { id: 'raise-minimum-wage', title: 'Raise Minimum Wage' },
                { id: 'congress-stock-ban', title: 'Ban Congress Stock Trading' },
              ]}
              quote={demoReflections[0]?.learningReflection || 'I learned that many issues I thought were "partisan" actually have broad support across parties.'}
              stats={{
                policiesExplored: policies.length,
                discussionsJoined: demoDiscussions.filter(d => d.authorId === user?.id).length,
                positionsRevised: 0,
              }}
            />
            <div className="mt-6 text-center">
              <Button
                variant="primary"
                onClick={() => alert('In a real app, this would download your civic profile as an image.')}
              >
                Download & Share
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
