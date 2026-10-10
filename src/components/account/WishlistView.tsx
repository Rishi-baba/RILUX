"use client";

import Link from "next/link";
import { Heart, X } from "@/components/icons";

import { productGridClass } from "@/components/account/grid";
import { ProductCard } from "@/components/ProductCard";
import { ProductScroller } from "@/components/ProductScroller";
import { getProductById, products, routes } from "@/lib/content";
import { useStore } from "@/lib/store";
import type { Product } from "@/types/content";

export function WishlistView() {
  const { wishlist, hydrated, toggleWishlist, addToCart, setOpenPanel, notify } = useStore();

  const items = wishlist
    .map((id) => getProductById(id))
    .filter((p): p is Product => Boolean(p));

  function moveToCart(p: Product) {
    addToCart({ productId: p.id, size: p.sizes[0] ?? "", color: p.colors[0]?.name ?? "" });
    toggleWishlist(p.id);
    notify("Moved to cart");
    setOpenPanel("cart");
  }

  return (
    <div className="pb-[64px]">
      <header className="px-[16px] pb-[32px] pt-[48px] text-center">
        <h1 className="font-display text-[40px] uppercase leading-[1.05] text-black">Wishlist</h1>
        <p className="mt-[6px] min-h-[21px] font-ui text-[14px] text-stone">
          {hydrated ? `${items.length} ${items.length === 1 ? "item" : "items"}` : ""}
        </p>
      </header>

      {!hydrated ? (
        <div className={productGridClass} aria-busy="true">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="aspect-[304/380] animate-pulse bg-mist" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <>
          <div className="flex flex-col items-center px-[16px] pb-[56px] pt-[8px] text-center">
            <span className="flex size-[64px] items-center justify-center rounded-full bg-mist">
              <Heart className="size-[26px]" strokeWidth={1.25} aria-hidden />
            </span>
            <p className="mt-[18px] font-display text-[24px] text-black">Your wishlist is empty</p>
            <p className="mt-[6px] font-ui text-[14px] text-stone">Tap the heart on any product to save it here.</p>
            <Link
              href={routes.collection("all")}
              className="mt-[24px] flex h-[50px] items-center justify-center bg-brand px-[36px] font-ui text-[14px] uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
            >
              Discover products
            </Link>
          </div>
          <ProductScroller title="Trending Now" items={products.slice(0, 12)} />
        </>
      ) : (
        <ul className={productGridClass}>
          {items.map((p) => (
            <li key={p.id} className="flex flex-col">
              <ProductCard product={p} />
              <div className="flex items-center gap-[8px] px-[8px]">
                <button
                  type="button"
                  onClick={() => moveToCart(p)}
                  className="flex h-[40px] flex-1 items-center justify-center border border-black font-ui text-[12px] uppercase tracking-[0.08em] text-black transition-colors duration-200 ease-theme hover:bg-navy hover:border-navy hover:text-white"
                >
                  Move to cart
                </button>
                <button
                  type="button"
                  aria-label={`Remove ${p.title} from wishlist`}
                  onClick={() => {
                    toggleWishlist(p.id);
                    notify("Removed from wishlist");
                  }}
                  className="flex size-[40px] shrink-0 items-center justify-center border border-black/20 text-black transition-colors hover:border-black"
                >
                  <X className="size-[16px]" aria-hidden />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
