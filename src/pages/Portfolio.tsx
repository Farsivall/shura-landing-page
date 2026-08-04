import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
  Presentation,
  Network,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
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
      "Multi-site run-of-river style programme (~29.1 MW) across related rivers. Large mixed data room with feasibility, hydrology, contracts, finance and site photography - mapped as one hub with a flat evidence cloud.",
    challenge:
      "Decide proceed / restructure before further capital, with evidence split across technical, hydrology, contracts and finance - including flood and physical exposure at critical works.",
    approach:
      "Ingested the corpus through Shura as a flat evidence cloud and ran multidisciplinary evaluation across engineering, finance, commercial, legal and tax, with desktop site and physical risk read beside the financial case.",
    outcome:
      "Ongoing. Pre-evaluation, specialist analysis and site-risk outputs delivered; financial model under review as new materials arrive.",
    disciplines: ["Engineering", "Finance", "Commercial", "Legal", "Tax"],
    deckLabel: "29.1 MW small hydro slide deck",
    article: {
      title: "When flood evidence has to sit beside the financial case",
      paragraphs: [
        "A multi-site run-of-river programme of about 29.1 MW, with schemes on related rivers under one sponsor. The data room was large and mixed: feasibility and multi-river studies, hydrology, engineering drawings, contracts and permits, a financial workbook, and a substantial set of site photographs.",
        "The binding question was not only whether the model worked. Site evidence included inundation and physical exposure at critical works. Desktop site and physical risk assessment became part of the evaluation - flood, access and damage read with contracts and returns, not left in a folder no one opens.",
        "Shura mapped the corpus as one project hub with a flat evidence cloud, two proceed runs, five specialists, and stacked pre-evaluation, specialist and site-risk outputs. The work is ongoing as the financial model continues under review.",
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
      "Standalone ~11 MW hydro with a lighter corpus. Used for an early viability screen before a full advisory process.",
    challenge:
      "Pressure-test whether engineering, capex, grid and offtake hang together enough to justify spending more on diligence - before consultants and IC get expensive.",
    approach:
      "Loaded the smaller project corpus into Shura and ran a short specialist-panel pass across engineering, finance and commercial.",
    outcome:
      "Ongoing. Specialist scores and decision brief still refining as further technical and commercial inputs arrive.",
    disciplines: ["Engineering", "Finance", "Commercial"],
    deckLabel: "11 MW hydro slide deck",
    article: {
      title: "A short screen before diligence gets expensive",
      paragraphs: [
        "A standalone hydro scheme of about 11 MW, with a lighter corpus than a multi-site programme. The brief was an early viability pass: whether engineering, capex, grid and offtake hang together enough to justify a fuller advisory process.",
        "This was not a flood-heavy data room. The pressure was coherence - a specialist-panel view across engineering, finance and commercial before consultants and investment committee spend lock in.",
        "Shura ran that early screen and left a preliminary assessment on the proceed call. Scores and brief are still being refined as further inputs arrive.",
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
      "Utility-scale PV (~39 MW) where the project-finance workbook is the centre of gravity. Focus on returns integrity, financing structure and provenance.",
    challenge:
      "Validate whether IRR, NPV and coverage can leave the spreadsheet and enter a defendable decision - before IC treats model outputs as settled.",
    approach:
      "Mapped the authoritative financial workbook through Shura, stress-testing returns, debt/equity assumptions and provenance across finance, engineering, commercial and tax.",
    outcome:
      "Ongoing. Financial validation in progress; returns and financing structure under review against the source workbook.",
    disciplines: ["Finance", "Engineering", "Commercial", "Tax"],
    deckLabel: "39 MW solar PV slide deck",
    article: {
      title: "When the workbook is already the source of truth",
      paragraphs: [
        "A utility-scale solar project of about 39 MW, where the project-finance workbook sat at the centre of gravity: tariff, performance, degradation, debt and equity.",
        "Engineering and commercial still mattered, but the binding question was financial. Could IRR, NPV and coverage leave the spreadsheet and enter a defendable capital decision - before an investment committee treated the figures as settled?",
        "Shura mapped the authoritative workbook for returns integrity, financing structure and provenance. Validation continues against the source model.",
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
            <div className="cases-hero">
              <ScrollReveal>
                <div className="cases-hero-copy">
                  <p className="landing-label">Case Studies</p>
                  <h1 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-semibold tracking-[-0.03em] text-foreground text-balance">
                    Projects analysed.
                  </h1>
                  <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-xl">
                    Drawn from programmes Shura is currently working on with energy developer
                    companies. Open a project folder for slides, summary and a sample interactive
                    knowledge map. Client details withheld.
                  </p>

                  <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
                    {portfolioStats.map((stat, i) => (
                      <ScrollReveal key={stat.label} variant="pop" delay={i * 80}>
                        <div className="flex flex-col gap-1 min-w-[5rem]">
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
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <div className="cases-hero-photos" aria-label="Energy systems analysed">
                {pilots.map((pilot, i) => (
                  <ScrollReveal
                    key={pilot.number}
                    variant="pop"
                    delay={100 + i * 90}
                    className={`cases-hero-photo-wrap cases-hero-photo-${i + 1}`}
                  >
                    <figure className="cases-hero-photo">
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
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="landing-band-dark border-t border-border pb-20 sm:pb-24">
          <div className="container pt-10 sm:pt-12">
            <div className="project-folders">
              {pilots.map((pilot, i) => {
                  const open = openFolder === pilot.number;
                  return (
                    <ScrollReveal key={pilot.number} variant="pop" delay={i * 90}>
                    <div
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
                                      <p className="landing-label">Summary</p>
                                      <h3 className="project-summary-article-title">
                                        {active.article.title}
                                      </h3>
                                    </header>

                                    <div className="project-summary-article-body">
                                      {active.article.paragraphs.map((paragraph) => (
                                        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
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
                    </ScrollReveal>
                  );
                })}
              </div>

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
