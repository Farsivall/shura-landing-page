import { useState, useEffect, useRef } from "react";

// Sourced: meeting waste (MeetingToll/Yaware), strategy/feasibility cost (Futurists/OGSCapital/McKinsey), unproductive meetings (71% - Insights for Professionals), decision latency (AgileIG)
const metrics = [
  { name: "Meeting waste", value: "£37B", label: "Lost annually to unproductive meetings (US)", color: "hsl(var(--primary))" },
  { name: "Strategy evaluation", value: "£100K+", label: "Per consulting engagement to test an idea", color: "hsl(262 83% 58%)" },
  { name: "Meetings unproductive", value: "71%", label: "Of meetings considered unproductive", color: "hsl(38 92% 50%)" },
  { name: "Decision latency", value: "60%", label: "Of project delays from slow decisions", color: "hsl(189 94% 43%)" },
];

// Angular zig-zag decline (loss style): start high, sharp segments down. Coords 0..100, SVG y = 0 at top.
const pathPoints: Record<number, { x: number; y: number }[]> = {
  0: [{ x: 0, y: 8 }, { x: 22, y: 18 }, { x: 28, y: 42 }, { x: 50, y: 35 }, { x: 55, y: 58 }, { x: 78, y: 48 }, { x: 85, y: 72 }, { x: 100, y: 62 }],
  1: [{ x: 0, y: 12 }, { x: 30, y: 28 }, { x: 38, y: 50 }, { x: 60, y: 42 }, { x: 70, y: 65 }, { x: 100, y: 55 }],
  2: [{ x: 0, y: 6 }, { x: 25, y: 25 }, { x: 35, y: 48 }, { x: 55, y: 38 }, { x: 65, y: 60 }, { x: 88, y: 50 }, { x: 100, y: 70 }],
  3: [{ x: 0, y: 10 }, { x: 28, y: 32 }, { x: 40, y: 55 }, { x: 62, y: 45 }, { x: 75, y: 68 }, { x: 100, y: 58 }],
};

function pathD(points: { x: number; y: number }[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

const ARROW_SHAFT = 4.5;
const ARROW_HEAD_LEN = 4;
const ARROW_HEAD_W = 2.8;

function getArrowParts(last: { x: number; y: number }, prev: { x: number; y: number }) {
  const dx = last.x - prev.x;
  const dy = last.y - prev.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const tipX = last.x + ARROW_SHAFT * ux;
  const tipY = last.y + ARROW_SHAFT * uy;
  const rad = Math.atan2(uy, ux);
  const x1 = tipX - ARROW_HEAD_LEN * Math.cos(rad) + ARROW_HEAD_W * Math.sin(rad);
  const y1 = tipY - ARROW_HEAD_LEN * Math.sin(rad) - ARROW_HEAD_W * Math.cos(rad);
  const x2 = tipX - ARROW_HEAD_LEN * Math.cos(rad) - ARROW_HEAD_W * Math.sin(rad);
  const y2 = tipY - ARROW_HEAD_LEN * Math.sin(rad) + ARROW_HEAD_W * Math.cos(rad);
  return {
    shaft: { x1: last.x, y1: last.y, x2: tipX, y2: tipY },
    head: `M ${tipX} ${tipY} L ${x1} ${y1} L ${x2} ${y2} Z`,
  };
}

function pathLength(points: { x: number; y: number }[]) {
  let len = 0;
  for (let i = 1; i < points.length; i++) {
    len += Math.sqrt((points[i].x - points[i - 1].x) ** 2 + (points[i].y - points[i - 1].y) ** 2);
  }
  return len;
}

export default function CostScatterAnimated() {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-[280px] w-full relative">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full cursor-pointer"
      >
        <defs>
          <filter id="line-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0.8" dy="0.8" stdDeviation="0.6" floodColor="rgba(0,0,0,0.25)" floodOpacity="1" />
          </filter>
        </defs>
        {/* Grid - light gray like inspiration */}
        {[20, 40, 60, 80].map((n) => (
          <g key={n}>
            <line x1={n} y1={0} x2={n} y2={100} stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.4} />
            <line x1={0} y1={n} x2={100} y2={n} stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.4} />
          </g>
        ))}
        {/* Angular trend lines with shadow + arrow */}
        {(Object.keys(pathPoints) as unknown as number[]).map((i) => {
          const points = pathPoints[i];
          const d = pathD(points);
          const len = pathLength(points);
          const duration = 1400;
          const delay = i * 120;
          const m = metrics[i];
          const isSelected = selected === i;
          const last = points[points.length - 1];
          const prev = points[points.length - 2];
          const arrow = getArrowParts(last, prev);
          return (
            <g
              key={m.name}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(selected === i ? null : i);
              }}
              style={{ cursor: "pointer" }}
            >
              {/* Invisible wider path for easier click */}
              <path d={d} fill="none" stroke="transparent" strokeWidth={10} />
              {/* Main line - sharp angles, thin, with subtle shadow */}
              <path
                d={d}
                fill="none"
                stroke={m.color}
                strokeWidth={1.2}
                strokeLinecap="butt"
                strokeLinejoin="miter"
                opacity={isSelected ? 1 : 0.9}
                filter="url(#line-shadow)"
                strokeDasharray={len}
                strokeDashoffset={mounted ? 0 : len}
                style={{
                  transition: `stroke-dashoffset ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, opacity 0.2s`,
                }}
              />
              {/* Arrow shaft (actual arrow line from path end to tip) */}
              <line
                x1={arrow.shaft.x1}
                y1={arrow.shaft.y1}
                x2={arrow.shaft.x2}
                y2={arrow.shaft.y2}
                stroke={m.color}
                strokeWidth={1.2}
                strokeLinecap="butt"
                opacity={mounted ? (isSelected ? 1 : 0.9) : 0}
                filter="url(#line-shadow)"
                style={{ transition: `opacity 300ms ${duration + delay}ms` }}
              />
              {/* Arrowhead */}
              <path
                d={arrow.head}
                fill={m.color}
                opacity={mounted ? (isSelected ? 1 : 0.9) : 0}
                style={{ transition: `opacity 300ms ${duration + delay}ms` }}
              />
            </g>
          );
        })}
      </svg>
      {/* Axis labels */}
      <div className="absolute bottom-1 left-6 text-[9px] text-muted-foreground">→</div>
      <div className="absolute top-1/2 -left-0.5 text-[9px] text-muted-foreground -rotate-90 origin-left">↑</div>
      {/* Click-to-show loss callout */}
      {selected !== null && (
        <div
          className="absolute right-2 top-2 rounded-lg border border-border bg-card px-3 py-2 shadow-lg text-left min-w-[140px]"
          role="status"
        >
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">{metrics[selected].name}</p>
          <p className="text-lg font-bold text-foreground tabular-nums">{metrics[selected].value}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{metrics[selected].label}</p>
          <p className="text-[9px] text-muted-foreground/80 mt-1">Click elsewhere to close</p>
        </div>
      )}
      {selected === null && (
        <p className="absolute right-2 top-2 text-[10px] text-muted-foreground">Click a line to see the loss</p>
      )}
    </div>
  );
}

export { metrics as scatterData };
