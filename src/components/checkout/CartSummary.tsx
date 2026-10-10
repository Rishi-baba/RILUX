"use client";

import Link from "next/link";
import { Banknote, Headphones, RefreshCcw, Truck, type IconType } from "@/components/icons";
import { RewardsProgress } from "@/components/RewardsProgress";
import { rewardDiscount, rewardPercent, standardFee } from "@/components/checkout/pricing";
import { formatPrice, routes, trustPoints } from "@/lib/content";

const trustIcons: IconType[] = [Banknote, Truck, RefreshCcw, Headphones];

/** Right-hand summary card on /cart: reward progress, note, totals, checkout CTA. */
export function CartSummary({ subtotal, shirts }: { subtotal: number; shirts: number }) {
  const shipping = standardFee(subtotal);
  const discount = rewardDiscount(subtotal, shirts);
  const total = subtotal - discount + shipping;

  return (
    <aside
      className="rounded-[10px] border border-navy/12 bg-white p-[20px] md:p-[28px] lg:sticky lg:top-[90px]"
      aria-labelledby="order-summary-title"
    >
      <h2 id="order-summary-title" className="font-ui text-[11px] font-semibold uppercase tracking-[0.16em] text-navy">
        Order summary
      </h2>

      <RewardsProgress shirts={shirts} className="mt-[16px] rounded-[8px] bg-[#faf7ef] px-[14px] pt-[12px]" />

      <dl className="mt-[22px] space-y-[10px] font-ui text-[13.5px]">
        <div className="flex justify-between">
          <dt className="text-ink-soft">Subtotal</dt>
          <dd className="text-ink">{formatPrice(subtotal)}</dd>
        </div>
        {discount > 0 ? (
          <div className="flex justify-between text-[#2f6b3a]">
            <dt>Multi-shirt offer ({rewardPercent(shirts)}% off)</dt>
            <dd>−{formatPrice(discount)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between">
          <dt className="text-ink-soft">Shipping</dt>
          <dd className="text-ink">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-navy/10 pt-[14px]">
          <dt className="text-[15px] font-semibold text-navy">Total</dt>
          <dd className="font-display text-[26px] leading-none text-navy">{formatPrice(total)}</dd>
        </div>
      </dl>
      <p className="mt-[6px] font-ui text-[11px] text-stone">Taxes included. Final shipping set at checkout.</p>

      <Link
        href={routes.checkout}
        className="mt-[20px] flex h-[52px] w-full items-center justify-center bg-navy font-ui text-[13px] font-medium uppercase tracking-[0.14em] text-white transition-opacity duration-200 ease-theme hover:opacity-90"
      >
        Checkout
      </Link>

      <label htmlFor="cart-note" className="mt-[22px] block font-ui text-[12px] text-ink-soft">
        Add a note to your order
      </label>
      <textarea
        id="cart-note"
        rows={2}
        className="mt-[6px] w-full resize-none rounded-[6px] border border-navy/15 bg-white px-[12px] py-[10px] font-ui text-[13px] text-ink outline-none transition-colors focus:border-navy"
      />

      <ul className="mt-[20px] grid grid-cols-4 gap-[6px] border-t border-navy/10 pt-[18px]">
        {trustPoints.map((point, i) => {
          const Icon = trustIcons[i % trustIcons.length];
          return (
            <li key={point.title} className="flex flex-col items-center gap-[6px] text-center">
              <Icon size={20} aria-hidden className="text-navy" />
              <span className="font-ui text-[10px] leading-tight text-ink-soft">{point.title}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
