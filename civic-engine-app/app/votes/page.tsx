'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ThumbsUp, ThumbsDown, Circle, ArrowLeft, Download, Share2 } from 'lucide-react';

// Mock data for voted policies
const mockVotedPolicies = [
  {
    id: 1,
    title: 'Universal Background Checks',
    averageSupport: 90,
    userVote: 'support',
    votedAt: '2025-11-15'
  },
  {
    id: 2,
    title: 'Voluntary National Service',
    averageSupport: 84,
    userVote: 'support',
    votedAt: '2025-11-15'
  },
  {
    id: 3,
    title: 'Shore Up Social Security ("Donut Hole")',
    averageSupport: 81,
    userVote: 'support',
    votedAt: '2025-11-14'
  },
  {
    id: 4,
    title: 'Junk Fee Prevention Act',
    averageSupport: 87,
    userVote: 'oppose',
    votedAt: '2025-11-14'
  },
  {
    id: 5,
    title: 'Ban Congressional Stock Trading',
    averageSupport: 76,
    userVote: 'support',
    votedAt: '2025-11-13'
  },
  {
    id: 6,
    title: 'Congressional Term Limits',
    averageSupport: 75,
    userVote: 'oppose',
    votedAt: '2025-11-13'
  },
];

export default function VotesPage() {
  const [filter, setFilter] = useState<'all' | 'support' | 'oppose'>('all');

  const filteredPolicies = mockVotedPolicies.filter(policy => {
    if (filter === 'all') return true;
    return policy.userVote === filter;
  });

  const supportCount = mockVotedPolicies.filter(p => p.userVote === 'support').length;
  const opposeCount = mockVotedPolicies.filter(p => p.userVote === 'oppose').length;

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
      <div className="mb-12">
        <h1 className="font-display text-6xl sm:text-7xl font-black text-black dark:text-white mb-6 leading-tight">
          My Votes
        </h1>
        <p className="font-body text-xl text-gray-700 dark:text-gray-300 font-medium max-w-3xl mb-8">
          Track your positions on consensus policies. See how your views align with America's bipartisan support.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
            <div className="text-4xl font-display font-black text-black dark:text-white mb-2">{mockVotedPolicies.length}</div>
            <div className="text-sm font-body text-gray-700 dark:text-gray-300 font-bold">Total Votes</div>
          </div>
          <div className="bg-[#2F3BBD] border-4 border-black dark:border-gray-600 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
            <div className="text-4xl font-display font-black text-white mb-2">{supportCount}</div>
            <div className="text-sm font-body text-white font-bold">Support</div>
          </div>
          <div className="bg-[#C91A2B] border-4 border-black dark:border-gray-600 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
            <div className="text-4xl font-display font-black text-white mb-2">{opposeCount}</div>
            <div className="text-sm font-body text-white font-bold">Oppose</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <button className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 text-black dark:text-white border-4 border-black dark:border-gray-600 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] hover:opacity-90 transition-opacity">
            <Download className="w-5 h-5" />
            <span>Export Votes</span>
          </button>
          <button className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 text-black dark:text-white border-4 border-black dark:border-gray-600 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] hover:opacity-90 transition-opacity">
            <Share2 className="w-5 h-5" />
            <span>Share Results</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-8 border-b-4 border-black dark:border-gray-600">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-3 font-display font-bold text-base border-4 border-b-0 border-black dark:border-gray-600 transition-colors ${
            filter === 'all'
              ? 'bg-black dark:bg-gray-800 text-white -mb-1'
              : 'bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}
        >
          All Votes ({mockVotedPolicies.length})
        </button>
        <button
          onClick={() => setFilter('support')}
          className={`px-6 py-3 font-display font-bold text-base border-4 border-b-0 border-black dark:border-gray-600 transition-colors ${
            filter === 'support'
              ? 'bg-[#2F3BBD] text-white -mb-1'
              : 'bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}
        >
          Support ({supportCount})
        </button>
        <button
          onClick={() => setFilter('oppose')}
          className={`px-6 py-3 font-display font-bold text-base border-4 border-b-0 border-black dark:border-gray-600 transition-colors ${
            filter === 'oppose'
              ? 'bg-[#C91A2B] text-white -mb-1'
              : 'bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}
        >
          Oppose ({opposeCount})
        </button>
      </div>

      {/* Voted Policies List */}
      <div className="space-y-4">
        {filteredPolicies.map((policy) => (
          <div
            key={policy.id}
            className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] overflow-hidden"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-black text-xl text-black dark:text-white">
                      {policy.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-body font-medium text-gray-600 dark:text-gray-400">
                      {policy.averageSupport}% bipartisan support
                    </span>
                    <span className="font-body font-medium text-gray-500 dark:text-gray-500">
                      Voted {new Date(policy.votedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {policy.userVote === 'support' ? (
                    <div className="flex items-center space-x-2 px-6 py-3 bg-[#2F3BBD] text-white border-2 border-black dark:border-gray-600 font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(75,85,99,1)]">
                      <ThumbsUp className="w-5 h-5" />
                      <span>Support</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 px-6 py-3 bg-[#C91A2B] text-white border-2 border-black dark:border-gray-600 font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(75,85,99,1)]">
                      <ThumbsDown className="w-5 h-5" />
                      <span>Oppose</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State for filtered views */}
      {filteredPolicies.length === 0 && (
        <div className="text-center py-12">
          <Circle className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <h3 className="font-display font-black text-2xl text-gray-600 dark:text-gray-400 mb-2">
            No {filter} votes yet
          </h3>
          <p className="font-body text-gray-500 dark:text-gray-500">
            {filter === 'support' ? 'You haven\'t supported any policies yet.' : 'You haven\'t opposed any policies yet.'}
          </p>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <Link
          href="/top20"
          className="inline-flex items-center space-x-2 px-8 py-4 bg-[#2F3BBD] text-white hover:opacity-90 transition-opacity font-bold border-4 border-black dark:border-gray-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] text-lg"
        >
          <span>Vote on More Policies</span>
        </Link>
      </div>
    </div>
  );
}
