import { useState, useEffect, type CSSProperties } from "react";

const cards = [
  {
    label: "Finance",
    letter: "F",
    barPercent: 82,
    barColor: "bg-emerald-500",
    iconBg: "bg-emerald-600",
    opacity: 0.55,
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
    opacity: 0.45,
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
    opacity: 0.5,
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
    opacity: 0.48,
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
    opacity: 0.4,
    dimensions: [
      { name: "Regulatory exposure", pct: "30%" },
      { name: "Contract risk", pct: "25%" },
      { name: "Permitting risk", pct: "20%" },
    ],
  },
];

/** Radius as % of the square orbit — leave room for card half-size + blur. */
const CENTER = 50;
const RADIUS = 44;
const ANGLES = [0, 72, 144, 216, 288];

const SLOT_STYLES: CSSProperties[] = ANGLES.map((deg) => {
  const rad = (deg * Math.PI) / 180;
  return {
    left: `${CENTER + RADIUS * Math.cos(rad)}%`,
    top: `${CENTER + RADIUS * Math.sin(rad)}%`,
  };
});

function shuffleSlots(): number[] {
  const a = [0, 1, 2, 3, 4];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Blurred, slowly rotating specialist cards — kept inside the hero. */
const BackgroundCards = () => {
  const [cardToSlot, setCardToSlot] = useState(() => [0, 1, 2, 3, 4]);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.documentElement.classList.contains("is-scrolling")) return;
      setCardToSlot(shuffleSlots());
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="hero-bg-cards absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="hero-bg-cards-stage">
        <div className="hero-bg-cards-orbit">
          {cards.map((card, i) => (
            <div
              key={card.label}
              className="hero-bg-card-slot absolute w-[96px] sm:w-[140px] md:w-[180px]"
              style={{
                ...SLOT_STYLES[cardToSlot[i]],
                transition:
                  "left 1.6s cubic-bezier(0.4, 0, 0.2, 1), top 1.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <BackgroundCard card={card} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/70 to-background" />
    </div>
  );
};

const BackgroundCard = ({ card }: { card: (typeof cards)[0] }) => {
  return (
    <div
      className={`rounded-lg md:rounded-xl border border-border/80 bg-card/90 p-2 sm:p-3 shadow-lg shadow-black/20 ${
        card.active ? "ring-1 ring-primary/30" : ""
      }`}
      style={{ opacity: card.opacity }}
    >
      <div className="flex items-center gap-1.5 sm:gap-2.5 mb-1.5 sm:mb-2.5">
        <div
          className={`h-5 w-5 sm:h-7 sm:w-7 rounded-full ${card.iconBg} flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-white text-[8px] sm:text-[10px] font-semibold">{card.letter}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <span className="text-[10px] sm:text-xs font-medium text-foreground truncate">
              {card.label}
            </span>
            {card.active && (
              <span className="rounded bg-primary/80 px-1 py-0.5 text-[8px] sm:text-[10px] font-medium text-white">
                Active
              </span>
            )}
          </div>
          <p className="text-[8px] sm:text-[9px] text-muted-foreground hidden sm:block">
            Decision intelligence, evidence-backed
          </p>
        </div>
      </div>
      <div className="h-1 sm:h-1.5 rounded-full bg-muted overflow-hidden mb-1.5 sm:mb-2.5">
        <div
          className={`h-full rounded-full ${card.barColor}`}
          style={{ width: `${card.barPercent}%` }}
        />
      </div>
      <ul className="space-y-0.5 sm:space-y-1">
        {card.dimensions.map((d) => (
          <li
            key={d.name}
            className="flex justify-between text-[8px] sm:text-[9px] text-muted-foreground"
          >
            <span className="truncate mr-1">{d.name}</span>
            <span>{d.pct}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BackgroundCards;
