/**
 * Landing Knowledge Map: logical hub-and-spoke, not a force-graph hairball.
 *
 * Project hub → flat documents + proceed decisions
 * Specialists evaluate decisions; decisions cite docs and derive reports
 * No folder / category hubs.
 */

type PreviewNode = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  color: string;
  size?: "sm" | "md" | "lg";
};

type PreviewLink = {
  from: string;
  to: string;
  kind: "contains" | "evaluates" | "cites" | "derives";
};

const nodes: PreviewNode[] = [
  {
    id: "proj",
    label: "Project hub",
    sub: "1 project",
    x: 50,
    y: 18,
    color: "#34d399",
    size: "lg",
  },
  {
    id: "docs",
    label: "Documents",
    sub: "Flat evidence cloud",
    x: 18,
    y: 48,
    color: "#fbbf24",
    size: "md",
  },
  {
    id: "dec",
    label: "Decisions",
    sub: "2 proceed runs",
    x: 50,
    y: 52,
    color: "#38bdf8",
    size: "md",
  },
  {
    id: "sp",
    label: "Specialists",
    sub: "5 disciplines",
    x: 22,
    y: 82,
    color: "#d8b4fe",
    size: "sm",
  },
  {
    id: "cites",
    label: "Cite links",
    sub: "Dense evidence rays",
    x: 50,
    y: 84,
    color: "#fbbf24",
    size: "sm",
  },
  {
    id: "rep",
    label: "Reports",
    sub: "PPE · SDA · Site",
    x: 78,
    y: 82,
    color: "#fb7185",
    size: "sm",
  },
];

const links: PreviewLink[] = [
  { from: "proj", to: "docs", kind: "contains" },
  { from: "proj", to: "dec", kind: "contains" },
  { from: "sp", to: "dec", kind: "evaluates" },
  { from: "dec", to: "cites", kind: "cites" },
  { from: "dec", to: "rep", kind: "derives" },
  { from: "cites", to: "docs", kind: "cites" },
];

const LINK_STROKE: Record<PreviewLink["kind"], string> = {
  contains: "rgba(52,211,153,0.55)",
  evaluates: "rgba(216,180,254,0.55)",
  cites: "rgba(251,191,36,0.45)",
  derives: "rgba(251,113,133,0.55)",
};

const SIZE_CLASS = {
  sm: "text-[9px] px-2 py-1",
  md: "text-[10px] px-2.5 py-1.5",
  lg: "text-[11px] px-3 py-2",
} as const;

const KnowledgeMapPreview = () => {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="gen-km-preview relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-[#f1efe9]">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 20%, rgba(52,211,153,0.14), transparent 70%)",
        }}
      />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {links.map((l, i) => {
          const a = byId[l.from];
          const b = byId[l.to];
          return (
            <line
              key={`${l.from}-${l.to}-${l.kind}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={LINK_STROKE[l.kind]}
              strokeWidth={l.kind === "contains" ? 0.55 : 0.4}
              strokeDasharray={l.kind === "cites" ? "1.2 1.2" : undefined}
              className="gen-km-link"
              style={{ animationDelay: `${i * 0.28}s` }}
            />
          );
        })}
      </svg>

      {nodes.map((n) => (
        <div
          key={n.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div
            className={`flex flex-col items-start gap-0.5 rounded-lg border border-black/8 bg-white/80 shadow-sm backdrop-blur-sm ${SIZE_CLASS[n.size ?? "md"]}`}
            style={{ boxShadow: `0 0 0 1px ${n.color}33` }}
          >
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: n.color }} />
              <span className="font-medium text-[#18181b] whitespace-nowrap">{n.label}</span>
            </span>
            {n.sub ? (
              <span className="pl-3 text-[8px] leading-none text-[#18181b]/55 whitespace-nowrap">
                {n.sub}
              </span>
            ) : null}
          </div>
        </div>
      ))}

      <p className="absolute bottom-2.5 left-3 right-3 text-[9px] leading-snug text-[#18181b]/45">
        Hub-and-spoke · no folder hubs · sample structure
      </p>
    </div>
  );
};

export default KnowledgeMapPreview;
