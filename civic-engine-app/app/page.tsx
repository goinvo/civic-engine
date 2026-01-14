'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ThumbsUp, ThumbsDown, Minus, Zap } from 'lucide-react';
import ParticleWave from '@/components/ParticleWave';
import { getNationalConsensus } from '@/lib/problem-areas';
import { getTopPolicies } from '@/data/policies';
import { getStatSourcesForPolicy } from '@/data/statSources';

type Screen = 'intro' | 'issues' | 'done';

// Animated number that counts between values
function AnimatedNumber({ value, duration = 0.8 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (value === prevValue) return;

    const startValue = prevValue;
    const endValue = value;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (endValue - startValue) * eased);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setPrevValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value, prevValue, duration]);

  return <>{displayValue}%</>;
}

// Floating stat window that pops in
function StatWindow({
  children,
  position,
  delay = 0
}: {
  children: React.ReactNode;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay?: number;
}) {
  const positionClasses = {
    'top-left': '-left-8 -top-4 md:-left-24',
    'top-right': '-right-8 -top-4 md:-right-24',
    'bottom-left': '-left-8 -bottom-4 md:-left-24',
    'bottom-right': '-right-8 -bottom-4 md:-right-24',
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} bg-white border-2 border-black px-3 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-left max-w-[140px] z-20`}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      transition={{ delay, type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [currentIssueIndex, setCurrentIssueIndex] = useState(0);
  const [votes, setVotes] = useState<Record<string, 'yes' | 'no' | 'skip'>>({});
  const [showResult, setShowResult] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeIntroPolicy, setActiveIntroPolicy] = useState(0);

  const nationalConsensus = getNationalConsensus();
  const topPolicies = getTopPolicies(6);

  // Cycle through policies randomly on intro screen
  useEffect(() => {
    if (screen !== 'intro') return;
    const interval = setInterval(() => {
      setActiveIntroPolicy(prev => {
        // Pick a random policy that's different from the current one
        let next = Math.floor(Math.random() * topPolicies.length);
        while (next === prev && topPolicies.length > 1) {
          next = Math.floor(Math.random() * topPolicies.length);
        }
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [screen, topPolicies.length]);

  const handleVote = (vote: 'yes' | 'no' | 'skip') => {
    if (isTransitioning) return;

    const policy = topPolicies[currentIssueIndex];
    setVotes(prev => ({ ...prev, [policy.id]: vote }));
    setShowResult(true);
    setIsTransitioning(true);

    setTimeout(() => {
      setShowResult(false);
      if (currentIssueIndex < topPolicies.length - 1) {
        setCurrentIssueIndex(prev => prev + 1);
      } else {
        setScreen('done');
      }
      setIsTransitioning(false);
    }, 1800);
  };

  const currentPolicy = topPolicies[currentIssueIndex];
  const introPolicy = topPolicies[activeIntroPolicy];
  const matchesConsensus = votes[currentPolicy?.id] === 'yes';
  const agreedCount = Object.values(votes).filter(v => v === 'yes').length;
  const totalVoted = Object.values(votes).filter(v => v !== 'skip').length;

  // Generate contextual stats for each policy from centralized data source
  const getPolicyStats = (policy: typeof currentPolicy) => {
    if (!policy) return [];

    const sourcedStats = getStatSourcesForPolicy(policy.id);
    if (sourcedStats) {
      return sourcedStats.stats.map(s => ({ label: s.label, value: s.value }));
    }

    // Fallback: show party support breakdown
    return [
      { label: 'Democrats', value: `${policy.partySupport.democrats}%` },
      { label: 'Republicans', value: `${policy.partySupport.republicans}%` },
    ];
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 overflow-hidden relative">
      <ParticleWave />

      <div className="max-w-lg w-full text-center px-6 relative z-10 py-12">
        <AnimatePresence mode="wait">
          {/* INTRO SCREEN */}
          {screen === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Cycling policy display */}
              <div className="relative mb-6">
                {/* Big animated percentage */}
                <motion.div
                  className="relative inline-block"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                  <span className="text-8xl md:text-9xl font-black bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] bg-clip-text text-transparent">
                    <AnimatedNumber value={introPolicy?.averageSupport || 78} />
                  </span>
                </motion.div>
              </div>

              {/* Policy title that cycles */}
              <div className="h-20 mb-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={introPolicy?.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-lg text-neutral dark:text-gray-400 mb-2">
                      of Americans support
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold text-neutral-dark dark:text-white">
                      {introPolicy?.title}
                    </h2>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Headline */}
              <motion.h1
                className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Americans agree on more than you think.
              </motion.h1>

              <motion.p
                className="text-neutral dark:text-gray-400 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {nationalConsensus.totalParticipants.toLocaleString()} Americans polled across {nationalConsensus.statesRepresented} states.
              </motion.p>

              {/* CTA Button */}
              <motion.button
                onClick={() => setScreen('issues')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] text-white text-xl font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ y: -3, boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)' }}
                whileTap={{ y: 2, boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)' }}
              >
                Do You Agree?
                <ArrowRight className="w-6 h-6" />
              </motion.button>

              <motion.p
                className="mt-6 text-sm text-neutral dark:text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                6 questions · 60 seconds
              </motion.p>
            </motion.div>
          )}

          {/* ISSUES SCREEN */}
          {screen === 'issues' && currentPolicy && (
            <motion.div
              key={`issue-${currentPolicy.id}`}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full"
            >
              {/* Progress indicator */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  {topPolicies.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-8 h-2 border-2 border-black ${
                        i < currentIssueIndex ? 'bg-green-500' :
                        i === currentIssueIndex ? 'bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B]' :
                        'bg-gray-200'
                      }`}
                      initial={i === currentIssueIndex ? { scaleX: 0 } : {}}
                      animate={i === currentIssueIndex ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      style={{ transformOrigin: 'left' }}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-neutral">{currentIssueIndex + 1}/{topPolicies.length}</span>
              </div>

              {/* Policy card with floating stats */}
              <div className="relative">
                {/* Floating stat windows */}
                <AnimatePresence>
                  {!showResult && getPolicyStats(currentPolicy).map((stat, i) => (
                    <StatWindow
                      key={stat.label}
                      position={i === 0 ? 'top-left' : 'bottom-right'}
                      delay={0.5 + i * 0.2}
                    >
                      <div className="text-xs text-neutral uppercase tracking-wide">{stat.label}</div>
                      <div className="text-lg font-black text-neutral-dark">{stat.value}</div>
                    </StatWindow>
                  ))}
                </AnimatePresence>

                <motion.div
                  className="bg-white dark:bg-gray-800 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-6 relative z-10"
                  layoutId="card"
                >
                  <motion.h2
                    className="text-xl md:text-2xl font-bold text-neutral-dark dark:text-white mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {currentPolicy.title}
                  </motion.h2>

                  <motion.p
                    className="text-neutral dark:text-gray-400 text-sm mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {currentPolicy.description}
                  </motion.p>

                  {/* Result reveal */}
                  <AnimatePresence>
                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t-2 border-black pt-4 mt-4">
                          {/* Animated stat reveal */}
                          <motion.div
                            className="flex items-center justify-between mb-3"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <span className="text-sm font-bold">
                              {matchesConsensus ? '🎉 You agree with' : '👀 Americans say'}
                            </span>
                            <motion.span
                              className="text-3xl font-black text-[#2F3BBD]"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 400, delay: 0.2 }}
                            >
                              {currentPolicy.averageSupport}%
                            </motion.span>
                          </motion.div>

                          {/* Progress bar */}
                          <div className="h-4 bg-gray-200 border-2 border-black overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B]"
                              initial={{ width: 0 }}
                              animate={{ width: `${currentPolicy.averageSupport}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                            />
                          </div>

                          {/* Party breakdown pop-in */}
                          <motion.div
                            className="flex gap-2 mt-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                          >
                            <div className="flex-1 bg-blue-100 border-2 border-black px-2 py-1 text-center">
                              <div className="text-xs font-bold text-blue-700">D: {currentPolicy.partySupport.democrats}%</div>
                            </div>
                            <div className="flex-1 bg-gray-100 border-2 border-black px-2 py-1 text-center">
                              <div className="text-xs font-bold text-gray-700">I: {currentPolicy.partySupport.independents}%</div>
                            </div>
                            <div className="flex-1 bg-red-100 border-2 border-black px-2 py-1 text-center">
                              <div className="text-xs font-bold text-red-700">R: {currentPolicy.partySupport.republicans}%</div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Vote buttons */}
              {!showResult && (
                <motion.div
                  className="flex gap-3 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    onClick={() => handleVote('no')}
                    className="flex-1 max-w-[100px] py-4 bg-red-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-1"
                    whileHover={{ y: -4, boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)' }}
                    whileTap={{ y: 2, boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)' }}
                  >
                    <ThumbsDown className="w-8 h-8 text-red-600" />
                    <span className="text-xs font-bold">Nope</span>
                  </motion.button>

                  <motion.button
                    onClick={() => handleVote('skip')}
                    className="flex-1 max-w-[100px] py-4 bg-gray-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-1"
                    whileHover={{ y: -4, boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)' }}
                    whileTap={{ y: 2, boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)' }}
                  >
                    <Minus className="w-8 h-8 text-gray-600" />
                    <span className="text-xs font-bold">Skip</span>
                  </motion.button>

                  <motion.button
                    onClick={() => handleVote('yes')}
                    className="flex-1 max-w-[100px] py-4 bg-green-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-1"
                    whileHover={{ y: -4, boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)' }}
                    whileTap={{ y: 2, boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)' }}
                  >
                    <ThumbsUp className="w-8 h-8 text-green-600" />
                    <span className="text-xs font-bold">Yes!</span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* DONE SCREEN */}
          {screen === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {/* Confetti */}
              <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
                {[...Array(40)].map((_, i) => {
                  const colors = ['#2F3BBD', '#C91A2B', '#FFD700', '#22C55E', '#EC4899'];
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 border-2 border-black"
                      style={{
                        left: `${Math.random() * 100}%`,
                        backgroundColor: colors[i % colors.length],
                      }}
                      initial={{ y: -20, rotate: 0, opacity: 1 }}
                      animate={{
                        y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800,
                        rotate: 360 * (i % 2 === 0 ? 1 : -1) * 2,
                        x: [0, (Math.random() - 0.5) * 100],
                      }}
                      transition={{
                        duration: 2.5 + Math.random() * 1.5,
                        delay: Math.random() * 0.8,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  );
                })}
              </div>

              {/* Score card */}
              <motion.div
                className="bg-white dark:bg-gray-800 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
                >
                  <Zap className="w-12 h-12 text-white" strokeWidth={2.5} />
                </motion.div>

                <motion.h1
                  className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {agreedCount >= 4 ? "You're with the majority!" :
                   agreedCount >= 2 ? "Common ground found!" :
                   "Unique perspective!"}
                </motion.h1>

                <motion.div
                  className="text-5xl font-black bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] bg-clip-text text-transparent mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.6 }}
                >
                  {agreedCount}/{totalVoted}
                </motion.div>

                <motion.p
                  className="text-neutral dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  You matched the consensus on {agreedCount} of {totalVoted} policies.
                </motion.p>
              </motion.div>

              {/* Actions */}
              <motion.div
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div whileHover={{ y: -2 }} whileTap={{ y: 1 }}>
                  <Link
                    href="/full"
                    className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] text-white text-lg font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Explore All Issues
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>

                <button
                  onClick={() => {
                    setScreen('intro');
                    setCurrentIssueIndex(0);
                    setVotes({});
                  }}
                  className="text-sm font-bold text-neutral hover:text-neutral-dark dark:hover:text-white underline"
                >
                  Start Over
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
