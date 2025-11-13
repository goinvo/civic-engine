'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  TrendingUp,
  TrendingDown,
  ThumbsUp,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { Policy } from '@/types/policy';

interface PolicyCardProps {
  policy: Policy;
  showVoteButton?: boolean;
}

export default function PolicyCard({ policy, showVoteButton = true }: PolicyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get the icon component dynamically
  const IconComponent = policy.icon
    ? (Icons[policy.icon as keyof typeof Icons] as LucideIcon)
    : null;

  // Category color mapping
  const categoryColors: Record<string, string> = {
    healthcare: 'bg-red-50 text-red-700 border-red-200',
    economy: 'bg-green-50 text-green-700 border-green-200',
    environment: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    education: 'bg-blue-50 text-blue-700 border-blue-200',
    justice: 'bg-purple-50 text-purple-700 border-purple-200',
    governance: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'civil-rights': 'bg-pink-50 text-pink-700 border-pink-200',
    defense: 'bg-gray-50 text-gray-700 border-gray-200',
    infrastructure: 'bg-orange-50 text-orange-700 border-orange-200',
    other: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  const categoryColor = categoryColors[policy.category] || categoryColors.other;

  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden">
      {/* Card Header */}
      <div className="p-5 sm:p-6">
        {/* Rank Badge and Category */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {/* Rank Badge */}
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary-dark rounded-lg shadow-sm">
              <span className="text-white font-bold text-lg sm:text-xl">
                #{policy.rank}
              </span>
            </div>

            {/* Icon */}
            {IconComponent && (
              <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-neutral-light rounded-lg">
                <IconComponent className="w-5 h-5 text-primary" />
              </div>
            )}
          </div>

          {/* Category Badge */}
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full border ${categoryColor}`}
          >
            {policy.category.replace('-', ' ')}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-neutral-dark mb-3 leading-tight">
          {policy.title}
        </h3>

        {/* Description */}
        <p className="text-neutral text-sm sm:text-base leading-relaxed mb-4">
          {policy.description}
        </p>

        {/* Support Percentage and Trending */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
              <ThumbsUp className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {policy.averageSupport}%
              </p>
              <p className="text-xs text-neutral">Average Support</p>
            </div>
          </div>

          {/* Trending Indicator */}
          {policy.trending && (
            <div className="flex items-center space-x-1">
              {policy.trending === 'up' && (
                <>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    Trending
                  </span>
                </>
              )}
              {policy.trending === 'down' && (
                <>
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-600">
                    Declining
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-neutral-light hover:bg-gray-200 text-neutral-dark rounded-lg transition-colors font-medium flex-1"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Hide details' : 'Show more details'}
          >
            <span>{isExpanded ? 'Hide Details' : 'Learn More'}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>

          {/* Vote Button (Disabled for Demo) */}
          {showVoteButton && (
            <button
              disabled
              className="px-4 py-3 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed flex-1 sm:flex-initial"
              title="Login required to vote"
            >
              Vote
            </button>
          )}
        </div>
      </div>

      {/* Expandable Details Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 bg-gradient-to-b from-neutral-light/50 to-white">
              {/* Party Support Bars */}
              {policy.partySupport && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h4 className="font-bold text-neutral-dark mb-3 flex items-center space-x-2">
                    <span className="w-1 h-5 bg-primary rounded-full"></span>
                    <span>Support by Party</span>
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Democrats */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-blue-700">Dem</span>
                        <span className="text-sm font-bold text-blue-700">{policy.partySupport.democrats}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-blue-400 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${policy.partySupport.democrats}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Republicans */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-red-700">Rep</span>
                        <span className="text-sm font-bold text-red-700">{policy.partySupport.republicans}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-red-600 to-red-400 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${policy.partySupport.republicans}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Independents */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-purple-700">Ind</span>
                        <span className="text-sm font-bold text-purple-700">{policy.partySupport.independents}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-purple-400 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${policy.partySupport.independents}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Policy Details */}
              <div className="mb-4">
                <h4 className="font-bold text-neutral-dark mb-3 flex items-center space-x-2">
                  <span className="w-1 h-5 bg-primary rounded-full"></span>
                  <span>Key Details</span>
                </h4>
                <ul className="space-y-3">
                  {policy.details.map((detail, index) => (
                    <li key={index} className="flex space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-primary font-bold text-xs">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-dark text-sm">
                          {detail.title}
                        </p>
                        <p className="text-neutral text-sm mt-1">
                          {detail.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sources */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-bold text-neutral-dark mb-2 text-sm">
                  Data Sources
                </h4>
                <ul className="space-y-2">
                  {policy.sources.map((source, index) => (
                    <li key={index} className="text-sm">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors group"
                      >
                        <ExternalLink className="w-4 h-4 flex-shrink-0" />
                        <span className="group-hover:underline">
                          {source.organization} ({source.year})
                          {source.supportPercentage && (
                            <span className="text-neutral ml-1">
                              - {source.supportPercentage}% support
                            </span>
                          )}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Last Updated */}
              <div className="mt-3 text-xs text-neutral">
                Last updated: {new Date(policy.lastUpdated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
