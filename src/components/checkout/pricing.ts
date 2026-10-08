import { freeShippingThreshold } from "@/lib/content";
import type { CartLine } from "@/types/content";

// Demo pricing rules shared by the cart, checkout and success pages.

export const COUPON_KEY = "rilux-coupon";
export const LAST_ORDER_KEY = "rilux-last-order";

export const STANDARD_FEE = 99;
export const EXPRESS_FEE = 249;

const coupons: Record<string, number> = { CODE10: 10, CODE20: 20, CODE30: 30, CODE40: 40 };

/** Percent off for a valid code, otherwise null. Case-insensitive. */
export function couponPercent(code: string | null | undefined): number | null {
  if (!code) return null;
  return coupons[code.trim().toUpperCase()] ?? null;
}

export function discountFor(subtotal: number, code: string | null | undefined): number {
  const pct = couponPercent(code);
  return pct ? Math.round(subtotal * pct) / 100 : 0;
}

export type ShippingMethod = "standard" | "express";

export function standardFee(subtotal: number): number {
  return subtotal >= freeShippingThreshold ? 0 : STANDARD_FEE;
}

export function shippingFor(subtotal: number, method: ShippingMethod = "standard"): number {
  return method === "express" ? EXPRESS_FEE : standardFee(subtotal);
}

export const shippingLabels: Record<ShippingMethod, string> = {
  standard: "Standard (4–6 days)",
  express: "Express (1–2 days)",
};

export type PaymentMethod = "cod" | "online";

export const paymentLabels: Record<PaymentMethod, string> = {
  cod: "Cash on delivery",
  online: "Pay online (connect a payment provider)",
};

export interface ShippingAddress {
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pin: string;
  phone: string;
}

/** Snapshot written to sessionStorage on "Place order" and read by the success page. */
export interface LastOrder {
  id: string;
  createdAt: string;
  email: string;
  address: ShippingAddress;
  method: ShippingMethod;
  payment: PaymentMethod;
  lines: CartLine[];
  subtotal: number;
  discount: number;
  coupon: string | null;
  shipping: number;
  total: number;
}
