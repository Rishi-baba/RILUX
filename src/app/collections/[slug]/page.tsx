import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CollectionListing, CollectionListingFallback } from "@/components/collection/CollectionListing";
import { CollectionPills } from "@/components/collection/CollectionPills";
import { CollectionTiles } from "@/components/collection/CollectionTiles";
import { collections, getCollection, productsIn } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  return { title: collection ? collection.title : "Collection not found" };
}

/** "all" first, then the current collection (if not already there) and its related list,
 * or every top-level (nav) collection when it has no related list. */
export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const items = productsIn(collection.slug);
  const others = collections.filter((c) => c.slug !== collection.slug).slice(0, 10);

  return (
    <main className="bg-white">
      <CollectionPills items={collections} activeSlug={collection.slug} />
      <h1 className="mx-4 mt-[36px] text-center font-display text-[30px] uppercase leading-tight text-ink md:text-[40px]">
        {collection.title}
      </h1>
      {collection.description ? (
        <p className="mx-auto mb-[32px] mt-[12px] max-w-[640px] px-4 text-center font-ui text-[14px] leading-[1.7] text-ink-soft md:mb-[40px] md:text-[15px]">
          {collection.description}
        </p>
      ) : (
        <div className="mb-[28px]" />
      )}
      <Suspense fallback={<CollectionListingFallback products={items} />}>
        <CollectionListing products={items} />
      </Suspense>
      <CollectionTiles items={others} />
    </main>
  );
}
