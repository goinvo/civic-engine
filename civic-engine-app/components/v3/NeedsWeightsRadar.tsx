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
import { V3NeedWeights } from '@/types/values';
import { V3_NEED_INFO, NEED_CATEGORY_ORDER } from '@/data/archetypesV3';
import { NeedCategory } from '@/data/v3Methodology';

interface NeedsWeightsRadarProps {
  weights: V3NeedWeights;
  className?: string;
}

// Short labels for radar chart
const NEED_LABELS: Record<NeedCategory, string> = {
  physiological: 'Physio',
  safety: 'Safety',
  community: 'Community',
  opportunity: 'Opportunity',
  selfActualization: 'Self-Act',
};

export function NeedsWeightsRadar({
  weights,
  className = '',
}: NeedsWeightsRadarProps) {
  const data = useMemo(() => {
    return NEED_CATEGORY_ORDER.map((category) => {
      const info = V3_NEED_INFO[category];
      const weight = weights[category] ?? 0.2; // Default to 20% if missing
      return {
        category: NEED_LABELS[category],
        fullName: info.name,
        weight,
        // Normalize weight to 0-100 for radar display
        normalizedWeight: weight * 100,
      };
    });
  }, [weights]);

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
            domain={[0, 50]}
            tick={{
              fill: 'currentColor',
              fontSize: 9,
            }}
            tickCount={6}
            tickFormatter={(value) => `${value}%`}
            className="text-gray-500 dark:text-gray-400"
          />
          {/* Equal distribution line (20% each) */}
          <Radar
            name="Equal"
            dataKey={() => 20}
            stroke="#9CA3AF"
            fill="none"
            strokeDasharray="4 4"
            strokeWidth={1}
          />
          {/* User weights */}
          <Radar
            name="Your Weights"
            dataKey="normalizedWeight"
            stroke="#7B2D8E"
            fill="#7B2D8E"
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
                      Weight: <span className="font-bold">{(item.weight * 100).toFixed(1)}%</span>
                    </p>
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

export default NeedsWeightsRadar;
