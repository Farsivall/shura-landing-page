import { useState } from "react";
import { SectionLabel } from "./ProblemSections";
import { Sparkles, GitBranch, BarChart3, MessageSquare, FileText, ChevronDown, Shield } from "lucide-react";
import chatVideo from "@/assets/chat.mp4";
import decisionTreeVideo from "@/assets/decisiontree.mp4";
import evalVideo from "@/assets/eval.mp4";

const IntroducingSection = () => (
  <section id="introducing" className="py-16 sm:py-24 md:py-32 relative z-10">
    <div className="container min-w-0">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <SectionLabel>The solution</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Reduce uncertainty before you commit
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-4">
            Shura transforms complex project evidence into explainable, multidisciplinary intelligence — so energy developers can stress-test viability and understand trade-offs before capital locks in.
          </p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Evaluates engineering, financial and commercial viability from a single evidence base. Surfaces hidden risks. Produces a recommendation you can defend: proceed, restructure, or walk away.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {[
              { title: "Proceed", desc: "Viability supports further investment" },
              { title: "Restructure", desc: "Path exists — assumptions must change" },
              { title: "Walk away", desc: "Risk outweighs the opportunity" },
            ].map((item) => (
              <div key={item.title} className="px-4 py-4 rounded-lg border border-border bg-card text-left">
                <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
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
      desc: "Engineering, finance, commercial, environmental, and legal — one shared evidence base.",
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
      title: "Decide with confidence",
      desc: "Proceed, restructure, or walk away — with every recommendation tied to source evidence.",
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
            <div key={step.num} className="relative p-4 sm:p-6 rounded-xl border border-border bg-card group hover:border-primary/30 transition-colors">
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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const features = [
    {
      icon: Sparkles,
      title: "Multidisciplinary evaluation",
      desc: "Evaluates engineering, financial and commercial viability from a single evidence base — not five disconnected opinions.",
      video: evalVideo,
    },
    {
      icon: BarChart3,
      title: "Defendable financial model",
      desc: "Produces a validated financial model you can take to investors — numbers from authoritative sources, not invented returns.",
      video: decisionTreeVideo,
    },
    {
      icon: MessageSquare,
      title: "Explainable intelligence",
      desc: "Interrogate the recommendation. Understand trade-offs. Trace every claim back to project evidence.",
      video: chatVideo,
    },
    {
      icon: Shield,
      title: "Full provenance",
      desc: "Every recommendation is fully traceable to source evidence.",
      video: null,
    },
    {
      icon: FileText,
      title: "Investment-ready assessments",
      desc: "Creates assessments that explain the recommendation — for IC, lenders, and internal sponsors.",
      video: null,
    },
    {
      icon: GitBranch,
      title: "Clear decision paths",
      desc: "Proceed. Restructure. Walk away. Structured options, not open-ended chat.",
      video: null,
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 md:py-32 relative z-10">
      <div className="container min-w-0">
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-16">
          <SectionLabel>Outputs</SectionLabel>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            What you receive
          </h2>
          <p className="text-muted-foreground mt-4 text-sm sm:text-base">
            Outcomes that support the investment decision — not a pile of ungrounded text.
          </p>
        </div>
        <div className="max-w-5xl mx-auto flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            {features.slice(0, 3).map((f, i) => {
              const isExpanded = expandedIndex === i;
              return (
                <div
                  key={f.title}
                  className={`rounded-xl border bg-card transition-all overflow-hidden w-full max-w-full cursor-pointer p-4 sm:p-6 md:p-8 touch-manipulation ${
                    isExpanded ? "border-primary/40 ring-1 ring-primary/20" : "border-border hover:border-primary/30 md:min-h-0"
                  }`}
                  onClick={() => setExpandedIndex(isExpanded ? null : i)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <f.icon className="h-6 w-6 text-muted-foreground mb-4 transition-colors" />
                      <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 leading-tight">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </div>
                  <div
                    className={`grid transition-all duration-300 ease-out ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="border-t border-border bg-muted/30 p-4 mt-4 flex justify-center">
                        {f.video ? (
                          <div className="rounded-lg overflow-hidden aspect-video w-full max-w-2xl mx-auto">
                            <video
                              src={f.video}
                              className="w-full h-full object-cover"
                              playsInline
                              muted
                              loop
                              autoPlay
                            />
                          </div>
                        ) : (
                          <div className="aspect-video rounded-lg border border-dashed border-border flex items-center justify-center bg-card/50 w-full max-w-2xl mx-auto">
                            <p className="text-xs text-muted-foreground">Preview coming soon</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            {features.slice(3, 6).map((f) => (
              <div
                key={f.title}
                className="flex-1 min-w-0 rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-all"
              >
                <f.icon className="h-5 w-5 text-muted-foreground mb-4" />
                <h3 className="text-sm font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { IntroducingSection, HowItWorksSection, FeaturesSection };
