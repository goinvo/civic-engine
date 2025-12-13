import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { PolicyWrappedRenderProps } from './types';

const bg = 'linear-gradient(180deg, #121212 0%, #0b1a3a 100%)';

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export const PolicyWrappedSquare: React.FC<PolicyWrappedRenderProps> = ({
  displayName,
  label,
  avgConsensusSupport,
  policies,
  urlText,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({ frame: frame - 5, fps, config: { damping: 200, mass: 0.8 } });
  const titleProgress = spring({ frame: frame - 18, fps, config: { damping: 180, mass: 0.9 } });
  const statsProgress = spring({ frame: frame - 30, fps, config: { damping: 200, mass: 0.8 } });

  const listBase = frame - 45;
  const listReveal = clamp(listBase / 50, 0, 1);

  const headerY = interpolate(headerProgress, [0, 1], [18, 0]);
  const headerA = interpolate(headerProgress, [0, 1], [0, 1]);

  const titleY = interpolate(titleProgress, [0, 1], [26, 0]);
  const titleA = interpolate(titleProgress, [0, 1], [0, 1]);

  const statsScale = interpolate(statsProgress, [0, 1], [0.94, 1]);
  const statsA = interpolate(statsProgress, [0, 1], [0, 1]);

  const top = policies.slice(0, 5);
  const remaining = Math.max(0, policies.length - top.length);

  return (
    <AbsoluteFill style={{ background: bg, color: 'white' }}>
      <div
        style={{
          padding: 72,
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'var(--font-body), system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transform: `translateY(${headerY}px)`,
            opacity: headerA,
          }}
        >
          <div style={{ fontFamily: 'var(--font-display), system-ui, sans-serif', fontWeight: 900, fontSize: 26, opacity: 0.92 }}>
            Policy Wrapped
          </div>
          <div style={{ fontWeight: 900, fontSize: 18, opacity: 0.85 }}>
            {new Date().getFullYear()}
          </div>
        </div>

        <div style={{ marginTop: 56, transform: `translateY(${titleY}px)`, opacity: titleA }}>
          <div style={{ fontFamily: 'var(--font-display), system-ui, sans-serif', fontWeight: 900, fontSize: 56, lineHeight: 1.05 }}>
            {displayName}
          </div>
          <div style={{ marginTop: 18, fontWeight: 900, fontSize: 22, opacity: 0.9 }}>
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
            <div style={{ fontSize: 54, fontWeight: 900 }}>{policies.length}</div>
            <div style={{ fontSize: 18, fontWeight: 800, opacity: 0.8 }}>Key issues</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.10)', border: '2px solid rgba(255,255,255,0.18)', padding: 28 }}>
            <div style={{ fontSize: 54, fontWeight: 900 }}>{avgConsensusSupport}%</div>
            <div style={{ fontSize: 18, fontWeight: 800, opacity: 0.8 }}>Avg consensus support</div>
          </div>
        </div>

        <div style={{ marginTop: 56 }}>
          <div style={{ fontSize: 18, fontWeight: 900, opacity: 0.72, marginBottom: 18 }}>Top priorities</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {top.map((p, idx) => {
              const step = idx / Math.max(1, top.length);
              const pProg = clamp((listReveal - step * 0.55) / 0.45, 0, 1);
              const y = interpolate(pProg, [0, 1], [18, 0]);
              const a = interpolate(pProg, [0, 1], [0, 1]);
              return (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 24, transform: `translateY(${y}px)`, opacity: a }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 22, fontWeight: 900 }}>{idx + 1}. {p.title}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, opacity: 0.72 }}>{p.category.replace('-', ' ')}</div>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>{p.averageSupport}%</div>
                </div>
              );
            })}
          </div>
          {remaining > 0 && (
            <div style={{ marginTop: 20, fontSize: 18, fontWeight: 900, opacity: 0.8 }}>+{remaining} more</div>
          )}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 64, opacity: interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <div style={{ fontSize: 18, fontWeight: 900, opacity: 0.72 }}>Build yours at</div>
          <div style={{ fontSize: 20, fontWeight: 900, wordBreak: 'break-all' }}>{urlText || '…'}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};


