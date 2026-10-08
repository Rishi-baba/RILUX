"use client";

import Link from "next/link";
import { CartLineItem } from "@/components/CartLineItem";
import { SidePanel } from "@/components/SidePanel";
import { BagIcon } from "@/components/icons";
import { formatPrice, freeShippingThreshold, routes } from "@/lib/content";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const button =
  "flex h-[46px] w-full items-center justify-center font-ui text-[14px] uppercase tracking-[0.08em] transition-opacity duration-[250ms] ease-theme hover:opacity-80";

/** Right drawer with free-shipping progress, cart lines and checkout actions. */
export function CartDrawer() {
  const { openPanel, setOpenPanel, cart, cartCount, cartSubtotal, hydrated } = useStore();
  const close = () => setOpenPanel(null);

  const lines = hydrated ? cart : [];
  const count = hydrated ? cartCount : 0;
  const subtotal = hydrated ? cartSubtotal : 0;
  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const footer =
    lines.length > 0 ? (
      <div>
        <div className="flex items-center justify-between font-ui text-[15px] text-ink">
          <span>Subtotal</span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-1 font-ui text-[12px] text-stone">Taxes and shipping calculated at checkout</p>
        <div className="mt-4 flex flex-col gap-2.5">
          <Link href={routes.cart} onClick={close} className={cn(button, "border border-black text-ink")}>
            View cart
          </Link>
          <Link href={routes.checkout} onClick={close} className={cn(button, "bg-brand text-white")}>
            Checkout
          </Link>
        </div>
      </div>
    ) : undefined;

  return (
    <SidePanel open={openPanel === "cart"} onClose={close} title={`Your Cart (${count})`} footer={footer}>
      {lines.length > 0 ? (
        <>
          <div className="border-b border-black/10 px-5 py-4">
            <p className="font-ui text-[13px] text-ink">
              {remaining > 0 ? (
                <>
                  You&apos;re <span className="font-semibold">{formatPrice(remaining)}</span> away from free shipping
                </>
              ) : (
                "You've unlocked free shipping"
              )}
            </p>
            <div
              role="progressbar"
              aria-label="Free shipping progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              className="mt-2.5 h-1 w-full bg-black/10"
            >
              <div
                className="h-full bg-brand transition-[width] duration-[250ms] ease-theme"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <ul className="flex flex-col gap-5 p-5">
            {lines.map((line, i) => (
              <li key={`${line.productId}-${line.size}-${line.color}`}>
                <CartLineItem line={line} index={i} onNavigate={close} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-5 py-16 text-center">
          <BagIcon aria-hidden size={40} strokeWidth={1} className="text-ink" />
          <p className="font-display text-[22px] text-ink">Your cart is empty</p>
          <Link
            href={routes.collection("all")}
            onClick={close}
            className={cn(button, "mt-2 w-auto bg-brand px-8 text-white")}
          >
            Continue shopping
          </Link>
        </div>
      )}
    </SidePanel>
  );
}
