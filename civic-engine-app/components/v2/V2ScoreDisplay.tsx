'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Info } from 'lucide-react';
import { V2FactorScores } from '@/types/consensus';
import { V2_FACTORS, V2_FACTOR_INFO, V2_FACTOR_GROUPS } from '@/data/archetypesV2';
import { FACTOR_DEFINITIONS, policyMethodologies, PolicyMethodology } from '@/data/v2Methodology';
import { ArchetypeRadarChart } from './ArchetypeRadarChart';
import Link from 'next/link';

type DisplayMode = 'collapsed' | 'row' | 'radar' | 'full';

interface V2ScoreDisplayProps {
  policyId: string;
  factorScores: V2FactorScores;
  className?: string;
  defaultMode?: DisplayMode;
  showMethodologyLink?: boolean;
  compact?: boolean;
}

// Color helpers
function getScoreColor(score: number): string {
  if (score >= 0.8) return 'bg-green-500';
  if (score >= 0.6) return 'bg-blue-500';
  if (score >= 0.4) return 'bg-yellow-500';
  return 'bg-red-500';
}

function getScoreTextColor(score: number): string {
  if (score >= 0.8) return 'text-green-600 dark:text-green-400';
  if (score >= 0.6) return 'text-blue-600 dark:text-blue-400';
  if (score >= 0.4) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
}

function getScoreBgColor(score: number): string {
  if (score >= 0.8) return 'bg-green-100 dark:bg-green-900/30';
  if (score >= 0.6) return 'bg-blue-100 dark:bg-blue-900/30';
  if (score >= 0.4) return 'bg-yellow-100 dark:bg-yellow-900/30';
  return 'bg-red-100 dark:bg-red-900/30';
}

// Collapsed view - single summary line
function CollapsedView({ factorScores, onExpand }: { factorScores: V2FactorScores; onExpand: () => void }) {
  const avgScore = useMemo(() => {
    const scores = V2_FACTORS.map(f => factorScores[f]);
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }, [factorScores]);

  const topFactors = useMemo(() => {
    return V2_FACTORS
      .map(f => ({ factor: f, score: factorScores[f] }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [factorScores]);

  return (
    <button
      onClick={onExpand}
      className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="font-display font-bold text-sm text-gray-600 dark:text-gray-400">V2 Score:</span>
          <span className={`font-display font-black text-lg ${getScoreTextColor(avgScore)}`}>
            {(avgScore * 100).toFixed(0)}
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
          <span>Top:</span>
          {topFactors.map(({ factor, score }) => (
            <span key={factor} className={`px-1.5 py-0.5 ${getScoreBgColor(score)} rounded`}>
              {V2_FACTOR_INFO[factor].name}
            </span>
          ))}
        </div>
      </div>
      <ChevronDown className="w-4 h-4 text-gray-500" />
    </button>
  );
}

// Row view - 13-column mini table
function RowView({ factorScores, onExpand, onCollapse }: {
  factorScores: V2FactorScores;
  onExpand: () => void;
  onCollapse: () => void;
}) {
  return (
    <div className="border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
        <span className="font-display font-bold text-sm text-gray-700 dark:text-gray-300">
          13-Factor Scores
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={onExpand}
            className="text-xs font-bold text-[#2F3BBD] dark:text-blue-400 hover:underline"
          >
            Radar View
          </button>
          <button onClick={onCollapse} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
            <ChevronUp className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Factor groups */}
      <div className="p-2 space-y-2">
        {(['mechanics', 'rights', 'justice'] as const).map(group => (
          <div key={group} className="flex items-center space-x-1">
            <span className="w-20 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase truncate">
              {group === 'mechanics' ? 'Mech' : group === 'rights' ? 'Rights' : 'Justice'}
            </span>
            <div className="flex-1 flex space-x-0.5">
              {V2_FACTOR_GROUPS[group].map(factor => {
                const score = factorScores[factor];
                const info = V2_FACTOR_INFO[factor];
                return (
                  <div
                    key={factor}
                    className="flex-1 group relative"
                    title={`${info.name} (${info.thinker}): ${(score * 100).toFixed(0)}%`}
                  >
                    <div className={`h-6 ${getScoreColor(score)} flex items-center justify-center`}>
                      <span className="text-[10px] font-bold text-white">
                        {(score * 10).toFixed(0)}
                      </span>
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10">
                      <div className="bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                        {info.name}: {(score * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="px-2 pb-2 flex flex-wrap gap-1 text-[9px] text-gray-500 dark:text-gray-400">
        {V2_FACTORS.map(factor => (
          <span key={factor} className="px-1 bg-gray-100 dark:bg-gray-700 rounded">
            {V2_FACTOR_INFO[factor].thinker[0]}={V2_FACTOR_INFO[factor].name}
          </span>
        ))}
      </div>
    </div>
  );
}

// Radar view - mini radar chart with expand option
function RadarView({
  policyId,
  factorScores,
  methodology,
  onExpand,
  onCollapse,
  showMethodologyLink
}: {
  policyId: string;
  factorScores: V2FactorScores;
  methodology?: PolicyMethodology;
  onExpand: () => void;
  onCollapse: () => void;
  showMethodologyLink?: boolean;
}) {
  // Get top 3 and bottom 3 factors
  const sortedFactors = useMemo(() => {
    return V2_FACTORS
      .map(f => ({ factor: f, score: factorScores[f] }))
      .sort((a, b) => b.score - a.score);
  }, [factorScores]);

  const topFactors = sortedFactors.slice(0, 3);
  const bottomFactors = sortedFactors.slice(-3).reverse();

  return (
    <div className="border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
        <span className="font-display font-bold text-sm text-gray-700 dark:text-gray-300">
          V2 Political Economy Score
        </span>
        <div className="flex items-center space-x-2">
          {methodology && (
            <button
              onClick={onExpand}
              className="text-xs font-bold text-[#2F3BBD] dark:text-blue-400 hover:underline"
            >
              Full Analysis
            </button>
          )}
          <button onClick={onCollapse} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
            <ChevronUp className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Radar Chart */}
          <div className="h-[250px]">
            <ArchetypeRadarChart factorScores={factorScores} showWeights={false} />
          </div>

          {/* Strengths & Weaknesses */}
          <div className="space-y-4">
            <div>
              <h4 className="font-display font-bold text-sm text-green-700 dark:text-green-400 mb-2">
                Strengths
              </h4>
              <div className="space-y-1">
                {topFactors.map(({ factor, score }) => (
                  <div key={factor} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      {V2_FACTOR_INFO[factor].name}
                      <span className="text-gray-400 dark:text-gray-500 text-xs ml-1">
                        ({V2_FACTOR_INFO[factor].thinker})
                      </span>
                    </span>
                    <span className={`font-bold ${getScoreTextColor(score)}`}>
                      {(score * 100).toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-sm text-amber-700 dark:text-amber-400 mb-2">
                Weaknesses
              </h4>
              <div className="space-y-1">
                {bottomFactors.map(({ factor, score }) => (
                  <div key={factor} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      {V2_FACTOR_INFO[factor].name}
                      <span className="text-gray-400 dark:text-gray-500 text-xs ml-1">
                        ({V2_FACTOR_INFO[factor].thinker})
                      </span>
                    </span>
                    <span className={`font-bold ${getScoreTextColor(score)}`}>
                      {(score * 100).toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Overall rationale if methodology exists */}
        {methodology && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
            <strong>Summary:</strong> {methodology.overallRationale}
          </div>
        )}

        {showMethodologyLink && (
          <div className="mt-3 text-center">
            <Link
              href={`/methodology#${policyId}`}
              className="inline-flex items-center space-x-1 text-sm font-bold text-[#2F3BBD] dark:text-blue-400 hover:underline"
            >
              <span>View Full Methodology</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Full methodology view - all 13 factors with reasoning
function FullView({
  policyId,
  factorScores,
  methodology,
  onCollapse,
  showMethodologyLink
}: {
  policyId: string;
  factorScores: V2FactorScores;
  methodology?: PolicyMethodology;
  onCollapse: () => void;
  showMethodologyLink?: boolean;
}) {
  return (
    <div className="border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
        <span className="font-display font-bold text-base text-gray-700 dark:text-gray-300">
          Full Factor Analysis
        </span>
        <button onClick={onCollapse} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
          <ChevronUp className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="p-4">
        {/* Radar Chart at top */}
        <div className="h-[300px] mb-6">
          <ArchetypeRadarChart factorScores={factorScores} showWeights={false} />
        </div>

        {/* Overall rationale */}
        {methodology && (
          <div className="mb-6 p-4 bg-gradient-to-r from-[#2F3BBD]/10 to-[#C91A2B]/10 border-2 border-[#2F3BBD]/30 dark:border-gray-600">
            <h4 className="font-display font-bold text-sm text-gray-700 dark:text-gray-300 mb-2">
              Overall Assessment
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {methodology.overallRationale}
            </p>
          </div>
        )}

        {/* All factors by group */}
        {(['mechanics', 'rights', 'justice'] as const).map(group => (
          <div key={group} className="mb-6">
            <h4 className={`font-display font-bold text-sm mb-3 ${
              group === 'mechanics' ? 'text-[#2F3BBD] dark:text-blue-400' :
              group === 'rights' ? 'text-[#C91A2B] dark:text-red-400' :
              'text-green-700 dark:text-green-400'
            }`}>
              {group === 'mechanics' ? 'Mechanics & Structure' :
               group === 'rights' ? 'Rights & Dynamics' :
               'Justice & Distribution'}
            </h4>
            <div className="space-y-3">
              {V2_FACTOR_GROUPS[group].map(factor => {
                const score = factorScores[factor];
                const info = V2_FACTOR_INFO[factor];
                const factorDef = FACTOR_DEFINITIONS[factor];
                const methodologyFactor = methodology?.factors[factor];

                return (
                  <div key={factor} className="border border-gray-200 dark:border-gray-600 p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-display font-bold text-sm text-black dark:text-white">
                          {info.name}
                        </h5>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {info.thinker}
                        </span>
                      </div>
                      <div className={`text-2xl font-display font-black ${getScoreTextColor(score)}`}>
                        {(score * 100).toFixed(0)}
                      </div>
                    </div>

                    {/* Score bar */}
                    <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mb-2">
                      <div
                        className={`h-full ${getScoreColor(score)} rounded-full transition-all`}
                        style={{ width: `${score * 100}%` }}
                      />
                    </div>

                    {/* Key question */}
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-2">
                      {factorDef.keyQuestion}
                    </p>

                    {/* Methodology reasoning if available */}
                    {methodologyFactor && (
                      <>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          {methodologyFactor.reasoning}
                        </p>
                        {methodologyFactor.keyPoints && methodologyFactor.keyPoints.length > 0 && (
                          <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                            {methodologyFactor.keyPoints.slice(0, 3).map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Policy modifiers */}
        {methodology?.modifiers && methodology.modifiers.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
            <h4 className="font-display font-bold text-sm text-gray-700 dark:text-gray-300 mb-3">
              Policy Modifiers
            </h4>
            <div className="space-y-2">
              {methodology.modifiers.map(mod => (
                <div key={mod.id} className="text-sm">
                  <span className="font-bold text-gray-800 dark:text-gray-200">{mod.name}:</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">{mod.description}</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {Object.entries(mod.factorChanges).map(([factorId, delta]) => (
                      <span
                        key={factorId}
                        className={`text-xs px-1.5 py-0.5 ${
                          (delta as number) > 0
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}
                      >
                        {FACTOR_DEFINITIONS[factorId as keyof typeof FACTOR_DEFINITIONS]?.name}:
                        {(delta as number) > 0 ? '+' : ''}{((delta as number) * 100).toFixed(0)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showMethodologyLink && (
          <div className="mt-4 text-center">
            <Link
              href={`/methodology#${policyId}`}
              className="inline-flex items-center space-x-1 text-sm font-bold text-[#2F3BBD] dark:text-blue-400 hover:underline"
            >
              <span>View on Methodology Page</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Main component
export function V2ScoreDisplay({
  policyId,
  factorScores,
  className = '',
  defaultMode = 'collapsed',
  showMethodologyLink = true,
  compact = false,
}: V2ScoreDisplayProps) {
  const [mode, setMode] = useState<DisplayMode>(defaultMode);
  const methodology = policyMethodologies[policyId];

  const handleExpand = () => {
    if (mode === 'collapsed') setMode('row');
    else if (mode === 'row') setMode('radar');
    else if (mode === 'radar' && methodology) setMode('full');
  };

  const handleCollapse = () => {
    if (mode === 'full') setMode('radar');
    else if (mode === 'radar') setMode('row');
    else if (mode === 'row') setMode('collapsed');
  };

  return (
    <div className={className}>
      {mode === 'collapsed' && (
        <CollapsedView factorScores={factorScores} onExpand={handleExpand} />
      )}
      {mode === 'row' && (
        <RowView factorScores={factorScores} onExpand={handleExpand} onCollapse={handleCollapse} />
      )}
      {mode === 'radar' && (
        <RadarView
          policyId={policyId}
          factorScores={factorScores}
          methodology={methodology}
          onExpand={handleExpand}
          onCollapse={handleCollapse}
          showMethodologyLink={showMethodologyLink}
        />
      )}
      {mode === 'full' && (
        <FullView
          policyId={policyId}
          factorScores={factorScores}
          methodology={methodology}
          onCollapse={handleCollapse}
          showMethodologyLink={showMethodologyLink}
        />
      )}
    </div>
  );
}
