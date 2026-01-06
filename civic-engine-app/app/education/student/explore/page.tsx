'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, BookOpen, Users, Vote, Lightbulb, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoAuth } from '@/lib/auth/demo-auth-context';
import { demoPositions, getPolicySetByGradeLevel } from '@/lib/demo-data';
import { Card } from '@/components/education/ui/Card';
import { Button } from '@/components/education/ui/Button';
import { Badge } from '@/components/education/ui/Badge';
import { getPolicyById } from '@/data/policies';
import { StudentProgressHeader } from '@/components/education/student';

// Civics intro cards for elementary students
const civicsIntroCards = [
  {
    id: 'welcome',
    emoji: '👋',
    title: 'Welcome!',
    content: 'Today we\'re going to learn about something called "policies" and look at some big ideas that could help people!',
    color: 'from-blue-100 to-indigo-100',
  },
  {
    id: 'rules',
    emoji: '📋',
    title: 'What are Rules?',
    content: 'You know how your classroom has rules? Like raising your hand or being kind to friends? Rules help everyone know what to do so things are fair and safe!',
    color: 'from-green-100 to-emerald-100',
  },
  {
    id: 'laws',
    emoji: '📜',
    title: 'Rules for Everyone',
    content: 'When grown-ups make rules for a whole town or country, we call them "laws" or "policies." They\'re like classroom rules, but for everyone!',
    color: 'from-amber-100 to-yellow-100',
  },
  {
    id: 'how',
    emoji: '🗳️',
    title: 'How Do Rules Get Made?',
    content: 'People share their ideas, talk about what\'s good and what might be tricky, and then vote! Voting means everyone gets to help decide.',
    color: 'from-purple-100 to-pink-100',
  },
  {
    id: 'you',
    emoji: '⭐',
    title: 'Your Turn!',
    content: 'Today, YOU get to think about some big ideas and share what you think! There are no wrong answers — just be honest and kind.',
    color: 'from-rose-100 to-orange-100',
  },
];

// Card animation variants
const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 }
  }),
};

export default function StudentExplorePage() {
  const router = useRouter();
  const { isAuthenticated, userType, user, loginAsStudent, currentCohort, gradeLevel } = useDemoAuth();
  const [introCardIndex, setIntroCardIndex] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);
  const [direction, setDirection] = useState(1);
  const [policyCardIndex, setPolicyCardIndex] = useState(0);

  const isElementary = gradeLevel === 'K-5';

  // Auto-login as student when visiting this page
  useEffect(() => {
    if (!isAuthenticated || userType !== 'student') {
      loginAsStudent(0);
    }
  }, [isAuthenticated, userType, loginAsStudent]);

  // Get policies based on grade level
  const policySet = getPolicySetByGradeLevel(gradeLevel);
  // Keep both the policy set item (for display overrides) and the actual policy data
  const policiesWithOverrides = policySet.policies.map(policySetItem => ({
    policySetItem,
    policy: getPolicyById(policySetItem.policyId),
  })).filter(item => item.policy);

  // Get current student's positions
  const studentPositions = demoPositions.filter(p => p.studentId === user?.id);

  if (!isAuthenticated || userType !== 'student') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg font-bold">Loading...</div>
      </div>
    );
  }

  const allPositionsSubmitted = policiesWithOverrides.every(({ policy }) =>
    studentPositions.some(p => p.policyId === policy?.id)
  );

  // Handle intro card navigation
  const handleNextIntro = () => {
    if (introCardIndex < civicsIntroCards.length - 1) {
      setDirection(1);
      setIntroCardIndex(prev => prev + 1);
    } else {
      setIntroComplete(true);
    }
  };

  const handlePrevIntro = () => {
    if (introCardIndex > 0) {
      setDirection(-1);
      setIntroCardIndex(prev => prev - 1);
    }
  };

  // Handle policy card navigation for elementary
  const handleNextPolicy = () => {
    if (policyCardIndex < policiesWithOverrides.length - 1) {
      setDirection(1);
      setPolicyCardIndex(prev => prev + 1);
    } else {
      router.push('/education/student/rubric');
    }
  };

  const handlePrevPolicy = () => {
    if (policyCardIndex > 0) {
      setDirection(-1);
      setPolicyCardIndex(prev => prev - 1);
    } else {
      setIntroComplete(false);
      setIntroCardIndex(civicsIntroCards.length - 1);
    }
  };

  // Elementary card deck view
  if (isElementary) {
    const currentIntroCard = civicsIntroCards[introCardIndex];
    const currentPolicyItem = policiesWithOverrides[policyCardIndex];

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-950 dark:to-gray-900">
        <StudentProgressHeader currentStep={1} />

        <div className="max-w-lg mx-auto px-4 py-8">
          {!introComplete ? (
            <>
              {/* Civics Intro Cards */}
              <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2 text-center">
                What is a Policy?
              </h1>
              <p className="text-center text-neutral dark:text-gray-400 mb-6">
                Let&apos;s learn together!
              </p>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-4">
                {civicsIntroCards.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full border-2 border-black transition-colors ${
                      index <= introCardIndex ? 'bg-[#2F3BBD]' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Card stack visual */}
              <div className="relative">
                <div className="absolute inset-0 bg-gray-200 border-4 border-black transform translate-x-2 translate-y-2 -z-10 rounded-lg" />
                <div className="absolute inset-0 bg-gray-300 border-4 border-black transform translate-x-4 translate-y-4 -z-20 rounded-lg" />

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIntroCard.id}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className={`bg-gradient-to-br ${currentIntroCard.color} border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 rounded-lg`}
                  >
                    <div className="text-center">
                      <span className="text-6xl mb-4 block">{currentIntroCard.emoji}</span>
                      <h2 className="font-display text-2xl font-black text-neutral-dark mb-4">
                        {currentIntroCard.title}
                      </h2>
                      <p className="text-lg text-neutral leading-relaxed">
                        {currentIntroCard.content}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handlePrevIntro}
                  disabled={introCardIndex === 0}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNextIntro}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  {introCardIndex === civicsIntroCards.length - 1 ? 'See the Ideas!' : 'Next'}
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Policy Cards for Elementary */}
              <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2 text-center">
                Big Ideas
              </h1>
              <p className="text-center text-neutral dark:text-gray-400 mb-6">
                Here are some ideas people are talking about
              </p>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-4">
                {policiesWithOverrides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full border-2 border-black transition-colors ${
                      index <= policyCardIndex ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Card stack visual */}
              <div className="relative">
                <div className="absolute inset-0 bg-gray-200 border-4 border-black transform translate-x-2 translate-y-2 -z-10 rounded-lg" />
                <div className="absolute inset-0 bg-gray-300 border-4 border-black transform translate-x-4 translate-y-4 -z-20 rounded-lg" />

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentPolicyItem?.policy?.id}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="bg-gradient-to-br from-white to-gray-50 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 rounded-lg"
                  >
                    <div className="text-center">
                      <p className="text-sm font-bold text-[#2F3BBD] uppercase tracking-wide mb-2">
                        Idea {policyCardIndex + 1} of {policiesWithOverrides.length}
                      </p>
                      <h2 className="font-display text-2xl font-black text-neutral-dark mb-4">
                        {currentPolicyItem?.policySetItem.displayTitle || currentPolicyItem?.policy?.title}
                      </h2>
                      <p className="text-lg text-neutral leading-relaxed">
                        {currentPolicyItem?.policySetItem.displayDescription || currentPolicyItem?.policy?.description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handlePrevPolicy}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNextPolicy}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  {policyCardIndex === policiesWithOverrides.length - 1 ? 'Continue' : 'Next Idea'}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Standard view for other grade levels
  return (
    <div className="min-h-screen bg-neutral-light dark:bg-gray-950">
      {/* Header with progress */}
      <StudentProgressHeader currentStep={1} />

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2 text-center">
          Explore Policies
        </h1>
        <p className="text-center text-neutral dark:text-gray-400 mb-1">
          {policySet.name}
        </p>
        <p className="text-center text-sm text-neutral dark:text-gray-500 mb-6">
          {policySet.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {policiesWithOverrides.map(({ policySetItem, policy }, index) => {
            const position = studentPositions.find(p => p.policyId === policy?.id);
            // Use display overrides if available (for kid-friendly names)
            const title = policySetItem.displayTitle || policy?.title || 'Unknown Policy';
            const description = policySetItem.displayDescription || policy?.description;
            return (
              <Card key={policy?.id || index} variant="default" padding="md" className="flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={position ? 'success' : 'default'} size="sm">
                      {position ? 'Position Submitted' : 'Pending'}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-neutral-dark dark:text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-neutral dark:text-gray-400 mb-4">
                    {description}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/policies/${policy?.id}`)}
                  className="w-full mt-auto"
                >
                  Learn More
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Continue to next step */}
        <div className="flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/education/student/rubric')}
            rightIcon={<ChevronRight className="w-5 h-5" />}
            className="w-full max-w-md"
          >
            Continue to Rubric & Examples
          </Button>
        </div>
      </div>
    </div>
  );
}
