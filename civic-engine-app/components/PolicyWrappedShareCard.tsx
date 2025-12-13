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
      showTopCount: 4,
      paddingClass: 'p-5',
    };
  }
  if (format === 'portrait') {
    return {
      titleClass: 'text-3xl',
      statNumberClass: 'text-2xl',
      showTopCount: 5,
      paddingClass: 'p-6',
    };
  }
  return {
    titleClass: 'text-3xl',
    statNumberClass: 'text-2xl',
    showTopCount: 5,
    paddingClass: 'p-6',
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
  const topPolicies = policies.slice(0, tuning.showTopCount);
  const remaining = Math.max(0, policies.length - topPolicies.length);

  return (
    <div className={`bg-gradient-to-b from-[#121212] to-[#0b1a3a] text-white ${tuning.paddingClass} flex flex-col h-full`}>
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

      <div className="mt-6">
        <div className="text-xs font-bold text-white/70 mb-2">
          Top priorities
        </div>
        <ol className="space-y-2">
          {topPolicies.map((p, idx) => (
            <li key={p.id} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-bold text-sm">
                  {idx + 1}. {p.title}
                </div>
                <div className="text-xs text-white/70 font-medium">
                  {p.category.replace('-', ' ')}
                </div>
              </div>
              <div className="text-sm font-black">{p.averageSupport}%</div>
            </li>
          ))}
        </ol>
        {remaining > 0 && (
          <div className="mt-3 text-xs font-bold text-white/75">
            +{remaining} more
          </div>
        )}
      </div>

      <div className="mt-auto pt-6">
        <div className="text-xs font-bold text-white/70">
          Build yours at
        </div>
        <div className="text-sm font-black break-all">
          {urlText || '…'}
        </div>
      </div>
    </div>
  );
}


