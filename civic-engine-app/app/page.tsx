'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ThumbsUp, ThumbsDown, Minus, Zap, Landmark, GraduationCap, Heart, Home as HomeIcon, DollarSign, Users, ChevronRight, MessageCircle, ArrowLeft } from 'lucide-react';
import ParticleWave from '@/components/ParticleWave';
import { getNationalConsensus } from '@/lib/problem-areas';
import { getTopPolicies, policies } from '@/data/policies';
import { getStatSourcesForPolicy } from '@/data/statSources';
import { MiniChart } from '@/components/charts';

// Category definitions with icons and colors
const CATEGORIES = [
  { id: 'governance', label: 'Governance', icon: Landmark, color: '#2F3BBD' },
  { id: 'healthcare', label: 'Healthcare', icon: Heart, color: '#C91A2B' },
  { id: 'economy', label: 'Economy', icon: DollarSign, color: '#16A34A' },
  { id: 'education', label: 'Education', icon: GraduationCap, color: '#9333EA' },
  { id: 'housing', label: 'Housing', icon: HomeIcon, color: '#EA580C' },
  { id: 'family', label: 'Family', icon: Users, color: '#0891B2' },
] as const;

type Screen = 'intro' | 'issues' | 'done';

// Typewriter-style animated number with cursor
function AnimatedNumber({ value }: { value: number }) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const prevValueRef = useRef<number | null>(null);
  const displayTextRef = useRef('');
  const targetText = `${value}%`;

  useEffect(() => {
    // Skip if same value
    if (prevValueRef.current === value) return;

    setIsActive(true);
    let cancelled = false;

    const animate = async () => {
      const currentText = displayTextRef.current;
      const charDelay = 80;

      // If there's existing text, erase it character by character
      if (currentText.length > 0) {
        for (let i = currentText.length; i >= 0; i--) {
          if (cancelled) return;
          displayTextRef.current = currentText.slice(0, i);
          setDisplayText(displayTextRef.current);
          await new Promise(r => setTimeout(r, charDelay + Math.random() * 30));
        }
      }

      // Small pause before typing
      await new Promise(r => setTimeout(r, 150));

      // Type new value character by character
      for (let i = 1; i <= targetText.length; i++) {
        if (cancelled) return;
        displayTextRef.current = targetText.slice(0, i);
        setDisplayText(displayTextRef.current);
        await new Promise(r => setTimeout(r, charDelay + Math.random() * 40));
      }

      setIsActive(false);
      prevValueRef.current = value;
    };

    animate();

    return () => { cancelled = true; };
  }, [value, targetText]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="inline-flex items-baseline font-mono">
      <span>{displayText}</span>
      <span
        className={`inline-block w-[4px] h-[1em] ml-0.5 ${
          isActive || showCursor ? 'bg-current' : 'bg-transparent'
        }`}
        style={{ transition: isActive ? 'none' : 'background-color 0.1s' }}
      />
    </span>
  );
}

// Floating stat window - uses CSS for natural sizing
function StatWindow({
  children,
  position,
  delay = 0,
}: {
  children: React.ReactNode;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay?: number;
}) {
  const positionClasses = {
    'top-left': '-left-2 -top-12 md:-left-40 md:-top-6',
    'top-right': '-right-2 -top-12 md:-right-40 md:-top-6',
    'bottom-left': '-left-2 -bottom-12 md:-left-40 md:-bottom-6',
    'bottom-right': '-right-2 -bottom-12 md:-right-40 md:-bottom-6',
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-left z-20 p-4 overflow-visible`}
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
  const [activeIntroPolicy, setActiveIntroPolicy] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);

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
    const policy = topPolicies[currentIssueIndex];
    setVotes(prev => ({ ...prev, [policy.id]: vote }));
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    if (currentIssueIndex < topPolicies.length - 1) {
      setCurrentIssueIndex(prev => prev + 1);
    } else {
      setScreen('done');
    }
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
      return sourcedStats.stats.map(s => ({
        label: s.label,
        value: s.value,
        chart: s.chart,
        source: s.source,
        url: s.url,
      }));
    }

    // Fallback: show party support breakdown
    if (!policy.partySupport) return [];
    return [
      { label: 'Democrats', value: `${policy.partySupport.democrats}%`, chart: undefined, source: undefined, url: undefined },
      { label: 'Republicans', value: `${policy.partySupport.republicans}%`, chart: undefined, source: undefined, url: undefined },
    ];
  };

  // Screen labels for progress indicator
  const screenLabels = {
    intro: 'Discover',
    issues: 'Vote',
    done: 'Results',
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 overflow-x-hidden relative">
      <ParticleWave />

      {/* Header with progress */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-black text-lg bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] bg-clip-text text-transparent">
            Civic Engine
          </Link>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {(['intro', 'issues', 'done'] as Screen[]).map((s) => (
              <div
                key={s}
                className={`flex items-center gap-1 transition-all ${screen === s ? 'opacity-100' : 'opacity-40'}`}
              >
                <div
                  className={`w-2 h-2 rounded-full border border-black transition-all ${
                    screen === s ? 'bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] scale-125' : 'bg-gray-300'
                  }`}
                />
                <span className={`text-xs font-bold hidden sm:block ${screen === s ? 'text-neutral-dark dark:text-white' : 'text-neutral'}`}>
                  {screenLabels[s]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center overflow-visible">
        <div className="max-w-lg w-full text-center px-6 relative z-10 py-12 overflow-visible">
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
                        i < currentIssueIndex ? 'bg-[#2F3BBD]' :
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
              <div className="relative overflow-visible">
                {/* Floating stat windows */}
                <AnimatePresence>
                  {!showResult && getPolicyStats(currentPolicy).map((stat, i) => (
                    <StatWindow
                      key={stat.label}
                      position={i === 0 ? 'top-left' : 'bottom-right'}
                      delay={0.5 + i * 0.2}
                    >
                      <div className="text-[10px] text-neutral uppercase tracking-wide font-bold mb-1">{stat.label}</div>
                      {stat.chart ? (
                        <div className="mb-1 overflow-visible">
                          <MiniChart chart={stat.chart} />
                        </div>
                      ) : (
                        <div className="text-xl font-black text-neutral-dark">{stat.value}</div>
                      )}
                      {stat.source && (
                        <div className="mt-1 border-t border-gray-200 pt-1">
                          {stat.url ? (
                            <a
                              href={stat.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[8px] text-neutral hover:text-[#2F3BBD] hover:underline block leading-tight"
                            >
                              {stat.source}
                            </a>
                          ) : (
                            <span className="text-[8px] text-neutral block leading-tight">{stat.source}</span>
                          )}
                        </div>
                      )}
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
                              <div className="text-xs font-bold text-blue-700">D: {currentPolicy.partySupport?.democrats}%</div>
                            </div>
                            <div className="flex-1 bg-gray-100 border-2 border-black px-2 py-1 text-center">
                              <div className="text-xs font-bold text-gray-700">I: {currentPolicy.partySupport?.independents}%</div>
                            </div>
                            <div className="flex-1 bg-red-100 border-2 border-black px-2 py-1 text-center">
                              <div className="text-xs font-bold text-red-700">R: {currentPolicy.partySupport?.republicans}%</div>
                            </div>
                          </motion.div>

                          {/* Action buttons */}
                          <motion.div
                            className="flex gap-3 mt-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                          >
                            <motion.button
                              className="flex-1 py-3 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 font-bold text-sm hover:bg-gray-50"
                              whileHover={{ y: -2, boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
                              whileTap={{ y: 1, boxShadow: '1px 1px 0px 0px rgba(0,0,0,1)' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setChatOpen(true);
                              }}
                            >
                              <MessageCircle className="w-4 h-4" />
                              Discuss
                            </motion.button>
                            <motion.button
                              className="flex-1 py-3 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 font-bold text-sm"
                              whileHover={{ y: -2, boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
                              whileTap={{ y: 1, boxShadow: '1px 1px 0px 0px rgba(0,0,0,1)' }}
                              onClick={handleNext}
                            >
                              {currentIssueIndex < topPolicies.length - 1 ? 'Next' : 'Finish'}
                              <ArrowRight className="w-4 h-4" />
                            </motion.button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Chat panel */}
              <AnimatePresence>
                {chatOpen && (
                  <motion.div
                    className="fixed inset-0 z-50 bg-white dark:bg-gray-900"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  >
                    <div className="h-full flex flex-col">
                      {/* Chat header with back button */}
                      <div className="flex items-center gap-3 p-4 border-b-2 border-black">
                        <motion.button
                          onClick={() => setChatOpen(false)}
                          className="p-2 bg-gray-100 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          whileHover={{ y: -1 }}
                          whileTap={{ y: 1 }}
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </motion.button>
                        <div className="flex-1">
                          <div className="font-bold text-neutral-dark dark:text-white">{currentPolicy?.title}</div>
                          <div className="text-xs text-neutral">Discussion</div>
                        </div>
                      </div>

                      {/* Chat content placeholder */}
                      <div className="flex-1 p-4 overflow-y-auto">
                        <div className="bg-gray-100 dark:bg-gray-800 border-2 border-black p-4 mb-4">
                          <p className="text-sm text-neutral-dark dark:text-white mb-2">
                            <span className="font-bold">AI Assistant:</span> What would you like to know about {currentPolicy?.title}?
                          </p>
                          <p className="text-xs text-neutral">
                            I can explain the pros and cons, share different perspectives, or answer questions about how this policy would work.
                          </p>
                        </div>
                      </div>

                      {/* Chat input */}
                      <div className="p-4 border-t-2 border-black">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Ask a question..."
                            className="flex-1 px-4 py-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-sm focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                          />
                          <motion.button
                            className="px-4 py-3 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            whileHover={{ y: -1 }}
                            whileTap={{ y: 1 }}
                          >
                            Send
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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

              {/* Score summary */}
              <motion.div
                className="bg-white dark:bg-gray-800 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
                    >
                      <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </motion.div>
                    <div className="text-left">
                      <div className="font-bold text-neutral-dark dark:text-white">
                        {agreedCount >= 4 ? "You're with the majority!" :
                         agreedCount >= 2 ? "Common ground found!" :
                         "Unique perspective!"}
                      </div>
                      <div className="text-sm text-neutral">{agreedCount}/{totalVoted} consensus matches</div>
                    </div>
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] bg-clip-text text-transparent">
                    {Math.round((agreedCount / totalVoted) * 100)}%
                  </div>
                </div>
              </motion.div>

              {/* Category grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-lg font-bold text-neutral-dark dark:text-white mb-3 text-left">Explore by Category</h2>
                <div className="grid grid-cols-2 gap-3">
                  {CATEGORIES.map((category, i) => {
                    const Icon = category.icon;
                    const categoryPolicies = policies.filter(p => p.category === category.id);
                    const votedInCategory = categoryPolicies.filter(p => votes[p.id]).length;
                    const totalInCategory = categoryPolicies.length;
                    const progress = totalInCategory > 0 ? (votedInCategory / totalInCategory) * 100 : 0;

                    return (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 1 }}
                      >
                        <Link
                          href={`/explore?category=${category.id}`}
                          className="block bg-white dark:bg-gray-800 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4 text-left hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div
                              className="w-10 h-10 flex items-center justify-center border-2 border-black"
                              style={{ backgroundColor: category.color }}
                            >
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <ChevronRight className="w-4 h-4 text-neutral" />
                          </div>
                          <div className="font-bold text-sm text-neutral-dark dark:text-white mb-1">{category.label}</div>
                          <div className="text-xs text-neutral mb-2">{totalInCategory} issues</div>
                          {/* Progress bar */}
                          <div className="h-1.5 bg-gray-200 border border-black">
                            <div
                              className="h-full transition-all"
                              style={{ width: `${progress}%`, backgroundColor: category.color }}
                            />
                          </div>
                          <div className="text-[10px] text-neutral mt-1">{votedInCategory}/{totalInCategory} voted</div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                className="flex flex-col gap-3 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <motion.div whileHover={{ y: -2 }} whileTap={{ y: 1 }}>
                  <Link
                    href="/full"
                    className="inline-flex items-center justify-center gap-3 w-full px-6 py-3 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    See All {policies.length} Issues
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

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-lg mx-auto flex items-center justify-between text-xs">
          <span className="text-neutral dark:text-gray-500">
            Data from nonpartisan sources
          </span>
          <Link
            href="/explore/methodology"
            className="font-bold text-neutral hover:text-[#2F3BBD] dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Methodology
          </Link>
        </div>
      </footer>
    </div>
  );
}
