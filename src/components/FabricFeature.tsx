"use client";

import { useRef, useState } from "react";
import { Placeholder } from "@/components/Placeholder";
import { fabricSlides } from "@/lib/content";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 50;

// Single-slide fabric carousel: dots + pointer swipe, no autoplay.
export function FabricFeature() {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const count = fabricSlides.length;

  const goTo = (i: number) => setIndex(Math.max(0, Math.min(count - 1, i)));

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
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
    <section className="mx-auto w-full max-w-[1100px] overflow-hidden px-6">
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
          {fabricSlides.map((slide, i) => (
            <div
              key={slide.title}
              aria-hidden={i !== index}
              className="flex w-full shrink-0 flex-col-reverse items-center gap-4 md:min-h-[340px] md:flex-row"
            >
              <div className="w-full py-4 text-center md:w-1/2 md:px-10 md:py-0">
                <h3 className="font-ui text-[18px] font-bold uppercase leading-[35.2px] tracking-[2.2px] text-ink-soft md:text-[22px]">
                  {slide.title}
                </h3>
                <div className="mx-auto my-[18px] h-px w-10 bg-ink-soft/40" />
                <p className="line-clamp-4 font-ui text-[16px] font-normal leading-[24px] text-ink-soft md:text-[19.5px] md:leading-[29.25px]">
                  {slide.body}
                </p>
              </div>
              <div className="flex w-full justify-center md:w-1/2">
                <div className="relative aspect-[5/3] w-full overflow-hidden rounded-[8px] md:max-w-[500px]">
                  <Placeholder tone={slide.tone} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-[10px]">
        {fabricSlides.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className={cn(
              "size-[6px] rounded-full bg-ink-soft transition-opacity",
              i === index ? "opacity-100" : "opacity-25",
            )}
          />
        ))}
      </div>
    </section>
  );
}
