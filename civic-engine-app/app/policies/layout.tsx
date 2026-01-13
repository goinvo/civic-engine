'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import PolicyListItem from '@/components/PolicyListItem';
import { getTopPolicies, getPoliciesCount } from '@/data/policies';

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

      {/* Policies content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-white mb-3">
            Policies Americans Agree On
          </h2>
          <p className="text-neutral dark:text-gray-400 max-w-xl mx-auto">
            The policies with the highest bipartisan support. Click any policy to learn more.
          </p>
        </div>

        {/* Policies list */}
        <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
          {topPolicies.map((policy, index) => (
            <PolicyListItem
              key={policy.id}
              policy={policy}
              displayRank={index + 1}
              isExpanded={expandedPolicyId === policy.id}
              href={`/policies/${policy.id}`}
            />
          ))}
        </div>

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
