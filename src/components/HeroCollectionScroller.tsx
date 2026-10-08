import { Placeholder } from "@/components/Placeholder";
import { headings, occasionTiles } from "@/lib/content";

export function HeroCollectionScroller() {
  return (
    <section className="relative min-h-[520px] w-full overflow-hidden md:h-[529px] md:min-h-0">
      <Placeholder tone="sand" />

      <h2 className="absolute inset-x-0 top-8 px-4 text-center font-display text-[32px] font-normal uppercase text-white md:text-[44px]">
        {headings.occasion}
      </h2>

      <div className="scrollbar-none absolute inset-x-0 bottom-0 snap-x snap-mandatory scroll-px-6 overflow-x-auto">
        <div className="mx-auto flex w-max gap-2 px-6 pb-6">
          {occasionTiles.map((tile) => (
            <a
              key={tile.title}
              href={tile.href}
              className="group relative aspect-[185/247] w-[185px] flex-none snap-start overflow-hidden"
            >
              <Placeholder tone={tile.tone} />
              <div className="absolute inset-0 bg-black/25 transition-[background-color] duration-300 group-hover:bg-black/40" />
              <span className="absolute inset-0 flex items-center justify-center px-[10px] text-center">
                <span className="line-clamp-2 font-display text-[24px] font-normal uppercase leading-[1.05] text-white">
                  {tile.title}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
