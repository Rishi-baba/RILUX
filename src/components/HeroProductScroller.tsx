import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { Placeholder } from "@/components/Placeholder";
import { WishlistToggle } from "@/components/ProductCard";
import { headings, products, routes } from "@/lib/content";

export function HeroProductScroller() {
  const items = products.slice(0, 5);
  const { lead, strong } = headings.bestsellers;

  return (
    <section className="relative aspect-[390/728] w-full overflow-hidden md:aspect-[1265/724]">
      <Placeholder tone="warm" />

      <h2 className="absolute right-4 top-[26%] flex flex-col items-end font-ui uppercase md:right-[46px] md:top-[19%] md:flex-row md:items-baseline md:whitespace-nowrap">
        <span className="text-[11px] font-medium tracking-[0.04em] text-white/85 md:text-[30px]">
          {lead}
        </span>
        <span className="text-[20px] font-bold text-white md:ml-4 md:text-[56px]">
          {strong}
        </span>
      </h2>

      <div className="scrollbar-none absolute inset-x-0 bottom-[35px] flex snap-x snap-mandatory items-center gap-[6px] overflow-x-auto md:bottom-[28px] md:scroll-px-4 md:gap-[24px] md:px-4">
        {items.map((product) => (
          <div
            key={product.id}
            className="relative w-[42.8vw] flex-none snap-start self-stretch bg-white/80 md:w-[15.07vw]"
          >
            <Link href={routes.product(product.slug)} className="block">
              <div className="relative aspect-[4/5]">
                <Placeholder tone={product.altTone} />
                {product.tag ? (
                  <span className="absolute left-[10px] top-[10px] bg-brand px-2 py-[3px] font-ui text-[10px] capitalize text-white md:left-3 md:top-3 md:text-[14px]">
                    {product.tag}
                  </span>
                ) : null}
              </div>
              <div className="px-2 pb-3 pt-[5px]">
                <p className="line-clamp-3 font-display text-[12px] capitalize text-black [font-variant-caps:small-caps] md:text-[14px]">
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
          className="ml-[18px] mr-4 inline-flex flex-none snap-start items-center gap-1.5 whitespace-nowrap font-ui text-[13px] font-semibold uppercase tracking-[0.1em] text-white underline underline-offset-4 md:ml-[81px] md:text-[14px]"
        >
          View all
          <ArrowRightIcon aria-hidden className="size-4" />
        </Link>
      </div>
    </section>
  );
}
