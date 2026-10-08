import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { Placeholder } from "@/components/Placeholder";
import { WishlistToggle } from "@/components/ProductCard";
import { headings, products, routes } from "@/lib/content";

export function HeroProductScroller() {
  const items = products.slice(0, 6);
  const { lead, strong } = headings.bestsellers;

  return (
    <section className="relative min-h-[620px] w-full overflow-hidden md:h-[724px] md:min-h-0">
      <Placeholder tone="warm" />

      <h2 className="absolute left-4 top-10 flex flex-col font-ui uppercase md:left-auto md:right-16 md:top-[22%] md:flex-row md:items-baseline md:whitespace-nowrap">
        <span className="text-[18px] font-medium tracking-[0.04em] text-white/85 md:text-[30px]">
          {lead}
        </span>
        <span className="text-[34px] font-bold text-white md:ml-4 md:text-[56px]">
          {strong}
        </span>
      </h2>

      <div className="scrollbar-none absolute inset-x-0 bottom-6 flex snap-x snap-mandatory scroll-px-4 gap-[10px] overflow-x-auto px-4">
        {items.map((product) => (
          <div
            key={product.id}
            className="relative w-[205px] flex-none snap-start bg-white"
          >
            <Link href={routes.product(product.slug)} className="block">
              <div className="relative aspect-[188/235]">
                <Placeholder tone={product.altTone} />
                {product.tag ? (
                  <span className="absolute left-2 top-2 bg-brand px-2 py-[3px] font-ui text-[14px] capitalize text-white">
                    {product.tag}
                  </span>
                ) : null}
              </div>
              <div className="px-2 pb-4 pt-2">
                <p className="line-clamp-2 font-display text-[14px] capitalize text-black">
                  {product.title}
                </p>
                <p className="mt-1 font-ui text-[13px] text-black">
                  {product.price}
                </p>
              </div>
            </Link>
            <WishlistToggle
              productId={product.id}
              className="absolute right-2 top-2 z-10 text-white"
              iconClassName="size-4"
              strokeWidth={2}
            />
          </div>
        ))}
        <Link
          href={routes.collection("all")}
          className="flex w-[205px] flex-none snap-start flex-col items-center justify-center gap-2 font-ui text-[20px] font-semibold uppercase leading-[32px] tracking-[1.6px] text-white"
        >
          View all
          <ArrowRightIcon aria-hidden className="size-5" />
        </Link>
      </div>
    </section>
  );
}
