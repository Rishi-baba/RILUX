import type { CartLine } from "@/types/content";

// Demo pricing rules shared by the cart, checkout and success pages.

export const LAST_ORDER_KEY = "rilux-last-order";

export const STANDARD_FEE = 99;
export const EXPRESS_FEE = 249;

export type ShippingMethod = "standard" | "express";

/** Standard shipping is free on every order (the first reward tier unlocks with one shirt). */
export function standardFee(subtotal: number): number {
  return subtotal > 0 ? 0 : STANDARD_FEE;
}

/** Cart rewards, unlocked by number of shirts: shown as checkpoints on the cart progress bar. */
export const rewardTiers = [
  { shirts: 1, label: "Free shipping", percent: 0 },
  { shirts: 2, label: "10% off", percent: 10 },
  { shirts: 3, label: "15% off", percent: 15 },
] as const;

export function rewardPercent(shirts: number): number {
  return rewardTiers.reduce((pct, t) => (shirts >= t.shirts ? t.percent : pct), 0);
}

/** Rupee discount for the current cart (rounded to whole rupees). */
export function rewardDiscount(subtotal: number, shirts: number): number {
  return Math.round((subtotal * rewardPercent(shirts)) / 100);
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
  /** multi-shirt reward discount in rupees */
  discount?: number;
  shipping: number;
  total: number;
}
