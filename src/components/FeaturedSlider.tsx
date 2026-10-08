"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { MouseEvent, PointerEvent } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { Placeholder } from "@/components/Placeholder";
import { useAutoplay } from "@/hooks/useAutoplay";
import { signatureSlides } from "@/lib/content";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 50;

// Coverflow: center slide 420×777 (78vw wide on mobile), sides scaled 0.85 (357×661),
// 24px gap. Each slide is positioned over the center stage and shifted by its offset
// from the active index; step = half center + half side + gap = 0.925 × width + 24px.
export function FeaturedSlider() {
  const slides = signatureSlides;
  const count = slides.length;
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);
  const dragged = useRef(false);

  const go = (dir: number) => setActive((i) => (((i + dir) % count) + count) % count);

  // Slideshow: advance every 4s; pause while hovered and briefly after a swipe/click.
  const [hovered, setHovered] = useState(false);
  const nudge = useAutoplay(() => go(1), { interval: 4000, paused: hovered });

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    nudge();
    startX.current = e.clientX;
    dragged.current = false;
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    if (Math.abs(e.clientX - startX.current) > 5) dragged.current = true;
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
    <section
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-start justify-center overflow-hidden pb-[18px] pt-[20px] md:pb-[39px] md:pt-[15px]"
    >
      <div
        className="relative aspect-[478/884] w-[62.6vw] touch-pan-y select-none [--fs-gap:-21px] md:w-[33.2vw] md:[--fs-gap:2.64vw]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {slides.map((slide, i) => {
          let offset = (((i - active) % count) + count) % count;
          if (offset > count / 2) offset -= count;
          const isActive = offset === 0;
          const visible = Math.abs(offset) <= 1;

          const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
            if (dragged.current) {
              e.preventDefault();
              dragged.current = false;
              return;
            }
            if (!isActive) {
              e.preventDefault();
              setActive(i);
            }
          };

          return (
            <Link
              key={slide.title}
              href={slide.href}
              draggable={false}
              onClick={onClick}
              aria-hidden={!visible}
              tabIndex={visible ? 0 : -1}
              className={cn(
                "absolute inset-0 block overflow-hidden transition-[transform,opacity] duration-500 ease-theme",
                isActive ? "z-20" : "z-10",
                visible ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              style={{
                transform: `translateX(calc(${offset} * (92.5% + var(--fs-gap)))) scale(${isActive ? 1 : 0.85})`,
              }}
            >
              <Placeholder tone={slide.tone} />
              <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 text-center font-display text-[22px] font-normal uppercase leading-[1.1] text-white md:text-[44px]">
                {slide.title}
              </span>
              {isActive ? (
                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                  <ChevronRightIcon size={18} aria-hidden />
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
