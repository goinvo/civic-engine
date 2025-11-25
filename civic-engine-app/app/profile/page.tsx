'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, TrendingUp, RefreshCw, Calculator, Scale, BarChart3, RotateCcw } from 'lucide-react';
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
  const { profile, clearProfile, setArchetype } = useValues();

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

  const handleResetToDefault = () => {
    setArchetype('balanced');
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

      {/* Methodology Section */}
      <div className="mb-12">
        <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
          Our Methodology
        </h2>
        <div className="space-y-6">
          {/* How We Score Policies */}
          <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#2F3BBD] border-2 border-black flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-xl font-black text-black dark:text-white">
                How We Score Policies
              </h3>
            </div>
            <p className="font-body text-gray-700 dark:text-gray-300 font-medium mb-4">
              Each policy is evaluated across seven impact factors on a scale of 0-100%:
            </p>
            <ul className="space-y-2 font-body text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="font-black text-black dark:text-white">•</span>
                <span><strong>Population Reach:</strong> How many people are directly affected</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-black text-black dark:text-white">•</span>
                <span><strong>Economic Scale:</strong> Volume of resources or money moved</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-black text-black dark:text-white">•</span>
                <span><strong>Individual Impact:</strong> Depth of change for affected individuals (life-or-death vs. convenience)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-black text-black dark:text-white">•</span>
                <span><strong>Time Horizon:</strong> How long the effects last (temporary fix vs. generational change)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-black text-black dark:text-white">•</span>
                <span><strong>Equity & Justice:</strong> How fairly benefits are distributed, especially to vulnerable groups</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-black text-black dark:text-white">•</span>
                <span><strong>Side Effects:</strong> Unintended consequences, both positive and negative</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-black text-black dark:text-white">•</span>
                <span><strong>Feasibility:</strong> Likelihood of successful implementation given political/practical realities</span>
              </li>
            </ul>
          </div>

          {/* How We Calculate Your Score */}
          <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#C91A2B] border-2 border-black flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-xl font-black text-black dark:text-white">
                How We Calculate Your Score
              </h3>
            </div>
            <p className="font-body text-gray-700 dark:text-gray-300 font-medium mb-4">
              Your personalized score is a weighted average of each policy's factor scores, using your value weights:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 border-2 border-black dark:border-gray-600 mb-4">
              <code className="font-mono text-sm text-black dark:text-white">
                Your Score = Σ (Factor Score × Your Weight) × 100
              </code>
            </div>
            <p className="font-body text-sm text-gray-600 dark:text-gray-400">
              For example, if a policy scores 90% on Equity and you weight Equity at 20%, that contributes 18 points to your total score.
              All seven factors are combined this way to produce your final 0-100 score.
            </p>
          </div>

          {/* Default Weights Philosophy */}
          <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-black dark:bg-white border-2 border-black dark:border-gray-600 flex items-center justify-center">
                <Scale className="w-5 h-5 text-white dark:text-black" strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-xl font-black text-black dark:text-white">
                Default Weights Philosophy
              </h3>
            </div>
            <p className="font-body text-gray-700 dark:text-gray-300 font-medium mb-4">
              For users who haven't taken the questionnaire, we use default weights that prioritize human-centered impact:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 border-2 border-black dark:border-gray-600">
                <div className="font-display font-black text-lg text-black dark:text-white">20%</div>
                <div className="font-body text-xs text-gray-600 dark:text-gray-400">Intensity</div>
              </div>
              <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 border-2 border-black dark:border-gray-600">
                <div className="font-display font-black text-lg text-black dark:text-white">20%</div>
                <div className="font-body text-xs text-gray-600 dark:text-gray-400">Equity</div>
              </div>
              <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 border-2 border-black dark:border-gray-600">
                <div className="font-display font-black text-lg text-black dark:text-white">16%</div>
                <div className="font-body text-xs text-gray-600 dark:text-gray-400">Duration</div>
              </div>
              <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 border-2 border-black dark:border-gray-600">
                <div className="font-display font-black text-lg text-black dark:text-white">12%</div>
                <div className="font-body text-xs text-gray-600 dark:text-gray-400">Population</div>
              </div>
              <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 border-2 border-black dark:border-gray-600">
                <div className="font-display font-black text-lg text-black dark:text-white">12%</div>
                <div className="font-body text-xs text-gray-600 dark:text-gray-400">Economic</div>
              </div>
              <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 border-2 border-black dark:border-gray-600">
                <div className="font-display font-black text-lg text-black dark:text-white">10%</div>
                <div className="font-body text-xs text-gray-600 dark:text-gray-400">Externalities</div>
              </div>
              <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 border-2 border-black dark:border-gray-600">
                <div className="font-display font-black text-lg text-black dark:text-white">10%</div>
                <div className="font-body text-xs text-gray-600 dark:text-gray-400">Feasibility</div>
              </div>
            </div>
            <p className="font-body text-sm text-gray-600 dark:text-gray-400">
              This weighting emphasizes life-changing individual impact and fairness over raw scale or political feasibility—reflecting
              that most people care more about whether a policy genuinely helps those who need it than whether it's easy to pass.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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

      {/* Reset Profile Section */}
      <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-8">
        <div className="text-center">
          <p className="font-body text-sm text-gray-600 dark:text-gray-400 mb-4">
            Want to start fresh with the default balanced profile?
          </p>
          <button
            onClick={handleResetToDefault}
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-bold text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Default Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
