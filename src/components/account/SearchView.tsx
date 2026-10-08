"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";

import { productGridClass } from "@/components/account/grid";
import { SearchIcon } from "@/components/icons";
import { ProductCard } from "@/components/ProductCard";
import { ProductScroller } from "@/components/ProductScroller";
import { collections, products, routes, searchProducts } from "@/lib/content";

type Sort = "relevance" | "price-asc" | "price-desc";

const suggestionSlugs = ["new-in", "shirts", "trousers", "essentials", "outerwear", "denim"];
const suggestions = suggestionSlugs
  .map((slug) => collections.find((c) => c.slug === slug))
  .filter((c) => c !== undefined);

export function SearchView({ query }: { query: string }) {
  const router = useRouter();
  const [input, setInput] = useState(query);
  const [sort, setSort] = useState<Sort>("relevance");

  const results = useMemo(() => {
    const found = searchProducts(query);
    if (sort === "price-asc") return [...found].sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "price-desc") return [...found].sort((a, b) => b.priceValue - a.priceValue);
    return found;
  }, [query, sort]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(routes.search(input.trim() || undefined));
  }

  const hasQuery = query.trim().length > 0;

  return (
    <div className="pb-[64px]">
      <div className="mx-auto w-full max-w-[640px] px-[16px] pb-[24px] pt-[40px]">
        <form onSubmit={onSubmit} role="search" className="flex">
          <label htmlFor="search-q" className="sr-only">
            Search products
          </label>
          <input
            id="search-q"
            type="search"
            name="q"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search our store"
            autoComplete="off"
            className="h-[48px] min-w-0 flex-1 rounded-l-[4px] border border-r-0 border-black/20 px-[14px] font-ui text-[14px] text-black outline-none transition-colors placeholder:text-stone focus:border-black"
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex h-[48px] w-[56px] shrink-0 items-center justify-center rounded-r-[4px] bg-brand text-white transition-opacity hover:opacity-90"
          >
            <SearchIcon className="size-[18px]" aria-hidden />
          </button>
        </form>

        <div className="mt-[28px] text-center">
          <h1 className="font-display text-[32px] leading-[1.15] text-black md:text-[36px]">
            {hasQuery ? <>Search results for &ldquo;{query}&rdquo;</> : "Search our store"}
          </h1>
          {hasQuery ? (
            <p className="mt-[6px] font-ui text-[14px] text-stone">
              {results.length} {results.length === 1 ? "result" : "results"}
            </p>
          ) : null}
        </div>
      </div>

      {hasQuery && results.length > 0 ? (
        <>
          <div className="mb-[20px] flex items-center justify-end gap-[10px] px-[8px] md:px-[36px]">
            <label htmlFor="search-sort" className="font-ui text-[12px] uppercase tracking-[0.08em] text-stone">
              Sort by
            </label>
            <select
              id="search-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-[38px] rounded-[4px] border border-black/20 bg-white px-[10px] font-ui text-[13px] text-black outline-none focus:border-black"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
            </select>
          </div>
          <ul className={productGridClass}>
            {results.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="mx-auto max-w-[640px] px-[16px] pb-[48px] text-center">
            {hasQuery ? (
              <p className="font-ui text-[14px] text-ink-soft">
                No products matched your search. Check the spelling or try a broader term.
              </p>
            ) : (
              <p className="font-ui text-[14px] text-ink-soft">Enter a keyword above, or browse a collection.</p>
            )}
            <p className="mb-[12px] mt-[24px] font-ui text-[12px] uppercase tracking-[0.08em] text-stone">
              Popular collections
            </p>
            <ul className="flex flex-wrap justify-center gap-[8px]">
              {suggestions.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={routes.collection(c.slug)}
                    className="inline-flex h-[36px] items-center rounded-full border border-black/20 px-[16px] font-ui text-[13px] text-black transition-colors hover:border-black"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ProductScroller title="You might like" items={products.slice(8, 20)} />
        </>
      )}
    </div>
  );
}
