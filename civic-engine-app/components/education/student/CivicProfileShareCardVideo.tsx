'use client';

export type CivicProfileShareCardVideoProps = {
  studentName: string;
  topPriorities: Array<{
    id: string;
    title: string;
  }>;
  quote: string;
  stats: {
    policiesExplored: number;
    discussionsJoined: number;
    positionsRevised: number;
  };
  urlText?: string;
  /**
   * Progress from 0..1
   */
  t: number;
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

const BRAND_BLUE = '#2F3BBD';

/**
 * Video-only card that uses inline styles driven by `t` so we can render deterministic frames.
 * Animation sequence: Header -> Title -> Priorities -> Quote expands -> Quote collapses + Stats -> Footer
 */
export default function CivicProfileShareCardVideo({
  studentName,
  topPriorities,
  quote,
  stats,
  urlText = 'civic-engine.app',
  t,
}: CivicProfileShareCardVideoProps) {
  const displayPriorities = topPriorities.slice(0, 3);

  // Animation phases (timeline: 0 to 1 over ~5 seconds)
  // Header: 0.00 - 0.10
  // Title: 0.06 - 0.18
  // Priorities: 0.14 - 0.38 (staggered)
  // Quote expands: 0.35 - 0.52
  // Quote collapses + stats: 0.55 - 0.75
  // Footer: 0.72 - 0.88

  const pHeader = easeOutCubic((t - 0.00) / 0.10);
  const pTitle = easeOutCubic((t - 0.06) / 0.12);
  const pPriorities = clamp01((t - 0.14) / 0.24);
  const pQuoteIn = easeOutCubic((t - 0.35) / 0.17);
  const pQuoteCollapse = easeOutCubic((t - 0.55) / 0.20);
  const pStats = easeOutCubic((t - 0.60) / 0.15);
  const pFooter = easeOutCubic((t - 0.72) / 0.16);

  // Header animations
  const headerY = lerp(15, 0, pHeader);
  const headerA = lerp(0, 1, pHeader);

  // Title animations
  const titleY = lerp(20, 0, pTitle);
  const titleA = lerp(0, 1, pTitle);

  // Quote animations - expands vertically then collapses
  const quoteA = lerp(0, 1, pQuoteIn);
  // Max height when expanded, then collapses to smaller
  const quoteMaxHeight = lerp(120, 56, pQuoteCollapse);
  const quoteFontSize = lerp(15, 12, pQuoteCollapse);
  const quotePadding = lerp(14, 10, pQuoteCollapse);
  const quoteLineHeight = lerp(1.5, 1.3, pQuoteCollapse);

  // Stats animations
  const statsA = lerp(0, 1, pStats);
  const statsY = lerp(10, 0, pStats);

  // Footer animations
  const footerA = lerp(0, 1, pFooter);

  return (
    <div
      style={{
        background: '#FAFAFA',
        color: '#1a1a1a',
        padding: 32,
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Header with checkmark */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          transform: `translateY(${headerY}px)`,
          opacity: headerA,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            background: '#dcfce7',
            border: '2px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '3px 3px 0px 0px rgba(0,0,0,1)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 12, opacity: 0.6, letterSpacing: 0.5 }}>
          DELIBERATION COMPLETE
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          marginTop: 16,
          transform: `translateY(${titleY}px)`,
          opacity: titleA,
          flexShrink: 0,
        }}
      >
        <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 900, fontSize: 36, lineHeight: 1.1 }}>
          {studentName}&apos;s
        </div>
        <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 900, fontSize: 22, color: BRAND_BLUE, marginTop: 2 }}>
          CIVIC PROFILE
        </div>
      </div>

      {/* Top Priorities */}
      <div style={{ marginTop: 16, flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.6, marginBottom: 8, letterSpacing: 1 }}>
          TOP PRIORITIES
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {displayPriorities.map((priority, idx) => {
            const step = idx / Math.max(1, displayPriorities.length);
            const pi = easeOutCubic((pPriorities - step * 0.5) / 0.5);
            const itemX = lerp(-20, 0, pi);
            const itemA = lerp(0, 1, pi);

            return (
              <div
                key={priority.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: 10,
                  background: 'white',
                  border: '2px solid black',
                  boxShadow: '3px 3px 0px 0px rgba(0,0,0,1)',
                  transform: `translateX(${itemX}px)`,
                  opacity: itemA,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    background: BRAND_BLUE,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 900,
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>
                  {priority.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quote - expands then collapses with text wrapping */}
      {quote && (
        <div
          style={{
            marginTop: 12,
            padding: quotePadding,
            background: '#f5f5f5',
            border: '2px solid black',
            fontStyle: 'italic',
            fontSize: quoteFontSize,
            lineHeight: quoteLineHeight,
            opacity: quoteA,
            maxHeight: quoteMaxHeight,
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          &ldquo;{quote}&rdquo;
        </div>
      )}

      {/* Stats - smaller and compact */}
      <div
        style={{
          marginTop: 12,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 8,
          opacity: statsA,
          transform: `translateY(${statsY}px)`,
          flexShrink: 0,
        }}
      >
        <StatBox value={stats.policiesExplored} label="Policies" />
        <StatBox value={stats.discussionsJoined} label="Discussions" />
        <StatBox value={stats.positionsRevised} label="Revised" />
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 'auto',
          paddingTop: 12,
          borderTop: '2px solid black',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: footerA,
          flexShrink: 0,
        }}
      >
        <div style={{ fontWeight: 900, fontSize: 12 }}>
          {urlText}
        </div>
        <div style={{ fontWeight: 700, fontSize: 11, opacity: 0.6 }}>
          {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}

function StatBox({ value, label }: { value: number; label: string }) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: 8,
        background: 'white',
        border: '2px solid black',
        boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)',
      }}
    >
      <div style={{ fontSize: 24, fontWeight: 900, color: BRAND_BLUE }}>{value}</div>
      <div style={{ fontSize: 9, fontWeight: 700, opacity: 0.7, textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}
