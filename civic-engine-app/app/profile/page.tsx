'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, RefreshCw, RotateCcw, CheckCircle, Edit3 } from 'lucide-react';
import { useValues } from '@/contexts/ValuesContext';
import { ARCHETYPES, VALUE_FACTORS, QUESTIONS, LIKERT_LABELS } from '@/data/values';
import { WeightProfile } from '@/types/values';
import { V2_ARCHETYPES } from '@/data/archetypesV2';
import { V3_ARCHETYPES, V3_NEED_INFO, NEED_CATEGORY_ORDER } from '@/data/archetypesV3';
import { V4_ARCHETYPES, V4_LENS_DEFINITIONS, V4Lens, V4WeightProfile, V4Archetype } from '@/data/v4Methodology';
import { ModelSelector, AutoMapBanner, V2ArchetypeCard, EconomicsWeightsRadar } from '@/components/v2';
import { V3ArchetypeCard, NeedsWeightsRadar } from '@/components/v3';
import { V4ArchetypeCard } from '@/components/v4';
import {
  V1MethodologySection,
  V3MethodologySection,
  V4MethodologySection,
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

// Find the closest V4 archetype based on lens weights
function findClosestV4Archetype(weights: V4WeightProfile): V4Archetype {
  const lensWeights = weights.lensWeights;

  // First, check if user has a clear dominant lens (> 40%)
  // If so, match to that archetype directly
  const maxLens = Math.max(lensWeights.impact, lensWeights.economics, lensWeights.needs);
  const dominanceThreshold = 0.40;

  if (maxLens >= dominanceThreshold) {
    if (lensWeights.impact === maxLens) {
      return V4_ARCHETYPES.find(a => a.id === 'pragmatist')!;
    }
    if (lensWeights.economics === maxLens) {
      return V4_ARCHETYPES.find(a => a.id === 'economist')!;
    }
    if (lensWeights.needs === maxLens) {
      return V4_ARCHETYPES.find(a => a.id === 'humanist')!;
    }
  }

  // Check if user is truly balanced (all lenses within 5% of each other)
  const minLens = Math.min(lensWeights.impact, lensWeights.economics, lensWeights.needs);
  const lensSpread = maxLens - minLens;
  const balanceThreshold = 0.05; // Only balanced if spread is < 5%

  if (lensSpread <= balanceThreshold) {
    return V4_ARCHETYPES.find(a => a.id === 'balanced')!;
  }

  // Otherwise, find the archetype with the closest lens weights
  // but exclude balanced from consideration (it requires truly equal weights)
  const nonBalancedArchetypes = V4_ARCHETYPES.filter(a => a.id !== 'custom_v4' && a.id !== 'balanced');
  let closestArchetype = nonBalancedArchetypes[0];
  let minDistance = Infinity;

  for (const archetype of nonBalancedArchetypes) {
    const archLensWeights = archetype.weights.lensWeights;

    // Calculate Euclidean distance for lens weights
    const distance = Math.sqrt(
      Math.pow(lensWeights.impact - archLensWeights.impact, 2) +
      Math.pow(lensWeights.economics - archLensWeights.economics, 2) +
      Math.pow(lensWeights.needs - archLensWeights.needs, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestArchetype = archetype;
    }
  }

  return closestArchetype;
}

export default function ProfilePage() {
  const router = useRouter();
  const { profile, clearProfile, setArchetype, setV2Archetype, setV3Archetype, setV4Archetype } = useValues();

  const scoringModel = profile?.scoringModel || 'v1';
  const isV2 = scoringModel === 'v2';
  const isV3 = scoringModel === 'v3';
  const isV4 = scoringModel === 'v4';

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

  // V4 archetype info
  const v4Archetype = V4_ARCHETYPES.find((a) => a.id === profile.v4ArchetypeId);
  const isCustomV4Profile = profile.v4ArchetypeId === 'custom_v4';

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

  // Determine if user has completed a questionnaire or made an explicit archetype choice
  // (not just using the default balanced archetype from auto-setup)
  const hasExplicitV1Choice = profile.responses !== undefined || profile.archetypeId !== 'balanced';
  const hasExplicitV2Choice = profile.v2Responses !== undefined || (profile.v2ArchetypeId !== undefined && !profile.v2AutoMapped);
  const hasExplicitV3Choice = profile.v3Responses !== undefined || (profile.v3ArchetypeId !== undefined && profile.v3ArchetypeId !== 'balanced');
  const hasExplicitV4Choice = profile.v4Responses !== undefined || (profile.v4ArchetypeId !== undefined && profile.v4ArchetypeId !== 'balanced');

  // Get philosophy info based on model - only show if user has made an explicit choice
  const philosophyInfo = isV4
    ? (hasExplicitV4Choice && v4Archetype
        ? null  // V4 doesn't have philosopher alignments yet
        : null)
    : isV3
    ? (hasExplicitV3Choice && v3Archetype
        ? {
            title: 'Your Needs-Based Philosophy',
            philosophyName: v3Archetype.philosophyName || '',
            philosopher: v3Archetype.philosopher || '',
            philosophyDescription: v3Archetype.philosophyDescription || '',
            thinkerBio: v3Archetype.thinkerBio,
          }
        : null)
    : isV2
    ? (hasExplicitV2Choice && v2Archetype
        ? {
            title: 'Your Political Economy Philosophy',
            philosophyName: v2Archetype.philosophyName,
            philosopher: v2Archetype.philosopher,
            philosophyDescription: v2Archetype.philosophyDescription,
            thinkerBio: v2Archetype.thinkerBio,
          }
        : null)
    : (hasExplicitV1Choice && (archetype || closestArchetype)
        ? {
            title: 'Your Impact Philosophy',
            philosophyName: (isCustomProfile ? closestArchetype?.philosophyName : archetype?.philosophyName) || '',
            philosopher: (isCustomProfile ? closestArchetype?.philosopher : archetype?.philosopher) || '',
            philosophyDescription: (isCustomProfile ? closestArchetype?.philosophyDescription : archetype?.philosophyDescription) || '',
            thinkerBio: (isCustomProfile ? closestArchetype?.thinkerBio : archetype?.thinkerBio),
          }
        : null);

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
          {isV4
            ? (isCustomV4Profile
                ? 'Your custom Combined Lens profile'
                : `Your ${v4Archetype?.name || 'Balanced'} profile`)
            : isV3
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

      {/* Archetype Card - Version-specific display */}
      {isV4 ? (
        <div className="mb-12">
          {/* Show results if user has completed questionnaire, otherwise show archetype picker */}
          {profile.v4Responses && profile.v4Weights ? (
            <>
              {/* Results Card */}
              {(() => {
                const matchedArchetype = findClosestV4Archetype(profile.v4Weights);
                return (
                  <div className="border-4 border-black dark:border-gray-600 bg-gradient-to-r from-[#2F3BBD] via-[#7B2D8E] to-[#C91A2B] p-8 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-6 h-6 text-white" />
                      <span className="font-display text-sm font-bold text-white/80">
                        Based on your questionnaire responses
                      </span>
                    </div>
                    <h2 className="font-display text-3xl font-black text-white mb-4">
                      {matchedArchetype.name}
                    </h2>
                    <p className="font-body text-lg text-white/90 font-medium mb-6">
                      {matchedArchetype.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {(Object.entries(profile.v4Weights.lensWeights) as [V4Lens, number][])
                        .sort(([, a], [, b]) => b - a)
                        .map(([lens, weight]) => {
                          const lensInfo = V4_LENS_DEFINITIONS[lens];
                          return (
                            <div key={lens} className="bg-white/10 border-2 border-white/20 px-4 py-2">
                              <span className="font-display text-sm font-bold text-white">
                                {lensInfo.name}: {Math.round(weight * 100)}%
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })()}
              <div className="flex justify-center mb-6">
                <Link
                  href="/profile/questionnaire-v4"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-black border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retake Questionnaire</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-display text-2xl font-black text-black dark:text-white mb-4">
                Select Your Combined Lens Profile
              </h2>
              <p className="font-body text-gray-600 dark:text-gray-400 mb-4">
                Choose a profile that balances Impact, Economics, and Needs lenses according to your priorities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {V4_ARCHETYPES.map((arch) => (
                  <V4ArchetypeCard
                    key={arch.id}
                    archetype={arch}
                    isSelected={profile.v4ArchetypeId === arch.id}
                    onSelect={() => setV4Archetype(arch.id)}
                  />
                ))}
              </div>
              <div className="flex justify-center mb-6">
                <Link
                  href="/profile/questionnaire-v4"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#2F3BBD] via-[#7B2D8E] to-[#C91A2B] text-white border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Take Combined Lens Questionnaire</span>
                </Link>
              </div>
            </>
          )}
          <div className="text-sm font-body text-gray-600 dark:text-gray-400 text-center">
            Profile updated on {new Date(profile.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      ) : isV3 ? (
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
          thinkerBio={philosophyInfo.thinkerBio}
        />
      )}

      {/* Top Values */}
      {isV4 && profile.v4Weights ? (
        <div className="mb-12">
          <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
            Your Lens Priorities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(Object.entries(profile.v4Weights.lensWeights) as [V4Lens, number][])
              .sort(([, a], [, b]) => b - a)
              .map(([lens, weight], index) => {
                const lensInfo = V4_LENS_DEFINITIONS[lens];
                const percentage = Math.round(weight * 100);
                const gradients = [
                  `bg-gradient-to-r ${lensInfo.gradient} shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]`,
                  `bg-gradient-to-r ${lensInfo.gradient} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)]`,
                  'bg-white dark:bg-gray-800',
                ];

                return (
                  <div
                    key={lens}
                    className={`border-4 border-black dark:border-gray-600 ${gradients[index]} p-6`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`font-display text-sm font-black ${index < 2 ? 'text-white/80' : 'text-black dark:text-white'}`}>
                        #{index + 1}
                      </span>
                      <div className={`text-3xl font-display font-black ${index < 2 ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                        {percentage}%
                      </div>
                    </div>
                    <h3 className={`font-display text-xl font-black mb-2 ${index < 2 ? 'text-white' : 'text-black dark:text-white'}`}>
                      {lensInfo.name}
                    </h3>
                    <p className={`font-body text-sm font-medium ${index < 2 ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'}`}>
                      {lensInfo.description}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      ) : isV3 ? (
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
      {isV4 ? <V4MethodologySection /> : isV3 ? <V3MethodologySection /> : !isV2 && <V1MethodologySection />}

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
