'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ThumbsUp, ThumbsDown, Circle, ArrowLeft, Download, Share2, X } from 'lucide-react';
import { useVoting } from '@/contexts/VotingContext';

export default function VotesPage() {
  const [filter, setFilter] = useState<'all' | 'support' | 'oppose'>('all');
  const { votes, removeVote } = useVoting();

  // Convert votes object to array
  const votesArray = Object.values(votes);

  const filteredPolicies = votesArray.filter(vote => {
    if (filter === 'all') return true;
    return vote.vote === filter;
  });

  const supportCount = votesArray.filter(v => v.vote === 'support').length;
  const opposeCount = votesArray.filter(v => v.vote === 'oppose').length;

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

        {votesArray.length > 0 ? (
          <>
            {/* Stats (static - no shadows) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black border-4 border-black dark:border-gray-600 p-6">
                <div className="text-4xl font-display font-black text-white mb-2">{votesArray.length}</div>
                <div className="text-sm font-body text-white/90 font-bold">Total Votes</div>
              </div>
              <div className="bg-[#2F3BBD] border-4 border-black dark:border-gray-600 p-6">
                <div className="text-4xl font-display font-black text-white mb-2">{supportCount}</div>
                <div className="text-sm font-body text-white font-bold">Support</div>
              </div>
              <div className="bg-[#C91A2B] border-4 border-black dark:border-gray-600 p-6">
                <div className="text-4xl font-display font-black text-white mb-2">{opposeCount}</div>
                <div className="text-sm font-body text-white font-bold">Oppose</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 text-black dark:text-white border-4 border-black dark:border-gray-600 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(75,85,99,1)] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-150">
                <Download className="w-5 h-5" />
                <span>Export Votes</span>
              </button>
              <button className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 text-black dark:text-white border-4 border-black dark:border-gray-600 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(75,85,99,1)] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-150">
                <Share2 className="w-5 h-5" />
                <span>Share Results</span>
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-2 mt-8 mb-8 border-b-4 border-black dark:border-gray-600">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-3 font-display font-bold text-base border-4 border-b-0 border-black dark:border-gray-600 transition-colors ${
                  filter === 'all'
                    ? 'bg-black dark:bg-gray-800 text-white -mb-1'
                    : 'bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                All Votes ({votesArray.length})
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

            {/* Voted Policies List (static cards - no shadows) */}
            <div className="space-y-4">
              {filteredPolicies.map((vote) => (
                <div
                  key={vote.policyId}
                  className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display font-black text-xl text-black dark:text-white">
                            {vote.policyTitle}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-body font-medium text-gray-600 dark:text-gray-400">
                            {vote.averageSupport}% bipartisan support
                          </span>
                          <span className="font-body font-medium text-gray-500 dark:text-gray-500">
                            Voted {new Date(vote.votedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Vote badge (static - no shadow) */}
                        {vote.vote === 'support' ? (
                          <div className="flex items-center space-x-2 px-6 py-3 bg-[#2F3BBD] text-white border-2 border-black dark:border-gray-600 font-bold">
                            <ThumbsUp className="w-5 h-5" />
                            <span>Support</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 px-6 py-3 bg-[#C91A2B] text-white border-2 border-black dark:border-gray-600 font-bold">
                            <ThumbsDown className="w-5 h-5" />
                            <span>Oppose</span>
                          </div>
                        )}
                        {/* Remove button (interactive - has press effect) */}
                        <button
                          onClick={() => removeVote(vote.policyId)}
                          className="p-3 bg-white dark:bg-gray-700 text-black dark:text-white border-2 border-black dark:border-gray-600 font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(75,85,99,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(75,85,99,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all duration-150"
                          aria-label="Remove vote"
                        >
                          <X className="w-5 h-5" />
                        </button>
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
          </>
        ) : (
          // Empty state when no votes at all (static container - no shadow)
          <div className="text-center py-16 border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800">
            <Circle className="w-20 h-20 mx-auto mb-6 text-gray-400 dark:text-gray-600" />
            <h3 className="font-display font-black text-3xl text-gray-600 dark:text-gray-400 mb-4">
              No votes yet
            </h3>
            <p className="font-body text-lg text-gray-500 dark:text-gray-500 mb-8 max-w-md mx-auto">
              Start voting on policies to track your positions and see how your views align with America's consensus.
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[#2F3BBD] text-white font-bold border-4 border-black dark:border-gray-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(75,85,99,1)] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all duration-150 text-lg"
            >
              <span>Explore Top 10 Policies</span>
            </Link>
          </div>
        )}
      </div>

      {/* Call to Action (only show if there are votes) */}
      {votesArray.length > 0 && (
        <div className="mt-16 text-center">
          <Link
            href="/top20"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-[#2F3BBD] text-white font-bold border-4 border-black dark:border-gray-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(75,85,99,1)] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all duration-150 text-lg"
          >
            <span>Vote on More Policies</span>
          </Link>
        </div>
      )}
    </div>
  );
}
