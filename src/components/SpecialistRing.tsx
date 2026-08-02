import type { CSSProperties } from "react";
import { Scale, TrendingUp, Code, Calculator, Briefcase } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const specialists = [
  {
    icon: Code,
    label: "Engineering",
    accent: "bg-violet-600",
    ring: "ring-violet-500/40",
    bar: "bg-violet-500",
    target: 90,
  },
  {
    icon: TrendingUp,
    label: "Finance",
    accent: "bg-emerald-600",
    ring: "ring-emerald-500/40",
    bar: "bg-emerald-500",
    target: 82,
  },
  {
    icon: Briefcase,
    label: "Business Dev",
    accent: "bg-amber-600",
    ring: "ring-amber-500/40",
    bar: "bg-amber-500",
    target: 80,
  },
  {
    icon: Calculator,
    label: "Tax",
    accent: "bg-teal-600",
    ring: "ring-teal-500/40",
    bar: "bg-teal-500",
    target: 65,
  },
  {
    icon: Scale,
    label: "Legal",
    accent: "bg-blue-600",
    ring: "ring-blue-500/40",
    bar: "bg-blue-500",
    target: 78,
  },
];

/** Static specialist panel with looping fill bars — no 3D spin. */
const SpecialistRing = () => {
  return (
    <ScrollReveal delay={120}>
      <div className="relative mx-auto w-full max-w-4xl select-none" aria-hidden>
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-24 rounded-[100%] bg-primary/10 blur-3xl"
          aria-hidden
        />
        <div className="relative flex flex-wrap items-stretch justify-center gap-2 sm:gap-3 px-1">
          {specialists.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`rounded-xl border border-border bg-card/95 p-2.5 sm:p-3.5 ring-1 ${s.ring} w-[calc(50%-0.35rem)] sm:w-[118px] md:w-[132px]`}
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <div
                    className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full ${s.accent} flex items-center justify-center shrink-0`}
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-[11px] sm:text-xs font-semibold text-foreground truncate">
                      {s.label}
                    </p>
                    <p className="text-[9px] text-muted-foreground hidden sm:block">Specialist</p>
                  </div>
                </div>
                <div className="h-1 rounded-full bg-muted overflow-hidden mb-2">
                  <div
                    className={`specialist-bar-fill h-full rounded-full ${s.bar}`}
                    style={
                      {
                        ["--bar-target"]: `${s.target}%`,
                        animationDelay: `${i * 0.35}s`,
                      } as CSSProperties
                    }
                  />
                </div>
                <p className="text-[9px] text-muted-foreground leading-snug hidden sm:block">
                  Evaluating from shared evidence
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default SpecialistRing;
