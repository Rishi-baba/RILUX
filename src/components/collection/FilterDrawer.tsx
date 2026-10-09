"use client";

import { useId, useState } from "react";
import { SidePanel } from "@/components/SidePanel";
import { formatPrice } from "@/lib/content";
import { cn } from "@/lib/utils";
import { attributeFacets, emptyFilters, type AttributeKey, type FacetOption, type Facets, type Filters, type ListKey } from "./filters";

// Tabs follow the catalogue: price, then each attribute facet, then size.
const tabs = ["Price", ...attributeFacets.map((f) => f.label), "Size"] as const;
type Tab = (typeof tabs)[number];
const facetByLabel = new Map<string, AttributeKey>(attributeFacets.map((f) => [f.label, f.key]));

export function FilterDrawer({
  open,
  onClose,
  facets,
  filters,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  facets: Facets;
  filters: Filters;
  onApply: (filters: Filters) => void;
}) {
  const [tab, setTab] = useState<Tab>("Price");
  const [draft, setDraft] = useState<Filters>(filters);
  const [wasOpen, setWasOpen] = useState(open);
  const idBase = useId();

  // Start each session from the applied filters (adjusting state during render).
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setDraft(filters);
  }

  const toggle = (key: ListKey, value: string) =>
    setDraft((d) => ({
      ...d,
      [key]: d[key].includes(value) ? d[key].filter((v) => v !== value) : [...d[key], value],
    }));

  const countFor = (t: Tab) => {
    if (t === "Price") return draft.priceMin !== null || draft.priceMax !== null ? 1 : 0;
    if (t === "Size") return draft.sizes.length;
    const key = facetByLabel.get(t);
    return key ? draft[key].length : 0;
  };
  const activeFacet = facetByLabel.get(tab);

  return (
    <SidePanel
      open={open}
      onClose={onClose}
      title="Filters"
      side="right"
      headerAction={
        <button
          type="button"
          onClick={() => setDraft(emptyFilters)}
          className="font-ui text-[13px] text-[rgb(200,30,30)] hover:opacity-70"
        >
          Clear All
        </button>
      }
      footer={
        <div className="grid grid-cols-2 gap-[10px]">
          <button
            type="button"
            onClick={onClose}
            className="h-[46px] border border-ink font-ui text-[14px] text-ink transition-colors hover:bg-mist"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onApply(draft)}
            className="h-[46px] bg-brand font-ui text-[14px] text-white transition-opacity hover:opacity-90"
          >
            Apply
          </button>
        </div>
      }
    >
      <div className="flex min-h-full">
        <div role="tablist" aria-orientation="vertical" className="w-[40%] shrink-0 border-r border-black/10">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              id={`${idBase}-tab-${t}`}
              aria-selected={tab === t}
              aria-controls={`${idBase}-panel`}
              onClick={() => setTab(t)}
              className={cn(
                "flex h-[56px] w-full items-center justify-between px-[16px] text-left font-ui text-[14px] text-ink",
                tab === t ? "bg-mist font-semibold" : "hover:bg-mist/60",
              )}
            >
              {t}
              {countFor(t) ? (
                <span className="font-ui text-[11px] font-normal text-stone">{countFor(t)}</span>
              ) : null}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`${idBase}-panel`}
          aria-labelledby={`${idBase}-tab-${tab}`}
          className="min-w-0 flex-1 p-[16px]"
        >
          {tab === "Price" ? (
            <PriceFacet
              max={facets.maxPrice}
              min={draft.priceMin}
              maxValue={draft.priceMax}
              onChange={(lo, hi) =>
                setDraft((d) => ({
                  ...d,
                  priceMin: lo <= 0 ? null : lo,
                  priceMax: hi >= facets.maxPrice ? null : hi,
                }))
              }
            />
          ) : null}
          {activeFacet ? (
            <CheckList
              options={facets.attributes[activeFacet]}
              selected={draft[activeFacet]}
              onToggle={(v) => toggle(activeFacet, v)}
            />
          ) : null}
          {tab === "Size" ? (
            <div className="flex flex-wrap gap-[8px]">
              {facets.sizes.map((s) => {
                const checked = draft.sizes.includes(s);
                return (
                  <label
                    key={s}
                    className={cn(
                      "flex h-[40px] min-w-[48px] cursor-pointer items-center justify-center border px-[10px] font-ui text-[13px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2",
                      checked ? "border-black bg-black text-white" : "border-black/20 text-ink hover:border-black",
                    )}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggle("sizes", s)}
                    />
                    {s}
                  </label>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </SidePanel>
  );
}

function CheckList({
  options,
  selected,
  onToggle,
}: {
  options: FacetOption[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <ul className="flex flex-col gap-[14px]">
      {options.map((o) => (
        <li key={o.value}>
          <label className="flex cursor-pointer items-center gap-[10px] font-ui text-[13px] text-ink">
            <input
              type="checkbox"
              checked={selected.includes(o.value)}
              onChange={() => onToggle(o.value)}
              className="size-[16px] shrink-0 accent-black"
            />
            <span className="min-w-0 flex-1 truncate">{o.value}</span>
            <span className="text-stone">({o.count})</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

const thumb =
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-[16px] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-[14px] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-black";

function PriceFacet({
  max,
  min: minValue,
  maxValue,
  onChange,
}: {
  max: number;
  min: number | null;
  maxValue: number | null;
  onChange: (lo: number, hi: number) => void;
}) {
  const lo = Math.max(0, Math.min(minValue ?? 0, max));
  const hi = Math.min(max, Math.max(maxValue ?? max, lo));
  const step = 100;
  const pct = (v: number) => (max ? (v / max) * 100 : 0);
  const clamp = (v: number) => (Number.isFinite(v) ? Math.max(0, Math.min(v, max)) : 0);

  return (
    <div>
      <p className="mb-[20px] font-ui text-[13px] text-ink">
        The highest price is {formatPrice(max)}
      </p>

      <div className="relative mb-[24px] h-[20px]">
        <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-black/10" />
        <div
          className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-black"
          style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
        />
        <input
          type="range"
          aria-label="Minimum price"
          min={0}
          max={max}
          step={step}
          value={lo}
          onChange={(e) => onChange(Math.min(Number(e.target.value), hi), hi)}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent accent-black",
            thumb,
          )}
        />
        <input
          type="range"
          aria-label="Maximum price"
          min={0}
          max={max}
          step={step}
          value={hi}
          onChange={(e) => onChange(lo, Math.max(Number(e.target.value), lo))}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent accent-black",
            thumb,
          )}
        />
      </div>

      <div className="flex items-center gap-[8px]">
        <PriceInput label="From" value={lo} onChange={(v) => onChange(Math.min(clamp(v), hi), hi)} />
        <span className="font-ui text-[13px] text-stone">–</span>
        <PriceInput label="To" value={hi} onChange={(v) => onChange(lo, Math.max(clamp(v), lo))} />
      </div>
    </div>
  );
}

function PriceInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex h-[40px] min-w-0 flex-1 items-center gap-[4px] border border-black/20 px-[8px] focus-within:border-black">
      <span className="sr-only">{label}</span>
      <span aria-hidden className="font-ui text-[13px] text-stone">
        ₹
      </span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full min-w-0 bg-transparent font-ui text-[13px] text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </label>
  );
}
