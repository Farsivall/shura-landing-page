import { useEffect, useState } from "react";
import { Check, FileText, GitBranch, Network, Sparkles } from "lucide-react";
import SpecialistRing from "./SpecialistRing";

const analysisOutputs = [
  { label: "Evidence", hint: "Studies, workbooks, contracts", icon: FileText, tone: "mid" },
  { label: "Connections", hint: "How findings link across the project", icon: Network, tone: "go" },
  { label: "Decisions", hint: "Proceed, restructure, or walk away", icon: GitBranch, tone: "mid" },
];

/** 0 = knowledge map, 1 = specialists, 2 = full analysis */
type Stage = 0 | 1 | 2;

const STAGE_MS = 2200;
const HOLD_MS = 1600;

const HeroVisual = () => {
  const [stage, setStage] = useState<Stage>(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);
    if (prefersReduced) {
      setStage(2);
      return;
    }

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const loop = () => {
      setStage(0);
      later(() => {
        setStage(1);
        later(() => {
          setStage(2);
          later(loop, HOLD_MS);
        }, STAGE_MS);
      }, STAGE_MS);
    };

    loop();
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  const mapDone = reduced || stage >= 0;
  const mapComplete = reduced || stage >= 1;
  const specialistsActive = reduced || stage >= 1;
  const specialistsComplete = reduced || stage >= 2;
  const analysisActive = reduced || stage >= 2;

  return (
    <div className="hero-pipeline relative mx-auto w-full max-w-5xl touch-pan-y">
      {/* Stage 1 — Knowledge map */}
      <div
        className={`hero-stage ${mapDone ? "hero-stage-in" : ""} ${
          mapComplete ? "hero-stage-complete" : stage === 0 ? "hero-stage-active" : ""
        }`}
      >
        <div className="hero-stage-node">
          <span className="hero-stage-node-glow" aria-hidden />
          <Network className="h-4 w-4 shrink-0 opacity-90" />
          <span>Knowledge map</span>
          <span className={`hero-stage-check ${mapComplete ? "hero-stage-check-on" : ""}`}>
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </div>
        <p className="hero-stage-caption">Project evidence linked into one graph</p>
      </div>

      <div
        className={`hero-funnel-beam ${specialistsActive ? "hero-beam-lit" : ""}`}
        aria-hidden
      />

      {/* Stage 2 — Specialists */}
      <div
        className={`hero-stage ${specialistsActive ? "hero-stage-in" : "hero-stage-pending"} ${
          specialistsComplete ? "hero-stage-complete" : stage === 1 ? "hero-stage-active" : ""
        }`}
      >
        <div className="hero-stage-node hero-stage-node-soft">
          <span className="hero-stage-node-glow" aria-hidden />
          <Sparkles className="h-4 w-4 shrink-0 opacity-90" />
          <span>Specialists</span>
          <span className={`hero-stage-check ${specialistsComplete ? "hero-stage-check-on" : ""}`}>
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </div>
        <div className={`hero-stage-body ${specialistsActive ? "hero-stage-body-in" : ""}`}>
          <SpecialistRing reveal={false} animateBars={specialistsActive} />
        </div>
      </div>

      <div
        className={`hero-funnel-beam hero-funnel-beam-short ${analysisActive ? "hero-beam-lit" : ""}`}
        aria-hidden
      />

      {/* Stage 3 — Full analysis */}
      <div
        className={`hero-stage ${analysisActive ? "hero-stage-in" : "hero-stage-pending"} ${
          analysisActive ? "hero-stage-complete hero-stage-active" : ""
        }`}
      >
        <div className="hero-stage-node">
          <span className="hero-stage-node-glow" aria-hidden />
          <GitBranch className="h-4 w-4 shrink-0 opacity-90" />
          <span>Full analysis</span>
          <span className={`hero-stage-check ${analysisActive ? "hero-stage-check-on" : ""}`}>
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </div>
        <div className={`hero-stage-body ${analysisActive ? "hero-stage-body-in" : ""}`}>
          <div className="hero-path-stage">
            {analysisOutputs.map((node, i) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.label}
                  className={`hero-path-card hero-path-card-${node.tone} hero-pop-card`}
                  style={{ ["--path-i" as string]: i, animationDelay: `${i * 90}ms` }}
                >
                  <Icon className="h-4 w-4 mx-auto mb-2 opacity-80" />
                  <p className="text-sm font-semibold mb-1">{node.label}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">{node.hint}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
