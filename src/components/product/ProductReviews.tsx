"use client";

import { SealCheck, ThumbsUp } from "@phosphor-icons/react/ssr";
import { Stars } from "@/components/Stars";
import { useSamplePreview } from "@/hooks/useSamplePreview";
import { sampleReviewsFor } from "@/lib/content";
import { useStore } from "@/lib/store";
import type { Product, ProductReview } from "@/types/content";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

function fitSummary(reviews: ProductReview[]) {
  const counts = { "Runs small": 0, "True to size": 0, "Runs large": 0 };
  reviews.forEach((r) => r.fit && counts[r.fit]++);
  const total = counts["Runs small"] + counts["True to size"] + counts["Runs large"];
  if (!total) return null;
  const pct = Math.round((counts["True to size"] / total) * 100);
  return { pct, label: pct >= 60 ? "Most people say it's true to size" : "Check the size guide before ordering" };
}

// Customer reviews list (read-only) with a rating summary. Sample reviews appear on preview hosts only.
export function ProductReviews({ product }: { product: Product }) {
  const { reviewsFor, hydrated } = useStore();
  const preview = useSamplePreview();
  const reviews = [...(hydrated ? reviewsFor(product.id) : []), ...(preview ? sampleReviewsFor(product.id) : [])];

  if (!reviews.length) return null;

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const fit = fitSummary(reviews);

  return (
    <section id="reviews" className="scroll-mt-[90px] border-t border-navy/10 px-[16px] py-[48px] md:px-[36px] md:py-[64px]">
      <div className="mx-auto grid max-w-[1100px] gap-[32px] md:grid-cols-[300px_1fr] md:gap-[56px]">
        {/* Summary */}
        <div className="md:sticky md:top-[100px] md:self-start">
          <h2 className="font-display text-[30px] leading-[1.1] text-navy md:text-[36px]">Customer reviews</h2>
          <div className="mt-[16px] flex items-end gap-[12px]">
            <span className="font-display text-[52px] leading-none text-navy">{avg.toFixed(1)}</span>
            <div className="pb-[6px]">
              <Stars rating={avg} size={15} />
              <p className="mt-[3px] font-ui text-[12px] text-stone">
                Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
          <ul className="mt-[18px] space-y-[6px]">
            {[5, 4, 3, 2, 1].map((star) => {
              const n = reviews.filter((r) => Math.round(r.rating) === star).length;
              return (
                <li key={star} className="flex items-center gap-[10px] font-ui text-[12px] text-ink-soft">
                  <span className="w-[34px]">{star} star</span>
                  <span className="h-[6px] flex-1 overflow-hidden rounded-full bg-navy/10">
                    <span className="block h-full rounded-full bg-gold-deep" style={{ width: `${(n / reviews.length) * 100}%` }} />
                  </span>
                  <span className="w-[16px] text-right tabular-nums">{n}</span>
                </li>
              );
            })}
          </ul>
          {fit ? (
            <div className="mt-[20px] rounded-[6px] bg-[#faf7ef] px-[14px] py-[12px]">
              <p className="font-ui text-[12px] font-semibold text-navy">Fit</p>
              <div className="relative mt-[10px] h-[4px] rounded-full bg-navy/10">
                <span
                  className="absolute top-1/2 size-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-navy shadow"
                  style={{ left: `${50 + (reviews.filter((r) => r.fit === "Runs large").length - reviews.filter((r) => r.fit === "Runs small").length) / reviews.length * 50}%` }}
                />
              </div>
              <div className="mt-[6px] flex justify-between font-ui text-[10.5px] text-stone">
                <span>Small</span>
                <span>True to size</span>
                <span>Large</span>
              </div>
              <p className="mt-[8px] font-ui text-[12px] text-ink-soft">{fit.label}</p>
            </div>
          ) : null}
        </div>

        {/* List */}
        <ul className="divide-y divide-navy/10 border-t border-navy/10 md:border-t-0">
          {reviews.map((r) => (
            <li key={r.id} className="py-[22px] first:pt-[22px] md:first:pt-0">
              <div className="flex items-center justify-between gap-[12px]">
                <Stars rating={r.rating} size={13} />
                <span className="font-ui text-[11.5px] text-stone">{formatDate(r.createdAt)}</span>
              </div>
              <p className="mt-[8px] font-ui text-[14px] font-semibold text-ink">{r.title}</p>
              <p className="mt-[4px] font-ui text-[13.5px] leading-[1.65] text-ink-soft">{r.body}</p>
              <div className="mt-[10px] flex flex-wrap items-center gap-x-[10px] gap-y-[4px] font-ui text-[11.5px] text-stone">
                <span className="font-medium text-ink">
                  {r.name}
                  {r.city ? <span className="font-normal text-stone">, {r.city}</span> : null}
                </span>
                {r.verified ? (
                  <span className="inline-flex items-center gap-[3px] text-[#2f6b3a]">
                    <SealCheck size={13} weight="fill" aria-hidden />
                    Verified buyer
                  </span>
                ) : null}
                {r.size ? <span>Bought size {r.size}</span> : null}
                {r.build ? <span>{r.build}</span> : null}
              </div>
              {r.helpful ? (
                <p className="mt-[8px] inline-flex items-center gap-[5px] font-ui text-[11px] text-stone">
                  <ThumbsUp size={12} aria-hidden />
                  {r.helpful} found this helpful
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
