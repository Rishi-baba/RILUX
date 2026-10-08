"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { Placeholder } from "@/components/Placeholder";
import { routes } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Collection } from "@/types/content";

export function CollectionPills({
  items,
  activeSlug,
}: {
  items: Collection[];
  activeSlug: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [update]);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(200, el.clientWidth * 0.7), behavior: "smooth" });
  };

  const buttonClass =
    "flex size-[40px] shrink-0 items-center justify-center bg-white text-ink transition-opacity hover:opacity-60";

  return (
    <nav aria-label="Collections" className="flex items-center gap-[10px] px-4 pt-[24px] md:px-[36px]">
      <button type="button" aria-label="Scroll collections left" onClick={() => scrollBy(-1)} className={buttonClass}>
        <ChevronLeftIcon size={20} strokeWidth={1.5} />
      </button>
      <div
        ref={scrollerRef}
        onScroll={update}
        className="scrollbar-none flex min-w-0 flex-1 gap-[10px] overflow-x-auto"
      >
        {items.map((c) => {
          const active = c.slug === activeSlug;
          return (
            <Link
              key={c.slug}
              href={routes.collection(c.slug)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-[70px] shrink-0 items-center gap-[14px] rounded-[6px] bg-mist pr-[22px] text-ink transition-opacity hover:opacity-80",
                active && "ring-1 ring-inset ring-black",
              )}
            >
              <span className="relative h-[70px] w-[56px] shrink-0 overflow-hidden rounded-l-[6px]">
                <Placeholder tone={c.tone} />
              </span>
              <span className="line-clamp-2 max-w-[150px] font-display text-[15px] uppercase leading-[1.2] tracking-[0.04em]">
                {c.title}
              </span>
            </Link>
          );
        })}
      </div>
      <button
        type="button"
        aria-label="Scroll collections right"
        aria-hidden={atEnd}
        tabIndex={atEnd ? -1 : undefined}
        onClick={() => scrollBy(1)}
        className={cn(buttonClass, atEnd && "invisible")}
      >
        <ChevronRightIcon size={20} strokeWidth={1.5} />
      </button>
    </nav>
  );
}
