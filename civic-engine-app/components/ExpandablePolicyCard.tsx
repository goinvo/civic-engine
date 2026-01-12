'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, ChevronsLeft, ArrowUpRight } from 'lucide-react';
import { Policy } from '@/types/policy';

interface ExpandablePolicyCardProps {
  policy: Policy;
  rank: number;
  isExpanded: boolean;
  isCollapsed?: boolean; // True when another card is expanded
  onToggle: () => void;
}

export default function ExpandablePolicyCard({
  policy,
  rank,
  isExpanded,
  isCollapsed = false,
  onToggle,
}: ExpandablePolicyCardProps) {
  return (
    <motion.div
      layout
      animate={{
        opacity: isCollapsed ? 0.7 : 1,
      }}
      transition={{ duration: 0.3 }}
      className={`
        border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800
        shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]
        overflow-hidden
        ${isCollapsed ? 'cursor-pointer' : ''}
      `}
    >
      {/* Header - Always visible */}
      <motion.button
        layout="position"
        onClick={onToggle}
        className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
      >
        <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
          {/* Rank badge */}
          <motion.div
            layout
            className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#2F3BBD] to-[#C91A2B] border-2 border-black flex items-center justify-center flex-shrink-0"
          >
            <span className="font-display font-black text-lg md:text-xl text-white">{rank}</span>
          </motion.div>

          <div className="flex-1 min-w-0">
            <motion.h3
              layout="position"
              className={`font-display font-black text-black dark:text-white truncate ${
                isCollapsed ? 'text-base' : 'text-lg'
              }`}
            >
              {policy.title}
            </motion.h3>

            {/* Support info - hidden when collapsed */}
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-4 mt-1 overflow-hidden"
                >
                  <span className="font-display font-bold text-2xl text-black dark:text-white">
                    {policy.averageSupport}%
                  </span>
                  <span className="font-body text-sm text-gray-500 dark:text-gray-400">
                    bipartisan support
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Arrow icon - transforms based on state */}
        <motion.div
          layout
          className={`
            w-10 h-10 border-2 border-black dark:border-gray-600
            flex items-center justify-center flex-shrink-0 ml-2 md:ml-4
            ${isExpanded ? 'bg-[#2F3BBD]' : 'bg-gray-100 dark:bg-gray-700'}
          `}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="collapse"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <ChevronsLeft className="w-5 h-5 text-white" strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="expand"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <ChevronRight className="w-5 h-5 text-black dark:text-white" strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>
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
            <div className="px-4 md:px-6 pb-6 border-t-2 border-gray-200 dark:border-gray-600 pt-6">
              {/* Support percentage - shown in expanded view */}
              <div className="flex items-center space-x-4 mb-4">
                <span className="font-display font-bold text-3xl text-black dark:text-white">
                  {policy.averageSupport}%
                </span>
                <span className="font-body text-sm text-gray-500 dark:text-gray-400">
                  bipartisan support
                </span>
              </div>

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

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                  }}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-black dark:text-white font-bold text-sm border-2 border-black dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <ChevronsLeft className="w-4 h-4" />
                  <span>Collapse</span>
                </button>
                <Link
                  href={`/policies/${policy.id}`}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold text-sm border-2 border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  <span>Full Details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
