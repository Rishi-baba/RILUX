"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Clock, X } from "@/components/icons";
import { Placeholder } from "@/components/Placeholder";
import { SearchIcon } from "@/components/icons";
import { collections, routes, searchCollections, searchProducts, trendingProducts } from "@/lib/content";
import type { Product } from "@/types/content";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const popularSlugs = ["new-in", "formal", "casual", "giza-cotton"];
const popular = popularSlugs
  .map((slug) => collections.find((c) => c.slug === slug))
  .filter((c) => c !== undefined);

const RECENT_KEY = "rilux:recent-searches";
const RECENT_MAX = 5;

function readRecent(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter((s): s is string => typeof s === "string").slice(0, RECENT_MAX) : [];
  } catch {
    return [];
  }
}

function writeRecent(list: string[]) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  } catch {
    // Storage unavailable (private mode); recent searches just won't persist.
  }
}

/** Wraps the parts of `text` that match a query word in a highlighted span. */
function Highlight({ text, query }: { text: string; query: string }) {
  const terms = query.trim().split(/\s+/).filter(Boolean).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!terms.length) return <>{text}</>;
  const parts = text.split(new RegExp(`(${terms.join("|")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="bg-transparent font-semibold text-navy">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

function SectionLabel({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-[14px] flex items-center justify-between gap-4">
      <p className="font-ui text-[11px] font-medium uppercase tracking-[0.14em] text-stone">{children}</p>
      {action}
    </div>
  );
}

/** Text row link with an arrow that slides in on hover. */
function RowLink({ href, onClick, icon, children }: { href: string; onClick: () => void; icon?: ReactNode; children: ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-center gap-[10px] py-[7px] font-ui text-[14px] text-ink"
    >
      {icon}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      <ArrowRight
        size={14}
        aria-hidden
        className="flex-none -translate-x-[4px] opacity-0 transition-all duration-[250ms] ease-theme group-hover:translate-x-0 group-hover:opacity-100"
      />
    </Link>
  );
}

function SearchProductCard({ product, query, onNavigate }: { product: Product; query: string; onNavigate: () => void }) {
  return (
    <Link href={routes.product(product.slug)} onClick={onNavigate} className="group flex flex-col">
      <span className="relative block aspect-[4/5] overflow-hidden rounded-[4px]">
        <Placeholder tone={product.tone} className="transition-transform duration-500 ease-theme group-hover:scale-[1.04]" />
        {product.tag && (
          <span className="absolute left-[8px] top-[8px] rounded-[3px] bg-white/90 px-[6px] py-[3px] font-ui text-[9.5px] uppercase tracking-[0.1em] text-ink">
            {product.tag}
          </span>
        )}
      </span>
      <span className="mt-[10px] truncate font-display text-[16px] capitalize leading-tight text-ink">
        <Highlight text={product.title} query={query} />
      </span>
      <span className="mt-[4px] flex items-baseline justify-between gap-2 font-ui text-[12px]">
        <span className="truncate text-stone">{product.category}</span>
        <span className="flex-none text-ink">{product.price}</span>
      </span>
    </Link>
  );
}

/** Drop-down search panel from the top of the viewport with live results. */
export function SearchOverlay() {
  const { openPanel, setOpenPanel } = useStore();
  const open = openPanel === "search";
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  const q = query.trim();
  const results = q ? searchProducts(q) : [];
  const matchedCollections = q ? searchCollections(q) : [];
  const close = () => setOpenPanel(null);

  const remember = (term: string) => {
    const next = [term, ...recent.filter((r) => r.toLowerCase() !== term.toLowerCase())].slice(0, RECENT_MAX);
    setRecent(next);
    writeRecent(next);
  };

  const clearRecent = () => {
    setRecent([]);
    writeRecent([]);
  };

  useEffect(() => {
    if (!open) return;
    // Wait a frame so the panel is visible (no longer `invisible`) before focusing.
    const raf = requestAnimationFrame(() => {
      setRecent(readRecent());
      inputRef.current?.focus();
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPanel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpenPanel]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!q) return;
    remember(q);
    close();
    router.push(routes.search(q));
  };

  // Navigating away from a typed query counts as a search worth remembering.
  const onResultClick = () => {
    if (q) remember(q);
    close();
  };

  const noResults = q && results.length === 0 && matchedCollections.length === 0;
  const showResults = results.length > 0;
  const gridProducts = showResults ? results.slice(0, 8) : trendingProducts;

  return (
    <div
      aria-hidden={!open}
      inert={!open}
      // visibility flips instantly on open and only after the 250ms slide-out on close
      className={cn(
        "fixed inset-0 z-[65] transition-[visibility] duration-[250ms]",
        open ? "visible" : "pointer-events-none invisible",
      )}
    >
      <div
        onClick={close}
        className={cn(
          "absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-[250ms] ease-theme",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className={cn(
          "absolute inset-x-0 top-0 max-h-full overflow-y-auto bg-white shadow-[0_12px_40px_rgba(14,38,72,0.12)] transition-transform duration-[250ms] ease-theme",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="mx-auto w-full max-w-[1100px] px-4 pb-10 pt-5 md:px-8 md:pt-8">
          <div className="flex items-center gap-3 md:gap-5">
            <form
              onSubmit={onSubmit}
              role="search"
              className="flex h-[52px] min-w-0 flex-1 items-center gap-3 rounded-full border border-transparent bg-linen px-[18px] transition-colors duration-[250ms] ease-theme focus-within:border-navy/25 focus-within:bg-white"
            >
              <SearchIcon aria-hidden size={18} strokeWidth={1.5} className="flex-none text-stone" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search shirts, fabrics, fits…"
                aria-label="Search products"
                autoComplete="off"
                className="h-full min-w-0 flex-1 bg-transparent font-ui text-[15px] text-ink outline-none placeholder:text-stone md:text-[16px] [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="flex size-[22px] flex-none items-center justify-center rounded-full bg-black/10 text-ink transition-colors hover:bg-black/20"
                >
                  <X size={11} strokeWidth={2} />
                </button>
              )}
            </form>
            <button
              type="button"
              onClick={close}
              aria-label="Close search"
              className="flex flex-none items-center gap-2 font-ui text-[12px] uppercase tracking-[0.1em] text-ink transition-opacity duration-[250ms] ease-theme hover:opacity-60"
            >
              <span className="hidden rounded-[3px] border border-black/15 px-[5px] py-[1px] text-[10px] text-stone md:inline">Esc</span>
              <X size={20} strokeWidth={1.5} className="md:hidden" />
              <span className="hidden md:inline">Close</span>
            </button>
          </div>

          {noResults && (
            <p className="mt-8 font-ui text-[14px] text-ink-soft">
              Nothing matches &ldquo;{q}&rdquo;. Try a fabric or fit, or browse what&rsquo;s trending below.
            </p>
          )}

          <div className="mt-8 grid gap-8 md:grid-cols-[200px_1fr] md:gap-12">
            <aside className="flex flex-col gap-8">
              {q && matchedCollections.length > 0 ? (
                <div>
                  <SectionLabel>Collections</SectionLabel>
                  <ul>
                    {matchedCollections.map((c) => (
                      <li key={c.slug}>
                        <RowLink href={routes.collection(c.slug)} onClick={onResultClick}>
                          <Highlight text={c.title} query={q} />
                        </RowLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  {!q && recent.length > 0 && (
                    <div>
                      <SectionLabel
                        action={
                          <button
                            type="button"
                            onClick={clearRecent}
                            className="font-ui text-[11px] text-stone underline-offset-2 transition-colors hover:text-ink hover:underline"
                          >
                            Clear
                          </button>
                        }
                      >
                        Recent
                      </SectionLabel>
                      <ul>
                        {recent.map((term) => (
                          <li key={term}>
                            <RowLink
                              href={routes.search(term)}
                              onClick={() => {
                                remember(term);
                                close();
                              }}
                              icon={<Clock size={14} aria-hidden className="flex-none text-stone" />}
                            >
                              {term}
                            </RowLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <SectionLabel>Popular</SectionLabel>
                    <ul>
                      {popular.map((c) => (
                        <li key={c.slug}>
                          <RowLink href={routes.collection(c.slug)} onClick={close}>
                            {c.title}
                          </RowLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </aside>

            <section>
              <SectionLabel
                action={
                  showResults ? (
                    <Link
                      href={routes.search(q)}
                      onClick={onResultClick}
                      className="group inline-flex items-center gap-[6px] font-ui text-[11px] font-medium uppercase tracking-[0.14em] text-ink"
                    >
                      View all {results.length}
                      <ArrowRight size={12} aria-hidden className="transition-transform duration-[250ms] ease-theme group-hover:translate-x-[3px]" />
                    </Link>
                  ) : undefined
                }
              >
                {showResults ? "Products" : "Trending now"}
              </SectionLabel>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-7 lg:grid-cols-4">
                {gridProducts.map((p) => (
                  <li key={p.id}>
                    <SearchProductCard product={p} query={showResults ? q : ""} onNavigate={showResults ? onResultClick : close} />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
