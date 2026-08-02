const nodes = [
  { id: "ws", label: "Workspace", x: 18, y: 42, color: "var(--km-kind-workspace, #a5b4fc)" },
  { id: "doc", label: "Document", x: 42, y: 22, color: "var(--km-kind-document, #fbbf24)" },
  { id: "sp", label: "Specialist", x: 68, y: 28, color: "var(--km-kind-specialist, #d8b4fe)" },
  { id: "dec", label: "Decision", x: 78, y: 62, color: "var(--km-kind-decision, #38bdf8)" },
  { id: "proj", label: "Project", x: 38, y: 68, color: "var(--km-kind-project, #34d399)" },
];

const links: [string, string][] = [
  ["ws", "doc"],
  ["ws", "proj"],
  ["doc", "sp"],
  ["sp", "dec"],
  ["proj", "dec"],
  ["doc", "proj"],
];

const KnowledgeMapPreview = () => {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="gen-km-preview relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-lg border border-border/60 bg-[color:var(--km-bg,#0f1014)]">
      <div className="gen-grid-fade absolute inset-0 opacity-40" aria-hidden />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {links.map(([a, b], i) => {
          const na = byId[a];
          const nb = byId[b];
          return (
            <line
              key={`${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="0.4"
              className="gen-km-link"
              style={{ animationDelay: `${i * 0.35}s` }}
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
            className="flex items-center gap-1.5 rounded-md border border-white/10 bg-black/55 px-2 py-1 backdrop-blur-sm"
            style={{ boxShadow: `0 0 0 1px ${n.color}33` }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: n.color }} />
            <span className="text-[9px] font-medium text-white/85 whitespace-nowrap">{n.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KnowledgeMapPreview;
