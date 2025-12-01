'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Zap } from 'lucide-react';
import ValuesPulse from '@/components/ValuesPulse';
import ArchetypeSelector from '@/components/ArchetypeSelector';

type OnboardingMode = 'choice' | 'questionnaire' | 'archetype';

export default function ValuesOnboardingPage() {
  const [mode, setMode] = useState<OnboardingMode>('choice');
  const router = useRouter();

  const handleComplete = () => {
    // Redirect to profile page after completion
    router.push('/profile');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Back Link */}
      {mode !== 'choice' && (
        <div className="mb-8">
          <button
            onClick={() => setMode('choice')}
            className="inline-flex items-center space-x-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Options</span>
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
                onClick={() => setMode('questionnaire')}
                className="text-left p-8 border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(75,85,99,1)] hover:translate-x-[5px] hover:translate-y-[5px] active:shadow-none active:translate-x-2 active:translate-y-2 transition-all duration-150"
              >
                <div className="flex items-start mb-4">
                  <div className="w-16 h-16 bg-[#2F3BBD] border-4 border-black dark:border-gray-600 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h2 className="font-display text-3xl font-black text-black dark:text-white mb-3">
                  Take the Values Pulse
                </h2>
                <p className="font-body text-lg text-gray-700 dark:text-gray-300 font-medium mb-4">
                  Answer 7 quick questions to get a personalized profile tailored to your specific values.
                </p>
                <div className="inline-flex items-center space-x-2 text-[#2F3BBD] dark:text-blue-400 font-bold">
                  <span>Get Started</span>
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
                  Select from preset profiles like "The Optimizer" or "The Advocate" that match your philosophy.
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

        {mode === 'questionnaire' && (
          <motion.div
            key="questionnaire"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-12">
              <h1 className="font-display text-5xl sm:text-6xl font-black text-black dark:text-white mb-4">
                Values Pulse
              </h1>
              <p className="font-body text-xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto">
                Answer these 7 questions to create your personalized values profile.
              </p>
            </div>
            <ValuesPulse onComplete={handleComplete} />
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
