'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Tradeoffs } from '@/types/problem-areas';

interface TradeoffsDisplayProps {
  tradeoffs: Tradeoffs;
  defaultExpanded?: boolean;
  compact?: boolean;
}

export function TradeoffsDisplay({
  tradeoffs,
  defaultExpanded = false,
  compact = false,
}: TradeoffsDisplayProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (compact && !expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 focus:outline-none rounded"
      >
        <ChevronDown className="w-4 h-4" />
        View tradeoffs ({tradeoffs.benefits.length + tradeoffs.costs.length} points)
      </button>
    );
  }

  return (
    <div className="space-y-4">
      {compact && (
        <button
          onClick={() => setExpanded(false)}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black dark:hover:text-white focus:outline-none"
        >
          <ChevronUp className="w-4 h-4" />
          Hide tradeoffs
        </button>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {/* Benefits */}
        <div className="border-2 border-black dark:border-gray-600 p-4 bg-gray-50 dark:bg-gray-800/50">
          <h4 className="text-xs font-black uppercase tracking-widest text-black dark:text-white mb-3">
            Potential Benefits
          </h4>
          <ul className="space-y-2">
            {tradeoffs.benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <span className="text-black dark:text-white mt-0.5 font-mono font-bold text-xs" aria-hidden="true">+</span>
                <span className="leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Costs */}
        <div className="border-2 border-black dark:border-gray-600 p-4 bg-gray-50 dark:bg-gray-800/50">
          <h4 className="text-xs font-black uppercase tracking-widest text-black dark:text-white mb-3">
            Potential Drawbacks
          </h4>
          <ul className="space-y-2">
            {tradeoffs.costs.map((cost, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <span className="text-black dark:text-white mt-0.5 font-mono font-bold text-xs" aria-hidden="true">−</span>
                <span className="leading-relaxed">{cost}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * Inline compact tradeoffs for smaller displays
 */
export function TradeoffsInline({ tradeoffs }: { tradeoffs: Tradeoffs }) {
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {tradeoffs.benefits.slice(0, 2).map((benefit, i) => (
        <span
          key={i}
          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
        >
          <span className="font-mono mr-1">+</span>{benefit}
        </span>
      ))}
      {tradeoffs.costs.slice(0, 2).map((cost, i) => (
        <span
          key={i}
          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
        >
          <span className="font-mono mr-1">−</span>{cost}
        </span>
      ))}
    </div>
  );
}
