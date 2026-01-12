'use client';

import Link from 'next/link';
import { ArrowUpRight, Compass } from 'lucide-react';
import { Policy, PolicyCategory } from '@/types/policy';

// Map policy categories to problem area IDs
const categoryToProblemArea: Partial<Record<PolicyCategory, { id: string; title: string }>> = {
  healthcare: { id: 'healthcare-costs', title: 'Healthcare Costs' },
  economy: { id: 'economic-opportunity', title: 'Economic Opportunity & Wages' },
  governance: { id: 'democratic-reform', title: 'Democratic Reform' },
  education: { id: 'education-quality', title: 'Education Quality' },
};

interface PolicyExpandedContentProps {
  policy: Policy;
}

export default function PolicyExpandedContent({ policy }: PolicyExpandedContentProps) {
  const problemArea = categoryToProblemArea[policy.category];

  return (
    <div className="space-y-6">
      {/* Description */}
      <p className="font-body text-gray-700 dark:text-gray-300">
        {policy.description}
      </p>

      {/* Link to Problem Area */}
      {problemArea && (
        <Link
          href={`/explore/${problemArea.id}?from=home`}
          className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#2F3BBD]/10 to-[#C91A2B]/10 dark:from-[#2F3BBD]/20 dark:to-[#C91A2B]/20 border-2 border-black dark:border-gray-600 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[#2F3BBD] to-[#C91A2B] border-2 border-black flex items-center justify-center flex-shrink-0">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm text-black dark:text-white">Explore Implementation Approaches</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
              See how this relates to {problemArea.title}
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors flex-shrink-0" />
        </Link>
      )}

      {/* Party Support Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-yellow-100 dark:bg-yellow-900/30 border-2 border-black dark:border-gray-600 p-3">
          <div className="text-3xl font-display font-black text-black dark:text-white">{policy.averageSupport}%</div>
          <div className="text-xs font-body text-neutral dark:text-gray-400 font-bold uppercase">Avg Support</div>
        </div>
        {policy.partySupport && (
          <>
            <div className="bg-blue-100 dark:bg-blue-900/30 border-2 border-black dark:border-gray-600 p-3">
              <div className="text-2xl font-display font-black text-black dark:text-white">{policy.partySupport.democrats}%</div>
              <div className="text-xs font-body text-neutral dark:text-gray-400 font-bold uppercase">Democrats</div>
            </div>
            <div className="bg-red-100 dark:bg-red-900/30 border-2 border-black dark:border-gray-600 p-3">
              <div className="text-2xl font-display font-black text-black dark:text-white">{policy.partySupport.republicans}%</div>
              <div className="text-xs font-body text-neutral dark:text-gray-400 font-bold uppercase">Republicans</div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 border-2 border-black dark:border-gray-600 p-3">
              <div className="text-2xl font-display font-black text-black dark:text-white">{policy.partySupport.independents}%</div>
              <div className="text-xs font-body text-neutral dark:text-gray-400 font-bold uppercase">Independents</div>
            </div>
          </>
        )}
      </div>

      {/* Key Details */}
      {policy.details && policy.details.length > 0 && (
        <section className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
          <h3 className="font-display text-lg font-black text-black dark:text-white mb-3">Key Details</h3>
          <ul className="space-y-3">
            {policy.details.map((detail, index) => (
              <li key={index}>
                <h4 className="font-display font-bold text-black dark:text-white text-sm">{detail.title}</h4>
                <p className="font-body text-gray-600 dark:text-gray-400 text-sm">{detail.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* How It Works */}
      {policy.resourceFlow && (
        <section className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
          <h3 className="font-display text-lg font-black text-black dark:text-white mb-3">How It Works</h3>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-black dark:border-gray-600 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs font-display font-black text-neutral dark:text-gray-400 uppercase mb-1">From</div>
                <div className="font-body font-bold text-black dark:text-white text-sm">{policy.resourceFlow.from}</div>
              </div>
              <div>
                <div className="text-xs font-display font-black text-neutral dark:text-gray-400 uppercase mb-1">To</div>
                <div className="font-body font-bold text-black dark:text-white text-sm">{policy.resourceFlow.to}</div>
              </div>
              <div>
                <div className="text-xs font-display font-black text-neutral dark:text-gray-400 uppercase mb-1">How</div>
                <div className="font-body font-bold text-black dark:text-white text-sm">{policy.resourceFlow.channel}</div>
              </div>
            </div>
          </div>
        </section>
      )}

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

      {/* Policy Goal */}
      {policy.causalChain && (
        <section className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
          <h3 className="font-display text-lg font-black text-black dark:text-white mb-3">Policy Goal</h3>
          <div className="bg-green-50 dark:bg-green-900/20 border-2 border-black dark:border-gray-600 p-4">
            <div className="space-y-3">
              <div>
                <div className="text-xs font-display font-black text-neutral dark:text-gray-400 uppercase mb-1">Immediate Action</div>
                <p className="font-body font-bold text-black dark:text-white text-sm">{policy.causalChain.immediate}</p>
              </div>
              <div>
                <div className="text-xs font-display font-black text-neutral dark:text-gray-400 uppercase mb-1">Intended Outcome</div>
                <p className="font-body font-bold text-black dark:text-white text-sm">{policy.causalChain.outcome}</p>
              </div>
            </div>
          </div>
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
    </div>
  );
}
