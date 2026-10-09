"use client";

import { Stars } from "@/components/Stars";
import { useSamplePreview } from "@/hooks/useSamplePreview";
import { sampleReviewsFor } from "@/lib/content";
import { useStore } from "@/lib/store";
import type { Product } from "@/types/content";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

// Customer reviews list (read-only). Sample reviews appear on preview hosts (local + Vercel demo link).
export function ProductReviews({ product }: { product: Product }) {
  const { reviewsFor, hydrated } = useStore();
  const preview = useSamplePreview();
  const reviews = [...(hydrated ? reviewsFor(product.id) : []), ...(preview ? sampleReviewsFor(product.id) : [])];

  if (!reviews.length) return null;

  return (
    <section id="reviews" className="scroll-mt-[90px] border-t border-black/10 px-[16px] py-[48px] md:px-[36px] md:py-[64px]">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="text-center font-display text-[30px] uppercase leading-[1.1] text-black md:text-[40px]">Customer Reviews</h2>

        <ul className="mt-[24px] divide-y divide-black/10 border-t border-black/10">
          {reviews.map((r) => (
            <li key={r.id} className="grid gap-[12px] py-[28px] md:grid-cols-[220px_1fr] md:gap-[40px]">
              <div>
                <p className="font-ui text-[14px] font-semibold text-black">{r.name}</p>
                <p className="mt-[2px] font-ui text-[12px] text-stone">{formatDate(r.createdAt)}</p>
                {r.size || r.fit ? (
                  <p className="mt-[8px] font-ui text-[12px] text-ink-soft">
                    {r.size ? <>Size {r.size}</> : null}
                    {r.size && r.fit ? " · " : null}
                    {r.fit}
                  </p>
                ) : null}
              </div>
              <div>
                <Stars rating={r.rating} />
                <p className="mt-[8px] font-ui text-[15px] font-semibold text-black">{r.title}</p>
                <p className="mt-[6px] font-ui text-[14px] leading-[1.7] text-ink-soft">{r.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
