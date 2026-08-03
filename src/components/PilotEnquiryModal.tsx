import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";

const POSITIONS = [
  "Energy Developer",
  "CEO",
  "Project Sponsor",
  "Investor",
  "Consultant",
  "Other",
] as const;

type PilotEnquiryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultProject?: string;
};

const PilotEnquiryModal = ({ open, onOpenChange, defaultProject = "" }: PilotEnquiryModalProps) => {
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [project, setProject] = useState(defaultProject);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) setProject(defaultProject);
  }, [open, defaultProject]);

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
    if (!project.trim()) {
      toast.error("Please tell us about your project.");
      return;
    }
    if (!supabase) {
      toast.error("Pilot signup is not configured. Please try again later.");
      return;
    }

    setLoading(true);
    const emailNorm = email.trim().toLowerCase();
    const projectNorm = project.trim();

    let { error } = await supabase.from("waitlist").insert({
      email: emailNorm,
      position,
      project: projectNorm,
    });

    // Fallback if `project` column is not on the waitlist table yet
    if (error && /project/i.test(error.message)) {
      ({ error } = await supabase.from("waitlist").insert({
        email: emailNorm,
        position: `${position} · ${projectNorm}`,
      }));
    }

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast.success("You're already on the pilot list. We'll get back with details and documentation.");
        onOpenChange(false);
      } else {
        toast.error(error.message || "Something went wrong. Please try again.");
      }
      return;
    }

    toast.success("You're on the pilot list. We'll get back with details and documentation.");
    setEmail("");
    setPosition("");
    setProject("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="portfolio-modal max-w-md gap-0 border-border bg-card p-0 overflow-hidden sm:rounded-lg data-[state=open]:animate-none data-[state=closed]:animate-none">
        <div className="relative max-h-[90dvh] overflow-y-auto overscroll-contain px-6 py-8 sm:px-8 sm:py-10">
          <DialogHeader className="relative space-y-3 text-left mb-6">
            <DialogTitle className="font-display text-2xl font-semibold tracking-[-0.03em]">
              Apply for Pilot Programme
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              Tell us about you and the project. We will respond with documentation and next steps.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="pilot-email">Email</Label>
              <Input
                id="pilot-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="bg-background/80 h-11"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pilot-position">Position</Label>
              <Select value={position} onValueChange={setPosition} disabled={loading}>
                <SelectTrigger id="pilot-position" className="bg-background/80 h-11">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {POSITIONS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pilot-project">Project</Label>
              <Input
                id="pilot-project"
                type="text"
                placeholder="e.g. 40 MW solar, early development"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                disabled={loading}
                className="bg-background/80 h-11"
              />
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed pt-1">
              We&apos;ll get back to you with all the details, documentation, and next steps.
            </p>

            <Button
              type="submit"
              variant="hero"
              size="xl"
              disabled={loading}
              className="w-full touch-manipulation min-h-[48px]"
            >
              {loading ? "Sending…" : "Sign up for the pilot"} <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PilotEnquiryModal;
