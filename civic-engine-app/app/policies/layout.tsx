'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import ExpandablePolicyCard from '@/components/ExpandablePolicyCard';
import { getTopPolicies, getPoliciesCount } from '@/data/policies';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const topPolicies = getTopPolicies(10);
  const totalPolicies = getPoliciesCount();

  // Extract the policy ID from the pathname
  const expandedPolicyId = pathname.startsWith('/policies/')
    ? pathname.split('/policies/')[1]
    : null;

  return (
    <div className="min-h-screen bg-neutral-light dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b-2 border-black dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
            <h1 className="text-lg font-bold text-neutral-dark dark:text-white">
              Top 10 Policies
            </h1>
            <div className="w-16" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Policies header */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-white mb-3">
            Policies Americans Agree On
          </h2>
          <p className="text-neutral dark:text-gray-400 max-w-xl mx-auto">
            The policies with the highest bipartisan support. Click any policy to learn more.
          </p>
        </div>

        {/* Policies grid - switches to flex layout when a card is expanded */}
        <motion.div
          className={`
            ${expandedPolicyId
              ? 'flex flex-wrap gap-4 items-start'
              : 'grid grid-cols-1 md:grid-cols-2 gap-4 items-start'
            }
          `}
          layout
          transition={{ duration: 0.3 }}
        >
          {topPolicies.map((policy, index) => {
            const isExpanded = expandedPolicyId === policy.id;
            const isCollapsed = expandedPolicyId !== null && !isExpanded;

            return (
              <motion.div
                key={policy.id}
                layout
                className={`
                  ${isExpanded
                    ? 'w-full'
                    : expandedPolicyId
                      ? 'w-full md:w-[calc(25%-12px)]'
                      : 'w-full'
                  }
                `}
                transition={{ duration: 0.3 }}
              >
                <ExpandablePolicyCard
                  policy={policy}
                  rank={index + 1}
                  isExpanded={isExpanded}
                  isCollapsed={isCollapsed}
                  href={`/policies/${policy.id}`}
                >
                  {isExpanded ? children : null}
                </ExpandablePolicyCard>
              </motion.div>
            );
          })}
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
      </div>
    </div>
  );
}
