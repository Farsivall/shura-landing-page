import { useState } from "react";
import { SectionLabel } from "./ProblemSections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Target, Compass, TrendingUp, Users, Play } from "lucide-react";

const ExampleSection = () => {
  return (
    <section id="example" className="py-24 md:py-32 relative z-10 border-t border-border">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <SectionLabel>Example</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See a project evaluated end to end
          </h2>
          <p className="text-muted-foreground mb-2">
            Walkthrough coming soon.
          </p>
          <p className="text-sm text-muted-foreground/90 max-w-xl mx-auto">
            From project evidence to proceed / restructure / walk away — with provenance throughout.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card overflow-hidden aspect-video flex items-center justify-center border-dashed">
          <div className="text-center p-8">
            <div className="inline-flex h-16 w-16 rounded-full border-2 border-muted-foreground/30 items-center justify-center mb-4">
              <Play className="h-7 w-7 text-muted-foreground ml-1" />
            </div>
            <p className="text-sm font-medium text-foreground">Example recording</p>
            <p className="text-xs text-muted-foreground mt-1">Placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhoSection = () => {
  const audiences = [
    {
      icon: Compass,
      title: "Energy developers",
      desc: "Know whether a project deserves further investment before capital and advisory spend lock in.",
      accent: "primary",
    },
    {
      icon: Target,
      title: "Sponsors & CEOs",
      desc: "Get a clear proceed / restructure / walk-away brief before IC.",
      accent: "violet",
    },
    {
      icon: TrendingUp,
      title: "Investors & lenders",
      desc: "Stress-test viability and diligence gaps before term sheets.",
      accent: "amber",
    },
    {
      icon: Users,
      title: "Advisors",
      desc: "Arrive with a structured first-pass evaluation — Shura complements professional judgement.",
      accent: "cyan",
    },
  ];

  const accentBorder: Record<string, string> = {
    primary: "border-l-primary",
    violet: "border-l-violet-500",
    amber: "border-l-amber-500",
    cyan: "border-l-cyan-500",
  };

  return (
    <section id="who" className="py-16 sm:py-24 md:py-32 relative z-10 border-t border-border overflow-hidden">
      <div className="container relative min-w-0">
        <div className="absolute inset-0 pointer-events-none flex justify-center -top-24">
          <div className="w-[min(100%,600px)] h-64 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <SectionLabel>Customers</SectionLabel>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground max-w-2xl mx-auto leading-tight">
              For those who greenlight energy capital
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm">
              Built for organisations that must answer: is this project worth pursuing?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {audiences.map((a, i) => (
              <div
                key={a.title}
                className="group relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentBorder[a.accent]}`} />
                <div className="p-6 pl-7 flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-muted/80 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <a.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-foreground mb-1.5">{a.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const VisionSection = () => (
  <section className="py-16 sm:py-24 md:py-32 relative z-10 border-t border-border">
    <div className="container min-w-0">
      <div className="max-w-2xl mx-auto text-center">
        <SectionLabel>Position</SectionLabel>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
          The intelligence layer before investment
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
          Shura helps organisations understand whether a project deserves further investment. It complements consultants, lenders and technical advisors with a structured first-pass evaluation — faster, without replacing professional judgement.
        </p>
      </div>
    </div>
  </section>
);

const WAITLIST_POSITIONS = [
  "Energy Developer",
  "CEO",
  "Project Sponsor",
  "Investor",
  "Consultant",
  "Other",
] as const;

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    if (!position) {
      toast.error("Please select your position.");
      return;
    }
    if (!supabase) {
      toast.error("Waitlist is not configured. Please try again later.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("waitlist").insert({
      email: email.trim().toLowerCase(),
      position,
    });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast.success("You're already on the waitlist.");
      } else {
        toast.error(error.message || "Something went wrong. Please try again.");
      }
      return;
    }
    toast.success("You're on the waitlist. We'll be in touch.");
    setEmail("");
    setPosition("");
  };

  return (
    <section id="cta" className="py-16 sm:py-24 md:py-32 relative z-10">
      <div className="container min-w-0">
        <div className="max-w-2xl mx-auto p-6 sm:p-8 md:p-12 rounded-2xl border border-primary/20 bg-primary/5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Commit capital with more certainty.
          </h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-center text-sm sm:text-base">
            Join the waitlist for decision intelligence that turns complex project evidence into an explainable proceed / restructure / walk-away call.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm mx-auto">
            <div className="space-y-2">
              <Label htmlFor="waitlist-email">Email</Label>
              <Input
                id="waitlist-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="bg-background"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waitlist-position">Position</Label>
              <Select value={position} onValueChange={setPosition} disabled={loading}>
                <SelectTrigger id="waitlist-position" className="bg-background">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {WAITLIST_POSITIONS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" variant="hero" size="xl" disabled={loading} className="mt-2 touch-manipulation min-h-[48px] w-full sm:w-auto">
              {loading ? "Adding…" : "Join the waitlist"} <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-border relative z-10">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-[10px]">S</span>
        </div>
        <span className="text-sm font-medium text-foreground">Shura</span>
      </div>
      <span className="text-xs text-muted-foreground">Decision Intelligence for Energy Infrastructure</span>
    </div>
  </footer>
);

export { ExampleSection, WhoSection, VisionSection, CTASection, Footer };
