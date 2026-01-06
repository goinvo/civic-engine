'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Trash2,
  Calendar,
  Users,
  BookOpen,
  AlertTriangle
} from 'lucide-react';
import { useDemoAuth } from '@/lib/auth/demo-auth-context';
import { useClasses } from '@/lib/auth/class-context';
import { demoCohorts } from '@/lib/demo-data';
import { Cohort, GradeLevel, PacingMode } from '@/types/education';
import { Card } from '@/components/education/ui/Card';
import { Button } from '@/components/education/ui/Button';
import { Badge } from '@/components/education/ui/Badge';
import { Input } from '@/components/education/ui/Input';
import { Modal, ConfirmModal } from '@/components/education/ui/Modal';
import { PolicySetSelector } from '@/components/education/teacher/PolicySetSelector';
import { cn } from '@/lib/utils';

const gradeLevelOptions: { value: GradeLevel; label: string }[] = [
  { value: '6-8', label: 'Middle School (6-8)' },
  { value: '9-10', label: 'High School (9-10)' },
  { value: '11-12', label: 'High School (11-12)' },
  { value: 'college', label: 'College / University' },
];

export default function CohortConfigurePage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, userType, loginAsTeacher } = useDemoAuth();
  const { cohorts: userCohorts, updateCohort, deleteCohort } = useClasses();

  const cohortId = params.cohortId as string;
  const cohort: Cohort | undefined = userCohorts.find(c => c.id === cohortId) || demoCohorts.find(c => c.id === cohortId);
  const isUserCreatedCohort = userCohorts.some(c => c.id === cohortId);

  // Form state
  const [name, setName] = useState(cohort?.name || '');
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>(cohort?.gradeLevel || '9-10');
  const [pacingMode, setPacingMode] = useState<PacingMode>(cohort?.pacingMode || 'teacher_controlled');
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeSection, setActiveSection] = useState<'general' | 'policies' | 'pacing'>('general');

  // Auto-login as teacher
  useEffect(() => {
    if (!isAuthenticated || userType !== 'teacher') {
      loginAsTeacher();
    }
  }, [isAuthenticated, userType, loginAsTeacher]);

  // Initialize form state when cohort loads
  useEffect(() => {
    if (cohort) {
      setName(cohort.name);
      setGradeLevel(cohort.gradeLevel);
      setPacingMode(cohort.pacingMode || 'teacher_controlled');
    }
  }, [cohort]);

  // Track changes
  useEffect(() => {
    if (cohort) {
      const hasChanges =
        name !== cohort.name ||
        gradeLevel !== cohort.gradeLevel ||
        pacingMode !== (cohort.pacingMode || 'teacher_controlled');
      setHasUnsavedChanges(hasChanges);
    }
  }, [name, gradeLevel, pacingMode, cohort]);

  if (!cohort) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-bold mb-4">Class not found</p>
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

  const handleSave = () => {
    if (isUserCreatedCohort) {
      updateCohort(cohort.id, {
        name,
        gradeLevel,
        pacingMode,
      });
      setHasUnsavedChanges(false);
    } else {
      alert('Demo mode: Changes would be saved in a real app.');
    }
  };

  const handleDelete = () => {
    if (isUserCreatedCohort) {
      deleteCohort(cohort.id);
      router.push('/education/teacher');
    } else {
      alert('Demo mode: Class would be deleted in a real app.');
    }
  };

  const handlePolicySelect = (policyIds: string[]) => {
    setSelectedPolicies(policyIds);
    // In a real app, this would update the cohort's assigned policies
    if (isUserCreatedCohort) {
      // updateCohort(cohort.id, { assignedPolicies: policyIds });
    }
  };

  const canEdit = cohort.currentPhase === 'not_started';

  return (
    <div className="min-h-screen bg-neutral-light dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b-2 border-black dark:border-gray-700 py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/education/teacher/cohort/${cohortId}`}
            className="inline-flex items-center gap-2 text-neutral hover:text-neutral-dark dark:text-gray-400 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Class
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-1">
                Configure Class
              </h1>
              <p className="text-neutral dark:text-gray-400">
                {cohort.name}
              </p>
            </div>

            <div className="flex gap-2">
              {hasUnsavedChanges && (
                <Badge variant="warning" size="sm">Unsaved changes</Badge>
              )}
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Save className="w-4 h-4" />}
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Warning if class has started */}
        {!canEdit && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-yellow-800 dark:text-yellow-200">
                Limited editing available
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                This class has already started. Some settings cannot be changed.
              </p>
            </div>
          </div>
        )}

        {/* Section Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button
            variant={activeSection === 'general' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveSection('general')}
          >
            General Settings
          </Button>
          <Button
            variant={activeSection === 'pacing' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveSection('pacing')}
          >
            Pacing & Phases
          </Button>
          <Button
            variant={activeSection === 'policies' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveSection('policies')}
          >
            Policy Selection
          </Button>
        </div>

        {activeSection === 'general' && (
          <div className="space-y-6">
            {/* Class Name */}
            <Card variant="default" padding="lg">
              <h2 className="font-display text-lg font-black text-neutral-dark dark:text-white mb-4">
                Class Details
              </h2>

              <div className="space-y-4">
                <Input
                  label="Class Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='e.g., "Period 3 - US Government"'
                  disabled={!canEdit && !isUserCreatedCohort}
                />

                <div>
                  <label className="block text-sm font-bold text-neutral-dark dark:text-white mb-1.5">
                    Grade Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {gradeLevelOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => canEdit && setGradeLevel(option.value)}
                        disabled={!canEdit && !isUserCreatedCohort}
                        className={cn(
                          'p-3 text-sm font-medium border-2 transition-all text-left',
                          gradeLevel === option.value
                            ? 'border-[#2F3BBD] bg-[#AFC5F5] text-[#2F3BBD]'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-400',
                          !canEdit && !isUserCreatedCohort && 'opacity-50 cursor-not-allowed'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Class Info */}
            <Card variant="outlined" padding="lg">
              <h2 className="font-display text-lg font-black text-neutral-dark dark:text-white mb-4">
                Class Information
              </h2>

              <dl className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <dt className="text-neutral dark:text-gray-400 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Students Enrolled
                  </dt>
                  <dd className="font-bold text-neutral-dark dark:text-white">
                    {cohort.studentCount}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <dt className="text-neutral dark:text-gray-400">Join Code</dt>
                  <dd className="font-mono font-bold text-neutral-dark dark:text-white">
                    {cohort.joinCode}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <dt className="text-neutral dark:text-gray-400">Status</dt>
                  <dd>
                    <Badge variant={cohort.status === 'active' ? 'success' : 'default'} size="sm">
                      {cohort.status}
                    </Badge>
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2">
                  <dt className="text-neutral dark:text-gray-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Created
                  </dt>
                  <dd className="font-bold text-neutral-dark dark:text-white">
                    {new Date(cohort.createdAt).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </Card>

            {/* Danger Zone */}
            <Card variant="outlined" padding="lg" className="border-red-300 dark:border-red-800">
              <h2 className="font-display text-lg font-black text-red-600 dark:text-red-400 mb-2">
                Danger Zone
              </h2>
              <p className="text-sm text-neutral dark:text-gray-400 mb-4">
                Deleting a class is permanent and cannot be undone. All student data will be lost.
              </p>
              <Button
                variant="danger"
                size="sm"
                leftIcon={<Trash2 className="w-4 h-4" />}
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Class
              </Button>
            </Card>
          </div>
        )}

        {activeSection === 'pacing' && (
          <div className="space-y-6">
            <Card variant="default" padding="lg">
              <h2 className="font-display text-lg font-black text-neutral-dark dark:text-white mb-2">
                Phase Control
              </h2>
              <p className="text-neutral dark:text-gray-400 mb-6">
                Choose how students progress through the learning phases.
              </p>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setPacingMode('teacher_controlled')}
                  className={cn(
                    'w-full p-4 text-left border-2 transition-all',
                    pacingMode === 'teacher_controlled'
                      ? 'border-[#2F3BBD] bg-[#E8EEFF]'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0',
                      pacingMode === 'teacher_controlled'
                        ? 'border-[#2F3BBD] bg-[#2F3BBD]'
                        : 'border-gray-300 dark:border-gray-600'
                    )}>
                      {pacingMode === 'teacher_controlled' && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-dark dark:text-white mb-1">
                        Teacher-Controlled Phases
                      </h3>
                      <p className="text-sm text-neutral dark:text-gray-400">
                        You manually advance the class through each phase. All students move together as a cohort. Best for structured lessons where you want to facilitate discussions at specific times.
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPacingMode('self_paced')}
                  className={cn(
                    'w-full p-4 text-left border-2 transition-all',
                    pacingMode === 'self_paced'
                      ? 'border-[#2F3BBD] bg-[#E8EEFF]'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0',
                      pacingMode === 'self_paced'
                        ? 'border-[#2F3BBD] bg-[#2F3BBD]'
                        : 'border-gray-300 dark:border-gray-600'
                    )}>
                      {pacingMode === 'self_paced' && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-dark dark:text-white mb-1">
                        Self-Paced Learning
                      </h3>
                      <p className="text-sm text-neutral dark:text-gray-400">
                        Students advance through phases at their own speed after completing requirements. Great for independent work, homework assignments, or differentiated learning.
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </Card>

            {/* Phase Overview */}
            <Card variant="outlined" padding="lg">
              <h2 className="font-display text-lg font-black text-neutral-dark dark:text-white mb-4">
                Learning Phases
              </h2>
              <div className="space-y-3">
                {[
                  { phase: 'exploration', title: 'Policy Exploration', desc: 'Students read and learn about assigned policies' },
                  { phase: 'positions', title: 'Initial Positions', desc: 'Students form and submit their initial opinions with reasoning' },
                  { phase: 'discussion', title: 'Discussion', desc: 'Students engage in respectful debate and see other perspectives' },
                  { phase: 'revision', title: 'Position Revision', desc: 'Students can update their positions based on new insights' },
                  { phase: 'reflection', title: 'Final Reflection', desc: 'Students reflect on their learning and prioritize policies' },
                ].map((item, index) => (
                  <div key={item.phase} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#2F3BBD] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-dark dark:text-white">{item.title}</h4>
                      <p className="text-sm text-neutral dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'policies' && (
          <div>
            {canEdit ? (
              <PolicySetSelector
                onSelect={handlePolicySelect}
                selectedPolicies={selectedPolicies}
              />
            ) : (
              <Card variant="default" padding="lg">
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-neutral mx-auto mb-4" />
                  <h3 className="font-display text-lg font-black text-neutral-dark dark:text-white mb-2">
                    Policy selection is locked
                  </h3>
                  <p className="text-neutral dark:text-gray-400">
                    You cannot change the assigned policies after the class has started.
                  </p>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Class"
        message={`Are you sure you want to delete "${cohort.name}"? This action cannot be undone and all student data will be permanently lost.`}
        confirmText="Delete Class"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
