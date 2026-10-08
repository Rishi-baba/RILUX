"use client";

import Link from "next/link";
import { Headphones, RotateCcw, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import { CouponField } from "@/components/checkout/CouponField";
import { COUPON_KEY, couponPercent, discountFor, standardFee } from "@/components/checkout/pricing";
import { useSessionValue } from "@/components/checkout/useSessionValue";
import { formatPrice, freeShippingThreshold, routes, trustPoints } from "@/lib/content";

const trustIcons: LucideIcon[] = [RotateCcw, Headphones, Truck, ShieldCheck];

/** Right-hand summary card on /cart: free-shipping progress, note, coupon, totals, checkout CTA. */
export function CartSummary({ subtotal }: { subtotal: number }) {
  const [coupon] = useSessionValue(COUPON_KEY);
  const pct = couponPercent(coupon);
  const discount = discountFor(subtotal, coupon);
  const shipping = standardFee(subtotal);
  const total = Math.max(0, subtotal - discount) + shipping;
  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <aside className="bg-mist p-[28px] md:sticky md:top-[90px]" aria-label="Order summary">
      <p className="font-ui text-[13px] text-black">
        {remaining > 0 ? (
          <>
            You are <strong className="font-semibold">{formatPrice(remaining)}</strong> away from free shipping
          </>
        ) : (
          "Your order qualifies for free shipping"
        )}
      </p>
      <div
        className="mt-2.5 h-[4px] w-full overflow-hidden rounded-full bg-black/10"
        role="progressbar"
        aria-label="Progress to free shipping"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div
          className="h-full origin-left bg-brand transition-transform duration-500 ease-theme"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>

      <label htmlFor="cart-note" className="mt-6 block font-ui text-[12px] text-stone">
        Add a note to your order
      </label>
      <textarea
        id="cart-note"
        rows={3}
        className="mt-1.5 w-full resize-none rounded-[5px] border border-black/20 bg-white px-[14px] py-3 font-ui text-[14px] text-black outline-none focus:border-black focus:ring-1 focus:ring-black"
      />

      <CouponField className="mt-5" />

      <dl className="mt-6 space-y-2.5 border-t border-black/10 pt-5 font-ui text-[14px]">
        <div className="flex justify-between">
          <dt className="text-ink-soft">Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        {discount > 0 ? (
          <div className="flex justify-between">
            <dt className="text-ink-soft">Discount ({pct}%)</dt>
            <dd className="text-brand">−{formatPrice(discount)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between">
          <dt className="text-ink-soft">Shipping</dt>
          <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between border-t border-black/10 pt-3 text-[16px] font-semibold">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
      <p className="mt-1.5 font-ui text-[11px] text-stone">Taxes included. Final shipping set at checkout.</p>

      <Link
        href={routes.checkout}
        className="mt-5 flex h-[50px] w-full items-center justify-center bg-brand font-ui text-[14px] font-medium uppercase tracking-[0.1em] text-white transition-opacity duration-200 ease-theme hover:opacity-90"
      >
        Checkout
      </Link>

      <ul className="mt-6 grid grid-cols-4 gap-2">
        {trustPoints.map((point, i) => {
          const Icon = trustIcons[i % trustIcons.length];
          return (
            <li key={point.title} className="flex flex-col items-center gap-1.5 text-center">
              <Icon size={20} strokeWidth={1.4} aria-hidden className="text-black" />
              <span className="font-ui text-[10px] leading-tight text-ink-soft">{point.title}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
