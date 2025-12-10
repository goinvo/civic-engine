'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Zap, TrendingUp, Heart, Scale } from 'lucide-react';
import ValuesPulse from '@/components/ValuesPulse';
import ValuesPulseV2 from '@/components/v2/ValuesPulseV2';
import ValuesPulseV3 from '@/components/v3/ValuesPulseV3';
import ArchetypeSelector from '@/components/ArchetypeSelector';
import { ScoringModelVersion } from '@/types/values';

type OnboardingMode = 'choice' | 'lens-select' | 'questionnaire' | 'archetype';

export default function ValuesOnboardingPage() {
  const [mode, setMode] = useState<OnboardingMode>('choice');
  const [selectedLens, setSelectedLens] = useState<ScoringModelVersion>('v1');
  const router = useRouter();

  const handleComplete = () => {
    // Redirect to profile page after completion
    router.push('/profile');
  };

  const handleLensSelect = (lens: ScoringModelVersion) => {
    setSelectedLens(lens);
    setMode('questionnaire');
  };

  const handleBack = () => {
    if (mode === 'questionnaire') {
      setMode('lens-select');
    } else {
      setMode('choice');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Back Link */}
      {mode !== 'choice' && (
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center space-x-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{mode === 'questionnaire' ? 'Back to Lens Selection' : 'Back to Options'}</span>
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {mode === 'choice' && (
          <motion.div
            key="choice"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="font-display text-6xl sm:text-7xl font-black text-black dark:text-white mb-6 leading-tight">
                Personalize Your Experience
              </h1>
              <p className="font-body text-2xl text-gray-700 dark:text-gray-300 font-medium max-w-3xl mx-auto">
                Help us understand what matters most to you when evaluating policies.
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Take Questionnaire */}
              <motion.button
                onClick={() => setMode('lens-select')}
                className="text-left p-8 border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(75,85,99,1)] hover:translate-x-[5px] hover:translate-y-[5px] active:shadow-none active:translate-x-2 active:translate-y-2 transition-all duration-150"
              >
                <div className="flex items-start mb-4">
                  <div className="w-16 h-16 bg-[#2F3BBD] border-4 border-black dark:border-gray-600 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h2 className="font-display text-3xl font-black text-black dark:text-white mb-3">
                  Take a Questionnaire
                </h2>
                <p className="font-body text-lg text-gray-700 dark:text-gray-300 font-medium mb-4">
                  Answer questions to build a personalized profile. Choose from three different scoring lenses.
                </p>
                <div className="inline-flex items-center space-x-2 text-[#2F3BBD] dark:text-blue-400 font-bold">
                  <span>Choose Your Lens</span>
                  <span>→</span>
                </div>
              </motion.button>

              {/* Choose Archetype */}
              <motion.button
                onClick={() => setMode('archetype')}
                className="text-left p-8 border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(75,85,99,1)] hover:translate-x-[5px] hover:translate-y-[5px] active:shadow-none active:translate-x-2 active:translate-y-2 transition-all duration-150"
              >
                <div className="flex items-start mb-4">
                  <div className="w-16 h-16 bg-[#C91A2B] border-4 border-black dark:border-gray-600 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h2 className="font-display text-3xl font-black text-black dark:text-white mb-3">
                  Choose a Profile
                </h2>
                <p className="font-body text-lg text-gray-700 dark:text-gray-300 font-medium mb-4">
                  Select from preset profiles like &quot;The Optimizer&quot; or &quot;The Advocate&quot; that match your philosophy.
                </p>
                <div className="inline-flex items-center space-x-2 text-[#C91A2B] dark:text-red-400 font-bold">
                  <span>Browse Profiles</span>
                  <span>→</span>
                </div>
              </motion.button>
            </div>

            {/* Skip Option */}
            <div className="text-center mt-12">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium"
              >
                <span>Skip for now</span>
                <span>→</span>
              </Link>
            </div>
          </motion.div>
        )}

        {mode === 'lens-select' && (
          <motion.div
            key="lens-select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="font-display text-5xl sm:text-6xl font-black text-black dark:text-white mb-4">
                Choose Your Scoring Lens
              </h1>
              <p className="font-body text-xl text-gray-700 dark:text-gray-300 font-medium max-w-3xl mx-auto">
                Each lens evaluates policies from a different perspective. Pick the one that resonates with how you think about policy.
              </p>
            </div>

            {/* Lens Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Impact Lens (V1) */}
              <motion.button
                onClick={() => handleLensSelect('v1')}
                className="text-left p-6 border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(75,85,99,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150"
              >
                <div className="w-14 h-14 bg-[#2F3BBD] border-4 border-black flex items-center justify-center mb-4">
                  <TrendingUp className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="font-display text-2xl font-black text-black dark:text-white mb-2">
                  Impact Lens
                </h2>
                <p className="font-body text-sm text-gray-600 dark:text-gray-400 font-medium mb-4">
                  7 questions about population reach, economic scale, equity, and feasibility.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs font-bold px-2 py-1 bg-[#2F3BBD]/10 text-[#2F3BBD] dark:text-blue-400 border border-[#2F3BBD]/30">
                    7 Questions
                  </span>
                  <span className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                    ~2 min
                  </span>
                </div>
                <div className="inline-flex items-center space-x-2 text-[#2F3BBD] dark:text-blue-400 font-bold text-sm">
                  <span>Start Impact Lens</span>
                  <span>→</span>
                </div>
              </motion.button>

              {/* Economics Lens (V2) */}
              <motion.button
                onClick={() => handleLensSelect('v2')}
                className="text-left p-6 border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(75,85,99,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] border-4 border-black flex items-center justify-center mb-4">
                  <Scale className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="font-display text-2xl font-black text-black dark:text-white mb-2">
                  Economics Lens
                </h2>
                <p className="font-body text-sm text-gray-600 dark:text-gray-400 font-medium mb-4">
                  13 questions on political economy: governance, rights, and justice.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs font-bold px-2 py-1 bg-gradient-to-r from-[#2F3BBD]/10 to-[#C91A2B]/10 text-[#C91A2B] dark:text-red-400 border border-[#C91A2B]/30">
                    13 Questions
                  </span>
                  <span className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                    ~5 min
                  </span>
                </div>
                <div className="inline-flex items-center space-x-2 text-[#C91A2B] dark:text-red-400 font-bold text-sm">
                  <span>Start Economics Lens</span>
                  <span>→</span>
                </div>
              </motion.button>

              {/* Needs Lens (V3) */}
              <motion.button
                onClick={() => handleLensSelect('v3')}
                className="text-left p-6 border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(75,85,99,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-[#501159] to-[#7B2D8E] border-4 border-black flex items-center justify-center mb-4">
                  <Heart className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="font-display text-2xl font-black text-black dark:text-white mb-2">
                  Needs Lens
                </h2>
                <p className="font-body text-sm text-gray-600 dark:text-gray-400 font-medium mb-4">
                  5 questions on human needs: survival, safety, community, and growth.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs font-bold px-2 py-1 bg-[#501159]/10 text-[#501159] dark:text-[#B87FB3] border border-[#501159]/30">
                    5 Questions
                  </span>
                  <span className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                    ~1 min
                  </span>
                </div>
                <div className="inline-flex items-center space-x-2 text-[#501159] dark:text-[#B87FB3] font-bold text-sm">
                  <span>Start Needs Lens</span>
                  <span>→</span>
                </div>
              </motion.button>
            </div>

            {/* Lens comparison note */}
            <div className="max-w-3xl mx-auto mt-12 p-6 border-4 border-black dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
              <h3 className="font-display text-lg font-black text-black dark:text-white mb-3">
                Which lens should I choose?
              </h3>
              <ul className="space-y-2 font-body text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="font-black text-[#2F3BBD]">Impact:</span>
                  <span>Traditional policy analysis (scope, scale, equity, feasibility)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-black text-[#C91A2B]">Economics:</span>
                  <span>Deep dive into political philosophy and institutional design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-black text-[#501159]">Needs:</span>
                  <span>Maslow-inspired focus on human needs and well-being</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {mode === 'questionnaire' && (
          <motion.div
            key="questionnaire"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {selectedLens === 'v1' && (
              <>
                <div className="text-center mb-12">
                  <h1 className="font-display text-5xl sm:text-6xl font-black text-black dark:text-white mb-4">
                    Values Pulse
                  </h1>
                  <p className="font-body text-xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto">
                    Answer these 7 questions to create your personalized values profile.
                  </p>
                </div>
                <ValuesPulse onComplete={handleComplete} />
              </>
            )}
            {selectedLens === 'v2' && (
              <ValuesPulseV2 onComplete={handleComplete} />
            )}
            {selectedLens === 'v3' && (
              <ValuesPulseV3 onComplete={handleComplete} />
            )}
          </motion.div>
        )}

        {mode === 'archetype' && (
          <motion.div
            key="archetype"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ArchetypeSelector onComplete={handleComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
