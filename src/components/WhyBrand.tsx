import { Gem, Ruler, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";

import { brandName, brandPoints } from "@/lib/content";

const icons: LucideIcon[] = [Gem, Ruler, ShieldCheck, Sparkles];

// Short brand-story band: a statement line plus four points, so the home page carries
// more text than imagery (the brief asked for "why us" copy rather than a photo wall).
export function WhyBrand() {
  return (
    <section className="bg-linen px-[20px] py-[40px] md:px-[36px] md:py-[64px]">
      <div className="mx-auto max-w-[1100px] text-center">
        <p className="font-ui text-[11px] uppercase tracking-[0.2em] text-stone md:text-[12px]">
          Why {brandName}
        </p>
        <h2 className="mx-auto mt-[12px] max-w-[760px] font-display text-[24px] uppercase leading-[1.2] text-black md:text-[36px]">
          Shirts cut from the world&apos;s finest cottons, made to be worn for years.
        </h2>
        <ul className="mt-[32px] grid grid-cols-2 gap-x-[16px] gap-y-[28px] md:mt-[48px] md:grid-cols-4 md:gap-x-[32px]">
          {brandPoints.map((point, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={point.title} className="flex flex-col items-center">
                <Icon className="size-[26px] text-ink" strokeWidth={1.25} aria-hidden />
                <h3 className="mt-[12px] font-ui text-[12px] font-semibold uppercase tracking-[0.1em] text-black md:text-[13px]">
                  {point.title}
                </h3>
                <p className="mt-[6px] max-w-[220px] font-ui text-[12px] leading-[1.6] text-stone md:text-[13px]">
                  {point.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
