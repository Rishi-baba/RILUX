"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { ChevronDown } from "@/components/icons";

import { secondaryButtonClass } from "@/components/account/form";
import { Placeholder } from "@/components/Placeholder";
import { formatPrice, getProductById, routes } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { MockOrder } from "@/types/content";

export function formatOrderDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const th = "px-[12px] py-[12px] text-left font-ui text-[12px] font-medium uppercase tracking-[0.08em] text-stone";
const td = "px-[12px] py-[14px] font-ui text-[14px] text-black";

export function OrdersPanel({ orders }: { orders: MockOrder[] }) {
  const [open, setOpen] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-start gap-[18px] border border-black/10 px-[24px] py-[32px]">
        <p className="font-ui text-[14px] text-black">You haven&apos;t placed any orders yet.</p>
        <Link href={routes.collection("all")} className={secondaryButtonClass}>
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse">
        <thead className="border-b border-black/10">
          <tr>
            <th scope="col" className={th}>Order</th>
            <th scope="col" className={th}>Date</th>
            <th scope="col" className={th}>Status</th>
            <th scope="col" className={th}>Items</th>
            <th scope="col" className={cn(th, "text-right")}>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const isOpen = open === order.id;
            const items = order.lines.reduce((n, l) => n + l.quantity, 0);
            return (
              <Fragment key={order.id}>
                <tr
                  onClick={() => setOpen(isOpen ? null : order.id)}
                  className="cursor-pointer border-b border-black/10 transition-colors hover:bg-mist/60"
                >
                  <td className={td}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`order-${order.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(isOpen ? null : order.id);
                      }}
                      className="inline-flex items-center gap-[6px] font-medium underline-offset-4 hover:underline"
                    >
                      {order.id}
                      <ChevronDown
                        className={cn("size-[14px] transition-transform duration-200 ease-theme", isOpen && "rotate-180")}
                        aria-hidden
                      />
                    </button>
                  </td>
                  <td className={td}>{formatOrderDate(order.createdAt)}</td>
                  <td className={td}>
                    <span className="inline-block rounded-full bg-mist px-[10px] py-[3px] font-ui text-[12px]">
                      {order.status}
                    </span>
                  </td>
                  <td className={td}>{items}</td>
                  <td className={cn(td, "text-right")}>{formatPrice(order.total)}</td>
                </tr>
                {isOpen ? (
                  <tr id={`order-${order.id}`} className="border-b border-black/10 bg-mist/40">
                    <td colSpan={5} className="px-[12px] py-[14px]">
                      <ul className="flex flex-col gap-[12px]">
                        {order.lines.map((line, i) => {
                          const p = getProductById(line.productId);
                          return (
                            <li key={`${line.productId}-${line.size}-${line.color}-${i}`} className="flex items-center gap-[14px]">
                              <div className="relative h-[70px] w-[56px] shrink-0 overflow-hidden">
                                <Placeholder tone={p?.tone ?? "stone"} />
                              </div>
                              <div className="min-w-0 flex-1">
                                {p ? (
                                  <Link href={routes.product(p.slug)} className="font-display text-[16px] capitalize text-black hover:underline">
                                    {p.title}
                                  </Link>
                                ) : (
                                  <span className="font-display text-[16px] text-black">Unavailable item</span>
                                )}
                                <p className="font-ui text-[12px] text-stone">
                                  {line.size} / {line.color} · Qty {line.quantity}
                                </p>
                              </div>
                              <p className="font-ui text-[14px] text-black">
                                {formatPrice((p?.priceValue ?? 0) * line.quantity)}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
