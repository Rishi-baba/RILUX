"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "@/components/icons";
import { Placeholder } from "@/components/Placeholder";
import { ProductScroller } from "@/components/ProductScroller";
import { CartSummary } from "@/components/checkout/CartSummary";
import { formatPrice, getProductById, products, routes } from "@/lib/content";
import { useStore } from "@/lib/store";
import type { CartLine } from "@/types/content";

const panel = "rounded-[10px] border border-navy/12";
// Product | Quantity | Total | remove — shared by the header row and every line on sm+ screens
const columns = "sm:grid sm:grid-cols-[minmax(0,1fr)_128px_112px_40px] sm:items-center sm:gap-[16px]";

function PageHeading({ count }: { count?: number }) {
  return (
    <div className="mx-auto max-w-[1180px] px-[16px] pb-[24px] pt-[32px] md:px-[24px] md:pb-[32px] md:pt-[48px]">
      <h1 className="flex items-center gap-[12px] font-display text-[36px] font-semibold leading-none text-navy md:text-[46px]">
        <ShoppingBag className="size-[30px] flex-none md:size-[36px]" weight="regular" aria-hidden />
        Your Cart
        {count ? <span className="font-ui text-[14px] font-normal text-stone md:text-[15px]">({count})</span> : null}
      </h1>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="mx-auto grid max-w-[1180px] gap-[24px] px-[16px] pb-16 md:px-[24px] lg:grid-cols-[1fr_380px]" aria-hidden>
      <div className={`${panel} space-y-6 p-[24px]`}>
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-4">
            <div className="h-[120px] w-[96px] animate-pulse rounded-[6px] bg-mist" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-2/3 animate-pulse bg-mist" />
              <div className="h-3 w-1/3 animate-pulse bg-mist" />
            </div>
          </div>
        ))}
      </div>
      <div className={`${panel} h-[420px] animate-pulse bg-mist`} />
    </div>
  );
}

/** Pill quantity stepper. */
function QuantityStepper({ line, index }: { line: CartLine; index: number }) {
  const { updateQuantity } = useStore();
  const btn = "flex size-[34px] items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5";
  return (
    <div className="inline-flex h-[36px] items-center rounded-full border border-navy/20 px-[1px]">
      <button type="button" onClick={() => updateQuantity(index, line.quantity - 1)} aria-label="Decrease quantity" className={btn}>
        <Minus size={14} />
      </button>
      <span className="w-[26px] text-center font-ui text-[13px] font-medium tabular-nums text-navy" aria-live="polite">
        {line.quantity}
      </span>
      <button type="button" onClick={() => updateQuantity(index, line.quantity + 1)} aria-label="Increase quantity" className={btn}>
        <Plus size={14} />
      </button>
    </div>
  );
}

/** One cart line: thumbnail, name, variant and unit price, quantity, line total, remove. */
function CartRow({ line, index }: { line: CartLine; index: number }) {
  const { removeLine } = useStore();
  const product = getProductById(line.productId);
  if (!product) return null;
  const color = product.colors.find((c) => c.name === line.color);
  const lineTotal = formatPrice(product.priceValue * line.quantity);
  const remove = (
    <button
      type="button"
      onClick={() => removeLine(index)}
      aria-label={`Remove ${product.title}`}
      className="flex size-[36px] items-center justify-center rounded-full text-stone transition-colors hover:bg-navy/5 hover:text-navy"
    >
      <Trash2 size={18} />
    </button>
  );

  return (
    <div className={`flex gap-[16px] ${columns}`}>
      {/* Product */}
      <div className="flex min-w-0 flex-1 gap-[16px]">
        <Link
          href={routes.product(product.slug)}
          className="relative h-[120px] w-[96px] flex-none overflow-hidden rounded-[6px] md:h-[135px] md:w-[108px]"
        >
          <Placeholder tone={color?.tone ?? product.tone} />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col py-[2px]">
          <div className="flex items-start justify-between gap-[8px]">
            <Link
              href={routes.product(product.slug)}
              className="font-display text-[19px] leading-[1.2] text-navy underline-offset-[3px] hover:underline"
            >
              {product.title}
            </Link>
            <span className="-mr-[8px] -mt-[6px] sm:hidden">{remove}</span>
          </div>
          <p className="mt-[4px] font-ui text-[12px] text-stone">
            {line.color} / {line.size}
          </p>
          <p className="mt-[6px] font-ui text-[13px] text-ink-soft">{product.price}</p>
          {/* Phones: quantity and total under the details */}
          <div className="mt-auto flex items-center justify-between pt-[12px] sm:hidden">
            <QuantityStepper line={line} index={index} />
            <span className="font-ui text-[15px] font-medium text-navy">{lineTotal}</span>
          </div>
        </div>
      </div>
      {/* sm+: table columns */}
      <div className="hidden justify-center sm:flex">
        <QuantityStepper line={line} index={index} />
      </div>
      <span className="hidden text-right font-ui text-[15px] font-medium text-navy sm:block">{lineTotal}</span>
      <span className="hidden justify-end sm:flex">{remove}</span>
    </div>
  );
}

export default function CartPage() {
  const { cart, cartSubtotal, cartCount, clearCart, hydrated } = useStore();
  const [confirmClear, setConfirmClear] = useState(false);

  const alsoLike = useMemo(() => {
    const inCart = new Set(cart.map((l) => l.productId));
    return products.filter((p) => !inCart.has(p.id)).slice(0, 10);
  }, [cart]);

  if (!hydrated) {
    return (
      <>
        <PageHeading />
        <CartSkeleton />
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <PageHeading />
        <section className="mx-auto max-w-[1180px] px-[16px] pb-12 md:px-[24px]">
          <div className={`${panel} flex flex-col items-center px-6 py-[56px] text-center`}>
            <span className="flex size-[72px] items-center justify-center rounded-full bg-cream text-navy">
              <ShoppingBag size={30} aria-hidden />
            </span>
            <p className="mt-5 font-display text-[24px] text-navy">Your cart is empty</p>
            <p className="mt-1.5 font-ui text-[13px] text-stone">Discover our latest shirts in Giza cotton and fine satin.</p>
            <Link
              href={routes.collection("all")}
              className="mt-6 inline-flex h-[50px] items-center justify-center bg-navy px-10 font-ui text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-opacity duration-200 ease-theme hover:opacity-90"
            >
              Continue shopping
            </Link>
          </div>
        </section>
        <ProductScroller title="Popular Right Now" items={products.slice(0, 10)} />
      </>
    );
  }

  return (
    <>
      <PageHeading count={cartCount} />
      <div className="mx-auto grid max-w-[1180px] items-start gap-[24px] px-[16px] pb-[56px] md:px-[24px] lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-[32px]">
        <section aria-label="Cart items">
          <div className={`${panel} px-[16px] md:px-[28px]`}>
            <div
              className={`hidden border-b border-navy/10 py-[18px] font-ui text-[11px] font-semibold uppercase tracking-[0.16em] text-stone ${columns}`}
            >
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
              <span aria-hidden />
            </div>
            <ul className="divide-y divide-navy/10">
              {cart.map((line, i) => (
                <li key={`${line.productId}-${line.size}-${line.color}`} className="py-[20px] md:py-[24px]">
                  <CartRow line={line} index={i} />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-[18px] flex flex-wrap items-center justify-between gap-4 px-[4px] font-ui text-[13px]">
            <Link
              href={routes.collection("all")}
              className="inline-flex items-center gap-[8px] text-navy underline-offset-4 hover:underline"
            >
              <ArrowLeft size={15} aria-hidden />
              Continue shopping
            </Link>
            {confirmClear ? (
              <span className="flex items-center gap-3" role="group" aria-label="Confirm clear cart">
                <span className="text-ink-soft">Are you sure?</span>
                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                    setConfirmClear(false);
                  }}
                  className="font-semibold text-red-700 underline underline-offset-4"
                >
                  Yes
                </button>
                <button type="button" onClick={() => setConfirmClear(false)} className="underline underline-offset-4">
                  No
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="text-stone underline-offset-4 hover:text-navy hover:underline"
              >
                Clear cart
              </button>
            )}
          </div>
        </section>
        <CartSummary subtotal={cartSubtotal} shirts={cartCount} />
      </div>
      {alsoLike.length > 0 ? (
        <div className="border-t border-navy/10">
          <ProductScroller title="You May Also Like" items={alsoLike} />
        </div>
      ) : null}
    </>
  );
}
