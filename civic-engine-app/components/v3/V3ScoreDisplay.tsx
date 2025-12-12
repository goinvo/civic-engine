'use client';

import { useState, useMemo } from 'react';
import { BarChart3, PieChart, FileText, ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  V3ImpactScore,
  V3PolicyMethodology,
  NeedCategory,
  NEED_CATEGORY_DEFINITIONS,
  DIMENSION_DEFINITIONS,
  V3ScoringDimensions,
  calculateV3Score,
  getScoreLabel,
  NEUTRAL_SCORE,
} from '@/data/v3Methodology';
import { getNeedsModelMethodology } from '@/data/methodologies/needs-model';
import { NeedsRadarChart } from './NeedsRadarChart';
import Link from 'next/link';

type DisplayMode = 'table' | 'radar' | 'full';

interface V3ScoreDisplayProps {
  policyId: string;
  impactScore: V3ImpactScore;
  className?: string;
  defaultMode?: DisplayMode;
  defaultCollapsed?: boolean;
  showMethodologyLink?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

// Need category order for consistent display
const NEED_CATEGORIES: NeedCategory[] = [
  'physiological',
  'safety',
  'community',
  'opportunity',
  'selfActualization',
];

// Dimension order
const DIMENSIONS: (keyof V3ScoringDimensions)[] = [
  'populationAffected',
  'essentialToSurvival',
  'timeToOutcome',
  'feasibility',
];

// Short abbreviations for compact display
const NEED_ABBREV: Record<NeedCategory, string> = {
  physiological: 'Phys',
  safety: 'Safe',
  community: 'Comm',
  opportunity: 'Opp',
  selfActualization: 'Self',
};

const DIM_ABBREV: Record<keyof V3ScoringDimensions, string> = {
  populationAffected: 'Pop',
  essentialToSurvival: 'Surv',
  timeToOutcome: 'Time',
  feasibility: 'Feas',
};

// Color helpers based on 0-10 scale (5 = neutral)
// Using purple gradient for neutrality (avoiding political colors)
function getScoreColor(score: number): string {
  if (score >= 8) return 'bg-[#210026]';      // Darkest purple - very beneficial
  if (score >= 6) return 'bg-[#501159]';      // Dark purple - beneficial
  if (score > 5) return 'bg-[#81467D]';       // Medium purple - slightly beneficial
  if (score === 5) return 'bg-gray-400';      // Gray - neutral
  if (score >= 3) return 'bg-[#B87FB3]';      // Light purple - slightly harmful
  return 'bg-[#D4A5D0]';                       // Lightest purple - harmful
}

function getScoreTextColor(score: number): string {
  if (score >= 8) return 'text-[#210026] dark:text-[#D4A5D0]';
  if (score >= 6) return 'text-[#501159] dark:text-[#B87FB3]';
  if (score > 5) return 'text-[#81467D] dark:text-[#81467D]';
  if (score === 5) return 'text-gray-500 dark:text-gray-400';
  if (score >= 3) return 'text-[#B87FB3] dark:text-[#B87FB3]';
  return 'text-[#D4A5D0] dark:text-[#D4A5D0]';
}

function getScoreBgClass(score: number): string {
  if (score >= 8) return 'bg-purple-100 dark:bg-purple-900/30';
  if (score >= 6) return 'bg-purple-50 dark:bg-purple-900/20';
  if (score > 5) return 'bg-purple-50/50 dark:bg-purple-900/10';
  if (score === 5) return 'bg-gray-100 dark:bg-gray-800';
  return 'bg-gray-50 dark:bg-gray-800/50';
}

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

// Table view with expandable needs and dimensions
function TableView({
  impactScore,
  methodology,
}: {
  impactScore: V3ImpactScore;
  methodology?: V3PolicyMethodology;
}) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Sort needs by score
  const sortedNeeds = useMemo(() => {
    return NEED_CATEGORIES
      .filter(cat => impactScore.needCategories[cat])
      .map(cat => ({
        category: cat,
        score: impactScore.needCategories[cat]!.score,
        reasoning: impactScore.needCategories[cat]!.reasoning,
      }))
      .sort((a, b) => b.score - a.score);
  }, [impactScore]);

  const topNeeds = sortedNeeds.slice(0, 2);
  const bottomNeeds = sortedNeeds.slice(-2).reverse();

  // Sort dimensions by score
  const sortedDimensions = useMemo(() => {
    return DIMENSIONS.map(dim => ({
      dimension: dim,
      score: impactScore.dimensions[dim],
    })).sort((a, b) => b.score - a.score);
  }, [impactScore]);

  const handleItemClick = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {/* Need Categories Section */}
      <div>
        <div className="text-[10px] font-bold uppercase mb-1 text-purple-700 dark:text-purple-400">
          Need Categories (Maslow-Inspired)
        </div>
        <motion.div className="flex flex-wrap gap-0.5" layout transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}>
          {NEED_CATEGORIES.map(category => {
            const catScore = impactScore.needCategories[category];
            if (!catScore) return null;

            const def = NEED_CATEGORY_DEFINITIONS[category];
            const methodologyNeed = methodology?.needCategories[category];
            const isExpanded = expandedItem === `need-${category}`;
            const score = catScore.score;

            return (
              <motion.div
                key={category}
                layout
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className={`relative ${isExpanded ? 'flex-[1_1_100%]' : 'flex-1 min-w-0'}`}
              >
                <motion.div
                  layout="position"
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className={`w-full ${getScoreColor(score)} ${
                    isExpanded
                      ? 'flex items-center justify-between px-3 py-2'
                      : 'h-10 flex flex-col items-center justify-center'
                  }`}
                >
                  {isExpanded ? (
                    <>
                      <span className="text-xs font-bold text-white">
                        {def.name}
                        <span className="text-white/70 ml-1">({(def.defaultWeight * 100).toFixed(0)}%)</span>
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-white">
                          {score.toFixed(1)}
                        </span>
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8, x: 10 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          onClick={() => handleItemClick(`need-${category}`)}
                          className="w-6 h-6 flex items-center justify-center bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                          title="Close"
                        >
                          <X className="w-4 h-4" strokeWidth={3} />
                        </motion.button>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => handleItemClick(`need-${category}`)}
                      title={`${def.name} - Click to expand`}
                      className="w-full h-full flex flex-col items-center justify-center group hover:opacity-90"
                    >
                      <span className="text-[8px] font-bold text-white/90 leading-none group-hover:hidden">
                        {NEED_ABBREV[category]}
                      </span>
                      <span className="text-[7px] font-bold text-white/90 leading-none hidden group-hover:block">
                        Click
                      </span>
                      <span className="text-sm font-black text-white leading-none">
                        {score.toFixed(1)}
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
                      <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                        {def.description}
                      </p>

                      {/* Score bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 border border-black dark:border-gray-500 relative">
                          {/* Neutral marker at 50% */}
                          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-400 dark:bg-gray-500 z-10" />
                          <div
                            className={`h-full ${getScoreColor(score)}`}
                            style={{ width: `${score * 10}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold ${getScoreTextColor(score)}`}>
                          {score.toFixed(1)}/10
                        </span>
                      </div>

                      {/* Score interpretation */}
                      <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400">
                        <span>Harmful</span>
                        <span>Neutral (5)</span>
                        <span>Beneficial</span>
                      </div>

                      {/* Reasoning */}
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                        <p className="text-xs text-gray-700 dark:text-gray-300">
                          {methodologyNeed?.reasoning || catScore.reasoning}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Dimensions Section - Granular Bars */}
      <div>
        <div className="text-[10px] font-bold uppercase mb-2 text-indigo-700 dark:text-indigo-400">
          Scoring Dimensions
        </div>
        <div className="space-y-2">
          {DIMENSIONS.map(dimension => {
            const score = impactScore.dimensions[dimension];
            const def = DIMENSION_DEFINITIONS[dimension];
            const methodologyDim = methodology?.dimensions[dimension];
            const isExpanded = expandedItem === `dim-${dimension}`;

            return (
              <div key={dimension} className="relative">
                <button
                  onClick={() => handleItemClick(`dim-${dimension}`)}
                  className="w-full group"
                  title={`${def.name} - Click to expand`}
                >
                  {/* Label and score row */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                      {def.name}
                    </span>
                    <span className={`text-xs font-bold ${getScoreTextColor(score)}`}>
                      {score.toFixed(1)}
                    </span>
                  </div>

                  {/* Granular progress bar */}
                  <div className="relative h-3 bg-gray-200 dark:bg-gray-700 border border-black dark:border-gray-600 group-hover:border-indigo-500 transition-colors">
                    {/* Neutral marker at 50% */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 dark:bg-gray-500 z-10" />
                    {/* Score fill */}
                    <div
                      className={`h-full ${getScoreColor(score)} transition-all duration-300`}
                      style={{ width: `${score * 10}%` }}
                    />
                    {/* Tick marks at 0, 5, 10 */}
                    <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
                      <div className="w-0.5 h-1.5 bg-gray-400 dark:bg-gray-500" />
                      <div className="w-0.5 h-2 bg-gray-500 dark:bg-gray-400" />
                      <div className="w-0.5 h-1.5 bg-gray-400 dark:bg-gray-500" />
                    </div>
                  </div>

                  {/* Scale labels */}
                  <div className="flex justify-between text-[8px] text-gray-400 dark:text-gray-500 mt-0.5">
                    <span>0</span>
                    <span>5</span>
                    <span>10</span>
                  </div>
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(75,85,99,1)]"
                  >
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                          {def.name}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemClick(`dim-${dimension}`);
                          }}
                          className="w-5 h-5 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          title="Close"
                        >
                          <X className="w-3 h-3" strokeWidth={3} />
                        </button>
                      </div>

                      <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                        {def.keyQuestion}
                      </p>

                      {/* Scale anchors */}
                      <div className="flex justify-between text-[9px] text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-2 border border-gray-200 dark:border-gray-600">
                        <span className="max-w-[30%]"><strong>0:</strong> {def.scale[0]}</span>
                        <span><strong>5:</strong> {def.scale[5]}</span>
                        <span className="max-w-[30%] text-right"><strong>10:</strong> {def.scale[10]}</span>
                      </div>

                      {/* Methodology details */}
                      {methodologyDim && (
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                          <p className="text-xs text-gray-700 dark:text-gray-300">
                            {methodologyDim.reasoning}
                          </p>
                          {methodologyDim.keyPoints && methodologyDim.keyPoints.length > 0 && (
                            <ul className="mt-1 list-disc list-inside text-[10px] text-gray-600 dark:text-gray-400 space-y-0.5">
                              {methodologyDim.keyPoints.slice(0, 3).map((point, idx) => (
                                <li key={idx}>{point}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Top & Bottom Summary */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div>
          <h4 className="font-display font-bold text-xs text-[#501159] dark:text-[#B87FB3] mb-1">
            Highest Impact Needs
          </h4>
          <div className="space-y-0.5">
            {topNeeds.map(({ category, score }) => (
              <button
                key={category}
                onClick={() => handleItemClick(`need-${category}`)}
                className="w-full flex items-center justify-between text-xs hover:bg-gray-100 dark:hover:bg-gray-700 px-1 -mx-1 rounded transition-colors"
              >
                <span className="text-gray-600 dark:text-gray-400 truncate">
                  {NEED_CATEGORY_DEFINITIONS[category].name}
                </span>
                <span className={`font-bold ${getScoreTextColor(score)}`}>
                  {score.toFixed(1)}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold text-xs text-[#81467D] dark:text-[#B87FB3] mb-1">
            Lowest Impact Needs
          </h4>
          <div className="space-y-0.5">
            {bottomNeeds.map(({ category, score }) => (
              <button
                key={category}
                onClick={() => handleItemClick(`need-${category}`)}
                className="w-full flex items-center justify-between text-xs hover:bg-gray-100 dark:hover:bg-gray-700 px-1 -mx-1 rounded transition-colors"
              >
                <span className="text-gray-600 dark:text-gray-400 truncate">
                  {NEED_CATEGORY_DEFINITIONS[category].name}
                </span>
                <span className={`font-bold ${getScoreTextColor(score)}`}>
                  {score.toFixed(1)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Radar view with chart and summaries
function RadarView({
  impactScore,
  methodology,
}: {
  impactScore: V3ImpactScore;
  methodology?: V3PolicyMethodology;
}) {
  const overallScore = useMemo(() => calculateV3Score(impactScore), [impactScore]);

  // Sort needs by score
  const sortedNeeds = useMemo(() => {
    return NEED_CATEGORIES
      .filter(cat => impactScore.needCategories[cat])
      .map(cat => ({
        category: cat,
        score: impactScore.needCategories[cat]!.score,
      }))
      .sort((a, b) => b.score - a.score);
  }, [impactScore]);

  const topNeeds = sortedNeeds.slice(0, 3);
  const bottomNeeds = sortedNeeds.slice(-2).reverse();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Radar Chart */}
      <div className="h-[280px]">
        <NeedsRadarChart needScores={impactScore.needCategories} showWeights />
      </div>

      {/* Summaries */}
      <div className="space-y-4">
        {/* Overall Score */}
        <div className={`p-3 border-2 border-black dark:border-gray-600 ${getScoreBgClass(overallScore)}`}>
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-sm text-gray-700 dark:text-gray-300">
              Overall Needs Score
            </span>
            <span className={`font-display font-black text-2xl ${getScoreTextColor(overallScore)}`}>
              {overallScore.toFixed(1)}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {getScoreLabel(overallScore)}
          </p>
        </div>

        {/* Top Needs */}
        <div>
          <h4 className="font-display font-bold text-sm text-[#501159] dark:text-[#B87FB3] mb-2">
            Highest Impact
          </h4>
          <div className="space-y-1">
            {topNeeds.map(({ category, score }) => (
              <div key={category} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  {NEED_CATEGORY_DEFINITIONS[category].name}
                </span>
                <span className={`font-bold ${getScoreTextColor(score)}`}>
                  {score.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Needs */}
        <div>
          <h4 className="font-display font-bold text-sm text-[#81467D] dark:text-[#B87FB3] mb-2">
            Lowest Impact
          </h4>
          <div className="space-y-1">
            {bottomNeeds.map(({ category, score }) => (
              <div key={category} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  {NEED_CATEGORY_DEFINITIONS[category].name}
                </span>
                <span className={`font-bold ${getScoreTextColor(score)}`}>
                  {score.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Overall rationale if methodology exists */}
        {(methodology?.overallRationale || impactScore.rationale) && (
          <div className="p-3 bg-[#81467D]/10 border-2 border-[#81467D]/30 dark:border-[#81467D] text-xs text-gray-700 dark:text-gray-300">
            <strong>Summary:</strong> {methodology?.overallRationale || impactScore.rationale}
          </div>
        )}
      </div>
    </div>
  );
}

// Full methodology view
function FullView({
  policyId,
  impactScore,
  methodology,
  showMethodologyLink,
}: {
  policyId: string;
  impactScore: V3ImpactScore;
  methodology?: V3PolicyMethodology;
  showMethodologyLink?: boolean;
}) {
  const overallScore = useMemo(() => calculateV3Score(impactScore), [impactScore]);

  return (
    <div className="space-y-6">
      {/* Top section: Radar + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <div className="h-[320px]">
          <NeedsRadarChart needScores={impactScore.needCategories} showWeights />
        </div>

        {/* Overall rationale - neobrutalist */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex-1 p-4 bg-gradient-to-br from-purple-600 to-indigo-700 border-4 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-display font-black text-base text-white">
                Overall Assessment
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm">Score:</span>
                <span className="font-display font-black text-2xl text-white">
                  {overallScore.toFixed(1)}/10
                </span>
              </div>
            </div>
            <p className="text-sm text-white/90 font-medium">
              {methodology?.overallRationale || impactScore.rationale || 'No detailed rationale available.'}
            </p>
            <p className="text-xs text-white/70 mt-2 font-bold">
              {getScoreLabel(overallScore)}
            </p>
          </div>
        </div>
      </div>

      {/* Need Categories Grid */}
      <div>
        <h4 className="font-display font-bold text-sm mb-3 pb-2 border-b-2 text-purple-700 dark:text-purple-400 border-purple-700">
          Need Categories (Maslow-Inspired)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {NEED_CATEGORIES.map(category => {
            const catScore = impactScore.needCategories[category];
            if (!catScore) return null;

            const def = NEED_CATEGORY_DEFINITIONS[category];
            const methodologyNeed = methodology?.needCategories[category];
            const score = catScore.score;

            return (
              <div key={category} className="border-2 border-black dark:border-gray-600 p-3 bg-white dark:bg-gray-800">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-display font-black text-sm text-black dark:text-white">
                      {def.name}
                    </h5>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">
                      Weight: {(def.defaultWeight * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className={`text-xl font-display font-black ${getScoreTextColor(score)}`}>
                    {score.toFixed(1)}
                  </div>
                </div>

                {/* Score bar */}
                <div className="h-2 bg-gray-200 dark:bg-gray-600 border border-black dark:border-gray-500 mb-2 relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-400 z-10" />
                  <div
                    className={`h-full ${getScoreColor(score)} transition-all`}
                    style={{ width: `${score * 10}%` }}
                  />
                </div>

                {/* Description */}
                <p className="text-[10px] text-gray-500 dark:text-gray-400 italic mb-2">
                  {def.description}
                </p>

                {/* Reasoning */}
                <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-3">
                  {methodologyNeed?.reasoning || catScore.reasoning}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dimensions Grid */}
      <div>
        <h4 className="font-display font-bold text-sm mb-3 pb-2 border-b-2 text-indigo-700 dark:text-indigo-400 border-indigo-700">
          Scoring Dimensions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {DIMENSIONS.map(dimension => {
            const score = impactScore.dimensions[dimension];
            const def = DIMENSION_DEFINITIONS[dimension];
            const methodologyDim = methodology?.dimensions[dimension];

            return (
              <div key={dimension} className="border-2 border-black dark:border-gray-600 p-3 bg-white dark:bg-gray-800">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-display font-black text-sm text-black dark:text-white">
                    {def.name}
                  </h5>
                  <div className={`text-xl font-display font-black ${getScoreTextColor(score)}`}>
                    {score.toFixed(1)}
                  </div>
                </div>

                {/* Score bar */}
                <div className="h-2 bg-gray-200 dark:bg-gray-600 border border-black dark:border-gray-500 mb-2 relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-400 z-10" />
                  <div
                    className={`h-full ${getScoreColor(score)} transition-all`}
                    style={{ width: `${score * 10}%` }}
                  />
                </div>

                {/* Key question */}
                <p className="text-[10px] text-gray-500 dark:text-gray-400 italic mb-2">
                  {def.keyQuestion}
                </p>

                {/* Methodology details */}
                {methodologyDim && (
                  <>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-1 line-clamp-2">
                      {methodologyDim.reasoning}
                    </p>
                    {methodologyDim.keyPoints && methodologyDim.keyPoints.length > 0 && (
                      <ul className="list-disc list-inside text-[10px] text-gray-600 dark:text-gray-400 space-y-0.5">
                        {methodologyDim.keyPoints.slice(0, 2).map((point, idx) => (
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

      {showMethodologyLink && (
        <div className="text-center pt-2">
          <Link
            href={`/methodology#${policyId}`}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white font-display font-bold text-sm border-2 border-black dark:border-gray-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(75,85,99,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <span>View Full Methodology</span>
          </Link>
        </div>
      )}
    </div>
  );
}

// Collapsed preview - mini heatmap bar
function CollapsedPreview({ impactScore }: { impactScore: V3ImpactScore }) {
  return (
    <div className="flex space-x-0.5">
      {NEED_CATEGORIES.map(category => {
        const catScore = impactScore.needCategories[category];
        if (!catScore) return null;

        const def = NEED_CATEGORY_DEFINITIONS[category];
        return (
          <div
            key={category}
            className={`flex-1 h-3 ${getScoreColor(catScore.score)}`}
            title={`${def.name}: ${catScore.score.toFixed(1)}/10`}
          />
        );
      })}
      <div className="w-px bg-gray-400 dark:bg-gray-500" />
      {DIMENSIONS.map(dimension => {
        const score = impactScore.dimensions[dimension];
        const def = DIMENSION_DEFINITIONS[dimension];
        return (
          <div
            key={dimension}
            className={`flex-1 h-3 ${getScoreColor(score)}`}
            title={`${def.name}: ${score.toFixed(1)}/10`}
          />
        );
      })}
    </div>
  );
}

// Main component
export function V3ScoreDisplay({
  policyId,
  impactScore,
  className = '',
  defaultMode = 'table',
  defaultCollapsed = true,
  showMethodologyLink = true,
  onExpandedChange,
}: V3ScoreDisplayProps) {
  const [mode, setMode] = useState<DisplayMode>(defaultMode);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const methodology = getNeedsModelMethodology(policyId);
  const isFullExpanded = mode === 'full';
  const overallScore = useMemo(() => calculateV3Score(impactScore), [impactScore]);

  const handleModeChange = (newMode: DisplayMode) => {
    setMode(newMode);
    if (onExpandedChange) {
      onExpandedChange(newMode === 'full');
    }
  };

  const handleToggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    if (onExpandedChange) {
      if (newCollapsed) {
        onExpandedChange(false);
      } else if (isFullExpanded) {
        onExpandedChange(true);
      }
    }
  };

  return (
    <div className={`border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] ${className}`}>
      {/* Collapsible header */}
      <button
        onClick={handleToggleCollapse}
        className={`w-full flex items-center justify-between px-3 py-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20 transition-colors ${!isCollapsed ? 'border-b-4 border-black dark:border-gray-600' : ''}`}
      >
        <div className="flex items-center space-x-3">
          <span className="font-display font-black text-xs bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent">
            NEEDS LENS
          </span>
          <span className={`font-display font-bold text-sm ${getScoreTextColor(overallScore)}`}>
            {overallScore.toFixed(1)}/10
          </span>
          {/* Show mini preview when collapsed */}
          {isCollapsed && (
            <div className="hidden sm:block w-40">
              <CollapsedPreview impactScore={impactScore} />
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
              <TabButton
                active={mode === 'full'}
                onClick={() => handleModeChange('full')}
                icon={FileText}
                label="Full Analysis"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              {mode === 'table' && (
                <TableView impactScore={impactScore} methodology={methodology} />
              )}
              {mode === 'radar' && (
                <RadarView impactScore={impactScore} methodology={methodology} />
              )}
              {mode === 'full' && (
                <FullView
                  policyId={policyId}
                  impactScore={impactScore}
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

export default V3ScoreDisplay;
