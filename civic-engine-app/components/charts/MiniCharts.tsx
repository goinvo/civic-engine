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

// Neobrutalist mini bar chart - fixed height bars for consistency
// Use color: 'gradient' for brand gradient fill
export function MiniBarChart({ data }: { data: ChartData['data'] }) {
  const max = Math.max(...data.map(d => d.value));
  const maxBarHeight = 48;

  const getBarStyle = (item: ChartData['data'][0]): React.CSSProperties => {
    const height = Math.max(8, (item.value / max) * maxBarHeight);
    if (item.color === 'gradient') {
      return {
        height,
        background: 'linear-gradient(135deg, #2F3BBD 0%, #C91A2B 100%)',
      };
    }
    return {
      height,
      backgroundColor: item.color || '#888',
    };
  };

  return (
    <div className="flex items-end justify-center gap-4 pt-2">
      {data.map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="text-[10px] font-black mb-1 text-neutral-dark dark:text-white">{item.value}%</span>
          <div
            className="w-8 border-2 border-black dark:border-gray-600"
            style={getBarStyle(item)}
          />
          <span className="text-[9px] font-bold mt-1 text-neutral dark:text-gray-400">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

// Neobrutalist comparison chart (two bars side by side with gradient)
export function MiniComparisonChart({ data }: { data: ChartData['data'] }) {
  const max = Math.max(...data.map(d => d.value));
  const maxBarHeight = 48;

  const getBarStyle = (i: number, value: number) => {
    const height = Math.max(8, (value / max) * maxBarHeight);
    if (i === 0) {
      return {
        height,
        background: 'linear-gradient(135deg, #2F3BBD 0%, #C91A2B 100%)',
      };
    }
    return {
      height,
      backgroundColor: '#80467E', // Purple accent
    };
  };

  return (
    <div className="flex items-end justify-center gap-5 pt-2">
      {data.map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="text-[10px] font-black mb-1 text-neutral-dark dark:text-white">
            {item.value > 100 ? `${(item.value / 100).toFixed(1)}×` : item.value}
          </span>
          <div
            className="w-10 border-2 border-black dark:border-gray-600"
            style={getBarStyle(i, item.value)}
          />
          <span className="text-[9px] font-bold mt-1 text-neutral dark:text-gray-400">{item.name}</span>
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
  const width = 140;
  const height = 72;
  const padding = { top: 10, right: 10, bottom: 20, left: 10 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  return (
    <div className="w-full h-full min-h-[72px]" style={{ maxWidth: width }}>
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
              r="6"
              fill="white"
              stroke="black"
              strokeWidth="1.5"
              className="dark:fill-gray-800"
            />
            <text
              x={(i / (data.length - 1)) * chartWidth + padding.left}
              y={height - 4}
              textAnchor="middle"
              className="fill-neutral dark:fill-gray-400"
              style={{ fontSize: 10, fontWeight: 'bold' }}
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
  const size = 80;
  const center = size / 2;
  const outerRadius = 34;
  const innerRadius = 16;

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ minHeight: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
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
              className="dark:stroke-gray-600"
            />
          );
        })}
        <circle cx={center} cy={center} r={innerRadius} fill="white" stroke="black" strokeWidth="1.5" className="dark:fill-gray-800 dark:stroke-gray-600" />
        <text x={center} y={center + 5} textAnchor="middle" className="fill-neutral-dark dark:fill-white" style={{ fontSize: 14, fontWeight: 900 }}>
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
