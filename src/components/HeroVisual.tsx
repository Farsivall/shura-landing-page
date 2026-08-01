import { Scale, TrendingUp, Code, Leaf, Briefcase } from "lucide-react";

const personas = [
  { icon: Code, label: "Engineering", color: "text-violet-400" },
  { icon: TrendingUp, label: "Finance", color: "text-emerald-400" },
  { icon: Briefcase, label: "Commercial", color: "text-amber-400" },
  { icon: Leaf, label: "Environmental", color: "text-teal-400" },
  { icon: Scale, label: "Legal", color: "text-blue-400" },
];

const paths = ["Proceed", "Restructure", "Walk away"];

const HeroVisual = () => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="flex justify-center gap-3 md:gap-6 mb-8">
        {personas.map((p) => (
          <div key={p.label} className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl border border-border bg-card flex items-center justify-center">
              <p.icon className={`h-5 w-5 md:h-6 md:w-6 ${p.color}`} />
            </div>
            <span className="text-[10px] md:text-xs text-muted-foreground font-medium">{p.label}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-4">
        <div className="w-px h-8 bg-gradient-to-b from-border to-primary/40" />
      </div>

      <div className="flex justify-center mb-4">
        <div className="px-6 py-3 rounded-xl border border-primary/30 bg-primary/5 text-sm font-medium text-primary">
          One explainable recommendation
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <div className="w-px h-8 bg-gradient-to-b from-primary/40 to-border" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {paths.map((path, i) => (
          <div
            key={path}
            className={`px-4 py-3 rounded-lg border bg-card text-xs text-center ${
              i === 0 ? "border-primary/30 text-primary" : "border-border text-muted-foreground"
            }`}
          >
            {path}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroVisual;
