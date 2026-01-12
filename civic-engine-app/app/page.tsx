'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Users,
  Megaphone,
  Eye,
  GraduationCap,
  MessageSquare,
  Award,
  Compass,
} from 'lucide-react';
import { DynamicIcon } from '@/components/problem-areas';
import { Button, Card, Badge, Progress, SegmentedControl } from '@/components/education/ui';
import ExpandablePolicyCard from '@/components/ExpandablePolicyCard';
import PolicyExpandedContent from '@/components/PolicyExpandedContent';
import ParticleWave from '@/components/ParticleWave';
import {
  getProblemAreas,
  getProblemAreaProgress,
  getNationalConsensus,
} from '@/lib/problem-areas';
import { getTopPolicies, getPoliciesCount } from '@/data/policies';

type ViewMode = 'problem-areas' | 'policies';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('problem-areas');
  const [progress, setProgress] = useState<Record<string, { rated: number; total: number; isComplete: boolean }>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const problemAreas = getProblemAreas();
  const nationalConsensus = getNationalConsensus();
  const topPolicies = getTopPolicies(10);
  const totalPolicies = getPoliciesCount();

  // Load progress and navbar height on mount
  useEffect(() => {
    setMounted(true);
    const navbar = document.querySelector('nav');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
    const loadedProgress: Record<string, { rated: number; total: number; isComplete: boolean }> = {};
    for (const area of problemAreas) {
      loadedProgress[area.id] = getProblemAreaProgress(area.id);
    }
    setProgress(loadedProgress);
  }, []);

  const completedCount = Object.values(progress).filter((p) => p.isComplete).length;
  const hasAnyProgress = Object.values(progress).some((p) => p.rated > 0);

  const scrollToContent = () => {
    const contentSection = document.getElementById('content-section');
    contentSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggle = (policyId: string) => {
    setExpandedId(expandedId === policyId ? null : policyId);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="flex items-center justify-center relative px-6 overflow-hidden"
        style={{
          minHeight: `calc(100vh - ${navbarHeight}px)`,
          paddingBottom: '80px'
        }}
      >
        <ParticleWave />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="relative px-6 py-10">
            <h1 className="text-6xl md:text-7xl font-black text-neutral-dark dark:text-white mb-6 leading-tight">
              Americans Agree on More<br />Than You Think
            </h1>

            <p className="text-lg text-neutral dark:text-gray-300 max-w-2xl mx-auto mb-10">
              Politicians say we're divided. The media says we're enemies. But what if most of us actually agree?
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-10">
              <motion.div
                className="bg-black border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                whileHover={{ y: -2 }}
              >
                <div className="text-3xl font-black text-white">{nationalConsensus.totalParticipants.toLocaleString()}</div>
                <div className="text-xs text-white/70">Americans</div>
              </motion.div>
              <motion.div
                className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                whileHover={{ y: -2 }}
              >
                <div className="text-3xl font-black text-neutral-dark">{nationalConsensus.averageConsensusPercent}%</div>
                <div className="text-xs text-neutral">Avg Agreement</div>
              </motion.div>
              <motion.div
                className="bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                whileHover={{ y: -2 }}
              >
                <div className="text-3xl font-black text-white">{nationalConsensus.statesRepresented}</div>
                <div className="text-xs text-white/70">States</div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 1 }}>
                <button
                  onClick={scrollToContent}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C91A2B] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Compass className="w-4 h-4" />
                  Explore the Issues
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              {hasAnyProgress && completedCount > 0 && (
                <motion.div whileHover={{ y: -2 }} whileTap={{ y: 1 }}>
                  <Link
                    href="/explore/results"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#2F3BBD] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Megaphone className="w-4 h-4" />
                    View the Mandate
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-sm text-neutral dark:text-gray-400 mb-2 group-hover:text-neutral-dark dark:group-hover:text-white transition-colors">
            Scroll to explore
          </span>
          <div className="w-10 h-10 border-2 border-black bg-[#C91A2B] flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <ChevronDown className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
        </motion.button>
      </section>

      {/* Content Section */}
      <section id="content-section" className="bg-neutral-light dark:bg-gray-950 relative z-20">
        {/* View toggle */}
        <div className="bg-white dark:bg-gray-900 border-y-2 border-black dark:border-gray-700">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <SegmentedControl
                options={[
                  { value: 'problem-areas', label: 'Problem Areas' },
                  { value: 'policies', label: 'Policies' },
                ]}
                value={viewMode}
                onChange={(value) => setViewMode(value as ViewMode)}
                size="md"
              />

              {/* Progress summary (if any) - only show in problem-areas view */}
              {viewMode === 'problem-areas' && hasAnyProgress && (
                <div className="flex items-center gap-4">
                  <Badge variant={completedCount === problemAreas.length ? 'success' : 'secondary'}>
                    {completedCount} of {problemAreas.length} completed
                  </Badge>
                  {completedCount > 0 && (
                    <Link href="/explore/results">
                      <Button variant="ghost" size="sm" leftIcon={<BarChart3 className="w-4 h-4" />}>
                        View the Mandate
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content based on view mode */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          {viewMode === 'problem-areas' ? (
            <motion.div
              key="problem-areas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Problem areas grid */}
              <div className="grid gap-4">
                {problemAreas.map((area) => {
                  const areaProgress = progress[area.id] || { rated: 0, total: 5, isComplete: false };
                  const hasStarted = areaProgress.rated > 0;
                  const progressPercent = Math.round((areaProgress.rated / areaProgress.total) * 100);

                  return (
                    <Link key={area.id} href={`/explore/${area.id}?from=home`}>
                      <Card
                        variant="default"
                        padding="lg"
                        className={`
                          group cursor-pointer transition-all
                          hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                          ${areaProgress.isComplete ? 'border-green-500' : ''}
                        `}
                      >
                        <div className="flex items-center gap-4">
                          {/* Icon */}
                          <div
                            className="w-14 h-14 border-2 border-black dark:border-gray-600 flex items-center justify-center shrink-0"
                            style={{ backgroundColor: area.color + '20' }}
                          >
                            <DynamicIcon
                              name={area.icon}
                              className="w-7 h-7"
                              style={{ color: area.color }}
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h2 className="font-bold text-xl text-black dark:text-white">
                                {area.title}
                              </h2>
                              {areaProgress.isComplete && (
                                <Badge variant="success" className="text-xs">Complete</Badge>
                              )}
                              {hasStarted && !areaProgress.isComplete && (
                                <Badge variant="warning" className="text-xs">In Progress</Badge>
                              )}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                              {area.description}
                            </p>

                            {/* Progress bar */}
                            <Progress
                              value={progressPercent}
                              variant={areaProgress.isComplete ? 'success' : 'primary'}
                              showLabel
                              label={`${areaProgress.rated}/${areaProgress.total} approaches`}
                            />
                          </div>

                          {/* Arrow */}
                          <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors shrink-0" />
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="policies"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Policies header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-white mb-3">
                  Top 10 Policies
                </h2>
                <p className="text-neutral dark:text-gray-400 max-w-xl mx-auto">
                  The policies with the highest bipartisan support. Click any policy to learn more.
                </p>
              </div>

              {/* Policies grid - switches to flex layout when a card is expanded */}
              <motion.div
                className={`
                  ${expandedId
                    ? 'flex flex-wrap gap-4 items-start'
                    : 'grid grid-cols-1 md:grid-cols-2 gap-4 items-start'
                  }
                `}
                layout
                transition={{ duration: 0.3 }}
              >
                {topPolicies.map((policy, index) => (
                  <motion.div
                    key={policy.id}
                    layout
                    className={`
                      ${expandedId === policy.id
                        ? 'w-full'
                        : expandedId
                          ? 'w-full md:w-[calc(25%-12px)]'
                          : 'w-full'
                      }
                    `}
                    transition={{ duration: 0.3 }}
                  >
                    <ExpandablePolicyCard
                      policy={policy}
                      rank={index + 1}
                      isExpanded={expandedId === policy.id}
                      isCollapsed={expandedId !== null && expandedId !== policy.id}
                      onToggle={() => handleToggle(policy.id)}
                    >
                      {expandedId === policy.id && <PolicyExpandedContent policy={policy} />}
                    </ExpandablePolicyCard>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-10 text-center">
                <motion.div className="inline-block" whileHover={{ y: -2 }} whileTap={{ y: 1 }}>
                  <Link
                    href="/top20"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#C91A2B] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    See All {totalPolicies} Policies
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results CTA - show when at least one problem area is complete (only in problem-areas view) */}
        {viewMode === 'problem-areas' && completedCount > 0 && (
          <div className="sticky bottom-0 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] text-white border-t-2 border-black py-4">
            <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
              <div>
                <p className="font-bold">
                  {completedCount === problemAreas.length
                    ? 'Your voice has been added to the consensus'
                    : `${completedCount} ${completedCount === 1 ? 'area' : 'areas'} completed — your voice is being counted`}
                </p>
                <p className="text-sm text-white/80">
                  See what most of us agree on
                </p>
              </div>
              <Link href="/explore/results">
                <Button
                  variant="secondary"
                  className="bg-white text-[#2F3BBD] border-2 border-black hover:bg-gray-100"
                  leftIcon={<Megaphone className="w-5 h-5" />}
                >
                  View the American Mandate
                </Button>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="bg-gray-100 dark:bg-gray-900 border-y-2 border-black dark:border-gray-600 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-neutral-dark dark:text-white mb-4">
            Data You Can Trust
          </h2>
          <p className="text-neutral dark:text-gray-400 mb-4">
            All policy data comes from reputable, non-partisan polling organizations including YouGov, Pew Research Center, and Associated Press-NORC. Each policy has 55%+ support from Democrats, Republicans, and Independents.
          </p>
          <motion.a
            href="https://americans-agree.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-neutral-dark dark:text-white font-bold border-b-2 border-current hover:text-[#C91A2B] transition-colors"
            whileHover={{ y: -1 }}
          >
            Explore the Data Source
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </section>

      {/* Education Section */}
      <section className="bg-[#2F3BBD] py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-4">
              <GraduationCap className="w-7 h-7 text-[#2F3BBD]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              For Educators
            </h2>
            <p className="text-white/80 max-w-xl mx-auto">
              Bring civic engagement to your classroom. Help students form evidence-based opinions and engage in respectful discourse.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Users, title: 'Class Cohorts', desc: 'Private spaces with simple join codes' },
              { icon: MessageSquare, title: 'Guided Discussion', desc: 'Structured debates with evidence' },
              { icon: Award, title: 'Anonymous Grading', desc: 'Grade reasoning, not positions' },
              { icon: GraduationCap, title: 'Civic Profiles', desc: 'Shareable engagement records' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                <div className="w-10 h-10 bg-[#E8EEFF] border-2 border-black flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-[#2F3BBD]" />
                </div>
                <h3 className="font-bold text-neutral-dark mb-1">{feature.title}</h3>
                <p className="text-sm text-neutral">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 1 }}>
              <Link
                href="/education/teacher"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#2F3BBD] font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Teacher Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 1 }}>
              <Link
                href="/education/student/onboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C91A2B] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Student Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <p className="text-center text-white/60 text-sm mt-4">
            Try the demo — no account required
          </p>
        </div>
      </section>
    </>
  );
}
