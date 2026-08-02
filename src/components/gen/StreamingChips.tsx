import { useEffect, useRef, useState } from "react";

const CHIPS = ["Engineering", "Finance", "Business Dev", "Tax", "Legal"];

const StreamingChips = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setActive(CHIPS.length - 1);
      setDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done) return;
        observer.disconnect();
        let i = 0;
        const tick = () => {
          setActive(i);
          i += 1;
          if (i < CHIPS.length) {
            window.setTimeout(tick, 320);
          } else {
            setDone(true);
          }
        };
        tick();
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [done]);

  return (
    <div ref={ref} className="mt-4 flex flex-wrap gap-2" aria-label="Specialist evaluation stream">
      {CHIPS.map((chip, i) => {
        const on = i <= active;
        return (
          <span
            key={chip}
            className={`rounded-md border px-2.5 py-1 text-[11px] font-medium transition-all duration-300 ${
              on
                ? "border-primary/40 bg-primary/15 text-primary"
                : "border-border/60 bg-muted/30 text-muted-foreground/50"
            }`}
          >
            {chip}
          </span>
        );
      })}
    </div>
  );
};

export default StreamingChips;
