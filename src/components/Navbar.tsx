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

const links = [
  { href: "#solution", label: "Product" },
  { href: "/portfolio", label: "Case Studies", route: true },
  { href: "#technology", label: "Technology" },
  { href: "#company", label: "Company" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  const resolveHref = (link: (typeof links)[number]) => {
    if ("route" in link && link.route) return link.href;
    return onHome ? link.href : `/${link.href}`;
  };

  return (
    <header className="landing-nav-wrap animate-nav-in">
      <nav className="landing-nav flex h-14 sm:h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 min-h-[40px] shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background text-[11px] font-semibold tracking-tight">
            S
          </span>
          <span className="font-display text-sm font-semibold tracking-[0.08em] uppercase text-foreground">
            Shura
          </span>
        </Link>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 lg:gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={resolveHref(link)}
              className="text-[11px] font-medium tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="hero-secondary"
            size="sm"
            asChild
            className="hidden sm:inline-flex h-9 rounded-full px-4 text-[11px] tracking-[0.08em] uppercase"
          >
            <a href="#outputs">Overview</a>
          </Button>
          <Button
            variant="hero"
            size="sm"
            asChild
            className="hidden sm:inline-flex h-9 rounded-full px-4 text-[11px] tracking-[0.06em] uppercase"
          >
            <Link to={onHome ? "#pilot" : "/portfolio#signup"}>
              Pilot
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-10 w-10 rounded-full"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="landing-band-dark w-[min(100vw-2rem,320px)] border-border">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 pt-8">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={resolveHref(link)}
                    onClick={() => setOpen(false)}
                    className="py-3 px-2 text-sm tracking-[0.12em] uppercase text-foreground hover:text-muted-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <Link
                  to={onHome ? "#pilot" : "/portfolio#signup"}
                  onClick={() => setOpen(false)}
                  className="mt-6 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[hsl(var(--landing-mint))] text-[hsl(var(--landing-mint-fg))] text-sm font-medium tracking-wide"
                >
                  Apply for Pilot
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
