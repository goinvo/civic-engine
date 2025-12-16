'use client';

import type { Policy } from '@/types/policy';
import type { PolicyWrappedShareCardFormat } from '@/components/PolicyWrappedShareCard';

export type PolicyWrappedShareCardVideoProps = {
  displayName: string;
  label: string;
  avgScore: number;
  scoreLabel?: string;
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
    // Match Remotion PolicyWrappedSquare layout
    return { titleSize: 48, statSize: 40, showTopCount: 10, padding: 56, policyFontSize: 16, policyGap: 6 };
  }
  if (format === 'portrait') {
    return { titleSize: 56, statSize: 54, showTopCount: 10, padding: 72, policyFontSize: 18, policyGap: 8 };
  }
  return { titleSize: 56, statSize: 54, showTopCount: 10, padding: 72, policyFontSize: 18, policyGap: 8 };
}

/**
 * Video-only card that uses inline styles driven by `t` so we can render deterministic frames.
 * This lets us export an animated video that feels like Framer Motion (fade/slide + pop + stagger).
 */
export default function PolicyWrappedShareCardVideo({
  displayName,
  label,
  avgScore,
  scoreLabel = 'Avg score',
  policies,
  urlText,
  t,
  format = 'story',
}: PolicyWrappedShareCardVideoProps) {
  const tuning = getFormatTuning(format);
  const displayPolicies = policies.slice(0, tuning.showTopCount);

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
          marginTop: 32,
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
        <div style={{ marginTop: 12, fontWeight: 900, fontSize: 20, opacity: 0.9 }}>
          Label: <span style={{ opacity: 1 }}>{label}</span>
        </div>
      </div>

      <div
        style={{
          marginTop: 32,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          transform: `scale(${statsScale})`,
          opacity: statsA,
          transformOrigin: 'top left',
        }}
      >
        <div style={{ background: 'rgba(255,255,255,0.10)', border: '2px solid rgba(255,255,255,0.18)', padding: 20 }}>
          <div style={{ fontSize: tuning.statSize, fontWeight: 900 }}>{policies.length}</div>
          <div style={{ fontSize: 16, fontWeight: 800, opacity: 0.8 }}>Key issues</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.10)', border: '2px solid rgba(255,255,255,0.18)', padding: 20 }}>
          <div style={{ fontSize: tuning.statSize, fontWeight: 900 }}>{avgScore}</div>
          <div style={{ fontSize: 16, fontWeight: 800, opacity: 0.8 }}>{scoreLabel}</div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 900, opacity: 0.72, marginBottom: 8 }}>
          Your key issues
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: tuning.policyGap }}>
          {displayPolicies.map((p, idx) => {
            const step = idx / Math.max(1, displayPolicies.length);
            const pi = easeOutCubic((pList - step * 0.55) / 0.45);
            const y = lerp(12, 0, pi);
            const a = lerp(0, 1, pi);
            return (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
                  transform: `translateY(${y}px)`,
                  opacity: a,
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: tuning.policyFontSize, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {idx + 1}. {p.title}
                  </div>
                </div>
                <div style={{ fontSize: tuning.policyFontSize, fontWeight: 700, flexShrink: 0 }}>{p.averageSupport}%</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 32, paddingTop: 24, transform: `translateY(${lerp(12, 0, pFooter)}px)`, opacity: pFooter }}>
        <div style={{ fontSize: 16, fontWeight: 900, opacity: 0.72 }}>
          Build yours at
        </div>
        <div style={{ fontSize: 18, fontWeight: 900, wordBreak: 'break-all' }}>
          {urlText || '…'}
        </div>
      </div>
    </div>
  );
}


