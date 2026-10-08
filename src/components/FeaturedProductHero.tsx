"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { Placeholder } from "@/components/Placeholder";
import { featuredProducts } from "@/lib/content";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 50;

const arrowClass =
  "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-[0.67px] border-solid border-white/50 bg-white/20 text-white backdrop-blur-[4px] transition-colors duration-200 hover:bg-white/35 md:flex";

// Full-bleed product hero: track of slides translated by -index×100%, with a sand
// info card (copy + thumbnail) pinned top-right on desktop and above the dots on mobile.
export function FeaturedProductHero() {
  const slides = featuredProducts;
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  const go = (dir: number) => setIndex((i) => (((i + dir) % count) + count) % count);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) >= SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
  };

  const onPointerCancel = () => {
    startX.current = null;
  };

  return (
    <section className="relative min-h-[640px] w-full overflow-hidden md:h-[799px] md:min-h-0">
      <div
        className="absolute inset-0 flex touch-pan-y transition-transform duration-[600ms] ease-theme"
        style={{ transform: `translateX(-${index * 100}%)` }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className="relative h-full w-full shrink-0"
            aria-hidden={i !== index}
          >
            <Placeholder tone={slide.bgTone} />
            <div className="absolute bottom-14 left-4 right-4 flex items-center gap-[15px] rounded-[13px] bg-sand p-[18px] shadow-[0_4px_28px_rgba(0,0,0,0.1)] md:bottom-auto md:left-auto md:right-16 md:top-0 md:w-[650px] md:p-7">
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[14px] font-medium uppercase leading-[22.4px] tracking-[2.24px] text-ink-soft">
                  {slide.eyebrow}
                </p>
                <div className="my-[10px] h-px w-10 bg-ink-soft/30" />
                <h3 className="line-clamp-2 font-display text-[22px] font-normal leading-[1.15] text-ink-soft md:text-[32px] md:leading-[36.8px]">
                  {slide.title}
                </h3>
                <p className="mt-[10px] font-ui text-[18px] font-normal leading-[36.8px] text-ink-soft md:text-[23px]">
                  {slide.price}
                </p>
                <Link
                  href={slide.href}
                  tabIndex={i === index ? 0 : -1}
                  className="mt-[14px] inline-flex items-center gap-2 rounded-[6px] bg-ink-soft px-3 py-[5px] font-ui text-[13px] font-medium leading-[20.8px] text-white transition-opacity duration-200 hover:opacity-80"
                >
                  {slide.cta}
                  <ArrowRightIcon size={14} aria-hidden />
                </Link>
              </div>
              <Link
                href={slide.href}
                tabIndex={-1}
                aria-hidden
                className="relative block h-[118px] w-[96px] flex-none overflow-hidden rounded-[13px] md:h-[228px] md:w-[187px]"
              >
                <Placeholder tone={slide.thumbTone} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className={cn(arrowClass, "left-6")}
      >
        <ChevronLeftIcon size={18} aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className={cn(arrowClass, "right-6")}
      >
        <ChevronRightIcon size={18} aria-hidden />
      </button>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-[3px]">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className="flex h-4 items-center"
          >
            <span
              className={cn(
                "block h-[2px] w-10 bg-white transition-opacity duration-300",
                i === index ? "opacity-100" : "opacity-40",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
