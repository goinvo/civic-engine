'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ValuesPulseV4 from '@/components/v4/ValuesPulseV4';

export default function QuestionnaireV4Page() {
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
          Unified Lens Questionnaire
        </h1>
        <p className="font-body text-xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto">
          Answer questions across all three lenses - Impact, Economics, and Needs - to create your comprehensive policy evaluation profile.
        </p>
      </div>

      {/* Three Lens Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
        <div className="border-4 border-black dark:border-gray-600 bg-[#2F3BBD] p-4">
          <h3 className="font-display font-black text-white text-lg mb-1">Impact Lens</h3>
          <p className="font-body text-white/80 text-sm">Practical outcomes, reach, and feasibility</p>
        </div>
        <div className="border-4 border-black dark:border-gray-600 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] p-4">
          <h3 className="font-display font-black text-white text-lg mb-1">Economics Lens</h3>
          <p className="font-body text-white/80 text-sm">Institutions, incentives, and political economy</p>
        </div>
        <div className="border-4 border-black dark:border-gray-600 bg-[#7B2D8E] p-4">
          <h3 className="font-display font-black text-white text-lg mb-1">Needs Lens</h3>
          <p className="font-body text-white/80 text-sm">Human wellbeing and flourishing</p>
        </div>
      </div>

      {/* Questionnaire */}
      <ValuesPulseV4 onComplete={handleComplete} />
    </div>
  );
}
