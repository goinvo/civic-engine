'use client';

import { useState } from 'react';
import type { ProblemArea } from '@/types/problem-areas';
import { Check } from 'lucide-react';
import { DynamicIcon } from './DynamicIcon';

interface ProblemAreaCardProps {
  problemArea: ProblemArea;
  isSelected: boolean;
  onToggle: (id: string) => void;
  disabled?: boolean;
  showDetails?: boolean;
}

export function ProblemAreaCard({
  problemArea,
  isSelected,
  onToggle,
  disabled = false,
  showDetails = false,
}: ProblemAreaCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      onToggle(problemArea.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="checkbox"
      aria-checked={isSelected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        relative p-6 border-2 transition-all cursor-pointer
        ${disabled && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}
        ${
          isSelected
            ? 'border-black bg-white dark:bg-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }
        focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] focus:ring-offset-2
      `}
    >
      {/* Selection indicator */}
      <div
        className={`
          absolute top-3 right-3 w-6 h-6 border-2 flex items-center justify-center
          transition-colors
          ${
            isSelected
              ? 'bg-black border-black'
              : 'border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700'
          }
        `}
      >
        {isSelected && <Check className="w-4 h-4 text-white" aria-hidden="true" />}
      </div>

      {/* Icon and title */}
      <div className="flex items-start gap-4 mb-3">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: problemArea.color + '20' }}
        >
          <DynamicIcon
            name={problemArea.icon}
            className="w-6 h-6"
            style={{ color: problemArea.color }}
          />
        </div>
        <div className="flex-1 min-w-0 pr-6">
          <h3 className="font-display font-bold text-lg text-black dark:text-white mb-1">
            {problemArea.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {problemArea.approachCount} approaches to explore
          </p>
        </div>
      </div>

      {/* Description */}
      <p
        className={`text-sm text-gray-700 dark:text-gray-300 leading-relaxed ${
          showDetails ? '' : 'line-clamp-2'
        }`}
      >
        {problemArea.description}
      </p>

      {/* Expandable details */}
      {showDetails && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className="mt-3 text-sm font-medium text-[#2F3BBD] hover:underline focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] focus:ring-offset-1 rounded"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}

      {expanded && showDetails && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">
                Where Americans Agree
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {problemArea.consensus}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">
                Where We Disagree
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {problemArea.disagreement}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
