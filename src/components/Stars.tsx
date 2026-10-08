"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Read-only star row; supports fractional ratings (e.g. 4.5) via a clipped overlay. */
export function Stars({ rating, size = 14, className }: { rating: number; size?: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span className={cn("relative inline-flex", className)} role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      <span className="flex gap-[2px] text-black/15">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} size={size} fill="currentColor" strokeWidth={0} aria-hidden />
        ))}
      </span>
      <span className="absolute inset-0 flex gap-[2px] overflow-hidden text-black" style={{ width: `${pct}%` }}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} size={size} fill="currentColor" strokeWidth={0} className="flex-none" aria-hidden />
        ))}
      </span>
    </span>
  );
}

/** Interactive 1–5 star picker used in the review form. */
export function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div role="radiogroup" aria-label="Your rating" className="flex gap-[4px]" onMouseLeave={() => setHover(0)}>
      {Array.from({ length: 5 }, (_, i) => {
        const v = i + 1;
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={value === v}
            aria-label={`${v} star${v > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(v)}
            onClick={() => onChange(v)}
            className={cn("transition-colors", v <= shown ? "text-black" : "text-black/20")}
          >
            <Star size={26} fill="currentColor" strokeWidth={0} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
