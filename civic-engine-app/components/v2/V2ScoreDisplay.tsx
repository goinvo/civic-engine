'use client';

import { useState, useMemo } from 'react';
import { ExternalLink, BarChart3, PieChart, FileText, ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { V2FactorScores, V2Factor } from '@/types/consensus';
import { V2_FACTORS, V2_FACTOR_INFO, V2_FACTOR_GROUPS } from '@/data/archetypesV2';
import { FACTOR_DEFINITIONS, policyMethodologies, PolicyMethodology } from '@/data/v2Methodology';
import { ArchetypeRadarChart } from './ArchetypeRadarChart';
import Link from 'next/link';

type DisplayMode = 'table' | 'radar' | 'full';

interface V2ScoreDisplayProps {
  policyId: string;
  factorScores: V2FactorScores;
  className?: string;
  defaultMode?: DisplayMode;
  defaultCollapsed?: boolean;
  showMethodologyLink?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

// Color helpers - neutral purple gradient (light to dark based on score)
// Higher scores = darker/more saturated purple, lower = lighter
// Using the true midpoint purple between brand blue (#2F3BBD) and red (#C91A2B): #81467D
// This avoids political color associations while maintaining readability
function getScoreColor(score: number): string {
  if (score >= 0.75) return 'bg-[#210026]'; // Darkest purple - high
  if (score >= 0.5) return 'bg-[#501159]';  // Dark purple - mid-high
  if (score >= 0.25) return 'bg-[#81467D]'; // Medium purple - mid-low
  return 'bg-[#B87FB3]';                     // Light purple - low
}

function getScoreTextColor(score: number): string {
  if (score >= 0.75) return 'text-[#210026] dark:text-[#D4A5D0]';
  if (score >= 0.5) return 'text-[#501159] dark:text-[#B87FB3]';
  if (score >= 0.25) return 'text-[#81467D] dark:text-[#81467D]';
  return 'text-[#B87FB3] dark:text-[#B87FB3]';
}

// Short abbreviations for factor names (max 4-5 chars for compact display)
const FACTOR_ABBREV: Record<string, string> = {
  hayek: 'Info',
  ostrom: 'Scale',
  downs: 'Clear',
  olson: 'Capt',
  keynes: 'Stab',
  pettit: 'Free',
  hirschman: 'Exit',
  buchanan: 'Cons',
  polanyi: 'Prot',
  rawls: 'Floor',
  george: 'Rent',
  acemoglu: 'Incl',
  walzer: 'Sph',
};

// Tab button component - neobrutalist style
function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-1.5 px-3 py-2 text-xs font-display font-bold transition-all border-2 ${
        active
          ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
          : 'bg-white dark:bg-gray-800 text-black dark:text-white border-black dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

// Table view - 13-column mini table with expandable factors
function TableView({
  factorScores,
  methodology,
  showFullAnalysis,
}: {
  factorScores: V2FactorScores;
  methodology?: PolicyMethodology;
  showFullAnalysis: boolean;
}) {
  const [expandedFactor, setExpandedFactor] = useState<V2Factor | null>(null);

  // Get top 3 and bottom 3 factors
  const sortedFactors = useMemo(() => {
    return V2_FACTORS
      .map(f => ({ factor: f, score: factorScores[f] }))
      .sort((a, b) => b.score - a.score);
  }, [factorScores]);

  const topFactors = sortedFactors.slice(0, 3);
  const bottomFactors = sortedFactors.slice(-3).reverse();

  const handleFactorClick = (factor: V2Factor) => {
    setExpandedFactor(expandedFactor === factor ? null : factor);
  };

  return (
    <div className={`grid ${showFullAnalysis ? 'grid-cols-1 lg:grid-cols-2 gap-4' : 'grid-cols-1'}`}>
      {/* Left side: Table */}
      <div className="space-y-3">
        {/* Factor groups */}
        {(['mechanics', 'rights', 'justice'] as const).map(group => (
          <div key={group}>
            <div className={`text-[10px] font-bold uppercase mb-1 ${
              group === 'mechanics' ? 'text-[#2F3BBD] dark:text-blue-400' :
              group === 'rights' ? 'text-[#C91A2B] dark:text-red-400' :
              'text-[#81467D] dark:text-[#B87FB3]'
            }`}>
              {group === 'mechanics' ? 'Mechanics & Structure' :
               group === 'rights' ? 'Rights & Dynamics' :
               'Justice & Distribution'}
            </div>
            <motion.div className="flex flex-wrap gap-0.5" layout transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}>
              {V2_FACTOR_GROUPS[group].map(factor => {
                const score = factorScores[factor];
                const info = V2_FACTOR_INFO[factor];
                const factorDef = FACTOR_DEFINITIONS[factor];
                const methodologyFactor = methodology?.factors[factor];
                const isExpanded = expandedFactor === factor;

                return (
                  <motion.div
                    key={factor}
                    layout
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className={`relative ${
                      isExpanded ? 'flex-[1_1_100%]' : 'flex-1 min-w-0'
                    }`}
                  >
                    <motion.div
                      layout="position"
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className={`w-full ${getScoreColor(score)} ${
                        isExpanded
                          ? 'flex items-center justify-between px-3 py-2'
                          : 'h-8 flex flex-col items-center justify-center'
                      }`}
                    >
                      {isExpanded ? (
                        <>
                          <span className="text-xs font-bold text-white">
                            {info.name}
                            <span className="text-white/70 ml-1">({info.thinker})</span>
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-black text-white">
                              {(score * 100).toFixed(0)}
                            </span>
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8, x: 10 }}
                              animate={{ opacity: 1, scale: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              onClick={() => handleFactorClick(factor)}
                              className="w-6 h-6 flex items-center justify-center bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                              title="Close"
                            >
                              <X className="w-4 h-4" strokeWidth={3} />
                            </motion.button>
                          </div>
                        </>
                      ) : (
                        <button
                          onClick={() => handleFactorClick(factor)}
                          title={`${info.name} - Click to expand`}
                          className="w-full h-full flex flex-col items-center justify-center group hover:opacity-90"
                        >
                          <span className="text-[8px] font-bold text-white/90 leading-none group-hover:hidden">
                            {FACTOR_ABBREV[factor]}
                          </span>
                          <span className="text-[7px] font-bold text-white/90 leading-none hidden group-hover:block">
                            Click
                          </span>
                          <span className="text-xs font-black text-white leading-none">
                            {(score * 10).toFixed(0)}
                          </span>
                        </button>
                      )}
                    </motion.div>

                    {/* Expanded content */}
                    {isExpanded && (
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="bg-white dark:bg-gray-800 border-2 border-t-0 border-black dark:border-gray-600"
                      >
                        <div className="p-3 space-y-2">
                          {/* Key question */}
                          <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                            {factorDef.keyQuestion}
                          </p>

                          {/* Score bar */}
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 border border-black dark:border-gray-500">
                              <div
                                className={`h-full ${getScoreColor(score)}`}
                                style={{ width: `${score * 100}%` }}
                              />
                            </div>
                            <span className={`text-xs font-bold ${getScoreTextColor(score)}`}>
                              {(score * 100).toFixed(0)}%
                            </span>
                          </div>

                          {/* Anchors */}
                          <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400">
                            <span className="max-w-[45%]">{factorDef.lowAnchor}</span>
                            <span className="max-w-[45%] text-right">{factorDef.highAnchor}</span>
                          </div>

                          {/* Methodology reasoning if available */}
                          {methodologyFactor && (
                            <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                              <p className="text-xs text-gray-700 dark:text-gray-300">
                                {methodologyFactor.reasoning}
                              </p>
                              {methodologyFactor.keyPoints && methodologyFactor.keyPoints.length > 0 && (
                                <ul className="mt-1 list-disc list-inside text-[10px] text-gray-600 dark:text-gray-400 space-y-0.5">
                                  {methodologyFactor.keyPoints.slice(0, 3).map((point, idx) => (
                                    <li key={idx}>{point}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        ))}

        {/* Highest & Lowest Scores summary */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div>
            <h4 className="font-display font-bold text-xs text-[#501159] dark:text-[#B87FB3] mb-1">
              Highest Scores
            </h4>
            <div className="space-y-0.5">
              {topFactors.map(({ factor, score }) => (
                <button
                  key={factor}
                  onClick={() => handleFactorClick(factor)}
                  className="w-full flex items-center justify-between text-xs hover:bg-gray-100 dark:hover:bg-gray-700 px-1 -mx-1 rounded transition-colors"
                >
                  <span className="text-gray-600 dark:text-gray-400 truncate">
                    {V2_FACTOR_INFO[factor].name}
                  </span>
                  <span className={`font-bold ${getScoreTextColor(score)}`}>
                    {(score * 100).toFixed(0)}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-xs text-[#81467D] dark:text-[#B87FB3] mb-1">
              Lowest Scores
            </h4>
            <div className="space-y-0.5">
              {bottomFactors.map(({ factor, score }) => (
                <button
                  key={factor}
                  onClick={() => handleFactorClick(factor)}
                  className="w-full flex items-center justify-between text-xs hover:bg-gray-100 dark:hover:bg-gray-700 px-1 -mx-1 rounded transition-colors"
                >
                  <span className="text-gray-600 dark:text-gray-400 truncate">
                    {V2_FACTOR_INFO[factor].name}
                  </span>
                  <span className={`font-bold ${getScoreTextColor(score)}`}>
                    {(score * 100).toFixed(0)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Full Analysis (when showFullAnalysis is true) */}
      {showFullAnalysis && methodology && (
        <div className="border-l-0 lg:border-l-2 border-gray-200 dark:border-gray-600 lg:pl-4 space-y-3 max-h-[400px] overflow-y-auto">
          <div className="p-3 bg-gradient-to-r from-[#2F3BBD]/10 to-[#C91A2B]/10 border border-[#2F3BBD]/30 dark:border-gray-600">
            <h4 className="font-display font-bold text-xs text-gray-700 dark:text-gray-300 mb-1">
              Overall Assessment
            </h4>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              {methodology.overallRationale}
            </p>
          </div>

          {/* Factor details */}
          {V2_FACTORS.slice(0, 6).map(factor => {
            const score = factorScores[factor];
            const info = V2_FACTOR_INFO[factor];
            const methodologyFactor = methodology.factors[factor];

            return (
              <div key={factor} className="border-b border-gray-100 dark:border-gray-700 pb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-gray-800 dark:text-gray-200">
                    {info.name} <span className="font-normal text-gray-500">({info.thinker})</span>
                  </span>
                  <span className={`font-black text-sm ${getScoreTextColor(score)}`}>
                    {(score * 100).toFixed(0)}
                  </span>
                </div>
                {methodologyFactor && (
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 line-clamp-2">
                    {methodologyFactor.reasoning}
                  </p>
                )}
              </div>
            );
          })}
          <p className="text-[10px] text-gray-500 italic">+ {V2_FACTORS.length - 6} more factors...</p>
        </div>
      )}
    </div>
  );
}

// Radar view - radar chart with strengths/weaknesses
function RadarView({
  factorScores,
  methodology,
}: {
  factorScores: V2FactorScores;
  methodology?: PolicyMethodology;
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Radar Chart */}
      <div className="h-[280px]">
        <ArchetypeRadarChart factorScores={factorScores} showWeights={false} />
      </div>

      {/* Highest & Lowest Scores */}
      <div className="space-y-4">
        <div>
          <h4 className="font-display font-bold text-sm text-[#501159] dark:text-[#B87FB3] mb-2">
            Highest Scores
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
          <h4 className="font-display font-bold text-sm text-[#81467D] dark:text-[#B87FB3] mb-2">
            Lowest Scores
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

        {/* Overall rationale if methodology exists */}
        {methodology && (
          <div className="p-3 bg-[#81467D]/10 border-2 border-[#81467D]/30 dark:border-[#81467D] text-xs text-gray-700 dark:text-gray-300">
            <strong>Summary:</strong> {methodology.overallRationale}
          </div>
        )}
      </div>
    </div>
  );
}

// Full methodology view - all 13 factors with reasoning (wide layout)
function FullView({
  policyId,
  factorScores,
  methodology,
  showMethodologyLink,
}: {
  policyId: string;
  factorScores: V2FactorScores;
  methodology?: PolicyMethodology;
  showMethodologyLink?: boolean;
}) {
  return (
    <div className="space-y-6">
      {/* Top section: Radar + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <div className="h-[320px]">
          <ArchetypeRadarChart factorScores={factorScores} showWeights={false} />
        </div>

        {/* Overall rationale - neobrutalist */}
        {methodology && (
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex-1 p-4 bg-gradient-to-br from-[#2F3BBD] to-[#C91A2B] border-4 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)]">
              <h4 className="font-display font-black text-base text-white mb-2">
                Overall Assessment
              </h4>
              <p className="text-sm text-white/90 font-medium">
                {methodology.overallRationale}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* All factors in 3-column grid by group */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['mechanics', 'rights', 'justice'] as const).map(group => (
          <div key={group}>
            <h4 className={`font-display font-bold text-sm mb-3 pb-2 border-b-2 ${
              group === 'mechanics' ? 'text-[#2F3BBD] dark:text-blue-400 border-[#2F3BBD]' :
              group === 'rights' ? 'text-[#C91A2B] dark:text-red-400 border-[#C91A2B]' :
              'text-[#81467D] dark:text-[#B87FB3] border-[#81467D]'
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
                  <div key={factor} className="border-2 border-black dark:border-gray-600 p-3 bg-white dark:bg-gray-800">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-display font-black text-sm text-black dark:text-white">
                          {info.name}
                        </h5>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">
                          {info.thinker}
                        </span>
                      </div>
                      <div className={`text-xl font-display font-black ${getScoreTextColor(score)}`}>
                        {(score * 100).toFixed(0)}
                      </div>
                    </div>

                    {/* Score bar - neobrutalist */}
                    <div className="h-2 bg-gray-200 dark:bg-gray-600 border border-black dark:border-gray-500 mb-2">
                      <div
                        className={`h-full ${getScoreColor(score)} transition-all`}
                        style={{ width: `${score * 100}%` }}
                      />
                    </div>

                    {/* Key question */}
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 italic mb-2">
                      {factorDef.keyQuestion}
                    </p>

                    {/* Methodology reasoning if available */}
                    {methodologyFactor && (
                      <>
                        <p className="text-xs text-gray-700 dark:text-gray-300 mb-1 line-clamp-3">
                          {methodologyFactor.reasoning}
                        </p>
                        {methodologyFactor.keyPoints && methodologyFactor.keyPoints.length > 0 && (
                          <ul className="list-disc list-inside text-[10px] text-gray-600 dark:text-gray-400 space-y-0.5">
                            {methodologyFactor.keyPoints.slice(0, 2).map((point, idx) => (
                              <li key={idx} className="truncate">{point}</li>
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
      </div>

      {/* Policy modifiers - neobrutalist */}
      {methodology?.modifiers && methodology.modifiers.length > 0 && (
        <div className="p-4 bg-black dark:bg-gray-900 border-4 border-black dark:border-gray-600">
          <h4 className="font-display font-black text-sm text-white mb-3">
            POLICY MODIFIERS
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {methodology.modifiers.map(mod => (
              <div key={mod.id} className="text-sm bg-white dark:bg-gray-800 p-3 border-2 border-black dark:border-gray-600">
                <span className="font-display font-black text-gray-800 dark:text-gray-200">{mod.name}</span>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">{mod.description}</p>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(mod.factorChanges).map(([factorId, delta]) => (
                    <span
                      key={factorId}
                      className={`text-[10px] px-1.5 py-0.5 font-bold border ${
                        (delta as number) > 0
                          ? 'bg-[#2F3BBD] text-white border-black'
                          : 'bg-[#C91A2B] text-white border-black'
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
        <div className="text-center pt-2">
          <Link
            href={`/methodology#${policyId}`}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white font-display font-bold text-sm border-2 border-black dark:border-gray-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(75,85,99,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <span>View on Methodology Page</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  );
}

// Collapsed preview - mini heatmap bar
function CollapsedPreview({ factorScores }: { factorScores: V2FactorScores }) {
  return (
    <div className="flex space-x-0.5">
      {V2_FACTORS.map(factor => {
        const score = factorScores[factor];
        const info = V2_FACTOR_INFO[factor];
        return (
          <div
            key={factor}
            className={`flex-1 h-3 ${getScoreColor(score)}`}
            title={`${info.name} (${info.thinker}): ${(score * 100).toFixed(0)}%`}
          />
        );
      })}
    </div>
  );
}

// Main component
export function V2ScoreDisplay({
  policyId,
  factorScores,
  className = '',
  defaultMode = 'table',
  defaultCollapsed = true,
  showMethodologyLink = true,
  onExpandedChange,
}: V2ScoreDisplayProps) {
  const [mode, setMode] = useState<DisplayMode>(defaultMode);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const methodology = policyMethodologies[policyId];
  const isFullExpanded = mode === 'full';

  const handleModeChange = (newMode: DisplayMode) => {
    setMode(newMode);
    if (onExpandedChange) {
      onExpandedChange(newMode === 'full');
    }
  };

  const handleToggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    // Notify parent about expansion state changes
    if (onExpandedChange) {
      if (newCollapsed) {
        // Collapsing - always notify as not expanded
        onExpandedChange(false);
      } else if (isFullExpanded) {
        // Expanding and mode is "full" - restore expanded state
        onExpandedChange(true);
      }
    }
  };

  return (
    <div className={`border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] ${className}`}>
      {/* Collapsible header - always visible */}
      <button
        onClick={handleToggleCollapse}
        className={`w-full flex items-center justify-between px-3 py-2 bg-gradient-to-r from-[#2F3BBD]/10 to-[#C91A2B]/10 hover:from-[#2F3BBD]/20 hover:to-[#C91A2B]/20 transition-colors ${!isCollapsed ? 'border-b-4 border-black dark:border-gray-600' : ''}`}
      >
        <div className="flex items-center space-x-3">
          <span className="font-display font-black text-xs bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] bg-clip-text text-transparent">
            ECONOMICS LENS
          </span>
          {/* Show mini preview when collapsed */}
          {isCollapsed && (
            <div className="hidden sm:block w-32">
              <CollapsedPreview factorScores={factorScores} />
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {isCollapsed && (
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Click to expand
            </span>
          )}
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          )}
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            {/* Tab buttons */}
            <div className="flex items-center space-x-1 px-3 py-2 border-b-2 border-gray-200 dark:border-gray-600">
              <TabButton
                active={mode === 'table'}
                onClick={() => handleModeChange('table')}
                icon={BarChart3}
                label="Table"
              />
              <TabButton
                active={mode === 'radar'}
                onClick={() => handleModeChange('radar')}
                icon={PieChart}
                label="Radar"
              />
              {methodology && (
                <TabButton
                  active={mode === 'full'}
                  onClick={() => handleModeChange('full')}
                  icon={FileText}
                  label="Full Analysis"
                />
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              {mode === 'table' && (
                <TableView
                  factorScores={factorScores}
                  methodology={methodology}
                  showFullAnalysis={false}
                />
              )}
              {mode === 'radar' && (
                <RadarView factorScores={factorScores} methodology={methodology} />
              )}
              {mode === 'full' && (
                <FullView
                  policyId={policyId}
                  factorScores={factorScores}
                  methodology={methodology}
                  showMethodologyLink={showMethodologyLink}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
