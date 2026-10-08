import Link from "next/link";

import { Placeholder } from "@/components/Placeholder";
import { roundedTiles } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Tile } from "@/types/content";

export function TileSlider({
  items = roundedTiles,
  className,
}: {
  items?: Tile[];
  className?: string;
}) {
  return (
    <section className={cn("pb-[24px] md:px-[40px] md:pb-[36px]", className)}>
      <div className="scrollbar-none flex snap-x snap-mandatory gap-[6px] overflow-x-auto">
        {items.map((tile) => (
          <Link
            key={tile.title}
            href={tile.href}
            className="group relative block aspect-[366/415] w-[44.6vw] flex-none snap-start overflow-hidden rounded-[8px] md:w-[29.2vw]"
          >
            <div className="absolute inset-0 transition-transform duration-[600ms] ease-theme group-hover:scale-[1.04]">
              <Placeholder tone={tile.tone} />
            </div>
            <span className="absolute inset-0 flex items-center justify-center px-[16px] text-center font-display text-[20px] font-normal uppercase leading-[1.05] text-white [text-shadow:0_1px_12px_rgba(0,0,0,.25)] md:text-[38px]">
              {tile.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
