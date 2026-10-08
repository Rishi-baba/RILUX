import Link from "next/link";

import { Placeholder } from "@/components/Placeholder";
import { stripTiles } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Tile } from "@/types/content";

export function StripTiles({
  items = stripTiles,
  className,
}: {
  items?: Tile[];
  className?: string;
}) {
  return (
    <section className={cn("pb-[20px] pt-[6px] md:pb-[36px] md:pt-[16px]", className)}>
      <div className="scrollbar-none flex snap-x snap-mandatory gap-[6px] overflow-x-auto px-[6px]">
        {items.map((tile) => (
          <Link
            key={tile.title}
            href={tile.href}
            className="relative block aspect-[149/192] w-[38.2vw] flex-none snap-start overflow-hidden md:aspect-[616/231] md:w-[42.8vw]"
          >
            <Placeholder tone={tile.tone} />
            <div aria-hidden className="absolute inset-0 bg-black/25" />
            <span className="absolute inset-0 flex items-center justify-center px-[16px] text-center">
              <span className="line-clamp-3 font-display text-[16px] font-normal uppercase leading-[1.05] text-white md:line-clamp-2 md:text-[34px]">
                {tile.title}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
