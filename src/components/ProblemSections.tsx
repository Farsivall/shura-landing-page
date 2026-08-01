import { Clock, Layers, DollarSign, Calendar } from "lucide-react";
import { CountUp } from "./CountUp";
import { AnimatedBar } from "./AnimatedBar";
import ComplexityGraphic from "./ComplexityGraphic";
import CostScatterAnimated from "./CostScatterAnimated";
import chatVideo from "@/assets/chat.mp4";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block text-xs font-medium text-primary tracking-widest uppercase mb-4">{children}</span>
);

const WhyNowSection = () => (
  <section className="py-16 sm:py-24 md:py-32 relative z-10">
    <div className="container min-w-0">
      <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
        <SectionLabel>The decision</SectionLabel>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
          A project arrives. Thousands of pages follow. Uncertainty remains.
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          Engineering studies. Financial workbooks. Environmental assessments. Contracts. Offtake. Before capital, consulting, financing, or IC — one question matters: is this project worth pursuing?
        </p>
      </div>
      <div className="flex justify-center mt-8 sm:mt-10 overflow-x-auto">
        <div className="p-4 sm:p-8 rounded-2xl border border-border bg-card/50 min-w-0">
          <ComplexityGraphic />
        </div>
      </div>
    </div>
  </section>
);

const problemPersonas = [
  { name: "Engineering", percent: 69, color: "bg-violet-400" },
  { name: "Finance", percent: 74, color: "bg-emerald-400" },
  { name: "Commercial", percent: 61, color: "bg-amber-400" },
  { name: "Environmental", percent: 63, color: "bg-cyan-400" },
  { name: "Legal", percent: 58, color: "bg-blue-400" },
];

const ProblemSection = () => (
  <section id="problem" className="py-16 sm:py-24 md:py-32 relative z-10">
    <div className="container min-w-0">
      <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
        <SectionLabel>The problem</SectionLabel>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
          Why this decision is so difficult today
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
          Evidence is fragmented. Assumptions stay unvalidated. Risks hide between disciplines. Developers spend months — and six figures — just to decide whether to go further.
        </p>
      </div>
      <div className="max-w-2xl mx-auto mb-12">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Perspectives that rarely meet
          </h3>
          <div className="space-y-4">
            {problemPersonas.map((p) => (
              <div key={p.name} className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-28 shrink-0">{p.name}</span>
                <div className="flex-1 min-w-0">
                  <AnimatedBar percent={p.percent} barClassName={p.color} duration={1200} />
                </div>
                <span className="text-sm font-mono text-muted-foreground w-10 tabular-nums text-right">
                  <CountUp end={p.percent} startOnView duration={1000} />%
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground/80 mt-3">
            Without a shared evidence base, the investment decision stays under-informed.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {[
          { icon: Layers, text: "Fragmented evidence" },
          { icon: DollarSign, text: "Unvalidated assumptions" },
          { icon: Calendar, text: "Hidden cross-discipline risk" },
          { icon: Clock, text: "Months before clarity" },
        ].map((item) => (
          <div key={item.text} className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card">
            <item.icon className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground text-center">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const costStats = [
  {
    icon: DollarSign,
    value: 37,
    prefix: "$",
    suffix: "B",
    label: "Lost annually to unproductive meetings (US)",
  },
  {
    icon: DollarSign,
    value: 100,
    prefix: "$",
    suffix: "K+",
    label: "Per feasibility or strategy engagement",
  },
  {
    icon: Calendar,
    value: 71,
    suffix: "%",
    label: "Of meetings considered unproductive",
  },
  {
    icon: Clock,
    value: 60,
    suffix: "%",
    label: "Of project delays from decision latency",
  },
];

const CostSection = () => (
  <section id="cost" className="py-16 sm:py-24 md:py-32 relative z-10">
    <div className="container min-w-0">
      <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
        <SectionLabel>The cost</SectionLabel>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
          Capital waits. Options expire. Advisory spend mounts.
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 sm:mb-12">
          Delaying the proceed / restructure / walk-away call is expensive — in meetings, retainers, and lost time.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8 overflow-x-auto">
        <div className="rounded-xl border border-border bg-card p-4 md:p-6 text-muted-foreground min-w-0">
          <CostScatterAnimated />
          <p className="text-center text-xs text-muted-foreground mt-2">
            Cost of uncertainty before the investment decision (sourced)
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            The loss.
          </p>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            $37B in meeting waste. $100K+ per early evaluation. 60% of delays from slow decisions — all before a developer knows whether the project deserves further investment.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {costStats.map((stat) => (
          <div key={stat.label} className="p-5 rounded-xl border border-border bg-card text-center">
            <stat.icon className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground tabular-nums">
              <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} startOnView duration={1200} />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ToolsFailSection = () => (
  <section id="differentiation" className="py-16 sm:py-24 md:py-32 relative z-10 border-t border-border">
    <div className="container min-w-0">
      <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-10">
        <SectionLabel>Differentiation</SectionLabel>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
          Not a chatbot. Not a document tool. Not another spreadsheet.
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          Shura is the intelligence layer before investment — structured multidisciplinary evaluation with provenance. It complements consultants and advisors; it does not replace professional judgement.
        </p>
      </div>
      <div className="rounded-xl border border-border bg-card overflow-hidden max-w-3xl mx-auto mb-12">
        <video
          src={chatVideo}
          className="w-full aspect-video object-cover"
          playsInline
          muted
          loop
          autoPlay
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {[
          { tool: "ChatGPT", issue: "A single answer — no shared project evidence, no defendable model" },
          { tool: "Consultants", issue: "Essential later — slow and costly for the first pass" },
          { tool: "Spreadsheets", issue: "Powerful numbers without a multidisciplinary evidence trail" },
          { tool: "Static reports", issue: "A snapshot — not re-runnable when assumptions change" },
        ].map((item) => (
          <div key={item.tool} className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card">
            <span className="text-sm font-medium text-foreground w-28 shrink-0">{item.tool}</span>
            <span className="text-sm text-muted-foreground">{item.issue}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export { WhyNowSection, ProblemSection, CostSection, ToolsFailSection, SectionLabel };
