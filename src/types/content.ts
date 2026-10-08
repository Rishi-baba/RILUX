import type { PlaceholderTone } from "@/components/Placeholder";

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  badge?: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  tone: PlaceholderTone;
  altTone: PlaceholderTone;
  tag?: string;
  colorCount?: number;
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
  bgTone: PlaceholderTone;
  thumbTone: PlaceholderTone;
}

export interface FabricSlide {
  title: string;
  body: string;
  tone: PlaceholderTone;
}

export interface FooterColumn {
  heading: string;
  links: string[];
}
