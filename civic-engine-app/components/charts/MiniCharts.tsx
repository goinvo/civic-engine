'use client';

/**
 * Neobrutalist Mini Charts
 * Compact data visualizations for stat windows and dashboards
 */

export type ChartType = 'bar' | 'comparison' | 'trend' | 'donut';

export interface ChartData {
  type: ChartType;
  data: { name: string; value: number; color?: string }[];
}

// Neobrutalist mini bar chart
export function MiniBarChart({ data }: { data: ChartData['data'] }) {
  const max = Math.max(...data.map(d => d.value));
  const barHeight = 40;

  return (
    <div className="flex items-end justify-center gap-3 pt-5 pb-1">
      {data.map((item, i) => (
        <div key={i} className="flex flex-col items-center" style={{ minWidth: 28 }}>
          <span className="text-[10px] font-black mb-1 text-neutral-dark">{item.value}</span>
          <div
            className="w-7 border-2 border-black"
            style={{
              height: Math.max(8, (item.value / max) * barHeight),
              backgroundColor: item.color || '#888',
            }}
          />
          <span className="text-[9px] font-bold mt-1 text-neutral">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

// Neobrutalist comparison chart (two bars side by side with gradient)
export function MiniComparisonChart({ data }: { data: ChartData['data'] }) {
  const max = Math.max(...data.map(d => d.value));
  const barHeight = 44;

  const getBarStyle = (i: number, height: number) => {
    const baseStyle = {
      height: Math.max(10, height),
    };
    if (i === 0) {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #2F3BBD 0%, #C91A2B 100%)',
      };
    }
    return {
      ...baseStyle,
      backgroundColor: '#6366f1',
    };
  };

  return (
    <div className="flex items-end justify-center gap-4 pt-5 pb-1">
      {data.map((item, i) => (
        <div key={i} className="flex flex-col items-center" style={{ minWidth: 36 }}>
          <span className="text-[10px] font-black mb-1 text-neutral-dark">
            {item.value > 100 ? `${(item.value / 100).toFixed(1)}×` : item.value}
          </span>
          <div
            className="w-9 border-2 border-black"
            style={getBarStyle(i, (item.value / max) * barHeight)}
          />
          <span className="text-[9px] font-bold mt-1 text-neutral">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

// Neobrutalist trend line chart
export function MiniTrendChart({ data }: { data: ChartData['data'] }) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  const width = 100;
  const height = 56;
  const padding = { top: 8, right: 8, bottom: 16, left: 8 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  return (
    <div style={{ width, height }}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        {/* Area fill */}
        <path
          d={`M ${padding.left},${height - padding.bottom} ${data.map((d, i) => `L ${(i / (data.length - 1)) * chartWidth + padding.left},${padding.top + chartHeight - ((d.value - min) / range) * chartHeight}`).join(' ')} L ${width - padding.right},${height - padding.bottom} Z`}
          fill="rgba(199, 26, 43, 0.15)"
          stroke="none"
        />
        {/* Line */}
        <polyline
          points={data.map((d, i) => `${(i / (data.length - 1)) * chartWidth + padding.left},${padding.top + chartHeight - ((d.value - min) / range) * chartHeight}`).join(' ')}
          fill="none"
          stroke="#C91A2B"
          strokeWidth="2.5"
        />
        {/* Dots with labels */}
        {data.map((d, i) => (
          <g key={i}>
            <circle
              cx={(i / (data.length - 1)) * chartWidth + padding.left}
              cy={padding.top + chartHeight - ((d.value - min) / range) * chartHeight}
              r="5"
              fill="white"
              stroke="black"
              strokeWidth="1.5"
            />
            <text
              x={(i / (data.length - 1)) * chartWidth + padding.left}
              y={height - 2}
              textAnchor="middle"
              style={{ fontSize: 8, fontWeight: 'bold', fill: '#666' }}
            >
              {d.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// Neobrutalist donut/pie chart
export function MiniDonutChart({ data }: { data: ChartData['data'] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = -90;
  const mainValue = data[0]?.value || 0;
  const size = 64;
  const center = size / 2;
  const outerRadius = 26;
  const innerRadius = 12;

  return (
    <div style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        {data.map((item, i) => {
          const angle = (item.value / total) * 360;
          const largeArc = angle > 180 ? 1 : 0;
          const endAngle = currentAngle + angle;

          const x1 = center + outerRadius * Math.cos((currentAngle * Math.PI) / 180);
          const y1 = center + outerRadius * Math.sin((currentAngle * Math.PI) / 180);
          const x2 = center + outerRadius * Math.cos((endAngle * Math.PI) / 180);
          const y2 = center + outerRadius * Math.sin((endAngle * Math.PI) / 180);

          const path = `M ${center} ${center} L ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
          currentAngle = endAngle;

          return (
            <path
              key={i}
              d={path}
              fill={item.color || '#888'}
              stroke="black"
              strokeWidth="1.5"
            />
          );
        })}
        <circle cx={center} cy={center} r={innerRadius} fill="white" stroke="black" strokeWidth="1.5" />
        <text x={center} y={center + 4} textAnchor="middle" style={{ fontSize: 12, fontWeight: 900 }}>
          {mainValue}%
        </text>
      </svg>
    </div>
  );
}

// Render the appropriate chart type
export function MiniChart({ chart }: { chart: ChartData }) {
  switch (chart.type) {
    case 'bar':
      return <MiniBarChart data={chart.data} />;
    case 'comparison':
      return <MiniComparisonChart data={chart.data} />;
    case 'trend':
      return <MiniTrendChart data={chart.data} />;
    case 'donut':
      return <MiniDonutChart data={chart.data} />;
    default:
      return null;
  }
}
