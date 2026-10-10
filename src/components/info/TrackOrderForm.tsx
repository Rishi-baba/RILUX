"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Check } from "@/components/icons";
import { useStore } from "@/lib/store";
import { formatPrice, getProductById, routes } from "@/lib/content";
import type { MockOrder } from "@/types/content";
import { cn } from "@/lib/utils";
import {
  errorProps,
  Field,
  inputClass,
  primaryButtonClass,
  type FieldErrors,
} from "@/components/info/fields";

const steps: MockOrder["status"][] = ["Confirmed", "Packed", "Shipped", "Delivered"];

const normalize = (id: string) => id.trim().replace(/^#/, "").toLowerCase();

const formatDate = (iso: string, addDays: number) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Date to be confirmed";
  d.setDate(d.getDate() + addDays);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

function Timeline({ order }: { order: MockOrder }) {
  const current = steps.indexOf(order.status);
  return (
    <ol aria-label="Order progress" className="flex flex-col gap-0 md:flex-row">
      {steps.map((step, i) => {
        const done = i <= current;
        const last = i === steps.length - 1;
        return (
          <li
            key={step}
            aria-current={i === current ? "step" : undefined}
            className="relative flex gap-4 pb-8 last:pb-0 md:flex-1 md:flex-col md:items-center md:gap-3 md:pb-0 md:text-center"
          >
            {!last ? (
              <span
                aria-hidden
                className={cn(
                  "absolute top-8 left-[15px] h-[calc(100%-32px)] w-[2px] md:top-[15px] md:left-[calc(50%+16px)] md:h-[2px] md:w-[calc(100%-32px)]",
                  i < current ? "bg-brand" : "bg-black/10",
                )}
              />
            ) : null}
            <span
              className={cn(
                "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                done ? "border-brand bg-brand text-white" : "border-black/15 bg-white text-stone",
              )}
            >
              {done ? <Check aria-hidden className="h-4 w-4" strokeWidth={2.5} /> : <span className="font-ui text-[12px]">{i + 1}</span>}
            </span>
            <div>
              <p className={cn("font-ui text-[13px] font-semibold uppercase tracking-[0.06em]", done ? "text-black" : "text-stone")}>
                {step}
                <span className="sr-only">{done ? " (complete)" : " (pending)"}</span>
              </p>
              <p className="mt-0.5 font-ui text-[12px] text-stone">{done ? formatDate(order.createdAt, i) : "Pending"}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function OrderResult({ order }: { order: MockOrder }) {
  return (
    <div className="mt-8 rounded-[6px] border border-black/10 p-5 md:p-8">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-[26px] leading-[1.1] uppercase text-black">Order {order.id}</h2>
        <p className="font-ui text-[13px] text-stone">
          Status: <span className="font-semibold text-brand">{order.status}</span>
        </p>
      </div>
      <Timeline order={order} />
      <div className="mt-10 border-t border-black/10 pt-6">
        <h3 className="mb-4 font-ui text-[12px] font-medium uppercase tracking-[0.08em] text-black">Items</h3>
        <ul className="divide-y divide-black/10">
          {order.lines.map((line, i) => {
            const product = getProductById(line.productId);
            return (
              <li key={`${line.productId}-${line.size}-${line.color}-${i}`} className="flex justify-between gap-4 py-3 font-ui text-[14px]">
                <div>
                  <p className="text-black">{product?.title ?? "Item"}</p>
                  <p className="text-[12px] text-stone">
                    {line.color} / {line.size} &times; {line.quantity}
                  </p>
                </div>
                <p className="shrink-0 text-black">{formatPrice((product?.priceValue ?? 0) * line.quantity)}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 flex justify-between border-t border-black/10 pt-4 font-ui text-[15px] font-semibold text-black">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>
    </div>
  );
}

type Key = "order" | "contact";

export function TrackOrderForm() {
  const { orders, hydrated } = useStore();
  const [order, setOrder] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState<FieldErrors<Key>>({});
  const [result, setResult] = useState<MockOrder | "not-found" | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: FieldErrors<Key> = {};
    if (!normalize(order)) next.order = "Please enter your order number.";
    if (!contact.trim()) next.contact = "Please enter the email or phone used for the order.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    const found = orders.find((o) => normalize(o.id) === normalize(order));
    setResult(found ?? "not-found");
  };

  return (
    <div className="mx-auto max-w-[760px] px-4 pb-[72px]">
      <form
        noValidate
        onSubmit={onSubmit}
        aria-label="Track order"
        className="grid gap-5 rounded-[6px] bg-mist p-5 sm:grid-cols-2 md:p-8"
      >
        <Field id="track-order" label="Order number" error={errors.order}>
          <input
            id="track-order"
            name="order"
            placeholder="e.g. #1001"
            className={inputClass}
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            {...errorProps("track-order", errors.order)}
          />
        </Field>
        <Field id="track-contact" label="Email or phone" error={errors.contact}>
          <input
            id="track-contact"
            name="contact"
            autoComplete="email"
            className={inputClass}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            {...errorProps("track-contact", errors.contact)}
          />
        </Field>
        <div className="sm:col-span-2">
          <button type="submit" disabled={!hydrated} className={cn(primaryButtonClass, "w-full sm:w-auto")}>
            Track order
          </button>
        </div>
      </form>

      <div aria-live="polite">
        {result === "not-found" ? (
          <p className="mt-6 rounded-[4px] border border-red-600/30 bg-red-50 px-5 py-4 font-ui text-[14px] text-red-700">
            We couldn&apos;t find that order. Check the number or{" "}
            <Link href={routes.contact} className="font-semibold underline underline-offset-2">
              contact us
            </Link>
            .
          </p>
        ) : result ? (
          <OrderResult order={result} />
        ) : null}
      </div>
    </div>
  );
}
