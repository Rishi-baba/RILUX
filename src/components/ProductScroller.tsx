"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { ProductCard } from "@/components/ProductCard";
import { headings, products } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/content";

const GAP = 6;

const arrowBase =
  "absolute top-[25.6vw] z-10 flex size-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition-opacity duration-200 ease-theme md:top-[14.8vw]";

export function ProductScroller({
  title = headings.newArrivals,
  items = products,
  viewAllHref,
}: {
  title?: string;
  items?: Product[];
  /** Renders a centred "View all" link under the row when set */
  viewAllHref?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const frame = requestAnimationFrame(update);
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 304) + GAP;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="pb-[18px] pt-[20px] md:pt-[32px]">
      <h2 className="mb-[20px] text-center font-display text-[24px] font-normal uppercase leading-[32px] text-black md:text-[34px] md:leading-[42px]">
        {title}
      </h2>
      <div className="relative">
        <div
          ref={trackRef}
          className="scrollbar-none flex snap-x snap-mandatory gap-[6px] overflow-x-auto scroll-smooth"
        >
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="w-[41vw] flex-none snap-start md:w-[23.66vw]"
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Previous products"
          onClick={() => scrollByCard(-1)}
          className={cn(
            arrowBase,
            "left-[12px]",
            atStart && "pointer-events-none opacity-0",
          )}
        >
          <ChevronLeftIcon className="size-[18px]" />
        </button>
        <button
          type="button"
          aria-label="Next products"
          onClick={() => scrollByCard(1)}
          className={cn(
            arrowBase,
            "right-[12px]",
            atEnd && "pointer-events-none opacity-0",
          )}
        >
          <ChevronRightIcon className="size-[18px]" />
        </button>
      </div>
      {viewAllHref ? (
        <div className="mt-[28px] text-center md:mt-[36px]">
          <Link
            href={viewAllHref}
            className="font-ui text-[15px] text-black underline underline-offset-[5px] transition-opacity hover:opacity-60 md:text-[17px]"
          >
            View all
          </Link>
        </div>
      ) : null}
    </section>
  );
}
