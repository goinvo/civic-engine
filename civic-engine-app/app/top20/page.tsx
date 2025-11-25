'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, ArrowUpDown, List, Table } from 'lucide-react';
import PolicyListItem from '@/components/PolicyListItem';
import PolicyTable from '@/components/PolicyTable';
import { getAllPoliciesSorted } from '@/data/policies';
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
  options: { value: SortOption; label: string }[];
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

// Get the current sort option label for display
const getSortLabel = (sortBy: SortOption): string => {
  for (const group of SORT_OPTION_GROUPS) {
    const option = group.options.find(o => o.value === sortBy);
    if (option) return option.label;
  }
  return 'Bipartisan Average';
};

type ViewMode = 'list' | 'table';

export default function Top20Page() {
  const allPolicies = getAllPoliciesSorted();
  const { profile } = useValues();
  const [sortBy, setSortBy] = useState<SortOption>('support');
  const [viewMode, setViewMode] = useState<ViewMode>('list');

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

  const sortedPolicies = useMemo(() => {
    const policies = [...allPolicies];

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
  }, [allPolicies, sortBy, profile]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Top 10</span>
        </Link>
      </div>

      {/* Header - Left Aligned */}
      <section className="mb-16">
        <h1 className="font-display text-6xl sm:text-7xl font-black text-black dark:text-white mb-6 leading-tight">
          All {allPolicies.length} Policies
        </h1>
        <p className="font-body text-xl text-gray-700 dark:text-gray-300 font-medium max-w-3xl mb-10">
          Every policy shown has majority support from Democrats, Republicans, and Independents. These are the issues that unite Americans across party lines.
        </p>

        {/* Stats - Neobrutalist Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#C91A2B] border-4 border-black dark:border-gray-600 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
            <div className="text-4xl font-display font-black text-white">{allPolicies.length}</div>
            <div className="text-sm font-body text-white font-bold">Total Policies</div>
          </div>
          <div className="bg-white dark:bg-gray-700 border-4 border-black dark:border-gray-600 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
            <div className="text-4xl font-display font-black text-black dark:text-white">76%</div>
            <div className="text-sm font-body text-black dark:text-gray-300 font-bold">Avg Support</div>
          </div>
          <div className="bg-[#2F3BBD] border-4 border-black dark:border-gray-600 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
            <div className="text-4xl font-display font-black text-white">55%+</div>
            <div className="text-sm font-body text-white font-bold">Min Bipartisan</div>
          </div>
          <div className="bg-white dark:bg-gray-700 border-4 border-black dark:border-gray-600 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
            <div className="text-4xl font-display font-black text-black dark:text-white">2025</div>
            <div className="text-sm font-body text-black dark:text-gray-300 font-bold">Latest Data</div>
          </div>
        </div>
      </section>

      {/* All Policies List */}
      <section className="mb-16">
        <h2 className="font-display text-4xl font-black text-black dark:text-white mb-2">Complete List</h2>

        {/* Description - desktop only */}
        <p className="hidden sm:block font-body text-gray-700 dark:text-gray-300 font-medium mb-6">
          {sortBy === 'support' && 'Ranked by average bipartisan support across recent polling data.'}
          {sortBy === 'personalized' && (profile ? 'Ranked by your personalized impact scores.' : 'Ranked by balanced impact scores (take the Values Pulse for personalized ranking).')}
          {sortBy === 'democrat' && 'Ranked by Democratic voter support.'}
          {sortBy === 'republican' && 'Ranked by Republican voter support.'}
          {sortBy === 'independent' && 'Ranked by Independent voter support.'}
          {!['support', 'personalized', 'democrat', 'republican', 'independent'].includes(sortBy) && `Ranked by ${getSortLabel(sortBy)}.`}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          {/* Description - mobile, appears above dropdown */}
          <p className="sm:hidden font-body text-gray-700 dark:text-gray-300 font-medium mb-3">
            {sortBy === 'support' && 'Ranked by average bipartisan support across recent polling data.'}
            {sortBy === 'personalized' && (profile ? 'Ranked by your personalized impact scores.' : 'Ranked by balanced impact scores.')}
            {sortBy === 'democrat' && 'Ranked by Democratic voter support.'}
            {sortBy === 'republican' && 'Ranked by Republican voter support.'}
            {sortBy === 'independent' && 'Ranked by Independent voter support.'}
            {!['support', 'personalized', 'democrat', 'republican', 'independent'].includes(sortBy) && `Ranked by ${getSortLabel(sortBy)}.`}
          </p>

          {/* Controls: Sort + View Toggle */}
          <div className="sm:ml-auto relative z-10 flex items-end sm:items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative inline-block flex-1 sm:flex-none">
              <label htmlFor="sort-select" className="block sm:hidden font-display font-bold text-xs text-gray-600 dark:text-gray-400 mb-1">
                Sort by
              </label>
              <label htmlFor="sort-select" className="hidden sm:block sr-only">Sort policies by</label>

              {/* Mobile: Simple dropdown */}
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="sm:hidden w-full font-display font-bold text-sm text-black dark:text-white bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 px-3 py-2 rounded outline-none cursor-pointer"
              >
                {SORT_OPTION_GROUPS.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>

              {/* Desktop: Neobrutalist box */}
              <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)]">
                <ArrowUpDown className="w-4 h-4 text-black dark:text-white" strokeWidth={2.5} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="font-display font-bold text-sm text-black dark:text-white bg-transparent border-none outline-none cursor-pointer pr-8"
                >
                  {SORT_OPTION_GROUPS.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex">
              {/* Mobile: Simple buttons */}
              <div className="sm:hidden flex border-2 border-gray-300 dark:border-gray-600 rounded overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-gray-800 text-black dark:text-white'}`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 ${viewMode === 'table' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-gray-800 text-black dark:text-white'}`}
                  aria-label="Table view"
                >
                  <Table className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>

              {/* Desktop: Neobrutalist buttons */}
              <div className="hidden sm:flex border-4 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)]">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 border-l-4 border-black dark:border-gray-600 ${viewMode === 'table' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
                  aria-label="Table view"
                >
                  <Table className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
            {sortedPolicies.map((policy, index) => (
              <PolicyListItem
                key={policy.id}
                policy={policy}
                displayRank={index + 1}
                showPersonalizedScore={sortBy === 'personalized'}
              />
            ))}
          </div>
        ) : (
          <PolicyTable policies={sortedPolicies} />
        )}
      </section>

      {/* Compare CTA removed */}

      {/* Data Source Info */}
      <section className="mb-16">
        <h2 className="font-display text-4xl font-black text-black dark:text-white mb-6">
          Data You Can Trust
        </h2>
        <p className="font-body text-gray-700 dark:text-gray-300 font-medium max-w-3xl mb-6">
          All policy data comes from reputable, non-partisan polling organizations including YouGov, Pew Research Center, and the Associated Press-NORC. Each policy shown has documented support of at least 55% from Democrats, Republicans, and Independents.
        </p>
        <a
          href="https://americans-agree.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-bold underline"
        >
          <span>Explore the Data Source</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
}
