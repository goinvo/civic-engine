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

        <p className="font-body text-gray-700 dark:text-gray-300 font-medium mb-6">
          Our 7-Factor Policy Impact Score (PIS) framework mirrors how think tanks and non-partisan bodies like the CBO evaluate policy.
          Each factor uses concrete anchors—not subjective feelings—to ensure consistent, defensible scoring.
        </p>

        <div className="space-y-6">
          {/* Factor 1: Population Impact */}
          <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
            <h3 className="font-display text-xl font-black text-black dark:text-white mb-2">
              1. Population Impact (Scope)
            </h3>
            <p className="font-body text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
              Who is effectively touched by this?
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y-2 divide-black dark:divide-gray-600">
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white w-16">0.0</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Niche:</strong> &lt;0.1% of population (specific professional licensing)</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">0.2</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Community:</strong> Specific town, small industry, or rare demographic (1-5%)</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">0.5</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Demographic Slice:</strong> Major subgroup (parents of K-12 kids, seniors over 75)</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">0.8</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Broad Base:</strong> Majority of workforce or households (income tax, gas prices)</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">1.0</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Universal:</strong> &gt;90% of residents (Social Security, currency/inflation)</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Factor 2: Economic Magnitude */}
          <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
            <h3 className="font-display text-xl font-black text-black dark:text-white mb-2">
              2. Economic Magnitude (Volume)
            </h3>
            <p className="font-body text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
              Relative to US GDP (~$28T) or Federal Budget (~$6T). Uses logarithmic brackets to prevent massive programs from drowning out everything else.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y-2 divide-black dark:divide-gray-600">
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white w-16">0.0</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Nominal:</strong> &lt;$100 Million (administrative tweaks)</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">0.2</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Minor:</strong> $100M – $10 Billion (specific program funding)</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">0.5</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Major:</strong> $10B – $200 Billion (major agency budgets, corporate subsidies)</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">0.8</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Systemic:</strong> $200B – $1 Trillion (Medicare/Medicaid scale)</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">1.0</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Macro-Structural:</strong> &gt;$1 Trillion (tax code overhauls, banking regulations)</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Factor 3: Intensity of Impact */}
          <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
            <h3 className="font-display text-xl font-black text-black dark:text-white mb-2">
              3. Intensity of Impact (Depth)
            </h3>
            <p className="font-body text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
              For the person affected, how much does their life change?
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y-2 divide-black dark:divide-gray-600">
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white w-16">0.0</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Procedural:</strong> Change in paperwork, mild reporting requirements</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">0.3</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Financial (Manageable):</strong> Noticeable cost/savings (&lt;5% of income), convenience changes</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">0.6</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Lifestyle:</strong> Changes daily habits, commute, significant income (&gt;10%), employment eligibility</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">0.9</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Existential:</strong> Life/death, incarceration, deportation, housing stability, fundamental civil rights</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Factor 4: Duration */}
          <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
            <h3 className="font-display text-xl font-black text-black dark:text-white mb-2">
              4. Duration (Time Horizon)
            </h3>
            <p className="font-body text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
              How long does the change last?
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y-2 divide-black dark:divide-gray-600">
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white w-16">0.1</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>One-Off:</strong> Single stimulus check or one-time grant</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">0.4</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Term-Limited:</strong> Pilot program or policy with 1-5 year sunset clause</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">0.7</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Indefinite:</strong> Standard legislation (law of the land until repealed)</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">1.0</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Intergenerational:</strong> Constitutional amendments, major infrastructure, ecological preservation</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Factor 5: Distributional Weight */}
          <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
            <h3 className="font-display text-xl font-black text-black dark:text-white mb-2">
              5. Distributional Weight (Equity)
            </h3>
            <p className="font-body text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
              Does this impact vulnerable populations where $1 matters more?
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y-2 divide-black dark:divide-gray-600">
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white w-16">0.0</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Regressive:</strong> Primarily benefits the wealthy or high-leverage corporations</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">0.2</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Neutral:</strong> Impacts everyone equally regardless of status</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">0.5</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Mixed:</strong> Impacts a mix of classes, or specific middle-income bracket</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">0.8</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Progressive:</strong> Specifically targets low-income, disabled, or marginalized groups</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">1.0</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Critical Safety Net:</strong> Impacts populations with zero leverage (foster children, homeless veterans)</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Factor 6: Externalities */}
          <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
            <h3 className="font-display text-xl font-black text-black dark:text-white mb-2">
              6. Externalities (Spillover)
            </h3>
            <p className="font-body text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
              How many other systems break or change because of this?
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y-2 divide-black dark:divide-gray-600">
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white w-16">0.1</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Siloed:</strong> Effects contained within specific department (park signage rules)</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">0.5</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Adjacent:</strong> Affects 1-2 related sectors (EV mandates → auto + grid)</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">1.0</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Cascading:</strong> Affects &gt;3 unrelated sectors (immigration → labor, housing, schools, tax revenue)</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Factor 7: Implementation Complexity */}
          <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
            <h3 className="font-display text-xl font-black text-black dark:text-white mb-2">
              7. Implementation Complexity (Friction)
            </h3>
            <p className="font-body text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
              How hard is the machine working to do this? Higher = bigger undertaking.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y-2 divide-black dark:divide-gray-600">
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white w-16">0.1</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>"Stroke of a Pen":</strong> Executive order or simple rule change, no new infrastructure</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">0.5</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Bureaucratic:</strong> New staff, IT systems, or coordination between 2-3 agencies</td></tr>
                  <tr><td className="py-2 pr-4 font-display font-black text-black dark:text-white">1.0</td><td className="py-2 font-body text-gray-700 dark:text-gray-300"><strong>Herculean:</strong> Coordination of 50 states, new federal agency, or inevitable Supreme Court challenges</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* The Calculation */}
          <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#C91A2B] border-2 border-black flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-xl font-black text-black dark:text-white">
                The Calculation
              </h3>
            </div>
            <p className="font-body text-gray-700 dark:text-gray-300 font-medium mb-4">
              Your personalized score is a weighted sum of each factor. We use a weighting that favors Intensity and Equity, as those drive "real world" impact:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 border-2 border-black dark:border-gray-600 mb-4 font-mono text-sm text-black dark:text-white">
              <div>Score = 100 × (</div>
              <div className="ml-4">0.20 × Intensity +</div>
              <div className="ml-4">0.20 × Equity +</div>
              <div className="ml-4">0.16 × Duration +</div>
              <div className="ml-4">0.12 × Population +</div>
              <div className="ml-4">0.12 × Economic +</div>
              <div className="ml-4">0.10 × Externalities +</div>
              <div className="ml-4">0.10 × Implementation</div>
              <div>)</div>
            </div>
          </div>

          {/* Example Calculation */}
          <div className="border-4 border-black dark:border-gray-600 bg-gradient-to-br from-[#2F3BBD] to-[#C91A2B] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
            <h3 className="font-display text-xl font-black text-white mb-4">
              Example: Universal Pre-K
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="bg-white/20 p-3 border-2 border-white/30">
                <div className="font-display font-black text-white text-lg">0.4</div>
                <div className="font-body text-xs text-white/80">Population</div>
              </div>
              <div className="bg-white/20 p-3 border-2 border-white/30">
                <div className="font-display font-black text-white text-lg">0.5</div>
                <div className="font-body text-xs text-white/80">Economic</div>
              </div>
              <div className="bg-white/20 p-3 border-2 border-white/30">
                <div className="font-display font-black text-white text-lg">0.8</div>
                <div className="font-body text-xs text-white/80">Intensity</div>
              </div>
              <div className="bg-white/20 p-3 border-2 border-white/30">
                <div className="font-display font-black text-white text-lg">0.7</div>
                <div className="font-body text-xs text-white/80">Duration</div>
              </div>
              <div className="bg-white/20 p-3 border-2 border-white/30">
                <div className="font-display font-black text-white text-lg">0.8</div>
                <div className="font-body text-xs text-white/80">Equity</div>
              </div>
              <div className="bg-white/20 p-3 border-2 border-white/30">
                <div className="font-display font-black text-white text-lg">0.8</div>
                <div className="font-body text-xs text-white/80">Externalities</div>
              </div>
              <div className="bg-white/20 p-3 border-2 border-white/30">
                <div className="font-display font-black text-white text-lg">0.8</div>
                <div className="font-body text-xs text-white/80">Implementation</div>
              </div>
              <div className="bg-white p-3 border-2 border-black">
                <div className="font-display font-black text-black text-lg">70</div>
                <div className="font-body text-xs text-gray-600">Final Score</div>
              </div>
            </div>
            <p className="font-body text-sm text-white/90">
              This feels right: a major, society-altering policy, but not as totalizing as a constitutional amendment or currency replacement.
            </p>
          </div>

          {/* Default Weights Philosophy */}
          <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-black dark:bg-white border-2 border-black dark:border-gray-600 flex items-center justify-center">
                <Scale className="w-5 h-5 text-white dark:text-black" strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-xl font-black text-black dark:text-white">
                Why These Weights?
              </h3>
            </div>
            <p className="font-body text-gray-700 dark:text-gray-300 font-medium mb-4">
              Our default weighting emphasizes life-changing individual impact and fairness over raw scale or political feasibility—reflecting
              that most people care more about whether a policy genuinely helps those who need it than whether it's easy to pass.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-[#C91A2B] border-2 border-black">
                <div className="font-display font-black text-lg text-white">20%</div>
                <div className="font-body text-xs text-white/90">Intensity</div>
              </div>
              <div className="text-center p-3 bg-[#C91A2B] border-2 border-black">
                <div className="font-display font-black text-lg text-white">20%</div>
                <div className="font-body text-xs text-white/90">Equity</div>
              </div>
              <div className="text-center p-3 bg-[#2F3BBD] border-2 border-black">
                <div className="font-display font-black text-lg text-white">16%</div>
                <div className="font-body text-xs text-white/90">Duration</div>
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
                <div className="font-body text-xs text-gray-600 dark:text-gray-400">Implementation</div>
              </div>
            </div>
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
      <div className="border-t-4 border-black dark:border-gray-600 pt-8">
        <div className="text-center">
          <p className="font-body text-sm text-gray-600 dark:text-gray-400 mb-4">
            Want to start fresh with the default balanced profile?
          </p>
          <button
            onClick={handleResetToDefault}
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 text-black dark:text-white border-4 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] transition-all font-bold text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Default Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
