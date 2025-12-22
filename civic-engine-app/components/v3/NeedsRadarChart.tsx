'use client';

import { useMemo } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { NeedCategory, NEED_CATEGORY_DEFINITIONS, NeedCategoryScore } from '@/data/v3Methodology';

interface NeedsRadarChartProps {
  needScores: Partial<Record<NeedCategory, NeedCategoryScore>>;
  showWeights?: boolean;
  className?: string;
}

// Need category order for consistent display
const NEED_CATEGORIES: NeedCategory[] = [
  'physiological',
  'safety',
  'community',
  'opportunity',
  'selfActualization',
];

// Short labels for radar chart
const NEED_LABELS: Record<NeedCategory, string> = {
  physiological: 'Physio',
  safety: 'Safety',
  community: 'Community',
  opportunity: 'Opportunity',
  selfActualization: 'Self-Act',
};

export function NeedsRadarChart({
  needScores,
  showWeights = false,
  className = '',
}: NeedsRadarChartProps) {
  const data = useMemo(() => {
    return NEED_CATEGORIES.map((category) => {
      const def = NEED_CATEGORY_DEFINITIONS[category];
      const score = needScores[category]?.score ?? 5; // Default to neutral if not provided
      return {
        category: NEED_LABELS[category],
        fullName: def.name,
        score,
        weight: def.defaultWeight,
        // Normalize score to 0-100 for radar display (0-10 scale to percentage)
        normalizedScore: score * 10,
      };
    });
  }, [needScores]);

  return (
    <div className={`w-full h-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="80%">
          <PolarGrid
            stroke="currentColor"
            className="text-gray-300 dark:text-gray-600"
          />
          <PolarAngleAxis
            dataKey="category"
            tick={{
              fill: 'currentColor',
              fontSize: 11,
              fontWeight: 600,
            }}
            className="text-gray-700 dark:text-gray-300"
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{
              fill: 'currentColor',
              fontSize: 9,
            }}
            tickCount={6}
            className="text-gray-500 dark:text-gray-400"
          />
          {/* Neutral line at 50 (score of 5) */}
          <Radar
            name="Neutral"
            dataKey={() => 50}
            stroke="#9CA3AF"
            fill="none"
            strokeDasharray="4 4"
            strokeWidth={1}
          />
          {/* Actual scores */}
          <Radar
            name="Score"
            dataKey="normalizedScore"
            stroke="#7C3AED"
            fill="#7C3AED"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-bold text-sm text-gray-900 dark:text-white">
                      {item.fullName}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Score: <span className="font-bold">{item.score.toFixed(1)}</span>/10
                    </p>
                    {showWeights && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Weight: {(item.weight * 100).toFixed(0)}%
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default NeedsRadarChart;
