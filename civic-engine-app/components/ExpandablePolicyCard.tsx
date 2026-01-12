'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronsRight } from 'lucide-react';
import { Policy } from '@/types/policy';
import ToggleIcon from '@/components/ui/ToggleIcon';
import { ReactNode } from 'react';

interface ExpandablePolicyCardProps {
  policy: Policy;
  rank: number;
  isExpanded: boolean;
  isCollapsed?: boolean;
  onToggle?: () => void;
  href?: string;
  children?: ReactNode;
}

export default function ExpandablePolicyCard({
  policy,
  rank,
  isExpanded,
  isCollapsed = false,
  onToggle,
  href,
  children,
}: ExpandablePolicyCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      if (isExpanded) {
        router.push('/policies');
      } else {
        router.push(href);
      }
    } else if (onToggle) {
      onToggle();
    }
  };

  return (
    <motion.div
      layout
      animate={{
        opacity: isCollapsed ? 0.85 : 1,
      }}
      transition={{ duration: 0.3 }}
      className={`
        bg-white dark:bg-gray-800 overflow-hidden
        ${isCollapsed
          ? 'border-2 border-black dark:border-gray-600 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(75,85,99,1)] cursor-pointer'
          : 'border-4 border-black dark:border-gray-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]'
        }
      `}
    >
      {/* Header - Always visible */}
      <motion.button
        layout="position"
        onClick={handleClick}
        className={`
          w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left
          ${isCollapsed ? 'p-3 flex-col gap-2' : 'p-4 md:p-6'}
        `}
      >
        <div className={`flex items-center flex-1 min-w-0 ${isCollapsed ? 'flex-col gap-2 w-full' : 'space-x-3 md:space-x-4'}`}>
          {/* Rank badge */}
          <motion.div
            layout
            className={`
              bg-gradient-to-br from-[#2F3BBD] to-[#C91A2B] border-2 border-black flex items-center justify-center flex-shrink-0
              ${isCollapsed ? 'w-8 h-8' : 'w-10 h-10 md:w-12 md:h-12'}
            `}
          >
            <span className={`font-display font-black text-white ${isCollapsed ? 'text-sm' : 'text-lg md:text-xl'}`}>{rank}</span>
          </motion.div>

          <div className={`min-w-0 ${isCollapsed ? 'w-full text-center' : 'flex-1'}`}>
            <motion.h3
              layout="position"
              className={`font-display font-black text-black dark:text-white ${
                isCollapsed ? 'text-xs line-clamp-2' : 'text-lg truncate'
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

        {/* Toggle icon - hidden when collapsed */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex-shrink-0 ml-2 md:ml-4"
            >
              <ToggleIcon isOpen={isExpanded} size="lg" />
            </motion.div>
          )}
        </AnimatePresence>
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
              {/* If children are provided (routed content), render them */}
              {children ? (
                children
              ) : (
                /* Default expanded content */
                <>
                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="font-body text-gray-700 dark:text-gray-300 mb-6"
                  >
                    {policy.description}
                  </motion.p>

                  {/* Party support bars - horizontal on desktop */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Democrats */}
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-xs text-[#2F3BBD] mb-1">Democrats</span>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 border border-black dark:border-gray-600 relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${policy.partySupport?.democrats || 0}%` }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="h-full bg-[#2F3BBD] flex items-center justify-center"
                        >
                          <span className="font-display font-bold text-sm text-white">
                            {policy.partySupport?.democrats}%
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Republicans */}
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-xs text-[#C91A2B] mb-1">Republicans</span>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 border border-black dark:border-gray-600 relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${policy.partySupport?.republicans || 0}%` }}
                          transition={{ duration: 0.5, delay: 0.35 }}
                          className="h-full bg-[#C91A2B] flex items-center justify-center"
                        >
                          <span className="font-display font-bold text-sm text-white">
                            {policy.partySupport?.republicans}%
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Independents */}
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-xs text-gray-600 dark:text-gray-400 mb-1">Independents</span>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 border border-black dark:border-gray-600 relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${policy.partySupport?.independents || 0}%` }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="h-full bg-gray-500 flex items-center justify-center"
                        >
                          <span className="font-display font-bold text-sm text-white">
                            {policy.partySupport?.independents}%
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Source and action - appears after bars complete */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.0 }}
                  >
                    {/* Source */}
                    {policy.sources[0] && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Source: {policy.sources[0].organization} ({policy.sources[0].year})
                      </div>
                    )}

                    {/* Action button */}
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/policies/${policy.id}`}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold text-sm border-2 border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                      >
                        <span>Full Details</span>
                        <ChevronsRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
