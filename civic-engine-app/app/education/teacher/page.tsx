'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  GraduationCap,
  Plus,
  ArrowLeft,
  LogOut,
  Users,
  BarChart2,
  BookOpen,
  Folder
} from 'lucide-react';
import { useDemoAuth } from '@/lib/auth/demo-auth-context';
import { useClasses } from '@/lib/auth/class-context';
import { demoCohortAnalytics, phaseDescriptions } from '@/lib/demo-data';
import { CohortCard } from '@/components/education/teacher';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/education/ui/Card';
import { Button } from '@/components/education/ui/Button';
import { Badge } from '@/components/education/ui/Badge';
import { CreateClassModal } from '@/components/education/teacher/CreateClassModal';

export default function TeacherDemoPage() {
  const router = useRouter();
  const { isAuthenticated, userType, user, loginAsTeacher, logout, selectCohort } = useDemoAuth();
  const { cohorts } = useClasses();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Auto-login as teacher when visiting this page
  useEffect(() => {
    if (!isAuthenticated || userType !== 'teacher') {
      loginAsTeacher();
    }
  }, [isAuthenticated, userType, loginAsTeacher]);

  const handleViewClass = (cohortId: string) => {
    const cohort = cohorts.find(c => c.id === cohortId);
    if (cohort) {
      selectCohort(cohort);
      router.push(`/education/teacher/cohort/${cohortId}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleClassCreated = () => {
    // Modal will show toast, just close the modal
    setIsCreateModalOpen(false);
  };

  const handleConfigure = (cohortId: string) => {
    router.push(`/education/teacher/cohort/${cohortId}/configure`);
  };

  if (!isAuthenticated || userType !== 'teacher') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg font-bold">Loading demo...</div>
      </div>
    );
  }

  const hasClasses = cohorts.length > 0;

  return (
    <div className="min-h-screen bg-neutral-light dark:bg-gray-950">
      {/* Header */}
      <div className="bg-[#2F3BBD] text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <Badge variant="warning" size="sm">Demo Mode</Badge>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-[#2F3BBD]" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-black">
                Teacher Dashboard
              </h1>
              <p className="text-white/80">
                Welcome back, {user?.displayName || 'Teacher'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create New Class
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<LogOut className="w-4 h-4" />}
              onClick={handleLogout}
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              Exit Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {hasClasses ? (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card variant="default" padding="md">
                <div className="text-center">
                  <p className="text-3xl font-black text-[#2F3BBD]">{cohorts.length}</p>
                  <p className="text-sm font-bold text-neutral dark:text-gray-400">Active Classes</p>
                </div>
              </Card>
              <Card variant="default" padding="md">
                <div className="text-center">
                  <p className="text-3xl font-black text-[#2F3BBD]">
                    {cohorts.reduce((sum, c) => sum + c.studentCount, 0)}
                  </p>
                  <p className="text-sm font-bold text-neutral dark:text-gray-400">Total Students</p>
                </div>
              </Card>
              <Card variant="default" padding="md">
                <div className="text-center">
                  <p className="text-3xl font-black text-[#2F3BBD]">
                    {demoCohortAnalytics.positionsSubmitted}
                  </p>
                  <p className="text-sm font-bold text-neutral dark:text-gray-400">Positions Submitted</p>
                </div>
              </Card>
              <Card variant="default" padding="md">
                <div className="text-center">
                  <p className="text-3xl font-black text-[#2F3BBD]">
                    {demoCohortAnalytics.discussionPosts}
                  </p>
                  <p className="text-sm font-bold text-neutral dark:text-gray-400">Discussion Posts</p>
                </div>
              </Card>
            </div>

            {/* Classes Section */}
            <div className="mb-8">
              <h2 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-4">
                Your Classes
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cohorts.map((cohort) => (
                  <CohortCard
                    key={cohort.id}
                    cohort={cohort}
                    onViewClass={() => handleViewClass(cohort.id)}
                    onConfigure={() => handleConfigure(cohort.id)}
                    onViewAnalytics={() => router.push(`/education/teacher/cohort/${cohort.id}?tab=analytics`)}
                    onViewGuide={() => alert('In a real app, this would show a teaching guide.')}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="outlined" padding="md" className="hover:border-[#2F3BBD] transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#E8EEFF] border-2 border-black flex items-center justify-center">
                      <Users className="w-6 h-6 text-[#2F3BBD]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-dark dark:text-white">Manage Students</h3>
                      <p className="text-sm text-neutral dark:text-gray-400">View and edit student lists</p>
                    </div>
                  </div>
                </Card>
                <Card variant="outlined" padding="md" className="hover:border-[#2F3BBD] transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#E8EEFF] border-2 border-black flex items-center justify-center">
                      <BarChart2 className="w-6 h-6 text-[#2F3BBD]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-dark dark:text-white">View Analytics</h3>
                      <p className="text-sm text-neutral dark:text-gray-400">See class engagement data</p>
                    </div>
                  </div>
                </Card>
                <Card variant="outlined" padding="md" className="hover:border-[#2F3BBD] transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#E8EEFF] border-2 border-black flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-[#2F3BBD]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-dark dark:text-white">Teaching Guide</h3>
                      <p className="text-sm text-neutral dark:text-gray-400">Best practices and tips</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Phase Guide */}
            <div>
              <h2 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-4">
                Classroom Phases
              </h2>
              <Card variant="default" padding="lg">
                <div className="space-y-4">
                  {Object.entries(phaseDescriptions).map(([phase, info]) => (
                    <div key={phase} className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                      <div className="w-8 h-8 bg-[#2F3BBD] text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {phase === 'not_started' ? '0' :
                         phase === 'exploration' ? '1' :
                         phase === 'positions' ? '2' :
                         phase === 'discussion' ? '3' :
                         phase === 'revision' ? '4' :
                         phase === 'reflection' ? '5' : '✓'}
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-dark dark:text-white">{info.title}</h4>
                        <p className="text-sm text-neutral dark:text-gray-400">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-[#E8EEFF] border-4 border-black flex items-center justify-center mb-6">
              <Folder className="w-12 h-12 text-[#2F3BBD]" />
            </div>
            <h2 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2">
              No Classes Yet
            </h2>
            <p className="text-neutral dark:text-gray-400 max-w-md mb-8">
              You haven&apos;t created any classes yet. Create your first class to start engaging your students with civic issues and building their critical thinking skills.
            </p>
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Plus className="w-5 h-5" />}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create Your First Class
            </Button>

            {/* What to expect section */}
            <div className="mt-16 w-full max-w-2xl">
              <h3 className="font-display text-xl font-bold text-neutral-dark dark:text-white mb-6">
                What to Expect
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <Card variant="outlined" padding="md">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#2F3BBD] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-dark dark:text-white text-sm">Create a Class</h4>
                      <p className="text-xs text-neutral dark:text-gray-400">Set up your class name and grade level</p>
                    </div>
                  </div>
                </Card>
                <Card variant="outlined" padding="md">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#2F3BBD] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-dark dark:text-white text-sm">Share Join Code</h4>
                      <p className="text-xs text-neutral dark:text-gray-400">Students join using a simple code</p>
                    </div>
                  </div>
                </Card>
                <Card variant="outlined" padding="md">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#2F3BBD] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-dark dark:text-white text-sm">Guide Learning</h4>
                      <p className="text-xs text-neutral dark:text-gray-400">Lead students through civic exploration</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Class Modal */}
      <CreateClassModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onClassCreated={handleClassCreated}
      />
    </div>
  );
}
