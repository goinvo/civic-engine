'use client';

import { V4Archetype, V4_LENS_DEFINITIONS, V4Lens } from '@/data/v4Methodology';

interface V4ArchetypeCardProps {
  archetype: V4Archetype;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
}

export function V4ArchetypeCard({
  archetype,
  isSelected,
  onSelect,
  className = '',
}: V4ArchetypeCardProps) {
  // Get lens weights sorted by importance
  const lensWeights = Object.entries(archetype.weights.lensWeights)
    .map(([lens, weight]) => ({
      lens: lens as V4Lens,
      weight,
      info: V4_LENS_DEFINITIONS[lens as V4Lens],
    }))
    .sort((a, b) => b.weight - a.weight);

  return (
    <button
      onClick={onSelect}
      className={`
        w-full text-left p-6 border-4 transition-all
        ${
          isSelected
            ? 'border-black dark:border-white bg-gradient-to-r from-[#2F3BBD] via-[#7B2D8E] to-[#C91A2B] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]'
            : 'border-black dark:border-gray-600 bg-white dark:bg-gray-800 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]'
        }
        ${className}
      `}
    >
      <h3 className={`font-display text-xl font-black mb-2 ${isSelected ? 'text-white' : 'text-black dark:text-white'}`}>
        {archetype.name}
      </h3>
      <p className={`font-body text-sm font-medium mb-4 ${isSelected ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'}`}>
        {archetype.shortDescription}
      </p>

      {/* Lens weights preview */}
      <div className="space-y-2">
        {lensWeights.map(({ lens, weight, info }) => {
          const percentage = Math.round(weight * 100);
          return (
            <div
              key={lens}
              className={`flex items-center gap-3 ${
                isSelected ? 'text-white' : 'text-black dark:text-white'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full`}
                style={{ backgroundColor: info.color }}
              />
              <span className="font-display text-xs font-bold flex-1">
                {info.name}
              </span>
              <div className="flex-1 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${info.gradient}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className={`font-display text-sm font-black w-10 text-right ${
                isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300'
              }`}>
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </button>
  );
}

export default V4ArchetypeCard;
