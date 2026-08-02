import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const sectionLinks = [
  { href: "#problem", label: "Problem" },
  { href: "#introducing", label: "Solution" },
  { href: "#how-it-works", label: "Process" },
  { href: "#features", label: "Outputs" },
  { href: "#who", label: "Who it's for" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const onPortfolio = pathname === "/portfolio";

  const sectionHref = (hash: string) => (onHome ? hash : `/${hash}`);

  return (
    <nav className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 opacity-0 animate-nav-in">
      <div
        className="flex h-12 sm:h-14 items-center justify-between rounded-2xl border px-3 sm:px-5 shadow-lg shadow-black/5 backdrop-blur-xl md:px-8 w-full max-w-7xl min-w-0 md:min-w-[720px] gap-3"
        style={{
          background: "var(--glass-bg)",
          borderColor: "var(--glass-border)",
        }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring min-h-[44px] min-w-[44px] md:min-w-0 md:min-h-0 flex-shrink-0"
        >
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-xl bg-primary flex items-center justify-center shadow-md">
            <span className="text-primary-foreground font-bold text-xs sm:text-sm">S</span>
          </div>
          <span className="text-base sm:text-lg font-semibold text-foreground">Shura</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8 min-w-0">
          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={sectionHref(link.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 px-1 py-2 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <ThemeToggle />

          {/* Highlighted Portfolio */}
          <Link
            to="/portfolio"
            className={`hidden sm:inline-flex items-center text-sm font-semibold px-3 py-1.5 rounded-lg border transition-colors touch-manipulation ${
              onPortfolio
                ? "border-primary/50 bg-primary/15 text-primary"
                : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 hover:border-primary/50"
            }`}
          >
            Portfolio
          </Link>

          <Link
            to="/#cta"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-200 py-2 px-3.5 rounded-lg shadow-md shadow-primary/20"
          >
            Sign up for the pilot <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <Link
            to="/#cta"
            className="md:hidden inline-flex items-center text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 py-2 px-3 rounded-lg min-h-[40px] touch-manipulation"
          >
            Sign up
          </Link>

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
                <div className="flex items-center justify-between px-1 mb-3 -mx-1">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
                <Link
                  to="/portfolio"
                  onClick={() => setOpen(false)}
                  className="py-3 px-3 rounded-lg border border-primary/30 bg-primary/10 text-primary font-semibold hover:bg-primary/15 transition-colors text-base -mx-1 mb-2"
                >
                  Portfolio
                </Link>
                {sectionLinks.map((link) => (
                  <a
                    key={link.href}
                    href={sectionHref(link.href)}
                    onClick={() => setOpen(false)}
                    className="py-3 px-3 rounded-lg text-foreground hover:bg-muted transition-colors text-base -mx-1"
                  >
                    {link.label}
                  </a>
                ))}
                <Link
                  to="/#cta"
                  onClick={() => setOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  Sign up for the pilot <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
