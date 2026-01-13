'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Policy } from '@/types/policy';
import PolicyExpandedContent from '@/components/PolicyExpandedContent';
import ToggleIcon from '@/components/ui/ToggleIcon';

interface PolicyListItemProps {
  policy: Policy;
  isActive?: boolean;
  displayRank?: number;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  href?: string;
}

export default function PolicyListItem({
  policy,
  isActive = false,
  displayRank,
  isExpanded: controlledExpanded,
  onToggleExpand,
  href,
}: PolicyListItemProps) {
  const router = useRouter();
  const [internalExpanded, setInternalExpanded] = useState(false);

  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    if (href) {
      if (isExpanded) {
        router.push('/policies');
      } else {
        router.push(href);
      }
    } else if (onToggleExpand) {
      onToggleExpand();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

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
          ${isExpanded ? 'bg-gray-50 dark:bg-gray-700/50' : ''}
        `}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <ToggleIcon isOpen={isExpanded} size="md" />
          </div>
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
              <PolicyExpandedContent policy={policy} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
