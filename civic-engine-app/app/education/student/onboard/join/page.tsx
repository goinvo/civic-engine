'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { useDemoAuth } from '@/lib/auth/demo-auth-context';
import { Button } from '@/components/education/ui/Button';
import { useOnboard } from '../OnboardContext';

export default function StudentOnboardJoinPage() {
  const router = useRouter();
  const { loginAsStudent } = useDemoAuth();
  const { phase, showContent, goBackToIntro } = useOnboard();
  const [joinCode, setJoinCode] = useState(['', '', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Check if code is complete
  const isCodeEntered = joinCode.filter(c => c !== '').length >= 4;

  const handleJoinCodeChange = (index: number, value: string) => {
    // Handle paste
    if (value.length > 1) {
      const pastedCode = value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
      const newCode = [...joinCode];
      for (let i = 0; i < pastedCode.length && i < 7; i++) {
        newCode[i] = pastedCode[i] || '';
      }
      setJoinCode(newCode);
      const lastIndex = Math.min(pastedCode.length - 1, 6);
      inputRefs.current[lastIndex]?.focus();
      return;
    }

    const newCode = [...joinCode];
    newCode[index] = value.toUpperCase();
    setJoinCode(newCode);

    if (value && index < 6) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !joinCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleBack = () => {
    goBackToIntro();
    router.push('/education/student/onboard');
  };

  const handleContinue = () => {
    loginAsStudent(0);
    router.push('/education/student/explore');
  };

  // Wait for all animations to complete before showing
  if (phase === 'intro' || !showContent) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="text-center"
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-[#C91A2B] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
        <Users className="w-8 h-8 text-white" />
      </div>

      <h2 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2">
        Join Your Class
      </h2>
      <p className="text-neutral dark:text-gray-400 mb-6">
        Enter the code your teacher gave you.
      </p>

      {/* Join Code Input */}
      <div className="flex justify-center items-center gap-1 mb-4">
        {joinCode.slice(0, 3).map((char, index) => (
          <input
            key={index}
            ref={el => { inputRefs.current[index] = el; }}
            type="text"
            value={char}
            onChange={(e) => handleJoinCodeChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-11 h-12 text-center text-lg font-mono font-black border-4 border-black bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            maxLength={1}
            placeholder="·"
          />
        ))}
        <span className="text-2xl font-black text-neutral-dark dark:text-white mx-1">-</span>
        {joinCode.slice(3, 7).map((char, index) => (
          <input
            key={index + 3}
            ref={el => { inputRefs.current[index + 3] = el; }}
            type="text"
            value={char}
            onChange={(e) => handleJoinCodeChange(index + 3, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index + 3, e)}
            className="w-11 h-12 text-center text-lg font-mono font-black border-4 border-black bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            maxLength={1}
            placeholder="·"
          />
        ))}
      </div>

      <p className="text-sm text-neutral dark:text-gray-500 mb-6">
        For the demo, try <span className="font-mono font-bold">ABC-1234</span>
      </p>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          size="lg"
          onClick={handleBack}
          leftIcon={<ChevronLeft className="w-5 h-5" />}
        >
          Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handleContinue}
          rightIcon={<ChevronRight className="w-5 h-5" />}
          className="flex-1"
          disabled={!isCodeEntered}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
