'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Policy } from '@/types/policy';
import { PolicyContent } from './page';

export default function PolicyPageClient({ policy }: { policy: Policy }) {
  const router = useRouter();

  return (
    <motion.div
      layoutId={`policy-${policy.id}`}
      className="max-w-4xl mx-auto px-6 py-8"
    >
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6 font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <PolicyContent policy={policy} />
    </motion.div>
  );
}
