'use client';

import { motion } from 'framer-motion';
import { Policy } from '@/types/policy';
import { PolicyContent } from './page';

export default function PolicyPageClient({ policy }: { policy: Policy }) {
  return (
    <motion.div
      layoutId={`policy-${policy.id}`}
      className="max-w-4xl mx-auto px-6 py-8"
    >
      <PolicyContent policy={policy} />
    </motion.div>
  );
}
