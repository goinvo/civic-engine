'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Policy } from '@/types/policy';
import { Check, X } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface CompareWidgetProps {
  policyA: Policy;
  policyB: Policy;
  onSelect?: (winner: 'A' | 'B') => void;
}

export default function CompareWidget({ policyA, policyB, onSelect }: CompareWidgetProps) {
  const [selected, setSelected] = useState<'A' | 'B' | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (choice: 'A' | 'B') => {
    setSelected(choice);
    setShowResult(true);
    if (onSelect) {
      onSelect(choice);
    }
  };

  const reset = () => {
    setSelected(null);
    setShowResult(false);
  };

  // Get icons
  const IconA = policyA.icon
    ? (Icons[policyA.icon as keyof typeof Icons] as LucideIcon)
    : null;
  const IconB = policyB.icon
    ? (Icons[policyB.icon as keyof typeof Icons] as LucideIcon)
    : null;

  return (
    <div className="w-full">
      {/* Question Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-dark mb-3">
          Which policy would you prioritize?
        </h2>
        <p className="text-neutral">
          Choose the one you think should be implemented first
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Policy A */}
        <motion.button
          onClick={() => !showResult && handleSelect('A')}
          disabled={showResult}
          className={`relative text-left p-6 sm:p-8 rounded-xl border-2 transition-all ${
            selected === 'A'
              ? 'border-primary bg-primary/5 shadow-xl'
              : selected === 'B'
              ? 'border-gray-200 bg-gray-50 opacity-60'
              : 'border-gray-300 bg-white hover:border-primary hover:shadow-lg'
          } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
          whileHover={!showResult ? { scale: 1.02 } : {}}
          whileTap={!showResult ? { scale: 0.98 } : {}}
        >
          {/* Selection Indicator */}
          <AnimatePresence>
            {selected === 'A' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-4 right-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg"
              >
                <Check className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>

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
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-dark mb-3">
            {policyA.title}
          </h3>

          {/* Description */}
          <p className="text-neutral text-sm sm:text-base mb-4">
            {policyA.description}
          </p>

          {/* Support */}
          <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
            <div className="text-2xl font-bold text-primary">
              {policyA.averageSupport}%
            </div>
            <div className="text-sm text-neutral">bipartisan support</div>
          </div>
        </motion.button>

        {/* Policy B */}
        <motion.button
          onClick={() => !showResult && handleSelect('B')}
          disabled={showResult}
          className={`relative text-left p-6 sm:p-8 rounded-xl border-2 transition-all ${
            selected === 'B'
              ? 'border-primary bg-primary/5 shadow-xl'
              : selected === 'A'
              ? 'border-gray-200 bg-gray-50 opacity-60'
              : 'border-gray-300 bg-white hover:border-primary hover:shadow-lg'
          } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
          whileHover={!showResult ? { scale: 1.02 } : {}}
          whileTap={!showResult ? { scale: 0.98 } : {}}
        >
          {/* Selection Indicator */}
          <AnimatePresence>
            {selected === 'B' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-4 right-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg"
              >
                <Check className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Badge */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            {IconB && (
              <div className="w-10 h-10 bg-neutral-light rounded-lg flex items-center justify-center">
                <IconB className="w-5 h-5 text-accent" />
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-dark mb-3">
            {policyB.title}
          </h3>

          {/* Description */}
          <p className="text-neutral text-sm sm:text-base mb-4">
            {policyB.description}
          </p>

          {/* Support */}
          <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
            <div className="text-2xl font-bold text-accent">
              {policyB.averageSupport}%
            </div>
            <div className="text-sm text-neutral">bipartisan support</div>
          </div>
        </motion.button>
      </div>

      {/* Result/Reset */}
      <AnimatePresence>
        {showResult && selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 sm:p-8 border border-primary/20"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-dark mb-3">
              You chose: {selected === 'A' ? policyA.title : policyB.title}
            </h3>
            <p className="text-neutral mb-4">
              In the full version, your preference would be recorded to help rank
              policies based on collective priorities.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-md hover:shadow-lg"
            >
              Compare Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Notice */}
      {!showResult && (
        <div className="text-center">
          <p className="text-sm text-neutral bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
            <strong>Demo Mode:</strong> Selections are not recorded. Login required
            for actual voting.
          </p>
        </div>
      )}
    </div>
  );
}
