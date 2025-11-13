'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Policy } from '@/types/policy';
import { Check } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface CompareWidgetProps {
  policyA: Policy;
  policyB: Policy;
  onRate?: (policyAScore: number, policyBScore: number) => void;
}

type LikertValue = 1 | 2 | 3 | 4 | 5 | null;

const likertLabels = [
  { value: 1, label: 'Strongly Oppose', shortLabel: 'Strongly\nOppose', emoji: '😠' },
  { value: 2, label: 'Oppose', shortLabel: 'Oppose', emoji: '😕' },
  { value: 3, label: 'Neutral', shortLabel: 'Neutral', emoji: '😐' },
  { value: 4, label: 'Support', shortLabel: 'Support', emoji: '😊' },
  { value: 5, label: 'Strongly Support', shortLabel: 'Strongly\nSupport', emoji: '😍' },
];

export default function CompareWidget({ policyA, policyB, onRate }: CompareWidgetProps) {
  const [ratingA, setRatingA] = useState<LikertValue>(null);
  const [ratingB, setRatingB] = useState<LikertValue>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (ratingA !== null && ratingB !== null) {
      setShowResult(true);
      if (onRate) {
        onRate(ratingA, ratingB);
      }
    }
  };

  const reset = () => {
    setRatingA(null);
    setRatingB(null);
    setShowResult(false);
  };

  // Get icons
  const IconA = policyA.icon
    ? (Icons[policyA.icon as keyof typeof Icons] as LucideIcon)
    : null;
  const IconB = policyB.icon
    ? (Icons[policyB.icon as keyof typeof Icons] as LucideIcon)
    : null;

  const getLikertColor = (value: number) => {
    const colors = [
      'from-red-600 to-red-400',      // 1 - Strongly Oppose
      'from-orange-500 to-orange-300', // 2 - Oppose
      'from-gray-500 to-gray-300',     // 3 - Neutral
      'from-blue-500 to-blue-300',     // 4 - Support
      'from-green-600 to-green-400',   // 5 - Strongly Support
    ];
    return colors[value - 1];
  };

  return (
    <div className="w-full">
      {/* Question Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-dark mb-3">
          Rate Your Support for Each Policy
        </h2>
        <p className="text-neutral">
          Use the scale below to indicate how much you support each policy
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Policy A */}
        <div className="bg-white rounded-xl border-2 border-gray-300 p-6 shadow-md">
          {/* Badge */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            {IconA && (
              <div className="w-10 h-10 bg-neutral-light rounded-lg flex items-center justify-center">
                <IconA className="w-5 h-5 text-primary" />
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-neutral-dark mb-3">
            {policyA.title}
          </h3>

          {/* Description */}
          <p className="text-neutral text-sm mb-4">
            {policyA.description}
          </p>

          {/* Support */}
          <div className="flex items-center space-x-2 pb-4 mb-4 border-b border-gray-200">
            <div className="text-xl font-bold text-primary">
              {policyA.averageSupport}%
            </div>
            <div className="text-sm text-neutral">bipartisan support</div>
          </div>

          {/* Likert Scale */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-neutral-dark mb-2">
              Your Support Level:
            </label>
            <div className="grid grid-cols-5 gap-2">
              {likertLabels.map((item) => (
                <motion.button
                  key={item.value}
                  onClick={() => !showResult && setRatingA(item.value as LikertValue)}
                  disabled={showResult}
                  whileHover={!showResult ? { scale: 1.05 } : {}}
                  whileTap={!showResult ? { scale: 0.95 } : {}}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
                    ${ratingA === item.value
                      ? `bg-gradient-to-br ${getLikertColor(item.value)} text-white border-transparent shadow-lg ring-2 ring-offset-2 ring-primary`
                      : 'bg-white border-gray-300 hover:border-primary hover:shadow-md'
                    }
                    ${showResult ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
                  `}
                  title={item.label}
                >
                  <span className="text-2xl mb-1">{item.emoji}</span>
                  <span className={`text-[10px] leading-tight text-center font-medium ${ratingA === item.value ? 'text-white' : 'text-gray-700'}`}>
                    {item.shortLabel}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Policy B */}
        <div className="bg-white rounded-xl border-2 border-gray-300 p-6 shadow-md">
          {/* Badge */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-200 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            {IconB && (
              <div className="w-10 h-10 bg-neutral-light rounded-lg flex items-center justify-center">
                <IconB className="w-5 h-5 text-red-500" />
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-neutral-dark mb-3">
            {policyB.title}
          </h3>

          {/* Description */}
          <p className="text-neutral text-sm mb-4">
            {policyB.description}
          </p>

          {/* Support */}
          <div className="flex items-center space-x-2 pb-4 mb-4 border-b border-gray-200">
            <div className="text-xl font-bold text-red-500">
              {policyB.averageSupport}%
            </div>
            <div className="text-sm text-neutral">bipartisan support</div>
          </div>

          {/* Likert Scale */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-neutral-dark mb-2">
              Your Support Level:
            </label>
            <div className="grid grid-cols-5 gap-2">
              {likertLabels.map((item) => (
                <motion.button
                  key={item.value}
                  onClick={() => !showResult && setRatingB(item.value as LikertValue)}
                  disabled={showResult}
                  whileHover={!showResult ? { scale: 1.05 } : {}}
                  whileTap={!showResult ? { scale: 0.95 } : {}}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
                    ${ratingB === item.value
                      ? `bg-gradient-to-br ${getLikertColor(item.value)} text-white border-transparent shadow-lg ring-2 ring-offset-2 ring-primary`
                      : 'bg-white border-gray-300 hover:border-primary hover:shadow-md'
                    }
                    ${showResult ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
                  `}
                  title={item.label}
                >
                  <span className="text-2xl mb-1">{item.emoji}</span>
                  <span className={`text-[10px] leading-tight text-center font-medium ${ratingB === item.value ? 'text-white' : 'text-gray-700'}`}>
                    {item.shortLabel}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      {!showResult && (
        <div className="text-center mb-8">
          <button
            onClick={handleSubmit}
            disabled={ratingA === null || ratingB === null}
            className={`
              px-8 py-4 rounded-lg font-bold text-lg transition-all
              ${ratingA !== null && ratingB !== null
                ? 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Submit Ratings
          </button>
        </div>
      )}

      {/* Result/Reset */}
      <AnimatePresence>
        {showResult && ratingA !== null && ratingB !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-center bg-gradient-to-r from-primary/10 to-red-50 rounded-xl p-6 sm:p-8 border border-primary/20"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-dark mb-3">
              Thank You for Rating!
            </h3>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-4">
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-neutral-dark">Policy A:</span>
                <div className={`px-4 py-2 rounded-lg bg-gradient-to-br ${getLikertColor(ratingA)} text-white font-bold shadow-md`}>
                  {likertLabels[ratingA - 1].emoji} {likertLabels[ratingA - 1].label}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-neutral-dark">Policy B:</span>
                <div className={`px-4 py-2 rounded-lg bg-gradient-to-br ${getLikertColor(ratingB)} text-white font-bold shadow-md`}>
                  {likertLabels[ratingB - 1].emoji} {likertLabels[ratingB - 1].label}
                </div>
              </div>
            </div>
            <p className="text-neutral mb-4">
              In the full version, your ratings would be recorded to help understand
              public support levels for each policy.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-md hover:shadow-lg"
            >
              Rate More Policies
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Notice */}
      {!showResult && (
        <div className="text-center">
          <p className="text-sm text-neutral bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
            <strong>Demo Mode:</strong> Ratings are not recorded. Login required
            for actual voting.
          </p>
        </div>
      )}
    </div>
  );
}
