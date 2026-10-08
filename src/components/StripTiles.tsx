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
    <section className={cn(className)}>
      <div className="scrollbar-none flex snap-x snap-mandatory gap-[6px] overflow-x-auto px-[6px]">
        {items.map((tile) => (
          <a
            key={tile.title}
            href={tile.href}
            className="relative block aspect-[540/202] w-[85vw] flex-none snap-start overflow-hidden md:w-[540px]"
          >
            <Placeholder tone={tile.tone} />
            <div aria-hidden className="absolute inset-0 bg-black/25" />
            <span className="absolute inset-0 flex items-center justify-center px-[16px] text-center">
              <span className="line-clamp-2 font-display text-[34px] font-normal uppercase leading-[1.05] text-white">
                {tile.title}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
