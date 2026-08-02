import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { CTASection, Footer } from "@/components/BottomSections";
import { SectionLabel } from "@/components/ProblemSections";
import { CountUp } from "@/components/CountUp";
import PilotEnquiryModal from "@/components/PilotEnquiryModal";

const portfolioStats = [
  { end: 79.1, decimals: 1, suffix: " MW", label: "Total capacity" },
  { end: 3, decimals: 0, suffix: "", label: "Projects" },
  { end: 700, decimals: 0, suffix: "+", label: "Documents" },
];

/**
 * Three projects analysed with Shura.
 * Set `deckUrl` to a PDF / Google Slides / Drive link when ready.
 * `image` paths are sample placeholders in /public/portfolio.
 */
const pilots = [
  {
    number: "01",
    sector: "Small hydro",
    title: "Multi-site small hydro programme",
    capacity: "29.1 MW",
    stage: "Ongoing",
    image: "/portfolio/small-hydro.png",
    imageAlt: "Sample aerial view of a hydroelectric dam (placeholder imagery)",
    summary:
      "Multi-site small hydro programme with a full diligence data room: 700+ documents across feasibility, hydrology, drawings, and a FiT-style financial workbook.",
    challenge:
      "Evaluate a multi-site small hydro programme before further capital commitment, with evidence spread across technical, hydrology, and financial workstreams.",
    approach:
      "Ingested a full diligence data room of 700+ documents (feasibility studies, hydrology, engineering drawings, and a FiT-style financial workbook) and ran cross-discipline analysis through Shura.",
    outcome:
      "Ongoing. Actively working with the company on an evidence-backed assessment. Provided a pre-evaluation document, financial model, and technical due diligence with decision analysis; the financial model remains under active review as new diligence materials arrive.",
    disciplines: ["Engineering", "Finance", "Business Dev", "Legal", "Tax"],
    deckUrl: null as string | null,
    deckLabel: "29.1 MW small hydro slide deck",
  },
  {
    number: "02",
    sector: "Hydro",
    title: "Single-scheme hydro project",
    capacity: "11 MW",
    stage: "Ongoing",
    image: "/portfolio/hydro.png",
    imageAlt: "Sample view of a hydroelectric dam in a forested valley (placeholder imagery)",
    summary:
      "Smaller single-scheme hydro: specialist-panel evaluation and preliminary project assessment grounded in the uploaded evidence.",
    challenge:
      "Pressure-test viability of a smaller single-scheme hydro before committing to a fuller advisory or investment process.",
    approach:
      "Loaded the project corpus into Shura and ran specialist-panel evaluation with preliminary project assessment outputs grounded in the uploaded evidence.",
    outcome:
      "Ongoing. Specialist scores and decision brief still being refined against further technical and commercial inputs.",
    disciplines: ["Engineering", "Finance", "Business Dev"],
    deckUrl: null as string | null,
    deckLabel: "11 MW hydro slide deck",
  },
  {
    number: "03",
    sector: "Solar PV",
    title: "Utility-scale PV farm",
    capacity: "39 MW",
    stage: "Ongoing",
    image: "/portfolio/solar-pv.png",
    imageAlt: "Sample aerial view of a utility-scale solar PV farm (placeholder imagery)",
    summary:
      "Utility-scale solar PV: validating returns and financing structure from an authoritative financial workbook before treating IRR/NPV as decision-ready.",
    challenge:
      "Validate project returns and financing structure from an authoritative financial workbook before treating IRR/NPV figures as decision-ready.",
    approach:
      "Mapped the financial workbook through Shura, stress-testing returns, financing assumptions, and provenance so IRR and NPV figures can be defended before capital commitment.",
    outcome:
      "Ongoing. Financial validation in progress; returns and financing structure under review against the source workbook.",
    disciplines: ["Finance", "Engineering", "Business Dev", "Tax"],
    deckUrl: null as string | null,
    deckLabel: "39 MW solar PV slide deck",
  },
];

type Pilot = (typeof pilots)[number];

const OngoingPill = ({ className = "" }: { className?: string }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md ${className}`.trim()}
  >
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
    </span>
    Ongoing
  </span>
);

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
      <div className="absolute top-3 right-3">
        <OngoingPill />
      </div>
      <div className="absolute bottom-3 left-3">
        <span className="inline-flex items-center rounded-md bg-background/85 px-2.5 py-1 text-sm font-semibold text-foreground backdrop-blur-md">
          {pilot.capacity}
        </span>
      </div>
    </div>

    <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
      <div className="flex-1 space-y-2">
        <p className="text-sm text-muted-foreground">{pilot.sector}</p>
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
  onEnquire,
}: {
  pilot: Pilot | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEnquire: () => void;
}) => {
  if (!pilot) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="portfolio-modal max-w-2xl gap-0 border-border/50 bg-card/80 p-0 overflow-hidden shadow-2xl shadow-black/50 backdrop-blur-2xl sm:rounded-2xl data-[state=open]:animate-none data-[state=closed]:animate-none">
        <div className="max-h-[85dvh] overflow-y-auto overscroll-contain">
          <div className="relative aspect-[16/10] max-h-[30vh] sm:max-h-none sm:aspect-[16/9] overflow-hidden">
            <img
              src={pilot.image}
              alt={pilot.imageAlt}
              className="portfolio-modal-image absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/35 to-transparent" />
            <div className="absolute top-4 left-5">
              <OngoingPill />
            </div>
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

            <div className="border-t border-border pt-6">
              <Button
                variant="hero"
                size="xl"
                type="button"
                className="w-full touch-manipulation min-h-[48px]"
                onClick={onEnquire}
              >
                Sign up for the pilot <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Portfolio = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState<Pilot | null>(null);
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupProject, setSignupProject] = useState("");

  const openSignup = (project = "") => {
    setActive(null);
    setSignupProject(project);
    setSignupOpen(true);
  };

  // Nav / hero "Sign up for the pilot" → /portfolio#signup opens the modal
  useEffect(() => {
    if (hash === "#signup" || hash === "#cta") {
      setActive(null);
      setSignupProject("");
      setSignupOpen(true);
    }
  }, [hash]);

  const handleSignupOpenChange = (open: boolean) => {
    setSignupOpen(open);
    if (!open && (hash === "#signup" || hash === "#cta")) {
      navigate("/portfolio", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <GradientBlobs />
      <Navbar />

      <div className="relative z-10">
        <section className="pt-28 sm:pt-32 pb-12 sm:pb-16">
          <div className="container max-w-6xl">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto text-center">
                <SectionLabel>Portfolio</SectionLabel>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8">
                  Projects analysed
                </h1>
                <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-12 mb-8 sm:mb-10">
                  {portfolioStats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center gap-1">
                      <CountUp
                        end={stat.end}
                        decimals={stat.decimals}
                        suffix={stat.suffix}
                        duration={1400}
                        startOnView
                        className="text-2xl sm:text-3xl font-semibold text-foreground tabular-nums tracking-tight"
                      />
                      <span className="text-xs sm:text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground tracking-tight leading-snug mb-4">
                  Not in months. Not in weeks.{" "}
                  <span className="text-primary">In a few days.</span>
                </p>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  Run decision diligence on your next energy project with Shura, and become
                  one of our next pilot customers.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-8 sm:pb-12">
          <div className="container max-w-6xl">
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
                {pilots.map((pilot) => (
                  <PilotCard key={pilot.number} pilot={pilot} onOpen={() => setActive(pilot)} />
                ))}
              </div>
            </ScrollReveal>

            <p className="pt-8 text-sm text-muted-foreground/80 leading-relaxed max-w-xl mx-auto text-center">
              Client details withheld. Imagery is sample photography, not project sites.
            </p>
          </div>
        </section>

        <section className="pb-4 sm:pb-6">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <div className="text-center px-2">
                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                  We&apos;re currently selecting{" "}
                  <span className="text-primary font-medium">the first few pilot partners</span>{" "}
                  to evaluate Shura on real energy infrastructure projects. Partners receive early
                  access to the platform, dedicated one-to-one support throughout the
                  evaluation, and the opportunity to shape future product development through
                  direct feedback.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <ScrollReveal>
          <CTASection onOpenSignup={() => openSignup()} />
        </ScrollReveal>

        <Footer />
      </div>

      <PilotModal
        pilot={active}
        open={!!active}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
        onEnquire={() =>
          openSignup(active ? `${active.capacity} ${active.title}` : "")
        }
      />

      <PilotEnquiryModal
        open={signupOpen}
        onOpenChange={handleSignupOpenChange}
        defaultProject={signupProject}
      />
    </div>
  );
};

export default Portfolio;
