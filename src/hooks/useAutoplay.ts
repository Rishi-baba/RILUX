"use client";

import { useEffect, useRef } from "react";

/**
 * Calls `tick` every `interval` ms while not paused. Skips ticks while the tab is hidden,
 * for a few seconds after the user interacts (call the returned `nudge`), and entirely when
 * the visitor prefers reduced motion.
 */
export function useAutoplay(tick: () => void, { interval = 4000, paused = false } = {}) {
  const tickRef = useRef(tick);
  const lastInteraction = useRef(0);

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      if (Date.now() - lastInteraction.current < interval + 2000) return;
      tickRef.current();
    }, interval);
    return () => window.clearInterval(id);
  }, [interval, paused]);

  return () => {
    lastInteraction.current = Date.now();
  };
}
