"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "@/components/icons";
import { CartLineItem } from "@/components/CartLineItem";
import { ProductScroller } from "@/components/ProductScroller";
import { CartSummary } from "@/components/checkout/CartSummary";
import { products, routes } from "@/lib/content";
import { useStore } from "@/lib/store";

const headingClass =
  "mb-[32px] mt-[40px] px-6 text-center font-display text-[40px] font-normal uppercase leading-[1.1] text-black";

function CartSkeleton() {
  return (
    <div className="mx-auto grid max-w-[1100px] gap-12 px-6 pb-16 md:grid-cols-[1fr_360px]" aria-hidden>
      <div className="space-y-6">
        <div className="h-[20px] w-full animate-pulse bg-mist" />
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-4">
            <div className="h-[150px] w-[120px] animate-pulse bg-mist" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-2/3 animate-pulse bg-mist" />
              <div className="h-3 w-1/3 animate-pulse bg-mist" />
            </div>
          </div>
        ))}
      </div>
      <div className="h-[420px] animate-pulse bg-mist" />
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
        <h1 className={headingClass}>Your Cart</h1>
        <CartSkeleton />
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <h1 className={headingClass}>Your Cart</h1>
        <section className="flex flex-col items-center px-6 pb-12 text-center">
          <span className="flex size-[72px] items-center justify-center rounded-full bg-mist">
            <ShoppingBag size={30} strokeWidth={1.3} aria-hidden />
          </span>
          <p className="mt-5 font-ui text-[16px] text-black">Your cart is empty</p>
          <p className="mt-1.5 font-ui text-[13px] text-stone">Discover our latest shirts in Giza cotton and fine satin.</p>
          <Link
            href={routes.collection("all")}
            className="mt-6 inline-flex h-[50px] items-center justify-center bg-brand px-10 font-ui text-[14px] font-medium uppercase tracking-[0.1em] text-white transition-opacity duration-200 ease-theme hover:opacity-90"
          >
            Continue shopping
          </Link>
        </section>
        <ProductScroller title="Popular Right Now" items={products.slice(0, 10)} />
      </>
    );
  }

  return (
    <>
      <h1 className={headingClass}>Your Cart</h1>
      <div className="mx-auto grid max-w-[1100px] items-start gap-12 px-6 pb-16 md:grid-cols-[1fr_360px]">
        <section aria-label="Cart items">
          <div className="hidden grid-cols-[1fr_140px_100px] border-b border-black/10 pb-3 font-ui text-[12px] uppercase tracking-[0.1em] text-stone sm:grid">
            <span>Product</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Total</span>
          </div>
          <ul>
            {cart.map((line, i) => (
              <li
                key={`${line.productId}-${line.size}-${line.color}`}
                className="border-b border-black/10 py-6"
              >
                <CartLineItem line={line} index={i} size="lg" />
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 font-ui text-[13px]">
            <Link href={routes.collection("all")} className="underline underline-offset-4 hover:text-stone">
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
                <button
                  type="button"
                  onClick={() => setConfirmClear(false)}
                  className="underline underline-offset-4"
                >
                  No
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="text-stone underline underline-offset-4 hover:text-black"
              >
                Clear cart
              </button>
            )}
          </div>
        </section>
        <CartSummary subtotal={cartSubtotal} shirts={cartCount} />
      </div>
      {alsoLike.length > 0 ? <ProductScroller title="You May Also Like" items={alsoLike} /> : null}
    </>
  );
}
