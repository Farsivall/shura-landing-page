import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Presentation } from "lucide-react";
import Navbar from "@/components/Navbar";
import GradientBlobs from "@/components/GradientBlobs";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Footer } from "@/components/BottomSections";

/**
 * Three projects analysed with Shura.
 * Set `deckUrl` to a PDF / Google Slides / Drive link when ready.
 * `image` paths are sample placeholders in /public/portfolio.
 */
const pilots = [
  {
    number: "01",
    sector: "Small hydro",
    title: "Multi-site run-of-river programme",
    capacity: "29.1 MW",
    stage: "Full diligence",
    image: "/portfolio/small-hydro.png",
    imageAlt: "Sample aerial view of a hydroelectric dam — placeholder imagery",
    summary:
      "Multi-site run-of-river programme with a full diligence data room — feasibility, hydrology, drawings, and a FiT-style financial workbook.",
    challenge:
      "Evaluate a multi-site small hydro programme before further capital commitment, with evidence spread across technical, hydrology, and financial workstreams.",
    approach:
      "Ingested a full diligence data room — feasibility studies, hydrology, engineering drawings, and a FiT-style financial workbook — and ran cross-discipline analysis through Shura.",
    outcome:
      "Produced an evidence-backed project assessment with provenance from the data room into a clear decision brief for the programme.",
    disciplines: ["Engineering", "Finance", "Business Dev", "Legal", "Tax"],
    deckUrl: null as string | null,
    deckLabel: "29.1 MW small hydro — slide deck",
  },
  {
    number: "02",
    sector: "Hydro",
    title: "Single-scheme hydro project",
    capacity: "11 MW",
    stage: "Preliminary assessment",
    image: "/portfolio/hydro.png",
    imageAlt: "Sample view of a hydroelectric dam in a forested valley — placeholder imagery",
    summary:
      "Single-scheme hydro used for specialist evaluation and preliminary project assessment runs.",
    challenge:
      "Run a focused preliminary assessment on a smaller single-scheme hydro asset to stress-test specialist evaluation workflows.",
    approach:
      "Applied Shura specialist evaluation across engineering and commercial inputs for an early-stage project assessment, with a lighter data room than the multi-site programme.",
    outcome:
      "Delivered a preliminary project assessment suitable for early go / no-go framing and specialist review.",
    disciplines: ["Engineering", "Finance", "Business Dev"],
    deckUrl: null as string | null,
    deckLabel: "11 MW hydro — slide deck",
  },
  {
    number: "03",
    sector: "Solar PV",
    title: "Utility-scale PV farm",
    capacity: "39 MW",
    stage: "Project analysis",
    image: "/portfolio/solar-pv.png",
    imageAlt: "Sample aerial view of a utility-scale solar PV farm — placeholder imagery",
    summary:
      "Utility-scale solar PV farm analysed for development and investment readiness.",
    challenge:
      "Assess whether a 39 MW utility-scale solar PV farm warranted further development and capital commitment.",
    approach:
      "Ran decision diligence across engineering, offtake / commercial, and financial evidence to evaluate project viability before capital was committed.",
    outcome:
      "Produced a structured analysis of the solar PV farm with clear findings for the development decision path.",
    disciplines: ["Engineering", "Finance", "Business Dev", "Tax"],
    deckUrl: null as string | null,
    deckLabel: "39 MW solar PV — slide deck",
  },
];

type Pilot = (typeof pilots)[number];

const DeckPlaceholder = ({ pilot }: { pilot: Pilot }) => {
  const inner = (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-muted/80 via-background to-muted/40" />
      <div className="absolute inset-x-4 top-3 h-px bg-border/80" />
      <div className="absolute left-4 top-5 space-y-1.5 w-[40%]">
        <div className="h-1.5 w-3/4 rounded-sm bg-foreground/15" />
        <div className="h-1.5 w-full rounded-sm bg-foreground/10" />
        <div className="h-1.5 w-2/3 rounded-sm bg-foreground/10" />
      </div>
      <div className="absolute right-4 top-5 bottom-4 w-[36%] rounded-sm border border-border/60 bg-primary/5" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-background/55 backdrop-blur-[1px] px-3 text-center">
        <Presentation className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-foreground">{pilot.deckLabel}</span>
        <span className="text-xs text-muted-foreground">
          {pilot.deckUrl ? "Open slide deck" : "Link coming soon"}
        </span>
      </div>
    </>
  );

  const className =
    "relative block aspect-[16/9] w-full overflow-hidden rounded-lg border border-dashed border-border bg-muted/20 transition-colors";

  if (pilot.deckUrl) {
    return (
      <a
        href={pilot.deckUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className={className} aria-label={`${pilot.deckLabel} placeholder`}>
      {inner}
    </div>
  );
};

const PilotCard = ({ pilot, onOpen }: { pilot: Pilot; onOpen: () => void }) => (
  <button
    type="button"
    onClick={onOpen}
    className="group flex h-full w-full flex-col items-stretch overflow-hidden rounded-xl border text-left shadow-sm transition-all duration-300 hover:border-primary/35 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    style={{ background: "var(--app-card)", borderColor: "var(--app-border)" }}
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <img
        src={pilot.image}
        alt={pilot.imageAlt}
        className="h-full w-full object-cover scale-105 blur-[2px] transition-all duration-500 ease-out group-hover:scale-100 group-hover:blur-0"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent" />
      <div className="absolute bottom-3 left-3">
        <span className="inline-flex items-center rounded-md bg-background/85 px-2.5 py-1 text-sm font-semibold text-foreground backdrop-blur-md">
          {pilot.capacity}
        </span>
      </div>
    </div>

    <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
      <div className="flex-1 space-y-2">
        <p className="text-sm text-muted-foreground">
          {pilot.sector}
          <span className="mx-2 text-border">·</span>
          {pilot.stage}
        </p>
        <h2 className="text-xl font-semibold text-foreground tracking-tight leading-snug">
          {pilot.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {pilot.summary}
        </p>
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-primary">
        <span>View case</span>
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </div>
  </button>
);

const DetailBlock = ({ title, body }: { title: string; body: string }) => (
  <div className="space-y-2">
    <h3 className="text-base font-semibold text-foreground">{title}</h3>
    <p className="text-base text-muted-foreground leading-relaxed">{body}</p>
  </div>
);

const PilotModal = ({
  pilot,
  open,
  onOpenChange,
}: {
  pilot: Pilot | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  if (!pilot) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="portfolio-modal max-w-2xl gap-0 border-border/50 bg-card/80 p-0 overflow-hidden shadow-2xl shadow-black/50 backdrop-blur-2xl sm:rounded-2xl data-[state=open]:animate-none data-[state=closed]:animate-none">
        <div className="max-h-[min(88vh,780px)] overflow-y-auto">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={pilot.image}
              alt={pilot.imageAlt}
              className="portfolio-modal-image absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/35 to-transparent" />
            <div className="absolute bottom-4 left-5 right-14 flex items-end justify-between gap-3">
              <span className="rounded-md bg-background/85 px-2.5 py-1 text-sm font-semibold text-foreground backdrop-blur-md">
                {pilot.capacity}
              </span>
              <span className="text-xs text-white/65">Sample image</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            <DialogHeader className="space-y-3 text-left">
              <DialogDescription className="text-sm text-muted-foreground">
                {pilot.sector}
                <span className="mx-2 text-border">·</span>
                {pilot.stage}
              </DialogDescription>
              <DialogTitle className="text-2xl sm:text-[1.75rem] font-semibold tracking-tight leading-snug">
                {pilot.title}
              </DialogTitle>
              <p className="text-base text-muted-foreground leading-relaxed pt-1">
                {pilot.summary}
              </p>
            </DialogHeader>

            <div className="space-y-6 border-t border-border pt-6">
              <DetailBlock title="Challenge" body={pilot.challenge} />
              <DetailBlock title="Approach" body={pilot.approach} />
              <DetailBlock title="Outcome" body={pilot.outcome} />
            </div>

            <div className="space-y-2 border-t border-border pt-6">
              <h3 className="text-base font-semibold text-foreground">Disciplines</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {pilot.disciplines.join(" · ")}
              </p>
            </div>

            <div className="space-y-3 border-t border-border pt-6">
              <h3 className="text-base font-semibold text-foreground">Slide deck</h3>
              <DeckPlaceholder pilot={pilot} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Portfolio = () => {
  const [active, setActive] = useState<Pilot | null>(null);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <GradientBlobs />
      <Navbar />

      <div className="relative z-10">
        <section className="pt-28 sm:pt-32 pb-10 sm:pb-14">
          <div className="container max-w-6xl">
            <ScrollReveal>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4 max-w-2xl">
                Projects analysed
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                Small hydro, hydro, and utility-scale solar — projects where Shura ran decision
                diligence before capital was committed.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-10 sm:pb-14">
          <div className="container max-w-6xl">
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
                {pilots.map((pilot) => (
                  <PilotCard key={pilot.number} pilot={pilot} onOpen={() => setActive(pilot)} />
                ))}
              </div>
            </ScrollReveal>

            <p className="pt-8 text-sm text-muted-foreground/80 leading-relaxed max-w-xl">
              Client details withheld. Imagery is sample photography, not project sites.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24 border-t border-border">
          <ScrollReveal>
            <div className="container max-w-6xl text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">
                Enquire for a fuller technical report
              </h2>
              <p className="text-muted-foreground text-base max-w-lg mx-auto mb-8 leading-relaxed">
                These summaries are high-level. Request a fuller technical report on any of
                the analysed projects — or ask us to run the same diligence on yours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button variant="hero" size="xl" asChild className="touch-manipulation min-h-[48px]">
                  <Link to="/#cta">
                    Enquire for report <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild className="touch-manipulation min-h-[48px]">
                  <Link to="/">Back to home</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <Footer />
      </div>

      <PilotModal
        pilot={active}
        open={!!active}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      />
    </div>
  );
};

export default Portfolio;
