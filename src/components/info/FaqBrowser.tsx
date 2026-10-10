"use client";

import { useId, useMemo, useState } from "react";
import { Plus, Search } from "@/components/icons";
import { inputClass } from "@/components/info/fields";
import { cn } from "@/lib/utils";

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  name: string;
  items: FaqItem[];
}

function AccordionItem({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <li className="border-b border-black/10">
      <h3>
        <button
          type="button"
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex min-h-[60px] w-full items-center justify-between gap-4 py-3 text-left font-ui text-[15px] font-medium text-black"
        >
          <span>{item.q}</span>
          <Plus
            aria-hidden
            className={cn(
              "h-[18px] w-[18px] shrink-0 transition-transform duration-300 ease-theme",
              open && "rotate-45",
            )}
          />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-theme",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden" inert={!open}>
          <p className="pb-5 font-ui text-[14px] leading-[1.8] text-stone">{item.a}</p>
        </div>
      </div>
    </li>
  );
}

export function FaqBrowser({ categories }: { categories: FaqCategory[] }) {
  const [active, setActive] = useState(categories[0]?.name ?? "");
  const [query, setQuery] = useState("");
  const [openKey, setOpenKey] = useState<string | null>(null);

  const q = query.trim().toLowerCase();

  // With a query, search every category; otherwise show the active tab.
  const groups = useMemo(() => {
    if (!q) return categories.filter((c) => c.name === active);
    return categories
      .map((c) => ({
        ...c,
        items: c.items.filter((i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q)),
      }))
      .filter((c) => c.items.length > 0);
  }, [categories, active, q]);

  return (
    <div className="mx-auto max-w-[860px] px-4 pb-12">
      <div className="relative mb-6">
        <label htmlFor="faq-search" className="sr-only">
          Search questions
        </label>
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-[14px] h-4 w-4 -translate-y-1/2 text-stone" />
        <input
          id="faq-search"
          type="search"
          placeholder="Search questions"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cn(inputClass, "pl-10")}
        />
      </div>

      <div role="group" aria-label="FAQ categories" className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 md:flex-wrap md:justify-center">
        {categories.map((c) => {
          const selected = !q && c.name === active;
          return (
            <button
              key={c.name}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                setActive(c.name);
                setQuery("");
                setOpenKey(null);
              }}
              className={cn(
                "h-10 shrink-0 rounded-full border px-5 font-ui text-[13px] font-medium transition-colors",
                selected
                  ? "border-ink-soft bg-ink-soft text-white"
                  : "border-black/15 bg-white text-black hover:border-black",
              )}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {groups.length === 0 ? (
        <p role="status" className="py-10 text-center font-ui text-[14px] text-stone">
          No questions match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        groups.map((group) => (
          <section key={group.name} aria-label={group.name} className="mb-6">
            {q ? (
              <h2 className="mt-4 mb-1 font-ui text-[12px] font-medium uppercase tracking-[0.08em] text-stone">
                {group.name}
              </h2>
            ) : null}
            <ul className="border-t border-black/10">
              {group.items.map((item) => {
                const key = `${group.name}:${item.q}`;
                return (
                  <AccordionItem
                    key={key}
                    item={item}
                    open={openKey === key}
                    onToggle={() => setOpenKey((k) => (k === key ? null : key))}
                  />
                );
              })}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
