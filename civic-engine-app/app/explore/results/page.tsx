'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RefreshCw, Share2, ArrowLeft, Megaphone, Users, CheckCircle2, Mail, Download, ExternalLink } from 'lucide-react';
import { RatingBadge, DynamicIcon, ConsensusBar } from '@/components/problem-areas';
import { Button, Card, Badge } from '@/components/education/ui';
import {
  getProblemAreas,
  getProblemAreaById,
  getProblemAreaProgress,
  getApproachesByStance,
  getAllApproaches,
  clearPreferences,
  loadPreferences,
  getAmericanMandate,
  getUserConsensusAlignment,
  getUserCivicIdentity,
  getApproachConsensus,
} from '@/lib/problem-areas';

export default function ResultsPage() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'mandate' | 'you'>('mandate');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading the American Mandate...</div>
      </div>
    );
  }

  const problemAreas = getProblemAreas();
  const stanceGroups = getApproachesByStance();
  const prefs = loadPreferences();
  const mandate = getAmericanMandate();
  const alignment = getUserConsensusAlignment();
  const civicIdentity = getUserCivicIdentity();

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
            Add your voice to the American Mandate by rating approaches.
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
    const shareText = `I added my voice to the American Mandate. ${mandate.summary.issuesWithConsensus} issues where most Americans agree — across party lines. See what we actually believe:`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'The American Mandate',
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
      {/* Hero Header - The Mandate */}
      <div className="bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] text-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to explore
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Megaphone className="w-8 h-8" />
              <h1 className="font-display text-4xl md:text-5xl font-black">
                The American Mandate
              </h1>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mb-8">
              What <span className="font-bold">{mandate.participantCount.toLocaleString()} Americans</span> across{' '}
              <span className="font-bold">{mandate.statesRepresented} states</span> actually believe —
              the consensus they don&apos;t want you to see.
            </p>

            {/* Key stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-black">{mandate.summary.issuesWithConsensus}</div>
                <div className="text-sm text-white/70">Issues with consensus</div>
              </div>
              <div>
                <div className="text-3xl font-black">{mandate.bipartisanItems.length}</div>
                <div className="text-sm text-white/70">Bipartisan agreements</div>
              </div>
              <div>
                <div className="text-3xl font-black">{mandate.summary.averageBipartisanAgreement}%</div>
                <div className="text-sm text-white/70">Avg. cross-party support</div>
              </div>
              <div>
                <div className="text-3xl font-black">{alignment?.alignmentPercent || 0}%</div>
                <div className="text-sm text-white/70">You align with consensus</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-white dark:bg-gray-900 border-b-2 border-black dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab('mandate')}
              className={`px-6 py-4 font-bold text-sm border-b-4 transition-colors ${
                activeTab === 'mandate'
                  ? 'border-[#2F3BBD] text-[#2F3BBD]'
                  : 'border-transparent text-neutral hover:text-neutral-dark dark:hover:text-white'
              }`}
            >
              <Megaphone className="w-4 h-4 inline mr-2" />
              The Mandate
            </button>
            <button
              onClick={() => setActiveTab('you')}
              className={`px-6 py-4 font-bold text-sm border-b-4 transition-colors ${
                activeTab === 'you'
                  ? 'border-[#C91A2B] text-[#C91A2B]'
                  : 'border-transparent text-neutral hover:text-neutral-dark dark:hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Your Voice
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {activeTab === 'mandate' ? (
          /* THE MANDATE TAB */
          <div className="space-y-12">
            {/* Consensus items - what most of us agree on */}
            <section>
              <h2 className="font-display text-2xl font-bold text-black dark:text-white mb-2">
                What Most of Us Agree On
              </h2>
              <p className="text-neutral dark:text-gray-400 mb-6">
                These approaches have support from {mandate.consensusThreshold}%+ of participants
              </p>

              <div className="grid gap-4">
                {mandate.consensusItems.slice(0, 10).map((item, index) => {
                  const area = getProblemAreaById(item.problemAreaId);
                  const consensus = getApproachConsensus(item.id);

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Card variant="default" padding="md">
                        <div className="flex items-start gap-4">
                          {area?.icon && (
                            <div
                              className="w-12 h-12 border-2 border-black dark:border-gray-600 flex items-center justify-center shrink-0"
                              style={{ backgroundColor: (area?.color || '#ccc') + '20' }}
                            >
                              <DynamicIcon
                                name={area.icon}
                                className="w-6 h-6"
                                style={{ color: area?.color }}
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <Badge variant="secondary" className="text-xs uppercase">
                                {area?.shortTitle}
                              </Badge>
                              <span className="text-lg font-black text-[#2F3BBD]">
                                {item.supportPercent}%
                              </span>
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-gray-100">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                              {item.description}
                            </p>

                            {/* Bipartisan breakdown */}
                            <div className="mt-3 flex items-center gap-4 text-xs">
                              <span className="text-neutral dark:text-gray-500">Support:</span>
                              <span className="font-bold text-blue-600">D {item.bipartisanSupport.democrat}%</span>
                              <span className="font-bold text-red-600">R {item.bipartisanSupport.republican}%</span>
                              <span className="font-bold text-purple-600">I {item.bipartisanSupport.independent}%</span>
                              {item.bipartisanSupport.democrat > 50 &&
                                item.bipartisanSupport.republican > 50 &&
                                item.bipartisanSupport.independent > 50 && (
                                  <span className="flex items-center gap-1 text-green-600 font-bold">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Bipartisan
                                  </span>
                                )}
                            </div>

                            {/* Consensus bar */}
                            {consensus && (
                              <div className="mt-3">
                                <ConsensusBar consensus={consensus} showLabels={false} />
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Take action section */}
            <section className="bg-gradient-to-r from-[#2F3BBD]/5 to-[#C91A2B]/5 border-2 border-black dark:border-gray-600 p-6">
              <h2 className="font-display text-2xl font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                <Megaphone className="w-6 h-6" />
                Make It Heard
              </h2>
              <p className="text-neutral-dark dark:text-gray-300 mb-6">
                This consensus exists. It&apos;s real. Now make it undeniable.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <Button
                  variant="primary"
                  onClick={handleShare}
                  leftIcon={<Share2 className="w-5 h-5" />}
                  className="w-full justify-center"
                >
                  {copied ? 'Copied!' : 'Share the Mandate'}
                </Button>
                <Button
                  variant="secondary"
                  leftIcon={<Mail className="w-5 h-5" />}
                  className="w-full justify-center"
                >
                  Email Your Rep
                </Button>
                <Button
                  variant="secondary"
                  leftIcon={<Download className="w-5 h-5" />}
                  className="w-full justify-center"
                >
                  Download Report
                </Button>
              </div>
            </section>

            {/* Coming soon */}
            <Card variant="default" padding="lg" className="bg-gradient-to-r from-[#2F3BBD]/10 to-[#7C3AED]/10 border-dashed border-[#2F3BBD]/30">
              <h3 className="font-display text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Coming Soon: Civic Infrastructure
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                The mandate is just the beginning. We&apos;re building citizen assemblies, accountability dashboards,
                and direct channels to power. Because we can&apos;t wait for elected officials. We must build it ourselves.
              </p>
            </Card>
          </div>
        ) : (
          /* YOUR VOICE TAB */
          <div className="space-y-12">
            {/* Civic identity */}
            {civicIdentity && (
              <section>
                <Card
                  variant="default"
                  padding="lg"
                  className="border-4"
                  style={{ borderColor: civicIdentity.identity.color }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-16 h-16 border-2 border-black flex items-center justify-center shrink-0"
                      style={{ backgroundColor: civicIdentity.identity.color + '20' }}
                    >
                      <DynamicIcon
                        name={civicIdentity.identity.icon}
                        className="w-8 h-8"
                        style={{ color: civicIdentity.identity.color }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral uppercase tracking-wider mb-1">
                        Your Civic Identity
                      </p>
                      <h2 className="text-2xl font-black text-neutral-dark dark:text-white mb-2">
                        {civicIdentity.identity.name}
                      </h2>
                      <p className="text-lg text-neutral dark:text-gray-400 mb-4">
                        {civicIdentity.identity.tagline}
                      </p>
                      <p className="text-sm text-neutral-dark dark:text-gray-300">
                        {civicIdentity.identity.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {civicIdentity.identity.characteristics.map((char) => (
                          <Badge key={char} variant="secondary">
                            {char}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </section>
            )}

            {/* Alignment with consensus */}
            {alignment && (
              <section>
                <h2 className="font-display text-2xl font-bold text-black dark:text-white mb-2">
                  Your Alignment with Most Americans
                </h2>
                <p className="text-neutral dark:text-gray-400 mb-6">
                  {alignment.summary}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Where you agree */}
                  <div>
                    <h3 className="font-bold text-lg text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Where You&apos;re With the Majority
                    </h3>
                    <div className="space-y-2">
                      {alignment.alignedWith.slice(0, 5).map((item) => (
                        <div
                          key={item.approachId}
                          className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                        >
                          <span className="text-sm font-medium text-neutral-dark dark:text-white">
                            {item.title}
                          </span>
                          <span className="text-sm font-bold text-green-700 dark:text-green-400">
                            {item.consensusPercent}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Where you differ */}
                  {alignment.differsFrom.length > 0 && (
                    <div>
                      <h3 className="font-bold text-lg text-orange-700 dark:text-orange-400 mb-3">
                        Where You Differ
                      </h3>
                      <div className="space-y-2">
                        {alignment.differsFrom.slice(0, 5).map((item) => (
                          <div
                            key={item.approachId}
                            className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
                          >
                            <span className="text-sm font-medium text-neutral-dark dark:text-white">
                              {item.title}
                            </span>
                            <span className="text-sm text-orange-700 dark:text-orange-400">
                              Majority {item.consensusDirection}s
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* What you support/oppose */}
            <section>
              <h2 className="font-display text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-2">
                <span className="text-2xl" aria-hidden="true">😀</span>
                Approaches You Support
              </h2>

              {(stanceGroups.stronglySupport.length > 0 || stanceGroups.support.length > 0) ? (
                <div className="grid gap-4">
                  {[...stanceGroups.stronglySupport, ...stanceGroups.support].map((approach) => {
                    const area = getProblemAreaById(approach.problemAreaId);
                    const consensus = getApproachConsensus(approach.id);

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
                            {consensus && (
                              <p className="text-sm text-[#2F3BBD] font-medium mt-1">
                                You + {consensus.supportPercent}% of Americans
                              </p>
                            )}
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

            {/* Continue exploring */}
            {completedAreas.length < problemAreas.length && (
              <Card variant="default" padding="lg" className="bg-gray-50 dark:bg-gray-800/50">
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  Keep Adding Your Voice
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You&apos;ve completed {completedAreas.length} of {problemAreas.length} problem areas.
                  The more you rate, the stronger the mandate becomes.
                </p>
                <Link href="/explore">
                  <Button variant="secondary">
                    Continue Exploring
                  </Button>
                </Link>
              </Card>
            )}

            {/* Actions */}
            <section className="flex flex-wrap gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="secondary"
                onClick={handleReset}
                leftIcon={<RefreshCw className="w-5 h-5" />}
              >
                Start Over
              </Button>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
