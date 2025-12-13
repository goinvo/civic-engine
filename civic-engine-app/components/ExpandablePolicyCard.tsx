'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Plus, ArrowUpRight } from 'lucide-react';
import { Policy } from '@/types/policy';

interface ExpandablePolicyCardProps {
  policy: Policy;
  rank: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ExpandablePolicyCard({
  policy,
  rank,
  isExpanded,
  onToggle,
}: ExpandablePolicyCardProps) {
  return (
    <motion.div
      layout
      className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] overflow-hidden"
    >
      {/* Header - Always visible */}
      <motion.button
        layout="position"
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
      >
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          {/* Rank badge */}
          <div className="w-12 h-12 bg-gradient-to-br from-[#2F3BBD] to-[#C91A2B] border-2 border-black flex items-center justify-center flex-shrink-0">
            <span className="font-display font-black text-xl text-white">{rank}</span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-display font-black text-lg text-black dark:text-white truncate">
              {policy.title}
            </h3>
            <div className="flex items-center space-x-4 mt-1">
              <span className="font-display font-bold text-2xl text-black dark:text-white">
                {policy.averageSupport}%
              </span>
              <span className="font-body text-sm text-gray-500 dark:text-gray-400">
                bipartisan support
              </span>
            </div>
          </div>
        </div>

        {/* Expand icon */}
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-10 h-10 border-2 border-black dark:border-gray-600 bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 ml-4"
        >
          <Plus className="w-5 h-5 text-black dark:text-white" strokeWidth={3} />
        </motion.div>
      </motion.button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t-2 border-gray-200 dark:border-gray-600 pt-6">
              {/* Description */}
              <p className="font-body text-gray-700 dark:text-gray-300 mb-6">
                {policy.description}
              </p>

              {/* Party support bars */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="font-display font-bold text-xs text-[#2F3BBD] w-24">Democrats</span>
                  <div className="flex-1 h-6 bg-gray-200 dark:bg-gray-700 border border-black dark:border-gray-600 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${policy.partySupport?.democrats || 0}%` }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="h-full bg-[#2F3BBD] flex items-center"
                    >
                      <span className="ml-2 font-display font-bold text-xs text-white">
                        {policy.partySupport?.democrats}%
                      </span>
                    </motion.div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-display font-bold text-xs text-[#C91A2B] w-24">Republicans</span>
                  <div className="flex-1 h-6 bg-gray-200 dark:bg-gray-700 border border-black dark:border-gray-600 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${policy.partySupport?.republicans || 0}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="h-full bg-[#C91A2B] flex items-center"
                    >
                      <span className="ml-2 font-display font-bold text-xs text-white">
                        {policy.partySupport?.republicans}%
                      </span>
                    </motion.div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-display font-bold text-xs text-gray-600 dark:text-gray-400 w-24">Independents</span>
                  <div className="flex-1 h-6 bg-gray-200 dark:bg-gray-700 border border-black dark:border-gray-600 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${policy.partySupport?.independents || 0}%` }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="h-full bg-gray-500 flex items-center"
                    >
                      <span className="ml-2 font-display font-bold text-xs text-white">
                        {policy.partySupport?.independents}%
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Source */}
              {policy.sources[0] && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Source: {policy.sources[0].organization} ({policy.sources[0].year})
                </div>
              )}

              {/* Learn more link */}
              <Link
                href={`/policies/${policy.id}`}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold text-sm border-2 border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                <span>Learn More</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
