'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollPolicyList from '@/components/ScrollPolicyList';
import { getTopPolicies, getPoliciesCount } from '@/data/policies';
import { useValues } from '@/contexts/ValuesContext';
import { calculatePersonalizedScore } from '@/utils/impactScore';
import { policyImpactScores } from '@/data/policyScores';

type SortOption =
  | 'support'
  | 'personalized'
  | 'democrat'
  | 'republican'
  | 'independent'
  | 'population'
  | 'economic'
  | 'intensity'
  | 'duration'
  | 'equity'
  | 'externalities'
  | 'implementation';

type SortOptionGroup = {
  label: string;
  options: { value: SortOption; label: string; requiresProfile?: boolean }[];
};

const SORT_OPTION_GROUPS: SortOptionGroup[] = [
  {
    label: 'Support',
    options: [
      { value: 'support', label: 'Bipartisan Average' },
      { value: 'personalized', label: 'Your Score' },
    ],
  },
  {
    label: 'By Party',
    options: [
      { value: 'democrat', label: 'Democrat Support' },
      { value: 'republican', label: 'Republican Support' },
      { value: 'independent', label: 'Independent Support' },
    ],
  },
  {
    label: 'Impact Factors',
    options: [
      { value: 'population', label: 'Population Reach' },
      { value: 'economic', label: 'Economic Scale' },
      { value: 'intensity', label: 'Individual Impact' },
      { value: 'duration', label: 'Time Horizon' },
      { value: 'equity', label: 'Equity & Justice' },
      { value: 'externalities', label: 'Side Effects' },
      { value: 'implementation', label: 'Feasibility' },
    ],
  },
];

export default function Home() {
  const allTopPolicies = getTopPolicies(10);
  const totalPolicies = getPoliciesCount();
  const [navbarHeight, setNavbarHeight] = useState(0);
  const { hasCompletedOnboarding, profile } = useValues();
  const [sortBy, setSortBy] = useState<SortOption>('support');

  // Default weights - adjusted to reflect average American priorities
  const defaultWeights = {
    population: 0.12,
    economic: 0.12,
    intensity: 0.20,
    duration: 0.16,
    equity: 0.20,
    externalities: 0.10,
    implementation: 0.10,
  };

  const topTenPolicies = useMemo(() => {
    const policies = [...allTopPolicies];

    if (sortBy === 'support') {
      return policies; // Already sorted by support
    }

    if (sortBy === 'personalized') {
      // Use profile weights if available, otherwise use default weights
      const weights = profile?.weights || defaultWeights;
      return policies.sort((a, b) => {
        const scoreA = calculatePersonalizedScore(a.id, weights) || 0;
        const scoreB = calculatePersonalizedScore(b.id, weights) || 0;
        return scoreB - scoreA;
      });
    }

    // Sort by party support
    if (sortBy === 'democrat') {
      return policies.sort((a, b) => {
        const supportA = a.partySupport?.democrats || 0;
        const supportB = b.partySupport?.democrats || 0;
        return supportB - supportA;
      });
    }

    if (sortBy === 'republican') {
      return policies.sort((a, b) => {
        const supportA = a.partySupport?.republicans || 0;
        const supportB = b.partySupport?.republicans || 0;
        return supportB - supportA;
      });
    }

    if (sortBy === 'independent') {
      return policies.sort((a, b) => {
        const supportA = a.partySupport?.independents || 0;
        const supportB = b.partySupport?.independents || 0;
        return supportB - supportA;
      });
    }

    // Sort by impact factor
    return policies.sort((a, b) => {
      const impactA = policyImpactScores[a.id]?.breakdown[sortBy] || 0;
      const impactB = policyImpactScores[b.id]?.breakdown[sortBy] || 0;
      return impactB - impactA;
    });
  }, [allTopPolicies, sortBy, profile]);

  useEffect(() => {
    // Calculate navbar height
    const navbar = document.querySelector('nav');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  const scrollToPolicies = () => {
    const policiesSection = document.getElementById('policies-section');
    policiesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Full-Height Hero Section */}
      <section
        className="flex items-center justify-center relative px-6"
        style={{
          minHeight: `calc(100vh - ${navbarHeight}px)`,
          paddingBottom: '80px' // Extra space for scroll indicator
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display text-7xl sm:text-8xl md:text-9xl font-black text-black dark:text-white mb-8 leading-tight">
            What Most of Us<br />Agree On
          </h1>
          <p className={`font-body text-2xl text-gray-700 dark:text-gray-300 font-medium max-w-3xl mx-auto ${hasCompletedOnboarding ? 'mb-6' : 'mb-12'}`}>
            Discover the policies that unite Americans across party lines. Every policy shown has majority support from Democrats, Republicans, and Independents.
          </p>

          {/* Personalized Badge for users who completed onboarding */}
          {hasCompletedOnboarding && (
            <Link
              href="/profile"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#2F3BBD] text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all mb-12"
            >
              <Sparkles className="w-5 h-5" strokeWidth={2.5} />
              <span className="font-display font-bold text-sm">Personalized scores active</span>
            </Link>
          )}

          {/* Stats - Neobrutalist Cards - Patriotic Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-[#C91A2B] border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-6xl font-display font-black text-white">{totalPolicies}</div>
              <div className="text-base font-body text-white font-bold">Consensus Policies</div>
            </div>
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-6xl font-display font-black text-black">70%+</div>
              <div className="text-base font-body text-black font-bold">Average Support</div>
            </div>
            <div className="bg-[#2F3BBD] border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-6xl font-display font-black text-white">2025</div>
              <div className="text-base font-body text-white font-bold">Latest Data</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {!hasCompletedOnboarding && (
              <Link
                href="/values"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-[#C91A2B] text-white hover:opacity-90 transition-opacity font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-lg"
              >
                <Sparkles className="w-5 h-5" />
                <span>Get Personalized Scores</span>
              </Link>
            )}
            <Link
              href="/top20"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[#2F3BBD] text-white hover:opacity-90 transition-opacity font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-lg"
            >
              <span>View All {totalPolicies} Policies</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <motion.button
          onClick={scrollToPolicies}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-display font-bold text-sm text-gray-600 dark:text-gray-400 mb-2 group-hover:text-black dark:group-hover:text-white transition-colors">
            Scroll to explore
          </span>
          <div className="w-12 h-12 border-4 border-black bg-[#C91A2B] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:opacity-90 transition-opacity">
            <ChevronDown className="w-6 h-6 text-white" strokeWidth={3} />
          </div>
        </motion.button>
      </section>

      {/* Personalization Feature Section */}
      {!hasCompletedOnboarding && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="border-4 border-black dark:border-gray-600 bg-gradient-to-br from-[#2F3BBD] to-[#C91A2B] p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 bg-white border-4 border-black mx-auto mb-6 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#2F3BBD]" strokeWidth={2.5} />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-4">
                See Policies Through Your Values
              </h2>
              <p className="font-body text-xl text-white/90 font-medium mb-8">
                Get personalized impact scores for every policy based on what matters most to you—whether that's economic scale, helping the vulnerable, or long-term change.
              </p>
              <Link
                href="/values"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-black hover:bg-gray-100 transition-colors font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-lg"
              >
                <Sparkles className="w-5 h-5" />
                <span>Take the Values Pulse</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Policies Section with Scroll */}
      <section id="policies-section" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl font-black text-black dark:text-white mb-4">Top 10 Policies</h2>
          <p className="font-body text-xl text-gray-700 dark:text-gray-300 font-medium max-w-3xl mx-auto">
            {hasCompletedOnboarding
              ? 'Scroll through to explore each policy with your personalized impact scores.'
              : "Scroll through to explore each policy in detail. They'll automatically expand as you scroll."}
          </p>
        </div>

        <ScrollPolicyList
          policies={topTenPolicies}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOptionGroups={SORT_OPTION_GROUPS}
          hasProfile={!!profile}
        />

        <div className="mt-16 text-center">
          <Link
            href="/top20"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-[#C91A2B] text-white hover:opacity-90 transition-opacity font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-lg"
          >
            <span>See All {totalPolicies} Policies</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="font-display text-4xl font-black text-black dark:text-white mb-6">
          Data You Can Trust
        </h2>
        <p className="font-body text-lg text-gray-700 dark:text-gray-300 font-medium max-w-3xl mx-auto mb-6">
          All policy data comes from reputable, non-partisan polling organizations including YouGov, Pew Research Center, and the Associated Press-NORC. Each policy shown has documented support of at least 55% from Democrats, Republicans, and Independents.
        </p>
        <a
          href="https://americans-agree.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-bold underline text-lg"
        >
          <span>Explore the Data Source</span>
          <ArrowRight className="w-5 h-5" />
        </a>
      </section>
    </>
  );
}
