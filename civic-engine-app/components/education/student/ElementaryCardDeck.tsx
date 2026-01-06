'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  ChevronRight,
  Shuffle,
  Send,
  ThumbsUp,
  Users,
  HelpCircle,
  Scale,
  Sparkles,
  MessageCircle,
  Heart,
  Check,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/education/ui/Button';
import {
  ShowcaseProgressDots,
  ShowcaseCompleteCard,
  cardThemes,
  type CardTheme,
} from './ElementaryShowcaseCard';

// Prompt options with Lucide icons
const prompts: { id: string; text: string; icon: LucideIcon; theme: CardTheme }[] = [
  { id: 'like', text: 'What do you like about this idea?', icon: ThumbsUp, theme: 'green' },
  { id: 'help', text: 'Who would this help?', icon: Users, theme: 'blue' },
  { id: 'worry', text: 'Is there anything that worries you about this?', icon: HelpCircle, theme: 'amber' },
  { id: 'fair', text: 'Do you think this is fair for everyone?', icon: Scale, theme: 'purple' },
  { id: 'change', text: 'What would you change about this idea?', icon: Sparkles, theme: 'rose' },
  { id: 'feel', text: 'How does this idea make you feel?', icon: Heart, theme: 'teal' },
];

interface PolicyTopic {
  id: string;
  title: string;
  description: string;
}

interface StudentResponse {
  id: string;
  authorName: string;
  content: string;
  policyId: string;
}

interface ElementaryCardDeckProps {
  policies: PolicyTopic[];
  existingResponses: StudentResponse[];
  userName: string;
  onSubmitResponse: (policyId: string, content: string, promptUsed: string) => void;
  onComplete: () => void;
}

type CardType = 'intro' | 'prompt' | 'response' | 'complete';

interface CardState {
  type: CardType;
  policyIndex: number;
  promptIndex: number;
  showingReplies: boolean;
  replyIndex: number;
}

// Animation variants with spring physics
const cardVariants: Variants = {
  enter: {
    scale: 0.8,
    y: 30,
    opacity: 0,
    rotateY: -10,
  },
  center: {
    scale: 1,
    y: 0,
    opacity: 1,
    rotateY: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      mass: 0.8,
    },
  },
  exit: {
    scale: 0.8,
    y: -30,
    opacity: 0,
    rotateY: 10,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

// Icon animation with bounce
const iconVariants: Variants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 15,
      delay: 0.1,
    },
  },
  hover: {
    scale: 1.1,
    rotate: [0, -10, 10, -5, 5, 0],
    transition: {
      rotate: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  },
};

// Button pulse animation for "try another"
const pulseVariants: Variants = {
  initial: { opacity: 0, x: -10, scale: 0.9 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    x: -10,
    scale: 0.9,
  },
};

export function ElementaryCardDeck({
  policies,
  existingResponses,
  userName,
  onSubmitResponse,
  onComplete,
}: ElementaryCardDeckProps) {
  const [cardState, setCardState] = useState<CardState>({
    type: 'intro',
    policyIndex: 0,
    promptIndex: Math.floor(Math.random() * prompts.length),
    showingReplies: false,
    replyIndex: 0,
  });
  const [response, setResponse] = useState('');
  const [showTryAnother, setShowTryAnother] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentPolicy = policies[cardState.policyIndex];
  const currentPrompt = prompts[cardState.promptIndex];

  // Get responses for current policy from other students
  const policyResponses = existingResponses.filter(r => r.policyId === currentPolicy?.id);

  // Show "try another" button after 3 seconds on prompt cards
  useEffect(() => {
    if (cardState.type === 'prompt' && !cardState.showingReplies) {
      setShowTryAnother(false);
      const timer = setTimeout(() => setShowTryAnother(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [cardState.type, cardState.promptIndex, cardState.showingReplies]);

  const handleNextCard = useCallback(() => {
    if (cardState.type === 'intro') {
      setCardState(prev => ({ ...prev, type: 'prompt' }));
    } else if (cardState.type === 'prompt' && !cardState.showingReplies) {
      if (policyResponses.length > 0) {
        setCardState(prev => ({ ...prev, showingReplies: true, replyIndex: 0 }));
      } else {
        moveToNextPolicy();
      }
    } else if (cardState.showingReplies) {
      if (cardState.replyIndex < policyResponses.length - 1) {
        setCardState(prev => ({ ...prev, replyIndex: prev.replyIndex + 1 }));
      } else {
        moveToNextPolicy();
      }
    }
  }, [cardState, policyResponses.length]);

  const moveToNextPolicy = () => {
    const nextIndex = cardState.policyIndex + 1;
    if (nextIndex >= policies.length) {
      setCardState(prev => ({ ...prev, type: 'complete' }));
    } else {
      setCardState({
        type: 'intro',
        policyIndex: nextIndex,
        promptIndex: Math.floor(Math.random() * prompts.length),
        showingReplies: false,
        replyIndex: 0,
      });
      setResponse('');
    }
  };

  const handleTryAnotherPrompt = () => {
    const newIndex = (cardState.promptIndex + 1) % prompts.length;
    setCardState(prev => ({ ...prev, promptIndex: newIndex }));
    setShowTryAnother(false);
  };

  const handleSubmitResponse = () => {
    if (!response.trim() || !currentPolicy) return;

    setIsSubmitting(true);
    onSubmitResponse(currentPolicy.id, response.trim(), currentPrompt.id);

    setTimeout(() => {
      setIsSubmitting(false);
      handleNextCard();
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && response.trim()) {
      e.preventDefault();
      handleSubmitResponse();
    }
  };

  // Get theme config for current prompt
  const getThemeConfig = (theme: CardTheme) => cardThemes[theme];

  // Render card content based on state
  const renderCard = () => {
    const key = `${cardState.type}-${cardState.policyIndex}-${cardState.promptIndex}-${cardState.replyIndex}-${cardState.showingReplies}`;

    // Complete state
    if (cardState.type === 'complete') {
      return (
        <ShowcaseCompleteCard
          title={`Amazing Job, ${userName}!`}
          message={`You shared your thoughts on ${policies.length} big ideas!`}
          bulletPoints={[
            { icon: 'message', text: 'You shared your opinions' },
            { icon: 'users', text: 'You thought about others' },
            { icon: 'heart', text: 'You were kind and respectful' },
          ]}
          actionLabel="Continue"
          onAction={onComplete}
        />
      );
    }

    // Intro card
    if (cardState.type === 'intro') {
      const theme = getThemeConfig('blue');
      return (
        <motion.div
          key={key}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className={`bg-gradient-to-br ${theme.gradient} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 relative overflow-hidden`}
        >
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
            <div className={`absolute top-0 right-0 w-full h-full ${theme.iconBg} rounded-bl-full`} />
          </div>

          <div className="relative z-10 text-center">
            <motion.div
              variants={iconVariants}
              initial="initial"
              animate="animate"
              className="flex justify-center mb-4"
            >
              <div className={`w-20 h-20 ${theme.iconBg} border-4 border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                <Lightbulb className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className={`text-sm font-bold ${theme.accent} uppercase tracking-wide mb-1`}>
                Topic {cardState.policyIndex + 1} of {policies.length}
              </p>
              <h2 className="font-display text-2xl font-black text-neutral-dark mb-4">
                {currentPolicy?.title}
              </h2>
              <p className="text-lg text-neutral mb-6">
                {currentPolicy?.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={handleNextCard}
                rightIcon={<ChevronRight className="w-5 h-5" />}
              >
                Let&apos;s Think About It!
              </Button>
            </motion.div>
          </div>
        </motion.div>
      );
    }

    // Showing other students' replies
    if (cardState.showingReplies && policyResponses.length > 0) {
      const currentReply = policyResponses[cardState.replyIndex];
      const theme = getThemeConfig('purple');

      return (
        <motion.div
          key={key}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className={`bg-gradient-to-br ${theme.gradient} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
            <div className={`absolute top-0 right-0 w-full h-full ${theme.iconBg} rounded-bl-full`} />
          </div>

          <div className="relative z-10">
            <motion.div
              variants={iconVariants}
              initial="initial"
              animate="animate"
              className="flex justify-center mb-4"
            >
              <div className={`w-16 h-16 ${theme.iconBg} border-4 border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                <MessageCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-sm font-bold ${theme.accent} text-center mb-3`}
            >
              What {currentReply?.authorName} said:
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white border-2 border-black p-4 mb-4 min-h-[100px] rounded-xl"
            >
              <p className="text-lg text-neutral-dark italic">
                &ldquo;{currentReply?.content}&rdquo;
              </p>
            </motion.div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral">
                {cardState.replyIndex + 1} of {policyResponses.length} classmates
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={handleNextCard}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                {cardState.replyIndex < policyResponses.length - 1 ? 'See More' : 'Next Topic'}
              </Button>
            </div>
          </div>
        </motion.div>
      );
    }

    // Prompt card with response input
    const theme = getThemeConfig(currentPrompt.theme);
    const PromptIcon = currentPrompt.icon;

    return (
      <motion.div
        key={key}
        variants={cardVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className={`bg-gradient-to-br ${theme.gradient} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
          <div className={`absolute top-0 right-0 w-full h-full ${theme.iconBg} rounded-bl-full`} />
        </div>

        <div className="relative z-10">
          {/* Prompt icon and text */}
          <motion.div
            variants={iconVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex justify-center mb-4"
          >
            <div className={`w-16 h-16 ${theme.iconBg} border-4 border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer`}>
              <PromptIcon className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-xl font-black text-neutral-dark text-center mb-4"
          >
            {currentPrompt.text}
          </motion.h3>

          {/* Response input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-4"
          >
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer here..."
              className="w-full p-4 text-lg border-4 border-black bg-white focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] resize-none min-h-[120px] rounded-xl"
              rows={4}
            />
          </motion.div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <AnimatePresence>
              {showTryAnother && (
                <motion.button
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onClick={handleTryAnotherPrompt}
                  className="flex items-center gap-2 text-sm font-bold text-neutral hover:text-[#2F3BBD] transition-colors"
                >
                  <Shuffle className="w-4 h-4" />
                  Try a different question
                </motion.button>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="ml-auto"
            >
              <Button
                variant="primary"
                size="md"
                onClick={handleSubmitResponse}
                disabled={!response.trim() || isSubmitting}
                rightIcon={isSubmitting ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              >
                {isSubmitting ? 'Sent!' : 'Share'}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-lg mx-auto px-4">
      {/* Progress indicator */}
      {cardState.type !== 'complete' && (
        <div className="mb-4">
          <ShowcaseProgressDots
            total={policies.length}
            current={cardState.policyIndex}
            completed={cardState.policyIndex + (cardState.type !== 'intro' ? 1 : 0)}
          />
        </div>
      )}

      {/* Card stack visual (decorative cards behind) */}
      <div className="relative">
        {cardState.type !== 'complete' && (
          <>
            <motion.div
              className="absolute inset-0 bg-gray-200 border-4 border-black rounded-2xl"
              initial={{ x: 8, y: 8, opacity: 0 }}
              animate={{ x: 8, y: 8, opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{ zIndex: -1 }}
            />
            <motion.div
              className="absolute inset-0 bg-gray-300 border-4 border-black rounded-2xl"
              initial={{ x: 16, y: 16, opacity: 0 }}
              animate={{ x: 16, y: 16, opacity: 1 }}
              transition={{ delay: 0.15 }}
              style={{ zIndex: -2 }}
            />
          </>
        )}

        {/* Active card */}
        <AnimatePresence mode="wait">
          {renderCard()}
        </AnimatePresence>
      </div>

      {/* Topic label */}
      {cardState.type !== 'complete' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-neutral mt-4"
        >
          {currentPolicy?.title}
        </motion.p>
      )}
    </div>
  );
}
