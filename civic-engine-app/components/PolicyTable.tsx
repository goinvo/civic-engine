'use client';

import Link from 'next/link';
import { Policy } from '@/types/policy';

interface PolicyTableProps {
  policies: Policy[];
}

export default function PolicyTable({ policies }: PolicyTableProps) {
  return (
    <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b-4 border-black dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
            <th className="text-left p-4 font-display font-black text-sm text-black dark:text-white">#</th>
            <th className="text-left p-4 font-display font-black text-sm text-black dark:text-white">Policy</th>
            <th className="text-center p-4 font-display font-black text-sm text-black dark:text-white">Avg</th>
            <th className="text-center p-4 font-display font-black text-sm text-[#2F3BBD]">Dem</th>
            <th className="text-center p-4 font-display font-black text-sm text-[#C91A2B]">Rep</th>
            <th className="text-center p-4 font-display font-black text-sm text-black dark:text-white">Ind</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy, index) => (
            <tr
              key={policy.id}
              className="border-b-2 border-black dark:border-gray-600 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
