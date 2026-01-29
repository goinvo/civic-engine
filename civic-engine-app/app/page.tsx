'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HeartPulse,
  Home,
  Baby,
  Vote,
  TrendingUp,
  GraduationCap,
  ChevronRight,
} from 'lucide-react';
import { problemAreas } from '@/data/problem-areas/problem-areas';
import { allApproaches } from '@/data/problem-areas/approaches';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  HeartPulse,
  Home,
  Baby,
  Vote,
  TrendingUp,
  GraduationCap,
};

export default function HomePage() {
  const sortedAreas = [...problemAreas].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-8">
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Valence Issues
        </motion.h1>
        <motion.p
          className="text-sm text-neutral dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Policies with broad support across party lines, grouped by problem area.
        </motion.p>
      </div>

      {/* Problem areas with approaches */}
      <div className="max-w-3xl mx-auto px-4 pb-24 space-y-8">
        {sortedAreas.map((area, areaIndex) => {
          const Icon = ICON_MAP[area.icon];
          const approaches = allApproaches
            .filter((a) => a.problemAreaId === area.id)
            .sort((a, b) => a.order - b.order);

          return (
            <motion.section
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + areaIndex * 0.08 }}
            >
              {/* Problem area header */}
              <div className="flex items-center gap-3 mb-3">
                {Icon && (
                  <div
                    className="w-8 h-8 flex items-center justify-center border-2 border-black dark:border-gray-600"
                    style={{ backgroundColor: area.color }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                )}
                <h2 className="text-lg font-bold text-neutral-dark dark:text-white">
                  {area.title}
                </h2>
              </div>

              <p className="text-sm text-neutral dark:text-gray-400 mb-3">
                {area.coreQuestion}
              </p>

              {/* Approaches list */}
              <div className="border-2 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] divide-y-2 divide-black dark:divide-gray-600 bg-white dark:bg-gray-800">
                {approaches.map((approach) => (
                  <Link
                    key={approach.id}
                    href={`/results?area=${area.id}&approach=${approach.id}`}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-neutral-dark dark:text-white group-hover:text-[#2F3BBD] dark:group-hover:text-blue-400 transition-colors">
                        {approach.title}
                      </div>
                      <div className="text-xs text-neutral dark:text-gray-400 truncate">
                        {approach.summary}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral dark:text-gray-500 flex-shrink-0 ml-2 group-hover:text-[#2F3BBD] dark:group-hover:text-blue-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
