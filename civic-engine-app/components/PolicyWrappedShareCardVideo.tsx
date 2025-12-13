'use client';

import type { Policy } from '@/types/policy';
import type { PolicyWrappedShareCardFormat } from '@/components/PolicyWrappedShareCard';

export type PolicyWrappedShareCardVideoProps = {
  displayName: string;
  label: string;
  avgConsensusSupport: number;
  policies: Policy[];
  urlText?: string;
  /**
   * Progress from 0..1
   */
  t: number;
  format?: PolicyWrappedShareCardFormat;
};

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

function easeOutCubic(x: number) {
  const t = clamp01(x);
  return 1 - Math.pow(1 - t, 3);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getFormatTuning(format: PolicyWrappedShareCardFormat) {
  if (format === 'square') {
    return { titleSize: 44, statSize: 44, showTopCount: 4, padding: 56 };
  }
  if (format === 'portrait') {
    return { titleSize: 56, statSize: 54, showTopCount: 5, padding: 72 };
  }
  return { titleSize: 56, statSize: 54, showTopCount: 5, padding: 72 };
}

/**
 * Video-only card that uses inline styles driven by `t` so we can render deterministic frames.
 * This lets us export an animated video that feels like Framer Motion (fade/slide + pop + stagger).
 */
export default function PolicyWrappedShareCardVideo({
  displayName,
  label,
  avgConsensusSupport,
  policies,
  urlText,
  t,
  format = 'story',
}: PolicyWrappedShareCardVideoProps) {
  const tuning = getFormatTuning(format);
  const topPolicies = policies.slice(0, tuning.showTopCount);
  const remaining = Math.max(0, policies.length - topPolicies.length);

  // Phases
  const pHeader = easeOutCubic((t - 0.02) / 0.22);
  const pTitle = easeOutCubic((t - 0.10) / 0.28);
  const pStats = easeOutCubic((t - 0.22) / 0.26);
  const pList = clamp01((t - 0.34) / 0.55);
  const pFooter = easeOutCubic((t - 0.74) / 0.26);

  const headerY = lerp(18, 0, pHeader);
  const headerA = lerp(0, 1, pHeader);

  const titleY = lerp(28, 0, pTitle);
  const titleA = lerp(0, 1, pTitle);

  const statsScale = lerp(0.92, 1, pStats);
  const statsA = lerp(0, 1, pStats);

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #121212 0%, #0b1a3a 100%)',
        color: 'white',
        padding: tuning.padding,
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body), system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transform: `translateY(${headerY}px)`,
          opacity: headerA,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display), system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
            fontWeight: 900,
            fontSize: 24,
            letterSpacing: 0.4,
            opacity: 0.92,
          }}
        >
          Policy Wrapped
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, opacity: 0.85 }}>
          {new Date().getFullYear()}
        </div>
      </div>

      <div
        style={{
          marginTop: 56,
          transform: `translateY(${titleY}px)`,
          opacity: titleA,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display), system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
            fontWeight: 900,
            fontSize: tuning.titleSize,
            lineHeight: 1.05,
          }}
        >
          {displayName}
        </div>
        <div style={{ marginTop: 18, fontWeight: 800, fontSize: 22, opacity: 0.9 }}>
          Label: <span style={{ opacity: 1 }}>{label}</span>
        </div>
      </div>

      <div
        style={{
          marginTop: 56,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 28,
          transform: `scale(${statsScale})`,
          opacity: statsA,
          transformOrigin: 'top left',
        }}
      >
        <div style={{ background: 'rgba(255,255,255,0.10)', border: '2px solid rgba(255,255,255,0.18)', padding: 28 }}>
          <div style={{ fontSize: tuning.statSize, fontWeight: 900 }}>{policies.length}</div>
          <div style={{ fontSize: 18, fontWeight: 800, opacity: 0.8 }}>Key issues</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.10)', border: '2px solid rgba(255,255,255,0.18)', padding: 28 }}>
          <div style={{ fontSize: tuning.statSize, fontWeight: 900 }}>{avgConsensusSupport}%</div>
          <div style={{ fontSize: 18, fontWeight: 800, opacity: 0.8 }}>Avg consensus support</div>
        </div>
      </div>

      <div style={{ marginTop: 56 }}>
        <div style={{ fontSize: 18, fontWeight: 800, opacity: 0.72, marginBottom: 18 }}>
          Top priorities
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {topPolicies.map((p, idx) => {
            const step = idx / Math.max(1, topPolicies.length);
            const pi = easeOutCubic((pList - step * 0.55) / 0.45);
            const y = lerp(18, 0, pi);
            const a = lerp(0, 1, pi);
            return (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 24,
                  transform: `translateY(${y}px)`,
                  opacity: a,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>
                    {idx + 1}. {p.title}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, opacity: 0.72 }}>
                    {p.category.replace('-', ' ')}
                  </div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 900 }}>{p.averageSupport}%</div>
              </div>
            );
          })}
        </div>

        {remaining > 0 && (
          <div style={{ marginTop: 20, fontSize: 18, fontWeight: 900, opacity: 0.8 }}>
            +{remaining} more
          </div>
        )}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 64, transform: `translateY(${lerp(18, 0, pFooter)}px)`, opacity: pFooter }}>
        <div style={{ fontSize: 18, fontWeight: 800, opacity: 0.72 }}>
          Build yours at
        </div>
        <div style={{ fontSize: 20, fontWeight: 900, wordBreak: 'break-all' }}>
          {urlText || '…'}
        </div>
      </div>
    </div>
  );
}


