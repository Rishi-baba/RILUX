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
    <section className="grid md:grid-cols-[58fr_42fr] md:gap-[40px] md:px-[36px] md:pb-[56px] md:pt-[8px] lg:grid-cols-[62fr_38fr] lg:gap-[56px]">
      <ProductGallery tones={tones} title={product.title} tag={product.tag ? "Fit Label" : undefined} />
      <ProductInfo product={product} colorIndex={colorIndex} onColorChange={setColorIndex} />
    </section>
  );
}
