'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Policy } from '@/types/policy';
import { useValues } from '@/contexts/ValuesContext';
import { calculatePersonalizedScore } from '@/utils/impactScore';

interface PolicyTableProps {
  policies: Policy[];
}

export default function PolicyTable({ policies }: PolicyTableProps) {
  const { profile } = useValues();

  // Default weights - adjusted to reflect average American priorities
  const defaultWeights = {
    population: 0.12,
    economic: 0.12,
    intensity: 0.20,
    duration: 0.16,
    equity: 0.20,
    externalities: 0.10,
    implementation: 0.10,
  };

  const weights = profile?.weights || defaultWeights;

  return (
    <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)] overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="border-b-4 border-black dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
            <th className="text-left p-4 font-display font-black text-sm text-black dark:text-white">#</th>
            <th className="text-left p-4 font-display font-black text-sm text-black dark:text-white">Policy</th>
            <th className="text-center p-4 font-display font-black text-sm text-black dark:text-white">
              <div className="flex items-center justify-center space-x-1">
                <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                <span>Score</span>
              </div>
            </th>
            <th className="text-center p-4 font-display font-black text-sm text-black dark:text-white">Avg</th>
            <th className="text-center p-4 font-display font-black text-sm text-[#2F3BBD]">Dem</th>
            <th className="text-center p-4 font-display font-black text-sm text-[#C91A2B]">Rep</th>
            <th className="text-center p-4 font-display font-black text-sm text-black dark:text-white">Ind</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy, index) => {
            const personalizedScore = calculatePersonalizedScore(policy.id, weights);

            return (
              <tr
                key={policy.id}
                className="border-b-2 border-black dark:border-gray-600 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="p-4 font-display font-black text-sm text-black dark:text-white">
                  {index + 1}
                </td>
                <td className="p-4">
                  <Link
                    href={`/policies/${policy.id}`}
                    className="font-display font-bold text-sm text-black dark:text-white hover:text-[#2F3BBD] dark:hover:text-[#5B6BD5] transition-colors"
                  >
                    {policy.title}
                  </Link>
                </td>
                <td className="p-4 text-center">
                  {personalizedScore ? (
                    <span className="inline-flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] rounded">
                      <span className="font-display font-black text-sm text-white">
                        {personalizedScore}
                      </span>
                    </span>
                  ) : (
                    <span className="font-display font-bold text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="p-4 text-center">
                  <span className="font-display font-black text-sm text-black dark:text-white">
                    {policy.averageSupport}%
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className="font-display font-bold text-sm text-[#2F3BBD]">
                    {policy.partySupport?.democrats ?? '—'}%
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className="font-display font-bold text-sm text-[#C91A2B]">
                    {policy.partySupport?.republicans ?? '—'}%
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className="font-display font-bold text-sm text-black dark:text-white">
                    {policy.partySupport?.independents ?? '—'}%
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
