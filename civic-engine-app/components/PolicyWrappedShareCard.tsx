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
  /** Maximum number of policies to display (default: all) */
  maxPolicies?: number;
};

// Match Remotion's font families
const FONT_DISPLAY = "'Space Grotesk', system-ui, sans-serif";
const FONT_BODY = "'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

/**
 * Static version of the Policy Wrapped card that matches the Remotion export layout exactly.
 */
export default function PolicyWrappedShareCard({
  displayName,
  label,
  avgConsensusSupport,
  policies,
  urlText,
  maxPolicies,
}: PolicyWrappedShareCardProps) {
  const displayPolicies = maxPolicies ? policies.slice(0, maxPolicies) : policies;

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #121212 0%, #0b1a3a 100%)',
        color: 'white',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          padding: 56,
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: FONT_BODY,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 26, opacity: 0.92 }}>
            Policy Wrapped
          </div>
          <div style={{ fontWeight: 900, fontSize: 18, opacity: 0.85 }}>
            {new Date().getFullYear()}
          </div>
        </div>

        {/* Title section */}
        <div style={{ marginTop: 32 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 48, lineHeight: 1.05 }}>
            {displayName}
          </div>
          <div style={{ marginTop: 12, fontWeight: 900, fontSize: 20, opacity: 0.9 }}>
            Label: <span style={{ opacity: 1 }}>{label}</span>
          </div>
        </div>

        {/* Stats grid */}
        <div
          style={{
            marginTop: 32,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
          }}
        >
          <div style={{ background: 'rgba(255,255,255,0.10)', border: '2px solid rgba(255,255,255,0.18)', padding: 20 }}>
            <div style={{ fontSize: 40, fontWeight: 900 }}>{policies.length}</div>
            <div style={{ fontSize: 16, fontWeight: 800, opacity: 0.8 }}>Key issues</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.10)', border: '2px solid rgba(255,255,255,0.18)', padding: 20 }}>
            <div style={{ fontSize: 40, fontWeight: 900 }}>{avgConsensusSupport}%</div>
            <div style={{ fontSize: 16, fontWeight: 800, opacity: 0.8 }}>Avg consensus support</div>
          </div>
        </div>

        {/* Policy list */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 900, opacity: 0.72, marginBottom: 8 }}>Your key issues</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {displayPolicies.map((p, idx) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {idx + 1}. {p.title}
                  </div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, flexShrink: 0 }}>{p.averageSupport}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 32, paddingTop: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 900, opacity: 0.72 }}>Build yours at</div>
          <div style={{ fontSize: 18, fontWeight: 900, wordBreak: 'break-all' }}>{urlText || '…'}</div>
        </div>
      </div>
    </div>
  );
}
