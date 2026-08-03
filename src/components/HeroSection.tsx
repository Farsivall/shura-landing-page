import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import BackgroundCards from "@/components/BackgroundCards";
import SpecialistCarousel from "@/components/SpecialistCarousel";
import { CountUp } from "@/components/CountUp";

type HeroSectionProps = {
  onOpenSignup?: () => void;
};

const HERO_STATS = [
  { end: 79.1, decimals: 1, suffix: " MW", label: "Capacity analysed" },
  { end: 3, decimals: 0, suffix: "", label: "Projects analysed" },
  { end: 800, decimals: 0, suffix: "+", label: "Documents mapped" },
] as const;

const HeroSection = ({ onOpenSignup }: HeroSectionProps) => {
  return (
    <section className="landing-band-dark landing-hero relative pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      <BackgroundCards />

      <div className="landing-hero-content relative z-10 pt-16 sm:pt-20 md:pt-28">
        <div className="container pb-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="landing-label mb-8 sm:mb-10">Pilot programme open</p>

            <h1 className="font-display text-4xl sm:text-5xl md:text-[3.25rem] lg:text-[3.85rem] font-semibold leading-[1.05] tracking-[-0.04em] text-foreground text-balance">
              Decision Intelligence for Energy Infrastructure.
            </h1>

            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground leading-[1.6] tracking-[-0.01em] max-w-2xl mx-auto">
              Shura is decision intelligence for energy developers: an adviser that learns from your
              projects, knows your past context, and gets better at helping you decide whether to
              commit.
            </p>

            <div className="mt-10 sm:mt-12 flex justify-center">
              <Button
                type="button"
                variant="hero"
                size="lg"
                className="min-h-[48px] rounded-full px-7 text-sm tracking-wide"
                onClick={onOpenSignup}
              >
                Apply for Pilot Programme
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="landing-hero-stats" aria-label="Portfolio analysed">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="landing-hero-stat">
                  <CountUp
                    end={stat.end}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    duration={1400}
                    startOnView
                    className="landing-hero-stat-value"
                  />
                  <span className="landing-hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SpecialistCarousel />
      </div>
    </section>
  );
};

export default HeroSection;
