'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, BookOpen } from 'lucide-react';
import type { ImplementationApproach, ImplementationRating } from '@/types/problem-areas';
import { RatingInput, RatingBadge } from './RatingInput';
import { TradeoffsDisplay } from './TradeoffsDisplay';
import { VoicesList } from './VoiceCard';
import { DynamicIcon } from './DynamicIcon';

interface ApproachCardProps {
  approach: ImplementationApproach;
  rating?: ImplementationRating;
  onRatingChange?: (approachId: string, rating: ImplementationRating) => void;
  defaultExpanded?: boolean;
  showRating?: boolean;
}

export function ApproachCard({
  approach,
  rating,
  onRatingChange,
  defaultExpanded = false,
  showRating = true,
}: ApproachCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleRatingChange = (newRating: ImplementationRating) => {
    if (onRatingChange) {
      onRatingChange(approach.id, newRating);
    }
  };

  return (
    <article
      className={`
        border-2 transition-all bg-white dark:bg-gray-900
        ${rating !== undefined
          ? 'border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
          : 'border-gray-300 dark:border-gray-700'
        }
      `}
    >
      {/* Header - always visible */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          {approach.icon && (
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
              <DynamicIcon name={approach.icon} className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display font-bold text-xl text-black dark:text-white">
                {approach.title}
              </h3>
              {rating !== undefined && (
                <RatingBadge rating={rating} size="sm" />
              )}
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              {approach.summary}
            </p>
          </div>
        </div>

        {/* Rating input */}
        {showRating && (
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              How do you feel about this approach?
            </p>
            <RatingInput
              value={rating}
              onChange={handleRatingChange}
            />
          </div>
        )}

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-[#2F3BBD] hover:underline focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] focus:ring-offset-1 rounded"
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Learn more about this approach
            </>
          )}
        </button>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t-2 border-gray-200 dark:border-gray-700 p-6 space-y-6">
          {/* How it works */}
          <section>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              How It Works
            </h4>
            <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed bg-gray-50 dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
              {approach.mechanism}
            </div>
          </section>

          {/* Tradeoffs */}
          <section>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
              Tradeoffs
            </h4>
            <TradeoffsDisplay tradeoffs={approach.tradeoffs} defaultExpanded />
          </section>

          {/* Source */}
          <section>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
              Source
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
              <ExternalLink className="w-4 h-4 shrink-0 mt-0.5" />
              {approach.source}
            </p>
          </section>

          {/* Voices */}
          <section>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
              What People Say
            </h4>
            <VoicesList
              voices_support={approach.voices_support}
              voices_opposition={approach.voices_opposition}
            />
          </section>

          {/* Evidence */}
          <section>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
              Evidence & Research
            </h4>
            <ul className="space-y-2">
              {approach.evidence.map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                >
                  <span className="text-gray-400 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Organizations */}
          {(approach.endorsing_orgs?.length || approach.opposing_orgs?.length) && (
            <section className="grid md:grid-cols-2 gap-4">
              {approach.endorsing_orgs && approach.endorsing_orgs.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-green-700 dark:text-green-400 mb-2">
                    Endorsing Organizations
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {approach.endorsing_orgs.map((org, i) => (
                      <li key={i}>• {org}</li>
                    ))}
                  </ul>
                </div>
              )}
              {approach.opposing_orgs && approach.opposing_orgs.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-red-700 dark:text-red-400 mb-2">
                    Opposing Organizations
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {approach.opposing_orgs.map((org, i) => (
                      <li key={i}>• {org}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </article>
  );
}
