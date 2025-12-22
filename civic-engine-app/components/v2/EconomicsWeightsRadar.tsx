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
import { V2WeightProfile, V2Factor } from '@/types/consensus';
import { V2_FACTOR_INFO, V2_FACTORS } from '@/data/archetypesV2';

interface EconomicsWeightsRadarProps {
  weights: V2WeightProfile;
  className?: string;
}

// Short labels for radar chart (use thinker names)
const FACTOR_LABELS: Record<V2Factor, string> = {
  hayek: 'Hayek',
  ostrom: 'Ostrom',
  downs: 'Downs',
  olson: 'Olson',
  keynes: 'Keynes',
  pettit: 'Pettit',
  hirschman: 'Hirsch',
  buchanan: 'Buchan',
  polanyi: 'Polanyi',
  rawls: 'Rawls',
  george: 'George',
  acemoglu: 'Acemog',
  walzer: 'Walzer',
};

export function EconomicsWeightsRadar({
  weights,
  className = '',
}: EconomicsWeightsRadarProps) {
  const data = useMemo(() => {
    return V2_FACTORS.map((factor) => {
      const info = V2_FACTOR_INFO[factor];
      const weight = weights[factor] ?? 0.077; // Default equal distribution
      return {
        factor: FACTOR_LABELS[factor],
        fullName: info.name,
        thinker: info.thinker,
        weight,
        // Normalize weight to 0-100 for radar display
        // Since 13 factors, max reasonable weight is ~30%
        normalizedWeight: weight * 100,
      };
    });
  }, [weights]);

  return (
    <div className={`w-full h-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid
            stroke="currentColor"
            className="text-gray-300 dark:text-gray-600"
          />
          <PolarAngleAxis
            dataKey="factor"
            tick={{
              fill: 'currentColor',
              fontSize: 9,
              fontWeight: 600,
            }}
            className="text-gray-700 dark:text-gray-300"
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 30]}
            tick={{
              fill: 'currentColor',
              fontSize: 8,
            }}
            tickCount={4}
            tickFormatter={(value) => `${value}%`}
            className="text-gray-500 dark:text-gray-400"
          />
          {/* Equal distribution line (~7.7% each) */}
          <Radar
            name="Equal"
            dataKey={() => 7.7}
            stroke="#9CA3AF"
            fill="none"
            strokeDasharray="4 4"
            strokeWidth={1}
          />
          {/* User weights */}
          <Radar
            name="Your Weights"
            dataKey="normalizedWeight"
            stroke="#2F3BBD"
            fill="#2F3BBD"
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
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ({item.thinker})
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
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

export default EconomicsWeightsRadar;
