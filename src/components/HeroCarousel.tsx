"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { Placeholder } from "@/components/Placeholder";
import { heroSlides } from "@/lib/content";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 50;
const DRAG_START = 5;

export function HeroCarousel() {
  const count = heroSlides.length;
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef<number | null>(null);
  const didDrag = useRef(false);

  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    startX.current = e.clientX;
    didDrag.current = false;
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const delta = e.clientX - startX.current;
    if (!dragging && Math.abs(delta) > DRAG_START) {
      setDragging(true);
      didDrag.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (dragging || Math.abs(delta) > DRAG_START) setDragOffset(delta);
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const delta = e.clientX - startX.current;
    startX.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setDragging(false);
    setDragOffset(0);
    if (delta <= -SWIPE_THRESHOLD) next();
    else if (delta >= SWIPE_THRESHOLD) prev();
  };

  const cancelDrag = () => {
    startX.current = null;
    setDragging(false);
    setDragOffset(0);
  };

  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (didDrag.current) {
      e.preventDefault();
      e.stopPropagation();
      didDrag.current = false;
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const arrowClass =
    "absolute top-1/2 z-10 hidden h-[44px] w-[44px] -translate-y-1/2 items-center justify-center rounded-full border-[0.67px] border-solid border-white/50 bg-white/20 text-white backdrop-blur-[4px] transition-[background] duration-200 hover:bg-white/35 md:flex";

  return (
    <section
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Hero"
      onKeyDown={onKeyDown}
      className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[1265/585]"
    >
      <div
        className={cn(
          "flex h-full w-full touch-pan-y select-none",
          !dragging && "ease-theme transition-transform duration-[600ms]",
        )}
        style={{
          transform: `translateX(calc(${-index * 100}% + ${dragOffset}px))`,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={cancelDrag}
        onClickCapture={onClickCapture}
      >
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
            className="relative h-full w-full shrink-0"
          >
            <Link
              href={slide.href}
              draggable={false}
              tabIndex={i === index ? 0 : -1}
              aria-label={`Slide ${i + 1}`}
              className="absolute inset-0 block"
            >
              <Placeholder tone={slide.tone} />
            </Link>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={prev}
        className={cn(arrowClass, "left-[24px]")}
      >
        <ChevronLeftIcon className="h-[18px] w-[18px]" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={next}
        className={cn(arrowClass, "right-[24px]")}
      >
        <ChevronRightIcon className="h-[18px] w-[18px]" />
      </button>

      <div className="absolute bottom-[24px] left-0 z-10 flex w-full justify-center px-[17px]">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => goTo(i)}
            className="py-[8px]"
          >
            <span
              className={cn(
                "mx-[3px] block h-[2px] w-[40px] bg-white transition-[background,transform,opacity] duration-200",
                i === index ? "opacity-100" : "opacity-40",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
