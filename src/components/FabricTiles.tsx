import Link from "next/link";

import { Placeholder } from "@/components/Placeholder";
import { fabrics } from "@/lib/content";
import type { Tile } from "@/types/content";

// Shop-by-fabric row: the four fabric families, 2 columns on phones and 4 across on desktop.
export function FabricTiles({ items = fabrics }: { items?: Tile[] }) {
  return (
    <section className="mx-auto max-w-[880px] px-[16px] pb-[32px] md:px-0 md:pb-[48px]">
      <ul className="grid grid-cols-2 gap-x-[16px] gap-y-[24px] md:grid-cols-4 md:gap-x-[28px]">
        {items.map((fabric) => (
          <li key={fabric.title}>
            <Link href={fabric.href} className="group block">
              <div className="relative aspect-square overflow-hidden rounded-full">
                <div className="absolute inset-0 transition-transform duration-[600ms] ease-theme group-hover:scale-[1.06]">
                  <Placeholder tone={fabric.tone} />
                </div>
              </div>
              <p className="mt-[12px] text-center font-display text-[14px] uppercase tracking-[0.06em] text-black md:text-[16px]">
                {fabric.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
