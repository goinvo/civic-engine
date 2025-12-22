'use client';

import { ConsensusState } from '@/types/consensus';
import { CONSENSUS_STATE_INFO } from '@/data/archetypesV2';

interface ConsensusBadgeProps {
  state: ConsensusState;
  showTooltip?: boolean;
  className?: string;
}

export function ConsensusBadge({
  state,
  showTooltip = true,
  className = '',
}: ConsensusBadgeProps) {
  const info = CONSENSUS_STATE_INFO[state];

  const colorClasses = {
    green: 'bg-green-100 text-green-800 border-green-600',
    gradient: 'bg-gradient-to-r from-blue-100 to-red-100 text-purple-800 border-purple-600',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-600',
    red: 'bg-red-100 text-red-800 border-red-600',
    gray: 'bg-gray-100 text-gray-800 border-gray-600',
  };

  const colorClass = colorClasses[info.color as keyof typeof colorClasses] || colorClasses.gray;

  return (
    <div className="relative inline-block group">
      <span
        className={`inline-flex items-center px-2 py-0.5 text-xs font-medium border ${colorClass} ${className}`}
      >
        {info.label}
      </span>
      {showTooltip && (
        <div className="absolute z-10 invisible group-hover:visible bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48">
          <div className="bg-black text-white text-xs p-2 rounded shadow-lg">
            {info.description}
          </div>
          <div className="w-3 h-3 bg-black transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1.5"></div>
        </div>
      )}
    </div>
  );
}
