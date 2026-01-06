'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Shuffle, Send, Sparkles, MessageCircle, Check } from 'lucide-react';
import { Card } from '@/components/education/ui/Card';
import { Button } from '@/components/education/ui/Button';

// Prompt options for each type
const prompts = [
  { id: 'like', text: 'What do you like about this idea?', emoji: '😊' },
  { id: 'help', text: 'Who would this help?', emoji: '🤝' },
  { id: 'worry', text: 'Is there anything that worries you about this?', emoji: '🤔' },
  { id: 'fair', text: 'Do you think this is fair for everyone?', emoji: '⚖️' },
  { id: 'change', text: 'What would you change about this idea?', emoji: '✨' },
  { id: 'feel', text: 'How does this idea make you feel?', emoji: '💭' },
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
  const [completedPolicies, setCompletedPolicies] = useState<Set<string>>(new Set());

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
      // Move to prompt card
      setCardState(prev => ({ ...prev, type: 'prompt' }));
    } else if (cardState.type === 'prompt' && !cardState.showingReplies) {
      // After responding, show replies if any exist
      if (policyResponses.length > 0) {
        setCardState(prev => ({ ...prev, showingReplies: true, replyIndex: 0 }));
      } else {
        // No replies, move to next policy
        moveToNextPolicy();
      }
    } else if (cardState.showingReplies) {
      // Show next reply or move to next policy
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
    setCompletedPolicies(prev => new Set(prev).add(currentPolicy.id));

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

  // Card animation variants
  const cardVariants = {
    enter: {
      scale: 0.95,
      y: 20,
      opacity: 0,
      rotateY: -5,
    },
    center: {
      scale: 1,
      y: 0,
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }
    },
    exit: {
      scale: 0.95,
      y: -20,
      opacity: 0,
      rotateY: 5,
      transition: { duration: 0.2 }
    },
  };

  // Progress dots
  const progressDots = (
    <div className="flex justify-center gap-2 mb-4">
      {policies.map((policy, index) => (
        <div
          key={policy.id}
          className={`w-3 h-3 rounded-full border-2 border-black transition-colors ${
            index < cardState.policyIndex
              ? 'bg-green-500'
              : index === cardState.policyIndex
              ? 'bg-[#2F3BBD]'
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );

  // Render different card types
  const renderCard = () => {
    const key = `${cardState.type}-${cardState.policyIndex}-${cardState.promptIndex}-${cardState.replyIndex}-${cardState.showingReplies}`;

    // Complete state
    if (cardState.type === 'complete') {
      return (
        <motion.div
          key="complete"
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full"
        >
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-green-500 border-4 border-black rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-display text-2xl font-black text-neutral-dark mb-2">
              Amazing Job, {userName}!
            </h2>
            <p className="text-neutral mb-6">
              You shared your thoughts on {policies.length} big ideas!
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={onComplete}
              rightIcon={<ChevronRight className="w-5 h-5" />}
            >
              Continue
            </Button>
          </div>
        </motion.div>
      );
    }

    // Intro card
    if (cardState.type === 'intro') {
      return (
        <motion.div
          key={key}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full"
        >
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
            <div className="text-center">
              <p className="text-sm font-bold text-[#2F3BBD] uppercase tracking-wide mb-2">
                Topic {cardState.policyIndex + 1} of {policies.length}
              </p>
              <h2 className="font-display text-3xl font-black text-neutral-dark mb-4">
                {currentPolicy?.title}
              </h2>
              <p className="text-lg text-neutral mb-8">
                {currentPolicy?.description}
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={handleNextCard}
                rightIcon={<ChevronRight className="w-5 h-5" />}
              >
                Let&apos;s Think About It!
              </Button>
            </div>
          </div>
        </motion.div>
      );
    }

    // Showing other students' replies
    if (cardState.showingReplies && policyResponses.length > 0) {
      const currentReply = policyResponses[cardState.replyIndex];
      return (
        <motion.div
          key={key}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full"
        >
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="w-5 h-5 text-purple-600" />
              <p className="text-sm font-bold text-purple-600">
                What {currentReply?.authorName} said:
              </p>
            </div>
            <div className="bg-white border-2 border-black p-4 mb-4 min-h-[100px]">
              <p className="text-lg text-neutral-dark">
                &ldquo;{currentReply?.content}&rdquo;
              </p>
            </div>
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
    return (
      <motion.div
        key={key}
        variants={cardVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="w-full"
      >
        <div className="bg-gradient-to-br from-amber-50 to-yellow-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
          {/* Prompt */}
          <div className="text-center mb-4">
            <span className="text-4xl mb-2 block">{currentPrompt.emoji}</span>
            <h3 className="font-display text-xl font-black text-neutral-dark">
              {currentPrompt.text}
            </h3>
          </div>

          {/* Response input */}
          <div className="mb-4">
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer here..."
              className="w-full p-4 text-lg border-4 border-black bg-white focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] resize-none min-h-[120px]"
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <AnimatePresence>
              {showTryAnother && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  onClick={handleTryAnotherPrompt}
                  className="flex items-center gap-2 text-sm font-bold text-neutral hover:text-[#2F3BBD] transition-colors"
                >
                  <Shuffle className="w-4 h-4" />
                  Try a different question
                </motion.button>
              )}
            </AnimatePresence>

            <Button
              variant="primary"
              size="md"
              onClick={handleSubmitResponse}
              disabled={!response.trim() || isSubmitting}
              rightIcon={isSubmitting ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              className="ml-auto"
            >
              {isSubmitting ? 'Sent!' : 'Share'}
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-lg mx-auto px-4">
      {/* Progress indicator */}
      {cardState.type !== 'complete' && progressDots}

      {/* Card stack visual (decorative cards behind) */}
      <div className="relative">
        {cardState.type !== 'complete' && (
          <>
            <div className="absolute inset-0 bg-gray-200 border-4 border-black transform translate-x-2 translate-y-2 -z-10" />
            <div className="absolute inset-0 bg-gray-300 border-4 border-black transform translate-x-4 translate-y-4 -z-20" />
          </>
        )}

        {/* Active card */}
        <AnimatePresence mode="wait">
          {renderCard()}
        </AnimatePresence>
      </div>

      {/* Topic label */}
      {cardState.type !== 'complete' && (
        <p className="text-center text-sm text-neutral mt-4">
          {currentPolicy?.title}
        </p>
      )}
    </div>
  );
}
