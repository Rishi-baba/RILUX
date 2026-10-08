"use client";

import { useState, type FormEvent } from "react";
import { MessageSquareText } from "lucide-react";
import { StarPicker, Stars } from "@/components/Stars";
import { sampleReviewsFor } from "@/lib/content";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Product, ReviewFit } from "@/types/content";

const fits: ReviewFit[] = ["Runs small", "True to size", "Runs large"];

const input =
  "h-[46px] w-full rounded-[4px] border border-black/20 bg-white px-[14px] font-ui text-[14px] text-black outline-none focus:border-black";
const label = "mb-[6px] block font-ui text-[12px] uppercase tracking-[0.08em] text-ink-soft";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

// Customer reviews: rating summary + distribution, a "Write a review" form and the list.
// Front-end only — reviews are saved in the visitor's browser via the store.
export function ProductReviews({ product }: { product: Product }) {
  const { reviewsFor, addReview, hydrated, notify, user } = useStore();
  // Real (browser-saved) reviews first, then clearly tagged sample reviews while enabled.
  const samples = sampleReviewsFor(product.id);
  const reviews = [...(hydrated ? reviewsFor(product.id) : []), ...samples];
  const isSample = (id: string) => id.startsWith("sample-");
  const [formOpen, setFormOpen] = useState(false);

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [fit, setFit] = useState<ReviewFit | "">("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const count = reviews.length;
  const average = count ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0;
  const distribution = [5, 4, 3, 2, 1].map((star) => ({ star, n: reviews.filter((r) => r.rating === star).length }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!rating) next.rating = "Please choose a rating";
    if (!title.trim()) next.title = "Please add a title";
    if (body.trim().length < 10) next.body = "Please write at least a sentence";
    const reviewer = name.trim() || user?.firstName || "";
    if (!reviewer) next.name = "Please add your name";
    setErrors(next);
    if (Object.keys(next).length) return;

    addReview({
      productId: product.id,
      rating,
      title: title.trim(),
      body: body.trim(),
      name: reviewer,
      size: size || undefined,
      fit: fit || undefined,
    });
    notify("Thanks for your review");
    setRating(0);
    setTitle("");
    setBody("");
    setName("");
    setSize("");
    setFit("");
    setFormOpen(false);
  };

  return (
    <section id="reviews" className="scroll-mt-[90px] border-t border-black/10 px-[16px] py-[48px] md:px-[36px] md:py-[64px]">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="text-center font-display text-[30px] uppercase leading-[1.1] text-black md:text-[40px]">Customer Reviews</h2>

        {/* Summary */}
        <div className="mt-[28px] flex flex-col items-center gap-[24px] border-b border-black/10 pb-[32px] md:flex-row md:justify-between md:gap-[48px]">
          {count ? (
            <>
              <div className="flex flex-col items-center md:items-start">
                <p className="font-display text-[48px] leading-none text-black">{average.toFixed(1)}</p>
                <Stars rating={average} size={18} className="mt-[8px]" />
                <p className="mt-[6px] font-ui text-[13px] text-stone">
                  Based on {count} {count === 1 ? "review" : "reviews"}
                </p>
                {samples.length ? (
                  <p className="mt-[4px] font-ui text-[11px] text-stone">Includes sample reviews shown for preview</p>
                ) : null}
              </div>
              <ul className="w-full max-w-[360px] space-y-[6px]">
                {distribution.map(({ star, n }) => (
                  <li key={star} className="flex items-center gap-[10px] font-ui text-[12px] text-ink-soft">
                    <span className="w-[42px]">{star} star</span>
                    <span className="h-[6px] flex-1 overflow-hidden rounded-full bg-black/10">
                      <span className="block h-full bg-black" style={{ width: `${count ? (n / count) * 100 : 0}%` }} />
                    </span>
                    <span className="w-[20px] text-right">{n}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <Stars rating={0} size={18} />
              <p className="mt-[10px] font-ui text-[15px] text-black">No reviews yet</p>
              <p className="mt-[4px] font-ui text-[13px] text-stone">Bought this shirt? Be the first to share how it fits and wears.</p>
            </div>
          )}
          <button
            type="button"
            onClick={() => setFormOpen((o) => !o)}
            aria-expanded={formOpen}
            className="h-[46px] flex-none border border-black px-[28px] font-ui text-[13px] uppercase tracking-[0.1em] text-black transition-colors hover:bg-black hover:text-white"
          >
            {formOpen ? "Cancel" : "Write a review"}
          </button>
        </div>

        {/* Form */}
        {formOpen ? (
          <form onSubmit={submit} noValidate className="mx-auto mt-[32px] grid max-w-[720px] gap-[18px]">
            <div>
              <span className={label}>Your rating</span>
              <StarPicker value={rating} onChange={setRating} />
              {errors.rating ? <p className="mt-[6px] font-ui text-[12px] text-red-600">{errors.rating}</p> : null}
            </div>
            <div>
              <label htmlFor="review-title" className={label}>Title</label>
              <input id="review-title" className={input} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Sum it up in a few words" />
              {errors.title ? <p className="mt-[6px] font-ui text-[12px] text-red-600">{errors.title}</p> : null}
            </div>
            <div>
              <label htmlFor="review-body" className={label}>Review</label>
              <textarea
                id="review-body"
                rows={5}
                className={cn(input, "h-auto py-[12px]")}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="How does it fit, feel and wear?"
              />
              {errors.body ? <p className="mt-[6px] font-ui text-[12px] text-red-600">{errors.body}</p> : null}
            </div>
            <div className="grid gap-[18px] md:grid-cols-3">
              <div>
                <label htmlFor="review-name" className={label}>Name</label>
                <input id="review-name" className={input} value={name} onChange={(e) => setName(e.target.value)} placeholder={user?.firstName ?? "Your name"} />
                {errors.name ? <p className="mt-[6px] font-ui text-[12px] text-red-600">{errors.name}</p> : null}
              </div>
              <div>
                <label htmlFor="review-size" className={label}>Size bought</label>
                <select id="review-size" className={input} value={size} onChange={(e) => setSize(e.target.value)}>
                  <option value="">Select</option>
                  {product.sizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="review-fit" className={label}>Fit</label>
                <select id="review-fit" className={input} value={fit} onChange={(e) => setFit(e.target.value as ReviewFit | "")}>
                  <option value="">Select</option>
                  {fits.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col items-start gap-[8px]">
              <button type="submit" className="h-[50px] bg-black px-[36px] font-ui text-[13px] uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-85">
                Submit review
              </button>
              <p className="font-ui text-[11px] text-stone">Demo store: reviews are saved only in this browser.</p>
            </div>
          </form>
        ) : null}

        {/* List */}
        {count ? (
          <ul className="mt-[8px] divide-y divide-black/10">
            {reviews.map((r) => (
              <li key={r.id} className="grid gap-[12px] py-[28px] md:grid-cols-[220px_1fr] md:gap-[40px]">
                <div>
                  <p className="flex items-center gap-[8px] font-ui text-[14px] font-semibold text-black">
                    {r.name}
                    {isSample(r.id) ? (
                      <span className="rounded-[3px] bg-mist px-[6px] py-[2px] font-ui text-[10px] font-normal uppercase tracking-[0.08em] text-stone">
                        Sample
                      </span>
                    ) : null}
                  </p>
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
        ) : !formOpen ? (
          <div className="mt-[32px] flex flex-col items-center gap-[8px] text-center text-stone">
            <MessageSquareText className="size-[28px]" strokeWidth={1.25} aria-hidden />
          </div>
        ) : null}
      </div>
    </section>
  );
}
