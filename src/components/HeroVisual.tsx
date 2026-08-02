import { FileText, Network, GitBranch } from "lucide-react";
import SpecialistRing from "./SpecialistRing";
import ScrollReveal from "./ScrollReveal";

const mapNodes = [
  { label: "Evidence", hint: "Studies, workbooks, contracts", icon: FileText, tone: "mid" },
  { label: "Connections", hint: "How findings link across the project", icon: Network, tone: "go" },
  { label: "Decisions", hint: "Proceed, restructure, or walk away", icon: GitBranch, tone: "mid" },
];

const HeroVisual = () => {
  return (
    <div className="relative max-w-5xl mx-auto overflow-hidden sm:overflow-visible">
      <SpecialistRing />

      {/* Flow: panel → knowledge map */}
      <ScrollReveal delay={220}>
        <div className="hero-funnel mt-2 touch-pan-y">
          <div className="hero-funnel-beam" aria-hidden />

          <div className="hero-decision-node">
            <span className="hero-decision-node-glow" aria-hidden />
            Knowledge map
          </div>

          <div className="hero-funnel-beam hero-funnel-beam-short" aria-hidden />

          <div className="hero-path-stage">
            {mapNodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.label}
                  className={`hero-path-card hero-path-card-${node.tone}`}
                  style={{ ["--path-i" as string]: i }}
                >
                  <Icon className="h-4 w-4 mx-auto mb-2 opacity-80" />
                  <p className="text-sm font-semibold mb-1">{node.label}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">{node.hint}</p>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default HeroVisual;
