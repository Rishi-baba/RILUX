import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
    </>
  );
}
