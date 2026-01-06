'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, CheckCircle, Star, MessageSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoAuth } from '@/lib/auth/demo-auth-context';
import { Card } from '@/components/education/ui/Card';
import { Button } from '@/components/education/ui/Button';
import { Badge } from '@/components/education/ui/Badge';
import { StudentProgressHeader } from '@/components/education/student';
import type { GradeLevel } from '@/types/education';

// Types for rubric data
interface RubricLevel {
  score: number;
  label: string;
  description: string;
}

interface RubricCriterion {
  id: string;
  title: string;
  description: string;
  maxPoints: number;
  levels: RubricLevel[];
}

interface ExampleResponse {
  id: string;
  quality: 'strong' | 'developing';
  policy: string;
  stance: string;
  reasoning: string;
  steelman?: string;
  otherSide?: string; // Kid-friendly version of steelman
  score: number;
  maxScore: number;
  feedback: string;
}

// Grade-level specific rubric criteria
const rubricsByGrade: Record<GradeLevel, RubricCriterion[]> = {
  'K-5': [
    {
      id: 'opinion',
      title: 'Share Your Opinion',
      description: 'Tell us what you think and why',
      maxPoints: 2,
      levels: [
        { score: 2, label: 'Great!', description: 'You said what you think AND gave a reason why' },
        { score: 1, label: 'Good Start', description: 'You said what you think but need to add why' },
      ],
    },
    {
      id: 'other-side',
      title: 'Think About Others',
      description: 'What might someone else think?',
      maxPoints: 2,
      levels: [
        { score: 2, label: 'Great!', description: 'You explained why someone might think differently' },
        { score: 1, label: 'Good Start', description: 'You mentioned others might disagree' },
      ],
    },
    {
      id: 'kindness',
      title: 'Be Respectful',
      description: 'Use kind words even when you disagree',
      maxPoints: 1,
      levels: [
        { score: 1, label: 'Great!', description: 'Your words are kind and respectful' },
      ],
    },
  ],
  '6-8': [
    {
      id: 'reasoning',
      title: 'Clear Reasoning',
      description: 'Explain your position with reasons',
      maxPoints: 3,
      levels: [
        { score: 3, label: 'Excellent', description: 'Multiple clear reasons that make sense together' },
        { score: 2, label: 'Good', description: 'At least one solid reason explained' },
        { score: 1, label: 'Developing', description: 'Opinion stated but reasons need more detail' },
      ],
    },
    {
      id: 'other-perspective',
      title: 'Other Perspectives',
      description: 'Show you understand why others might disagree',
      maxPoints: 2,
      levels: [
        { score: 2, label: 'Excellent', description: 'Fairly explains the other side\'s best argument' },
        { score: 1, label: 'Developing', description: 'Mentions disagreement but doesn\'t explain why' },
      ],
    },
    {
      id: 'support',
      title: 'Support Your Ideas',
      description: 'Use facts, examples, or experiences',
      maxPoints: 2,
      levels: [
        { score: 2, label: 'Excellent', description: 'Includes specific facts or real examples' },
        { score: 1, label: 'Developing', description: 'General support without specifics' },
      ],
    },
  ],
  '9-10': [
    {
      id: 'reasoning',
      title: 'Clear Reasoning',
      description: 'Explains your position with specific reasons',
      maxPoints: 3,
      levels: [
        { score: 3, label: 'Strong', description: 'Multiple specific reasons with clear logic' },
        { score: 2, label: 'Good', description: 'At least one specific reason explained' },
        { score: 1, label: 'Basic', description: 'General statement without specifics' },
      ],
    },
    {
      id: 'steelman',
      title: 'Steelman Argument',
      description: 'Presents the strongest opposing view fairly',
      maxPoints: 3,
      levels: [
        { score: 3, label: 'Strong', description: 'Accurately represents opposing view with empathy' },
        { score: 2, label: 'Good', description: 'Acknowledges opposing view with some detail' },
        { score: 1, label: 'Basic', description: 'Mentions opposition without depth' },
      ],
    },
    {
      id: 'evidence',
      title: 'Uses Evidence',
      description: 'References facts, data, or examples',
      maxPoints: 2,
      levels: [
        { score: 2, label: 'Strong', description: 'Cites specific facts or examples' },
        { score: 1, label: 'Basic', description: 'General reference to evidence' },
      ],
    },
  ],
  '11-12': [
    {
      id: 'reasoning',
      title: 'Clear Reasoning',
      description: 'Explains your position with specific reasons',
      maxPoints: 3,
      levels: [
        { score: 3, label: 'Strong', description: 'Multiple specific reasons with clear logic' },
        { score: 2, label: 'Good', description: 'At least one specific reason explained' },
        { score: 1, label: 'Basic', description: 'General statement without specifics' },
      ],
    },
    {
      id: 'steelman',
      title: 'Steelman Argument',
      description: 'Presents the strongest opposing view fairly',
      maxPoints: 3,
      levels: [
        { score: 3, label: 'Strong', description: 'Accurately represents opposing view with empathy' },
        { score: 2, label: 'Good', description: 'Acknowledges opposing view with some detail' },
        { score: 1, label: 'Basic', description: 'Mentions opposition without depth' },
      ],
    },
    {
      id: 'evidence',
      title: 'Uses Evidence',
      description: 'References facts, data, or examples',
      maxPoints: 2,
      levels: [
        { score: 2, label: 'Strong', description: 'Cites specific facts or examples' },
        { score: 1, label: 'Basic', description: 'General reference to evidence' },
      ],
    },
  ],
  'college': [
    {
      id: 'reasoning',
      title: 'Analytical Reasoning',
      description: 'Develops a coherent argument with logical structure',
      maxPoints: 4,
      levels: [
        { score: 4, label: 'Excellent', description: 'Sophisticated argument with nuanced analysis' },
        { score: 3, label: 'Strong', description: 'Well-developed argument with clear logic' },
        { score: 2, label: 'Adequate', description: 'Basic argument present but lacks depth' },
        { score: 1, label: 'Developing', description: 'Argument unclear or poorly structured' },
      ],
    },
    {
      id: 'steelman',
      title: 'Steelman & Synthesis',
      description: 'Engages seriously with opposing views and finds common ground',
      maxPoints: 4,
      levels: [
        { score: 4, label: 'Excellent', description: 'Synthesizes multiple perspectives, identifies shared values' },
        { score: 3, label: 'Strong', description: 'Strong steelman with genuine engagement' },
        { score: 2, label: 'Adequate', description: 'Acknowledges opposition but surface-level' },
        { score: 1, label: 'Developing', description: 'Dismissive or strawman of opposing views' },
      ],
    },
    {
      id: 'evidence',
      title: 'Evidence & Sources',
      description: 'Supports claims with credible evidence and data',
      maxPoints: 3,
      levels: [
        { score: 3, label: 'Excellent', description: 'Multiple credible sources, evaluates quality' },
        { score: 2, label: 'Strong', description: 'Relevant evidence from reliable sources' },
        { score: 1, label: 'Developing', description: 'Limited or questionable evidence' },
      ],
    },
  ],
};

// Grade-level specific examples
const examplesByGrade: Record<GradeLevel, ExampleResponse[]> = {
  'K-5': [
    {
      id: 'k5-strong',
      quality: 'strong',
      policy: 'School for All Kids',
      stance: 'I think this is a good idea',
      reasoning: 'I think all kids should get to go to school early because then they can learn their ABCs and make friends before kindergarten. My little cousin went to preschool and she was really ready for kindergarten!',
      otherSide: 'Some people might worry that it costs a lot of money. That makes sense because schools need teachers and supplies.',
      score: 5,
      maxScore: 5,
      feedback: 'Great job! You shared your opinion, gave a reason with a real example (your cousin), and thought about why others might feel differently.',
    },
    {
      id: 'k5-developing',
      quality: 'developing',
      policy: 'Internet for Everyone',
      stance: 'I like this idea',
      reasoning: 'Internet is good.',
      otherSide: 'Some people don\'t like it.',
      score: 2,
      maxScore: 5,
      feedback: 'Good start! Try to add WHY you think internet is good. What can people do with it? And why might some people not want this?',
    },
  ],
  '6-8': [
    {
      id: '68-strong',
      quality: 'strong',
      policy: 'Kids Online Safety',
      stance: 'Support',
      reasoning: 'I support online safety rules for kids because social media can be harmful to young people. Studies show that too much screen time affects sleep and mental health. I\'ve seen friends get cyberbullied and it really affected them.',
      otherSide: 'People against this might say it limits freedom and that parents should decide, not the government. They have a point that families are different and know their kids best.',
      score: 7,
      maxScore: 7,
      feedback: 'Excellent work! You used research (studies about screen time), personal experience (friends), and fairly explained the other side\'s concern about freedom and parent choice.',
    },
    {
      id: '68-developing',
      quality: 'developing',
      policy: 'Right to Repair',
      stance: 'Somewhat Support',
      reasoning: 'I think we should be able to fix our own stuff because it\'s ours.',
      otherSide: 'Companies don\'t want this.',
      score: 3,
      maxScore: 7,
      feedback: 'You have the right idea! Add more detail: What kinds of things should we fix? Why is it good to fix things? And explain WHY companies might not want this (safety? protecting secrets?).',
    },
  ],
  '9-10': [
    {
      id: '910-strong',
      quality: 'strong',
      policy: 'Universal Background Checks',
      stance: 'Strongly Support',
      reasoning: 'I support universal background checks because they help keep guns away from people who shouldn\'t have them. Currently, private sales and gun shows don\'t require checks, creating a loophole. Over 90% of Americans support this policy according to polls.',
      steelman: 'Opponents argue this could create a burden for law-abiding gun owners and that criminals will find ways around it anyway. They also worry it could lead to a national gun registry, which many see as government overreach.',
      score: 7,
      maxScore: 8,
      feedback: 'Strong response with specific data (90% support, loophole explanation). Your steelman addresses multiple legitimate concerns. Could be even stronger with a source for the statistic.',
    },
    {
      id: '910-developing',
      quality: 'developing',
      policy: 'Raise Minimum Wage',
      stance: 'Support',
      reasoning: 'Workers deserve more money because things are expensive now.',
      steelman: 'Business owners don\'t want to pay more.',
      score: 3,
      maxScore: 8,
      feedback: 'Good instinct! Strengthen by adding: How much should minimum wage be? What specific costs have risen? For steelman: Why might higher wages be hard for businesses? Could it affect jobs?',
    },
  ],
  '11-12': [
    {
      id: '1112-strong',
      quality: 'strong',
      policy: 'Medicare Drug Negotiation',
      stance: 'Strongly Support',
      reasoning: 'I support allowing Medicare to negotiate drug prices because Americans pay 2-3x more than other developed countries for the same medications. My grandmother spends over $400/month on prescriptions, which forces her to choose between medicine and groceries.',
      steelman: 'Those who oppose this worry that lower prices could reduce pharmaceutical profits, leading to less investment in R&D for new drugs. This is a legitimate concern since developing new medications costs billions and takes over a decade.',
      score: 8,
      maxScore: 8,
      feedback: 'Excellent use of specific data (2-3x price difference) and personal example. Strong steelman that shows genuine understanding of the opposing view.',
    },
    {
      id: '1112-developing',
      quality: 'developing',
      policy: 'Congress Term Limits',
      stance: 'Somewhat Support',
      reasoning: 'I think term limits are good because politicians stay in office too long.',
      steelman: 'Some people think term limits are bad.',
      score: 3,
      maxScore: 8,
      feedback: 'The reasoning needs more specifics - how long is "too long"? What problems does this cause? The steelman doesn\'t explain WHY some oppose term limits.',
    },
  ],
  'college': [
    {
      id: 'college-strong',
      quality: 'strong',
      policy: 'Immigration Grand Bargain',
      stance: 'Support with reservations',
      reasoning: 'I support comprehensive immigration reform because it addresses multiple interconnected issues: pathway to citizenship for long-term residents contributes to economic stability (CBO estimates $7B deficit reduction), while enhanced border security addresses legitimate sovereignty concerns. The status quo creates a vulnerable underclass that depresses wages for all workers.',
      steelman: 'Critics raise valid concerns: amnesty may incentivize future illegal immigration (as arguably happened post-1986 IRCA), enforcement mechanisms may be insufficient, and prioritizing undocumented immigrants over legal applicants raises fairness questions. Both progressive labor advocates and conservative restrictionists have legitimate grievances with compromise approaches.',
      score: 10,
      maxScore: 11,
      feedback: 'Sophisticated analysis acknowledging complexity. Strong use of evidence (CBO data, historical precedent). Steelman engages multiple perspectives across political spectrum. Consider addressing implementation challenges.',
    },
    {
      id: 'college-developing',
      quality: 'developing',
      policy: 'Ultra-Millionaire Wealth Tax',
      stance: 'Support',
      reasoning: 'The ultra-wealthy should pay more in taxes because inequality is bad for society.',
      steelman: 'Rich people think taxes are unfair and will move their money offshore.',
      score: 4,
      maxScore: 11,
      feedback: 'The core argument needs development: What specific evidence shows inequality\'s harms? What rate/threshold? The steelman oversimplifies—engage with constitutional concerns, economic effects on investment, and implementation challenges.',
    },
  ],
};

// Elementary rubric intro cards
const elementaryRubricIntroCards = [
  {
    id: 'intro',
    emoji: '🌟',
    title: 'How to Share Great Ideas!',
    content: 'Before we share our ideas, let\'s learn what makes a really good answer!',
    color: 'from-amber-100 to-yellow-100',
  },
  {
    id: 'tips',
    emoji: '💡',
    title: 'Three Things to Remember',
    content: 'We\'ll learn three important things: sharing your opinion, thinking about others, and being kind.',
    color: 'from-blue-100 to-indigo-100',
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

export default function StudentRubricPage() {
  const router = useRouter();
  const { isAuthenticated, userType, loginAsStudent, gradeLevel } = useDemoAuth();

  // Auto-login as student when visiting this page
  useEffect(() => {
    if (!isAuthenticated || userType !== 'student') {
      loginAsStudent(0);
    }
  }, [isAuthenticated, userType, loginAsStudent]);

  // Get grade-appropriate content
  const rubricCriteria = rubricsByGrade[gradeLevel] || rubricsByGrade['11-12'];
  const exampleResponses = examplesByGrade[gradeLevel] || examplesByGrade['11-12'];
  const isElementary = gradeLevel === 'K-5';
  const isMiddleSchool = gradeLevel === '6-8';

  // Card deck state for elementary
  const [cardPhase, setCardPhase] = useState<'intro' | 'rubric' | 'examples' | 'complete'>('intro');
  const [cardIndex, setCardIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Calculate total cards and current position
  const introCount = elementaryRubricIntroCards.length;
  const rubricCount = rubricCriteria.length;
  const examplesCount = exampleResponses.length;

  // Handle next card navigation for elementary
  const handleNextCard = () => {
    setDirection(1);
    if (cardPhase === 'intro') {
      if (cardIndex < introCount - 1) {
        setCardIndex(prev => prev + 1);
      } else {
        setCardPhase('rubric');
        setCardIndex(0);
      }
    } else if (cardPhase === 'rubric') {
      if (cardIndex < rubricCount - 1) {
        setCardIndex(prev => prev + 1);
      } else {
        setCardPhase('examples');
        setCardIndex(0);
      }
    } else if (cardPhase === 'examples') {
      if (cardIndex < examplesCount - 1) {
        setCardIndex(prev => prev + 1);
      } else {
        setCardPhase('complete');
      }
    }
  };

  // Handle previous card navigation for elementary
  const handlePrevCard = () => {
    setDirection(-1);
    if (cardPhase === 'intro') {
      if (cardIndex > 0) {
        setCardIndex(prev => prev - 1);
      }
    } else if (cardPhase === 'rubric') {
      if (cardIndex > 0) {
        setCardIndex(prev => prev - 1);
      } else {
        setCardPhase('intro');
        setCardIndex(introCount - 1);
      }
    } else if (cardPhase === 'examples') {
      if (cardIndex > 0) {
        setCardIndex(prev => prev - 1);
      } else {
        setCardPhase('rubric');
        setCardIndex(rubricCount - 1);
      }
    } else if (cardPhase === 'complete') {
      setCardPhase('examples');
      setCardIndex(examplesCount - 1);
    }
  };

  // Get progress info for elementary
  const getProgressInfo = () => {
    let current = 0;
    const total = introCount + rubricCount + examplesCount;

    if (cardPhase === 'intro') {
      current = cardIndex + 1;
    } else if (cardPhase === 'rubric') {
      current = introCount + cardIndex + 1;
    } else if (cardPhase === 'examples') {
      current = introCount + rubricCount + cardIndex + 1;
    } else {
      current = total;
    }

    return { current, total };
  };

  if (!isAuthenticated || userType !== 'student') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg font-bold">Loading...</div>
      </div>
    );
  }

  // Elementary card deck view
  if (isElementary) {
    const progress = getProgressInfo();
    const currentIntroCard = elementaryRubricIntroCards[cardIndex];
    const currentRubricCard = rubricCriteria[cardIndex];
    const currentExampleCard = exampleResponses[cardIndex];

    // Get emoji for rubric criteria
    const rubricEmojis: Record<string, string> = {
      'opinion': '💬',
      'other-side': '🤔',
      'kindness': '💖',
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-950 dark:to-gray-900">
        <StudentProgressHeader currentStep={2} />

        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Phase indicator */}
          <div className="text-center mb-2">
            <Badge variant={cardPhase === 'complete' ? 'success' : 'primary'} size="sm">
              {cardPhase === 'intro' && 'Getting Started'}
              {cardPhase === 'rubric' && 'The Three Rules'}
              {cardPhase === 'examples' && 'Examples'}
              {cardPhase === 'complete' && 'All Done!'}
            </Badge>
          </div>

          <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2 text-center">
            How to Share Ideas
          </h1>
          <p className="text-center text-neutral dark:text-gray-400 mb-6">
            {progress.current} of {progress.total} cards
          </p>

          {/* Progress dots */}
          <div className="flex justify-center gap-1 mb-4 flex-wrap max-w-xs mx-auto">
            {Array.from({ length: progress.total }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full border border-black transition-colors ${
                  index < progress.current ? 'bg-[#2F3BBD]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Card stack visual */}
          <div className="relative">
            {cardPhase !== 'complete' && (
              <>
                <div className="absolute inset-0 bg-gray-200 border-4 border-black transform translate-x-2 translate-y-2 -z-10 rounded-lg" />
                <div className="absolute inset-0 bg-gray-300 border-4 border-black transform translate-x-4 translate-y-4 -z-20 rounded-lg" />
              </>
            )}

            <AnimatePresence mode="wait" custom={direction}>
              {/* Intro cards */}
              {cardPhase === 'intro' && currentIntroCard && (
                <motion.div
                  key={`intro-${currentIntroCard.id}`}
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
              )}

              {/* Rubric criteria cards */}
              {cardPhase === 'rubric' && currentRubricCard && (
                <motion.div
                  key={`rubric-${currentRubricCard.id}`}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="bg-gradient-to-br from-green-100 to-emerald-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 rounded-lg"
                >
                  <div className="text-center mb-4">
                    <span className="text-5xl mb-3 block">{rubricEmojis[currentRubricCard.id] || '⭐'}</span>
                    <p className="text-sm font-bold text-green-700 uppercase tracking-wide mb-1">
                      Rule {cardIndex + 1} of {rubricCount}
                    </p>
                    <h2 className="font-display text-2xl font-black text-neutral-dark">
                      {currentRubricCard.title}
                    </h2>
                    <p className="text-neutral mt-2">{currentRubricCard.description}</p>
                  </div>

                  <div className="bg-white border-2 border-black p-4 rounded">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Star className="w-5 h-5 text-amber-500" />
                      <span className="font-bold text-neutral-dark">Worth up to {currentRubricCard.maxPoints} {currentRubricCard.maxPoints === 1 ? 'point' : 'points'}!</span>
                    </div>
                    <div className="space-y-2">
                      {currentRubricCard.levels.map((level) => (
                        <div key={level.score} className="flex items-start gap-2 text-sm">
                          <span className="font-black text-[#2F3BBD] w-6 text-center">{level.score}</span>
                          <div>
                            <span className="font-bold text-green-600">{level.label}:</span>{' '}
                            <span className="text-neutral">{level.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Example cards */}
              {cardPhase === 'examples' && currentExampleCard && (
                <motion.div
                  key={`example-${currentExampleCard.id}`}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={`bg-gradient-to-br ${
                    currentExampleCard.quality === 'strong'
                      ? 'from-green-50 to-emerald-50'
                      : 'from-amber-50 to-yellow-50'
                  } border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 rounded-lg`}
                >
                  <div className="text-center mb-4">
                    <span className="text-4xl mb-2 block">
                      {currentExampleCard.quality === 'strong' ? '🌟' : '📝'}
                    </span>
                    <Badge
                      variant={currentExampleCard.quality === 'strong' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {currentExampleCard.quality === 'strong' ? 'Great Example!' : 'Keep Trying!'}
                    </Badge>
                    <p className="text-sm text-neutral mt-2">{currentExampleCard.policy}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white border-2 border-black p-3 rounded">
                      <p className="text-xs font-bold text-[#2F3BBD] uppercase mb-1">What I Think & Why</p>
                      <p className="text-sm text-neutral-dark">
                        <span className="font-bold">{currentExampleCard.stance}:</span> {currentExampleCard.reasoning}
                      </p>
                    </div>

                    <div className="bg-white border-2 border-black p-3 rounded">
                      <p className="text-xs font-bold text-amber-600 uppercase mb-1">What Others Might Think</p>
                      <p className="text-sm text-neutral-dark">
                        {currentExampleCard.otherSide || currentExampleCard.steelman}
                      </p>
                    </div>

                    <div className={`flex items-center gap-2 p-3 rounded border-2 ${
                      currentExampleCard.quality === 'strong'
                        ? 'bg-green-100 border-green-300'
                        : 'bg-amber-100 border-amber-300'
                    }`}>
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${
                        currentExampleCard.quality === 'strong' ? 'text-green-600' : 'text-amber-600'
                      }`} />
                      <div>
                        <p className="text-xs font-bold text-neutral-dark">
                          Score: {currentExampleCard.score}/{currentExampleCard.maxScore}
                        </p>
                        <p className="text-sm text-neutral">{currentExampleCard.feedback}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Complete card */}
              {cardPhase === 'complete' && (
                <motion.div
                  key="complete"
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 rounded-lg"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-[#2F3BBD] border-4 border-black rounded-full flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="font-display text-2xl font-black text-neutral-dark mb-2">
                      You&apos;re Ready!
                    </h2>
                    <p className="text-neutral mb-4">
                      Now you know how to share great ideas. Remember:
                    </p>
                    <div className="space-y-2 text-left bg-white border-2 border-black p-4 rounded mb-6">
                      <p className="flex items-center gap-2 text-sm">
                        <span className="text-lg">💬</span> Share your opinion and say why
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <span className="text-lg">🤔</span> Think about what others might say
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <span className="text-lg">💖</span> Be kind and respectful
                      </p>
                    </div>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => router.push('/education/student/discuss')}
                      rightIcon={<ChevronRight className="w-5 h-5" />}
                    >
                      Let&apos;s Share Ideas!
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {cardPhase !== 'complete' && (
            <div className="flex justify-between mt-6">
              <Button
                variant="secondary"
                size="md"
                onClick={handlePrevCard}
                disabled={cardPhase === 'intro' && cardIndex === 0}
                leftIcon={<ChevronLeft className="w-4 h-4" />}
              >
                Back
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleNextCard}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                {cardPhase === 'examples' && cardIndex === examplesCount - 1 ? 'Done!' : 'Next'}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Standard view for other grade levels
  return (
    <div className="min-h-screen bg-neutral-light dark:bg-gray-950">
      {/* Header with progress */}
      <StudentProgressHeader currentStep={2} />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2 text-center">
          Rubric & Examples
        </h1>
        <p className="text-center text-neutral dark:text-gray-400 mb-6">
          See how responses are graded and learn from examples.
        </p>

        {/* Rubric Section */}
        <div className="mb-8">
          <h2 className="font-bold text-lg text-neutral-dark dark:text-white mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            Grading Rubric
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rubricCriteria.map((criterion) => (
              <Card key={criterion.id} variant="default" padding="md" className="h-full">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-dark dark:text-white">
                      {criterion.title}
                    </h3>
                    <p className="text-sm text-neutral dark:text-gray-400">
                      {criterion.description}
                    </p>
                  </div>
                  <div className="text-right ml-3">
                    <span className="text-2xl font-black text-[#2F3BBD]">/{criterion.maxPoints}</span>
                  </div>
                </div>
                <div className="space-y-1 mt-3">
                  {criterion.levels.map((level) => (
                    <div
                      key={level.score}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="font-mono font-bold text-[#2F3BBD] w-4 flex-shrink-0">{level.score}</span>
                      <div>
                        <span className="font-bold text-neutral-dark dark:text-white">{level.label}:</span>{' '}
                        <span className="text-neutral dark:text-gray-400">{level.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Examples Section */}
        <div className="mb-8">
          <h2 className="font-bold text-lg text-neutral-dark dark:text-white mb-3 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#2F3BBD]" />
            Example Responses
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {exampleResponses.map((example) => (
              <Card
                key={example.id}
                variant="default"
                padding="md"
                className={`h-full ${example.quality === 'strong' ? 'border-green-500 border-2' : 'border-amber-400 border-2'}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={example.quality === 'strong' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {example.quality === 'strong'
                        ? (isElementary ? 'Great Example!' : 'Strong Example')
                        : (isElementary ? 'Keep Trying!' : 'Needs Improvement')}
                    </Badge>
                    <span className="text-sm text-neutral dark:text-gray-400">
                      {example.policy}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-black text-lg text-[#2F3BBD]">{example.score}</span>
                    <span className="text-sm text-neutral">/{example.maxScore}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-bold text-neutral uppercase mb-1">
                      {isElementary ? 'What I Think & Why' : 'Position & Reasoning'}
                    </p>
                    <p className="text-sm text-neutral-dark dark:text-white bg-white dark:bg-gray-800 p-2 border-l-4 border-[#2F3BBD]">
                      <span className="font-bold">{example.stance}:</span> {example.reasoning}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-neutral uppercase mb-1">
                      {isElementary ? 'What Others Might Think' : (isMiddleSchool ? 'Other Perspectives' : 'Steelman')}
                    </p>
                    <p className="text-sm text-neutral-dark dark:text-white bg-white dark:bg-gray-800 p-2 border-l-4 border-amber-400">
                      {example.otherSide || example.steelman}
                    </p>
                  </div>

                  <div className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-800/50">
                    <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${example.quality === 'strong' ? 'text-green-500' : 'text-amber-500'}`} />
                    <p className="text-sm text-neutral dark:text-gray-400">
                      <span className="font-bold">{isElementary ? 'Teacher says:' : 'Feedback:'}</span> {example.feedback}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Continue to discussion */}
        <div className="flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/education/student/discuss')}
            rightIcon={<ChevronRight className="w-5 h-5" />}
            className="w-full max-w-md"
          >
            Continue to Class Discussion
          </Button>
        </div>
      </div>
    </div>
  );
}
