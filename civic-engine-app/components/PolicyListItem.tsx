'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowUpRight } from 'lucide-react';
import { Policy } from '@/types/policy';

interface PolicyListItemProps {
  policy: Policy;
  isActive?: boolean;
}

export default function PolicyListItem({ policy, isActive = false }: PolicyListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="border-b-2 border-black last:border-b-0 overflow-hidden"
    >
      {/* Header - Always Visible */}
      <motion.div
        layout="position"
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          flex items-center justify-between py-4 px-6
          hover:bg-yellow-100 transition-colors cursor-pointer
          ${isExpanded ? 'bg-yellow-100' : ''}
        `}
      >
        <div className="flex items-center space-x-3 flex-1">
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Plus className="w-5 h-5 text-black flex-shrink-0" strokeWidth={3} />
          </motion.div>
          <span className="font-display font-black text-base text-black">
            {policy.rank}. {policy.title}
          </span>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <span className="font-display font-black text-base text-black">
            {policy.averageSupport}%
          </span>
        </div>
      </motion.div>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              {/* Policy Description */}
              <p className="font-body text-lg text-gray-700 font-medium mb-6 mt-2">
                {policy.description}
              </p>

              {/* Support Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-yellow-300 border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-3xl font-display font-black text-black">{policy.averageSupport}%</div>
                  <div className="text-xs font-body text-black font-bold">Avg Support</div>
                </div>
                {policy.partySupport && (
                  <>
                    <div className="bg-blue-300 border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="text-2xl font-display font-black text-black">{policy.partySupport.democrats}%</div>
                      <div className="text-xs font-body text-black font-bold">Democrats</div>
                    </div>
                    <div className="bg-red-300 border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="text-2xl font-display font-black text-black">{policy.partySupport.republicans}%</div>
                      <div className="text-xs font-body text-black font-bold">Republicans</div>
                    </div>
                    <div className="bg-green-300 border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="text-2xl font-display font-black text-black">{policy.partySupport.independents}%</div>
                      <div className="text-xs font-body text-black font-bold">Independents</div>
                    </div>
                  </>
                )}
              </div>

              {/* Key Details */}
              <div className="mb-6">
                <h3 className="font-display text-xl font-black text-black mb-3">Key Details</h3>
                <ul className="space-y-3">
                  {policy.details.map((detail, index) => (
                    <li key={index}>
                      <h4 className="font-display font-black text-black mb-1">{detail.title}</h4>
                      <p className="font-body text-gray-700 font-medium">{detail.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How It Works */}
              {policy.resourceFlow && (
                <div className="mb-6">
                  <h3 className="font-display text-xl font-black text-black mb-3">How It Works</h3>
                  <div className="bg-blue-200 border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs font-display font-black text-black uppercase mb-1">From</div>
                        <div className="font-body font-bold text-black text-sm">{policy.resourceFlow.from}</div>
                      </div>
                      <div>
                        <div className="text-xs font-display font-black text-black uppercase mb-1">To</div>
                        <div className="font-body font-bold text-black text-sm">{policy.resourceFlow.to}</div>
                      </div>
                      <div>
                        <div className="text-xs font-display font-black text-black uppercase mb-1">How</div>
                        <div className="font-body font-bold text-black text-sm">{policy.resourceFlow.channel}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* In Practice */}
              {policy.ifThen && policy.ifThen.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-display text-xl font-black text-black mb-3">In Practice</h3>
                  <ul className="space-y-2">
                    {policy.ifThen.map((statement, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="font-display text-black font-bold mt-0.5">→</span>
                        <p className="font-body font-medium text-gray-700 text-sm">{statement}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Policy Goal */}
              {policy.causalChain && (
                <div className="mb-6">
                  <h3 className="font-display text-xl font-black text-black mb-3">Policy Goal</h3>
                  <div className="bg-green-200 border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-display font-black text-black uppercase mb-1">Immediate Action</div>
                        <p className="font-body font-bold text-black text-sm">{policy.causalChain.immediate}</p>
                      </div>
                      <div>
                        <div className="text-xs font-display font-black text-black uppercase mb-1">Intended Outcome</div>
                        <p className="font-body font-bold text-black text-sm">{policy.causalChain.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Common Questions */}
              {policy.commonQuestions && policy.commonQuestions.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-display text-xl font-black text-black mb-3">Common Questions</h3>
                  <div className="space-y-4">
                    {policy.commonQuestions.map((qa, index) => (
                      <div key={index}>
                        <h4 className="font-display font-black text-black mb-1 text-sm">{qa.question}</h4>
                        <p className="font-body font-medium text-gray-700 text-sm">{qa.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Data Sources */}
              <div className="mb-4">
                <h3 className="font-display text-xl font-black text-black mb-3">Data Sources</h3>
                <ul className="space-y-2">
                  {policy.sources.map((source, index) => (
                    <li key={index}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-black hover:text-gray-600 transition-colors font-medium group text-sm"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                        <span className="group-hover:underline">
                          {source.organization} ({source.year})
                          {source.supportPercentage && ` - ${source.supportPercentage}% support`}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Last Updated */}
              <div className="text-xs text-gray-600">
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
    </motion.div>
  );
}
