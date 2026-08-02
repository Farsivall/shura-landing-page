import { useState } from "react";
import { SectionLabel } from "./ProblemSections";
import {
  Sparkles,
  GitBranch,
  BarChart3,
  FileText,
  Brain,
  History,
  TrendingUp,
  Wrench,
  MapPin,
  Search,
  Compass,
  Play,
} from "lucide-react";
import LiveRecommendation from "@/components/gen/LiveRecommendation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type OutputFeature = {
  icon: typeof FileText;
  title: string;
  desc: string;
  video?: string | null;
};

const outputFeatures: OutputFeature[] = [
  {
    icon: FileText,
    title: "Investment Evaluation",
    desc: "A structured proceed / restructure / walk-away assessment grounded in project evidence.",
  },
  {
    icon: BarChart3,
    title: "Financial Model",
    desc: "A defendable model built from authoritative sources, ready for investor and lender scrutiny.",
  },
  {
    icon: Wrench,
    title: "Engineering Assessment",
    desc: "Technical viability, constraints, and risks scored against the evidence in the data room.",
  },
  {
    icon: MapPin,
    title: "Site Assessment",
    desc: "Location, grid, and site-level factors that shape whether the project can be delivered.",
  },
  {
    icon: Search,
    title: "Evidence Intelligence",
    desc: "Every claim traced to source documents, so you can interrogate the basis of the recommendation.",
  },
  {
    icon: Compass,
    title: "Decision Intelligence",
    desc: "Trade-offs, assumptions, and decision paths made clear before capital commits.",
  },
];

const IntroducingSection = () => (
  <section id="introducing" className="py-16 sm:py-24 md:py-32 relative z-10">
    <div className="container min-w-0">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <SectionLabel>The solution</SectionLabel>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-6 px-1">
            Reduce uncertainty before you commit
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-4">
            Shura transforms complex project evidence into explainable, multidisciplinary intelligence, so energy developers can stress-test viability and understand trade-offs before capital locks in.
          </p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Evaluates engineering, financial and business-development viability from a single evidence base. Surfaces hidden risks. Produces a recommendation you can defend: proceed, restructure, or walk away. And it gets sharper the more you use it, because it retains your project context.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-6">
            {[
              { title: "Proceed", desc: "Viability supports further investment" },
              { title: "Restructure", desc: "Path exists if assumptions change" },
              { title: "Walk away", desc: "Risk outweighs the opportunity" },
            ].map((item) => (
              <div key={item.title} className="px-4 py-4 rounded-lg bg-card/50 text-left">
                <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="max-w-2xl mx-auto">
            <LiveRecommendation />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const LearningAdviserSection = () => (
  <section id="learning" className="py-16 sm:py-24 md:py-32 relative z-10 border-t border-border">
    <div className="container min-w-0">
      <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
        <SectionLabel>Compound advantage</SectionLabel>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
          An adviser that learns from your projects
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Shura doesn’t forget. It carries forward your past context: structures you’ve used, risks you’ve seen, preferences your team has established. And it gets better at helping you make the next commit decision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
        {[
          {
            icon: History,
            title: "Knows your past context",
            desc: "Prior projects, assumptions, and diligence patterns stay available, not locked in someone’s inbox.",
          },
          {
            icon: Brain,
            title: "Learns how you decide",
            desc: "Surfaces what mattered last time. Flags familiar failure modes. Aligns with how your organisation evaluates risk.",
          },
          {
            icon: TrendingUp,
            title: "Gets sharper over time",
            desc: "Each evaluation compounds. The fifth project starts ahead of where the first one began.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl bg-card/50 p-6 text-left"
          >
            <item.icon className="h-5 w-5 text-primary mb-4" />
            <h3 className="text-sm font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto rounded-2xl bg-primary/5 px-6 py-5 text-center">
        <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
          Not a chatbot that resets. Not an adviser that walks away with the brief.{" "}
          <span className="text-primary font-medium">
            Institutional memory for investment decisions.
          </span>
        </p>
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => {
  const steps = [
    {
      num: "01",
      title: "Bring the project",
      desc: "Assemble the evidence that would otherwise sit across folders and advisors.",
      icon: FileText,
    },
    {
      num: "02",
      title: "Evaluate across disciplines",
      desc: "Engineering, finance, business development, tax, and legal: one shared evidence base.",
      icon: Sparkles,
    },
    {
      num: "03",
      title: "Stress-test viability",
      desc: "Validate assumptions. Surface trade-offs. Produce a financial model you can defend.",
      icon: BarChart3,
    },
    {
      num: "04",
      title: "Decide, and compound",
      desc: "Proceed, restructure, or walk away. Shura keeps the context so the next project starts smarter.",
      icon: GitBranch,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 md:py-32 relative z-10 border-t border-border">
      <div className="container min-w-0">
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-16">
          <SectionLabel>Process</SectionLabel>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            From uncertainty to an investment decision
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative p-4 sm:p-6 rounded-xl bg-card/50 group"
            >
              <span className="text-xs font-mono text-primary mb-4 block">{step.num}</span>
              <step.icon className="h-5 w-5 text-muted-foreground mb-3 group-hover:text-primary transition-colors" />
              <h3 className="text-sm font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const [active, setActive] = useState<OutputFeature | null>(null);

  return (
    <section id="features" className="py-16 sm:py-24 md:py-32 relative z-10">
      <div className="container min-w-0">
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-16">
          <SectionLabel>Outputs</SectionLabel>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            What you receive
          </h2>
          <p className="text-muted-foreground mt-4 text-sm sm:text-base">
            Outcomes that support the investment decision, not a pile of ungrounded text.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {outputFeatures.map((f) => (
            <button
              key={f.title}
              type="button"
              onClick={() => setActive(f)}
              className="group min-w-0 min-h-[44px] rounded-xl bg-card/50 p-5 sm:p-6 text-left transition-colors hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring touch-manipulation"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <f.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <Play className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-primary/70 transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0 sm:rounded-2xl">
          {active && (
            <>
              <DialogHeader className="px-6 pt-6 pb-3 text-left">
                <DialogTitle>{active.title}</DialogTitle>
                <DialogDescription>{active.desc}</DialogDescription>
              </DialogHeader>
              <div className="px-6 pb-6">
                {active.video ? (
                  <div className="overflow-hidden rounded-lg aspect-video">
                    <video
                      src={active.video}
                      className="h-full w-full object-cover"
                      playsInline
                      controls
                      autoPlay
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center rounded-lg bg-muted/40">
                    <p className="text-sm text-muted-foreground">Preview coming soon</p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export { IntroducingSection, LearningAdviserSection, HowItWorksSection, FeaturesSection };
