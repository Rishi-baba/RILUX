"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Placeholder } from "@/components/Placeholder";
import { SearchIcon } from "@/components/icons";
import { collections, routes, searchProducts } from "@/lib/content";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const popularSlugs = ["new-in", "shirts", "trousers", "linen"];
const popular = popularSlugs
  .map((slug) => collections.find((c) => c.slug === slug))
  .filter((c) => c !== undefined);

/** Drop-down search panel from the top of the viewport with live results. */
export function SearchOverlay() {
  const { openPanel, setOpenPanel } = useStore();
  const open = openPanel === "search";
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const q = query.trim();
  const results = q ? searchProducts(q) : [];
  const close = () => setOpenPanel(null);

  useEffect(() => {
    if (!open) return;
    // Wait a frame so the panel is visible (no longer `invisible`) before focusing.
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
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
    close();
    router.push(routes.search(q));
  };

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
          "absolute inset-0 bg-black/50 transition-opacity duration-[250ms] ease-theme",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className={cn(
          "absolute inset-x-0 top-0 max-h-full overflow-y-auto bg-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition-transform duration-[250ms] ease-theme",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="mx-auto w-full max-w-[900px] px-4 pb-8 pt-6 md:px-8 md:pt-10">
          <form onSubmit={onSubmit} role="search" className="flex items-center gap-3 border-b border-black">
            <SearchIcon aria-hidden size={20} strokeWidth={1.5} className="flex-none text-ink" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              aria-label="Search products"
              autoComplete="off"
              className="h-[56px] min-w-0 flex-1 bg-transparent font-ui text-[20px] text-ink outline-none placeholder:text-stone [&::-webkit-search-cancel-button]:hidden"
            />
            <button
              type="button"
              onClick={close}
              aria-label="Close search"
              className="flex-none text-ink transition-opacity duration-[250ms] ease-theme hover:opacity-60"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </form>

          {!q && (
            <div className="mt-6">
              <p className="font-ui text-[12px] uppercase tracking-[0.08em] text-stone">Popular</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {popular.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={routes.collection(c.slug)}
                      onClick={close}
                      className="font-sans text-[16px] text-ink transition-opacity duration-[250ms] ease-theme hover:opacity-60"
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {q && results.length === 0 && (
            <p className="mt-6 font-ui text-[14px] text-ink-soft">No results for &ldquo;{q}&rdquo;</p>
          )}

          {results.length > 0 && (
            <div className="mt-6">
              <ul className="grid gap-4 md:grid-cols-2">
                {results.slice(0, 6).map((p) => (
                  <li key={p.id}>
                    <Link
                      href={routes.product(p.slug)}
                      onClick={close}
                      className="group flex items-center gap-4"
                    >
                      <span className="relative h-[70px] w-[56px] flex-none overflow-hidden">
                        <Placeholder tone={p.tone} />
                      </span>
                      <span className="flex min-w-0 flex-col gap-1">
                        <span className="truncate font-display text-[16px] capitalize leading-tight text-ink group-hover:underline">
                          {p.title}
                        </span>
                        <span className="font-ui text-[13px] text-ink-soft">{p.price}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={routes.search(q)}
                onClick={close}
                className="mt-6 inline-block border-b border-black pb-0.5 font-ui text-[13px] uppercase tracking-[0.08em] text-ink transition-opacity duration-[250ms] ease-theme hover:opacity-60"
              >
                View all results ({results.length})
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
