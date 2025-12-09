'use client';

import { V3Archetype, NEED_CATEGORY_ORDER, V3_NEED_INFO } from '@/data/archetypesV3';

interface V3ArchetypeCardProps {
  archetype: V3Archetype;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
}

export function V3ArchetypeCard({
  archetype,
  isSelected,
  onSelect,
  className = '',
}: V3ArchetypeCardProps) {
  // Get top 2 weighted needs for this archetype
  const topNeeds = NEED_CATEGORY_ORDER
    .map((cat) => ({ category: cat, weight: archetype.weights[cat] }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 2);

  return (
    <button
      onClick={onSelect}
      className={`
        w-full text-left p-6 border-4 transition-all
        ${
          isSelected
            ? 'border-black dark:border-white bg-gradient-to-r from-[#501159] to-[#7B2D8E] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]'
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

      {/* Top needs preview */}
      <div className="flex gap-3">
        {topNeeds.map(({ category, weight }) => {
          const needInfo = V3_NEED_INFO[category];
          return (
            <div
              key={category}
              className={`flex items-center gap-2 px-3 py-2 border-2 ${
                isSelected
                  ? 'border-white/30 bg-white/10'
                  : 'border-black dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
              }`}
            >
              <span className="text-lg">{needInfo.icon}</span>
              <div className="flex flex-col">
                <span className={`font-display text-xs font-black ${isSelected ? 'text-white' : 'text-black dark:text-white'}`}>
                  {needInfo.name}
                </span>
                <span className={`font-display text-sm font-black ${isSelected ? 'text-white/80' : 'text-[#501159] dark:text-[#B87FB3]'}`}>
                  {Math.round(weight * 100)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {archetype.philosopher && (
        <div className={`mt-4 pt-4 border-t-2 ${isSelected ? 'border-white/20' : 'border-black dark:border-gray-600'}`}>
          <p className={`font-display text-xs font-black ${isSelected ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
            {archetype.philosophyName}
            <span className="mx-2">•</span>
            <span className="font-body font-medium">{archetype.philosopher}</span>
          </p>
          {archetype.philosophyDescription && (
            <p className={`font-body text-xs font-medium mt-1 ${isSelected ? 'text-white/60' : 'text-gray-500 dark:text-gray-500'}`}>
              {archetype.philosophyDescription}
            </p>
          )}
        </div>
      )}
    </button>
  );
}

export default V3ArchetypeCard;
