'use client';

import { motion } from 'framer-motion';
import PolicyCard from './PolicyCard';
import { Policy } from '@/types/policy';

interface PolicyListProps {
  policies: Policy[];
  title?: string;
  subtitle?: string;
  showVoteButtons?: boolean;
}

export default function PolicyList({
  policies,
  title,
  subtitle,
  showVoteButtons = true,
}: PolicyListProps) {
  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="w-full">
      {/* Section Header */}
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-dark mb-3">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-neutral text-base sm:text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Policy Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {policies.map((policy) => (
          <motion.div key={policy.id} variants={itemVariants}>
            <PolicyCard policy={policy} showVoteButton={showVoteButtons} />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {policies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral text-lg">No policies found.</p>
        </div>
      )}
    </section>
  );
}
