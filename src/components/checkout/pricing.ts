import { freeShippingThreshold } from "@/lib/content";
import type { CartLine } from "@/types/content";

// Demo pricing rules shared by the cart, checkout and success pages.

export const LAST_ORDER_KEY = "rilux-last-order";

export const STANDARD_FEE = 99;
export const EXPRESS_FEE = 249;

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
  shipping: number;
  total: number;
}
