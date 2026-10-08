import Link from "next/link";

import { Placeholder } from "@/components/Placeholder";
import { fabrics } from "@/lib/content";
import type { Tile } from "@/types/content";

// Shop-by-fabric row: 3 columns on phones, 6 across on desktop, label under each swatch.
export function FabricTiles({ items = fabrics }: { items?: Tile[] }) {
  return (
    <section className="mx-auto max-w-[1100px] px-[6px] pb-[32px] md:px-0 md:pb-[48px]">
      <ul className="grid grid-cols-3 gap-x-[6px] gap-y-[18px] md:grid-cols-6 md:gap-x-[12px]">
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
