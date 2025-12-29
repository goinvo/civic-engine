'use client';

export type ClassProfileShareCardVideoProps = {
  teacherName: string;
  className: string;
  topPolicies: Array<{
    id: string;
    title: string;
    studentCount: number;
  }>;
  stats: {
    totalStudents: number;
    positionsSubmitted: number;
    discussionPosts: number;
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
 * Teacher's class profile share card with animation driven by `t` prop.
 * Animation sequence: Header -> Title -> Top Policies -> Stats -> Footer
 */
export default function ClassProfileShareCardVideo({
  teacherName,
  className,
  topPolicies,
  stats,
  urlText = 'civic-engine.app',
  t,
}: ClassProfileShareCardVideoProps) {
  const displayPolicies = topPolicies.slice(0, 3);

  // Animation phases (timeline: 0 to 1 over ~5 seconds)
  // Header: 0.00 - 0.10
  // Title: 0.06 - 0.18
  // Policies: 0.14 - 0.42 (staggered)
  // Stats: 0.40 - 0.60
  // Footer: 0.58 - 0.75

  const pHeader = easeOutCubic((t - 0.00) / 0.10);
  const pTitle = easeOutCubic((t - 0.06) / 0.12);
  const pPolicies = clamp01((t - 0.14) / 0.28);
  const pStats = easeOutCubic((t - 0.40) / 0.20);
  const pFooter = easeOutCubic((t - 0.58) / 0.17);

  // Header animations
  const headerY = lerp(15, 0, pHeader);
  const headerA = lerp(0, 1, pHeader);

  // Title animations
  const titleY = lerp(20, 0, pTitle);
  const titleA = lerp(0, 1, pTitle);

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
      {/* Header with graduation cap */}
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
            background: '#dbeafe',
            border: '2px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '3px 3px 0px 0px rgba(0,0,0,1)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BRAND_BLUE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
        </div>
        <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 12, opacity: 0.6, letterSpacing: 0.5 }}>
          CLASS DELIBERATION COMPLETE
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
        <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 900, fontSize: 32, lineHeight: 1.1 }}>
          {className}
        </div>
        <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 14, color: BRAND_BLUE, marginTop: 4 }}>
          {teacherName}&apos;s Class
        </div>
      </div>

      {/* Top Policies (Class Priorities) */}
      <div style={{ marginTop: 16, flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.6, marginBottom: 8, letterSpacing: 1 }}>
          CLASS TOP PRIORITIES
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {displayPolicies.map((policy, idx) => {
            const step = idx / Math.max(1, displayPolicies.length);
            const pi = easeOutCubic((pPolicies - step * 0.5) / 0.5);
            const itemX = lerp(-20, 0, pi);
            const itemA = lerp(0, 1, pi);

            return (
              <div
                key={policy.id}
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
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>
                    {policy.title}
                  </div>
                </div>
                <div
                  style={{
                    background: '#f0fdf4',
                    border: '1px solid #16a34a',
                    padding: '2px 8px',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#16a34a',
                  }}
                >
                  {policy.studentCount} students
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          marginTop: 16,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          opacity: statsA,
          transform: `translateY(${statsY}px)`,
          flexShrink: 0,
        }}
      >
        <StatBox value={stats.totalStudents} label="Students" />
        <StatBox value={stats.positionsSubmitted} label="Positions" />
        <StatBox value={stats.discussionPosts} label="Posts" />
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
        padding: 10,
        background: 'white',
        border: '2px solid black',
        boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)',
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 900, color: BRAND_BLUE }}>{value}</div>
      <div style={{ fontSize: 9, fontWeight: 700, opacity: 0.7, textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}
