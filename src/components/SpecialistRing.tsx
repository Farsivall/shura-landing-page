import { Scale, TrendingUp, Code, Calculator, Briefcase } from "lucide-react";

const specialists = [
  {
    icon: Code,
    label: "Engineering",
    accent: "bg-violet-600",
    ring: "ring-violet-500/40",
    bar: "bg-violet-500",
  },
  {
    icon: TrendingUp,
    label: "Finance",
    accent: "bg-emerald-600",
    ring: "ring-emerald-500/40",
    bar: "bg-emerald-500",
  },
  {
    icon: Briefcase,
    label: "Business Dev",
    accent: "bg-amber-600",
    ring: "ring-amber-500/40",
    bar: "bg-amber-500",
  },
  {
    icon: Calculator,
    label: "Tax",
    accent: "bg-teal-600",
    ring: "ring-teal-500/40",
    bar: "bg-teal-500",
  },
  {
    icon: Scale,
    label: "Legal",
    accent: "bg-blue-600",
    ring: "ring-blue-500/40",
    bar: "bg-blue-500",
  },
];

const SpecialistRing = () => {
  const count = specialists.length;
  const angleStep = 360 / count;

  return (
    <div className="specialist-ring-scene relative mx-auto w-full max-w-4xl h-[220px] sm:h-[320px] md:h-[380px] select-none overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 bottom-6 -translate-x-1/2 w-[55%] h-10 rounded-[100%] bg-primary/15 blur-2xl"
        aria-hidden
      />

      {/* Inner wireframe disc */}
      <div className="specialist-ring-disc" aria-hidden />

      <div className="specialist-ring-stage absolute inset-0 flex items-center justify-center overflow-visible">
        <div className="specialist-ring">
          {specialists.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="specialist-ring-item"
                style={{ ["--angle" as string]: `${i * angleStep}deg` }}
              >
                <div
                  className={`specialist-ring-card rounded-xl border border-border bg-card/95 backdrop-blur-sm p-2 sm:p-3.5 ring-1 ${s.ring} w-[84px] sm:w-[118px] md:w-[132px]`}
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
                      <p className="text-[9px] text-muted-foreground hidden sm:block">
                        Specialist
                      </p>
                    </div>
                  </div>
                  <div className="h-1 rounded-full bg-muted overflow-hidden mb-2">
                    <div className={`h-full w-3/4 rounded-full ${s.bar}`} />
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground text-left leading-snug">
                    Evidence-backed view
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
          <div className="specialist-hub">
            <span className="specialist-hub-pulse" aria-hidden />
            <p className="text-[10px] sm:text-xs font-medium text-primary whitespace-nowrap relative z-10">
              Specialist panel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistRing;
