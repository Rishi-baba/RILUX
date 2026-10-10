"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight as PhArrowRight, Sparkle, Tag } from "@phosphor-icons/react/ssr";
import { Crown } from "@/components/Logo";
import { Placeholder } from "@/components/Placeholder";
import { RewardsProgress } from "@/components/RewardsProgress";
import { SidePanel } from "@/components/SidePanel";
import { Stars } from "@/components/Stars";
import { rewardDiscount, rewardPercent } from "@/components/checkout/pricing";
import { BagIcon, Minus, Plus, X } from "@/components/icons";
import { useSamplePreview } from "@/hooks/useSamplePreview";
import { formatPrice, getProductById, products, productsIn, routes, storeRating } from "@/lib/content";
import { useStore } from "@/lib/store";
import type { CartLine, Product } from "@/types/content";

/** Cart line as a white card: image, name, shade/size chips, stepper, line price, remove. */
function DrawerLine({ line, index, onNavigate }: { line: CartLine; index: number; onNavigate: () => void }) {
  const { updateQuantity, removeLine } = useStore();
  const product = getProductById(line.productId);
  if (!product) return null;
  const color = product.colors.find((c) => c.name === line.color);
  const stepBtn = "flex size-[30px] items-center justify-center rounded-full text-navy transition-colors hover:bg-navy hover:text-white";

  return (
    <div className="relative flex gap-[14px] rounded-[12px] bg-white p-[10px] shadow-[0_1px_0_rgba(14,38,72,0.06),0_6px_18px_-12px_rgba(14,38,72,0.25)]">
      <Link href={routes.product(product.slug)} onClick={onNavigate} className="relative h-[104px] w-[82px] flex-none overflow-hidden rounded-[8px]">
        <Placeholder tone={color?.tone ?? product.tone} />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col pr-[22px]">
        <Link
          href={routes.product(product.slug)}
          onClick={onNavigate}
          className="line-clamp-2 font-display text-[16px] font-medium leading-[1.2] text-navy hover:underline"
        >
          {product.title}
        </Link>
        <div className="mt-[6px] flex flex-wrap gap-[4px] font-ui text-[10.5px] text-ink-soft">
          <span className="rounded-full bg-cream px-[8px] py-[2px]">{line.color}</span>
          <span className="rounded-full bg-cream px-[8px] py-[2px]">Size {line.size}</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-[10px]">
          <div className="inline-flex items-center rounded-full border border-navy/15 p-[1px]">
            <button type="button" onClick={() => updateQuantity(index, line.quantity - 1)} aria-label="Decrease quantity" className={stepBtn}>
              <Minus size={13} weight="bold" />
            </button>
            <span className="w-[24px] text-center font-ui text-[12.5px] font-semibold tabular-nums text-navy" aria-live="polite">
              {line.quantity}
            </span>
            <button type="button" onClick={() => updateQuantity(index, line.quantity + 1)} aria-label="Increase quantity" className={stepBtn}>
              <Plus size={13} weight="bold" />
            </button>
          </div>
          <span className="font-display text-[17px] font-medium text-navy">{formatPrice(product.priceValue * line.quantity)}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => removeLine(index)}
        aria-label={`Remove ${product.title}`}
        className="absolute right-[8px] top-[8px] flex size-[26px] items-center justify-center rounded-full text-stone transition-colors hover:bg-navy/5 hover:text-navy"
      >
        <X size={14} />
      </button>
    </div>
  );
}

/** Recommendation card: a floating + on the image opens a size picker over the photo. */
function SuggestionCard({ product, onNavigate }: { product: Product; onNavigate: () => void }) {
  const { addToCart, notify } = useStore();
  const [picking, setPicking] = useState(false);

  return (
    <div className="flex w-[138px] flex-none snap-start flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_6px_18px_-12px_rgba(14,38,72,0.3)]">
      <div className="relative aspect-[4/5] w-full">
        <Link href={routes.product(product.slug)} onClick={onNavigate} className="absolute inset-0" aria-label={product.title}>
          <Placeholder tone={product.tone} />
        </Link>
        {picking ? (
          <div
            role="group"
            aria-label={`Choose a size for ${product.title}`}
            className="absolute inset-x-[6px] bottom-[6px] rounded-[10px] bg-white/95 p-[6px] shadow-[0_4px_14px_rgba(0,0,0,0.15)] backdrop-blur"
          >
            <div className="mb-[4px] flex items-center justify-between px-[2px] font-ui text-[9.5px] font-semibold uppercase tracking-[0.12em] text-navy">
              Pick size
              <button type="button" onClick={() => setPicking(false)} aria-label="Close size picker" className="text-stone hover:text-navy">
                <X size={12} />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-[3px]">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    addToCart({ productId: product.id, size, color: product.colors[0]?.name ?? "" });
                    notify(`Added ${product.title} (${size})`);
                    setPicking(false);
                  }}
                  className="h-[24px] rounded-[5px] border border-navy/15 font-ui text-[9.5px] font-medium text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setPicking(true)}
            aria-label={`Add ${product.title} to cart`}
            className="absolute bottom-[8px] right-[8px] flex size-[32px] items-center justify-center rounded-full bg-navy text-gold shadow-[0_4px_12px_rgba(14,38,72,0.35)] transition-transform duration-200 hover:scale-110"
          >
            <Plus size={15} weight="bold" />
          </button>
        )}
      </div>
      <Link href={routes.product(product.slug)} onClick={onNavigate} className="flex flex-1 flex-col px-[10px] pb-[10px] pt-[8px]">
        <span className="line-clamp-2 min-h-[34px] font-display text-[14px] leading-[1.2] text-navy">{product.title}</span>
        <span className="mt-auto pt-[4px] font-ui text-[12px] font-medium text-ink">{product.price}</span>
      </Link>
    </div>
  );
}

/** Right drawer: navy header with reward progress, line cards, recommendations and checkout. */
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
    <div className="relative overflow-hidden bg-navy text-cream">
      {/* faint crown watermark */}
      <Crown className="pointer-events-none absolute right-[64px] -top-[22px] w-[104px] text-gold/[0.08]" />
      <div className="relative flex h-[64px] items-center justify-between px-[18px]">
        <h2 className="flex items-center gap-[10px] font-display text-[22px] font-semibold uppercase tracking-[0.06em] text-cream">
          <span className="flex size-[34px] items-center justify-center rounded-full border border-gold/50 text-gold">
            <BagIcon size={18} weight="regular" aria-hidden />
          </span>
          Your Cart
          <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-gold px-[7px] font-ui text-[11px] font-bold tracking-normal text-navy">
            {count}
          </span>
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="flex size-[34px] items-center justify-center rounded-full text-cream transition-colors hover:bg-white/10"
        >
          <X size={20} />
        </button>
      </div>
      {lines.length > 0 ? <RewardsProgress shirts={count} tone="dark" className="relative px-[18px]" /> : null}
    </div>
  );

  const footer =
    lines.length > 0 ? (
      <div>
        <div className="flex items-end justify-between">
          <div>
            <p className="font-ui text-[10.5px] font-semibold uppercase tracking-[0.16em] text-stone">Total</p>
            <p className="font-display text-[28px] font-medium leading-none text-navy">{formatPrice(total)}</p>
          </div>
          {discount > 0 ? (
            <span className="inline-flex items-center gap-[5px] rounded-full bg-gold/25 px-[10px] py-[5px] font-ui text-[11px] font-semibold text-[#7a5f22]">
              <Tag size={13} weight="fill" aria-hidden />
              You save {formatPrice(discount)}
            </span>
          ) : null}
        </div>
        <dl className="mt-[10px] flex flex-wrap gap-x-[14px] gap-y-[2px] font-ui text-[11.5px] text-ink-soft">
          <div className="flex gap-[4px]">
            <dt>Subtotal</dt>
            <dd className="text-ink">{formatPrice(subtotal)}</dd>
          </div>
          {discount > 0 ? (
            <div className="flex gap-[4px] text-[#2f6b3a]">
              <dt>Multi-shirt offer ({percent}% off)</dt>
              <dd>−{formatPrice(discount)}</dd>
            </div>
          ) : null}
        </dl>
        <p className="mt-[2px] font-ui text-[11px] text-stone">Free shipping. Taxes included.</p>
        <Link
          href={routes.checkout}
          onClick={close}
          className="group mt-[12px] flex h-[52px] w-full items-center justify-between rounded-[10px] bg-navy pl-[20px] pr-[8px] font-ui text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#13305a]"
        >
          <span>Checkout · {formatPrice(total)}</span>
          <span className="flex size-[36px] items-center justify-center rounded-[8px] bg-gold text-navy transition-transform duration-200 group-hover:translate-x-[3px]">
            <PhArrowRight size={18} weight="bold" aria-hidden />
          </span>
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
      header={header}
      footer={footer}
      bodyClassName="bg-[#f7f3e9]"
      footerClassName="border-navy/10 px-[18px] pb-[14px] pt-[14px] shadow-[0_-10px_24px_-18px_rgba(14,38,72,0.35)]"
      className="md:max-w-[400px]"
    >
      {lines.length > 0 ? (
        <>
          <ul className="flex flex-col gap-[10px] px-[14px] pt-[14px]">
            {lines.map((line, i) => (
              <li key={`${line.productId}-${line.size}-${line.color}`}>
                <DrawerLine line={line} index={i} onNavigate={close} />
              </li>
            ))}
          </ul>

          {/* Recommendations scroll sideways below the cart lines */}
          <section aria-label="You may also like" className="pb-[18px] pt-[22px]">
            <div className="flex items-center gap-[10px] px-[18px]">
              <Sparkle size={14} weight="fill" className="text-gold-deep" aria-hidden />
              <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-navy">You may also like</p>
              <span className="h-px flex-1 bg-navy/10" aria-hidden />
            </div>
            <div className="scrollbar-none mt-[12px] flex snap-x gap-[10px] overflow-x-auto px-[14px] pb-[4px]">
              {suggestions.map((p) => (
                <SuggestionCard key={p.id} product={p} onNavigate={close} />
              ))}
            </div>
          </section>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center px-6 py-16 text-center">
          <span className="flex size-[88px] items-center justify-center rounded-full bg-navy text-gold shadow-[0_10px_30px_-12px_rgba(14,38,72,0.6)]">
            <Crown className="w-[46px]" />
          </span>
          <p className="mt-[22px] font-display text-[26px] font-medium text-navy">Your cart is empty</p>
          <p className="mt-[8px] max-w-[250px] font-ui text-[12.5px] leading-[1.6] text-ink-soft">
            Buy 2 shirts and get 10% off. Buy 3 or more and get 15% off.
          </p>
          <Link
            href={routes.collection("all")}
            onClick={close}
            className="mt-[22px] inline-flex h-[48px] items-center gap-[10px] rounded-[10px] bg-navy px-[26px] font-ui text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#13305a]"
          >
            Shop shirts
            <PhArrowRight size={16} weight="bold" className="text-gold" aria-hidden />
          </Link>
        </div>
      )}
    </SidePanel>
  );
}
