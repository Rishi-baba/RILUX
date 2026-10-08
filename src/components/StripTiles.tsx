import Link from "next/link";

import { Placeholder } from "@/components/Placeholder";
import { stripTiles } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Tile } from "@/types/content";

// Infinite slideshow: the tiles are rendered twice in one track that glides left forever
// (CSS animation, -50% per cycle), so the loop has no visible jump. Pauses on hover.
export function StripTiles({
  items = stripTiles,
  className,
}: {
  items?: Tile[];
  className?: string;
}) {
  const loop = [...items, ...items];

  return (
    <section
      aria-roledescription="carousel"
      className={cn("group overflow-hidden pb-[20px] pt-[6px] md:pb-[36px] md:pt-[16px]", className)}
    >
      <div className="flex w-max animate-[marquee_28s_linear_infinite] group-hover:[animation-play-state:paused] md:animate-[marquee_40s_linear_infinite]">
        {loop.map((tile, i) => {
          const clone = i >= items.length;
          return (
            <Link
              key={`${tile.title}-${i}`}
              href={tile.href}
              aria-hidden={clone || undefined}
              tabIndex={clone ? -1 : undefined}
              className="relative mr-[6px] block aspect-[149/192] w-[38.2vw] flex-none overflow-hidden md:aspect-[616/231] md:w-[42.8vw]"
            >
              <Placeholder tone={tile.tone} />
              <div aria-hidden className="absolute inset-0 bg-black/25" />
              <span className="absolute inset-0 flex items-center justify-center px-[16px] text-center">
                <span className="line-clamp-3 font-display text-[16px] font-normal uppercase leading-[1.05] text-white md:line-clamp-2 md:text-[34px]">
                  {tile.title}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
