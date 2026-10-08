// Neutral placeholder content. Lengths roughly match the source layout so text
// wraps the same way; none of it is taken from the target site.
import type {
  FabricSlide,
  FeaturedProductSlide,
  FooterColumn,
  NavItem,
  Product,
  Slide,
  Tile,
} from "@/types/content";
import type { PlaceholderTone } from "@/components/Placeholder";

export const brandName = "BRAND";

export const announcement = {
  message: "Placeholder offer message here.",
  cta: "Shop now",
};

export const navItems: NavItem[] = [
  { label: "Shop All", href: "#" },
  { label: "Shirts", href: "#", hasDropdown: true },
  { label: "Trousers", href: "#", hasDropdown: true },
  { label: "Essentials", href: "#", hasDropdown: true },
  { label: "Outerwear", href: "#", hasDropdown: true },
  { label: "Linen", href: "#", badge: "New" },
  { label: "Denim", href: "#" },
  { label: "New In", href: "#" },
];

const tones: PlaceholderTone[] = ["warm", "cool", "sand", "olive", "stone", "dark"];
const tone = (i: number) => tones[i % tones.length];

export const heroSlides: Slide[] = Array.from({ length: 5 }, (_, i) => ({
  id: `hero-${i}`,
  tone: tone(i),
  href: "#",
}));

export const products: Product[] = Array.from({ length: 12 }, (_, i) => ({
  id: `p-${i}`,
  title: `Placeholder Product Name ${i + 1}`,
  category: "Category Name",
  price: "₹0,000.00",
  tone: tone(i),
  altTone: tone(i + 2),
  tag: i % 4 === 3 ? "Tag Label" : undefined,
  colorCount: i % 3 === 0 ? 3 : undefined,
}));

export const categoryTiles: Tile[] = [
  "Category One",
  "Two",
  "Category Three",
  "Category Four",
  "Category Five",
  "Six",
].map((title, i) => ({ title, href: "#", tone: tone(i) }));

export const roundedTiles: Tile[] = [
  "Collection One",
  "Collection Two",
  "Collection Three",
  "Collection Four",
].map((title, i) => ({ title, href: "#", tone: tone(i + 1) }));

export const stripTiles: Tile[] = [
  "Feature One",
  "Feature Two Here",
  "Feature Three",
].map((title, i) => ({ title, href: "#", tone: tone(i + 3) }));

export const occasionTiles: Tile[] = [
  "Occasion One",
  "Occasion Two",
  "Occasion Three",
  "Occasion Four",
  "Occasion Five",
  "Occasion Six",
].map((title, i) => ({ title, href: "#", tone: tone(i) }));

export const signatureSlides: Tile[] = [
  "Line One",
  "Line Two",
  "Line Three",
  "Line Four",
  "Line Five",
].map((title, i) => ({ title, href: "#", tone: tone(i + 2) }));

export const featuredProducts: FeaturedProductSlide[] = Array.from({ length: 5 }, (_, i) => ({
  id: `fp-${i}`,
  eyebrow: "Featured",
  title: `Placeholder Featured Product ${i + 1}`,
  price: "₹0,000.00",
  cta: "Shop now",
  bgTone: tone(i),
  thumbTone: tone(i + 3),
}));

export const fabricSlides: FabricSlide[] = Array.from({ length: 8 }, (_, i) => ({
  title: `Fabric Feature ${i + 1}`,
  body: "Placeholder description of the fabric and its benefits. Two or three short lines of copy explain what makes this material worth choosing.",
  tone: tone(i),
}));

export const footerColumns: FooterColumn[] = [
  {
    heading: "Company",
    links: ["About Us", "Terms & Conditions", "Privacy Policy", "Returns & Exchanges", "Shipping Policy"],
  },
  {
    heading: "Help",
    links: ["Contact Us", "Track Order", "Request a Return", "FAQs"],
  },
];

export const headings = {
  newArrivals: "Section Title",
  shopByCategory: "Section Title Here",
  wardrobe: "Section Title Lorem",
  signature: ["Section Title", "Second Line"],
  fabric: ["Section", "Title"],
  bestsellers: { lead: "Overline", strong: "Headline" },
  occasion: "Section Title",
};
