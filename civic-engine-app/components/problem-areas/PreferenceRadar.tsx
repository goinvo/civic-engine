'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { PREFERENCE_DIMENSIONS } from '@/types/problem-areas';
import type { UserPreferenceProfile, PreferenceDimensionId } from '@/types/problem-areas';
import { approachScoresMap } from '@/data/problem-areas/dimension-scores';

interface RadarDataPoint {
  dimension: string;
  fullName: string;
  lowLabel: string;
  highLabel: string;
  [key: string]: string | number;
}

interface PreferenceRadarProps {
  /** User's preference profile (optional - shows user radar) */
  userProfile?: UserPreferenceProfile | null;
  /** Focused approach ID (shows as primary radar) */
  focusedApproachId?: string;
  /** Comparison approach IDs (show as secondary radars) */
  comparisonApproachIds?: string[];
  /** Approach titles for legend */
  approachTitles?: Record<string, string>;
  /** Height of the chart */
  height?: number;
  /** Primary color for focused approach */
  primaryColor?: string;
  /** Class name for container */
  className?: string;
}

// Colors for different layers
const COLORS = {
  user: '#3B82F6', // blue for user profile
  focused: '#8B5CF6', // purple for focused approach
  comparisons: [
    '#6366F1', // indigo
    '#EC4899', // pink
    '#F59E0B', // amber
    '#10B981', // green
  ],
};

export function PreferenceRadar({
  userProfile,
  focusedApproachId,
  comparisonApproachIds = [],
  approachTitles = {},
  height = 350,
  primaryColor = '#3B82F6',
  className = '',
}: PreferenceRadarProps) {
  // Build data array for radar
  const data: RadarDataPoint[] = PREFERENCE_DIMENSIONS.map((dim) => {
    const point: RadarDataPoint = {
      dimension: dim.label,
      fullName: dim.title,
      lowLabel: dim.lowLabel,
      highLabel: dim.highLabel,
    };

    // Add user profile scores if available
    if (userProfile) {
      point.user = userProfile.dimensions[dim.id as PreferenceDimensionId];
    }

    // Add focused approach scores
    if (focusedApproachId) {
      const focusedScores = approachScoresMap.get(focusedApproachId);
      if (focusedScores) {
        point.focused = focusedScores[dim.id as PreferenceDimensionId];
      }
    }

    // Add comparison approach scores
    comparisonApproachIds.forEach((approachId, index) => {
      const scores = approachScoresMap.get(approachId);
      if (scores) {
        point[`comp${index}`] = scores[dim.id as PreferenceDimensionId];
      }
    });

    return point;
  });

  // Build legend items
  const legendItems: { name: string; color: string }[] = [];
  if (userProfile) {
    legendItems.push({ name: 'Your Profile', color: COLORS.user });
  }
  if (focusedApproachId) {
    legendItems.push({
      name: approachTitles[focusedApproachId] || 'Focused',
      color: primaryColor,
    });
  }
  comparisonApproachIds.forEach((id, i) => {
    legendItems.push({
      name: approachTitles[id] || `Option ${i + 1}`,
      color: COLORS.comparisons[i % COLORS.comparisons.length],
    });
  });

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
          <PolarGrid stroke="#ccc" strokeWidth={1} />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: '#333', fontSize: 11, fontWeight: 500 }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#666', fontSize: 9 }}
            tickCount={5}
            axisLine={false}
          />

          {/* User profile radar */}
          {userProfile && (
            <Radar
              name="Your Profile"
              dataKey="user"
              stroke={COLORS.user}
              fill={COLORS.user}
              fillOpacity={0.15}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          )}

          {/* Focused approach radar */}
          {focusedApproachId && (
            <Radar
              name={approachTitles[focusedApproachId] || 'Focused'}
              dataKey="focused"
              stroke={primaryColor}
              fill={primaryColor}
              fillOpacity={0.35}
              strokeWidth={3}
            />
          )}

          {/* Comparison approach radars */}
          {comparisonApproachIds.map((id, index) => (
            <Radar
              key={id}
              name={approachTitles[id] || `Option ${index + 1}`}
              dataKey={`comp${index}`}
              stroke={COLORS.comparisons[index % COLORS.comparisons.length]}
              fill={COLORS.comparisons[index % COLORS.comparisons.length]}
              fillOpacity={0.1}
              strokeWidth={1.5}
            />
          ))}

          <Tooltip
            content={({ payload, label }) => {
              if (!payload?.length) return null;
              const item = payload[0]?.payload as RadarDataPoint;
              return (
                <div className="bg-white border-2 border-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] max-w-xs">
                  <p className="font-bold text-sm mb-1">{item?.fullName}</p>
                  <p className="text-xs text-gray-500 mb-2">
                    {item?.lowLabel} ← → {item?.highLabel}
                  </p>
                  {payload.map((entry: { name?: string; value?: number; color?: string }, i: number) => (
                    <p key={i} className="text-sm" style={{ color: entry.color }}>
                      {entry.name}: <span className="font-semibold">{entry.value}</span>
                    </p>
                  ))}
                </div>
              );
            }}
          />

          {legendItems.length > 1 && (
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 11 }}
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Simple mini radar for compact display (no labels, smaller)
 */
interface MiniRadarProps {
  approachId: string;
  size?: number;
  color?: string;
  className?: string;
}

export function MiniRadar({ approachId, size = 80, color = '#3B82F6', className = '' }: MiniRadarProps) {
  const scores = approachScoresMap.get(approachId);
  if (!scores) return null;

  const data = PREFERENCE_DIMENSIONS.map((dim) => ({
    dimension: dim.label,
    value: scores[dim.id as PreferenceDimensionId],
  }));

  return (
    <div className={className} style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#ddd" strokeWidth={0.5} />
          <Radar
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.4}
            strokeWidth={1.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
