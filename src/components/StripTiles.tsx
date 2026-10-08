"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import { Placeholder } from "@/components/Placeholder";
import { useAutoplay } from "@/hooks/useAutoplay";
import { stripTiles } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Tile } from "@/types/content";

const GAP = 6;

// Wide strip slideshow: native scroll-snap row that auto-advances one tile at a time and
// loops back to the start. Pauses on hover/focus and briefly after the visitor scrolls.
export function StripTiles({
  items = stripTiles,
  className,
}: {
  items?: Tile[];
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const advance = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const tile = el.firstElementChild as HTMLElement | null;
    const step = (tile?.offsetWidth ?? 0) + GAP;
    // Loop back once (nearly) at the end, so the last move is never a tiny nudge.
    const remaining = el.scrollWidth - el.clientWidth - el.scrollLeft;
    el.scrollTo({ left: remaining < 24 ? 0 : el.scrollLeft + step, behavior: "smooth" });
  }, []);

  const nudge = useAutoplay(advance, { interval: 3500, paused: hovered });

  return (
    <section
      aria-roledescription="carousel"
      className={cn("pb-[20px] pt-[6px] md:pb-[36px] md:pt-[16px]", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        ref={trackRef}
        onPointerDown={nudge}
        onTouchStart={nudge}
        onWheel={nudge}
        className="scrollbar-none flex snap-x snap-mandatory gap-[6px] overflow-x-auto px-[6px]"
      >
        {items.map((tile) => (
          <Link
            key={tile.title}
            href={tile.href}
            className="relative block aspect-[149/192] w-[38.2vw] flex-none snap-start overflow-hidden md:aspect-[616/231] md:w-[42.8vw]"
          >
            <Placeholder tone={tile.tone} />
            <div aria-hidden className="absolute inset-0 bg-black/25" />
            <span className="absolute inset-0 flex items-center justify-center px-[16px] text-center">
              <span className="line-clamp-3 font-display text-[16px] font-normal uppercase leading-[1.05] text-white md:line-clamp-2 md:text-[34px]">
                {tile.title}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
