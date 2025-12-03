'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import {
  FACTOR_DEFINITIONS,
  policyMethodologies,
  getAllMethodologies,
} from '@/data/v2Methodology';
import { V2_FACTOR_INFO } from '@/data/archetypesV2';

type FactorId = keyof typeof FACTOR_DEFINITIONS;

function FactorCard({ factorId }: { factorId: FactorId }) {
  const def = FACTOR_DEFINITIONS[factorId];
  const info = V2_FACTOR_INFO[factorId];

  return (
    <div className="border-2 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-display text-lg font-black text-black dark:text-white">
          {def.name}
        </h4>
        <span className="text-sm font-body text-gray-600 dark:text-gray-400">
          {def.thinker}
        </span>
      </div>
      <p className="font-body text-sm text-gray-700 dark:text-gray-300 mb-3">
        {info?.description}
      </p>
      <div className="text-xs font-body">
        <p className="text-gray-500 dark:text-gray-500 italic mb-1">
          <strong>Key Question:</strong> {def.keyQuestion}
        </p>
        <div className="flex gap-4 mt-2">
          <div className="flex-1">
            <span className="text-red-600 dark:text-red-400 font-semibold">0.0:</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">{def.lowAnchor}</span>
          </div>
          <div className="flex-1">
            <span className="text-green-600 dark:text-green-400 font-semibold">1.0:</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">{def.highAnchor}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PolicyMethodologyCardProps {
  policyId: string;
}

function PolicyMethodologyCard({ policyId }: PolicyMethodologyCardProps) {
  const [expanded, setExpanded] = useState(false);
  const methodology = policyMethodologies[policyId];

  if (!methodology) return null;

  const factors = Object.entries(methodology.factors) as [FactorId, (typeof methodology.factors)[FactorId]][];

  // Sort by score descending to show strengths first
  const sortedFactors = [...factors].sort((a, b) => b[1].score - a[1].score);
  const topFactors = sortedFactors.slice(0, 3);
  const bottomFactors = sortedFactors.slice(-3).reverse();

  return (
    <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800">
      <div className="p-6 border-b-4 border-black dark:border-gray-600">
        <h3 className="font-display text-2xl font-black text-black dark:text-white mb-2">
          {methodology.policyName}
        </h3>
        <p className="font-body text-gray-700 dark:text-gray-300 mb-4">
          {methodology.description}
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 border-2 border-black dark:border-gray-600">
          <p className="font-body text-sm text-gray-800 dark:text-gray-200">
            <strong>Summary:</strong> {methodology.overallRationale}
          </p>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="p-6 border-b-2 border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-display text-lg font-black text-green-700 dark:text-green-400 mb-3">
              Strengths (Highest Scores)
            </h4>
            <div className="space-y-2">
              {topFactors.map(([factorId, factorData]) => (
                <div key={factorId} className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-2 border border-green-200 dark:border-green-800">
                  <span className="font-body text-sm font-medium text-gray-800 dark:text-gray-200">
                    {FACTOR_DEFINITIONS[factorId].name} ({FACTOR_DEFINITIONS[factorId].thinker})
                  </span>
                  <span className="font-display font-black text-green-700 dark:text-green-400">
                    {factorData.score.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg font-black text-amber-700 dark:text-amber-400 mb-3">
              Weaknesses (Lowest Scores)
            </h4>
            <div className="space-y-2">
              {bottomFactors.map(([factorId, factorData]) => (
                <div key={factorId} className="flex items-center justify-between bg-amber-50 dark:bg-amber-900/20 p-2 border border-amber-200 dark:border-amber-800">
                  <span className="font-body text-sm font-medium text-gray-800 dark:text-gray-200">
                    {FACTOR_DEFINITIONS[factorId].name} ({FACTOR_DEFINITIONS[factorId].thinker})
                  </span>
                  <span className="font-display font-black text-amber-700 dark:text-amber-400">
                    {factorData.score.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Expand/Collapse Full Details */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors font-body font-bold text-gray-700 dark:text-gray-300"
      >
        {expanded ? (
          <>
            <ChevronUp className="w-5 h-5" />
            Hide Detailed Factor Analysis
          </>
        ) : (
          <>
            <ChevronDown className="w-5 h-5" />
            Show Detailed Factor Analysis
          </>
        )}
      </button>

      {/* Full Factor Breakdown */}
      {expanded && (
        <div className="p-6 border-t-2 border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            {factors.map(([factorId, factorData]) => (
              <div key={factorId} className="border-2 border-gray-200 dark:border-gray-600 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-display text-lg font-black text-black dark:text-white">
                      {FACTOR_DEFINITIONS[factorId].name}
                    </h5>
                    <span className="text-sm font-body text-gray-500 dark:text-gray-400">
                      {FACTOR_DEFINITIONS[factorId].thinker}
                    </span>
                  </div>
                  <div className={`text-3xl font-display font-black ${
                    factorData.score >= 0.8 ? 'text-green-600 dark:text-green-400' :
                    factorData.score >= 0.5 ? 'text-blue-600 dark:text-blue-400' :
                    'text-amber-600 dark:text-amber-400'
                  }`}>
                    {factorData.score.toFixed(1)}
                  </div>
                </div>

                <p className="font-body text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {factorData.reasoning}
                </p>

                <div className="mb-3">
                  <h6 className="font-display text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">
                    Key Points:
                  </h6>
                  <ul className="list-disc list-inside space-y-1">
                    {factorData.keyPoints.map((point, idx) => (
                      <li key={idx} className="font-body text-sm text-gray-600 dark:text-gray-400">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {factorData.sources && factorData.sources.length > 0 && (
                  <div className="text-xs font-body text-gray-500 dark:text-gray-500">
                    <strong>Sources:</strong> {factorData.sources.join('; ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modifiers */}
      {methodology.modifiers && methodology.modifiers.length > 0 && (
        <div className="p-6 border-t-4 border-black dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
          <h4 className="font-display text-lg font-black text-black dark:text-white mb-4">
            Policy Modifiers
          </h4>
          <p className="font-body text-sm text-gray-600 dark:text-gray-400 mb-4">
            These modifications can significantly change how the policy scores:
          </p>
          <div className="space-y-3">
            {methodology.modifiers.map((mod) => (
              <div key={mod.id} className="bg-white dark:bg-gray-800 p-3 border-2 border-gray-200 dark:border-gray-600">
                <h5 className="font-display font-bold text-black dark:text-white mb-1">
                  {mod.name}
                </h5>
                <p className="font-body text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {mod.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(mod.factorChanges).map(([factorId, delta]) => (
                    <span
                      key={factorId}
                      className={`text-xs px-2 py-1 font-body font-bold ${
                        (delta as number) > 0
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                      }`}
                    >
                      {FACTOR_DEFINITIONS[factorId as FactorId]?.name}: {(delta as number) > 0 ? '+' : ''}{delta}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MethodologyPage() {
  const methodologies = getAllMethodologies();
  const factorIds = Object.keys(FACTOR_DEFINITIONS) as FactorId[];

  // Group factors
  const mechanicsFactors: FactorId[] = ['hayek', 'ostrom', 'downs', 'olson', 'keynes'];
  const rightsFactors: FactorId[] = ['pettit', 'hirschman', 'buchanan', 'polanyi'];
  const justiceFactors: FactorId[] = ['rawls', 'george', 'acemoglu', 'walzer'];

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
          <BookOpen className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>
        <h1 className="font-display text-5xl sm:text-6xl font-black text-black dark:text-white mb-4">
          V2 Scoring Methodology
        </h1>
        <p className="font-body text-xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto">
          How we evaluate policies using the 13-factor political economy framework, with real-world evidence and transparent reasoning.
        </p>
      </div>

      {/* Introduction */}
      <div className="mb-12 border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-8">
        <h2 className="font-display text-2xl font-black text-black dark:text-white mb-4">
          How It Works
        </h2>
        <div className="font-body text-gray-700 dark:text-gray-300 space-y-4">
          <p>
            We assign each policy factor a score between <strong>0.0</strong> (low alignment) and <strong>1.0</strong> (high alignment) by comparing the policy's characteristics to anchor descriptions derived from political-economic theory.
          </p>
          <p>
            For consistency, we derive <strong>key questions</strong> from each factor's definition. We rely on <strong>real-world evidence</strong> (empirical studies, policy analyses) and <strong>political-economic theory</strong> to justify each score.
          </p>
          <p>
            This transparent, evidence-based approach ensures that scoring is rigorous and consistent across different policies.
          </p>
        </div>
      </div>

      {/* The 13 Factors */}
      <div className="mb-12">
        <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
          The 13 Factors
        </h2>

        {/* Group A: Mechanics */}
        <div className="mb-8">
          <h3 className="font-display text-xl font-black text-[#2F3BBD] dark:text-blue-400 mb-4">
            Group A: Mechanics & Structure
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mechanicsFactors.map((factorId) => (
              <FactorCard key={factorId} factorId={factorId} />
            ))}
          </div>
        </div>

        {/* Group B: Rights */}
        <div className="mb-8">
          <h3 className="font-display text-xl font-black text-[#C91A2B] dark:text-red-400 mb-4">
            Group B: Rights & Dynamics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rightsFactors.map((factorId) => (
              <FactorCard key={factorId} factorId={factorId} />
            ))}
          </div>
        </div>

        {/* Group C: Justice */}
        <div className="mb-8">
          <h3 className="font-display text-xl font-black text-green-700 dark:text-green-400 mb-4">
            Group C: Justice & Distribution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {justiceFactors.map((factorId) => (
              <FactorCard key={factorId} factorId={factorId} />
            ))}
          </div>
        </div>
      </div>

      {/* Policy Deep Dives */}
      <div className="mb-12">
        <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
          Policy Analysis Deep Dives
        </h2>
        <p className="font-body text-gray-700 dark:text-gray-300 mb-8">
          The following policies have detailed, evidence-based methodology with full factor breakdowns and source citations:
        </p>
        <div className="space-y-8">
          {methodologies.map((methodology) => (
            <PolicyMethodologyCard key={methodology.policyId} policyId={methodology.policyId} />
          ))}
        </div>
      </div>

      {/* Sources Section */}
      <div className="border-4 border-black dark:border-gray-600 bg-gradient-to-br from-[#2F3BBD] to-[#C91A2B] p-8">
        <h2 className="font-display text-2xl font-black text-white mb-4">
          Key Sources & References
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90 font-body text-sm">
          <div>
            <h3 className="font-bold mb-2">UBI & Freedom</h3>
            <ul className="space-y-1 text-white/80">
              <li>Niskanen Center - Hayekian case for cash transfers</li>
              <li>World Economic Forum - Simplicity of UBI grants</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Job Guarantee & Labor</h3>
            <ul className="space-y-1 text-white/80">
              <li>CBPP - Federal Job Guarantee policy design</li>
              <li>Jacobin - JG strengthens worker power</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Healthcare</h3>
            <ul className="space-y-1 text-white/80">
              <li>EPI - M4A and labor market benefits</li>
              <li>Walzer - Health care distributed by need</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Political Economy Theory</h3>
            <ul className="space-y-1 text-white/80">
              <li>Polanyi - The Great Transformation</li>
              <li>Acemoglu & Robinson - Why Nations Fail</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back to Home */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-[#2F3BBD] text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all duration-150 font-bold text-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Policies</span>
        </Link>
      </div>
    </div>
  );
}
