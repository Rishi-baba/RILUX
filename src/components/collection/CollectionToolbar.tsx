"use client";

import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { SortMenu } from "./SortMenu";
import type { SortValue } from "./filters";

/** "dense" = 2 cols mobile / 4 desktop; "loose" = 1 col mobile / 2 desktop */
export type Density = "dense" | "loose";

function GridIcon({ cols }: { cols: 1 | 2 | 4 }) {
  const gap = 2;
  const size = 18;
  const w = (size - gap * (cols - 1)) / cols;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden fill="currentColor">
      {Array.from({ length: cols }, (_, i) => (
        <rect key={i} x={i * (w + gap)} y={0} width={w} height={size} rx={0.5} />
      ))}
    </svg>
  );
}

export function CollectionToolbar({
  filterCount,
  onOpenFilters,
  density,
  onDensityChange,
  sort,
  onSortChange,
  count,
}: {
  filterCount: number;
  onOpenFilters: () => void;
  density: Density;
  onDensityChange: (d: Density) => void;
  sort: SortValue;
  onSortChange: (s: SortValue) => void;
  count: number;
}) {
  const densityButton = (value: Density, cols: 1 | 2 | 4, label: string, className?: string) => (
    <button
      type="button"
      onClick={() => onDensityChange(value)}
      aria-label={label}
      aria-pressed={density === value}
      className={cn(
        "items-center justify-center p-[4px] transition-colors",
        density === value ? "text-black" : "text-stone hover:text-ink",
        className,
      )}
    >
      <GridIcon cols={cols} />
    </button>
  );

  return (
    <div className="sticky top-[56px] z-20 flex h-[56px] items-center justify-between gap-3 border-b border-black/10 bg-white px-4 md:top-[66px] md:px-[36px]">
      <button
        type="button"
        onClick={onOpenFilters}
        className="flex items-center gap-[8px] font-ui text-[14px] text-ink hover:opacity-70"
        aria-label={filterCount ? `Filters, ${filterCount} active` : "Filters"}
      >
        <SlidersHorizontal size={18} strokeWidth={1.5} aria-hidden />
        <span>Filters</span>
        {filterCount ? (
          <span className="flex size-[18px] items-center justify-center rounded-full bg-brand font-ui text-[10px] text-white">
            {filterCount}
          </span>
        ) : null}
      </button>

      <div className="flex items-center gap-[12px] md:gap-[20px]">
        <div className="flex items-center gap-[4px]" role="group" aria-label="Grid layout">
          {densityButton("loose", 1, "One column", "flex md:hidden")}
          {densityButton("dense", 2, "Two columns", "flex md:hidden")}
          {densityButton("loose", 2, "Two columns", "hidden md:flex")}
          {densityButton("dense", 4, "Four columns", "hidden md:flex")}
        </div>

        <SortMenu value={sort} onChange={onSortChange} />

        <span className="hidden font-ui text-[13px] text-stone sm:inline" aria-live="polite">
          {count} {count === 1 ? "item" : "items"}
        </span>
      </div>
    </div>
  );
}
