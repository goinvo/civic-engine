'use client';

import type { Policy } from '@/types/policy';

export type PolicyWrappedShareCardFormat = 'story' | 'portrait' | 'square';

export type PolicyWrappedShareCardProps = {
  displayName: string;
  label: string;
  avgConsensusSupport: number;
  policies: Policy[];
  urlText?: string;
  format?: PolicyWrappedShareCardFormat;
};

function getFormatTuning(format: PolicyWrappedShareCardFormat) {
  if (format === 'square') {
    return {
      titleClass: 'text-2xl',
      statNumberClass: 'text-xl',
      showTopCount: 10,
      paddingClass: 'p-5',
      policyTextClass: 'text-xs',
    };
  }
  if (format === 'portrait') {
    return {
      titleClass: 'text-3xl',
      statNumberClass: 'text-2xl',
      showTopCount: 10,
      paddingClass: 'p-6',
      policyTextClass: 'text-sm',
    };
  }
  return {
    titleClass: 'text-3xl',
    statNumberClass: 'text-2xl',
    showTopCount: 10,
    paddingClass: 'p-6',
    policyTextClass: 'text-sm',
  };
}

export default function PolicyWrappedShareCard({
  displayName,
  label,
  avgConsensusSupport,
  policies,
  urlText,
  format = 'story',
}: PolicyWrappedShareCardProps) {
  const tuning = getFormatTuning(format);
  const displayPolicies = policies.slice(0, tuning.showTopCount);

  return (
    <div className={`bg-gradient-to-b from-[#121212] to-[#0b1a3a] text-white ${tuning.paddingClass} flex flex-col w-full h-full`}>
      <div className="flex items-center justify-between">
        <div className="font-display font-black text-sm tracking-wide opacity-90">
          Policy Wrapped
        </div>
        <div className="text-xs font-bold opacity-80">
          {new Date().getFullYear()}
        </div>
      </div>

      <div className="mt-6">
        <h1 className={`font-display font-black leading-tight ${tuning.titleClass}`}>
          {displayName}
        </h1>
        <p className="mt-2 font-body font-bold text-white/85">
          Label: <span className="text-white">{label}</span>
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="bg-white/10 border border-white/20 p-3">
          <div className={`${tuning.statNumberClass} font-black`}>{policies.length}</div>
          <div className="text-xs font-bold text-white/80">Key issues</div>
        </div>
        <div className="bg-white/10 border border-white/20 p-3">
          <div className={`${tuning.statNumberClass} font-black`}>{avgConsensusSupport}%</div>
          <div className="text-xs font-bold text-white/80">Avg consensus support</div>
        </div>
      </div>

      <div className="mt-4 flex-1">
        <div className="text-xs font-bold text-white/70 mb-1">
          Your key issues
        </div>
        <ol className="space-y-1">
          {displayPolicies.map((p, idx) => (
            <li key={p.id} className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className={`font-bold ${tuning.policyTextClass} truncate`}>
                  {idx + 1}. {p.title}
                </div>
              </div>
              <div className={`${tuning.policyTextClass} font-bold flex-shrink-0`}>{p.averageSupport}%</div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-auto pt-3">
        <div className="text-xs font-bold text-white/70">
          Build yours at
        </div>
        <div className="text-xs font-black break-all">
          {urlText || '…'}
        </div>
      </div>
    </div>
  );
}


