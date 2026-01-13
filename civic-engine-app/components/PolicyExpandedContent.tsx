'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass } from 'lucide-react';
import { Policy } from '@/types/policy';
import { ProblemAreaId } from '@/types/problem-areas';

// Map problem area IDs to display titles
const problemAreaTitles: Record<ProblemAreaId, string> = {
  'healthcare-costs': 'Healthcare Costs',
  'housing-affordability': 'Housing Affordability',
  'childcare-family': 'Childcare & Family',
  'democratic-reform': 'Democratic Reform',
  'economic-opportunity': 'Economic Opportunity & Wages',
  'education-quality': 'Education Quality',
};

interface PolicyExpandedContentProps {
  policy: Policy;
}

export default function PolicyExpandedContent({ policy }: PolicyExpandedContentProps) {
  // Use direct problemAreaId if available, otherwise no link
  const problemAreaTitle = policy.problemAreaId ? problemAreaTitles[policy.problemAreaId] : null;

  return (
    <div className="space-y-6">
      {/* Description */}
      <p className="font-body text-gray-700 dark:text-gray-300">
        {policy.description}
      </p>

      {/* Party Support Bars - horizontal on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Average Support - Gradient */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <span className="font-display font-bold text-xs text-gray-700 dark:text-gray-300">Average</span>
            <span className="font-display font-black text-sm text-black dark:text-white">{policy.averageSupport}%</span>
          </div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 border border-black dark:border-gray-600 relative overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${policy.averageSupport}%` }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-full bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B]"
            />
          </div>
        </div>

        {policy.partySupport && (
          <>
            {/* Democrats - Blue */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className="font-display font-bold text-xs text-[#2F3BBD]">Democrats</span>
                <span className="font-display font-black text-sm text-black dark:text-white">{policy.partySupport.democrats}%</span>
              </div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 border border-black dark:border-gray-600 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${policy.partySupport.democrats}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-full bg-[#2F3BBD]"
                />
              </div>
            </div>

            {/* Republicans - Red */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className="font-display font-bold text-xs text-[#C91A2B]">Republicans</span>
                <span className="font-display font-black text-sm text-black dark:text-white">{policy.partySupport.republicans}%</span>
              </div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 border border-black dark:border-gray-600 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${policy.partySupport.republicans}%` }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="h-full bg-[#C91A2B]"
                />
              </div>
            </div>

            {/* Independents - Purple */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className="font-display font-bold text-xs text-[#80467E]">Independents</span>
                <span className="font-display font-black text-sm text-black dark:text-white">{policy.partySupport.independents}%</span>
              </div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 border border-black dark:border-gray-600 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${policy.partySupport.independents}%` }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="h-full bg-[#80467E]"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* In Practice */}
      {policy.ifThen && policy.ifThen.length > 0 && (
        <section className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
          <h3 className="font-display text-lg font-black text-black dark:text-white mb-3">In Practice</h3>
          <ul className="space-y-2">
            {policy.ifThen.map((statement, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="font-display text-black dark:text-white font-bold mt-0.5">→</span>
                <p className="font-body text-gray-600 dark:text-gray-400 text-sm">{statement}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Common Questions */}
      {policy.commonQuestions && policy.commonQuestions.length > 0 && (
        <section className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
          <h3 className="font-display text-lg font-black text-black dark:text-white mb-3">Common Questions</h3>
          <div className="space-y-4">
            {policy.commonQuestions.map((qa, index) => (
              <div key={index}>
                <h4 className="font-display font-bold text-black dark:text-white text-sm mb-1">{qa.question}</h4>
                <p className="font-body text-gray-600 dark:text-gray-400 text-sm">{qa.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Data Sources */}
      <section className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
        <h3 className="font-display text-lg font-black text-black dark:text-white mb-3">Data Sources</h3>
        <ul className="space-y-2">
          {policy.sources.map((source, index) => (
            <li key={index}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-[#2F3BBD] hover:underline transition-colors text-sm group"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>
                  {source.organization} ({source.year})
                  {source.supportPercentage && ` - ${source.supportPercentage}% support`}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Last Updated */}
      <div className="text-xs text-neutral dark:text-gray-500 pt-2">
        Last updated: {new Date(policy.lastUpdated).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>

      {/* Link to Problem Area - at the bottom */}
      {policy.problemAreaId && problemAreaTitle && (
        <Link
          href={policy.approachId
            ? `/explore/${policy.problemAreaId}?approach=${policy.approachId}`
            : `/explore/${policy.problemAreaId}`}
          className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#2F3BBD]/10 to-[#C91A2B]/10 dark:from-[#2F3BBD]/20 dark:to-[#C91A2B]/20 border-2 border-black dark:border-gray-600 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[#2F3BBD] to-[#C91A2B] border-2 border-black flex items-center justify-center flex-shrink-0">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm text-black dark:text-white">Explore Implementation Approaches</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
              See how this relates to {problemAreaTitle}
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors flex-shrink-0" />
        </Link>
      )}
    </div>
  );
}
