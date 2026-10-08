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
          {fabricSlides.map((slide, i) => (
            <div
              key={slide.title}
              aria-hidden={i !== index}
              className="flex w-full shrink-0 flex-col-reverse items-center md:flex-row md:items-start md:gap-[25px]"
            >
              <div className="w-full px-4 pt-[24px] text-center md:mx-auto md:max-w-[392px] md:px-0 md:pt-0">
                <h3 className="font-ui text-[19.5px] font-bold uppercase leading-[31.2px] tracking-[2.2px] text-ink-soft md:text-[22px] md:leading-[35.2px]">
                  {slide.title}
                </h3>
                <div className="mx-auto my-[16px] h-px w-10 bg-ink-soft/40 md:my-[17px]" />
                <p className="line-clamp-5 font-ui text-[18.2px] font-normal leading-[27.3px] text-ink-soft md:line-clamp-4 md:text-[19.5px] md:leading-[29.25px]">
                  {slide.body}
                </p>
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
        {fabricSlides.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className={cn(
              "rounded-full bg-ink-soft transition-all",
              i === index ? "size-[9px] opacity-100" : "size-[7px] opacity-25",
            )}
          />
        ))}
      </div>
    </section>
  );
}
