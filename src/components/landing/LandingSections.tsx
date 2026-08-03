import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import KnowledgeMapPreview from "@/components/gen/KnowledgeMapPreview";

const Label = ({ children }: { children: ReactNode }) => (
  <p className="landing-label">{children}</p>
);

const Section = ({
  id,
  children,
  className = "",
  tone = "dark",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) => (
  <section
    id={id}
    className={`py-20 sm:py-28 md:py-32 ${tone === "light" ? "landing-band-light" : "landing-band-dark"} ${className}`}
  >
    <div className="container">{children}</div>
  </section>
);

/* ——— Problem ——— */
export const ProblemSection = () => (
  <Section id="problem" tone="light">
    <div className="max-w-3xl">
      <Label>Problem</Label>
      <h2 className="font-display font-semibold tracking-[-0.03em] text-3xl sm:text-4xl md:text-[2.75rem] leading-tight text-foreground text-balance">
        Capital commits before the evidence is clear.
      </h2>
      <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
        Engineering studies, financial models, environmental constraints and contracts sit in
        separate rooms. Teams spend months and six figures reconstructing a shared view of
        risk, often after the decision window has narrowed.
      </p>
    </div>

    <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden max-w-4xl">
      {[
        { title: "Fragmented evidence", body: "Diligence lives across folders, advisers and inboxes." },
        { title: "No institutional memory", body: "Each project restarts from zero. Prior context walks out." },
        { title: "Slow clarity", body: "Proceed, restructure or walk away arrives too late." },
      ].map((item) => (
        <div key={item.title} className="bg-card p-6 sm:p-8">
          <h3 className="text-sm font-semibold text-foreground mb-2">{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
        </div>
      ))}
    </div>
  </Section>
);

/* ——— Solution ——— */
export const SolutionSection = () => (
  <Section id="solution" tone="dark">
    <div className="max-w-3xl">
      <Label>Solution</Label>
      <h2 className="font-display font-semibold tracking-[-0.03em] text-3xl sm:text-4xl md:text-[2.75rem] leading-tight text-foreground text-balance">
        Multidisciplinary intelligence before capital locks in.
      </h2>
      <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
        Shura turns project evidence into an explainable recommendation: proceed, restructure,
        or walk away, with provenance across engineering, finance, environment, tax and legal.
      </p>
    </div>

    <ul className="mt-14 max-w-2xl space-y-0 border border-border rounded-lg divide-y divide-border">
      {[
        "One evidence base across disciplines",
        "Defendable financial model from authoritative sources",
        "Recommendations you can take to IC and lenders",
        "Context that compounds across projects",
      ].map((line) => (
        <li key={line} className="flex items-start gap-3 px-5 sm:px-6 py-4 text-sm text-foreground">
          <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" strokeWidth={1.75} />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  </Section>
);

/* ——— Where Shura sits (Workflow) ——— */
const workflowStages: {
  n: string;
  stage: string;
  actor: string;
  shura: "—" | "Here" | "Downstream";
  highlight?: boolean;
}[] = [
  { n: "01", stage: "Originate", actor: "Developer / sponsor", shura: "—" },
  { n: "02", stage: "Assemble evidence", actor: "Data room, studies, models", shura: "—" },
  {
    n: "03",
    stage: "Pre-evaluate",
    actor: "Shura",
    shura: "Here",
    highlight: true,
  },
  {
    n: "04",
    stage: "Deep diligence",
    actor: "Consultants, lenders, counsel",
    shura: "Downstream",
  },
  { n: "05", stage: "Commit", actor: "IC / board / capital", shura: "Downstream" },
];

export const WorkflowSection = () => (
  <Section id="workflow" tone="light">
    <div className="max-w-3xl">
      <Label>Workflow</Label>
      <h2 className="font-display font-semibold tracking-[-0.03em] text-3xl sm:text-4xl md:text-[2.75rem] leading-tight text-foreground text-balance">
        After the data room. Before capital and advisors lock in.
      </h2>
      <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
        Shura sits in the early diligence window - when evidence exists, but before a full consulting
        engagement, IC pack, or financing path is locked in.
      </p>
    </div>

    <div className="mt-12 overflow-x-auto">
      <ol className="grid grid-cols-1 sm:grid-cols-5 gap-px bg-border rounded-lg overflow-hidden min-w-0 sm:min-w-[40rem]">
        {workflowStages.map((step) => (
          <li
            key={step.n}
            className={`bg-card p-4 sm:p-5 flex flex-col gap-2 ${
              step.highlight ? "ring-1 ring-inset ring-primary/40 bg-primary/[0.06]" : ""
            }`}
          >
            <span className="text-[11px] font-medium text-muted-foreground tracking-widest tabular-nums">
              {step.n}
            </span>
            <h3 className="text-sm font-semibold text-foreground leading-snug">{step.stage}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{step.actor}</p>
            <p
              className={`text-xs font-medium ${
                step.highlight ? "text-primary" : "text-muted-foreground/70"
              }`}
            >
              {step.shura === "Here"
                ? "Shura · Here"
                : step.shura === "—"
                  ? "—"
                  : `Shura · ${step.shura}`}
            </p>
          </li>
        ))}
      </ol>
    </div>

    <div className="mt-6 landing-panel p-6 sm:p-7 max-w-3xl border-l-2 border-l-primary">
      <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">
        Stage 3 · Why that saves money
      </p>
      <p className="text-sm sm:text-base text-foreground leading-relaxed">
        One structured pass replaces months of reconstruction spend. Advisors and capital escalate
        only when the evidence supports it - and weak cases get killed or restructured before the
        expensive burn starts.
      </p>
    </div>

    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
      <div className="landing-panel p-5 sm:p-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Shura is for</h3>
        <ul className="space-y-2.5">
          {[
            "A first structured pass across disciplines",
            "Briefing IC, lenders or consultants with provenance attached",
          ].map((line) => (
            <li key={line} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
              <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" strokeWidth={1.75} />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="landing-panel p-5 sm:p-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Shura is not</h3>
        <ul className="space-y-2.5">
          {[
            "A substitute for licensed advice or lender diligence",
            "A late-stage closing tool once capital terms are set",
          ].map((line) => (
            <li key={line} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
              <span className="mt-2 h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);

/* ——— Outputs ——— */
type OutputPreview = {
  title: string;
  body: string;
  preview: ReactNode;
};

const PreviewShell = ({ children }: { children: ReactNode }) => (
  <div className="landing-preview">
    <div className="landing-preview-grid" aria-hidden />
    <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-center">{children}</div>
  </div>
);

const outputs: OutputPreview[] = [
  {
    title: "Investment Evaluation",
    body: "A structured proceed / restructure / walk-away assessment grounded in project evidence.",
    preview: (
      <PreviewShell>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">Recommendation</p>
        <p className="font-display font-semibold tracking-[-0.03em] text-2xl sm:text-3xl text-foreground mb-6">Restructure</p>
        <div className="space-y-2 max-w-sm">
          {["Engineering risk elevated", "Tariff path requires revision", "Grid connection contingent"].map((line) => (
            <div key={line} className="flex items-center gap-3 border-t border-border/80 pt-2">
              <span className="h-px w-4 bg-muted-foreground/50" />
              <span className="text-xs text-muted-foreground">{line}</span>
            </div>
          ))}
        </div>
      </PreviewShell>
    ),
  },
  {
    title: "Financial Model",
    body: "A defendable model built from authoritative sources, ready for investor scrutiny.",
    preview: (
      <PreviewShell>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          {[
            { k: "IRR", v: "11.4%" },
            { k: "NPV", v: "£42m" },
            { k: "DSCR", v: "1.28x" },
          ].map((m) => (
            <div key={m.k} className="border border-border rounded-md px-3 py-3">
              <p className="text-[10px] text-muted-foreground mb-1">{m.k}</p>
              <p className="font-display font-semibold tracking-[-0.03em] text-lg sm:text-xl text-foreground tabular-nums">{m.v}</p>
            </div>
          ))}
        </div>
        <div className="h-16 sm:h-20 border border-border rounded-md flex items-end gap-1 px-3 pb-2">
          {[40, 55, 48, 62, 58, 70, 66, 78, 74, 82].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/35 rounded-sm"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </PreviewShell>
    ),
  },
  {
    title: "Engineering Assessment",
    body: "Technical viability, constraints and risks scored against the data room.",
    preview: (
      <PreviewShell>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-5">Discipline scores</p>
        {[
          { k: "Civil & structural", v: 72 },
          { k: "Electromechanical", v: 81 },
          { k: "Hydrology", v: 64 },
        ].map((row) => (
          <div key={row.k} className="mb-4 last:mb-0">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">{row.k}</span>
              <span className="text-foreground tabular-nums">{row.v}</span>
            </div>
            <div className="h-px bg-border overflow-hidden">
              <div className="h-full bg-primary/70" style={{ width: `${row.v}%` }} />
            </div>
          </div>
        ))}
      </PreviewShell>
    ),
  },
  {
    title: "Site Assessment",
    body: "Location, grid and site-level factors that shape deliverability.",
    preview: (
      <PreviewShell>
        <div className="border border-border rounded-md overflow-hidden">
          <div className="aspect-[16/9] bg-muted/40 relative">
            <div className="absolute inset-6 border border-dashed border-border/80 rounded-sm" />
            <div className="absolute left-[28%] top-[34%] h-2 w-2 rounded-full bg-foreground/70" />
            <div className="absolute left-[52%] top-[48%] h-2 w-2 rounded-full bg-foreground/40" />
            <div className="absolute left-[40%] top-[58%] h-px w-16 bg-foreground/30 rotate-12 origin-left" />
          </div>
          <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
            {["Grid", "Access", "Env."].map((k) => (
              <div key={k} className="px-3 py-2.5 text-center">
                <p className="text-[10px] text-muted-foreground">{k}</p>
                <p className="text-xs text-foreground mt-0.5">Review</p>
              </div>
            ))}
          </div>
        </div>
      </PreviewShell>
    ),
  },
  {
    title: "Evidence Intelligence",
    body: "Every claim traced to source documents. Interrogable, not asserted.",
    preview: (
      <PreviewShell>
        <div className="space-y-3 max-w-md">
          {[
            { claim: "P50 generation 118 GWh", src: "Hydrology_Report_v3.pdf · p.24" },
            { claim: "Capex £61.2m", src: "Financial_Model_Base.xlsx · Capex" },
            { claim: "Grid offer Q3 2027", src: "DNO_Connection_Letter.pdf" },
          ].map((row) => (
            <div key={row.claim} className="border border-border rounded-md px-4 py-3">
              <p className="text-sm text-foreground mb-1">{row.claim}</p>
              <p className="text-[11px] text-muted-foreground font-mono">{row.src}</p>
            </div>
          ))}
        </div>
      </PreviewShell>
    ),
  },
];

export const OutputsSection = () => (
  <Section id="outputs" tone="light">
    <div className="max-w-3xl mb-14 sm:mb-16">
      <Label>Outputs</Label>
      <h2 className="font-display font-semibold tracking-[-0.03em] text-3xl sm:text-4xl md:text-[2.75rem] leading-tight text-foreground text-balance">
        What you receive.
      </h2>
      <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
        Institutional deliverables. One message per output. Built for investment committees.
      </p>
    </div>

    <div className="flex flex-col gap-20 sm:gap-28">
      {outputs.map((item, i) => (
        <article key={item.title} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
            <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-3">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display font-semibold tracking-[-0.03em] text-2xl sm:text-3xl text-foreground mb-4">
              {item.title}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
              {item.body}
            </p>
          </div>
          <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>{item.preview}</div>
        </article>
      ))}
    </div>
  </Section>
);

/* ——— How it works ——— */
export const HowItWorksSection = () => (
  <Section id="how-it-works" tone="dark">
    <div className="max-w-3xl mb-14">
      <Label>How it works</Label>
      <h2 className="font-display font-semibold tracking-[-0.03em] text-3xl sm:text-4xl md:text-[2.75rem] leading-tight text-foreground text-balance">
        From data room to decision.
      </h2>
    </div>

    <ol className="max-w-3xl border-t border-border">
      {[
        {
          n: "01",
          title: "Ingest the project",
          body: "Bring the evidence that would otherwise sit across folders and advisers.",
        },
        {
          n: "02",
          title: "Evaluate across disciplines",
          body: "Engineering, finance, environment, tax and legal on one shared evidence base.",
        },
        {
          n: "03",
          title: "Stress-test viability",
          body: "Validate assumptions. Surface trade-offs. Produce a model you can defend.",
        },
        {
          n: "04",
          title: "Decide, and retain context",
          body: "Proceed, restructure or walk away. The next project starts smarter.",
        },
      ].map((step) => (
        <li
          key={step.n}
          className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr] gap-4 sm:gap-8 py-8 border-b border-border"
        >
          <span className="text-sm font-medium text-muted-foreground tabular-nums pt-1">{step.n}</span>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  </Section>
);

/* ——— Case studies ——— */
export const CaseStudiesSection = () => (
  <Section id="cases" tone="light">
    <div className="max-w-3xl mb-12">
      <Label>Case Studies</Label>
      <h2 className="font-display font-semibold tracking-[-0.03em] text-3xl sm:text-4xl md:text-[2.75rem] leading-tight text-foreground text-balance">
        Projects analysed.
      </h2>
      <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-2xl">
        Hydro and solar programmes evaluated through Shura. Multidisciplinary diligence in days,
        not months.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { capacity: "29.1 MW", title: "Multi-site small hydro", sector: "Hydroelectric power station" },
        { capacity: "11 MW", title: "Single-scheme hydro", sector: "Hydroelectric power station" },
        { capacity: "39 MW", title: "Utility-scale solar PV", sector: "Solar farm" },
      ].map((p) => (
        <Link
          key={p.title}
          to="/portfolio"
          className="landing-panel group p-6 sm:p-7 transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <p className="text-xs text-muted-foreground mb-6">{p.sector}</p>
          <p className="font-display font-semibold tracking-[-0.03em] text-2xl text-foreground mb-2">{p.capacity}</p>
          <p className="text-sm text-muted-foreground mb-8">{p.title}</p>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground group-hover:gap-1.5 transition-all">
            View case <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      ))}
    </div>
  </Section>
);

/* ——— Technology ——— */
export const TechnologySection = () => (
  <Section id="technology" tone="dark">
    <div className="max-w-3xl">
      <Label>Technology</Label>
      <h2 className="font-display font-semibold tracking-[-0.03em] text-3xl sm:text-4xl md:text-[2.75rem] leading-tight text-foreground text-balance">
        Built for provenance, not prompt theatre.
      </h2>
      <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
        Organised as a single project hub with a flat document evidence cloud, capital-commitment
        decisions at the centre, specialists evaluating those decisions, dense cite links into the
        corpus, and derived diligence reports. It complements consultants and lenders. It does not
        replace professional judgement.
      </p>
    </div>

    <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-start max-w-5xl">
      <div>
        <p className="landing-label mb-2">Knowledge map</p>
        <h3 className="text-base font-semibold text-foreground mb-1">Hub-and-spoke, not a folder tree</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-1 max-w-xl">
          Every file hangs directly off the project. Decisions cite the evidence cloud; a specialist
          ring scores those decisions; reports derive from the same spine.
        </p>
        <KnowledgeMapPreview />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {[
          {
            title: "Evidence graph",
            body: "Flat data-room leaves under one hub, linked by cite and derive edges - not siloed folders.",
          },
          {
            title: "Specialist evaluation",
            body: "Disciplines sit beside the proceed decisions and score a shared corpus with explainable outputs.",
          },
          {
            title: "Financial integrity",
            body: "Models derived from source workbooks. Numbers you can defend.",
          },
          {
            title: "Compounding memory",
            body: "Prior project context retained so the next evaluation starts ahead.",
          },
        ].map((item) => (
          <div key={item.title} className="landing-panel p-6">
            <h3 className="text-sm font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

/* ——— Company ——— */
export const CompanySection = () => (
  <Section id="company" tone="light">
    <div className="max-w-3xl">
      <Label>Company</Label>
      <h2 className="font-display font-semibold tracking-[-0.03em] text-3xl sm:text-4xl md:text-[2.75rem] leading-tight text-foreground text-balance">
        Built for organisations that greenlight energy capital.
      </h2>
      <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
        Shura serves energy developers, sponsors, investors and advisers who need a clear answer
        before capital and advisory spend lock in.
      </p>
    </div>
  </Section>
);

/* ——— Pilot ——— */
type PilotSectionProps = {
  onOpenSignup?: () => void;
};

export const PilotSection = ({ onOpenSignup }: PilotSectionProps) => (
  <Section id="pilot" tone="dark">
    <div className="max-w-2xl mx-auto text-center">
      <Label>Pilot Programme</Label>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight tracking-[-0.03em] text-foreground text-balance">
        Evaluate Shura on a real project.
      </h2>
      <p className="mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
        We are selecting the first few pilot partners. Partners receive early access, dedicated
        support throughout the evaluation, and a direct path to shape the product.
      </p>
      <div className="mt-10">
        <Button
          type="button"
          variant="hero"
          size="lg"
          className="min-h-[48px] rounded-full px-8 w-full sm:w-auto"
          onClick={onOpenSignup}
        >
          Apply for Pilot Programme
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        We will respond with documentation and next steps.
      </p>
    </div>
  </Section>
);

/* ——— FAQ ——— */
const faqs = [
  {
    q: "Does Shura replace consultants?",
    a: "No. Shura compresses the first diligence pass and makes numbers traceable. It complements professional judgement; it does not replace it.",
  },
  {
    q: "What project types do you support?",
    a: "Renewable energy infrastructure, including hydro and solar programmes, with multidisciplinary evidence rooms.",
  },
  {
    q: "How long does an evaluation take?",
    a: "Pilot partners typically reach a structured first-pass view in days, not months, depending on data-room readiness.",
  },
  {
    q: "Who is the pilot programme for?",
    a: "Energy developers and sponsors preparing a proceed / restructure / walk-away decision before further capital or advisory commitment.",
  },
  {
    q: "How is evidence handled?",
    a: "Recommendations are grounded in uploaded project evidence with provenance. Claims can be traced back to source material.",
  },
];

export const FAQSection = () => (
  <Section id="faq" tone="light">
    <div className="max-w-3xl mx-auto">
      <Label>FAQ</Label>
      <h2 className="font-display font-semibold tracking-[-0.03em] text-3xl sm:text-4xl leading-tight text-foreground mb-10">
        Questions.
      </h2>
      <Accordion type="single" collapsible className="border-t border-border">
        {faqs.map((item) => (
          <AccordionItem key={item.q} value={item.q} className="border-border">
            <AccordionTrigger className="text-left text-sm sm:text-base font-medium text-foreground hover:no-underline py-5">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </Section>
);

/* ——— Footer ——— */
export const Footer = () => (
  <footer className="landing-band-dark py-12 sm:py-16">
    <div className="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
      <div>
        <div className="flex items-center gap-2.5 mb-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary text-primary-foreground text-[10px] font-semibold">
            S
          </span>
          <span className="text-sm font-semibold text-foreground">Shura</span>
        </div>
        <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
          Decision intelligence for energy infrastructure.
        </p>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted-foreground">
        <a href="#solution" className="hover:text-foreground transition-colors">Product</a>
        <Link to="/portfolio" className="hover:text-foreground transition-colors">Case Studies</Link>
        <a href="#technology" className="hover:text-foreground transition-colors">Technology</a>
        <a href="#pilot" className="hover:text-foreground transition-colors">Pilot</a>
      </div>
    </div>
  </footer>
);
