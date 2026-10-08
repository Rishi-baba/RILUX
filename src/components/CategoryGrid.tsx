import Link from "next/link";

import { Placeholder } from "@/components/Placeholder";
import { categoryTiles } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Tile } from "@/types/content";

export function CategoryGrid({
  items = categoryTiles,
  className,
}: {
  items?: Tile[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "mx-auto max-w-[1100px] px-[4px] pb-[24px] md:px-0",
        className,
      )}
    >
      <div className="grid grid-cols-2 gap-[4px] md:grid-cols-3 md:gap-[6px]">
        {items.map((tile) => (
          <Link
            key={tile.title}
            href={tile.href}
            className="group relative block aspect-[363/399] overflow-hidden"
          >
            <div className="absolute inset-0 transition-transform duration-[600ms] ease-theme group-hover:scale-[1.04]">
              <Placeholder tone={tile.tone} />
            </div>
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.45),transparent_50%)]"
            />
            <span className="absolute bottom-[10px] left-[12px] font-ui text-[20px] font-normal uppercase leading-[26px] text-white md:bottom-[18px] md:left-[20px] md:text-[34px] md:leading-[42px]">
              {tile.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
