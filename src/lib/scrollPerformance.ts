/** Pause expensive decorative animations while the user is scrolling. */

const SCROLLING_CLASS = "is-scrolling";
const IDLE_MS = 140;

let attached = false;
let idleTimer = 0;

export function enableScrollPerformance() {
  if (attached || typeof window === "undefined") return;
  attached = true;

  const onScroll = () => {
    document.documentElement.classList.add(SCROLLING_CLASS);
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => {
      document.documentElement.classList.remove(SCROLLING_CLASS);
    }, IDLE_MS);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}
