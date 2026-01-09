'use client';

import { useState, useEffect, use, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, BarChart3, ChevronLeft, ChevronRight, ChevronDown, MessageSquare, Send, Flag, CornerDownRight, Users, Maximize2, Minimize2, FileText, Cog, Scale, Quote } from 'lucide-react';
import { DynamicIcon, TradeoffsDisplay, VoicesList, RatingScale } from '@/components/problem-areas';
import { PreferenceRadar } from '@/components/problem-areas/PreferenceRadar';
import { Button, Card, Badge } from '@/components/education/ui';
import {
  getProblemAreaWithApproaches,
  setImplementationRating,
  getImplementationRating,
  getProblemAreaProgress,
} from '@/lib/problem-areas';
import { calculatePreferenceProfile } from '@/lib/problem-areas/preference-profile';
import type { ProblemAreaId, ImplementationRating } from '@/types/problem-areas';

// Discussion types
type Stance = 'strongly_support' | 'somewhat_support' | 'neutral' | 'somewhat_oppose' | 'strongly_oppose';

interface DiscussionPost {
  id: string;
  authorName: string;
  authorId: string;
  authorStance?: Stance;
  content: string;
  createdAt: Date;
  replies: DiscussionPost[];
}

const STANCE_LABELS: Record<Stance, string> = {
  strongly_support: 'Strongly support',
  somewhat_support: 'Support',
  neutral: 'Neutral',
  somewhat_oppose: 'Oppose',
  strongly_oppose: 'Strongly oppose',
};

const STANCE_COLORS: Record<Stance, string> = {
  strongly_support: 'bg-green-100 text-green-700 border-green-300',
  somewhat_support: 'bg-green-50 text-green-600 border-green-200',
  neutral: 'bg-gray-100 text-gray-600 border-gray-300',
  somewhat_oppose: 'bg-red-50 text-red-600 border-red-200',
  strongly_oppose: 'bg-red-100 text-red-700 border-red-300',
};

// Helper function for time formatting
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(date).toLocaleDateString();
}

// Mock discussion posts
function getMockDiscussionPosts(approachTitle: string): DiscussionPost[] {
  const now = new Date();
  return [
    {
      id: '1',
      authorName: 'Carmen Vega',
      authorId: 'user1',
      authorStance: 'somewhat_support',
      content: `I think this approach has merit, but I'm curious about the implementation timeline. Has anyone looked into how similar policies have worked in other countries?`,
      createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      replies: [
        {
          id: '1-1',
          authorName: 'Luis Herrera',
          authorId: 'user2',
          authorStance: 'neutral',
          content: `Good question! I found some data from the OECD that might be relevant. The results were mixed but promising in Nordic countries.`,
          createdAt: new Date(now.getTime() - 1.5 * 60 * 60 * 1000),
          replies: [],
        },
        {
          id: '1-2',
          authorName: 'Franklin Williams',
          authorId: 'user3',
          authorStance: 'somewhat_oppose',
          content: `I think the context matters a lot. What works in smaller countries might not scale well here.`,
          createdAt: new Date(now.getTime() - 45 * 60 * 1000),
          replies: [],
        },
      ],
    },
    {
      id: '2',
      authorName: 'Patricia Santos',
      authorId: 'user4',
      authorStance: 'strongly_support',
      content: `This is exactly the kind of bold action we need. The status quo clearly isn't working, and incremental changes haven't moved the needle.`,
      createdAt: new Date(now.getTime() - 5 * 60 * 60 * 1000), // 5 hours ago
      replies: [],
    },
    {
      id: '3',
      authorName: 'Robert Chen',
      authorId: 'user5',
      authorStance: 'somewhat_oppose',
      content: `I'm concerned about unintended consequences. Have the economists modeled what might happen to adjacent markets? The ripple effects could be significant.`,
      createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
      replies: [
        {
          id: '3-1',
          authorName: 'Maria Johnson',
          authorId: 'user6',
          authorStance: 'neutral',
          content: `That's a fair concern. I'd love to see more economic analysis before forming a strong opinion.`,
          createdAt: new Date(now.getTime() - 20 * 60 * 60 * 1000),
          replies: [],
        },
      ],
    },
  ];
}

export default function ProblemAreaPage({
  params,
}: {
  params: Promise<{ problemAreaId: string }>;
}) {
  const resolvedParams = use(params);
  const [mounted, setMounted] = useState(false);
  const [ratings, setRatings] = useState<Record<string, ImplementationRating>>({});
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(true);
  const [isDiscussionExpanded, setIsDiscussionExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [discussionPosts, setDiscussionPosts] = useState<DiscussionPost[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    summary: true,
    howItWorks: true,
    tradeoffs: true,
    perspectives: true,
  });
  const stickyRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const problemAreaId = resolvedParams.problemAreaId as ProblemAreaId;
  const problemArea = getProblemAreaWithApproaches(problemAreaId);

  // Load ratings and discussion posts on mount
  useEffect(() => {
    setMounted(true);
    if (problemArea) {
      const loadedRatings: Record<string, ImplementationRating> = {};
      for (const approach of problemArea.approaches) {
        const rating = getImplementationRating(approach.id);
        if (rating !== undefined) {
          loadedRatings[approach.id] = rating;
        }
      }
      setRatings(loadedRatings);
      // Load mock discussion posts
      setDiscussionPosts(getMockDiscussionPosts(problemArea.approaches[0]?.title || ''));
    }
  }, [problemAreaId]);

  // Detect when sticky element is stuck using IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel is not visible, the sticky element is stuck
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-57px 0px 0px 0px' } // Account for top bar height
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [mounted]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsDropdownOpen(false);
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isDropdownOpen]);

  // Discussion handlers
  const handlePostComment = (content: string, parentId?: string) => {
    if (!content.trim()) return;

    const newPost: DiscussionPost = {
      id: `user-${Date.now()}`,
      authorName: 'You',
      authorId: 'current-user',
      content: content.trim(),
      createdAt: new Date(),
      replies: [],
    };

    if (parentId) {
      // Add as reply
      setDiscussionPosts((prev) =>
        prev.map((post) =>
          post.id === parentId
            ? { ...post, replies: [...post.replies, newPost] }
            : post
        )
      );
      setReplyContent('');
      setReplyingTo(null);
    } else {
      // Add as new thread
      setDiscussionPosts((prev) => [newPost, ...prev]);
      setNewComment('');
    }
  };

  const totalComments = discussionPosts.reduce(
    (acc, thread) => acc + 1 + thread.replies.length,
    0
  );

  const focusedApproach = problemArea?.approaches[focusedIndex];
  const otherApproaches = problemArea?.approaches.filter((_, i) => i !== focusedIndex) || [];

  // Calculate user preference profile
  const userProfile = useMemo(() => {
    if (Object.keys(ratings).length === 0) return null;
    return calculatePreferenceProfile(ratings);
  }, [ratings]);

  // Create approach titles map for radar legend
  const approachTitles = useMemo(() => {
    if (!problemArea) return {};
    return Object.fromEntries(problemArea.approaches.map((a) => [a.id, a.title]));
  }, [problemArea]);

  if (!problemArea) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Problem Area Not Found</h1>
          <Link href="/explore" className="text-[#2F3BBD] hover:underline">
            Go back to all problems
          </Link>
        </div>
      </main>
    );
  }

  const progress = mounted ? getProblemAreaProgress(problemAreaId) : { total: 0, rated: 0, isComplete: false };
  const isComplete = progress.isComplete;

  const handleRatingChange = (approachId: string, rating: ImplementationRating) => {
    setImplementationRating(approachId, rating);
    setRatings((prev) => ({ ...prev, [approachId]: rating }));
  };

  const goToPrevious = () => {
    setFocusedIndex((prev) => (prev - 1 + problemArea.approaches.length) % problemArea.approaches.length);
  };

  const goToNext = () => {
    setFocusedIndex((prev) => (prev + 1) % problemArea.approaches.length);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24">
      {/* Top bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/explore"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
              All Problems
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <DynamicIcon
                  name={problemArea.icon}
                  className="w-5 h-5"
                  style={{ color: problemArea.color }}
                />
                <span className="font-semibold text-sm">{problemArea.shortTitle}</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {progress.rated}/{progress.total} rated
              </span>
              {isComplete && (
                <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Complete
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Split layout container */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          className="grid gap-6 lg:grid-cols-5"
          layout
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* LEFT COLUMN: Focused Approach (shrinks when discussion expanded) */}
          <motion.div
            className={isDiscussionExpanded ? 'lg:col-span-2' : 'lg:col-span-3'}
            layout
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Sentinel element for detecting sticky state */}
            <div ref={sentinelRef} className="h-0" />

            {/* Sticky Rating Scale at top with animated shadow */}
            {focusedApproach && (
              <motion.div
                ref={stickyRef}
                className="sticky top-[57px] z-30 bg-white dark:bg-gray-900 border-black dark:border-gray-600 overflow-hidden"
                animate={{
                  boxShadow: isSticky
                    ? '4px 0px 0px 0px rgba(0,0,0,1)' // No bottom shadow when stuck
                    : isDiscussionExpanded
                      ? 'none'
                      : '4px 4px 0px 0px rgba(0,0,0,1)', // Full shadow when not stuck
                  borderWidth: isDiscussionExpanded ? 0 : 2,
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {/* Label row - only shows when not expanded */}
                <motion.div
                  className="overflow-hidden"
                  animate={{
                    height: isDiscussionExpanded ? 0 : 'auto',
                    opacity: isDiscussionExpanded ? 0 : 1,
                    paddingTop: isDiscussionExpanded ? 0 : 12,
                    paddingBottom: isDiscussionExpanded ? 0 : 8,
                    paddingLeft: isDiscussionExpanded ? 0 : 16,
                    paddingRight: isDiscussionExpanded ? 0 : 16,
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <h3 className="text-sm font-bold text-neutral-dark dark:text-white">
                    What do you think?
                  </h3>
                </motion.div>
                {/* Rating scale - full width, no padding */}
                <RatingScale
                  value={ratings[focusedApproach.id]}
                  onChange={(r) => handleRatingChange(focusedApproach.id, r)}
                  compact={isDiscussionExpanded}
                />
              </motion.div>
            )}

            {/* Focused approach card - neobrutalist */}
            {focusedApproach && (
              <Card variant="default" padding="none" className="p-6 md:p-8 mt-4">
                {/* Title */}
                <h2 className="font-display text-2xl md:text-3xl font-black text-neutral-dark dark:text-white leading-tight">
                  {focusedApproach.title}
                </h2>
                <p className="text-sm text-neutral dark:text-gray-400 mt-2 mb-6">{focusedApproach.source}</p>

                {/* Summary - Collapsible */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSection('summary')}
                    className="flex items-center gap-2 w-full text-left group"
                  >
                    <motion.div
                      animate={{ rotate: expandedSections.summary ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 text-neutral group-hover:text-neutral-dark dark:group-hover:text-white" />
                    </motion.div>
                    <FileText className="w-4 h-4 text-neutral-dark dark:text-white" />
                    <h3 className="text-sm font-bold text-neutral-dark dark:text-white">
                      Summary
                    </h3>
                  </button>
                  <AnimatePresence>
                    {expandedSections.summary && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <p className="text-base text-neutral-dark dark:text-gray-300 leading-relaxed mt-3 pl-6">
                          {focusedApproach.summary}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* How it works - Collapsible */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSection('howItWorks')}
                    className="flex items-center gap-2 w-full text-left group"
                  >
                    <motion.div
                      animate={{ rotate: expandedSections.howItWorks ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 text-neutral group-hover:text-neutral-dark dark:group-hover:text-white" />
                    </motion.div>
                    <Cog className="w-4 h-4 text-neutral-dark dark:text-white" />
                    <h3 className="text-sm font-bold text-neutral-dark dark:text-white">
                      How It Works
                    </h3>
                  </button>
                  <AnimatePresence>
                    {expandedSections.howItWorks && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-neutral dark:text-gray-400 whitespace-pre-line leading-relaxed mt-3 pl-6">
                          {focusedApproach.mechanism}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Tradeoffs - Collapsible */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSection('tradeoffs')}
                    className="flex items-center gap-2 w-full text-left group"
                  >
                    <motion.div
                      animate={{ rotate: expandedSections.tradeoffs ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 text-neutral group-hover:text-neutral-dark dark:group-hover:text-white" />
                    </motion.div>
                    <Scale className="w-4 h-4 text-neutral-dark dark:text-white" />
                    <h3 className="text-sm font-bold text-neutral-dark dark:text-white">
                      Tradeoffs
                    </h3>
                  </button>
                  <AnimatePresence>
                    {expandedSections.tradeoffs && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pl-6">
                          <TradeoffsDisplay tradeoffs={focusedApproach.tradeoffs} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Perspectives - Collapsible */}
                <div>
                  <button
                    onClick={() => toggleSection('perspectives')}
                    className="flex items-center gap-2 w-full text-left group"
                  >
                    <motion.div
                      animate={{ rotate: expandedSections.perspectives ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 text-neutral group-hover:text-neutral-dark dark:group-hover:text-white" />
                    </motion.div>
                    <Quote className="w-4 h-4 text-neutral-dark dark:text-white" />
                    <h3 className="text-sm font-bold text-neutral-dark dark:text-white">
                      Perspectives
                    </h3>
                  </button>
                  <AnimatePresence>
                    {expandedSections.perspectives && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pl-6">
                          <VoicesList
                            voices_support={focusedApproach.voices_support}
                            voices_opposition={focusedApproach.voices_opposition}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            )}
          </motion.div>

          {/* RIGHT COLUMN: Dropdown nav, Discussion, and Radar (expands when discussion expanded) */}
          <motion.div
            className={isDiscussionExpanded ? 'lg:col-span-3' : 'lg:col-span-2'}
            layout
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Sticky dropdown navigation - matches left column sticky height */}
            <div className="sticky top-[57px] z-30 bg-gray-50 dark:bg-gray-950">
              <motion.div
                className="bg-white dark:bg-gray-900 border-2 border-black dark:border-gray-600"
                animate={{
                  boxShadow: isSticky
                    ? '4px 0px 0px 0px rgba(0,0,0,1)'
                    : '4px 4px 0px 0px rgba(0,0,0,1)',
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <div className="flex items-stretch">
                  {/* Previous button */}
                  <button
                    onClick={goToPrevious}
                    className="px-3 py-4 border-r-2 border-black dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Previous approach"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Dropdown */}
                  <div className="flex-1 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                      className="w-full px-4 py-4 flex items-center justify-between gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-bold text-neutral shrink-0">
                          {focusedIndex + 1}/{problemArea.approaches.length}
                        </span>
                        <span className="font-bold text-sm text-neutral-dark dark:text-white truncate">
                          {focusedApproach?.title}
                        </span>
                        {ratings[focusedApproach?.id || ''] !== undefined && (
                          <span className="text-base shrink-0">
                            {{ [-2]: '😠', [-1]: '🙁', 0: '😐', 1: '🙂', 2: '😀' }[ratings[focusedApproach?.id || '']!]}
                          </span>
                        )}
                      </div>
                      <motion.div
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 shrink-0" />
                      </motion.div>
                    </button>

                    {/* Dropdown menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-2 border-t-0 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-h-64 overflow-y-auto z-50"
                        >
                          {problemArea.approaches.map((approach, i) => {
                            const isCurrent = i === focusedIndex;
                            const hasRating = ratings[approach.id] !== undefined;
                            const ratingFace: Record<number, string> = { [-2]: '😠', [-1]: '🙁', 0: '😐', 1: '🙂', 2: '😀' };

                            return (
                              <button
                                key={approach.id}
                                onClick={() => {
                                  setFocusedIndex(i);
                                  setIsDropdownOpen(false);
                                }}
                                className={`
                                  w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all border-b border-gray-200 dark:border-gray-700 last:border-b-0
                                  ${isCurrent
                                    ? 'bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] text-white font-bold'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                  }
                                `}
                              >
                                <span className={`text-xs font-mono w-5 text-center shrink-0 ${
                                  isCurrent ? 'text-white/80' : 'text-gray-400'
                                }`}>
                                  {i + 1}
                                </span>
                                <span className="flex-1 truncate">
                                  {approach.title}
                                </span>
                                {hasRating && (
                                  <span className="text-base shrink-0">
                                    {ratingFace[ratings[approach.id]!]}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Next button */}
                  <button
                    onClick={goToNext}
                    className="px-3 py-4 border-l-2 border-black dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Next approach"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Collapsible Forum Discussion */}
            <motion.div
              className="mt-4 bg-white dark:bg-gray-900 border-2 border-black dark:border-gray-600"
              animate={{
                boxShadow: isDiscussionExpanded
                  ? '6px 6px 0px 0px rgba(0,0,0,1)'
                  : '4px 4px 0px 0px rgba(0,0,0,1)',
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              layout
            >
              {/* Header with collapse/expand controls */}
              <div className="flex items-center justify-between px-4 py-3 border-b-0">
                {/* Left side: icon, label, count */}
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-bold text-neutral-dark dark:text-white">
                    Discussion
                  </span>
                  <span className="text-xs text-neutral dark:text-gray-400">
                    ({totalComments} comments)
                  </span>
                </div>

                {/* Right side: expand icon (when open) + collapse caret */}
                <div className="flex items-center gap-1">
                  {/* Expand/shrink button - only visible when discussion is open */}
                  <AnimatePresence>
                    {isDiscussionOpen && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setIsDiscussionExpanded(!isDiscussionExpanded)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                        aria-label={isDiscussionExpanded ? 'Shrink discussion' : 'Expand discussion'}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isDiscussionExpanded ? (
                          <Minimize2 className="w-4 h-4" />
                        ) : (
                          <Maximize2 className="w-4 h-4" />
                        )}
                      </motion.button>
                    )}
                  </AnimatePresence>

                  {/* Collapse/expand caret - always visible */}
                  <button
                    onClick={() => setIsDiscussionOpen(!isDiscussionOpen)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                    aria-label={isDiscussionOpen ? 'Collapse discussion' : 'Open discussion'}
                  >
                    <motion.div
                      animate={{ rotate: isDiscussionOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {isDiscussionOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t-2 border-black dark:border-gray-600">
                      {/* New comment form at top */}
                      <div className="p-4 border-b-2 border-gray-200 dark:border-gray-700">
                        <textarea
                          placeholder="Share your thoughts on this approach..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 text-sm border-2 border-black dark:border-gray-600 bg-white dark:bg-gray-800 text-neutral-dark dark:text-white placeholder:text-neutral focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] resize-none"
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={() => handlePostComment(newComment)}
                            disabled={!newComment.trim()}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] text-white border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                          >
                            <Send className="w-4 h-4" />
                            Post
                          </button>
                        </div>
                      </div>

                      {/* Discussion threads */}
                      <div className={`overflow-y-auto ${isDiscussionExpanded ? '' : 'max-h-72'} transition-all duration-300`}>
                        {discussionPosts.length === 0 ? (
                          <p className="text-sm text-neutral text-center py-8">
                            Be the first to comment on this approach
                          </p>
                        ) : (
                          <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {discussionPosts.map((thread) => (
                              <div key={thread.id} className="p-4">
                                {/* Main post */}
                                <div className="flex items-start gap-3">
                                  <div className="flex-1">
                                    {/* Author header */}
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-bold text-sm text-neutral-dark dark:text-white">
                                        {thread.authorName}
                                        {thread.authorId === 'current-user' && (
                                          <span className="text-neutral dark:text-gray-400 font-normal ml-1">(you)</span>
                                        )}
                                      </span>
                                      {thread.authorStance && (
                                        <span className={`text-xs px-2 py-0.5 rounded-full border ${STANCE_COLORS[thread.authorStance]}`}>
                                          {STANCE_LABELS[thread.authorStance]}
                                        </span>
                                      )}
                                    </div>

                                    {/* Content */}
                                    <p className="text-sm text-neutral-dark dark:text-gray-300 whitespace-pre-wrap">
                                      {thread.content}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex items-center gap-4 mt-2">
                                      <span className="text-xs text-neutral dark:text-gray-500">
                                        {formatTimeAgo(thread.createdAt)}
                                      </span>
                                      <button
                                        onClick={() => setReplyingTo(replyingTo === thread.id ? null : thread.id)}
                                        className="text-xs text-[#2F3BBD] hover:opacity-80"
                                      >
                                        Reply
                                      </button>
                                      {thread.authorId !== 'current-user' && (
                                        <button className="text-xs text-neutral dark:text-gray-500 hover:text-red-500 flex items-center gap-1">
                                          <Flag className="w-3 h-3" />
                                          Flag
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Replies */}
                                {thread.replies.length > 0 && (
                                  <div className="mt-3 ml-6 border-l-2 border-gray-200 dark:border-gray-700 pl-4 space-y-3">
                                    {thread.replies.map((reply) => (
                                      <div key={reply.id} className="flex items-start gap-2">
                                        <CornerDownRight className="w-4 h-4 text-neutral dark:text-gray-500 mt-1 flex-shrink-0" />
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-sm text-neutral-dark dark:text-white">
                                              {reply.authorName}
                                              {reply.authorId === 'current-user' && (
                                                <span className="text-neutral dark:text-gray-400 font-normal ml-1">(you)</span>
                                              )}
                                            </span>
                                            {reply.authorStance && (
                                              <span className={`text-xs px-2 py-0.5 rounded-full border ${STANCE_COLORS[reply.authorStance]}`}>
                                                {STANCE_LABELS[reply.authorStance]}
                                              </span>
                                            )}
                                          </div>
                                          <p className="text-sm text-neutral-dark dark:text-gray-300 whitespace-pre-wrap">
                                            {reply.content}
                                          </p>
                                          <span className="text-xs text-neutral dark:text-gray-500 mt-1 inline-block">
                                            {formatTimeAgo(reply.createdAt)}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Reply form */}
                                <AnimatePresence>
                                  {replyingTo === thread.id && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mt-3 ml-6 pt-3 border-t border-gray-200 dark:border-gray-700">
                                        <textarea
                                          placeholder={`Reply to ${thread.authorName}...`}
                                          value={replyContent}
                                          onChange={(e) => setReplyContent(e.target.value)}
                                          rows={2}
                                          className="w-full px-3 py-2 text-sm border-2 border-black dark:border-gray-600 bg-white dark:bg-gray-800 text-neutral-dark dark:text-white placeholder:text-neutral focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] resize-none"
                                        />
                                        <div className="flex justify-end gap-2 mt-2">
                                          <button
                                            onClick={() => setReplyingTo(null)}
                                            className="px-3 py-1 text-sm text-neutral hover:text-neutral-dark dark:hover:text-white"
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            onClick={() => handlePostComment(replyContent, thread.id)}
                                            disabled={!replyContent.trim()}
                                            className="flex items-center gap-1 px-3 py-1 text-sm font-bold bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] text-white border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                                          >
                                            <Send className="w-3 h-3" />
                                            Reply
                                          </button>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Radar card */}
            <Card variant="default" padding="md" className="mt-4">
              <PreferenceRadar
                focusedApproachId={focusedApproach?.id}
                userProfile={userProfile}
                approachTitles={approachTitles}
                height={280}
                primaryColor="#8B5CF6"
              />

              {/* Collapsed context */}
              <details className="mt-4 border-t-2 border-black dark:border-gray-600 pt-4">
                <summary className="text-sm font-bold cursor-pointer text-neutral hover:text-neutral-dark dark:hover:text-white">
                  About {problemArea.shortTitle}
                </summary>
                <p className="mt-3 text-sm text-neutral dark:text-gray-400 leading-relaxed">{problemArea.description}</p>
              </details>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Sticky footer - neobrutalist */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t-2 border-black dark:border-gray-600 py-4 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!isComplete ? (
              <Badge variant="secondary">
                {progress.rated} of {progress.total} rated
              </Badge>
            ) : (
              <Badge variant="success" className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                All approaches rated
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/explore">
              <Button variant="ghost" size="sm">
                All Problems
              </Button>
            </Link>
            {isComplete && (
              <Link href="/explore/results">
                <Button variant="primary" leftIcon={<BarChart3 className="w-4 h-4" />}>
                  See Results
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
