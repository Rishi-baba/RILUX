"use client";

import { useState } from "react";
import { Quote } from "lucide-react";
import { useAutoplay } from "@/hooks/useAutoplay";
import { showSampleReviews, testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

// Customer testimonials: one large quote at a time, cross-fading every 6s, with dots.
export function Testimonials() {
  const [active, setActive] = useState(0);
  const nudge = useAutoplay(() => setActive((i) => (i + 1) % testimonials.length), { interval: 6000 });

  return (
    <section className="bg-black px-[20px] py-[64px] text-white md:py-[96px]">
      <div className="mx-auto max-w-[860px] text-center">
        <p className="font-ui text-[11px] uppercase tracking-[0.24em] text-white/60 md:text-[12px]">Testimonials</p>
        <h2 className="mt-[10px] font-display text-[30px] uppercase leading-[1.1] md:text-[44px]">In Their Words</h2>
        {showSampleReviews ? (
          <p className="mt-[8px] font-ui text-[11px] uppercase tracking-[0.16em] text-white/45">Sample testimonials for preview</p>
        ) : null}

        <Quote className="mx-auto mt-[32px] size-[28px] text-white/40" strokeWidth={1.25} aria-hidden />

        <div className="relative mt-[20px] grid">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              aria-hidden={i !== active}
              className={cn(
                "col-start-1 row-start-1 transition-opacity duration-700 ease-theme",
                i === active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <blockquote className="font-display text-[22px] leading-[1.45] md:text-[30px]">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-[20px] font-ui text-[12px] uppercase tracking-[0.18em] text-white/70">
                {t.name} · {t.detail}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-[32px] flex justify-center gap-[10px]">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === active}
              onClick={() => {
                nudge();
                setActive(i);
              }}
              className={cn("rounded-full bg-white transition-all", i === active ? "size-[9px]" : "size-[7px] opacity-35")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
