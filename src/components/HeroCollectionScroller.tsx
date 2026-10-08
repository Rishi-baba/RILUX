import Link from "next/link";

import { Placeholder } from "@/components/Placeholder";
import { headings, occasionTiles } from "@/lib/content";

export function HeroCollectionScroller() {
  return (
    <section className="relative aspect-[390/500] w-full overflow-hidden md:aspect-auto md:h-[100svh] md:min-h-[520px]">
      <Placeholder tone="sand" />

      <h2 className="absolute inset-x-0 top-10 px-4 text-center font-display text-[28px] font-normal uppercase leading-none text-white md:top-[14%] md:text-[64px]">
        {headings.occasion}
      </h2>

      <div className="scrollbar-none absolute inset-x-0 bottom-0 snap-x snap-mandatory scroll-px-2 overflow-x-auto md:scroll-px-6">
        <div className="flex w-max gap-2 px-2 pb-[5px] md:px-6">
          {occasionTiles.map((tile) => (
            <Link
              key={tile.title}
              href={tile.href}
              className="group relative aspect-[155/232] w-[39.7vw] flex-none snap-start overflow-hidden md:aspect-[3/4] md:w-[14.8vw]"
            >
              <Placeholder tone={tile.tone} />
              <div className="absolute inset-0 bg-black/25 transition-[background-color] duration-300 group-hover:bg-black/40" />
              <span className="absolute inset-0 flex items-center justify-center px-[10px] text-center">
                <span className="line-clamp-2 font-display text-[18px] font-normal uppercase leading-[1.05] text-white md:text-[24px]">
                  {tile.title}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
