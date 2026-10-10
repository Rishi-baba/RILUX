"use client";

import { useEffect } from "react";
import { ProductScroller } from "@/components/ProductScroller";
import { getProductById } from "@/lib/content";
import { useStore } from "@/lib/store";
import type { Product } from "@/types/content";

/** Records this product as viewed and lists the shopper's other recently viewed shirts. */
export function RecentlyViewed({ productId }: { productId: string }) {
  const { recent, markViewed, hydrated } = useStore();

  useEffect(() => {
    if (hydrated) markViewed(productId);
  }, [hydrated, productId, markViewed]);

  const items = recent
    .filter((id) => id !== productId)
    .map((id) => getProductById(id))
    .filter((p): p is Product => !!p);

  if (!hydrated || items.length === 0) return null;
  return <ProductScroller title="Recently Viewed" items={items} />;
}
