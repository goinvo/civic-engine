'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, Brain, Heart, Scale } from 'lucide-react';
import { useState } from 'react';
import {
  FACTOR_DEFINITIONS,
  policyMethodologies,
  getAllMethodologies,
} from '@/data/v2Methodology';
import { V2_FACTOR_INFO } from '@/data/archetypesV2';
import { needsModelMethodologies } from '@/data/methodologies/needs-model';
import { impactModelMethodologies, getAllImpactModelMethodologies } from '@/data/methodologies/impact-model';
import { V1_FACTOR_DEFINITIONS, V1Factor } from '@/data/v1Methodology';

type FactorId = keyof typeof FACTOR_DEFINITIONS;
type ModelTab = 'impact' | 'economist' | 'needs';

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

const NEED_CATEGORY_INFO = {
  physiological: { name: 'Physiological', description: 'Food, water, shelter, healthcare', color: 'red' },
  safety: { name: 'Safety', description: 'Security, stability, protection', color: 'orange' },
  community: { name: 'Community', description: 'Social belonging, civic participation', color: 'blue' },
  opportunity: { name: 'Opportunity', description: 'Employment, education, economic mobility', color: 'green' },
  selfActualization: { name: 'Self-Actualization', description: 'Arts, culture, personal fulfillment', color: 'purple' },
};

function NeedsModelPolicyCard({ policyId }: { policyId: string }) {
  const [expanded, setExpanded] = useState(false);
  const methodology = needsModelMethodologies[policyId];

  if (!methodology) return null;

  return (
    <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800">
      <div className="p-6 border-b-4 border-black dark:border-gray-600">
        <h3 className="font-display text-2xl font-black text-black dark:text-white mb-2">
          {methodology.policyName}
        </h3>
        <p className="font-body text-gray-700 dark:text-gray-300 mb-4">
          {methodology.description}
        </p>

        {/* Dimensions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-3 border-2 border-black dark:border-gray-600">
            <div className="text-xs font-body text-gray-500 dark:text-gray-400">Population</div>
            <div className="font-display font-black text-xl text-black dark:text-white">
              {methodology.dimensions.populationAffected.score}/10
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-3 border-2 border-black dark:border-gray-600">
            <div className="text-xs font-body text-gray-500 dark:text-gray-400">Essential</div>
            <div className="font-display font-black text-xl text-black dark:text-white">
              {methodology.dimensions.essentialToSurvival.score}/10
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-3 border-2 border-black dark:border-gray-600">
            <div className="text-xs font-body text-gray-500 dark:text-gray-400">Time to Outcome</div>
            <div className="font-display font-black text-xl text-black dark:text-white">
              {methodology.dimensions.timeToOutcome.score}/10
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-3 border-2 border-black dark:border-gray-600">
            <div className="text-xs font-body text-gray-500 dark:text-gray-400">Feasibility</div>
            <div className="font-display font-black text-xl text-black dark:text-white">
              {methodology.dimensions.feasibility.score}/10
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors font-body font-bold text-gray-700 dark:text-gray-300"
      >
        {expanded ? (
          <>
            <ChevronUp className="w-5 h-5" />
            Hide Need Category Analysis
          </>
        ) : (
          <>
            <ChevronDown className="w-5 h-5" />
            Show Need Category Analysis
          </>
        )}
      </button>

      {expanded && (
        <div className="p-6 border-t-2 border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            {Object.entries(methodology.needCategories).map(([categoryId, categoryData]) => {
              const info = NEED_CATEGORY_INFO[categoryId as keyof typeof NEED_CATEGORY_INFO];
              if (!info || !categoryData) return null;

              return (
                <div key={categoryId} className="border-2 border-gray-200 dark:border-gray-600 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h5 className="font-display text-lg font-black text-black dark:text-white">
                        {info.name}
                      </h5>
                      <span className="text-sm font-body text-gray-500 dark:text-gray-400">
                        {info.description}
                      </span>
                    </div>
                    <div className={`text-3xl font-display font-black ${
                      categoryData.score >= 7 ? 'text-green-600 dark:text-green-400' :
                      categoryData.score >= 5 ? 'text-blue-600 dark:text-blue-400' :
                      'text-amber-600 dark:text-amber-400'
                    }`}>
                      {categoryData.score}/10
                    </div>
                  </div>
                  <p className="font-body text-sm text-gray-700 dark:text-gray-300">
                    {categoryData.reasoning}
                  </p>
                </div>
              );
            })}
          </div>

          {methodology.overallRationale && (
            <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-4 border-2 border-black dark:border-gray-600">
              <p className="font-body text-sm text-gray-800 dark:text-gray-200">
                <strong>Overall Rationale:</strong> {methodology.overallRationale}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function V1FactorCard({ factorId }: { factorId: V1Factor }) {
  const def = V1_FACTOR_DEFINITIONS[factorId];

  return (
    <div className="border-2 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-display text-lg font-black text-black dark:text-white">
          {def.name}
        </h4>
      </div>
      <p className="font-body text-sm text-gray-700 dark:text-gray-300 mb-3">
        {def.description}
      </p>
      <div className="text-xs font-body">
        <p className="text-gray-500 dark:text-gray-500 italic mb-1">
          <strong>Key Question:</strong> {def.keyQuestion}
        </p>
        <div className="flex gap-4 mt-2">
          <div className="flex-1">
            <span className="text-gray-600 dark:text-gray-400">{def.lowAnchor}</span>
          </div>
          <div className="flex-1">
            <span className="text-gray-600 dark:text-gray-400">{def.highAnchor}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImpactModelPolicyCard({ policyId }: { policyId: string }) {
  const [expanded, setExpanded] = useState(false);
  const methodology = impactModelMethodologies[policyId];

  if (!methodology) return null;

  const factors = Object.entries(methodology.factors) as [V1Factor, (typeof methodology.factors)[V1Factor]][];
  const sortedFactors = [...factors].sort((a, b) => b[1].score - a[1].score);
  const topFactors = sortedFactors.slice(0, 3);
  const bottomFactors = sortedFactors.slice(-3).reverse();

  return (
    <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800">
      <div className="p-6 border-b-4 border-black dark:border-gray-600">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-2xl font-black text-black dark:text-white">
            {methodology.policyName}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-body text-gray-500 dark:text-gray-400">{methodology.tier}</span>
            <span className="font-display font-black text-2xl text-[#2F3BBD]">{methodology.totalScore}</span>
          </div>
        </div>
        <p className="font-body text-gray-700 dark:text-gray-300 mb-4">
          {methodology.description}
        </p>

        {/* Factor Bar Chart */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {factors.map(([factorId, factorData]) => (
            <div key={factorId} className="text-center">
              <div className="h-24 bg-gray-200 dark:bg-gray-700 relative rounded-t">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-[#2F3BBD] rounded-t transition-all"
                  style={{ height: `${factorData.score * 100}%` }}
                />
              </div>
              <div className="text-xs font-body text-gray-600 dark:text-gray-400 mt-1 truncate">
                {V1_FACTOR_DEFINITIONS[factorId].name.split(' ')[0]}
              </div>
              <div className="text-xs font-display font-black text-gray-800 dark:text-gray-200">
                {factorData.score.toFixed(1)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 border-b-2 border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-display text-lg font-black text-green-700 dark:text-green-400 mb-3">
              Highest Scores
            </h4>
            <div className="space-y-2">
              {topFactors.map(([factorId, factorData]) => (
                <div key={factorId} className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-2 border border-green-200 dark:border-green-800">
                  <span className="font-body text-sm font-medium text-gray-800 dark:text-gray-200">
                    {V1_FACTOR_DEFINITIONS[factorId].name}
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
              Lowest Scores
            </h4>
            <div className="space-y-2">
              {bottomFactors.map(([factorId, factorData]) => (
                <div key={factorId} className="flex items-center justify-between bg-amber-50 dark:bg-amber-900/20 p-2 border border-amber-200 dark:border-amber-800">
                  <span className="font-body text-sm font-medium text-gray-800 dark:text-gray-200">
                    {V1_FACTOR_DEFINITIONS[factorId].name}
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

      {expanded && (
        <div className="p-6 border-t-2 border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            {factors.map(([factorId, factorData]) => (
              <div key={factorId} className="border-2 border-gray-200 dark:border-gray-600 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-display text-lg font-black text-black dark:text-white">
                      {V1_FACTOR_DEFINITIONS[factorId].name}
                    </h5>
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
              </div>
            ))}
          </div>

          {methodology.overallRationale && (
            <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-4 border-2 border-black dark:border-gray-600">
              <p className="font-body text-sm text-gray-800 dark:text-gray-200">
                <strong>Overall Rationale:</strong> {methodology.overallRationale}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ModelsPage() {
  const [activeTab, setActiveTab] = useState<ModelTab>('impact');
  const methodologies = getAllMethodologies();
  const impactMethodologies = getAllImpactModelMethodologies();

  const mechanicsFactors: FactorId[] = ['hayek', 'ostrom', 'downs', 'olson', 'keynes'];
  const rightsFactors: FactorId[] = ['pettit', 'hirschman', 'buchanan', 'polanyi'];
  const justiceFactors: FactorId[] = ['rawls', 'george', 'acemoglu', 'walzer'];

  const v1Factors: V1Factor[] = ['population', 'economic', 'intensity', 'duration', 'equity', 'externalities', 'implementation'];
  const needsModelPolicyIds = Object.keys(needsModelMethodologies);

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
          Scoring Models
        </h1>
        <p className="font-body text-xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto">
          Explore the different models used to evaluate and score policies, with detailed methodologies and evidence-based reasoning.
        </p>
      </div>

      {/* Model Tabs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => setActiveTab('impact')}
          className={`p-4 border-4 border-black dark:border-gray-600 font-display font-black text-lg transition-all ${
            activeTab === 'impact'
              ? 'bg-green-600 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              : 'bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Scale className="w-5 h-5" />
            <span>Impact Model</span>
          </div>
          <div className="text-xs font-body font-normal mt-1 opacity-80">
            7-Factor Weight of Impact
          </div>
        </button>
        <button
          onClick={() => setActiveTab('economist')}
          className={`p-4 border-4 border-black dark:border-gray-600 font-display font-black text-lg transition-all ${
            activeTab === 'economist'
              ? 'bg-[#2F3BBD] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              : 'bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Brain className="w-5 h-5" />
            <span>Economist Model</span>
          </div>
          <div className="text-xs font-body font-normal mt-1 opacity-80">
            13-Factor Political Economy
          </div>
        </button>
        <button
          onClick={() => setActiveTab('needs')}
          className={`p-4 border-4 border-black dark:border-gray-600 font-display font-black text-lg transition-all ${
            activeTab === 'needs'
              ? 'bg-[#C91A2B] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              : 'bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-5 h-5" />
            <span>Needs Model</span>
          </div>
          <div className="text-xs font-body font-normal mt-1 opacity-80">
            Maslow-Inspired Framework
          </div>
        </button>
      </div>

      {/* Impact Model Content */}
      {activeTab === 'impact' && (
        <>
          {/* Introduction */}
          <div className="mb-12 border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-8">
            <h2 className="font-display text-2xl font-black text-black dark:text-white mb-4">
              About the Impact Model
            </h2>
            <div className="font-body text-gray-700 dark:text-gray-300 space-y-4">
              <p>
                The Impact Model measures the <strong>weight of impact</strong> each policy would have - how much real-world change it produces across population reach, economic scale, and lasting effects.
              </p>
              <p>
                Each of the 7 factors is scored from <strong>0.0</strong> (low) to <strong>1.0</strong> (high). The total score (0-100) combines these factors, with implementation difficulty reducing the final score.
              </p>
            </div>
          </div>

          {/* The 7 Factors */}
          <div className="mb-12">
            <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
              The 7 Factors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {v1Factors.map((factorId) => (
                <V1FactorCard key={factorId} factorId={factorId} />
              ))}
            </div>
          </div>

          {/* Policy Deep Dives */}
          <div className="mb-12">
            <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
              Policy Analysis ({impactMethodologies.length} policies)
            </h2>
            <div className="space-y-8">
              {impactMethodologies.map((methodology) => (
                <ImpactModelPolicyCard key={methodology.policyId} policyId={methodology.policyId} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Economist Model Content */}
      {activeTab === 'economist' && (
        <>
          {/* Introduction */}
          <div className="mb-12 border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-8">
            <h2 className="font-display text-2xl font-black text-black dark:text-white mb-4">
              How It Works
            </h2>
            <div className="font-body text-gray-700 dark:text-gray-300 space-y-4">
              <p>
                We assign each policy factor a score between <strong>0.0</strong> (low alignment) and <strong>1.0</strong> (high alignment) by comparing the policy&apos;s characteristics to anchor descriptions derived from political-economic theory.
              </p>
              <p>
                For consistency, we derive <strong>key questions</strong> from each factor&apos;s definition. We rely on <strong>real-world evidence</strong> (empirical studies, policy analyses) and <strong>political-economic theory</strong> to justify each score.
              </p>
            </div>
          </div>

          {/* The 13 Factors */}
          <div className="mb-12">
            <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
              The 13 Factors
            </h2>

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
              Policy Analysis ({methodologies.length} policies)
            </h2>
            <div className="space-y-8">
              {methodologies.map((methodology) => (
                <PolicyMethodologyCard key={methodology.policyId} policyId={methodology.policyId} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Needs Model Content */}
      {activeTab === 'needs' && (
        <>
          {/* Introduction */}
          <div className="mb-12 border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-8">
            <h2 className="font-display text-2xl font-black text-black dark:text-white mb-4">
              About the Needs Model
            </h2>
            <div className="font-body text-gray-700 dark:text-gray-300 space-y-4">
              <p>
                The V3 Needs-Based Model evaluates policies based on <strong>Maslow&apos;s hierarchy of needs</strong>, measuring how each policy affects fundamental human needs from physiological to self-actualization.
              </p>
              <p>
                Scores range from <strong>0-10</strong> where 5 is neutral. Scores below 5 indicate harm, scores above 5 indicate benefit.
              </p>
            </div>
          </div>

          {/* Need Categories */}
          <div className="mb-12">
            <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
              Need Categories & Weights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(NEED_CATEGORY_INFO).map(([id, info]) => (
                <div key={id} className="border-2 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-4">
                  <h4 className="font-display text-lg font-black text-black dark:text-white mb-1">
                    {info.name}
                  </h4>
                  <p className="font-body text-sm text-gray-600 dark:text-gray-400">
                    {info.description}
                  </p>
                  <div className="mt-2 text-xs font-body text-gray-500 dark:text-gray-500">
                    Weight: {id === 'safety' ? '30%' : id === 'physiological' ? '25%' : id === 'opportunity' ? '20%' : id === 'community' ? '15%' : '10%'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Deep Dives */}
          <div className="mb-12">
            <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
              Policy Analysis ({needsModelPolicyIds.length} policies)
            </h2>
            <div className="space-y-8">
              {needsModelPolicyIds.map((policyId) => (
                <NeedsModelPolicyCard key={policyId} policyId={policyId} />
              ))}
            </div>
          </div>
        </>
      )}

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
