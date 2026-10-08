"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { sortOptions, type SortValue } from "./filters";

// Styled sort dropdown (replaces the native <select>, whose OS popup clashed with the design).
export function SortMenu({ value, onChange }: { value: SortValue; onChange: (v: SortValue) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const current = sortOptions.find((o) => o.value === value) ?? sortOptions[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    // focus the selected option when the menu opens
    listRef.current?.querySelector<HTMLButtonElement>("[aria-selected=true]")?.focus();
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const choose = (v: SortValue) => {
    onChange(v);
    setOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      rootRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      return;
    }
    if (!open || (e.key !== "ArrowDown" && e.key !== "ArrowUp")) return;
    e.preventDefault();
    const items = [...(listRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [])];
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const next = e.key === "ArrowDown" ? Math.min(items.length - 1, i + 1) : Math.max(0, i - 1);
    items[next]?.focus();
  };

  return (
    <div ref={rootRef} className="relative" onKeyDown={onKeyDown}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-[6px] py-1 font-ui text-[14px] text-ink transition-opacity hover:opacity-70"
      >
        <span className="hidden text-stone md:inline">Sort by:</span>
        <span className="max-w-[130px] truncate md:max-w-none">{current.label}</span>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          aria-hidden
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-label="Sort by"
        className={cn(
          "absolute right-0 top-[calc(100%+10px)] z-30 w-[220px] border border-black/10 bg-white py-[6px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-[opacity,transform] duration-200 ease-theme",
          open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-1 opacity-0",
        )}
      >
        {sortOptions.map((o) => {
          const selected = o.value === value;
          return (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={selected}
                tabIndex={open ? 0 : -1}
                onClick={() => choose(o.value)}
                className={cn(
                  "flex w-full items-center justify-between px-[16px] py-[10px] text-left font-ui text-[14px] text-ink outline-none transition-colors hover:bg-mist focus-visible:bg-mist",
                  selected && "font-semibold",
                )}
              >
                {o.label}
                {selected ? <Check size={15} strokeWidth={1.75} aria-hidden /> : null}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
