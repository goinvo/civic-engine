'use client';

import { motion } from 'framer-motion';
import { ARCHETYPES } from '@/data/values';
import { ArchetypeId } from '@/types/values';
import { useValues } from '@/contexts/ValuesContext';
import { Check } from 'lucide-react';

export default function ArchetypeSelector({ onComplete }: { onComplete?: () => void }) {
  const { profile, setArchetype } = useValues();

  const handleSelect = (archetypeId: ArchetypeId) => {
    setArchetype(archetypeId);
    onComplete?.();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl sm:text-5xl font-black text-black dark:text-white mb-4">
          Choose Your Values Profile
        </h2>
        <p className="font-body text-xl text-gray-700 dark:text-gray-300 font-medium max-w-3xl mx-auto">
          Select a profile that best matches how you think about policy, or take the questionnaire for a personalized profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {ARCHETYPES.filter((a) => a.id !== 'balanced').map((archetype) => {
          const isSelected = profile?.archetypeId === archetype.id;
          return (
            <motion.button
              key={archetype.id}
              onClick={() => handleSelect(archetype.id)}
              className={`relative text-left p-6 border-4 transition-all ${
                isSelected
                  ? 'bg-[#2F3BBD] text-white border-black dark:border-gray-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]'
                  : 'bg-white dark:bg-gray-800 text-black dark:text-white border-black dark:border-gray-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#2F3BBD]" strokeWidth={3} />
                  </div>
                </div>
              )}

              <h3 className="font-display font-black text-2xl mb-2">{archetype.name}</h3>
              <p className={`font-body text-sm mb-4 ${isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                {archetype.shortDescription}
              </p>
              <p className={`font-body text-sm ${isSelected ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'}`}>
                {archetype.description}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Balanced Option */}
      <div className="max-w-2xl mx-auto">
        <motion.button
          onClick={() => handleSelect('balanced')}
          className={`w-full text-left p-6 border-4 transition-all ${
            profile?.archetypeId === 'balanced'
              ? 'bg-[#2F3BBD] text-white border-black dark:border-gray-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]'
              : 'bg-white dark:bg-gray-800 text-black dark:text-white border-black dark:border-gray-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]'
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display font-black text-2xl mb-2">
                {ARCHETYPES.find((a) => a.id === 'balanced')?.name}
              </h3>
              <p
                className={`font-body text-sm mb-2 ${
                  profile?.archetypeId === 'balanced' ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {ARCHETYPES.find((a) => a.id === 'balanced')?.shortDescription}
              </p>
              <p
                className={`font-body text-sm ${
                  profile?.archetypeId === 'balanced' ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {ARCHETYPES.find((a) => a.id === 'balanced')?.description}
              </p>
            </div>
            {profile?.archetypeId === 'balanced' && (
              <div className="w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-[#2F3BBD]" strokeWidth={3} />
              </div>
            )}
          </div>
        </motion.button>
      </div>
    </div>
  );
}
