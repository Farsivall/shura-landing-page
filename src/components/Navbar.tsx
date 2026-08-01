import { useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#problem", label: "Problem" },
  { href: "#introducing", label: "Solution" },
  { href: "#how-it-works", label: "Process" },
  { href: "#features", label: "Outputs" },
  { href: "#who", label: "Who it's for" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 opacity-0 animate-nav-in">
      <div className="flex h-12 sm:h-14 items-center justify-between rounded-2xl border border-border bg-background/70 px-3 sm:px-4 shadow-lg shadow-black/5 backdrop-blur-xl md:px-6 w-full max-w-5xl min-w-0 md:min-w-[640px]">
        <a href="#" className="flex items-center gap-2 rounded-lg outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring min-h-[44px] min-w-[44px] md:min-w-0 md:min-h-0 flex-shrink-0">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-xl bg-primary flex items-center justify-center shadow-md">
            <span className="text-primary-foreground font-bold text-xs sm:text-sm">S</span>
          </div>
          <span className="text-base sm:text-lg font-semibold text-foreground">Shura</span>
        </a>
        <div className="hidden md:flex items-center gap-8 md:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 px-1 py-2"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#cta"
            className="md:hidden inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors py-2 px-3 min-h-[44px] items-center touch-manipulation"
          >
            Waitlist
          </a>
          <a
            href="#cta"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 py-2"
          >
            Sign up for the waitlist <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-10 w-10 rounded-lg touch-manipulation"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100vw-2rem,320px)]">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 pt-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="py-3 px-3 rounded-lg text-foreground hover:bg-muted transition-colors text-base -mx-1"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#cta"
                  onClick={() => setOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Sign up for the waitlist <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
