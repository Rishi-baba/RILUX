"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Feather, Minus, Plus, Ruler, Share2, Shirt, Sparkles, type LucideIcon } from "lucide-react";

import { HeartIcon } from "@/components/icons";
import { Stars } from "@/components/Stars";
import { useSamplePreview } from "@/hooks/useSamplePreview";
import { sampleReviewsFor } from "@/lib/content";
import { DeliveryEstimate } from "@/components/product/DeliveryEstimate";
import { Placeholder } from "@/components/Placeholder";
import { ProductAccordion } from "@/components/product/ProductAccordion";
import { SizeGuide } from "@/components/product/SizeGuide";
import { routes, shippingNote } from "@/lib/content";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/content";

const featureIcons: LucideIcon[] = [Feather, Shirt, Sparkles, Ruler];

const actionBtn =
  "flex h-[50px] flex-1 items-center justify-center font-ui text-[14px] uppercase tracking-[0.1em] transition-opacity hover:opacity-85";

export function ProductInfo({
  product,
  colorIndex,
  onColorChange,
}: {
  product: Product;
  colorIndex: number;
  onColorChange: (i: number) => void;
}) {
  const router = useRouter();
  const { addToCart, setOpenPanel, toggleWishlist, isWishlisted, notify, reviewsFor, hydrated } = useStore();
  const realCount = hydrated ? reviewsFor(product.id).length : 0;
  const preview = useSamplePreview();
  const reviews = [...(hydrated ? reviewsFor(product.id) : []), ...(preview ? sampleReviewsFor(product.id) : [])];
  const avgRating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const sizeGridRef = useRef<HTMLDivElement>(null);
  const addBtnRef = useRef<HTMLButtonElement>(null);

  const wishlisted = isWishlisted(product.id);
  const color = product.colors[colorIndex];

  // Mobile sticky bar: show once the main Add to cart button has scrolled above the viewport.
  useEffect(() => {
    const el = addBtnRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const requireSize = () => {
    if (size) return true;
    setSizeError(true);
    sizeGridRef.current?.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(-4px)" },
        { transform: "translateX(4px)" },
        { transform: "translateX(0)" },
      ],
      { duration: 400, easing: "ease-in-out" },
    );
    sizeGridRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  };

  const add = () => {
    if (!size) return false;
    addToCart({ productId: product.id, size, color: color?.name ?? "" }, quantity);
    return true;
  };

  const onAddToCart = () => {
    if (!requireSize() || !add()) return;
    setOpenPanel("cart");
  };

  const onBuyNow = () => {
    if (!requireSize() || !add()) return;
    router.push(routes.checkout);
  };

  const onWishlist = () => {
    toggleWishlist(product.id);
    notify(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const onShare = async () => {
    const url = window.location.href;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: product.title, url });
      } catch {
        // dismissed by the user
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      notify("Link copied");
    } catch {
      notify("Unable to copy link");
    }
  };

  return (
    <div className="self-start px-[16px] pb-[32px] pt-[8px] md:sticky md:top-[86px] md:px-0 md:pb-0 md:pt-0">
      <p className="font-ui text-[13px] italic text-[rgb(150,95,50)]">{shippingNote}</p>

      <div className="mt-[8px] flex items-start justify-between gap-[12px]">
        <h1 className="font-display text-[28px] leading-[1.15] capitalize text-black">{product.title}</h1>
        <div className="flex flex-none items-center gap-[4px] pt-[2px]">
          <button
            type="button"
            onClick={onWishlist}
            aria-pressed={wishlisted}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="flex size-[36px] items-center justify-center text-black"
          >
            <HeartIcon
              className={cn("size-[20px]", wishlisted && "fill-black")}
              strokeWidth={1.5}
            />
          </button>
          <button
            type="button"
            onClick={onShare}
            aria-label="Share this product"
            className="flex size-[36px] items-center justify-center text-black"
          >
            <Share2 className="size-[19px]" strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <p className="mt-[4px] font-ui text-[13px] text-stone">{product.category}</p>
      {reviews.length ? (
        <a href="#reviews" className="mt-[8px] inline-flex items-center gap-[8px] font-ui text-[12px] text-ink-soft hover:text-black">
          <Stars rating={avgRating} size={13} />
          <span className="underline underline-offset-[3px]">
            {`${reviews.length} ${reviews.length === 1 ? "review" : "reviews"}${reviews.length > realCount ? " (incl. samples)" : ""}`}
          </span>
        </a>
      ) : null}

      {product.features.length ? (
        <ul className="mt-[16px] flex flex-wrap items-center gap-[18px] rounded-[4px] border border-black/10 px-[12px] py-[10px]">
          {product.features.map((feature, i) => {
            const Icon = featureIcons[i % featureIcons.length];
            return (
              <Fragment key={feature}>
                {i > 0 ? <li aria-hidden className="h-[16px] w-px bg-black/15" /> : null}
                <li className="flex items-center gap-[6px] font-ui text-[11px] text-black">
                  <Icon className="size-[16px]" strokeWidth={1.5} aria-hidden />
                  {feature}
                </li>
              </Fragment>
            );
          })}
        </ul>
      ) : null}

      <div className="my-[18px]">
        <p className="font-ui text-[24px] text-black">{product.price}</p>
        <p className="font-ui text-[12px] text-stone">Inclusive of all taxes</p>
      </div>

      <DeliveryEstimate />

      {/* Size */}
      <div className="mt-[24px]">
        <div className="mb-[10px] flex items-center justify-between">
          <span id="size-label" className="font-ui text-[14px] text-black">
            Size{size ? ` — ${size}` : ""}
          </span>
          <button
            type="button"
            onClick={() => setGuideOpen(true)}
            className="font-ui text-[12px] text-black underline underline-offset-2"
          >
            Size guide
          </button>
        </div>
        <div
          ref={sizeGridRef}
          role="radiogroup"
          aria-labelledby="size-label"
          aria-describedby={sizeError ? "size-error" : undefined}
          className="grid grid-cols-5 gap-[8px]"
        >
          {product.sizes.map((s) => {
            const selected = size === s;
            return (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => {
                  setSize(s);
                  setSizeError(false);
                }}
                className={cn(
                  "h-[44px] border font-ui text-[14px] transition-colors",
                  selected
                    ? "border-[1.5px] border-black bg-black text-white"
                    : "border-black/20 text-black hover:border-black",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
        {sizeError ? (
          <p id="size-error" role="alert" className="mt-[8px] font-ui text-[12px] text-red-600">
            Please select a size
          </p>
        ) : null}
      </div>

      {/* Colour */}
      {product.colors.length ? (
        <div className="mt-[22px]">
          <p id="colour-label" className="mb-[10px] font-ui text-[14px] text-black">
            Colour — {color?.name}
          </p>
          <div role="radiogroup" aria-labelledby="colour-label" className="flex flex-wrap gap-[10px]">
            {product.colors.map((c, i) => {
              const selected = i === colorIndex;
              return (
                <button
                  key={c.name}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={c.name}
                  onClick={() => onColorChange(i)}
                  className={cn(
                    "relative h-[64px] w-[52px] overflow-hidden rounded-[2px]",
                    selected && "outline outline-[1.5px] outline-offset-2 outline-black",
                  )}
                >
                  <Placeholder tone={c.tone} />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Quantity + actions */}
      <div className="mt-[24px] flex h-[46px] w-[130px] items-center justify-between border border-black/20">
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={quantity <= 1}
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-full w-[42px] items-center justify-center text-black disabled:opacity-30"
        >
          <Minus className="size-[16px]" strokeWidth={1.5} />
        </button>
        <span aria-live="polite" aria-label={`Quantity ${quantity}`} className="font-ui text-[14px] text-black">
          {quantity}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQuantity((q) => Math.min(10, q + 1))}
          className="flex h-full w-[42px] items-center justify-center text-black"
        >
          <Plus className="size-[16px]" strokeWidth={1.5} />
        </button>
      </div>

      <div className="mt-[12px] flex gap-[10px]">
        <button
          ref={addBtnRef}
          type="button"
          onClick={onAddToCart}
          className={cn(actionBtn, "border border-black bg-white text-black")}
        >
          Add to cart
        </button>
        <button type="button" onClick={onBuyNow} className={cn(actionBtn, "bg-brand text-white")}>
          Buy it now
        </button>
      </div>

      <ProductAccordion
        items={[
          { title: "Description", content: product.description },
          { title: "Material & Care", content: product.materialCare },
          { title: "Product Details", content: product.details },
          {
            title: "Shipping & Returns",
            content: [
              "Dispatched within 2 business days.",
              "Free shipping on every order across India.",
              "Easy size or style exchanges within 7 days of delivery.",
            ],
          },
        ]}
      />

      {/* Mobile sticky add-to-cart bar */}
      <div
        aria-hidden={!showBar}
        inert={!showBar}
        className={cn(
          "fixed inset-x-0 bottom-[60px] z-40 flex items-center justify-between gap-[12px] bg-white px-[16px] py-[10px] shadow-[0_-4px_16px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-theme md:hidden",
          showBar ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="min-w-0">
          <p className="truncate font-display text-[15px] capitalize text-black">{product.title}</p>
          <p className="font-ui text-[14px] text-black">{product.price}</p>
        </div>
        <button
          type="button"
          onClick={onAddToCart}
          className="h-[44px] flex-none bg-brand px-[22px] font-ui text-[13px] uppercase tracking-[0.1em] text-white"
        >
          Add to cart
        </button>
      </div>

      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  );
}
