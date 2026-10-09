"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/content";
import { CollectionToolbar, type Density } from "./CollectionToolbar";
import { FilterDrawer } from "./FilterDrawer";
import {
  activeFilterCount,
  applyFilters,
  buildFacets,
  buildQuery,
  emptyFilters,
  parseQuery,
  sortProducts,
  type Filters,
  type SortValue,
  attributeFacets,
  type ListKey,
} from "./filters";

const PAGE_SIZE = 12;

/** URL-synced listing: sort + filters live in the query string. */
export function CollectionListing({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { sort, filters } = useMemo(
    () => parseQuery(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const update = useCallback(
    (nextSort: SortValue, nextFilters: Filters) => {
      const qs = buildQuery(new URLSearchParams(searchParams.toString()), nextSort, nextFilters);
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  return (
    <ListingView
      products={products}
      sort={sort}
      filters={filters}
      onSortChange={(s) => update(s, filters)}
      onFiltersChange={(f) => update(sort, f)}
    />
  );
}

/** Server-rendered stand-in shown until the search params are available on the client. */
export function CollectionListingFallback({ products }: { products: Product[] }) {
  return (
    <ListingView
      products={products}
      sort="featured"
      filters={emptyFilters}
      onSortChange={() => {}}
      onFiltersChange={() => {}}
    />
  );
}

function ListingView({
  products,
  sort,
  filters,
  onSortChange,
  onFiltersChange,
}: {
  products: Product[];
  sort: SortValue;
  filters: Filters;
  onSortChange: (sort: SortValue) => void;
  onFiltersChange: (filters: Filters) => void;
}) {
  const [density, setDensity] = useState<Density>("dense");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const facets = useMemo(() => buildFacets(products), [products]);
  const results = useMemo(
    () => sortProducts(applyFilters(products, filters), sort),
    [products, filters, sort],
  );

  // Reset pagination whenever the result set changes.
  const signature = `${sort}|${JSON.stringify(filters)}`;
  const [paging, setPaging] = useState({ signature, count: PAGE_SIZE });
  const visibleCount = paging.signature === signature ? paging.count : PAGE_SIZE;
  const visible = results.slice(0, visibleCount);

  const chips = activeChips(filters, onFiltersChange);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      <CollectionToolbar
        filterCount={activeFilterCount(filters)}
        onOpenFilters={() => setDrawerOpen(true)}
        density={density}
        onDensityChange={setDensity}
        sort={sort}
        onSortChange={onSortChange}
        count={results.length}
      />

      {chips.length ? (
        <div className="flex flex-wrap items-center gap-[8px] px-4 pt-[16px] md:px-[36px]">
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={chip.remove}
              aria-label={`Remove filter ${chip.label}`}
              className="flex h-[32px] items-center gap-[6px] rounded-full bg-mist px-[12px] font-ui text-[12px] text-ink transition-colors hover:bg-black/10"
            >
              {chip.label}
              <X size={14} strokeWidth={1.5} aria-hidden />
            </button>
          ))}
          <button
            type="button"
            onClick={() => onFiltersChange(emptyFilters)}
            className="px-[6px] font-ui text-[12px] text-ink underline underline-offset-2 hover:opacity-60"
          >
            Clear all
          </button>
        </div>
      ) : null}

      <section aria-label="Products" className="px-[8px] pb-[24px] pt-[24px] md:px-[36px]">
        {results.length ? (
          <>
            <ul
              className={cn(
                "grid gap-x-[6px] gap-y-[32px]",
                density === "dense" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 md:grid-cols-2",
              )}
            >
              {visible.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
            <div className="mt-[40px] flex flex-col items-center gap-[14px]">
              <p className="font-ui text-[13px] text-stone" aria-live="polite">
                Showing {visible.length} of {results.length}
              </p>
              {visible.length < results.length ? (
                <button
                  type="button"
                  onClick={() => setPaging({ signature, count: visibleCount + PAGE_SIZE })}
                  className="h-[46px] min-w-[200px] border border-ink px-[28px] font-ui text-[14px] text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  Load more
                </button>
              ) : null}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-[16px] py-[80px] text-center">
            <p className="font-display text-[22px] uppercase text-ink">No products found</p>
            <p className="font-ui text-[13px] text-stone">Try removing a filter to see more results.</p>
            <button
              type="button"
              onClick={() => onFiltersChange(emptyFilters)}
              className="h-[46px] border border-ink px-[28px] font-ui text-[14px] text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <FilterDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        facets={facets}
        filters={filters}
        onApply={(f) => {
          onFiltersChange(f);
          setDrawerOpen(false);
        }}
      />
    </>
  );
}

function activeChips(f: Filters, onChange: (f: Filters) => void) {
  const chips: { key: string; label: string; remove: () => void }[] = [];
  if (f.priceMin !== null || f.priceMax !== null) {
    const short = (n: number) => formatPrice(n).replace(/\.00$/, "");
    const label =
      f.priceMax === null
        ? `Price: ${short(f.priceMin ?? 0)}+`
        : `Price: ${short(f.priceMin ?? 0)} – ${short(f.priceMax)}`;
    chips.push({
      key: "price",
      label,
      remove: () => onChange({ ...f, priceMin: null, priceMax: null }),
    });
  }
  const add = (key: ListKey, prefix?: string) =>
    f[key].forEach((v) =>
      chips.push({
        key: `${key}-${v}`,
        label: prefix ? `${prefix}: ${v}` : v,
        remove: () => onChange({ ...f, [key]: f[key].filter((x) => x !== v) }),
      }),
    );
  // catalogue values read on their own ("Formal", "Half Sleeve", "Concealed Placket")
  attributeFacets.forEach((facet) => add(facet.key));
  add("sizes", "Size");
  return chips;
}
