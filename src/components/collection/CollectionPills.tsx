import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { routes } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Collection } from "@/types/content";

// Related-collection chips: centred when they fit, swipe/scroll horizontally when they don't.
export function CollectionPills({
  items,
  activeSlug,
}: {
  items: Collection[];
  activeSlug: string;
}) {
  return (
    <nav aria-label="Collections" className="pt-[28px] md:pt-[32px]">
      <div className="scrollbar-none overflow-x-auto">
        <ul className="mx-auto flex w-max gap-[12px] px-4 md:px-[36px]">
          {items.map((c) => {
            const active = c.slug === activeSlug;
            return (
              <li key={c.slug}>
                <Link
                  href={routes.collection(c.slug)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-[60px] items-center gap-[16px] overflow-hidden rounded-[6px] pr-[24px] text-ink transition-colors",
                    active ? "bg-white ring-1 ring-inset ring-black" : "bg-mist hover:bg-[rgb(236,236,236)]",
                  )}
                >
                  <span className="relative h-full w-[52px] shrink-0">
                    <Placeholder tone={c.tone} />
                  </span>
                  <span className="whitespace-nowrap font-display text-[14px] uppercase tracking-[0.06em] md:text-[15px]">
                    {c.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
