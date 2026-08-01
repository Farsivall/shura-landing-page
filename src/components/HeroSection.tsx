import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HeroVisual from "./HeroVisual";

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-44 md:pb-32 bg-grid overflow-hidden">
      <div className="container relative z-10 min-w-0">
        <div className="max-w-3xl mx-auto text-center min-w-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15] mb-4 sm:mb-6 animate-fade-in-up px-1">
            Is this project{" "}
            <span className="text-primary">worth pursuing?</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-3 animate-fade-in-up animation-delay-200 leading-relaxed text-balance px-1">
            Shura is decision intelligence for energy developers. Evaluate engineering, financial, commercial and environmental viability before you commit capital, advisory spend, or investment committee time.
          </p>
          <p className="text-sm text-muted-foreground/90 max-w-xl mx-auto mb-8 sm:mb-10 animate-fade-in-up animation-delay-200 px-1">
            Evidence-backed pre-evaluation. Every recommendation traceable to source.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
            <Button variant="hero" size="xl" asChild className="touch-manipulation w-full sm:w-auto min-h-[48px]">
              <a href="#cta">
                Join the waitlist <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <div className="mt-14 sm:mt-20 animate-fade-in-up animation-delay-400 min-w-0">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
