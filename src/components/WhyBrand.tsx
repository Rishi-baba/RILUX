import { AnimatedIcon } from "@/components/AnimatedIcon";
import type { AnimatedIconName } from "@/components/animated-icons";

import { brandName, brandPoints } from "@/lib/content";

const icons: AnimatedIconName[] = ["feather", "userCheck", "shieldCheck", "cart"];

// Short brand-story band: a statement line plus four points, so the home page carries
// more text than imagery (the brief asked for "why us" copy rather than a photo wall).
export function WhyBrand() {
  return (
    <section className="bg-white px-[20px] py-[40px] md:px-[36px] md:py-[64px]">
      <div className="mx-auto max-w-[1100px] text-center">
        <p className="font-ui text-[11px] uppercase tracking-[0.2em] text-black/50 md:text-[12px]">
          Why {brandName}
        </p>
        <h2 className="mx-auto mt-[12px] max-w-[760px] font-display text-[24px] uppercase leading-[1.2] text-black md:text-[36px]">
          Good shirts, fairly priced, that still look right after a year of wear.
        </h2>
        <ul className="mt-[32px] grid grid-cols-2 gap-x-[16px] gap-y-[28px] md:mt-[48px] md:grid-cols-4 md:gap-x-[32px]">
          {brandPoints.map((point, i) => {
            return (
              <li key={point.title} data-icon-trigger className="flex flex-col items-center">
                <AnimatedIcon name={icons[i % icons.length]} size={26} className="text-black" />
                <h3 className="mt-[12px] font-ui text-[12px] font-semibold uppercase tracking-[0.1em] text-black md:text-[13px]">
                  {point.title}
                </h3>
                <p className="mt-[6px] max-w-[220px] font-ui text-[12px] leading-[1.6] text-ink-soft md:text-[13px]">
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
