'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { useDemoAuth } from '@/lib/auth/demo-auth-context';
import { demoPositions, demoPolicySet } from '@/lib/demo-data';
import { Card } from '@/components/education/ui/Card';
import { Button } from '@/components/education/ui/Button';
import { Badge } from '@/components/education/ui/Badge';
import { getPolicyById } from '@/data/policies';
import { StudentProgressHeader } from '@/components/education/student';

export default function StudentExplorePage() {
  const router = useRouter();
  const { isAuthenticated, userType, user, loginAsStudent, currentCohort } = useDemoAuth();

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

  if (!isAuthenticated || userType !== 'student') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg font-bold">Loading...</div>
      </div>
    );
  }

  const allPositionsSubmitted = policies.every(policy =>
    studentPositions.some(p => p.policyId === policy?.id)
  );

  return (
    <div className="min-h-screen bg-neutral-light dark:bg-gray-950">
      {/* Header with progress */}
      <StudentProgressHeader currentStep={1} />

      {/* Content */}
      <div className="max-w-lg mx-auto px-6 py-8">
        <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2 text-center">
          Explore Policies
        </h1>
        <p className="text-center text-neutral dark:text-gray-400 mb-6">
          Read about each policy and share your position.
        </p>

        <div className="space-y-4 mb-8">
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
                    onClick={() => router.push(`/policies/${policy?.id}`)}
                  >
                    View
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Continue to next phase */}
        {allPositionsSubmitted && (
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/education/student/discuss')}
            rightIcon={<ChevronRight className="w-5 h-5" />}
            className="w-full"
          >
            Continue to Discussion
          </Button>
        )}
      </div>
    </div>
  );
}
