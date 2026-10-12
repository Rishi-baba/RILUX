"use client";

import Link from "next/link";
import { useState } from "react";
import { Placeholder } from "@/components/Placeholder";
import { SidePanel } from "@/components/SidePanel";
import { Stars } from "@/components/Stars";
import { rewardDiscount, rewardPercent, rewardTiers } from "@/components/checkout/pricing";
import { ArrowRight, BagIcon, Minus, Plus, X } from "@/components/icons";
import { useSamplePreview } from "@/hooks/useSamplePreview";
import { formatPrice, getProductById, products, productsIn, routes, storeRating } from "@/lib/content";
import { useStore } from "@/lib/store";
import type { CartLine, Product } from "@/types/content";
import { cn } from "@/lib/utils";

/** One line of copy and a hairline bar toward the next multi-shirt reward. */
function RewardNote({ shirts }: { shirts: number }) {
  const next = rewardTiers.find((t) => shirts < t.shirts);
  const last = rewardTiers[rewardTiers.length - 1];
  const progress = Math.min(100, (shirts / last.shirts) * 100);
  const left = next ? next.shirts - shirts : 0;

  return (
    <div className="px-[20px] pb-[14px]">
      <p className="font-ui text-[12px] text-ink-soft">
        {next ? (
          <>
            Add {left} more {left === 1 ? "shirt" : "shirts"} for <span className="font-semibold text-navy">{next.label.toLowerCase()}</span>
          </>
        ) : (
          <>
            You&apos;ve unlocked <span className="font-semibold text-navy">15% off</span> and free shipping
          </>
        )}
      </p>
      <div className="relative mb-[18px] ml-[2px] mr-[5px] mt-[12px]">
        <div
          role="progressbar"
          aria-label="Cart rewards progress"
          aria-valuemin={0}
          aria-valuemax={last.shirts}
          aria-valuenow={Math.min(shirts, last.shirts)}
          className="h-[2px] w-full overflow-hidden rounded-full bg-navy/10"
        >
          <div className="h-full bg-navy transition-[width] duration-500 ease-theme" style={{ width: `${progress}%` }} />
        </div>
        {/* One stop per reward tier: filled once unlocked */}
        {rewardTiers.map((tier) => {
          const unlocked = shirts >= tier.shirts;
          return (
            <div
              key={tier.label}
              className="absolute top-[1px] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(tier.shirts / last.shirts) * 100}%` }}
            >
              <span
                className={cn(
                  "block size-[9px] rounded-full border transition-colors duration-300",
                  unlocked ? "border-navy bg-navy" : "border-navy/25 bg-white",
                )}
              />
              <span
                className={cn(
                  "absolute top-[13px] whitespace-nowrap font-ui text-[10px]",
                  tier === last ? "right-0" : "left-1/2 -translate-x-1/2",
                  unlocked ? "text-navy" : "text-stone",
                )}
              >
                {tier.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Cart row: thumbnail, name, shade and size, quantity stepper, line price and remove. */
function DrawerLine({ line, index, onNavigate }: { line: CartLine; index: number; onNavigate: () => void }) {
  const { updateQuantity, removeLine } = useStore();
  const product = getProductById(line.productId);
  if (!product) return null;
  const color = product.colors.find((c) => c.name === line.color);
  const stepBtn = "flex h-full w-[28px] items-center justify-center text-ink transition-colors hover:text-navy disabled:opacity-30";

  return (
    <div className="flex gap-[14px] py-[18px]">
      <Link href={routes.product(product.slug)} onClick={onNavigate} className="relative h-[100px] w-[80px] flex-none overflow-hidden rounded-[4px]">
        <Placeholder tone={color?.tone ?? product.tone} />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={routes.product(product.slug)}
            onClick={onNavigate}
            className="line-clamp-2 font-display text-[16px] capitalize leading-[1.2] text-navy hover:underline"
          >
            {product.title}
          </Link>
          <span className="flex-none font-ui text-[13px] text-navy">{formatPrice(product.priceValue * line.quantity)}</span>
        </div>
        <p className="mt-[4px] font-ui text-[12px] text-stone">
          {line.color} · {line.size}
        </p>
        <div className="mt-auto flex items-center justify-between pt-[10px]">
          <div className="inline-flex h-[30px] items-center rounded-full border border-black/15">
            <button type="button" onClick={() => updateQuantity(index, line.quantity - 1)} aria-label="Decrease quantity" className={stepBtn}>
              <Minus size={12} />
            </button>
            <span className="w-[20px] text-center font-ui text-[12px] tabular-nums text-ink" aria-live="polite">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(index, line.quantity + 1)}
              disabled={line.quantity >= 10}
              aria-label="Increase quantity"
              className={stepBtn}
            >
              <Plus size={12} />
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeLine(index)}
            aria-label={`Remove ${product.title}`}
            className="font-ui text-[11px] text-stone underline underline-offset-[3px] transition-colors hover:text-navy"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

/** Compact recommendation: tapping + swaps the name row for a one-tap size picker. */
function SuggestionCard({ product, onNavigate }: { product: Product; onNavigate: () => void }) {
  const { addToCart } = useStore();
  const [picking, setPicking] = useState(false);

  return (
    <div className="flex w-[120px] flex-none snap-start flex-col">
      <Link href={routes.product(product.slug)} onClick={onNavigate} className="relative block aspect-[4/5] overflow-hidden rounded-[4px]" aria-label={product.title}>
        <Placeholder tone={product.tone} />
      </Link>
      {picking ? (
        <div role="group" aria-label={`Choose a size for ${product.title}`} className="mt-[8px]">
          <div className="grid grid-cols-5 gap-[2px]">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  addToCart({ productId: product.id, size, color: product.colors[0]?.name ?? "" });
                  setPicking(false);
                }}
                className="h-[24px] rounded-[3px] border border-black/15 font-ui text-[9.5px] text-ink transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                {size}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPicking(false)}
            className="mt-[4px] font-ui text-[10.5px] text-stone transition-colors hover:text-navy"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="mt-[8px] flex items-start justify-between gap-[6px]">
          <Link href={routes.product(product.slug)} onClick={onNavigate} className="min-w-0">
            <span className="line-clamp-1 font-display text-[14px] capitalize leading-[1.2] text-navy">{product.title}</span>
            <span className="mt-[2px] block font-ui text-[11.5px] text-ink-soft">{product.price}</span>
          </Link>
          <button
            type="button"
            onClick={() => setPicking(true)}
            aria-label={`Add ${product.title} to cart`}
            className="flex size-[26px] flex-none items-center justify-center rounded-full border border-black/15 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
          >
            <Plus size={12} />
          </button>
        </div>
      )}
    </div>
  );
}

/** Right drawer: plain header with reward note, divided cart lines, suggestions and checkout. */
export function CartDrawer() {
  const { openPanel, setOpenPanel, cart, cartCount, cartSubtotal, hydrated } = useStore();
  const preview = useSamplePreview();
  const close = () => setOpenPanel(null);

  const lines = hydrated ? cart : [];
  const count = hydrated ? cartCount : 0;
  const subtotal = hydrated ? cartSubtotal : 0;
  const discount = rewardDiscount(subtotal, count);
  const percent = rewardPercent(count);
  const total = subtotal - discount;

  const inCart = new Set(lines.map((l) => l.productId));
  const suggestions = [...productsIn("new-in"), ...products]
    .filter((p, i, all) => !inCart.has(p.id) && all.findIndex((x) => x.id === p.id) === i)
    .slice(0, 8);

  const header = (
    <div className="border-b border-black/10 bg-white">
      <div className="flex h-[64px] items-center justify-between px-[20px]">
        <h2 className="font-display text-[22px] text-navy">
          Cart <span className="font-ui text-[13px] text-stone">({count})</span>
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="-mr-[6px] flex size-[34px] items-center justify-center rounded-full text-ink transition-colors hover:bg-black/5"
        >
          <X size={18} />
        </button>
      </div>
      {lines.length > 0 ? <RewardNote shirts={count} /> : null}
    </div>
  );

  const footer =
    lines.length > 0 ? (
      <div>
        <dl className="flex flex-col gap-[6px] font-ui text-[12.5px] text-ink-soft">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="text-ink">{formatPrice(subtotal)}</dd>
          </div>
          {discount > 0 ? (
            <div className="flex justify-between">
              <dt>Multi-shirt offer ({percent}%)</dt>
              <dd className="text-navy">−{formatPrice(discount)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd className="text-ink">Free</dd>
          </div>
        </dl>
        <div className="mt-[12px] flex items-baseline justify-between border-t border-black/10 pt-[12px]">
          <span className="font-ui text-[13px] font-medium text-navy">Total</span>
          <span className="font-display text-[22px] text-navy">{formatPrice(total)}</span>
        </div>
        <Link
          href={routes.checkout}
          onClick={close}
          className="group mt-[14px] flex h-[50px] w-full items-center justify-center gap-[10px] rounded-[4px] bg-navy font-ui text-[12.5px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#13305a]"
        >
          Checkout
          <ArrowRight size={15} aria-hidden className="transition-transform duration-200 group-hover:translate-x-[3px]" />
        </Link>
        <div className="mt-[10px] flex items-center justify-between font-ui text-[11px] text-stone">
          <span>Taxes included</span>
          <Link href={routes.cart} onClick={close} className="underline underline-offset-[3px] transition-colors hover:text-navy">
            View cart
          </Link>
        </div>
        {preview ? (
          <div className="mt-[12px] flex items-center justify-center gap-[6px] border-t border-black/10 pt-[10px] font-ui text-[11px] text-stone">
            <Stars rating={storeRating.rating} size={11} />
            <span>
              <span className="font-medium text-navy">{storeRating.rating}</span>/5 from {storeRating.customers} customers
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
      header={header}
      footer={footer}
      footerClassName="px-[20px] pb-[16px] pt-[16px]"
      className="md:max-w-[400px]"
    >
      {lines.length > 0 ? (
        <>
          <ul className="divide-y divide-black/10 px-[20px]">
            {lines.map((line, i) => (
              <li key={`${line.productId}-${line.size}-${line.color}`}>
                <DrawerLine line={line} index={i} onNavigate={close} />
              </li>
            ))}
          </ul>

          {/* Recommendations scroll sideways below the cart lines */}
          <section aria-label="You may also like" className="border-t border-black/10 pb-[20px] pt-[18px]">
            <p className="px-[20px] font-ui text-[11px] font-medium uppercase tracking-[0.14em] text-stone">You may also like</p>
            <div className="scrollbar-none mt-[12px] flex snap-x gap-[12px] overflow-x-auto scroll-px-[20px] px-[20px] pb-[4px]">
              {suggestions.map((p) => (
                <SuggestionCard key={p.id} product={p} onNavigate={close} />
              ))}
            </div>
          </section>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center px-6 py-16 text-center">
          <span className="flex size-[64px] items-center justify-center rounded-full bg-linen text-navy">
            <BagIcon size={26} aria-hidden />
          </span>
          <p className="mt-[18px] font-display text-[22px] text-navy">Your cart is empty</p>
          <p className="mt-[6px] max-w-[240px] font-ui text-[12px] leading-[1.6] text-stone">
            Buy 2 shirts and get 10% off. Buy 3 or more and get 15% off.
          </p>
          <Link
            href={routes.collection("all")}
            onClick={close}
            className="mt-[20px] inline-flex h-[44px] items-center rounded-[4px] border border-navy px-[24px] font-ui text-[12px] font-medium uppercase tracking-[0.14em] text-navy transition-colors hover:bg-navy hover:text-white"
          >
            Shop shirts
          </Link>
        </div>
      )}
    </SidePanel>
  );
}
