'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Share2, ArrowLeft } from 'lucide-react';
import { RatingBadge, DynamicIcon } from '@/components/problem-areas';
import { Button, Card, Badge } from '@/components/education/ui';
import {
  getProblemAreas,
  getProblemAreaById,
  getProblemAreaProgress,
  getApproachesByStance,
  getAllApproaches,
  clearPreferences,
  loadPreferences,
} from '@/lib/problem-areas';

export default function ResultsPage() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading your results...</div>
      </div>
    );
  }

  const problemAreas = getProblemAreas();
  const stanceGroups = getApproachesByStance();
  const prefs = loadPreferences();

  // Calculate stats
  const totalRated = Object.keys(prefs?.implementationRatings || {}).length;
  const totalApproaches = getAllApproaches().length;
  const completedAreas = problemAreas.filter(
    (area) => getProblemAreaProgress(area.id).isComplete
  );

  // No ratings yet
  if (totalRated === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">No Results Yet</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explore some problem areas and rate approaches to see your results.
          </p>
          <Link href="/explore">
            <Button variant="primary">
              Start Exploring
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const handleShare = async () => {
    const shareText = `I explored ${completedAreas.length} problem areas on Civic Engine and rated ${totalRated} approaches. Here's where I stand...`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Civic Engine Results',
          text: shareText,
          url: window.location.href,
        });
      } catch (e) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(shareText + ' ' + window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to start over? This will clear all your ratings.')) {
      clearPreferences();
      window.location.href = '/explore';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
      {/* Header */}
      <div className="bg-[#2F3BBD] text-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to problems
          </Link>

          <h1 className="font-display text-4xl md:text-5xl font-black mb-4">
            Your Perspective
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Here&apos;s a summary of where you stand based on your ratings.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <div className="text-4xl font-black">{completedAreas.length}</div>
              <div className="text-sm text-white/60">Areas explored</div>
            </div>
            <div>
              <div className="text-4xl font-black">{totalRated}</div>
              <div className="text-sm text-white/60">Approaches rated</div>
            </div>
            <div>
              <div className="text-4xl font-black">
                {stanceGroups.stronglySupport.length + stanceGroups.support.length}
              </div>
              <div className="text-sm text-white/60">You support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-12">
        {/* Approaches you support */}
        <section>
          <h2 className="font-display text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">😀</span>
            Approaches You Support
          </h2>

          {(stanceGroups.stronglySupport.length > 0 || stanceGroups.support.length > 0) ? (
            <div className="grid gap-4">
              {[...stanceGroups.stronglySupport, ...stanceGroups.support].map((approach) => {
                const area = getProblemAreaById(approach.problemAreaId);

                return (
                  <Card key={approach.id} variant="default" padding="md">
                    <div className="flex items-start gap-4">
                      {area?.icon && (
                        <div
                          className="w-10 h-10 border-2 border-black dark:border-gray-600 flex items-center justify-center shrink-0"
                          style={{ backgroundColor: (area?.color || '#ccc') + '20' }}
                        >
                          <DynamicIcon
                            name={area.icon}
                            className="w-5 h-5"
                            style={{ color: area?.color }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs uppercase">
                            {area?.shortTitle}
                          </Badge>
                          <RatingBadge
                            rating={stanceGroups.stronglySupport.includes(approach) ? 2 : 1}
                            size="sm"
                          />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">
                          {approach.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {approach.summary}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 italic">You haven&apos;t supported any approaches yet.</p>
          )}
        </section>

        {/* Approaches you oppose */}
        <section>
          <h2 className="font-display text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">😠</span>
            Approaches You Oppose
          </h2>

          {(stanceGroups.stronglyOppose.length > 0 || stanceGroups.oppose.length > 0) ? (
            <div className="grid gap-4">
              {[...stanceGroups.stronglyOppose, ...stanceGroups.oppose].map((approach) => {
                const area = getProblemAreaById(approach.problemAreaId);

                return (
                  <Card key={approach.id} variant="default" padding="md">
                    <div className="flex items-start gap-4">
                      {area?.icon && (
                        <div
                          className="w-10 h-10 border-2 border-black dark:border-gray-600 flex items-center justify-center shrink-0"
                          style={{ backgroundColor: (area?.color || '#ccc') + '20' }}
                        >
                          <DynamicIcon
                            name={area.icon}
                            className="w-5 h-5"
                            style={{ color: area?.color }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs uppercase">
                            {area?.shortTitle}
                          </Badge>
                          <RatingBadge
                            rating={stanceGroups.stronglyOppose.includes(approach) ? -2 : -1}
                            size="sm"
                          />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">
                          {approach.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {approach.summary}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 italic">You haven&apos;t opposed any approaches yet.</p>
          )}
        </section>

        {/* Neutral */}
        {stanceGroups.neutral.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">😐</span>
              Neutral / Undecided
            </h2>
            <div className="flex flex-wrap gap-2">
              {stanceGroups.neutral.map((approach) => (
                <Badge key={approach.id} variant="secondary">
                  {approach.title}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* By Problem Area breakdown */}
        {completedAreas.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-black dark:text-white mb-6">
              Completed Problem Areas
            </h2>

            <div className="space-y-4">
              {completedAreas.map((area) => {
                // Find highest rated approach for this area
                const areaApproaches = [...stanceGroups.stronglySupport, ...stanceGroups.support]
                  .filter((a) => a.problemAreaId === area.id);
                const preferred = areaApproaches[0];

                return (
                  <Card key={area.id} variant="default" padding="lg">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 border-2 border-black dark:border-gray-600 flex items-center justify-center shrink-0"
                        style={{ backgroundColor: area.color + '20' }}
                      >
                        <DynamicIcon
                          name={area.icon}
                          className="w-6 h-6"
                          style={{ color: area.color }}
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          {area.title}
                        </h3>
                        {preferred ? (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Top preference:{' '}
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {preferred.title}
                            </span>
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500 italic mt-1">
                            No strong preference
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Continue exploring */}
        {completedAreas.length < problemAreas.length && (
          <Card variant="default" padding="lg" className="bg-gray-50 dark:bg-gray-800/50">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
              Keep Exploring
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You&apos;ve completed {completedAreas.length} of {problemAreas.length} problem areas.
              Explore more to build a fuller picture of your priorities.
            </p>
            <Link href="/explore">
              <Button variant="secondary">
                Explore more problems
              </Button>
            </Link>
          </Card>
        )}

        {/* Actions */}
        <section className="flex flex-wrap gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="primary"
            onClick={handleShare}
            leftIcon={<Share2 className="w-5 h-5" />}
          >
            {copied ? 'Copied!' : 'Share Results'}
          </Button>
          <Button
            variant="secondary"
            onClick={handleReset}
            leftIcon={<RefreshCw className="w-5 h-5" />}
          >
            Start Over
          </Button>
        </section>

        {/* Coming soon */}
        <Card variant="default" padding="lg" className="bg-gradient-to-r from-[#2F3BBD]/10 to-[#7C3AED]/10 border-dashed border-[#2F3BBD]/30">
          <h3 className="font-display text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Coming Soon: Candidate Matching
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            In Phase 2, we&apos;ll connect your preferences to local candidates who share your approach.
            You&apos;ll be able to find candidates running on what you believe — and take action.
          </p>
        </Card>
      </div>
    </main>
  );
}
