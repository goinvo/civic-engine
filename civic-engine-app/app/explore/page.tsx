'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, BarChart3, Users, Megaphone, Eye } from 'lucide-react';
import { DynamicIcon } from '@/components/problem-areas';
import { Button, Card, Badge, Progress } from '@/components/education/ui';
import {
  getProblemAreas,
  getProblemAreaProgress,
  getNationalConsensus,
} from '@/lib/problem-areas';

export default function ExplorePage() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<Record<string, { rated: number; total: number; isComplete: boolean }>>({});

  const problemAreas = getProblemAreas();
  const nationalConsensus = getNationalConsensus();

  // Load progress on mount
  useEffect(() => {
    setMounted(true);
    const loadedProgress: Record<string, { rated: number; total: number; isComplete: boolean }> = {};
    for (const area of problemAreas) {
      loadedProgress[area.id] = getProblemAreaProgress(area.id);
    }
    setProgress(loadedProgress);
  }, []);

  const completedCount = Object.values(progress).filter((p) => p.isComplete).length;
  const hasAnyProgress = Object.values(progress).some((p) => p.rated > 0);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-light dark:bg-gray-950">
      {/* Hero Header - The Hook */}
      <div className="bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] text-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Eyebrow */}
            <p className="text-white/80 text-sm font-bold uppercase tracking-wider mb-3">
              The consensus they don't want you to see
            </p>

            {/* Main headline */}
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Americans agree on more<br />than you think.
            </h1>

            {/* Subhead */}
            <p className="text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
              Politicians say we're divided. The media says we're enemies.
              <span className="font-bold"> But what if most of us actually agree?</span>
            </p>

            {/* Live stats */}
            <div className="flex flex-wrap gap-8 mb-8">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-white/70" />
                <div>
                  <div className="text-2xl font-black">{nationalConsensus.totalParticipants.toLocaleString()}</div>
                  <div className="text-sm text-white/70">Americans have weighed in</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-white/70" />
                <div>
                  <div className="text-2xl font-black">{nationalConsensus.averageConsensusPercent}%</div>
                  <div className="text-sm text-white/70">average agreement</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Megaphone className="w-6 h-6 text-white/70" />
                <div>
                  <div className="text-2xl font-black">{nationalConsensus.statesRepresented}</div>
                  <div className="text-sm text-white/70">states represented</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <p className="text-white/80 font-medium">
              Explore the issues. See where you stand. Discover you're not alone.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mirror/Megaphone explanation */}
      <div className="bg-white dark:bg-gray-900 border-b-2 border-black dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex gap-4"
            >
              <div className="w-12 h-12 bg-[#2F3BBD]/10 border-2 border-black flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6 text-[#2F3BBD]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-neutral-dark dark:text-white mb-1">The Mirror</h3>
                <p className="text-sm text-neutral dark:text-gray-400">
                  See what Americans actually believe — and discover that "most of us" agree on the big issues.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex gap-4"
            >
              <div className="w-12 h-12 bg-[#C91A2B]/10 border-2 border-black flex items-center justify-center shrink-0">
                <Megaphone className="w-6 h-6 text-[#C91A2B]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-neutral-dark dark:text-white mb-1">The Megaphone</h3>
                <p className="text-sm text-neutral dark:text-gray-400">
                  Add your voice to the consensus. Make it undeniable. Build pressure for change.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Progress summary (if any) */}
      {hasAnyProgress && (
        <div className="bg-neutral-light dark:bg-gray-900 border-b-2 border-black dark:border-gray-700">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant={completedCount === problemAreas.length ? 'success' : 'secondary'}>
                  {completedCount} of {problemAreas.length} completed
                </Badge>
                <span className="text-sm text-neutral dark:text-gray-400">
                  Your voice is being counted
                </span>
              </div>
              {completedCount > 0 && (
                <Link href="/explore/results">
                  <Button variant="ghost" size="sm" leftIcon={<BarChart3 className="w-4 h-4" />}>
                    View the Mandate
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Problem areas grid */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid gap-4">
          {problemAreas.map((area) => {
            const areaProgress = progress[area.id] || { rated: 0, total: 5, isComplete: false };
            const hasStarted = areaProgress.rated > 0;
            const progressPercent = Math.round((areaProgress.rated / areaProgress.total) * 100);

            return (
              <Link key={area.id} href={`/explore/${area.id}`}>
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
                        <h2 className="font-display font-bold text-xl text-black dark:text-white">
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
      </div>

      {/* Results CTA - show when at least one is complete */}
      {completedCount > 0 && (
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
    </main>
  );
}
