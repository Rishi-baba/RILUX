import { Banknote, Headphones, RefreshCcw, Truck, type LucideIcon } from "lucide-react";

import { trustPoints } from "@/lib/content";

const icons: LucideIcon[] = [Banknote, Truck, RefreshCcw, Headphones];

export function TrustStrip() {
  return (
    <section aria-label="Why shop with us" className="w-full px-[16px] py-[32px] md:px-[36px]">
      <ul className="grid grid-cols-2 gap-[24px] md:grid-cols-4">
        {trustPoints.map((point, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li key={point.title} className="flex flex-col items-center text-center">
              <Icon className="mb-[10px] size-[26px]" strokeWidth={1.25} aria-hidden />
              <h3 className="font-ui text-[13px] font-semibold text-black">{point.title}</h3>
              <p className="mt-[4px] font-ui text-[11px] text-stone">{point.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
