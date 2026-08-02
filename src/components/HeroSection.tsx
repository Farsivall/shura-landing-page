import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HeroVisual from "./HeroVisual";

const HeroSection = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = px;
      targetY = py;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      stage.style.setProperty("--hero-tilt-x", `${(-currentY * 10).toFixed(3)}deg`);
      stage.style.setProperty("--hero-tilt-y", `${(currentX * 14).toFixed(3)}deg`);
      stage.style.setProperty("--hero-shift-x", `${(currentX * 28).toFixed(2)}px`);
      stage.style.setProperty("--hero-shift-y", `${(currentY * 18).toFixed(2)}px`);
      frame = requestAnimationFrame(tick);
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="hero-3d-section relative pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-44 md:pb-32 bg-grid overflow-x-clip overflow-y-visible">
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

              <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] mb-4 sm:mb-6 px-1">
                <span className="hero-title-line">Know whether a project is worth pursuing</span>
                <br />
                <span className="hero-title-accent">before you commit millions.</span>
              </h1>

              <p className="hero-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-3 leading-relaxed text-balance px-1">
                Shura is decision intelligence for energy developers — an adviser that learns from your projects, knows your past context, and gets better at helping you decide whether to commit.
              </p>
              <p className="hero-body-sub text-sm text-muted-foreground/90 max-w-xl mx-auto mb-8 sm:mb-10 px-1">
                Evidence-backed pre-evaluation. Full provenance. Context that compounds.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 hero-cta-layer">
                <Button variant="hero" size="xl" asChild className="touch-manipulation w-full sm:w-auto min-h-[48px] hero-cta-3d">
                  <a href="#cta">
                    Sign up for the pilot <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="mt-14 sm:mt-20 min-w-0 hero-visual-layer">
              <HeroVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
