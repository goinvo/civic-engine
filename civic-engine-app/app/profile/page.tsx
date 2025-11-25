'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, TrendingUp, RefreshCw } from 'lucide-react';
import { useValues } from '@/contexts/ValuesContext';
import { ARCHETYPES, VALUE_FACTORS, QUESTIONS, LIKERT_LABELS } from '@/data/values';
import { WeightProfile } from '@/types/values';

// Calculate Euclidean distance between two weight profiles
function calculateWeightDistance(w1: WeightProfile, w2: WeightProfile): number {
  const factors = ['population', 'economic', 'intensity', 'duration', 'equity', 'externalities', 'implementation'] as const;
  const sumSquaredDiffs = factors.reduce((sum, factor) => {
    const diff = w1[factor] - w2[factor];
    return sum + (diff * diff);
  }, 0);
  return Math.sqrt(sumSquaredDiffs);
}

// Find the closest archetype to a given weight profile
function findClosestArchetype(weights: WeightProfile) {
  let closestArchetype = ARCHETYPES[0];
  let minDistance = calculateWeightDistance(weights, ARCHETYPES[0].weights);

  for (const archetype of ARCHETYPES) {
    const distance = calculateWeightDistance(weights, archetype.weights);
    if (distance < minDistance) {
      minDistance = distance;
      closestArchetype = archetype;
    }
  }

  return closestArchetype;
}

export default function ProfilePage() {
  const router = useRouter();
  const { profile, clearProfile } = useValues();

  // If no profile, redirect to values page
  if (!profile) {
    if (typeof window !== 'undefined') {
      router.push('/values');
    }
    return (
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <p className="font-body text-lg text-gray-700 dark:text-gray-300">Redirecting to values questionnaire...</p>
      </div>
    );
  }

  const archetype = ARCHETYPES.find((a) => a.id === profile.archetypeId);
  const isCustomProfile = profile.archetypeId === 'custom';

  // Find closest archetype for custom profiles
  const closestArchetype = isCustomProfile ? findClosestArchetype(profile.weights) : null;

  // Get top 3 factors by weight
  const rankedFactors = Object.entries(profile.weights)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  // Get Likert scale responses if available
  const responses = profile.responses;

  const handleRetake = () => {
    clearProfile();
    router.push('/values');
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-[#2F3BBD] border-4 border-black dark:border-gray-600 mx-auto mb-6 flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
          <Sparkles className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>
        <h1 className="font-display text-5xl sm:text-6xl font-black text-black dark:text-white mb-4">
          Your Values Profile
        </h1>
        <p className="font-body text-xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto">
          {isCustomProfile
            ? `Based on your answers to the Values Pulse questionnaire (closest to ${closestArchetype?.name})`
            : `Your ${archetype?.name} profile`}
        </p>
      </div>

      {/* Archetype Card */}
      <div className="mb-12">
        <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
          <h2 className="font-display text-3xl font-black text-black dark:text-white mb-4">
            {isCustomProfile ? `Custom Profile (closest to ${closestArchetype?.name})` : archetype?.name}
          </h2>
          <p className="font-body text-lg text-gray-700 dark:text-gray-300 font-medium mb-6">
            {isCustomProfile
              ? 'Your unique values profile based on your questionnaire responses.'
              : archetype?.description}
          </p>
          <div className="text-sm font-body text-gray-600 dark:text-gray-400">
            Created on {new Date(profile.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>

      {/* Philosopher Alignment */}
      {(archetype?.philosopher || closestArchetype?.philosopher) && (
        <div className="mb-12">
          <div className="border-4 border-black dark:border-gray-600 bg-gradient-to-br from-[#2F3BBD] to-[#C91A2B] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
            <h2 className="font-display text-2xl font-black text-white mb-3">
              Your Economic Philosophy
            </h2>
            <div className="mb-4">
              <div className="font-display text-xl font-black text-white/90 mb-1">
                {isCustomProfile ? closestArchetype?.philosophyName : archetype?.philosophyName}
              </div>
              <div className="font-body text-sm text-white/70 font-medium">
                Aligned with {isCustomProfile ? closestArchetype?.philosopher : archetype?.philosopher}
              </div>
            </div>
            <p className="font-body text-base text-white font-medium leading-relaxed">
              {isCustomProfile ? closestArchetype?.philosophyDescription : archetype?.philosophyDescription}
            </p>
          </div>
        </div>
      )}

      {/* Top Values */}
      <div className="mb-12">
        <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
          What Matters Most to You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rankedFactors.map(([factorKey, weight], index) => {
            const factor = VALUE_FACTORS.find((f) => f.id === factorKey);
            if (!factor) return null;

            const percentage = Math.round(weight * 100);
            const colors = [
              'bg-[#C91A2B] border-black',
              'bg-[#2F3BBD] border-black',
              'bg-white dark:bg-gray-800 border-black dark:border-gray-600',
            ];

            return (
              <div
                key={factorKey}
                className={`border-4 ${colors[index]} p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp
                      className={`w-5 h-5 ${index < 2 ? 'text-white' : 'text-black dark:text-white'}`}
                      strokeWidth={2.5}
                    />
                    <span className={`font-display text-sm font-black ${index < 2 ? 'text-white' : 'text-black dark:text-white'}`}>
                      #{index + 1}
                    </span>
                  </div>
                  <div className={`text-3xl font-display font-black ${index < 2 ? 'text-white' : 'text-black dark:text-white'}`}>
                    {percentage}%
                  </div>
                </div>
                <h3 className={`font-display text-xl font-black mb-2 ${index < 2 ? 'text-white' : 'text-black dark:text-white'}`}>
                  {factor.name}
                </h3>
                <p className={`font-body text-sm font-medium ${index < 2 ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'}`}>
                  {factor.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Your Responses (if custom profile) */}
      {isCustomProfile && responses && (
        <div className="mb-12">
          <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
            Your Responses
          </h2>
          <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
            <div className="space-y-6">
              {QUESTIONS.map((question) => {
                const response = responses[question.id as keyof typeof responses];
                if (!response) return null;

                const responseLabel = LIKERT_LABELS[response as keyof typeof LIKERT_LABELS];
                const factor = VALUE_FACTORS.find((f) => f.id === question.factor);

                return (
                  <div key={question.id} className="pb-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0">
                    {factor && (
                      <div className="font-display text-sm font-black text-[#2F3BBD] dark:text-blue-400 mb-2">
                        {factor.name}
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-body text-sm text-gray-700 dark:text-gray-300 font-medium flex-1 pr-4">
                        {question.text}
                      </p>
                      <div className="flex flex-col items-end">
                        <span className="font-display font-black text-lg text-black dark:text-white whitespace-nowrap">
                          {responseLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* What This Means */}
      <div className="mb-12">
        <div className="border-4 border-black dark:border-gray-600 bg-gradient-to-br from-[#2F3BBD] to-[#C91A2B] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
          <h2 className="font-display text-3xl font-black text-white mb-4">
            How This Affects Your Scores
          </h2>
          <p className="font-body text-lg text-white/90 font-medium mb-6">
            Every policy on this site has been scored across all seven of these factors. Your personalized
            scores are calculated by weighing each policy's strengths against what matters most to you.
          </p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 bg-white/10 p-4 border-2 border-white/20">
              <TrendingUp className="w-5 h-5 text-white flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <p className="font-body text-sm text-white font-medium">
                Policies that score high on your top factors will show higher personalized scores
              </p>
            </div>
            <div className="flex items-start space-x-3 bg-white/10 p-4 border-2 border-white/20">
              <Sparkles className="w-5 h-5 text-white flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <p className="font-body text-sm text-white font-medium">
                You'll see insights explaining why certain policies rank higher or lower for you specifically
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-[#2F3BBD] text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-bold text-lg"
        >
          <Sparkles className="w-5 h-5" />
          <span>View Personalized Policies</span>
        </Link>
        <button
          onClick={handleRetake}
          className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white dark:bg-gray-800 text-black dark:text-white border-4 border-black dark:border-gray-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)] transition-all font-bold text-lg"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Retake Questionnaire</span>
        </button>
      </div>
    </div>
  );
}
