"use client";

import { Placeholder } from "@/components/Placeholder";
import { formatPrice, getProductById } from "@/lib/content";
import type { CartLine } from "@/types/content";

export interface Totals {
  subtotal: number;
  /** multi-shirt reward discount in rupees */
  discount?: number;
  /** null until a shipping method has been chosen */
  shipping: number | null;
  total: number;
}

export function SummaryLines({ lines }: { lines: CartLine[] }) {
  return (
    <ul className="space-y-4">
      {lines.map((line) => {
        const product = getProductById(line.productId);
        if (!product) return null;
        const color = product.colors.find((c) => c.name === line.color);
        return (
          <li key={`${line.productId}-${line.size}-${line.color}`} className="flex items-center gap-4">
            <div className="relative h-[80px] w-[64px] flex-none rounded-[5px] border border-black/10">
              <div className="absolute inset-0 overflow-hidden rounded-[5px]">
                <Placeholder tone={color?.tone ?? product.tone} />
              </div>
              <span className="absolute -right-2 -top-2 flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-ink-soft/80 px-1 font-ui text-[11px] font-medium text-white">
                <span className="sr-only">Quantity </span>
                {line.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-ui text-[14px] font-medium capitalize text-black">{product.title}</p>
              <p className="mt-0.5 font-ui text-[12px] text-stone">
                {line.color} / {line.size}
              </p>
            </div>
            <span className="flex-none font-ui text-[14px] text-black">
              {formatPrice(product.priceValue * line.quantity)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function TotalsList({ totals, shippingPending = "Calculated at next step" }: { totals: Totals; shippingPending?: string }) {
  return (
    <dl className="space-y-2.5 font-ui text-[14px]">
      <div className="flex justify-between">
        <dt className="text-ink-soft">Subtotal</dt>
        <dd>{formatPrice(totals.subtotal)}</dd>
      </div>
      {totals.discount ? (
        <div className="flex justify-between text-[#2f6b3a]">
          <dt>Multi-shirt offer</dt>
          <dd>−{formatPrice(totals.discount)}</dd>
        </div>
      ) : null}
      <div className="flex justify-between">
        <dt className="text-ink-soft">Shipping</dt>
        <dd className={totals.shipping === null ? "text-[12px] text-stone" : undefined}>
          {totals.shipping === null ? shippingPending : totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
        </dd>
      </div>
      <div className="flex items-baseline justify-between pt-3">
        <dt className="text-[16px] font-semibold text-black">Total</dt>
        <dd className="flex items-baseline gap-2">
          <span className="text-[12px] text-stone">INR</span>
          <span className="text-[20px] font-semibold text-black">{formatPrice(totals.total)}</span>
        </dd>
      </div>
    </dl>
  );
}

/** Checkout right column: line items and totals. */
export function OrderSummary({ lines, totals }: { lines: CartLine[]; totals: Totals }) {
  return (
    <div>
      <SummaryLines lines={lines} />
      <div className="mt-6 border-t border-black/10 pt-6">
        <TotalsList totals={totals} />
      </div>
    </div>
  );
}
