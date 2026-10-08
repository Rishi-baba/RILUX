import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/ProductCard";
import { ProductScroller } from "@/components/ProductScroller";
import { Breadcrumbs } from "@/components/product/Breadcrumbs";
import { ProductMain } from "@/components/product/ProductMain";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductStory } from "@/components/product/ProductStory";
import { TrustStrip } from "@/components/product/TrustStrip";
import { getCollection, getProduct, products, productsIn, routes } from "@/lib/content";
import type { Product } from "@/types/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.title, description: product.description };
}

/** Collections other than the catch-alls ("all", "new-in"), in product order. */
function specificCollections(product: Product) {
  return product.collections.filter((c) => c !== "all" && c !== "new-in");
}

function uniqueFill(pools: Product[][], exclude: Set<string>, count: number) {
  const out: Product[] = [];
  for (const pool of pools) {
    for (const p of pool) {
      if (out.length >= count) return out;
      if (exclude.has(p.id)) continue;
      exclude.add(p.id);
      out.push(p);
    }
  }
  return out;
}

/** 8 products sharing a collection with this one, most specific first. */
function recommendations(product: Product) {
  return uniqueFill(
    [...specificCollections(product).map((c) => productsIn(c)), products],
    new Set([product.id]),
    8,
  );
}

const fabricSlugs = ["giza-cotton", "giza-satin", "premium-cotton", "pure-cotton"];
const cutSlugs = ["formal", "regular", "casual"];

/** 4 shirts to pair: same fabric family in a different cut first, then the same fabric, then any shirt. */
function pairings(product: Product) {
  const fabric = product.collections.find((c) => fabricSlugs.includes(c)) ?? "all";
  const cut = product.collections.find((c) => cutSlugs.includes(c));
  const sameFabric = productsIn(fabric);
  const otherCut = sameFabric.filter((p) => !cut || !p.collections.includes(cut));
  return uniqueFill([otherCut, sameFabric, productsIn("all")], new Set([product.id]), 4);
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const primary = getCollection(specificCollections(product)[0] ?? product.collections[0] ?? "all");

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: routes.home },
          ...(primary ? [{ label: primary.title, href: routes.collection(primary.slug) }] : []),
          { label: product.title },
        ]}
      />
      <ProductMain product={product} />
      <TrustStrip />
      <ProductStory tone={product.altTone} />
      <ProductReviews product={product} />
      <ProductScroller title="You May Also Like" items={recommendations(product)} />
      <section className="px-[16px] pb-[40px] md:px-[36px]">
        <h2 className="mb-[20px] text-center font-display text-[34px] font-normal uppercase leading-[42px] text-black">
          Pair It With
        </h2>
        <div className="grid grid-cols-2 gap-[6px] md:grid-cols-4">
          {pairings(product).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
