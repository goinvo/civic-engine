'use client';

import type { ImplementationApproach, ImplementationRating } from '@/types/problem-areas';
import { RATING_LABELS } from '@/types/problem-areas';
import { MiniRadar } from './PreferenceRadar';

interface MiniApproachCardProps {
  approach: ImplementationApproach;
  /** User's rating for this approach (if rated) */
  rating?: ImplementationRating | null;
  /** Whether this approach is currently focused */
  isFocused?: boolean;
  /** Click handler to focus this approach */
  onFocus?: () => void;
  /** Show mini radar */
  showRadar?: boolean;
  /** Class name */
  className?: string;
}

/**
 * Compact approach card for sidebar comparison view.
 * Shows title, summary excerpt, optional rating badge, and mini radar.
 */
export function MiniApproachCard({
  approach,
  rating,
  isFocused = false,
  onFocus,
  showRadar = true,
  className = '',
}: MiniApproachCardProps) {
  const hasRating = rating !== undefined && rating !== null;

  // Get rating color
  const getRatingColor = (r: ImplementationRating) => {
    if (r >= 1) return 'bg-green-100 text-green-800 border-green-300';
    if (r <= -1) return 'bg-red-100 text-red-800 border-red-300';
    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

  // Truncate summary for compact display
  const truncatedSummary =
    approach.summary.length > 80 ? approach.summary.slice(0, 80) + '...' : approach.summary;

  return (
    <button
      onClick={onFocus}
      className={`
        w-full text-left p-3 border-2 transition-all duration-200
        ${isFocused ? 'border-blue-500 bg-blue-50 shadow-[3px_3px_0px_0px_rgba(59,130,246,0.5)]' : 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50'}
        ${className}
      `}
    >
      <div className="flex gap-3">
        {/* Mini radar */}
        {showRadar && (
          <div className="flex-shrink-0">
            <MiniRadar
              approachId={approach.id}
              size={60}
              color={isFocused ? '#3B82F6' : '#6B7280'}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4
              className={`font-semibold text-sm leading-tight ${isFocused ? 'text-blue-700' : 'text-gray-900'}`}
            >
              {approach.title}
            </h4>

            {/* Rating badge */}
            {hasRating && (
              <span
                className={`
                  flex-shrink-0 text-xs font-medium px-1.5 py-0.5 border rounded
                  ${getRatingColor(rating!)}
                `}
              >
                {rating! > 0 ? '+' : ''}
                {rating}
              </span>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{truncatedSummary}</p>
        </div>
      </div>
    </button>
  );
}

/**
 * Horizontal mini card for inline display
 */
interface InlineApproachCardProps {
  approach: ImplementationApproach;
  rating?: ImplementationRating | null;
  onClick?: () => void;
}

export function InlineApproachCard({ approach, rating, onClick }: InlineApproachCardProps) {
  const hasRating = rating !== undefined && rating !== null;

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 bg-white hover:bg-gray-50 rounded-full text-sm transition-colors"
    >
      <span className="font-medium text-gray-700">{approach.title}</span>
      {hasRating && (
        <span
          className={`
            text-xs font-semibold px-1.5 py-0.5 rounded
            ${rating! >= 1 ? 'bg-green-100 text-green-700' : rating! <= -1 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}
          `}
        >
          {rating! > 0 ? '+' : ''}
          {rating}
        </span>
      )}
    </button>
  );
}
