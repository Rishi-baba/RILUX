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
  "absolute top-1/2 z-10 flex h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full border-[0.67px] border-solid border-white/50 bg-white/20 text-white backdrop-blur-[4px] transition-colors duration-200 hover:bg-white/35 md:h-12 md:w-12";

// Full-bleed product hero below a thin white band: track of slides translated by -index×100%,
// sand info card vertically centred on the right (desktop) or docked near the bottom (phones).
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
    <section className="pt-[24px] md:pb-[5px] md:pt-10">
      <div className="relative aspect-[390/474] w-full overflow-hidden md:aspect-[1440/859]">
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
            <div className="absolute bottom-[17px] left-[21px] right-[21px] flex items-center gap-[15px] rounded-[13px] bg-sand p-4 shadow-[0_4px_28px_rgba(0,0,0,0.1)] md:bottom-auto md:left-auto md:right-[60px] md:top-1/2 md:w-[650px] md:-translate-y-1/2 md:p-7">
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[10px] font-medium uppercase leading-[16px] tracking-[1.6px] text-ink-soft md:text-[14px] md:leading-[22.4px] md:tracking-[2.24px]">
                  {slide.eyebrow}
                </p>
                <div className="my-[5px] h-px w-10 bg-ink-soft/30 md:my-[10px]" />
                <h3 className="line-clamp-2 font-display text-[14px] font-normal leading-[16px] text-ink-soft [font-variant-caps:small-caps] md:text-[32px] md:leading-[36.8px]">
                  {slide.title}
                </h3>
                <p className="mt-[11px] font-ui text-[14px] font-normal leading-[22.4px] text-ink-soft md:mt-[10px] md:text-[23px] md:leading-[36.8px]">
                  {slide.price}
                </p>
                <Link
                  href={slide.href}
                  tabIndex={i === index ? 0 : -1}
                  className="mt-[6px] inline-flex items-center gap-2 rounded-[6px] bg-ink-soft px-3 py-[5px] font-ui text-[13px] font-medium leading-[20.8px] text-white transition-opacity duration-200 hover:opacity-80"
                >
                  {slide.cta}
                  <ArrowRightIcon size={14} aria-hidden />
                </Link>
              </div>
              <Link
                href={slide.href}
                tabIndex={-1}
                aria-hidden
                className="relative block h-[110px] w-[88px] flex-none overflow-hidden rounded-[13px] md:h-[228px] md:w-[187px]"
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
        className={cn(arrowClass, "left-4 md:left-6")}
      >
        <ChevronLeftIcon size={18} aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className={cn(arrowClass, "right-4 md:right-6")}
      >
        <ChevronRightIcon size={18} aria-hidden />
      </button>

      <div className="absolute bottom-[26px] left-1/2 z-10 hidden -translate-x-1/2 items-center gap-[6px] md:flex">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className="flex h-4 w-4 items-center justify-center"
          >
            <span
              className={cn(
                "block rounded-full bg-white transition-all duration-300",
                i === index ? "size-[9px] opacity-100" : "size-[7px] opacity-60",
              )}
            />
          </button>
        ))}
      </div>
      </div>
    </section>
  );
}
