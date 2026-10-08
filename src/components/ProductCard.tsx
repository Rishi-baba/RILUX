import { HeartIcon } from "@/components/icons";
import { Placeholder } from "@/components/Placeholder";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/content";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <div className={cn("group relative block", className)}>
      <a href="#" className="block text-black">
        <div className="relative aspect-[304/380] w-full overflow-hidden">
          <Placeholder
            tone={product.tone}
            className="opacity-100 transition-opacity duration-200 ease-theme group-hover:opacity-0"
          />
          <Placeholder
            tone={product.altTone}
            className="opacity-0 transition-opacity duration-200 ease-theme group-hover:opacity-100"
          />
          {product.tag ? (
            <span className="absolute left-[10px] top-[10px] bg-brand px-[8px] py-[3px] font-ui text-[14px] font-normal capitalize text-white">
              {product.tag}
            </span>
          ) : null}
        </div>
        <div className="px-[8px] pb-[16px] pt-[10px]">
          <h3 className="mb-[2px] truncate font-display text-[14px] font-normal capitalize text-black">
            {product.title}
          </h3>
          <p className="font-ui text-[12px] font-normal capitalize leading-[18px] text-stone">
            {product.category}
          </p>
          <p className="mt-[4px] font-ui text-[14px] font-normal leading-[21px] tracking-[0.3px] text-black">
            {product.price}
          </p>
          {product.colorCount ? (
            <p className="mt-[2px] font-ui text-[14px] text-[rgb(1,41,28)]">
              +{product.colorCount} colours
            </p>
          ) : null}
        </div>
      </a>
      <button
        type="button"
        aria-label="Add to wishlist"
        className="absolute right-[10px] top-[10px] z-10 text-black"
      >
        <HeartIcon className="size-[18px]" strokeWidth={1.5} />
      </button>
    </div>
  );
}
