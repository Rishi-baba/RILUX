"use client";

import { useEffect, useRef } from "react";
import { animatedIcons, type AnimatedIconName } from "@/components/animated-icons";
import { cn } from "@/lib/utils";

type Handle = { startAnimation: () => void; stopAnimation: () => void };

// Plays while the closest `[data-icon-trigger]` ancestor (the whole feature item) is hovered, or the icon itself
// when there is none. Skipped entirely for visitors who prefer reduced motion.
export function AnimatedIcon({ name, size = 24, className }: { name: AnimatedIconName; size?: number; className?: string }) {
  const Icon = animatedIcons[name];
  const wrap = useRef<HTMLSpanElement>(null);
  const icon = useRef<Handle>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const trigger = el.closest<HTMLElement>("[data-icon-trigger]") ?? el;
    const start = () => icon.current?.startAnimation();
    const stop = () => icon.current?.stopAnimation();
    trigger.addEventListener("mouseenter", start);
    trigger.addEventListener("mouseleave", stop);
    return () => {
      trigger.removeEventListener("mouseenter", start);
      trigger.removeEventListener("mouseleave", stop);
    };
  }, []);

  return (
    <span ref={wrap} aria-hidden className={cn("icon-animated inline-flex flex-none", className)}>
      <Icon ref={icon} size={size} />
    </span>
  );
}
