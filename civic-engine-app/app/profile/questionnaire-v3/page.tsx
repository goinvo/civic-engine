'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ValuesPulseV3 from '@/components/v3/ValuesPulseV3';

export default function QuestionnaireV3Page() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/profile');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/profile"
          className="inline-flex items-center space-x-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-display text-5xl sm:text-6xl font-black text-black dark:text-white mb-4">
          Needs Lens Questionnaire
        </h1>
        <p className="font-body text-xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto">
          Answer 5 questions about human needs to create your personalized Needs Lens profile.
        </p>
      </div>

      {/* Questionnaire */}
      <ValuesPulseV3 onComplete={handleComplete} />
    </div>
  );
}
