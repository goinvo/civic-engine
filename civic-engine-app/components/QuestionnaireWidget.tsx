'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LikertScale } from '@/types/values';
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';

// Generic question interface that works for all lens types
export interface QuestionnaireQuestion {
  id: string;
  text: string;
  explanation?: string;
  lowLabel?: string;
  highLabel?: string;
  tier?: number; // 1 = basic, 2 = detailed (default: 1)
}

// Theme configuration for different lenses
export interface QuestionnaireTheme {
  name: string;
  accentColor: string;        // Tailwind class for accent (e.g., 'bg-[#2F3BBD]')
  accentGradient?: string;    // Optional gradient (e.g., 'bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B]')
  progressBarColor: string;   // Tailwind class for progress bar
}

// Preset themes for each lens
export const QUESTIONNAIRE_THEMES: Record<'impact' | 'economics' | 'needs', QuestionnaireTheme> = {
  impact: {
    name: 'Impact Lens',
    accentColor: 'bg-[#2F3BBD]',
    progressBarColor: 'bg-[#2F3BBD]',
  },
  economics: {
    name: 'Economics Lens',
    accentColor: 'bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B]',
    accentGradient: 'bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B]',
    progressBarColor: 'bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B]',
  },
  needs: {
    name: 'Needs Lens',
    accentColor: 'bg-gradient-to-r from-[#501159] to-[#7B2D8E]',
    accentGradient: 'bg-gradient-to-r from-[#501159] to-[#7B2D8E]',
    progressBarColor: 'bg-gradient-to-r from-[#501159] to-[#7B2D8E]',
  },
};

// Likert scale labels
const LIKERT_LABELS: Record<LikertScale, string> = {
  1: 'Strongly Disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly Agree',
};

interface QuestionnaireWidgetProps {
  questions: QuestionnaireQuestion[];
  theme: QuestionnaireTheme;
  onComplete: (responses: Record<string, LikertScale>) => void;
  showHeader?: boolean;
  hasDeeperQuestions?: boolean; // Whether there are tier 2 questions available
}

export default function QuestionnaireWidget({
  questions,
  theme,
  onComplete,
  showHeader = true,
  hasDeeperQuestions = false,
}: QuestionnaireWidgetProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, LikertScale>>({});
  const [currentTier, setCurrentTier] = useState(1);
  const [showTierComplete, setShowTierComplete] = useState(false);

  // Filter questions by current tier
  const tierQuestions = questions.filter((q) => (q.tier || 1) === currentTier);
  const tier2Questions = questions.filter((q) => (q.tier || 1) === 2);
  const hasTier2 = hasDeeperQuestions && tier2Questions.length > 0;

  const currentQuestion = tierQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / tierQuestions.length) * 100;
  const isLastQuestion = currentQuestionIndex === tierQuestions.length - 1;
  const canContinue = currentQuestion && responses[currentQuestion.id] !== undefined;

  const handleResponse = (value: LikertScale) => {
    setResponses({
      ...responses,
      [currentQuestion.id]: value,
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // If we're on tier 1 and there are tier 2 questions, show completion screen
      if (currentTier === 1 && hasTier2) {
        setShowTierComplete(true);
      } else {
        // Final completion
        onComplete(responses);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinishNow = () => {
    onComplete(responses);
  };

  const handleContinueToTier2 = () => {
    setCurrentTier(2);
    setCurrentQuestionIndex(0);
    setShowTierComplete(false);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const accentClass = theme.accentGradient || theme.accentColor;

  // Tier completion screen - shown after completing tier 1 when tier 2 is available
  if (showTierComplete) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Badge */}
        {showHeader && (
          <div className="text-center mb-8">
            <span className={`inline-block px-4 py-2 ${accentClass} text-white font-display font-black text-sm border-4 border-black`}>
              {theme.name.toUpperCase()}
            </span>
          </div>
        )}

        {/* Completion Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)] p-8 text-center"
        >
          <div className={`inline-flex items-center justify-center w-16 h-16 ${accentClass} border-4 border-black mb-6`}>
            <CheckCircle className="w-8 h-8 text-white" />
          </div>

          <h2 className="font-display text-3xl font-black text-black dark:text-white mb-4">
            Quick Assessment Complete!
          </h2>

          <p className="font-body text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            You&apos;ve completed the basic {theme.name} questionnaire. Your profile is ready to use!
          </p>

          <div className="border-t-4 border-black dark:border-gray-600 pt-8 mt-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="font-display font-bold text-black dark:text-white">
                Want more accurate results?
              </span>
            </div>
            <p className="font-body text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Answer {tier2Questions.length} additional questions for a more detailed and nuanced evaluation of your priorities.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={handleFinishNow}
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white dark:bg-gray-700 text-black dark:text-white border-4 border-black dark:border-gray-600 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] transition-all"
            >
              <CheckCircle className="w-5 h-5" />
              <span>See Results</span>
            </button>

            <button
              onClick={handleContinueToTier2}
              className={`inline-flex items-center justify-center space-x-2 px-6 py-3 ${accentClass} text-white border-4 border-black dark:border-gray-600 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] transition-all`}
            >
              <Sparkles className="w-5 h-5" />
              <span>Answer More Questions</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header Badge */}
      {showHeader && (
        <div className="text-center mb-8">
          <span className={`inline-block px-4 py-2 ${accentClass} text-white font-display font-black text-sm border-4 border-black`}>
            {theme.name.toUpperCase()}{currentTier === 2 ? ' — DETAILED' : ''}
          </span>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="font-display font-bold text-sm text-black dark:text-white">
            Question {currentQuestionIndex + 1} of {tierQuestions.length}
            {currentTier === 2 && ' (Detailed)'}
          </span>
          <span className="font-display font-bold text-sm text-black dark:text-white">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 border-2 border-black dark:border-gray-600">
          <motion.div
            className={`h-full ${theme.progressBarColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      {currentQuestion && (
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)] p-8 mb-8"
        >
          <h2 className="font-display text-2xl font-black text-black dark:text-white mb-4">
            {currentQuestion.text}
          </h2>
          {currentQuestion.explanation && (
            <p className="font-body text-gray-600 dark:text-gray-400 mb-6">
              {currentQuestion.explanation}
            </p>
          )}

          {/* Likert Scale Options */}
          <div className="space-y-3">
            {([1, 2, 3, 4, 5] as LikertScale[]).map((value) => {
              const isSelected = responses[currentQuestion.id] === value;
              return (
                <button
                  key={value}
                  onClick={() => handleResponse(value)}
                  className={`w-full p-4 font-display font-bold text-left border-4 transition-all ${
                    isSelected
                      ? `${accentClass} text-white border-black dark:border-gray-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]`
                      : 'bg-white dark:bg-gray-700 text-black dark:text-white border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{LIKERT_LABELS[value]}</span>
                    <span className="text-sm opacity-60">{value}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Scale hints */}
          {(currentQuestion.lowLabel || currentQuestion.highLabel) && (
            <div className="mt-4 flex justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
              <span>{currentQuestion.lowLabel || ''}</span>
              <span>{currentQuestion.highLabel || ''}</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0 && currentTier === 1}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 text-black dark:text-white border-4 border-black dark:border-gray-600 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!canContinue}
          className={`inline-flex items-center space-x-2 px-6 py-3 ${accentClass} text-white border-4 border-black dark:border-gray-600 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
        >
          <span>{isLastQuestion ? 'Complete' : 'Next'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
