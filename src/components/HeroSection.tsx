import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HeroVisual from "./HeroVisual";

const evaluationStats = [
  { value: "79.1 MW", label: "Total analysed" },
  { value: "3", label: "Projects" },
  { value: "5", label: "Disciplines" },
];

const HeroSection = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Pointer tilt fights touch/trackpad scrolling — desktop mouse only.
    const canTilt =
      window.matchMedia("(pointer: fine) and (hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canTilt) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let running = false;

    const stopTilt = () => {
      running = false;
      stage.classList.remove("hero-3d-tilting");
      stage.style.removeProperty("--hero-tilt-x");
      stage.style.removeProperty("--hero-tilt-y");
      stage.style.removeProperty("--hero-shift-x");
      stage.style.removeProperty("--hero-shift-y");
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      const idle =
        Math.abs(currentX) < 0.001 &&
        Math.abs(targetX) < 0.001 &&
        Math.abs(currentY) < 0.001 &&
        Math.abs(targetY) < 0.001;

      if (idle) {
        stopTilt();
        frame = 0;
        return;
      }

      stage.style.setProperty("--hero-tilt-x", `${(-currentY * 10).toFixed(3)}deg`);
      stage.style.setProperty("--hero-tilt-y", `${(currentX * 14).toFixed(3)}deg`);
      stage.style.setProperty("--hero-shift-x", `${(currentX * 28).toFixed(2)}px`);
      stage.style.setProperty("--hero-shift-y", `${(currentY * 18).toFixed(2)}px`);
      frame = requestAnimationFrame(tick);
    };

    const ensureTick = () => {
      if (running) return;
      running = true;
      stage.classList.add("hero-3d-tilting");
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = stage.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = px;
      targetY = py;
      ensureTick();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      ensureTick();
    };

    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      stopTilt();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="hero-3d-section relative pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-44 md:pb-32 bg-grid overflow-x-clip">
      {/* Atmospheric depth planes */}
      <div className="hero-depth-plane hero-depth-plane-a" aria-hidden />
      <div className="hero-depth-plane hero-depth-plane-b" aria-hidden />
      <div className="hero-orbit-ring" aria-hidden />
      <div className="hero-orbit-ring hero-orbit-ring-delayed" aria-hidden />

      <div className="container relative z-10 min-w-0">
        <div ref={stageRef} className="hero-3d-stage">
          <div className="hero-3d-world">
            <div className="max-w-3xl mx-auto text-center min-w-0 hero-copy-layer">
              <div className="hero-eyebrow mb-6 sm:mb-8">
                <span className="hero-eyebrow-dot" />
                Decision intelligence · Energy infrastructure
              </div>

              <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] mb-6 sm:mb-8 px-1">
                <span className="hero-title-line">Know whether a project is worth pursuing</span>
                <br />
                <span className="hero-title-accent">before you commit millions.</span>
              </h1>

              <Link
                to="/portfolio"
                className="hero-eval-stats liquid-glass liquid-glass-sm liquid-glass-sheen mx-auto mb-8 sm:mb-10 flex max-w-lg items-stretch justify-center px-1.5 sm:px-2 py-4 sm:py-5 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="View analysed portfolio projects"
              >
                {evaluationStats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`flex flex-1 flex-col items-center gap-1 px-1.5 sm:px-5 min-w-0 ${
                      i > 0 ? "border-l border-border/60" : ""
                    }`}
                  >
                    <span className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground tabular-nums tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-[11px] sm:text-xs text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </Link>

              <p className="hero-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-3 leading-relaxed text-balance px-1">
                Shura is decision intelligence for energy developers: an adviser that learns from your projects, knows your past context, and gets better at helping you decide whether to commit.
              </p>
              <p className="hero-body-sub text-sm text-muted-foreground/90 max-w-xl mx-auto px-1">
                Evidence-backed pre-evaluation. Full provenance. Context that compounds.
              </p>
            </div>

            <div className="mt-14 sm:mt-20 min-w-0 hero-visual-layer">
              <HeroVisual />
            </div>

            <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 hero-cta-layer">
              <Button variant="hero" size="xl" asChild className="touch-manipulation w-full sm:w-auto min-h-[48px] hero-cta-3d">
                <Link to="/portfolio#signup">
                  Sign up for the pilot <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
