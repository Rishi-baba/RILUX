import type { PlaceholderTone } from "@/components/Placeholder";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  badge?: string;
  children?: NavLink[];
}

/** Catalogue attributes used for filtering (from the Rilux style sheet) */
export interface ProductAttributes {
  fit: "Formal" | "Regular" | "Casual";
  sleeve: "Full Sleeve" | "Half Sleeve";
  fabric: string;
  pocket: "No Pocket" | "Single Pocket" | "Double Pocket";
  placket: "Standard Placket" | "Concealed Placket" | "Self-Fold Placket";
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  /** Display price, e.g. "₹1,999.00" */
  price: string;
  /** Numeric price in rupees, used for cart totals, sorting and filters */
  priceValue: number;
  tone: PlaceholderTone;
  altTone: PlaceholderTone;
  /** Tones for the product-page gallery (4–6 images) */
  gallery: PlaceholderTone[];
  tag?: string;
  colorCount?: number;
  colors: ProductColor[];
  sizes: string[];
  /** Collection slugs this product belongs to */
  collections: string[];
  description: string;
  features: string[];
  materialCare: string[];
  details: string[];
  attributes: ProductAttributes;
}

export interface ProductColor {
  name: string;
  tone: PlaceholderTone;
}

export interface Collection {
  slug: string;
  title: string;
  tone: PlaceholderTone;
  /** Sibling/sub collections shown in the pill scroller at the top of the page */
  related?: string[];
  /** Short intro shown under the title on the collection page */
  description?: string;
}

export interface Tile {
  title: string;
  href: string;
  tone: PlaceholderTone;
}

export interface Slide {
  id: string;
  tone: PlaceholderTone;
  href: string;
}

export interface FeaturedProductSlide {
  id: string;
  eyebrow: string;
  title: string;
  price: string;
  cta: string;
  href: string;
  bgTone: PlaceholderTone;
  thumbTone: PlaceholderTone;
}

export interface FabricSlide {
  title: string;
  body: string;
  tone: PlaceholderTone;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface CartLine {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface MockUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface MockOrder {
  id: string;
  createdAt: string;
  lines: CartLine[];
  total: number;
  status: "Confirmed" | "Packed" | "Shipped" | "Delivered";
}

export type ReviewFit = "Runs small" | "True to size" | "Runs large";

/** A customer review written on the product page (stored in the browser in this demo) */
export interface ProductReview {
  id: string;
  productId: string;
  rating: number;
  title: string;
  body: string;
  name: string;
  size?: string;
  fit?: ReviewFit;
  createdAt: string;
}
