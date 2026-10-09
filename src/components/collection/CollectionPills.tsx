"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Placeholder } from "@/components/Placeholder";
import { routes } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Collection } from "@/types/content";

// The same collection chips, in the same order, on every collection page — only the highlight
// moves. Scrolls horizontally when it doesn't fit; the active chip is scrolled into view.
export function CollectionPills({
  items,
  activeSlug,
}: {
  items: Collection[];
  activeSlug: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const active = scroller?.querySelector<HTMLElement>("[aria-current=page]");
    if (!scroller || !active) return;
    // centre the active chip within the strip without moving the page vertically
    const left = active.offsetLeft - (scroller.clientWidth - active.offsetWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, left), behavior: "instant" });
  }, [activeSlug]);

  return (
    <nav aria-label="Collections" className="pt-[28px] md:pt-[32px]">
      <div ref={scrollerRef} className="scrollbar-none overflow-x-auto">
        <ul className="mx-auto flex w-max gap-[12px] px-4 md:px-[36px]">
          {items.map((c) => {
            const active = c.slug === activeSlug;
            return (
              <li key={c.slug}>
                <Link
                  href={routes.collection(c.slug)}
                  aria-current={active ? "page" : undefined}
                  scroll={false}
                  className={cn(
                    "flex h-[60px] items-center gap-[16px] overflow-hidden rounded-[6px] pr-[24px] text-ink transition-colors",
                    active ? "bg-white ring-1 ring-inset ring-black" : "bg-mist hover:bg-[rgb(236,236,236)]",
                  )}
                >
                  <span className="relative h-full w-[52px] shrink-0">
                    <Placeholder tone={c.tone} />
                  </span>
                  <span className="whitespace-nowrap font-display text-[14px] uppercase tracking-[0.06em] md:text-[15px]">
                    {c.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
