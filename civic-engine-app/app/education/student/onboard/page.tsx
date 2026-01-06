'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/education/ui/Button';
import { useOnboard } from './OnboardContext';

export default function StudentOnboardIntroPage() {
  const router = useRouter();
  const { phase, startTransition } = useOnboard();

  const handleGetStarted = () => {
    startTransition();
    // Navigate after a short delay to let animations start
    setTimeout(() => {
      router.push('/education/student/onboard/join');
    }, 100);
  };

  // Only show on intro phase
  if (phase !== 'intro') {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="primary"
        size="lg"
        onClick={handleGetStarted}
        rightIcon={<ChevronRight className="w-5 h-5" />}
        className="w-full"
      >
        Get Started
      </Button>
    </motion.div>
  );
}
