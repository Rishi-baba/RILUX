import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { routes } from "@/lib/content";
import type { Collection } from "@/types/content";

export function CollectionTiles({ items }: { items: Collection[] }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="explore-more" className="px-4 pb-[48px] pt-[24px] md:px-[36px]">
      <h2
        id="explore-more"
        className="mb-[28px] text-center font-display text-[28px] uppercase text-ink md:text-[34px]"
      >
        Explore More
      </h2>
      <ul className="grid grid-cols-2 gap-[18px] md:grid-cols-5">
        {items.map((c) => (
          <li key={c.slug}>
            <Link href={routes.collection(c.slug)} className="group block text-ink">
              <span className="relative block aspect-square overflow-hidden">
                <Placeholder
                  tone={c.tone}
                  className="transition-transform duration-500 ease-theme group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-[12px] block text-center font-display text-[14px] uppercase tracking-[0.06em]">
                {c.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
