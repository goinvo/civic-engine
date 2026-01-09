'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Voice } from '@/types/problem-areas';

interface VoiceCardProps {
  voice: Voice;
  compact?: boolean;
  index?: number;
}

// Easing curve for smooth animations
const smoothEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// Stagger animation for cards
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: smoothEase,
    },
  }),
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

// Parse persona string like "Economist (Dr. Carmen Vega, 44)" into { role, name }
function parsePersona(persona: string): { role: string; name: string | null } {
  const match = persona.match(/^(.+?)\s*\(([^)]+)\)$/);
  if (match) {
    return { role: match[1].trim(), name: match[2].trim() };
  }
  return { role: persona, name: null };
}

/**
 * Single voice card - neobrutalist style with animations
 */
export function VoiceCard({ voice, compact = false, index = 0 }: VoiceCardProps) {
  const { role, name } = parsePersona(voice.persona);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -2, boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`bg-white dark:bg-gray-900 border-2 border-black dark:border-gray-600 p-4 ${compact ? '' : 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`}
    >
      <div className="mb-2">
        {name && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {name}
          </p>
        )}
        <p className="font-bold text-sm text-black dark:text-white">
          {role}
        </p>
      </div>
      <blockquote className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        "{voice.argument}"
      </blockquote>
    </motion.div>
  );
}

interface VoicesListProps {
  voices_support: Voice[];
  voices_opposition: Voice[];
}

// Tab indicator animation
const tabIndicatorVariants = {
  support: { x: 0 },
  opposition: { x: '100%' },
};

// Grid container for staggered children
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

/**
 * 2x3 grid of voices with tabbed supporters/critics - neobrutalist style with animations
 * Now always expanded since parent handles collapse
 */
export function VoicesList({
  voices_support,
  voices_opposition,
}: VoicesListProps) {
  const [activeTab, setActiveTab] = useState<'support' | 'opposition'>('support');

  const activeVoices = activeTab === 'support' ? voices_support : voices_opposition;
  // Show up to 6 voices in a 2x3 grid
  const displayVoices = activeVoices.slice(0, 6);

  return (
    <div>
      {/* Tabs - neobrutalist style with animated indicator */}
      <div className="relative flex mb-4">
        {/* Animated background indicator */}
        <motion.div
          className="absolute inset-y-0 w-1/2 bg-black dark:bg-white border-2 border-black dark:border-gray-600 z-0"
          variants={tabIndicatorVariants}
          animate={activeTab}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />

        <button
          onClick={() => setActiveTab('support')}
          className={`
            relative z-10 flex-1 px-4 py-3 text-sm font-bold transition-colors
            flex items-center justify-center gap-2 border-2 border-black dark:border-gray-600
            ${activeTab === 'support'
              ? 'text-white dark:text-black'
              : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }
          `}
        >
          <motion.span
            animate={{ scale: activeTab === 'support' ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            🙂
          </motion.span>
          Supporters ({voices_support.length})
        </button>
        <button
          onClick={() => setActiveTab('opposition')}
          className={`
            relative z-10 flex-1 px-4 py-3 text-sm font-bold transition-colors
            flex items-center justify-center gap-2 border-2 border-l-0 border-black dark:border-gray-600
            ${activeTab === 'opposition'
              ? 'text-white dark:text-black'
              : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }
          `}
        >
          <motion.span
            animate={{ scale: activeTab === 'opposition' ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            🤔
          </motion.span>
          Critics ({voices_opposition.length})
        </button>
      </div>

      {/* 2x3 Grid with AnimatePresence for tab switching */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {displayVoices.map((voice, index) => (
            <VoiceCard key={`${activeTab}-${index}`} voice={voice} compact index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
