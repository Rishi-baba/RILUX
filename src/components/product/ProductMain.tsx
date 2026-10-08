"use client";

import { useState } from "react";

import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import type { Product } from "@/types/content";

/** Gallery + info column. Owns the selected colour so the first gallery image follows it. */
export function ProductMain({ product }: { product: Product }) {
  const [colorIndex, setColorIndex] = useState(0);
  const color = product.colors[colorIndex];
  const tones = color ? [color.tone, ...product.gallery.slice(1)] : product.gallery;

  return (
    <section className="mx-auto grid max-w-[1100px] md:grid-cols-[55fr_45fr] md:gap-[28px] md:px-[24px] md:pb-[48px] md:pt-[24px]">
      <ProductGallery tones={tones} title={product.title} tag={product.tag ? "Fit Label" : undefined} />
      <ProductInfo product={product} colorIndex={colorIndex} onColorChange={setColorIndex} />
    </section>
  );
}
