import { TrendingUp } from 'lucide-react';
import { VALUE_FACTORS } from '@/data/values';
import { V2_FACTOR_INFO } from '@/data/archetypesV2';

interface TopValuesSectionProps {
  rankedFactors: [string, number][];
  isV2: boolean;
}

export function TopValuesSection({ rankedFactors, isV2 }: TopValuesSectionProps) {
  return (
    <div className="mb-12">
      <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
        What Matters Most to You
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rankedFactors.map(([factorKey, weight], index) => {
          const factor = isV2
            ? V2_FACTOR_INFO[factorKey as keyof typeof V2_FACTOR_INFO]
            : VALUE_FACTORS.find((f) => f.id === factorKey);
          if (!factor) return null;

          const percentage = Math.round(weight * 100);
          const colors = [
            'bg-[#C91A2B] border-black',
            'bg-[#2F3BBD] border-black',
            'bg-white dark:bg-gray-800 border-black dark:border-gray-600',
          ];

          return (
            <div
              key={factorKey}
              className={`border-4 ${colors[index]} p-6`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp
                    className={`w-5 h-5 ${index < 2 ? 'text-white' : 'text-black dark:text-white'}`}
                    strokeWidth={2.5}
                  />
                  <span className={`font-display text-sm font-black ${index < 2 ? 'text-white' : 'text-black dark:text-white'}`}>
                    #{index + 1}
                  </span>
                </div>
                <div className={`text-3xl font-display font-black ${index < 2 ? 'text-white' : 'text-black dark:text-white'}`}>
                  {percentage}%
                </div>
              </div>
              <h3 className={`font-display text-xl font-black mb-2 ${index < 2 ? 'text-white' : 'text-black dark:text-white'}`}>
                {factor.name}
                {isV2 && 'thinker' in factor && (
                  <span className="font-normal text-sm ml-2 opacity-80">({(factor as { thinker: string }).thinker})</span>
                )}
              </h3>
              <p className={`font-body text-sm font-medium ${index < 2 ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'}`}>
                {factor.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
