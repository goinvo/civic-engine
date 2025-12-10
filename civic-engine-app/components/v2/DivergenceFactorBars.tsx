'use client';

import { DivergenceDriver, V2Factor } from '@/types/consensus';
import { V2_FACTOR_INFO } from '@/data/archetypesV2';

interface DivergenceFactorBarsProps {
  drivers: DivergenceDriver[];
  className?: string;
}

export function DivergenceFactorBars({
  drivers,
  className = '',
}: DivergenceFactorBarsProps) {
  if (!drivers.length) return null;

  // Find max variance for scaling
  const maxVariance = Math.max(...drivers.map((d) => d.variance));

  return (
    <div className={`space-y-3 ${className}`}>
      <h4 className="text-sm font-semibold text-gray-700">Divergence Drivers</h4>
      {drivers.map((driver) => {
        const info = V2_FACTOR_INFO[driver.factor];
        const widthPercent = maxVariance > 0 ? (driver.variance / maxVariance) * 100 : 0;

        return (
          <div key={driver.factor} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-gray-900">
                {info.name}
                <span className="text-gray-500 ml-1">({info.thinker})</span>
              </span>
              <span className="text-gray-500">
                {driver.variance.toFixed(1)} variance
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 border border-gray-300">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-red-500"
                style={{ width: `${widthPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 italic">{driver.narrative}</p>
          </div>
        );
      })}
    </div>
  );
}
