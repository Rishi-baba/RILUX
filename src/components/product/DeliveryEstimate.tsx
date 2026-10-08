"use client";

import { useEffect, useState } from "react";
import { Banknote, RefreshCcw, Truck } from "lucide-react";
import { deliveryDays } from "@/lib/content";

const fmt = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

/** Adds business days (skips Sundays) to today */
function addBusinessDays(from: Date, days: number) {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) added++;
  }
  return d;
}

const badges = [
  { label: "Cash on Delivery", Icon: Banknote },
  { label: "Free Shipping", Icon: Truck },
  { label: "7-Day Exchange", Icon: RefreshCcw },
];

// Estimated delivery window + service badges under the price. The window is computed in the
// browser after mount (pages are prerendered, so a build-time date would be stale).
export function DeliveryEstimate() {
  const [range, setRange] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- date must come from the visitor's clock
    setRange(`${fmt(addBusinessDays(today, deliveryDays.min))} – ${fmt(addBusinessDays(today, deliveryDays.max))}`);
  }, []);

  return (
    <div className="mb-[18px]">
      <p className="flex items-center gap-[8px] font-ui text-[13px] text-black">
        <Truck className="size-[16px] flex-none" strokeWidth={1.5} aria-hidden />
        <span>
          Estimated delivery{" "}
          <span className="font-semibold">{range ?? "in 3–6 business days"}</span>
        </span>
      </p>
      <ul className="mt-[12px] flex flex-wrap gap-[6px]">
        {badges.map(({ label, Icon }) => (
          <li
            key={label}
            className="inline-flex items-center gap-[5px] rounded-[4px] bg-mist px-[8px] py-[6px] font-ui text-[10.5px] uppercase tracking-[0.04em] text-ink-soft"
          >
            <Icon className="size-[14px]" strokeWidth={1.5} aria-hidden />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
