import { useEffect, useRef, useState } from "react";

const LINES = [
  "Proceed: DSCR holds under downside offtake",
  "Restructure: grid timing before full capital commit",
  "Walk away: offtake path does not support structure",
];

const LiveRecommendation = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [paused, setPaused] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedRef.current = reduced;
    if (reduced) {
      setText(LINES[0]);
      return;
    }
    if (paused) return;

    const full = LINES[lineIndex];
    let i = 0;
    setText("");
    let holdTimer = 0;

    const typeTimer = window.setInterval(() => {
      i += 1;
      setText(full.slice(0, i));
      if (i >= full.length) {
        window.clearInterval(typeTimer);
        holdTimer = window.setTimeout(() => {
          setLineIndex((n) => (n + 1) % LINES.length);
        }, 2200);
      }
    }, 28);

    return () => {
      window.clearInterval(typeTimer);
      window.clearTimeout(holdTimer);
    };
  }, [lineIndex, paused]);

  return (
    <div
      className="gen-live-rec liquid-glass liquid-glass-sm mx-auto mt-2 max-w-xl px-4 py-3 text-left"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-1.5 flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Live recommendation
        </span>
      </div>
      <p className="min-h-[1.5rem] font-mono text-sm text-foreground tabular-nums">
        {text}
        <span className="gen-cursor ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-primary align-middle" />
      </p>
    </div>
  );
};

export default LiveRecommendation;
