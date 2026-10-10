"use client";

import { useRef, useState } from "react";
import { Placeholder } from "@/components/Placeholder";
import { useAutoplay } from "@/hooks/useAutoplay";
import type { FabricSlide } from "@/types/content";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 50;

// Single-slide slideshow (text left, image right): auto-advances every 4.5s and loops; dots + swipe pause it briefly.
export function FabricFeature({ slides }: { slides: FabricSlide[] }) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const count = slides.length;

  const goTo = (i: number) => setIndex(((i % count) + count) % count);
  const nudge = useAutoplay(() => setIndex((i) => (i + 1) % count), { interval: 4500 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    nudge();
    startX.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (dx <= -SWIPE_THRESHOLD) goTo(index + 1);
    else if (dx >= SWIPE_THRESHOLD) goTo(index - 1);
  };

  const onPointerCancel = () => {
    startX.current = null;
  };

  return (
    <section className="mx-auto w-full max-w-[1150px] overflow-hidden px-[25px] pb-[26px] md:px-0 md:pb-[38px]">
      <div
        className="touch-pan-y select-none overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerLeave={onPointerCancel}
      >
        <div
          className="flex transition-transform duration-500 ease-theme"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.title}
              aria-hidden={i !== index}
              className="flex w-full shrink-0 flex-col-reverse items-center md:flex-row md:items-start md:gap-[25px]"
            >
              <div className="w-full px-4 pt-[24px] text-center md:mx-auto md:max-w-[420px] md:self-center md:px-0 md:pt-0">
                <span aria-hidden className="block font-display text-[64px] leading-[0.6] text-gold">&ldquo;</span>
                <p className="mt-[10px] font-display text-[21px] italic leading-[1.45] text-navy md:text-[24px]">
                  {slide.body}
                </p>
                <div className="mx-auto my-[16px] h-px w-10 bg-gold md:my-[18px]" />
                <h3 className="font-ui text-[12px] font-semibold uppercase tracking-[0.2em] text-navy">{slide.title}</h3>
                {slide.meta ? <p className="mt-[4px] font-ui text-[12px] text-stone">{slide.meta}</p> : null}
              </div>
              <div className="flex w-full justify-center md:w-[500px] md:flex-none">
                <div className="relative aspect-[5/3] w-full overflow-hidden rounded-[8px] md:max-w-[500px]">
                  <Placeholder tone={slide.tone} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[31px] flex items-center justify-center gap-[13px] md:mt-[39px]">
        {slides.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => {
              nudge();
              goTo(i);
            }}
            className={cn(
              "rounded-full bg-navy transition-all",
              i === index ? "size-[9px] opacity-100" : "size-[7px] opacity-25",
            )}
          />
        ))}
      </div>
    </section>
  );
}
