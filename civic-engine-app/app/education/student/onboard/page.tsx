'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  MessageSquare,
  PenTool,
  RefreshCw,
  Award,
  ChevronRight,
  ChevronLeft,
  Users
} from 'lucide-react';
import { useDemoAuth } from '@/lib/auth/demo-auth-context';
import { Button } from '@/components/education/ui/Button';
import { Badge } from '@/components/education/ui/Badge';
import { AnimatedStepProgress } from '@/components/education/ui/AnimatedStepProgress';

type OnboardStep = 'intro' | 'join';

export default function StudentOnboardPage() {
  const router = useRouter();
  const { loginAsStudent } = useDemoAuth();
  const [currentStep, setCurrentStep] = useState<OnboardStep>('intro');
  const [joinCode, setJoinCode] = useState(['', '', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Check if code is complete (at least 4 characters for simple codes, or 7 for full codes with dash)
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
      // Focus last filled input or next empty one
      const lastIndex = Math.min(pastedCode.length - 1, 6);
      inputRefs.current[lastIndex]?.focus();
      return;
    }

    const newCode = [...joinCode];
    newCode[index] = value.toUpperCase();
    setJoinCode(newCode);

    // Auto-focus next input (skip index 3 which is the dash position)
    if (value && index < 6) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !joinCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleStart = () => {
    loginAsStudent(0);
    router.push('/education/student');
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const visualSteps = [
    {
      icon: BookOpen,
      title: 'Explore Policies',
      description: 'Read about 5 policies that most Americans agree on',
      color: 'bg-[#2F3BBD]'
    },
    {
      icon: PenTool,
      title: 'Share Your Opinion',
      description: 'Tell us what you think and why',
      color: 'bg-[#2F3BBD]'
    },
    {
      icon: MessageSquare,
      title: 'Discuss with Classmates',
      description: 'See different perspectives and have respectful debates',
      color: 'bg-[#C91A2B]'
    },
    {
      icon: RefreshCw,
      title: 'Reflect & Revise',
      description: 'Update your views if your thinking changes',
      color: 'bg-[#2F3BBD]'
    },
    {
      icon: Award,
      title: 'Get Your Civic Profile',
      description: 'Share your top priorities and what you learned',
      color: 'bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B]'
    }
  ];

  // Steps for the animated progress indicator
  const progressSteps = [
    { id: 'explore', label: 'Explore Policies', description: 'Read about civic issues' },
    { id: 'opinion', label: 'Share Opinion', description: 'Tell us what you think' },
    { id: 'discuss', label: 'Discuss', description: 'Engage with classmates' },
    { id: 'revise', label: 'Reflect & Revise', description: 'Update your views' },
    { id: 'profile', label: 'Get Profile', description: 'Share your journey' },
  ];

  return (
    <div className="min-h-screen bg-neutral-light dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-4 px-6">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Badge variant="warning" size="sm">Demo Mode</Badge>
          {currentStep === 'join' ? (
            <AnimatedStepProgress
              steps={progressSteps}
              currentStep={0}
              mode="horizontal"
              showDescriptions={false}
              compact={true}
            />
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2F3BBD]" />
              <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait" custom={1}>
            {currentStep === 'intro' && (
              <motion.div
                key="intro"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={1}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-[#2F3BBD] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <h1 className="font-display text-3xl font-black text-neutral-dark dark:text-white mb-4">
                  Welcome to Civic Engine
                </h1>
                <p className="text-lg text-neutral dark:text-gray-400 mb-8">
                  Here&apos;s what you&apos;ll do:
                </p>

                {/* Animated Steps List */}
                <div className="bg-white dark:bg-gray-800 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 text-left mb-8">
                  <AnimatedStepProgress
                    steps={progressSteps}
                    currentStep={0}
                    mode="vertical"
                    showDescriptions={true}
                  />
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setCurrentStep('join')}
                  rightIcon={<ChevronRight className="w-5 h-5" />}
                  className="w-full"
                >
                  Get Started
                </Button>
              </motion.div>
            )}

            {currentStep === 'join' && (
              <motion.div
                key="join"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={1}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-[#C91A2B] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h1 className="font-display text-3xl font-black text-neutral-dark dark:text-white mb-4">
                  Join Your Class
                </h1>
                <p className="text-lg text-neutral dark:text-gray-400 mb-8">
                  Enter the code your teacher gave you.
                </p>

                {/* Join Code Input - format: ABC-1234 */}
                <div className="flex justify-center items-center gap-1 mb-6">
                  {joinCode.slice(0, 3).map((char, index) => (
                    <input
                      key={index}
                      ref={el => { inputRefs.current[index] = el; }}
                      type="text"
                      value={char}
                      onChange={(e) => handleJoinCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-xl font-mono font-black border-4 border-black bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      maxLength={1}
                      placeholder="·"
                    />
                  ))}
                  <span className="text-3xl font-black text-neutral-dark dark:text-white mx-1">-</span>
                  {joinCode.slice(3, 7).map((char, index) => (
                    <input
                      key={index + 3}
                      ref={el => { inputRefs.current[index + 3] = el; }}
                      type="text"
                      value={char}
                      onChange={(e) => handleJoinCodeChange(index + 3, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index + 3, e)}
                      className="w-12 h-14 text-center text-xl font-mono font-black border-4 border-black bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      maxLength={1}
                      placeholder="·"
                    />
                  ))}
                </div>

                <p className="text-sm text-neutral dark:text-gray-500 mb-8">
                  For the demo, try <span className="font-mono font-bold">ABC-1234</span>
                </p>

                {/* Continue Button with Tooltip */}
                <div className="relative group">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleStart}
                    rightIcon={<ChevronRight className="w-5 h-5" />}
                    className="w-full"
                    disabled={!isCodeEntered}
                  >
                    Continue
                  </Button>
                  {!isCodeEntered && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      Enter the class code to continue
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 px-6">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {currentStep === 'join' ? (
            <Button
              variant="ghost"
              onClick={() => setCurrentStep('intro')}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
            >
              Back
            </Button>
          ) : (
            <div />
          )}
          <div />
        </div>
      </div>
    </div>
  );
}
