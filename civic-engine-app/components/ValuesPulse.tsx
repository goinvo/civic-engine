'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { QUESTIONS, LIKERT_LABELS } from '@/data/values';
import { LikertScale, QuestionnaireResponses } from '@/types/values';
import { useValues } from '@/contexts/ValuesContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function ValuesPulse({ onComplete }: { onComplete?: () => void }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuestionnaireResponses>({});
  const { updateResponse, calculateWeightsFromResponses, saveProfile } = useValues();

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;
  const canContinue = responses[currentQuestion.id] !== undefined;

  const handleResponse = (value: LikertScale) => {
    const newResponses = {
      ...responses,
      [currentQuestion.id]: value,
    };
    setResponses(newResponses);
    updateResponse(currentQuestion.id, value);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate final weights and save profile
      const weights = calculateWeightsFromResponses(responses);
      saveProfile({
        archetypeId: 'custom',
        weights,
        responses,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      onComplete?.();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="font-display font-bold text-sm text-black dark:text-white">
            Question {currentQuestionIndex + 1} of {QUESTIONS.length}
          </span>
          <span className="font-display font-bold text-sm text-black dark:text-white">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 border-2 border-black dark:border-gray-600">
          <motion.div
            className="h-full bg-[#2F3BBD]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
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
                    ? 'bg-[#2F3BBD] text-white border-black dark:border-gray-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]'
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
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 text-black dark:text-white border-4 border-black dark:border-gray-600 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!canContinue}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#2F3BBD] text-white border-4 border-black dark:border-gray-600 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <span>{isLastQuestion ? 'Complete' : 'Next'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
