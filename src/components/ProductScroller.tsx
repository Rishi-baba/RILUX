"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { ProductCard } from "@/components/ProductCard";
import { headings, products } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/content";

const GAP = 6;

const arrowBase =
  "absolute top-[190px] z-10 hidden size-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition-opacity duration-200 ease-theme md:flex";

export function ProductScroller({
  title = headings.newArrivals,
  items = products,
}: {
  title?: string;
  items?: Product[];
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
    <section className="pb-[40px] pt-[40px]">
      <h2 className="mb-[20px] text-center font-display text-[34px] font-normal uppercase leading-[42px] text-black">
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
              className="w-[70vw] flex-none snap-start md:w-[304px]"
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Previous products"
          onClick={() => scrollByCard(-1)}
          className={cn(
            arrowBase,
            "left-[16px]",
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
            "right-[16px]",
            atEnd && "pointer-events-none opacity-0",
          )}
        >
          <ChevronRightIcon className="size-[18px]" />
        </button>
      </div>
    </section>
  );
}
