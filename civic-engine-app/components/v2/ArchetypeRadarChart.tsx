'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { V2FactorScores, V2WeightProfile, V2Factor } from '@/types/consensus';
import { V2_FACTOR_INFO, V2_FACTORS } from '@/data/archetypesV2';

interface ArchetypeRadarChartProps {
  factorScores: V2FactorScores;
  weights?: V2WeightProfile | null;
  showWeights?: boolean;
  className?: string;
}

export function ArchetypeRadarChart({
  factorScores,
  weights,
  showWeights = true,
  className = '',
}: ArchetypeRadarChartProps) {
  // Prepare data for radar chart
  const data = V2_FACTORS.map((factor) => {
    const info = V2_FACTOR_INFO[factor];
    return {
      factor: info.name,
      fullName: `${info.name} (${info.thinker})`,
      score: Math.round(factorScores[factor] * 100),
      weight: weights ? Math.round(weights[factor] * 100) : 0,
    };
  });

  return (
    <div className={`w-full h-[400px] ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#ccc" />
          <PolarAngleAxis
            dataKey="factor"
            tick={{ fill: '#333', fontSize: 11 }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#666', fontSize: 10 }}
            tickCount={5}
          />
          {/* Policy Factor Scores */}
          <Radar
            name="Policy Score"
            dataKey="score"
            stroke="#2F3BBD"
            fill="#2F3BBD"
            fillOpacity={0.4}
            strokeWidth={2}
          />
          {/* User Weight Profile (optional) */}
          {showWeights && weights && (
            <Radar
              name="Your Priorities"
              dataKey="weight"
              stroke="#C91A2B"
              fill="#C91A2B"
              fillOpacity={0.2}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          )}
          <Tooltip
            content={({ payload, label }) => {
              if (!payload?.length) return null;
              const item = payload[0]?.payload;
              return (
                <div className="bg-white border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <p className="font-semibold text-sm">{item?.fullName}</p>
                  {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                      {entry.name}: {entry.value}%
                    </p>
                  ))}
                </div>
              );
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
