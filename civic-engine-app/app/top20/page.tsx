'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, ArrowUpDown, List, Table, Layers, LayoutList } from 'lucide-react';
import PolicyListItem from '@/components/PolicyListItem';
import PolicyTable from '@/components/PolicyTable';
import { getAllPoliciesSorted } from '@/data/policies';
import type { ProblemAreaId } from '@/types/problem-areas';

type SortOption = 'support' | 'democrat' | 'republican' | 'independent';

type SortOptionGroup = {
  label: string;
  options: { value: SortOption; label: string }[];
};

const SORT_OPTION_GROUPS: SortOptionGroup[] = [
  {
    label: 'Consensus',
    options: [
      { value: 'support', label: 'Bipartisan Average' },
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
];

const getSortLabel = (sortBy: SortOption): string => {
  for (const group of SORT_OPTION_GROUPS) {
    const option = group.options.find(o => o.value === sortBy);
    if (option) return option.label;
  }
  return 'Bipartisan Average';
};

const PROBLEM_AREA_LABELS: Record<ProblemAreaId | 'uncategorized', string> = {
  'healthcare-costs': 'Healthcare Costs',
  'housing-affordability': 'Housing Affordability',
  'childcare-family': 'Childcare & Family',
  'democratic-reform': 'Democratic Reform',
  'economic-opportunity': 'Economic Opportunity',
  'education-quality': 'Education Quality',
  'uncategorized': 'Other Policies',
};

type ViewMode = 'list' | 'table';

export default function Top20Page() {
  const allPolicies = getAllPoliciesSorted();
  const [sortBy, setSortBy] = useState<SortOption>('support');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [groupByCategory, setGroupByCategory] = useState(true);
  const [expandedPolicyId, setExpandedPolicyId] = useState<string | null>(null);

  const handleToggleExpand = (policyId: string) => {
    setExpandedPolicyId(expandedPolicyId === policyId ? null : policyId);
  };

  const sortedPolicies = useMemo(() => {
    const policies = [...allPolicies];

    if (sortBy === 'support') {
      return policies; // Already sorted by support
    }

    if (sortBy === 'democrat') {
      return policies.sort((a, b) => {
        return (b.partySupport?.democrats || 0) - (a.partySupport?.democrats || 0);
      });
    }

    if (sortBy === 'republican') {
      return policies.sort((a, b) => {
        return (b.partySupport?.republicans || 0) - (a.partySupport?.republicans || 0);
      });
    }

    if (sortBy === 'independent') {
      return policies.sort((a, b) => {
        return (b.partySupport?.independents || 0) - (a.partySupport?.independents || 0);
      });
    }

    return policies;
  }, [allPolicies, sortBy]);

  // Group policies by problem area
  type GroupKey = ProblemAreaId | 'uncategorized';
  const groupedPolicies = useMemo(() => {
    if (!groupByCategory) return null;

    const groups: Record<GroupKey, typeof sortedPolicies> = {} as Record<GroupKey, typeof sortedPolicies>;

    for (const policy of sortedPolicies) {
      const groupKey: GroupKey = policy.problemAreaId || 'uncategorized';
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(policy);
    }

    // Sort problem areas by number of policies (most first), with uncategorized last
    const sortedCategories = (Object.keys(groups) as GroupKey[]).sort((a, b) => {
      if (a === 'uncategorized') return 1;
      if (b === 'uncategorized') return -1;
      return groups[b].length - groups[a].length;
    });

    return { groups, sortedCategories };
  }, [sortedPolicies, groupByCategory]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <section className="mb-16">
        <h1 className="font-display text-6xl sm:text-7xl font-black text-black dark:text-white mb-6 leading-tight">
          All {allPolicies.length} Policies
        </h1>
        <p className="font-body text-xl text-gray-700 dark:text-gray-300 font-medium max-w-3xl mb-10">
          Every policy shown has majority support from Democrats, Republicans, and Independents. These are the issues that unite Americans across party lines.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-black dark:bg-gray-900 border-4 border-black dark:border-gray-600 p-6">
            <div className="text-4xl font-display font-black text-white">{allPolicies.length}</div>
            <div className="text-sm font-body text-white/80 font-bold">Total Policies</div>
          </div>
          <div className="bg-white dark:bg-gray-700 border-4 border-black dark:border-gray-600 p-6">
            <div className="text-4xl font-display font-black text-black dark:text-white">76%</div>
            <div className="text-sm font-body text-black dark:text-gray-300 font-bold">Avg Support</div>
          </div>
          <div className="bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] border-4 border-black dark:border-gray-600 p-6">
            <div className="text-4xl font-display font-black text-white">55%+</div>
            <div className="text-sm font-body text-white/80 font-bold">Min Bipartisan</div>
          </div>
          <div className="bg-white dark:bg-gray-700 border-4 border-black dark:border-gray-600 p-6">
            <div className="text-4xl font-display font-black text-black dark:text-white">2025</div>
            <div className="text-sm font-body text-black dark:text-gray-300 font-bold">Latest Data</div>
          </div>
        </div>
      </section>

      {/* Policies List */}
      <section className="mb-16">
        <h2 className="font-display text-4xl font-black text-black dark:text-white mb-2">Complete List</h2>

        <p className="font-body text-gray-700 dark:text-gray-300 font-medium mb-6">
          {sortBy === 'support' && 'Ranked by average bipartisan support across recent polling data.'}
          {sortBy === 'democrat' && 'Ranked by Democratic voter support.'}
          {sortBy === 'republican' && 'Ranked by Republican voter support.'}
          {sortBy === 'independent' && 'Ranked by Independent voter support.'}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          {/* Controls */}
          <div className="sm:ml-auto relative z-10 flex items-end sm:items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative inline-block flex-1 sm:flex-none">
              <label htmlFor="sort-select" className="block sm:hidden font-display font-bold text-xs text-gray-600 dark:text-gray-400 mb-1">
                Sort by
              </label>

              {/* Mobile */}
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

              {/* Desktop */}
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

            {/* Group Toggle */}
            <div className="flex">
              <div className="sm:hidden flex border-2 border-gray-300 dark:border-gray-600 rounded overflow-hidden">
                <button
                  onClick={() => setGroupByCategory(false)}
                  className={`p-2 ${!groupByCategory ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-gray-800 text-black dark:text-white'}`}
                  aria-label="Flat list"
                >
                  <LayoutList className="w-4 h-4" strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => setGroupByCategory(true)}
                  className={`p-2 ${groupByCategory ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-gray-800 text-black dark:text-white'}`}
                  aria-label="Group by category"
                >
                  <Layers className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>

              <div className="hidden sm:flex border-4 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)]">
                <button
                  onClick={() => setGroupByCategory(false)}
                  className={`p-2 ${!groupByCategory ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
                  aria-label="Flat list"
                  title="Flat list"
                >
                  <LayoutList className="w-5 h-5" strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => setGroupByCategory(true)}
                  className={`p-2 border-l-4 border-black dark:border-gray-600 ${groupByCategory ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
                  aria-label="Group by category"
                  title="Group by category"
                >
                  <Layers className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex">
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
          groupByCategory && groupedPolicies ? (
            // Grouped view
            <div className="space-y-8">
              {groupedPolicies.sortedCategories.map((problemArea) => (
                <div key={problemArea}>
                  <h3 className="font-display text-2xl font-black text-black dark:text-white mb-4 flex items-center gap-3">
                    {PROBLEM_AREA_LABELS[problemArea]}
                    <span className="text-sm font-bold text-neutral bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {groupedPolicies.groups[problemArea].length}
                    </span>
                  </h3>
                  <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
                    {groupedPolicies.groups[problemArea].map((policy, index) => (
                      <PolicyListItem
                        key={policy.id}
                        policy={policy}
                        displayRank={index + 1}
                        isExpanded={expandedPolicyId === policy.id}
                        onToggleExpand={() => handleToggleExpand(policy.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Flat list view
            <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
              {sortedPolicies.map((policy, index) => (
                <PolicyListItem
                  key={policy.id}
                  policy={policy}
                  displayRank={index + 1}
                  isExpanded={expandedPolicyId === policy.id}
                  onToggleExpand={() => handleToggleExpand(policy.id)}
                />
              ))}
            </div>
          )
        ) : (
          <PolicyTable policies={sortedPolicies} />
        )}
      </section>

      {/* Data Source */}
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
