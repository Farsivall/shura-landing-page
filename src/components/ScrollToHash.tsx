import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/** Smoothly scrolls to hash targets (e.g. /#cta) after route changes. */
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const pathChanged = prevPathname.current !== pathname;
    prevPathname.current = pathname;

    if (hash) {
      const id = hash.replace("#", "");
      // Modal triggers (handled on Portfolio) — don't scroll-hunt a missing id
      if (id === "signup") return;

      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return () => window.clearTimeout(timer);
    }

    if (pathChanged) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
