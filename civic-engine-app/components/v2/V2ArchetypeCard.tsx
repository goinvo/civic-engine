'use client';

import { V2Archetype } from '@/types/consensus';

interface V2ArchetypeCardProps {
  archetype: V2Archetype;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
}

export function V2ArchetypeCard({
  archetype,
  isSelected,
  onSelect,
  className = '',
}: V2ArchetypeCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full text-left p-4 border-2 transition-all
        ${
          isSelected
            ? 'border-black bg-gradient-to-r from-blue-50 to-red-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
            : 'border-gray-300 bg-white hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
        }
        ${className}
      `}
    >
      <h3 className="font-bold text-lg text-gray-900">{archetype.name}</h3>
      <p className="text-sm text-gray-600 mt-1">{archetype.description}</p>
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          <span className="font-semibold">{archetype.philosophyName}</span>
          <span className="mx-1">•</span>
          {archetype.philosopher}
        </p>
        <p className="text-xs text-gray-400 mt-1 italic">
          {archetype.philosophyDescription}
        </p>
      </div>
    </button>
  );
}
