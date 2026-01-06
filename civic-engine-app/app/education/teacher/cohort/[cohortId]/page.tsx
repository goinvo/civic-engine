'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Users,
  MessageSquare,
  BarChart2,
  Settings,
  ChevronRight,
  Play,
  Pause,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';
import { useDemoAuth } from '@/lib/auth/demo-auth-context';
import { useClasses } from '@/lib/auth/class-context';
import {
  demoCohorts,
  demoStudents,
  demoPositions,
  demoDiscussions,
  demoCohortAnalytics,
  demoPolicySet,
  phaseDescriptions
} from '@/lib/demo-data';
import { Cohort, CohortPhase } from '@/types/education';
import { Card } from '@/components/education/ui/Card';
import { Button } from '@/components/education/ui/Button';
import { Badge } from '@/components/education/ui/Badge';
import { getPolicyById } from '@/data/policies';

const phaseOrder: CohortPhase[] = ['not_started', 'exploration', 'positions', 'discussion', 'revision', 'reflection', 'completed'];

export default function CohortDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, userType, loginAsTeacher, selectCohort } = useDemoAuth();
  const { cohorts: userCohorts, updateCohort } = useClasses();
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'positions' | 'discussions' | 'analytics'>('overview');
  const [copied, setCopied] = useState(false);

  const cohortId = params.cohortId as string;
  // Check user-created cohorts first, then fall back to demo cohorts
  const cohort: Cohort | undefined = userCohorts.find(c => c.id === cohortId) || demoCohorts.find(c => c.id === cohortId);
  const isUserCreatedCohort = userCohorts.some(c => c.id === cohortId);

  const copyJoinCode = async () => {
    if (cohort) {
      await navigator.clipboard.writeText(cohort.joinCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Auto-login as teacher
  useEffect(() => {
    if (!isAuthenticated || userType !== 'teacher') {
      loginAsTeacher();
    }
    if (cohort) {
      selectCohort(cohort);
    }
  }, [isAuthenticated, userType, loginAsTeacher, cohort, selectCohort]);

  if (!cohort) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-bold mb-4">Cohort not found</p>
          <Link href="/education/teacher" className="text-[#2F3BBD] hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || userType !== 'teacher') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg font-bold">Loading...</div>
      </div>
    );
  }

  const currentPhaseIndex = phaseOrder.indexOf(cohort.currentPhase);
  const policies = demoPolicySet.policies.map(p => getPolicyById(p.policyId)).filter(Boolean);
  const cohortPositions = demoPositions.filter(p => p.cohortId === cohort.id);
  const cohortDiscussions = demoDiscussions.filter(d => d.cohortId === cohort.id);

  const handleAdvancePhase = () => {
    if (!cohort) return;

    const currentIndex = phaseOrder.indexOf(cohort.currentPhase);
    if (currentIndex < phaseOrder.length - 1) {
      const nextPhase = phaseOrder[currentIndex + 1];
      if (isUserCreatedCohort) {
        updateCohort(cohort.id, {
          currentPhase: nextPhase,
          status: 'active',
          startDate: cohort.currentPhase === 'not_started' ? new Date() : cohort.startDate,
        });
      } else {
        alert(`Demo mode: Would advance from "${cohort.currentPhase}" to "${nextPhase}".`);
      }
    }
  };

  const handleConfigure = () => {
    router.push(`/education/teacher/cohort/${cohortId}/configure`);
  };

  return (
    <div className="min-h-screen bg-neutral-light dark:bg-gray-950">
      {/* Header */}
      <div className="bg-[#2F3BBD] text-white py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/education/teacher"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display text-2xl font-black">
                  {cohort.name}
                </h1>
                <Badge
                  variant={cohort.currentPhase === 'completed' ? 'success' : 'warning'}
                  size="sm"
                >
                  {phaseDescriptions[cohort.currentPhase].title}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {cohort.studentCount} students
                </span>
                <button
                  onClick={copyJoinCode}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  Join code: <span className="font-mono font-bold">{cohort.joinCode}</span>
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              {cohort.currentPhase !== 'completed' && cohort.currentPhase !== 'not_started' && (
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<ChevronRight className="w-4 h-4" />}
                  onClick={handleAdvancePhase}
                >
                  Advance Phase
                </Button>
              )}
              {cohort.currentPhase === 'not_started' && (
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Play className="w-4 h-4" />}
                  onClick={handleAdvancePhase}
                >
                  Start Class
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Settings className="w-4 h-4" />}
                className="bg-transparent text-white border-white hover:bg-white/10"
                onClick={handleConfigure}
              >
                Configure
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Progress */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-4 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Pacing Mode Indicator */}
          <div className="flex items-center gap-2 mb-3 text-sm text-neutral dark:text-gray-400">
            <span className="font-medium">Pacing:</span>
            <Badge variant={cohort.pacingMode === 'self_paced' ? 'primary' : 'default'} size="sm">
              {cohort.pacingMode === 'self_paced' ? 'Self-Paced' : 'Teacher-Controlled'}
            </Badge>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {phaseOrder.slice(1, -1).map((phase, index) => {
              const isComplete = phaseOrder.indexOf(phase) < currentPhaseIndex;
              const isCurrent = phase === cohort.currentPhase;
              return (
                <div key={phase} className="flex items-center shrink-0">
                  <div
                    className={`px-3 py-1.5 text-xs font-bold border-2 transition-all ${
                      isCurrent
                        ? 'bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] text-white border-black shadow-lg scale-110 ring-2 ring-[#2F3BBD]/30 ring-offset-2'
                        : isComplete
                        ? 'bg-[#2F3BBD] text-white border-[#2F3BBD]'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {isComplete && <CheckCircle className="w-3 h-3 inline mr-1" />}
                    {phaseDescriptions[phase].title}
                  </div>
                  {index < 4 && (
                    <div
                      className={`w-6 h-0.5 ${
                        isComplete ? 'bg-[#2F3BBD]' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'students', label: 'Students' },
              { id: 'positions', label: 'Positions' },
              { id: 'discussions', label: 'Discussions' },
              { id: 'analytics', label: 'Analytics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-3 font-bold text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#2F3BBD] text-[#2F3BBD]'
                    : 'border-transparent text-neutral dark:text-gray-400 hover:text-neutral-dark'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card variant="default" padding="md">
                  <p className="text-2xl font-black text-[#2F3BBD]">{cohort.studentCount}</p>
                  <p className="text-xs font-bold text-neutral uppercase">Students</p>
                </Card>
                <Card variant="default" padding="md">
                  <p className="text-2xl font-black text-[#2F3BBD]">{cohortPositions.length}</p>
                  <p className="text-xs font-bold text-neutral uppercase">Positions</p>
                </Card>
                <Card variant="default" padding="md">
                  <p className="text-2xl font-black text-[#2F3BBD]">{cohortDiscussions.length}</p>
                  <p className="text-xs font-bold text-neutral uppercase">Posts</p>
                </Card>
                <Card variant="default" padding="md">
                  <p className="text-2xl font-black text-[#2F3BBD]">{policies.length}</p>
                  <p className="text-xs font-bold text-neutral uppercase">Policies</p>
                </Card>
              </div>

              {/* Current Phase Info */}
              <Card variant="elevated" padding="lg">
                <h3 className="font-display text-lg font-black text-neutral-dark dark:text-white mb-2">
                  Current Phase: {phaseDescriptions[cohort.currentPhase].title}
                </h3>
                <p className="text-neutral dark:text-gray-400 mb-4">
                  {phaseDescriptions[cohort.currentPhase].description}
                </p>
                <div className="p-3 bg-[#E8EEFF] border-2 border-[#2F3BBD]">
                  <p className="text-sm font-bold text-[#2F3BBD]">
                    Student action: {phaseDescriptions[cohort.currentPhase].studentAction}
                  </p>
                </div>
              </Card>

              {/* Policies */}
              <Card variant="default" padding="lg">
                <h3 className="font-display text-lg font-black text-neutral-dark dark:text-white mb-4">
                  Assigned Policies
                </h3>
                <div className="space-y-2">
                  {policies.map((policy, index) => (
                    <div
                      key={policy?.id || index}
                      className="flex items-center justify-between p-3 bg-neutral-light dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    >
                      <span className="font-bold text-neutral-dark dark:text-white">
                        {index + 1}. {policy?.title}
                      </span>
                      <Badge variant="primary" size="sm">
                        {cohortPositions.filter(p => p.policyId === policy?.id).length} positions
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card variant="default" padding="lg">
                <h3 className="font-bold text-neutral-dark dark:text-white mb-3">Class Details</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-neutral dark:text-gray-400">Grade Level</dt>
                    <dd className="font-bold">{cohort.gradeLevel}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral dark:text-gray-400">Join Code</dt>
                    <dd className="font-mono font-bold">{cohort.joinCode}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral dark:text-gray-400">Status</dt>
                    <dd className="font-bold capitalize">{cohort.status}</dd>
                  </div>
                  {cohort.startDate && (
                    <div className="flex justify-between">
                      <dt className="text-neutral dark:text-gray-400">Started</dt>
                      <dd className="font-bold">{new Date(cohort.startDate).toLocaleDateString()}</dd>
                    </div>
                  )}
                </dl>
              </Card>

              <Card variant="default" padding="lg">
                <h3 className="font-bold text-neutral-dark dark:text-white mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View Discussions
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <BarChart2 className="w-4 h-4 mr-2" />
                    Export Analytics
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Students
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <Card variant="default" padding="lg">
            <h3 className="font-display text-lg font-black text-neutral-dark dark:text-white mb-4">
              Students ({demoStudents.length})
            </h3>
            <div className="space-y-2">
              {demoStudents.map((student) => {
                const studentPositions = demoPositions.filter(p => p.studentId === student.id);
                const studentPosts = demoDiscussions.filter(d => d.authorId === student.id);
                return (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 bg-neutral-light dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#2F3BBD] text-white font-bold flex items-center justify-center">
                        {student.displayName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-neutral-dark dark:text-white">{student.displayName}</p>
                        <p className="text-xs text-neutral dark:text-gray-400">
                          {studentPositions.length} positions, {studentPosts.length} posts
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={studentPositions.length >= policies.length ? 'success' : 'warning'}
                      size="sm"
                    >
                      {studentPositions.length >= policies.length ? 'Complete' : 'In Progress'}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {activeTab === 'positions' && (
          <Card variant="default" padding="lg">
            <h3 className="font-display text-lg font-black text-neutral-dark dark:text-white mb-4">
              Student Positions (Anonymized)
            </h3>
            <p className="text-sm text-neutral dark:text-gray-400 mb-4">
              Student names are hidden to prevent bias in grading. You can only see the reasoning quality.
            </p>
            <div className="space-y-4">
              {cohortPositions.map((position) => {
                const policy = getPolicyById(position.policyId);
                return (
                  <div
                    key={position.id}
                    className="p-4 bg-neutral-light dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="primary" size="sm">{policy?.title}</Badge>
                      <Badge variant="default" size="sm">{position.stance.replace('_', ' ')}</Badge>
                    </div>
                    <p className="text-neutral-dark dark:text-white text-sm mb-2">
                      <strong>Reasoning:</strong> {position.reasoning}
                    </p>
                    {position.steelman && (
                      <p className="text-neutral dark:text-gray-400 text-sm italic">
                        <strong>Steelman:</strong> {position.steelman}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {activeTab === 'discussions' && (
          <Card variant="default" padding="lg">
            <h3 className="font-display text-lg font-black text-neutral-dark dark:text-white mb-4">
              Discussion Threads
            </h3>
            <div className="space-y-4">
              {cohortDiscussions.filter(d => !d.parentId).map((post) => {
                const policy = getPolicyById(post.policyId);
                const replies = cohortDiscussions.filter(d => d.parentId === post.id);
                return (
                  <div
                    key={post.id}
                    className="p-4 bg-neutral-light dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-neutral-dark dark:text-white">{post.authorName}</span>
                      <Badge variant="primary" size="sm">{policy?.title}</Badge>
                    </div>
                    <p className="text-neutral-dark dark:text-white text-sm mb-2">{post.content}</p>
                    <p className="text-xs text-neutral dark:text-gray-500">
                      {new Date(post.createdAt).toLocaleString()} · {replies.length} replies
                    </p>
                    {replies.length > 0 && (
                      <div className="mt-3 pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
                        {replies.map((reply) => (
                          <div key={reply.id}>
                            <p className="text-sm">
                              <strong>{reply.authorName}:</strong> {reply.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card variant="default" padding="md">
                <p className="text-2xl font-black text-[#2F3BBD]">{demoCohortAnalytics.activeStudents}</p>
                <p className="text-xs font-bold text-neutral uppercase">Active Students</p>
              </Card>
              <Card variant="default" padding="md">
                <p className="text-2xl font-black text-[#2F3BBD]">{demoCohortAnalytics.positionsSubmitted}</p>
                <p className="text-xs font-bold text-neutral uppercase">Positions</p>
              </Card>
              <Card variant="default" padding="md">
                <p className="text-2xl font-black text-[#2F3BBD]">{demoCohortAnalytics.positionsRevised}</p>
                <p className="text-xs font-bold text-neutral uppercase">Revised</p>
              </Card>
              <Card variant="default" padding="md">
                <p className="text-2xl font-black text-[#2F3BBD]">{demoCohortAnalytics.averagePostLength}</p>
                <p className="text-xs font-bold text-neutral uppercase">Avg Post Length</p>
              </Card>
            </div>

            <Card variant="default" padding="lg">
              <h3 className="font-display text-lg font-black text-neutral-dark dark:text-white mb-4">
                Top Priority Policies
              </h3>
              <div className="space-y-3">
                {demoCohortAnalytics.topPriorities.map((priority, index) => (
                  <div key={priority.policyId} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#2F3BBD] text-white font-black flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-neutral-dark dark:text-white">{priority.policyName}</p>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 mt-1">
                        <div
                          className="h-full bg-[#2F3BBD]"
                          style={{ width: `${priority.percentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-neutral">{priority.percentage}%</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="default" padding="lg">
              <h3 className="font-display text-lg font-black text-neutral-dark dark:text-white mb-4">
                Stance Distribution
              </h3>
              <p className="text-sm text-neutral dark:text-gray-400">
                Visualizations showing how students distributed across support/oppose for each policy would appear here in a real implementation.
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
