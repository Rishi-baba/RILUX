"use client";

import { useEffect, useState } from "react";
import { SealCheck, ThumbsUp } from "@phosphor-icons/react/ssr";
import { ChevronLeft, ChevronRight, X } from "@/components/icons";
import { Placeholder, type PlaceholderTone } from "@/components/Placeholder";
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

type ReviewPhoto = { tone: PlaceholderTone; review: ProductReview; key: string };

/** Full-screen photo viewer with prev/next, the review it came from, and Esc / arrow-key support. */
function PhotoViewer({ photos, index, onIndex, onClose }: { photos: ReviewPhoto[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const photo = photos[index];
  const step = (d: number) => onIndex((index + d + photos.length) % photos.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, photos.length, onIndex, onClose]);

  const navBtn = "absolute top-1/2 flex size-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow transition-colors hover:bg-white";

  return (
    <div role="dialog" aria-modal="true" aria-label="Customer photo" className="fixed inset-0 z-[80] flex items-center justify-center p-[16px]">
      <div onClick={onClose} className="absolute inset-0 bg-black/70" />
      <div className="relative flex w-full max-w-[860px] flex-col overflow-hidden rounded-[8px] bg-white md:flex-row">
        <div className="relative aspect-[4/5] w-full md:w-[56%]">
          <Placeholder tone={photo.tone} label="Customer photo" />
          {photos.length > 1 ? (
            <>
              <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={`${navBtn} left-[12px]`}>
                <ChevronLeft size={18} />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next photo" className={`${navBtn} right-[12px]`}>
                <ChevronRight size={18} />
              </button>
            </>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-[20px] md:p-[28px]">
          <div className="flex items-center justify-between">
            <Stars rating={photo.review.rating} size={13} />
            <button type="button" onClick={onClose} aria-label="Close" className="-mr-[6px] flex size-[32px] items-center justify-center rounded-full text-ink hover:bg-black/5">
              <X size={18} />
            </button>
          </div>
          <p className="mt-[10px] font-ui text-[14px] font-semibold text-ink">{photo.review.title}</p>
          <p className="mt-[4px] font-ui text-[13px] leading-[1.65] text-ink-soft">{photo.review.body}</p>
          <p className="mt-[12px] font-ui text-[12px] text-stone">
            <span className="font-medium text-ink">{photo.review.name}</span>
            {photo.review.size ? ` · Size ${photo.review.size}` : null}
          </p>
          <p className="mt-auto pt-[16px] font-ui text-[11.5px] text-stone">
            {index + 1} / {photos.length}
          </p>
        </div>
      </div>
    </div>
  );
}

// Customer reviews list (read-only) with a rating summary. Sample reviews appear on preview hosts only.
export function ProductReviews({ product }: { product: Product }) {
  const { reviewsFor, hydrated } = useStore();
  const preview = useSamplePreview();
  const reviews = [...(hydrated ? reviewsFor(product.id) : []), ...(preview ? sampleReviewsFor(product.id) : [])];

  const [viewing, setViewing] = useState<number | null>(null);

  if (!reviews.length) return null;

  const photos: ReviewPhoto[] = reviews.flatMap((r) => (r.photos ?? []).map((tone, j) => ({ tone, review: r, key: `${r.id}-${j}` })));
  const openPhoto = (key: string) => setViewing(photos.findIndex((p) => p.key === key));
  const STRIP = 6;

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

        <div className="min-w-0">
        {/* All customer photos */}
        {photos.length > 0 ? (
          <div className="border-t border-navy/10 pb-[22px] pt-[22px] md:border-t-0 md:pt-0">
            <p className="font-ui text-[12px] font-semibold text-navy">
              Customer photos <span className="font-normal text-stone">({photos.length})</span>
            </p>
            <ul className="mt-[12px] grid grid-cols-4 gap-[6px] sm:grid-cols-6">
              {photos.slice(0, STRIP).map((p, i) => {
                const more = i === STRIP - 1 && photos.length > STRIP ? photos.length - STRIP : 0;
                return (
                  <li key={p.key} className={i >= 4 ? "hidden sm:block" : undefined}>
                    <button
                      type="button"
                      onClick={() => setViewing(i)}
                      aria-label={more ? `View all ${photos.length} photos` : `View photo from ${p.review.name}`}
                      className="group relative block aspect-square w-full overflow-hidden rounded-[4px]"
                    >
                      <Placeholder tone={p.tone} className="transition-transform duration-300 group-hover:scale-105" />
                      {more ? (
                        <span className="absolute inset-0 flex items-center justify-center bg-navy/60 font-ui text-[13px] font-medium text-white">
                          +{more}
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {/* List */}
        <ul className="divide-y divide-navy/10 border-t border-navy/10">
          {reviews.map((r) => (
            <li key={r.id} className="py-[22px] first:pt-[22px] md:first:pt-0">
              <div className="flex items-center justify-between gap-[12px]">
                <Stars rating={r.rating} size={13} />
                <span className="font-ui text-[11.5px] text-stone">{formatDate(r.createdAt)}</span>
              </div>
              <p className="mt-[8px] font-ui text-[14px] font-semibold text-ink">{r.title}</p>
              <p className="mt-[4px] font-ui text-[13.5px] leading-[1.65] text-ink-soft">{r.body}</p>
              {r.photos?.length ? (
                <ul className="mt-[12px] flex gap-[6px]">
                  {r.photos.map((tone, j) => (
                    <li key={j}>
                      <button
                        type="button"
                        onClick={() => openPhoto(`${r.id}-${j}`)}
                        aria-label={`View photo ${j + 1} from ${r.name}`}
                        className="group relative block h-[80px] w-[64px] overflow-hidden rounded-[4px]"
                      >
                        <Placeholder tone={tone} className="transition-transform duration-300 group-hover:scale-105" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
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
      </div>
      {viewing !== null && photos[viewing] ? (
        <PhotoViewer photos={photos} index={viewing} onIndex={setViewing} onClose={() => setViewing(null)} />
      ) : null}
    </section>
  );
}
