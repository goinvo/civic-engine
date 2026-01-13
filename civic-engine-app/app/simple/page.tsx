'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Check, ThumbsUp, ThumbsDown, Minus, Sparkles, Users } from 'lucide-react';
import ParticleWave from '@/components/ParticleWave';
import { DynamicIcon } from '@/components/problem-areas';
import { getNationalConsensus, getProblemAreas } from '@/lib/problem-areas';
import { getTopPolicies } from '@/data/policies';

type Screen = 'intro' | 'reveal' | 'issues' | 'done';

export default function SimpleLanding() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [currentIssueIndex, setCurrentIssueIndex] = useState(0);
  const [votes, setVotes] = useState<Record<string, 'yes' | 'no' | 'meh'>>({});
  const [showResult, setShowResult] = useState(false);

  const nationalConsensus = getNationalConsensus();
  const topPolicies = getTopPolicies(6); // Just show top 6 for quick experience

  const handleVote = (vote: 'yes' | 'no' | 'meh') => {
    const policy = topPolicies[currentIssueIndex];
    setVotes(prev => ({ ...prev, [policy.id]: vote }));
    setShowResult(true);

    // Auto-advance after showing result
    setTimeout(() => {
      setShowResult(false);
      if (currentIssueIndex < topPolicies.length - 1) {
        setCurrentIssueIndex(prev => prev + 1);
      } else {
        setScreen('done');
      }
    }, 1500);
  };

  const currentPolicy = topPolicies[currentIssueIndex];
  const matchesConsensus = votes[currentPolicy?.id] === 'yes';
  const agreedCount = Object.values(votes).filter(v => v === 'yes').length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 overflow-hidden relative">
      <ParticleWave />

      <div className="max-w-lg w-full text-center px-6 relative z-10">
        <AnimatePresence mode="wait">
          {/* INTRO SCREEN */}
          {screen === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Big number with sparkle */}
              <motion.div
                className="mb-6 relative inline-block"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  className="absolute -top-4 -right-4"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                </motion.div>
                <span className="text-8xl md:text-9xl font-black bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] bg-clip-text text-transparent">
                  {nationalConsensus.averageConsensusPercent}%
                </span>
              </motion.div>

              <h1 className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-white mb-3">
                of Americans agree on this.
              </h1>

              <p className="text-lg text-neutral dark:text-gray-400 mb-8">
                Do you?
              </p>

              <motion.button
                onClick={() => setScreen('reveal')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] text-white text-xl font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                whileHover={{ y: -3, boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)' }}
                whileTap={{ y: 2, boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)' }}
              >
                Find Out
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </motion.div>
          )}

          {/* REVEAL SCREEN */}
          {screen === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
              >
                <Users className="w-12 h-12 text-white" strokeWidth={2.5} />
              </motion.div>

              <h1 className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-white mb-4">
                You're not alone.
              </h1>

              <p className="text-lg text-neutral dark:text-gray-400 mb-8">
                <span className="font-bold text-neutral-dark dark:text-white">{nationalConsensus.totalParticipants.toLocaleString()}</span> Americans across <span className="font-bold text-neutral-dark dark:text-white">{nationalConsensus.statesRepresented}</span> states already agree on the big stuff.
              </p>

              <motion.button
                onClick={() => setScreen('issues')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-xl font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]"
                whileHover={{ y: -3 }}
                whileTap={{ y: 2 }}
              >
                Let's See
                <ArrowRight className="w-6 h-6" />
              </motion.button>

              <p className="mt-6 text-sm text-neutral dark:text-gray-500">
                6 quick questions
              </p>
            </motion.div>
          )}

          {/* ISSUES SCREEN - Swipeable cards */}
          {screen === 'issues' && currentPolicy && (
            <motion.div
              key={`issue-${currentPolicy.id}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-6">
                {topPolicies.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 rounded-full border-2 border-black ${
                      i < currentIssueIndex ? 'bg-green-500' :
                      i === currentIssueIndex ? 'bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B]' :
                      'bg-gray-200'
                    }`}
                    animate={i === currentIssueIndex ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                ))}
              </div>

              {/* Issue card */}
              <motion.div
                className="bg-white dark:bg-gray-800 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-6"
                animate={showResult ? {
                  backgroundColor: matchesConsensus ? '#dcfce7' : '#fef3c7'
                } : {}}
              >
                <div className="text-xs font-bold text-neutral uppercase tracking-wide mb-2">
                  {currentIssueIndex + 1} of {topPolicies.length}
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-neutral-dark dark:text-white mb-4">
                  {currentPolicy.title}
                </h2>

                <p className="text-neutral dark:text-gray-400 mb-4 text-sm">
                  {currentPolicy.description}
                </p>

                {/* Consensus bar - always visible but animates on vote */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t-2 border-black pt-4 mt-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold">
                          {matchesConsensus ? '🎉 You agree with' : '👀 Americans say'}
                        </span>
                        <span className="text-2xl font-black text-[#2F3BBD]">
                          {currentPolicy.averageSupport}%
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 border-2 border-black overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B]"
                          initial={{ width: 0 }}
                          animate={{ width: `${currentPolicy.averageSupport}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                      </div>
                      <p className="text-xs text-neutral mt-2">
                        of Americans support this
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Vote buttons */}
              {!showResult && (
                <div className="flex gap-3 justify-center">
                  <motion.button
                    onClick={() => handleVote('no')}
                    className="flex-1 max-w-[100px] py-4 bg-red-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-1"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 2, boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)' }}
                  >
                    <ThumbsDown className="w-8 h-8 text-red-600" />
                    <span className="text-xs font-bold">Nope</span>
                  </motion.button>

                  <motion.button
                    onClick={() => handleVote('meh')}
                    className="flex-1 max-w-[100px] py-4 bg-gray-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-1"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 2, boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)' }}
                  >
                    <Minus className="w-8 h-8 text-gray-600" />
                    <span className="text-xs font-bold">Meh</span>
                  </motion.button>

                  <motion.button
                    onClick={() => handleVote('yes')}
                    className="flex-1 max-w-[100px] py-4 bg-green-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-1"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 2, boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)' }}
                  >
                    <ThumbsUp className="w-8 h-8 text-green-600" />
                    <span className="text-xs font-bold">Yes!</span>
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {/* DONE SCREEN */}
          {screen === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              {/* Confetti celebration */}
              <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
                {[...Array(50)].map((_, i) => {
                  const colors = ['#2F3BBD', '#C91A2B', '#FFD700', '#22C55E', '#EC4899', '#F97316'];
                  const shapes = ['circle', 'square', 'rectangle'];
                  const shape = shapes[i % 3];
                  const color = colors[i % colors.length];
                  const startX = Math.random() * 100;
                  const delay = Math.random() * 0.5;
                  const duration = 2 + Math.random() * 2;
                  const size = 6 + Math.random() * 10;

                  return (
                    <motion.div
                      key={i}
                      className={shape === 'circle' ? 'rounded-full' : ''}
                      style={{
                        position: 'absolute',
                        left: `${startX}%`,
                        top: -20,
                        width: shape === 'rectangle' ? size * 0.4 : size,
                        height: shape === 'rectangle' ? size * 1.5 : size,
                        backgroundColor: color,
                      }}
                      initial={{ y: -20, rotate: 0, opacity: 1 }}
                      animate={{
                        y: window?.innerHeight ? window.innerHeight + 100 : 800,
                        rotate: 360 * (Math.random() > 0.5 ? 1 : -1) * 3,
                        x: [0, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 100],
                      }}
                      transition={{
                        duration: duration,
                        delay: delay,
                        ease: 'linear',
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }}
                    />
                  );
                })}
              </div>

              <motion.div
                className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                <span className="text-5xl font-black text-white">{agreedCount}/{topPolicies.length}</span>
              </motion.div>

              <h1 className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-white mb-4">
                {agreedCount >= 4 ? "You're with the majority!" : agreedCount >= 2 ? "Some common ground!" : "Interesting perspective!"}
              </h1>

              <p className="text-lg text-neutral dark:text-gray-400 mb-8">
                You agreed with {agreedCount} of the {topPolicies.length} most popular policies in America.
              </p>

              <div className="flex flex-col gap-3">
                <motion.div whileHover={{ y: -2 }} whileTap={{ y: 1 }}>
                  <Link
                    href="/full"
                    className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] text-white text-lg font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Explore All Issues
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>

                <motion.button
                  onClick={() => {
                    setScreen('intro');
                    setCurrentIssueIndex(0);
                    setVotes({});
                  }}
                  className="text-sm font-bold text-neutral hover:text-neutral-dark dark:hover:text-white underline"
                  whileHover={{ scale: 1.05 }}
                >
                  Start Over
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
