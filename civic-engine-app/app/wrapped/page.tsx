'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, RotateCcw, Search } from 'lucide-react';
import CategoryFilter, { type CategoryType } from '@/components/CategoryFilter';
import { getAllPoliciesSorted } from '@/data/policies';
import type { Policy } from '@/types/policy';
import {
  DEFAULT_MAX_PRIORITIES,
  clearWrappedProfile,
  loadWrappedProfile,
  upsertWrappedProfile,
} from '@/lib/policyWrappedProfile';

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

export default function WrappedPickerPage() {
  const router = useRouter();
  const allPolicies = useMemo(() => getAllPoliciesSorted(), []);

  const [firstName, setFirstName] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryType>('all');

  useEffect(() => {
    const existing = loadWrappedProfile();
    if (existing) {
      setFirstName(existing.firstName ?? '');
      setSelectedIds(existing.selectedPolicyIds ?? []);
    }
  }, []);

  const policyCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of allPolicies) {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    }
    return counts;
  }, [allPolicies]);

  const filteredPolicies = useMemo(() => {
    const q = normalize(search);
    return allPolicies.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (!q) return true;
      return normalize(p.title).includes(q) || normalize(p.description).includes(q);
    });
  }, [allPolicies, category, search]);

  const selectedPolicies = useMemo(() => {
    const map = new Map(allPolicies.map((p) => [p.id, p]));
    return selectedIds.map((id) => map.get(id)).filter(Boolean) as Policy[];
  }, [allPolicies, selectedIds]);

  const remaining = DEFAULT_MAX_PRIORITIES - selectedIds.length;

  const toggle = (policyId: string) => {
    setSelectedIds((prev) => {
      const exists = prev.includes(policyId);
      const next = exists ? prev.filter((x) => x !== policyId) : [...prev, policyId];
      if (!exists && next.length > DEFAULT_MAX_PRIORITIES) return prev;

      upsertWrappedProfile({
        firstName: firstName.trim() || undefined,
        selectedPolicyIds: next,
      });

      return next;
    });
  };

  const onReset = () => {
    clearWrappedProfile();
    setFirstName('');
    setSelectedIds([]);
    setSearch('');
    setCategory('all');
  };

  const onContinue = () => {
    upsertWrappedProfile({
      firstName: firstName.trim() || undefined,
      selectedPolicyIds: selectedIds,
    });
    router.push('/profile');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          ← Back to home
        </Link>
      </div>

      <section className="mb-10">
        <h1 className="font-display text-5xl sm:text-6xl font-black text-black dark:text-white mb-4 leading-tight">
          Policy Wrapped
        </h1>
        <p className="font-body text-lg text-gray-700 dark:text-gray-300 font-medium max-w-3xl">
          Pick your top priorities—this is your early “vote” for the issues you care about. Then you’ll get a
          shareable Policy Profile designed for stories and screenshots.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Controls */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display font-black text-xl text-black dark:text-white">
                  Your picks
                </p>
                <p className="font-body text-sm text-gray-700 dark:text-gray-300 font-medium">
                  Choose up to <span className="font-black">{DEFAULT_MAX_PRIORITIES}</span>.
                </p>
              </div>
              <button
                onClick={onReset}
                className="inline-flex items-center gap-2 px-3 py-2 border-2 border-black dark:border-gray-600 font-bold text-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                type="button"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            <div className="mt-4">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 border-2 border-black dark:border-gray-600">
                <div
                  className="h-full bg-[#2F3BBD]"
                  style={{
                    width: `${Math.min(100, (selectedIds.length / DEFAULT_MAX_PRIORITIES) * 100)}%`,
                  }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-sm font-bold text-gray-700 dark:text-gray-300">
                <span>{selectedIds.length} / {DEFAULT_MAX_PRIORITIES} selected</span>
                <span>{remaining > 0 ? `${remaining} left` : 'Maxed out'}</span>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                Optional: your first name (for “Shirley’s Key Issues”)
              </label>
              <input
                value={firstName}
                onChange={(e) => {
                  const v = e.target.value;
                  setFirstName(v);
                  upsertWrappedProfile({ firstName: v.trim() || undefined });
                }}
                placeholder="Shirley"
                className="w-full border-2 border-black dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 font-medium outline-none"
              />
            </div>

            <div className="mt-5">
              <button
                onClick={onContinue}
                disabled={selectedIds.length === 0}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 border-4 border-black font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all ${
                  selectedIds.length === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'
                    : 'bg-[#C91A2B] text-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1'
                }`}
              >
                Build my Policy Profile
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {selectedPolicies.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 p-5">
              <p className="font-display font-black text-lg text-black dark:text-white mb-3">
                Selected issues
              </p>
              <ul className="space-y-2">
                {selectedPolicies.map((p) => (
                  <li key={p.id} className="flex items-start justify-between gap-3">
                    <span className="font-body font-medium text-sm text-black dark:text-white">
                      {p.title}
                    </span>
                    <button
                      onClick={() => toggle(p.id)}
                      className="text-xs font-bold underline text-gray-700 dark:text-gray-300"
                      type="button"
                    >
                      remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: Picker */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)] p-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <p className="font-display font-black text-2xl text-black dark:text-white">
                  Pick priorities
                </p>
                <p className="font-body text-sm text-gray-700 dark:text-gray-300 font-medium">
                  Tap to add/remove. These are your “votes” for what should be tackled first.
                </p>
              </div>

              <div className="w-full sm:w-80">
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                  Search
                </label>
                <div className="flex items-center gap-2 border-2 border-black dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-900">
                  <Search className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="e.g. housing, AI, Social Security"
                    className="w-full bg-transparent outline-none text-sm font-medium text-black dark:text-white"
                  />
                </div>
              </div>
            </div>

            <CategoryFilter
              selectedCategory={category}
              onCategoryChange={setCategory}
              policyCounts={policyCounts}
            />

            <div className="grid grid-cols-1 gap-3">
              {filteredPolicies.slice(0, 60).map((p) => {
                const isSelected = selectedIds.includes(p.id);
                const isDisabled = !isSelected && selectedIds.length >= DEFAULT_MAX_PRIORITIES;

                return (
                  <button
                    key={p.id}
                    onClick={() => toggle(p.id)}
                    disabled={isDisabled}
                    className={`w-full text-left border-2 border-black dark:border-gray-600 p-4 transition-colors ${
                      isSelected
                        ? 'bg-[#2F3BBD] text-white'
                        : isDisabled
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    type="button"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-black text-base truncate">
                            {p.title}
                          </span>
                          <span className={`text-xs font-bold px-2 py-0.5 border ${
                            isSelected ? 'border-white/60' : 'border-black/30 dark:border-white/20'
                          }`}>
                            {p.category.replace('-', ' ')}
                          </span>
                        </div>
                        <p className={`mt-1 text-sm font-medium ${
                          isSelected ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {p.description}
                        </p>
                      </div>

                      <div className="flex-shrink-0 flex items-center gap-2">
                        <span className={`text-sm font-black ${isSelected ? 'text-white' : 'text-black dark:text-white'}`}>
                          {p.averageSupport}%
                        </span>
                        {isSelected && (
                          <span className="inline-flex items-center justify-center w-7 h-7 border-2 border-white">
                            <Check className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {filteredPolicies.length > 60 && (
              <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Showing the first 60 matches. Use search/filter to narrow down.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}


