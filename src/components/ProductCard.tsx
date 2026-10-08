"use client";

import Link from "next/link";

import { HeartIcon } from "@/components/icons";
import { Placeholder } from "@/components/Placeholder";
import { routes } from "@/lib/content";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/content";

/** Heart toggle shared by product cards. Reflects stored state only once hydrated. */
export function WishlistToggle({
  productId,
  className,
  iconClassName,
  strokeWidth = 1.5,
}: {
  productId: string;
  className?: string;
  iconClassName?: string;
  strokeWidth?: number;
}) {
  const { toggleWishlist, isWishlisted, notify, hydrated } = useStore();
  const active = hydrated && isWishlisted(productId);

  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      onClick={() => {
        toggleWishlist(productId);
        notify(active ? "Removed from wishlist" : "Added to wishlist");
      }}
      className={className}
    >
      <HeartIcon
        className={iconClassName}
        strokeWidth={strokeWidth}
        fill={active ? "currentColor" : "none"}
        aria-hidden
      />
    </button>
  );
}

function QuickAdd({ product }: { product: Product }) {
  const { addToCart, notify, setOpenPanel } = useStore();
  const color = product.colors[0]?.name ?? "";

  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-10 hidden h-[44px] translate-y-full items-center justify-center gap-[6px] bg-white/95 px-[8px] font-ui text-[12px] uppercase tracking-[.1em] text-black transition-transform duration-200 ease-theme group-hover:translate-y-0 focus-within:translate-y-0 md:flex">
      <span className="mr-[4px] whitespace-nowrap">Quick add</span>
      {product.sizes.map((size) => (
        <button
          key={size}
          type="button"
          aria-label={`Add size ${size} to cart`}
          onClick={() => {
            addToCart({ productId: product.id, size, color });
            notify("Added to cart");
            setOpenPanel("cart");
          }}
          className="min-w-[28px] border border-black/20 px-[5px] py-[3px] leading-none transition-colors duration-200 hover:border-black hover:bg-black hover:text-white"
        >
          {size}
        </button>
      ))}
    </div>
  );
}

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <div className={cn("group relative block", className)}>
      <Link href={routes.product(product.slug)} className="block text-black">
        <div className="relative aspect-[304/380] w-full overflow-hidden">
          <Placeholder
            tone={product.tone}
            className="opacity-100 transition-opacity duration-200 ease-theme group-hover:opacity-0"
          />
          <Placeholder
            tone={product.altTone}
            className="opacity-0 transition-opacity duration-200 ease-theme group-hover:opacity-100"
          />
          {product.tag ? (
            <span className="absolute left-[10px] top-[10px] bg-brand px-[8px] py-[3px] font-ui text-[14px] font-normal capitalize text-white">
              {product.tag}
            </span>
          ) : null}
        </div>
        <div className="px-[8px] pb-[12px] pt-[2px]">
          <h3 className="mb-[2px] line-clamp-2 font-display text-[14px] font-normal capitalize leading-[1.15] text-black [font-variant-caps:small-caps]">
            {product.title}
          </h3>
          <p className="font-ui text-[12px] font-normal capitalize leading-[18px] text-stone">
            {product.category}
          </p>
          <p className="mt-[4px] font-ui text-[14px] font-normal leading-[21px] tracking-[0.3px] text-black">
            {product.price}
          </p>
          {product.colorCount ? (
            <p className="mt-[2px] font-ui text-[14px] text-black">
              +{product.colorCount} colours
            </p>
          ) : null}
        </div>
      </Link>
      {product.sizes.length > 0 ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 aspect-[304/380] overflow-hidden">
          <QuickAdd product={product} />
        </div>
      ) : null}
      <WishlistToggle
        productId={product.id}
        className="absolute right-[10px] top-[10px] z-10 text-black"
        iconClassName="size-[18px]"
      />
    </div>
  );
}
