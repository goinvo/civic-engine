'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Plus, ArrowUpRight } from 'lucide-react';
import { Policy } from '@/types/policy';

interface PolicyListItemProps {
  policy: Policy;
  isActive?: boolean;
  displayRank?: number;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export default function PolicyListItem({
  policy,
  isActive = false,
  displayRank,
  isExpanded: controlledExpanded,
  onToggleExpand,
}: PolicyListItemProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);

  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
  const handleToggle = onToggleExpand || (() => setInternalExpanded(!internalExpanded));
  const rankToShow = displayRank ?? policy.rank;

  return (
    <motion.div
      layout
      className="border-b-2 border-black dark:border-gray-600 last:border-b-0 overflow-hidden"
    >
      {/* Header */}
      <motion.div
        layout="position"
        onClick={handleToggle}
        className={`
          flex items-center justify-between py-4 px-6
          hover:bg-gray-50 dark:hover:bg-gray-700/50 active:bg-gray-100 dark:active:bg-gray-700
          transition-all duration-150 cursor-pointer
          hover:pl-8
          ${isExpanded ? 'bg-gray-100 dark:bg-gray-700 pl-8' : ''}
        `}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-shrink-0"
          >
            <Plus className="w-5 h-5 text-black dark:text-white" strokeWidth={3} />
          </motion.div>
          <span className="font-display font-black text-base text-black dark:text-white truncate">
            {rankToShow}. {policy.title}
          </span>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <span className="font-display font-black text-base text-black dark:text-white">
            {policy.averageSupport}%
          </span>
        </div>
      </motion.div>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              {/* Policy Description */}
              <p className="font-body text-lg text-gray-700 dark:text-gray-300 font-medium mb-6 mt-2">
                {policy.description}
              </p>

              {/* Support Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-white dark:bg-gray-700 border-2 border-black dark:border-gray-600 p-3">
                  <div className="text-3xl font-display font-black text-black dark:text-white">{policy.averageSupport}%</div>
                  <div className="text-xs font-body text-black dark:text-gray-300 font-bold">Avg Support</div>
                </div>
                {policy.partySupport && (
                  <>
                    <div className="bg-[#2F3BBD] border-2 border-black dark:border-gray-600 p-3">
                      <div className="text-2xl font-display font-black text-white">{policy.partySupport.democrats}%</div>
                      <div className="text-xs font-body text-white font-bold">Democrats</div>
                    </div>
                    <div className="bg-[#C91A2B] border-2 border-black dark:border-gray-600 p-3">
                      <div className="text-2xl font-display font-black text-white">{policy.partySupport.republicans}%</div>
                      <div className="text-xs font-body text-white font-bold">Republicans</div>
                    </div>
                    <div className="bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] border-2 border-black dark:border-gray-600 p-3">
                      <div className="text-2xl font-display font-black text-white">{policy.partySupport.independents}%</div>
                      <div className="text-xs font-body text-white/90 font-bold">Independents</div>
                    </div>
                  </>
                )}
              </div>

              {/* Key Details */}
              {policy.details && policy.details.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-display text-xl font-black text-black dark:text-white mb-3">Key Details</h3>
                  <ul className="space-y-3">
                    {policy.details.map((detail, index) => (
                      <li key={index}>
                        <h4 className="font-display font-black text-black dark:text-white mb-1">{detail.title}</h4>
                        <p className="font-body text-gray-700 dark:text-gray-300 font-medium">{detail.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Data Sources */}
              <div className="mb-4">
                <h3 className="font-display text-xl font-black text-black dark:text-white mb-3">Data Sources</h3>
                <ul className="space-y-2">
                  {policy.sources.map((source, index) => (
                    <li key={index}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-medium group text-sm"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                        <span className="group-hover:underline">
                          {source.organization} ({source.year})
                          {source.supportPercentage && ` - ${source.supportPercentage}% support`}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* View Full Details Link */}
              <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-600">
                <Link
                  href={`/policies/${policy.id}`}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-[#2F3BBD] text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all font-bold"
                >
                  <span>View Full Details</span>
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
