"use client";

import Link from "next/link";
import { useState } from "react";
import { CartLineItem } from "@/components/CartLineItem";
import { Placeholder } from "@/components/Placeholder";
import { RewardsProgress } from "@/components/RewardsProgress";
import { SidePanel } from "@/components/SidePanel";
import { Stars } from "@/components/Stars";
import { rewardDiscount, rewardPercent } from "@/components/checkout/pricing";
import { BagIcon, Plus } from "@/components/icons";
import { useSamplePreview } from "@/hooks/useSamplePreview";
import { formatPrice, products, productsIn, routes, storeRating } from "@/lib/content";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/content";

const button =
  "flex h-[46px] w-full items-center justify-center font-ui text-[13px] font-medium uppercase tracking-[0.12em] transition-opacity duration-[250ms] ease-theme hover:opacity-90";

/** Compact recommendation card with a size picker for one-tap add. */
function SuggestionCard({ product, onNavigate, className }: { product: Product; onNavigate: () => void; className?: string }) {
  const { addToCart, notify } = useStore();
  const [picking, setPicking] = useState(false);

  return (
    <div className={className}>
      <Link href={routes.product(product.slug)} onClick={onNavigate} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Placeholder tone={product.tone} />
        </div>
        <p className="mt-[8px] line-clamp-2 font-display text-[14px] leading-[1.2] text-navy">{product.title}</p>
        <p className="mt-[3px] font-ui text-[12px] text-ink">{product.price}</p>
      </Link>
      {picking ? (
        <div className="mt-[8px] flex flex-wrap gap-[4px]" role="group" aria-label={`Choose a size for ${product.title}`}>
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => {
                addToCart({ productId: product.id, size, color: product.colors[0]?.name ?? "" });
                notify(`Added ${product.title} (${size})`);
                setPicking(false);
              }}
              className="h-[26px] min-w-[28px] border border-navy/25 bg-white px-[4px] font-ui text-[10.5px] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              {size}
            </button>
          ))}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setPicking(true)}
          className="mt-[8px] flex h-[30px] w-full items-center justify-center gap-[4px] border border-navy font-ui text-[10.5px] font-medium uppercase tracking-[0.1em] text-navy transition-colors hover:bg-navy hover:text-white"
        >
          <Plus size={12} weight="bold" aria-hidden />
          Add
        </button>
      )}
    </div>
  );
}

/** Right drawer: reward progress, cart lines, recommendations and checkout. */
export function CartDrawer() {
  const { openPanel, setOpenPanel, cart, cartCount, cartSubtotal, hydrated } = useStore();
  const preview = useSamplePreview();
  const close = () => setOpenPanel(null);

  const lines = hydrated ? cart : [];
  const count = hydrated ? cartCount : 0;
  const subtotal = hydrated ? cartSubtotal : 0;
  const discount = rewardDiscount(subtotal, count);
  const percent = rewardPercent(count);

  const inCart = new Set(lines.map((l) => l.productId));
  const suggestions = [...productsIn("new-in"), ...products]
    .filter((p, i, all) => !inCart.has(p.id) && all.findIndex((x) => x.id === p.id) === i)
    .slice(0, 8);

  const footer =
    lines.length > 0 ? (
      <div>
        <dl className="space-y-[6px] font-ui text-[13px] text-ink">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          {discount > 0 ? (
            <div className="flex justify-between text-[#2f6b3a]">
              <dt>Multi-shirt offer ({percent}% off)</dt>
              <dd>−{formatPrice(discount)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between text-[15px] font-semibold text-navy">
            <dt>Total</dt>
            <dd>{formatPrice(subtotal - discount)}</dd>
          </div>
        </dl>
        <p className="mt-[2px] font-ui text-[11px] text-stone">Free shipping. Taxes included.</p>
        <Link href={routes.checkout} onClick={close} className={cn(button, "mt-[12px] bg-navy text-white")}>
          Checkout · {formatPrice(subtotal - discount)}
        </Link>
        {preview ? (
          <div className="mt-[10px] flex items-center justify-center gap-[8px] font-ui text-[11.5px] text-ink-soft">
            <Stars rating={storeRating.rating} size={12} />
            <span>
              <strong className="font-semibold text-navy">{storeRating.rating}</strong>/5 from{" "}
              <strong className="font-semibold text-navy">{storeRating.customers}</strong> happy customers
            </span>
          </div>
        ) : null}
      </div>
    ) : undefined;

  return (
    <SidePanel
      open={openPanel === "cart"}
      onClose={close}
      title={`Your Cart (${count})`}
      footer={footer}
      className="md:max-w-[380px]"
    >
      {lines.length > 0 ? (
        <>
          <RewardsProgress shirts={count} className="border-b border-navy/10 bg-[#faf7ef] px-[18px] pt-[14px]" />
          <ul className="flex flex-col divide-y divide-navy/10 px-[18px]">
            {lines.map((line, i) => (
              <li key={`${line.productId}-${line.size}-${line.color}`} className="py-[14px]">
                <CartLineItem line={line} index={i} onNavigate={close} size="xs" />
              </li>
            ))}
          </ul>
          {/* Recommendations scroll sideways below the cart lines */}
          <div className="border-t border-navy/10 bg-[#faf7ef] py-[16px]">
            <p className="px-[18px] font-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-navy">You may also like</p>
            <div className="scrollbar-none mt-[12px] flex gap-[12px] overflow-x-auto px-[18px]">
              {suggestions.map((p) => (
                <SuggestionCard key={p.id} product={p} onNavigate={close} className="w-[136px] flex-none" />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-5 py-16 text-center">
          <BagIcon aria-hidden size={44} className="text-navy" />
          <p className="font-display text-[24px] text-navy">Your cart is empty</p>
          <p className="max-w-[240px] font-ui text-[12.5px] leading-[1.6] text-ink-soft">
            Buy 2 shirts and get 10% off. Buy 3 or more and get 15% off.
          </p>
          <Link
            href={routes.collection("all")}
            onClick={close}
            className={cn(button, "mt-2 w-auto bg-navy px-8 text-white")}
          >
            Shop shirts
          </Link>
        </div>
      )}
    </SidePanel>
  );
}
