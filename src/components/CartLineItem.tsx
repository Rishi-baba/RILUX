"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Placeholder } from "@/components/Placeholder";
import { formatPrice, getProductById, routes } from "@/lib/content";
import { useStore } from "@/lib/store";
import type { CartLine } from "@/types/content";
import { cn } from "@/lib/utils";

/** One cart row with thumbnail, variant, quantity stepper and remove. `index` is the line's position in `cart`. */
export function CartLineItem({
  line,
  index,
  onNavigate,
  size = "sm",
}: {
  line: CartLine;
  index: number;
  onNavigate?: () => void;
  size?: "sm" | "lg";
}) {
  const { updateQuantity, removeLine } = useStore();
  const product = getProductById(line.productId);
  if (!product) return null;
  const color = product.colors.find((c) => c.name === line.color);

  return (
    <div className="flex gap-4">
      <Link
        href={routes.product(product.slug)}
        onClick={onNavigate}
        className={cn("relative flex-none overflow-hidden", size === "sm" ? "h-[110px] w-[88px]" : "h-[150px] w-[120px]")}
      >
        <Placeholder tone={color?.tone ?? product.tone} />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={routes.product(product.slug)}
            onClick={onNavigate}
            className="font-display text-[16px] leading-tight capitalize text-black hover:underline"
          >
            {product.title}
          </Link>
          <button
            type="button"
            onClick={() => removeLine(index)}
            aria-label={`Remove ${product.title}`}
            className="flex-none text-stone hover:text-black"
          >
            <Trash2 size={16} strokeWidth={1.5} />
          </button>
        </div>
        <p className="mt-1 font-ui text-[12px] text-stone">
          {line.color} / {line.size}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="inline-flex h-[34px] items-center border border-black/15">
            <button
              type="button"
              onClick={() => updateQuantity(index, line.quantity - 1)}
              aria-label="Decrease quantity"
              className="flex h-full w-[34px] items-center justify-center hover:bg-black/5"
            >
              <Minus size={14} />
            </button>
            <span className="w-[32px] text-center font-ui text-[13px]" aria-live="polite">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(index, line.quantity + 1)}
              aria-label="Increase quantity"
              className="flex h-full w-[34px] items-center justify-center hover:bg-black/5"
            >
              <Plus size={14} />
            </button>
          </div>
          <span className="font-ui text-[14px] tracking-[0.3px] text-black">
            {formatPrice(product.priceValue * line.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
