"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { Play } from "lucide-react";
import { Placeholder, type PlaceholderTone } from "@/components/Placeholder";
import { cn } from "@/lib/utils";

function FitTag({ label }: { label: string }) {
  return (
    <span className="absolute right-[10px] top-[10px] z-[1] bg-white/85 px-[10px] py-[4px] font-ui text-[12px] uppercase tracking-[0.1em] text-black">
      {label}
    </span>
  );
}

export function ProductGallery({
  tones,
  title,
  tag,
}: {
  tones: PlaceholderTone[];
  title: string;
  tag?: string;
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="min-w-0">
      {/* Desktop grid */}
      <div className="hidden grid-cols-2 gap-[6px] md:grid">
        {tones.map((tone, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightbox(i)}
            aria-label={`Open image ${i + 1} of ${tones.length}`}
            className="relative aspect-[4/5] w-full cursor-zoom-in overflow-hidden"
          >
            <Placeholder tone={tone} />
            {i === 0 && tag ? <FitTag label={tag} /> : null}
            {i === 1 ? <VideoBadge /> : null}
          </button>
        ))}
      </div>

      {/* Mobile carousel */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto"
          aria-label={`${title} images`}
        >
          {tones.map((tone, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`Open image ${i + 1} of ${tones.length}`}
              className="relative aspect-[4/5] w-full flex-none snap-start"
            >
              <Placeholder tone={tone} />
              {i === 0 && tag ? <FitTag label={tag} /> : null}
              {i === 1 ? <VideoBadge /> : null}
            </button>
          ))}
        </div>
        <div className="flex justify-center gap-[6px] py-[10px]">
          {tones.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              aria-current={active === i}
              className={cn(
                "size-[6px] rounded-full transition-colors duration-200",
                active === i ? "bg-black" : "bg-black/20",
              )}
            />
          ))}
        </div>
      </div>

      {lightbox !== null ? (
        <Lightbox
          tones={tones}
          index={lightbox}
          onIndexChange={setLightbox}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </div>
  );
}

function Lightbox({
  tones,
  index,
  onIndexChange,
  onClose,
}: {
  tones: PlaceholderTone[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = tones.length;

  const step = useCallback(
    (dir: 1 | -1) => onIndexChange((index + dir + count) % count),
    [index, count, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      root.style.overflow = prevOverflow;
      previous?.focus();
    };
  }, []);

  const arrow =
    "absolute top-1/2 z-[1] flex size-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <p className="absolute left-1/2 top-[20px] -translate-x-1/2 font-ui text-[13px] tracking-[0.1em] text-white">
        {index + 1} / {count}
      </p>
      <button
        ref={closeRef}
        type="button"
        aria-label="Close image viewer"
        onClick={onClose}
        className="absolute right-[16px] top-[12px] flex size-[44px] items-center justify-center text-white"
      >
        <X className="size-[24px]" strokeWidth={1.5} />
      </button>
      <div
        className="relative aspect-[4/5] max-h-[90vh] w-[min(90vw,calc(90vh*0.8))]"
        onClick={(e) => e.stopPropagation()}
      >
        <Placeholder tone={tones[index]} />
      </div>
      <button
        type="button"
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          step(-1);
        }}
        className={cn(arrow, "left-[12px] md:left-[24px]")}
      >
        <ChevronLeftIcon className="size-[22px]" />
      </button>
      <button
        type="button"
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          step(1);
        }}
        className={cn(arrow, "right-[12px] md:right-[24px]")}
      >
        <ChevronRightIcon className="size-[22px]" />
      </button>
    </div>
  );
}

/** Marks the gallery slot reserved for the product video (swap in a <video> once clips exist) */
function VideoBadge() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-[10px]">
      <span className="flex size-[60px] items-center justify-center rounded-full bg-white/85 text-black shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
        <Play className="ml-[3px] size-[22px]" fill="currentColor" strokeWidth={0} />
      </span>
      <span className="rounded-full bg-black/45 px-[10px] py-[4px] font-ui text-[11px] uppercase tracking-[0.12em] text-white">
        Product video
      </span>
    </span>
  );
}
