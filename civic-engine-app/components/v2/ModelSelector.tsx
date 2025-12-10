'use client';

import { useValues } from '@/contexts/ValuesContext';
import { ScoringModelVersion } from '@/types/values';

interface ModelSelectorProps {
  className?: string;
}

export function ModelSelector({ className = '' }: ModelSelectorProps) {
  const { profile, setScoringModel } = useValues();

  const currentModel = profile?.scoringModel || 'v1';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setScoringModel(e.target.value as ScoringModelVersion);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor="scoring-lens" className="text-sm font-medium text-gray-700">
        Scoring Lens:
      </label>
      <select
        id="scoring-lens"
        value={currentModel}
        onChange={handleChange}
        className="border-2 border-black px-3 py-1.5 text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <option value="v1">Impact Lens</option>
        <option value="v2">Economics Lens</option>
        <option value="v3">Needs Lens</option>
        <option value="v4">Combined Lens</option>
      </select>
    </div>
  );
}
