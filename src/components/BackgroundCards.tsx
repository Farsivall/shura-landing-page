const cards = [
  {
    label: "Finance",
    letter: "F",
    barPercent: 82,
    barColor: "bg-emerald-500",
    iconBg: "bg-emerald-600",
    opacity: 0.14,
    left: "8%",
    top: "18%",
    dimensions: [
      { name: "Viability", pct: "30%" },
      { name: "Coverage", pct: "25%" },
      { name: "Capital intensity", pct: "25%" },
    ],
  },
  {
    label: "Engineering",
    letter: "E",
    barPercent: 90,
    barColor: "bg-violet-500",
    iconBg: "bg-violet-600",
    opacity: 0.1,
    left: "72%",
    top: "14%",
    dimensions: [
      { name: "Feasibility", pct: "25%" },
      { name: "Execution risk", pct: "25%" },
      { name: "Design maturity", pct: "20%" },
    ],
  },
  {
    label: "Business Dev",
    letter: "BD",
    barPercent: 80,
    barColor: "bg-amber-500",
    iconBg: "bg-amber-600",
    opacity: 0.12,
    left: "78%",
    top: "58%",
    dimensions: [
      { name: "Market opportunity", pct: "25%" },
      { name: "Competitive position", pct: "20%" },
      { name: "Strategic alignment", pct: "20%" },
    ],
  },
  {
    label: "Tax",
    letter: "T",
    barPercent: 65,
    barColor: "bg-teal-500",
    iconBg: "bg-teal-600",
    active: true,
    opacity: 0.11,
    left: "12%",
    top: "62%",
    dimensions: [
      { name: "Tax efficiency", pct: "25%" },
      { name: "Structural optimization", pct: "25%" },
      { name: "Jurisdictional risk", pct: "20%" },
    ],
  },
  {
    label: "Legal",
    letter: "L",
    barPercent: 78,
    barColor: "bg-blue-500",
    iconBg: "bg-blue-600",
    opacity: 0.08,
    left: "42%",
    top: "78%",
    dimensions: [
      { name: "Regulatory exposure", pct: "30%" },
      { name: "Contract risk", pct: "25%" },
      { name: "Permitting risk", pct: "20%" },
    ],
  },
];

/** Fixed atmospheric cards — no position shuffling (keeps scroll smooth). */
const BackgroundCards = () => {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-cards-layer hidden md:block"
      aria-hidden
    >
      <div className="absolute inset-0 bg-background/30" />
      {cards.map((card) => (
        <div
          key={card.label}
          className="absolute w-[180px] md:w-[240px] max-w-[calc(100vw-2rem)]"
          style={{
            left: card.left,
            top: card.top,
            transform: "translate(-50%, -50%)",
            opacity: card.opacity,
          }}
        >
          <BackgroundCard card={card} />
        </div>
      ))}
    </div>
  );
};

const BackgroundCard = ({
  card,
}: {
  card: (typeof cards)[0];
}) => {
  return (
    <div
      className={`rounded-lg md:rounded-xl border border-border bg-card p-2 sm:p-3 md:p-4 ${
        card.active ? "ring-1 ring-primary/30" : ""
      }`}
    >
      <div className="flex items-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-3">
        <div
          className={`h-5 w-5 sm:h-7 sm:w-7 md:h-9 md:w-9 rounded-full ${card.iconBg} flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-white text-[8px] sm:text-[10px] md:text-xs font-semibold">
            {card.letter}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <span className="text-[10px] sm:text-xs md:text-sm font-medium text-foreground truncate">
              {card.label}
            </span>
            {card.active && (
              <span className="rounded bg-cyan-500/80 px-1 py-0.5 text-[8px] sm:text-[10px] font-medium text-white">
                Active
              </span>
            )}
          </div>
          <p className="text-[8px] sm:text-[9px] md:text-[10px] text-muted-foreground hidden sm:block">
            Decision intelligence, evidence-backed
          </p>
        </div>
      </div>
      <div className="h-1 sm:h-1.5 rounded-full bg-muted overflow-hidden mb-1.5 sm:mb-3">
        <div
          className={`h-full rounded-full ${card.barColor}`}
          style={{ width: `${card.barPercent}%` }}
        />
      </div>
      <div className="space-y-1 hidden md:block">
        {card.dimensions.map((d) => (
          <div key={d.name} className="flex justify-between gap-2 text-[10px] text-muted-foreground">
            <span className="truncate">{d.name}</span>
            <span className="tabular-nums shrink-0">{d.pct}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundCards;
