"use client";

import { useMemo, type ReactNode } from "react";
import Link from "next/link";
import { CheckCircle2 } from "@/components/icons";
import { formatAddress } from "@/components/checkout/AddressFields";
import { SummaryLines, TotalsList } from "@/components/checkout/OrderSummary";
import {
  LAST_ORDER_KEY,
  paymentLabels,
  shippingLabels,
  type LastOrder,
} from "@/components/checkout/pricing";
import { useSessionValue } from "@/components/checkout/useSessionValue";
import { routes } from "@/lib/content";
import { useStore } from "@/lib/store";
import type { CartLine } from "@/types/content";

interface ViewOrder {
  id: string;
  lines: CartLine[];
  subtotal: number;
  discount?: number;
  shipping: number | null;
  total: number;
  detail: Pick<LastOrder, "email" | "address" | "method" | "payment"> | null;
}

function parseLastOrder(raw: string | null): LastOrder | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as LastOrder;
    return parsed && typeof parsed.id === "string" && Array.isArray(parsed.lines) ? parsed : null;
  } catch {
    return null;
  }
}

function InfoBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-ui text-[12px] uppercase tracking-[0.1em] text-stone">{title}</h3>
      <div className="mt-1.5 font-ui text-[14px] leading-[1.6] text-black">{children}</div>
    </div>
  );
}

const buttonBase =
  "inline-flex h-[50px] flex-1 items-center justify-center px-8 font-ui text-[14px] font-medium uppercase tracking-[0.1em] transition-opacity duration-200 ease-theme hover:opacity-90";

export default function CheckoutSuccessPage() {
  const { orders, hydrated } = useStore();
  const [raw] = useSessionValue(LAST_ORDER_KEY);

  const order = useMemo<ViewOrder | null>(() => {
    const last = parseLastOrder(raw);
    if (last) {
      return {
        id: last.id,
        lines: last.lines,
        subtotal: last.subtotal,
        discount: last.discount,
        shipping: last.shipping,
        total: last.total,
        detail: { email: last.email, address: last.address, method: last.method, payment: last.payment },
      };
    }
    const latest = orders[0];
    if (!latest) return null;
    return {
      id: latest.id,
      lines: latest.lines,
      subtotal: latest.total,
      shipping: null,
      total: latest.total,
      detail: null,
    };
  }, [raw, orders]);

  if (!hydrated && !order) {
    return (
      <div className="mx-auto max-w-[720px] space-y-4 px-6 py-16" aria-hidden>
        <div className="mx-auto size-[56px] animate-pulse rounded-full bg-mist" />
        <div className="mx-auto h-8 w-48 animate-pulse bg-mist" />
        <div className="h-[240px] animate-pulse bg-mist" />
      </div>
    );
  }

  if (!order) {
    return (
      <section className="mx-auto flex max-w-[560px] flex-col items-center px-6 py-20 text-center">
        <h1 className="font-display text-[36px] uppercase leading-tight text-black">No recent order</h1>
        <p className="mt-3 font-ui text-[14px] text-ink-soft">
          We couldn&apos;t find a recent order in this session. Take another look at the collection.
        </p>
        <Link href={routes.home} className={`${buttonBase} mt-8 flex-none bg-brand text-white`}>
          Back to home
        </Link>
      </section>
    );
  }

  const { detail } = order;

  return (
    <section className="mx-auto max-w-[720px] px-6 pb-16 pt-12">
      <div className="flex flex-col items-center text-center">
        <CheckCircle2 size={56} strokeWidth={1.2} className="text-brand" aria-hidden />
        <h1 className="mt-4 font-display text-[40px] font-normal leading-[1.1] text-black">Thank you!</h1>
        <p className="mt-2 font-ui text-[15px] font-medium text-black">Order {order.id} is confirmed</p>
        <p className="mt-2 max-w-[460px] font-ui text-[13px] text-ink-soft">
          We&apos;ll send you an update as soon as your shirts are on their way. Demo store — no payment was
          taken.
        </p>
      </div>

      {detail ? (
        <div className="mt-10 grid gap-6 rounded-[5px] border border-black/15 p-6 sm:grid-cols-2">
          <InfoBlock title="Contact">{detail.email}</InfoBlock>
          <InfoBlock title="Payment">{paymentLabels[detail.payment]}</InfoBlock>
          <InfoBlock title="Shipping address">
            {formatAddress(detail.address).map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </InfoBlock>
          <InfoBlock title="Shipping method">{shippingLabels[detail.method]}</InfoBlock>
        </div>
      ) : null}

      <div className="mt-6 bg-mist p-6">
        <h2 className="mb-5 font-ui text-[16px] font-semibold text-black">Order summary</h2>
        <SummaryLines lines={order.lines} />
        <div className="mt-6 border-t border-black/10 pt-6">
          <TotalsList
            totals={{
              subtotal: order.subtotal,
              discount: order.discount,
              shipping: order.shipping,
              total: order.total,
            }}
            shippingPending="—"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href={routes.collection("all")} className={`${buttonBase} bg-brand text-white`}>
          Continue shopping
        </Link>
        <Link href={routes.account} className={`${buttonBase} border border-black text-black`}>
          View my account
        </Link>
      </div>
    </section>
  );
}
