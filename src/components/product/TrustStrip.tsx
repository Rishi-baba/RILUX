import { AnimatedIcon } from "@/components/AnimatedIcon";
import type { AnimatedIconName } from "@/components/animated-icons";

import { trustPoints } from "@/lib/content";

const icons: AnimatedIconName[] = ["handCoins", "truck", "refreshCcw", "messageCircleMore"];

export function TrustStrip() {
  return (
    <section aria-label="Why shop with us" className="w-full px-[16px] py-[32px] md:px-[36px]">
      <ul className="grid grid-cols-2 gap-[24px] md:grid-cols-4">
        {trustPoints.map((point, i) => {
          return (
            <li key={point.title} data-icon-trigger className="flex flex-col items-center text-center">
              <AnimatedIcon name={icons[i % icons.length]} size={26} className="mb-[10px]" />
              <h3 className="font-ui text-[13px] font-semibold text-black">{point.title}</h3>
              <p className="mt-[4px] font-ui text-[11px] text-stone">{point.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
