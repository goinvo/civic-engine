'use client';

import { BookOpen, Scale, Users, TrendingUp, Sparkles, Heart } from 'lucide-react';
import { NEED_CATEGORY_DEFINITIONS, DIMENSION_DEFINITIONS } from '@/data/v3Methodology';
import { NEED_CATEGORY_ORDER, V3_NEED_INFO } from '@/data/archetypesV3';

export function V3MethodologySection() {
  return (
    <div className="mb-12">
      <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
        Needs Lens Methodology
      </h2>

      {/* Overview */}
      <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6 mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-14 h-14 bg-[#501159] border-4 border-black dark:border-gray-600 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-display text-xl font-black text-black dark:text-white mb-2">
              Maslow-Inspired Framework
            </h3>
            <p className="font-body text-gray-700 dark:text-gray-300 font-medium">
              The Needs Lens evaluates policies based on how they affect human needs across five categories
              inspired by Maslow&apos;s hierarchy, plus four practical scoring dimensions.
            </p>
          </div>
        </div>

        <div className="bg-[#501159]/10 dark:bg-[#501159]/30 border-4 border-[#501159] p-4 mt-4">
          <p className="font-display text-sm font-black text-[#501159] dark:text-[#B87FB3]">
            SCALE: 0-10 where 5 = neutral (no effect)
          </p>
          <div className="flex gap-4 mt-2 font-body font-medium text-sm">
            <span className="text-red-700 dark:text-red-400">0-4: Harmful</span>
            <span className="text-gray-600 dark:text-gray-400">5: Neutral</span>
            <span className="text-green-700 dark:text-green-400">6-10: Beneficial</span>
          </div>
        </div>
      </div>

      {/* Need Categories */}
      <div className="mb-8">
        <h3 className="font-display text-2xl font-black text-black dark:text-white mb-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#501159] border-4 border-black flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          Need Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {NEED_CATEGORY_ORDER.map((category, index) => {
            const def = NEED_CATEGORY_DEFINITIONS[category];
            const info = V3_NEED_INFO[category];
            const isFirst = index === 0;

            return (
              <div
                key={category}
                className={`border-4 border-black dark:border-gray-600 p-5 ${
                  isFirst
                    ? 'bg-[#501159] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{info.icon}</span>
                  <h4 className={`font-display text-lg font-black ${isFirst ? 'text-white' : 'text-black dark:text-white'}`}>
                    {def.name}
                  </h4>
                  <span className={`ml-auto font-display text-lg font-black ${isFirst ? 'text-white/80' : 'text-[#501159] dark:text-[#B87FB3]'}`}>
                    {Math.round(def.defaultWeight * 100)}%
                  </span>
                </div>
                <p className={`font-body text-sm font-medium mb-3 ${isFirst ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                  {def.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {def.examples.slice(0, 3).map((example, idx) => (
                    <span
                      key={idx}
                      className={`font-body text-xs font-medium px-2 py-1 border-2 ${
                        isFirst
                          ? 'border-white/30 bg-white/10 text-white'
                          : 'border-black dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scoring Dimensions */}
      <div className="mb-8">
        <h3 className="font-display text-2xl font-black text-black dark:text-white mb-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#7B2D8E] border-4 border-black flex items-center justify-center">
            <Scale className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          Scoring Dimensions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Object.entries(DIMENSION_DEFINITIONS) as [keyof typeof DIMENSION_DEFINITIONS, typeof DIMENSION_DEFINITIONS[keyof typeof DIMENSION_DEFINITIONS]][]).map(([key, dim], index) => {
            const icons: Record<string, React.ReactNode> = {
              populationAffected: <Users className="w-5 h-5 text-white" strokeWidth={2.5} />,
              essentialToSurvival: <Heart className="w-5 h-5 text-white" strokeWidth={2.5} />,
              timeToOutcome: <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />,
              feasibility: <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />,
            };
            const bgColors = ['bg-[#501159]', 'bg-[#7B2D8E]', 'bg-[#501159]', 'bg-[#7B2D8E]'];

            return (
              <div
                key={key}
                className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${bgColors[index]} border-2 border-black flex items-center justify-center`}>
                    {icons[key]}
                  </div>
                  <h4 className="font-display text-lg font-black text-black dark:text-white">
                    {dim.name}
                  </h4>
                </div>
                <p className="font-body text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                  {dim.keyQuestion}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="border-2 border-red-600 bg-red-50 dark:bg-red-900/20 p-2">
                    <span className="font-display text-sm font-black text-red-700 dark:text-red-400 block">0</span>
                    <span className="font-body text-xs font-medium text-red-600 dark:text-red-300">{dim.scale[0]}</span>
                  </div>
                  <div className="border-2 border-gray-400 bg-gray-50 dark:bg-gray-700 p-2">
                    <span className="font-display text-sm font-black text-gray-700 dark:text-gray-300 block">5</span>
                    <span className="font-body text-xs font-medium text-gray-600 dark:text-gray-400">{dim.scale[5]}</span>
                  </div>
                  <div className="border-2 border-green-600 bg-green-50 dark:bg-green-900/20 p-2">
                    <span className="font-display text-sm font-black text-green-700 dark:text-green-400 block">10</span>
                    <span className="font-body text-xs font-medium text-green-600 dark:text-green-300">{dim.scale[10]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scoring Formula */}
      <div className="border-4 border-black dark:border-gray-600 bg-gradient-to-r from-[#501159] to-[#7B2D8E] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
        <h3 className="font-display text-2xl font-black text-white mb-4">
          How Scores Are Calculated
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="font-display text-xl font-black text-white/80">1.</span>
            <p className="font-body font-medium text-white/90">
              <span className="font-display font-black text-white">Need-Weighted Score:</span> Each need category score is multiplied by its weight, then summed to get a weighted average.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-display text-xl font-black text-white/80">2.</span>
            <p className="font-body font-medium text-white/90">
              <span className="font-display font-black text-white">Dimension Score:</span> The four dimensions are averaged.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-display text-xl font-black text-white/80">3.</span>
            <p className="font-body font-medium text-white/90">
              <span className="font-display font-black text-white">Final Score:</span> 50% need-weighted + 50% dimension average = Overall Score (0-10)
            </p>
          </div>
        </div>
        <div className="mt-5 bg-black/20 border-4 border-white/20 p-4">
          <p className="font-mono text-sm text-white font-bold">
            Score = (Need_Weighted × 0.5) + (Dimension_Avg × 0.5)
          </p>
        </div>
      </div>
    </div>
  );
}
