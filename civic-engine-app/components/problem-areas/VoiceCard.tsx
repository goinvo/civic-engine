'use client';

import { useState } from 'react';
import { ChevronUp, Quote } from 'lucide-react';
import type { Voice } from '@/types/problem-areas';

interface VoiceCardProps {
  voice: Voice;
  compact?: boolean;
}

/**
 * Single voice card - neobrutalist style
 */
export function VoiceCard({ voice, compact = false }: VoiceCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-900 border-2 border-black dark:border-gray-600 p-4 ${compact ? '' : 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`}>
      <p className="font-bold text-sm text-black dark:text-white mb-2">
        {voice.persona}
      </p>
      <blockquote className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        "{voice.argument}"
      </blockquote>
    </div>
  );
}

interface VoicesListProps {
  voices_support: Voice[];
  voices_opposition: Voice[];
  defaultExpanded?: boolean;
}

/**
 * 2x3 grid of voices with tabbed supporters/critics - neobrutalist style
 */
export function VoicesList({
  voices_support,
  voices_opposition,
  defaultExpanded = false,
}: VoicesListProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [activeTab, setActiveTab] = useState<'support' | 'opposition'>('support');

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="flex items-center gap-2 text-sm font-bold text-black dark:text-white hover:underline focus:outline-none"
      >
        <Quote className="w-4 h-4" />
        See perspectives ({voices_support.length + voices_opposition.length})
      </button>
    );
  }

  const activeVoices = activeTab === 'support' ? voices_support : voices_opposition;
  // Show up to 6 voices in a 2x3 grid
  const displayVoices = activeVoices.slice(0, 6);

  return (
    <div>
      {/* Tabs - neobrutalist style */}
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab('support')}
          className={`
            flex-1 px-4 py-3 text-sm font-bold transition-all border-2 border-black dark:border-gray-600
            flex items-center justify-center gap-2
            ${activeTab === 'support'
              ? 'bg-black dark:bg-white text-white dark:text-black'
              : 'bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }
          `}
        >
          🙂 Supporters ({voices_support.length})
        </button>
        <button
          onClick={() => setActiveTab('opposition')}
          className={`
            flex-1 px-4 py-3 text-sm font-bold transition-all border-2 border-l-0 border-black dark:border-gray-600
            flex items-center justify-center gap-2
            ${activeTab === 'opposition'
              ? 'bg-black dark:bg-white text-white dark:text-black'
              : 'bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }
          `}
        >
          🤔 Critics ({voices_opposition.length})
        </button>
      </div>

      {/* 2x3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {displayVoices.map((voice, index) => (
          <VoiceCard key={index} voice={voice} compact />
        ))}
      </div>

      {/* Show more / Collapse */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setExpanded(false)}
          className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-1"
        >
          <ChevronUp className="w-4 h-4" />
          Collapse
        </button>
      </div>
    </div>
  );
}
