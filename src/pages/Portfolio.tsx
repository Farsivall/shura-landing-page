import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
  Presentation,
  Network,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Footer, PilotSection } from "@/components/landing/LandingSections";
import { CountUp } from "@/components/CountUp";
import PilotEnquiryModal from "@/components/PilotEnquiryModal";
import SampleKnowledgeMap from "@/components/SampleKnowledgeMap";

const portfolioStats = [
  { end: 79.1, decimals: 1, suffix: " MW", label: "Capacity" },
  { end: 3, decimals: 0, suffix: "", label: "Projects" },
  { end: 800, decimals: 0, suffix: "+", label: "Documents" },
];

const pilots = [
  {
    number: "01",
    sector: "Hydroelectric power station",
    title: "Multi-site small hydro programme",
    capacity: "29.1 MW",
    image: "/portfolio/small-hydro.png",
    imageAlt: "Sample aerial view of a hydroelectric dam",
    imagePosition: "center 45%",
    summary:
      "Sample hub-and-spoke map: 500 flat documents under one project hub, two proceed runs, five specialists, dense cite links, and a stack of derived diligence reports.",
    challenge:
      "Evaluate a multi-site small hydro programme before further capital commitment, with evidence spread across technical, hydrology, and financial workstreams.",
    approach:
      "Ingested the data room as a flat evidence cloud and ran cross-discipline analysis through Shura across engineering, finance, commercial, legal and tax.",
    outcome:
      "Ongoing. Pre-evaluation, financial model and technical diligence delivered; model under active review as new materials arrive.",
    disciplines: ["Engineering", "Finance", "Commercial", "Legal", "Tax"],
    deckLabel: "29.1 MW small hydro slide deck",
    article: {
      eyebrow: "Decision brief",
      title: "One data room, one proceed call",
      columns: [
        {
          heading: "The ask",
          body: "Volume was not the problem. The question was which evidence actually moved proceed / restructure once every discipline read the same corpus.",
        },
        {
          heading: "The read",
          body: "Grid timing, hydrology and land gaps now sit beside the returns case. Pre-evaluation is open as new materials arrive.",
        },
      ],
    },
  },
  {
    number: "02",
    sector: "Hydroelectric power station",
    title: "Single-scheme hydro project",
    capacity: "11 MW",
    image: "/portfolio/hydro.png",
    imageAlt: "Sample view of a hydroelectric dam in a forested valley",
    imagePosition: "center 35%",
    summary:
      "Sample map with 200 flat documents under the project hub, two proceed runs, specialist scoring, and derived PPE / site-risk reports.",
    challenge:
      "Pressure-test viability of a smaller single-scheme hydro before a fuller advisory or investment process.",
    approach:
      "Loaded the project corpus into Shura and ran specialist-panel evaluation with preliminary assessment outputs.",
    outcome:
      "Ongoing. Specialist scores and decision brief still being refined against further technical and commercial inputs.",
    disciplines: ["Engineering", "Finance", "Commercial"],
    deckLabel: "11 MW hydro slide deck",
    article: {
      eyebrow: "Decision brief",
      title: "A short viability pass before the process gets expensive",
      columns: [
        {
          heading: "The ask",
          body: "Capex, grid and offtake each had to stand alone. The brief was whether enough coherence existed to justify a fuller advisory process.",
        },
        {
          heading: "The read",
          body: "Engineering is middling, offtake is soft, and the open gates stay tied to one proceed node rather than separate slide decks.",
        },
      ],
    },
  },
  {
    number: "03",
    sector: "Solar farm",
    title: "Utility-scale PV farm",
    capacity: "39 MW",
    image: "/portfolio/solar-pv.png",
    imageAlt: "Sample aerial view of a utility-scale solar PV farm",
    imagePosition: "center 50%",
    summary:
      "Sample map with 100 flat documents, two proceed runs at the centre, finance and tax on the specialist ring, and derived diligence reports.",
    challenge:
      "Validate project returns and financing structure before treating IRR/NPV figures as decision-ready.",
    approach:
      "Mapped the financial workbook through Shura, stress-testing returns, financing assumptions and provenance.",
    outcome:
      "Ongoing. Financial validation in progress; returns and financing structure under review against the source workbook.",
    disciplines: ["Finance", "Engineering", "Commercial", "Tax"],
    deckLabel: "39 MW solar PV slide deck",
    article: {
      eyebrow: "Decision brief",
      title: "Authoritative workbook, returns still under review",
      columns: [
        {
          heading: "The ask",
          body: "The model was already the source of truth. The job was whether IRR and NPV could leave the workbook and enter a decision.",
        },
        {
          heading: "The read",
          body: "Sensitivities, lender terms and offtake still move the bridge. Figures stay labelled under review until that package converges.",
        },
      ],
    },
  },
];

type Pilot = (typeof pilots)[number];
type FolderFile = "slides" | "summary" | "map";

const FILES: { id: FolderFile; label: string; icon: typeof FileText }[] = [
  { id: "slides", label: "Slides document", icon: Presentation },
  { id: "summary", label: "Project summary", icon: FileText },
  { id: "map", label: "Knowledge map", icon: Network },
];

const Portfolio = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [openFolder, setOpenFolder] = useState<string | null>(pilots[0]?.number ?? null);
  const [activeFile, setActiveFile] = useState<FolderFile>("summary");
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupProject, setSignupProject] = useState("");

  const active = pilots.find((p) => p.number === openFolder) ?? null;

  const openSignup = (project = "") => {
    setSignupProject(project);
    setSignupOpen(true);
  };

  useEffect(() => {
    if (hash === "#signup" || hash === "#cta") {
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

  const toggleFolder = (number: string) => {
    if (openFolder === number) {
      setOpenFolder(null);
      return;
    }
    setOpenFolder(number);
    setActiveFile("summary");
  };

  return (
    <div className="landing-shell min-h-screen">
      <div className="landing-canvas page-enter">
        <Navbar />

        <section className="landing-band-dark pt-16 sm:pt-20 pb-14 sm:pb-16">
          <div className="container">
            <ScrollReveal>
              <div className="cases-hero">
                <div className="cases-hero-copy">
                  <p className="landing-label">Case Studies</p>
                  <h1 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-semibold tracking-[-0.03em] text-foreground text-balance">
                    Projects analysed.
                  </h1>
                  <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-xl">
                    Open a project folder for slides, summary, decision brief and a sample interactive
                    knowledge map. Client details withheld.
                  </p>

                  <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
                    {portfolioStats.map((stat) => (
                      <div key={stat.label} className="flex flex-col gap-1 min-w-[5rem]">
                        <CountUp
                          end={stat.end}
                          decimals={stat.decimals}
                          suffix={stat.suffix}
                          duration={1400}
                          startOnView
                          className="font-display text-2xl sm:text-3xl font-semibold text-foreground tabular-nums tracking-[-0.03em]"
                        />
                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cases-hero-photos" aria-label="Energy systems analysed">
                  {pilots.map((pilot, i) => (
                    <figure
                      key={pilot.number}
                      className={`cases-hero-photo cases-hero-photo-${i + 1}`}
                    >
                      <img
                        src={pilot.image}
                        alt={pilot.imageAlt}
                        style={{ objectPosition: pilot.imagePosition }}
                        loading="eager"
                      />
                      <figcaption>
                        <span>{pilot.capacity}</span>
                        <span>Sample image</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="landing-band-dark border-t border-border pb-20 sm:pb-24">
          <div className="container pt-10 sm:pt-12">
            <ScrollReveal>
              <div className="project-folders">
                {pilots.map((pilot) => {
                  const open = openFolder === pilot.number;
                  return (
                    <div
                      key={pilot.number}
                      className={`project-folder ${open ? "project-folder-open" : ""}`}
                    >
                      <button
                        type="button"
                        className="project-folder-head"
                        onClick={() => toggleFolder(pilot.number)}
                        aria-expanded={open}
                      >
                        <span className="project-folder-icon">
                          {open ? (
                            <FolderOpen className="h-4 w-4" />
                          ) : (
                            <Folder className="h-4 w-4" />
                          )}
                        </span>
                        <span className="project-folder-num">{pilot.number}</span>
                        <span className="project-folder-cap">{pilot.capacity}</span>
                        <span className="project-folder-title">{pilot.title}</span>
                        <span className="project-folder-sector">{pilot.sector}</span>
                        <ChevronRight
                          className={`project-folder-chevron h-4 w-4 ${open ? "rotate-90" : ""}`}
                        />
                      </button>

                      {open && active && (
                        <div className="project-folder-body">
                          <aside className="project-folder-tree" aria-label="Project files">
                            <p className="project-folder-tree-label">Contents</p>
                            {FILES.map((file) => {
                              const Icon = file.icon;
                              const selected = activeFile === file.id;
                              return (
                                <button
                                  key={file.id}
                                  type="button"
                                  className={`project-folder-file ${selected ? "is-active" : ""}`}
                                  onClick={() => setActiveFile(file.id)}
                                >
                                  <Icon className="h-3.5 w-3.5" />
                                  <span>{file.label}</span>
                                </button>
                              );
                            })}
                          </aside>

                          <div className="project-folder-pane">
                            {activeFile === "slides" && (
                              <div className="project-file-view">
                                <div className="project-slides-card">
                                  <div className="project-slides-preview" aria-hidden>
                                    <div className="project-slides-lines">
                                      <span />
                                      <span />
                                      <span />
                                    </div>
                                    <div className="project-slides-panel" />
                                  </div>
                                  <div className="project-slides-meta">
                                    <Presentation className="h-4 w-4 text-primary" />
                                    <div>
                                      <p className="font-medium text-foreground">{active.deckLabel}</p>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        Slide deck link coming soon
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {activeFile === "summary" && (
                              <div className="project-file-view">
                                <div className="cases-gen-media">
                                  <img
                                    src={active.image}
                                    alt={active.imageAlt}
                                    className="cases-gen-image"
                                    style={{ objectPosition: active.imagePosition }}
                                    loading="lazy"
                                  />
                                  <div className="cases-gen-media-meta">
                                    <span className="cases-gen-media-cap">{active.capacity}</span>
                                    <span className="cases-gen-media-note">Sample image</span>
                                  </div>
                                </div>

                                <div className="project-summary-body">
                                  <div className="cases-gen-detail-head !px-0 !mt-0">
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-2">
                                        {active.sector} · {active.capacity}
                                      </p>
                                      <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-foreground">
                                        {active.title}
                                      </h2>
                                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                                        {active.summary}
                                      </p>
                                    </div>
                                    <Button
                                      type="button"
                                      variant="hero"
                                      size="sm"
                                      className="rounded-full shrink-0 h-10 px-4"
                                      onClick={() =>
                                        openSignup(`${active.capacity} ${active.title}`)
                                      }
                                    >
                                      Apply for Pilot
                                      <ArrowRight className="h-3.5 w-3.5" />
                                    </Button>
                                  </div>

                                  <div className="cases-gen-grid !px-0">
                                    <div>
                                      <h3>Challenge</h3>
                                      <p>{active.challenge}</p>
                                    </div>
                                    <div>
                                      <h3>Approach</h3>
                                      <p>{active.approach}</p>
                                    </div>
                                    <div>
                                      <h3>Outcome</h3>
                                      <p>{active.outcome}</p>
                                    </div>
                                  </div>

                                  <div className="cases-gen-disciplines !px-0">
                                    {active.disciplines.map((d) => (
                                      <span key={d}>{d}</span>
                                    ))}
                                  </div>

                                  <article className="project-summary-article">
                                    <header className="project-summary-article-header">
                                      <p className="landing-label">{active.article.eyebrow}</p>
                                      <h3 className="project-summary-article-title">
                                        {active.article.title}
                                      </h3>
                                    </header>

                                    <div className="project-summary-article-columns">
                                      {active.article.columns.map((column) => (
                                        <section key={column.heading}>
                                          <h4>{column.heading}</h4>
                                          <p>{column.body}</p>
                                        </section>
                                      ))}
                                    </div>
                                  </article>
                                </div>
                              </div>
                            )}

                            {activeFile === "map" && (
                              <div className="project-file-view project-file-map">
                                <SampleKnowledgeMap
                                  projectId={active.number}
                                  projectName={active.title}
                                  capacity={active.capacity}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            <p className="pt-10 text-xs text-muted-foreground leading-relaxed">
              Knowledge map uses sample data only - hub-and-spoke with a flat document cloud, not
              client files. Not in months. Not in weeks. In a few days.
            </p>
          </div>
        </section>

        <ScrollReveal delay={40}>
          <PilotSection onOpenSignup={() => openSignup()} />
        </ScrollReveal>

        <ScrollReveal>
          <Footer />
        </ScrollReveal>
      </div>

      <PilotEnquiryModal
        open={signupOpen}
        onOpenChange={handleSignupOpenChange}
        defaultProject={signupProject}
      />
    </div>
  );
};

export default Portfolio;
