import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CollectionListing, CollectionListingFallback } from "@/components/collection/CollectionListing";
import { CollectionPills } from "@/components/collection/CollectionPills";
import { CollectionTiles } from "@/components/collection/CollectionTiles";
import { FeatureBadges } from "@/components/collection/FeatureBadges";
import { collections, getCollection, navItems, productsIn, routes } from "@/lib/content";
import type { Collection } from "@/types/content";

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
function pillCollections(current: Collection): Collection[] {
  const topLevel = collections
    .filter((c) => c.slug !== "all" && navItems.some((n) => n.href === routes.collection(c.slug)))
    .map((c) => c.slug);
  const slugs = current.related?.length ? [current.slug, ...current.related] : topLevel;
  const unique = Array.from(new Set(["all", ...slugs]));
  return unique.map((s) => getCollection(s)).filter((c): c is Collection => Boolean(c));
}

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
      <CollectionPills items={pillCollections(collection)} activeSlug={collection.slug} />
      <h1 className="mx-4 mb-[28px] mt-[36px] text-center font-display text-[30px] uppercase leading-tight text-ink md:text-[40px]">
        {collection.title}
      </h1>
      <FeatureBadges />
      <Suspense fallback={<CollectionListingFallback products={items} />}>
        <CollectionListing products={items} />
      </Suspense>
      <CollectionTiles items={others} />
    </main>
  );
}
