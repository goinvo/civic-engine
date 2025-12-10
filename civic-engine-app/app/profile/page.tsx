'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, RefreshCw, RotateCcw, CheckCircle, Edit3 } from 'lucide-react';
import { useValues } from '@/contexts/ValuesContext';
import { ARCHETYPES, VALUE_FACTORS, QUESTIONS, LIKERT_LABELS } from '@/data/values';
import { WeightProfile } from '@/types/values';
import { V2_ARCHETYPES } from '@/data/archetypesV2';
import { V3_ARCHETYPES, V3_NEED_INFO, NEED_CATEGORY_ORDER } from '@/data/archetypesV3';
import { ModelSelector, AutoMapBanner, V2ArchetypeCard, EconomicsWeightsRadar } from '@/components/v2';
import { V3ArchetypeCard, NeedsWeightsRadar } from '@/components/v3';
import {
  V1MethodologySection,
  V3MethodologySection,
  TopValuesSection,
  PhilosophyCard,
  HowScoresWork,
} from './components';
import { findClosestV2Archetype, findClosestV3Archetype } from '@/lib/archetypeMatching';

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
  const { profile, clearProfile, setArchetype, setV2Archetype, setV3Archetype } = useValues();

  const scoringModel = profile?.scoringModel || 'v1';
  const isV2 = scoringModel === 'v2';
  const isV3 = scoringModel === 'v3';

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

  // V2 archetype info
  const v2Archetype = V2_ARCHETYPES.find((a) => a.id === profile.v2ArchetypeId);
  const isCustomV2Profile = profile.v2ArchetypeId === 'custom_v2';

  // V3 archetype info
  const v3Archetype = V3_ARCHETYPES.find((a) => a.id === profile.v3ArchetypeId);
  const isCustomV3Profile = profile.v3ArchetypeId === 'custom_v3';

  // Find closest archetype for custom profiles
  const closestArchetype = isCustomProfile ? findClosestArchetype(profile.weights) : null;

  // Get top 3 factors by weight (for V1)
  const rankedFactors = Object.entries(profile.weights)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3) as [string, number][];

  // Get top 3 V2 factors by weight
  const rankedV2Factors = profile.v2Weights
    ? (Object.entries(profile.v2Weights)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3) as [string, number][])
    : [];

  // Get top 3 V3 need categories by weight
  const rankedV3Needs = profile.v3NeedWeights
    ? (Object.entries(profile.v3NeedWeights)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3) as [string, number][])
    : [];

  // Get Likert scale responses if available
  const responses = profile.responses;

  const handleRetake = () => {
    clearProfile();
    router.push('/values');
  };

  const handleResetToDefault = () => {
    setArchetype('balanced');
  };

  // Get philosophy info based on model
  const philosophyInfo = isV3
    ? v3Archetype
      ? {
          title: 'Your Needs-Based Philosophy',
          philosophyName: v3Archetype.philosophyName || '',
          philosopher: v3Archetype.philosopher || '',
          philosophyDescription: v3Archetype.philosophyDescription || '',
        }
      : null
    : isV2
    ? v2Archetype
      ? {
          title: 'Your Political Economy Philosophy',
          philosophyName: v2Archetype.philosophyName,
          philosopher: v2Archetype.philosopher,
          philosophyDescription: v2Archetype.philosophyDescription,
        }
      : null
    : (archetype || closestArchetype)
    ? {
        title: 'Your Economic Philosophy',
        philosophyName: (isCustomProfile ? closestArchetype?.philosophyName : archetype?.philosophyName) || '',
        philosopher: (isCustomProfile ? closestArchetype?.philosopher : archetype?.philosopher) || '',
        philosophyDescription: (isCustomProfile ? closestArchetype?.philosophyDescription : archetype?.philosophyDescription) || '',
      }
    : null;

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
        <div className="w-16 h-16 bg-gradient-to-br from-[#2F3BBD] to-[#C91A2B] border-4 border-black dark:border-gray-600 mx-auto mb-6 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>
        <h1 className="font-display text-5xl sm:text-6xl font-black text-black dark:text-white mb-4">
          Your Values Profile
        </h1>
        <p className="font-body text-xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto">
          {isV3
            ? (isCustomV3Profile
                ? 'Your custom Needs Lens profile'
                : `Your ${v3Archetype?.name || 'Balanced'} profile`)
            : isV2
            ? (isCustomV2Profile
                ? 'Your custom Economics Lens profile based on questionnaire responses'
                : `Your ${v2Archetype?.name || 'Economics'} profile`)
            : (isCustomProfile
                ? `Based on your answers to the Values Pulse questionnaire (closest to ${closestArchetype?.name})`
                : `Your ${archetype?.name} profile`)}
        </p>
      </div>

      {/* Model Selector */}
      <div className="mb-8 flex justify-center">
        <ModelSelector className="p-4 border-4 border-black bg-white" />
      </div>

      {/* Auto-Map Banner */}
      <AutoMapBanner className="mb-8" />

      {/* Archetype Card - V3 version shows archetype selection */}
      {isV3 ? (
        <div className="mb-12">
          <h2 className="font-display text-2xl font-black text-black dark:text-white mb-4">
            Select Your Needs Lens Profile
          </h2>
          <p className="font-body text-gray-600 dark:text-gray-400 mb-4">
            Choose a profile that reflects how you prioritize different human needs when evaluating policies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {V3_ARCHETYPES.map((arch) => (
              <V3ArchetypeCard
                key={arch.id}
                archetype={arch}
                isSelected={profile.v3ArchetypeId === arch.id}
                onSelect={() => setV3Archetype(arch.id)}
              />
            ))}
          </div>
          <div className="text-sm font-body text-gray-600 dark:text-gray-400 text-center">
            Profile updated on {new Date(profile.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      ) : isV2 ? (
        <div className="mb-12">
          <h2 className="font-display text-2xl font-black text-black dark:text-white mb-4">
            Select Your V2 Archetype
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {V2_ARCHETYPES.map((arch) => (
              <V2ArchetypeCard
                key={arch.id}
                archetype={arch}
                isSelected={profile.v2ArchetypeId === arch.id}
                onSelect={() => setV2Archetype(arch.id)}
              />
            ))}
          </div>
          <div className="text-sm font-body text-gray-600 dark:text-gray-400 text-center">
            Profile updated on {new Date(profile.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      ) : (
        <div className="mb-12">
          <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-8">
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
      )}

      {/* Philosopher Alignment */}
      {philosophyInfo && (
        <PhilosophyCard
          title={philosophyInfo.title}
          philosophyName={philosophyInfo.philosophyName}
          philosopher={philosophyInfo.philosopher}
          philosophyDescription={philosophyInfo.philosophyDescription}
        />
      )}

      {/* Top Values */}
      {isV3 ? (
        <div className="mb-12">
          <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
            Your Need Priorities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rankedV3Needs.map(([needKey, weight], index) => {
              const needInfo = V3_NEED_INFO[needKey as keyof typeof V3_NEED_INFO];
              if (!needInfo) return null;

              const percentage = Math.round(weight * 100);
              const colors = [
                'bg-[#501159] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]',
                'bg-[#7B2D8E] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)]',
                'bg-white dark:bg-gray-800',
              ];

              return (
                <div
                  key={needKey}
                  className={`border-4 border-black dark:border-gray-600 ${colors[index]} p-6`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{needInfo.icon}</span>
                      <span className={`font-display text-sm font-black ${index < 2 ? 'text-white/80' : 'text-black dark:text-white'}`}>
                        #{index + 1}
                      </span>
                    </div>
                    <div className={`text-3xl font-display font-black ${index < 2 ? 'text-white' : 'text-[#501159] dark:text-[#B87FB3]'}`}>
                      {percentage}%
                    </div>
                  </div>
                  <h3 className={`font-display text-xl font-black mb-2 ${index < 2 ? 'text-white' : 'text-black dark:text-white'}`}>
                    {needInfo.name}
                  </h3>
                  <p className={`font-body text-sm font-medium ${index < 2 ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'}`}>
                    {needInfo.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <TopValuesSection
          rankedFactors={isV2 ? rankedV2Factors : rankedFactors}
          isV2={isV2}
        />
      )}

      {/* Your Responses (if custom profile - V1 only) */}
      {!isV2 && isCustomProfile && responses && (
        <div className="mb-12">
          <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
            Your Responses
          </h2>
          <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
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

      {/* How Scores Work */}
      <HowScoresWork />

      {/* Methodology Section */}
      {isV3 ? <V3MethodologySection /> : !isV2 && <V1MethodologySection />}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Link
          href="/"
          className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-[#2F3BBD] text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all duration-150 font-bold text-lg"
        >
          <Sparkles className="w-5 h-5" />
          <span>View Personalized Policies</span>
        </Link>
        <button
          onClick={handleRetake}
          className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white dark:bg-gray-800 text-black dark:text-white border-4 border-black dark:border-gray-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(75,85,99,1)] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all duration-150 font-bold text-lg"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Retake Questionnaire</span>
        </button>
      </div>

      {/* Reset Profile Section */}
      <div className="border-t-4 border-black dark:border-gray-600 pt-8">
        <div className="text-center">
          <p className="font-body text-sm text-gray-600 dark:text-gray-400 mb-4">
            Want to start fresh with the default balanced profile?
          </p>
          <button
            onClick={handleResetToDefault}
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 text-black dark:text-white border-4 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(75,85,99,1)] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-150 font-bold text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Default Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
