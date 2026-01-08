'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, BarChart3 } from 'lucide-react';
import { DynamicIcon } from '@/components/problem-areas';
import { Button, Card, Badge, Progress } from '@/components/education/ui';
import {
  getProblemAreas,
  getProblemAreaProgress,
} from '@/lib/problem-areas';

export default function ExplorePage() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<Record<string, { rated: number; total: number; isComplete: boolean }>>({});

  const problemAreas = getProblemAreas();

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
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b-2 border-black dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="font-display text-4xl md:text-5xl font-black text-black dark:text-white mb-4">
            Explore the Issues
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
            Choose a problem area to explore. Learn about different approaches,
            weigh the tradeoffs, and share your perspective.
          </p>

          {/* Progress summary */}
          {hasAnyProgress && (
            <div className="mt-6 flex items-center gap-4">
              <Badge variant={completedCount === problemAreas.length ? 'success' : 'secondary'}>
                {completedCount} of {problemAreas.length} completed
              </Badge>
              {completedCount > 0 && (
                <Link href="/explore/results">
                  <Button variant="ghost" size="sm" leftIcon={<BarChart3 className="w-4 h-4" />}>
                    View your results
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

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
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t-2 border-black dark:border-gray-700 py-4">
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              {completedCount === problemAreas.length
                ? 'You\'ve explored all problem areas!'
                : `${completedCount} problem ${completedCount === 1 ? 'area' : 'areas'} completed`}
            </p>
            <Link href="/explore/results">
              <Button variant="primary" leftIcon={<BarChart3 className="w-5 h-5" />}>
                See Your Results
              </Button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
