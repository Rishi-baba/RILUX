// Neutral placeholder content for the whole storefront. None of it is taken from
// the reference site — replace with real brand copy, products and imagery.
import type {
  Collection,
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

/* ------------------------------------------------------------------ routes */

export const routes = {
  home: "/",
  collection: (slug: string) => `/collections/${slug}`,
  product: (slug: string) => `/products/${slug}`,
  cart: "/cart",
  checkout: "/checkout",
  checkoutSuccess: "/checkout/success",
  wishlist: "/wishlist",
  search: (q?: string) => (q ? `/search?q=${encodeURIComponent(q)}` : "/search"),
  account: "/account",
  login: "/account/login",
  register: "/account/register",
  about: "/pages/about",
  contact: "/pages/contact",
  faq: "/pages/faq",
  trackOrder: "/pages/track-order",
  returns: "/pages/returns",
  terms: "/policies/terms",
  privacy: "/policies/privacy",
  refund: "/policies/refund",
  shipping: "/policies/shipping",
} as const;

/* ------------------------------------------------------------- collections */

const tones: PlaceholderTone[] = ["warm", "cool", "sand", "olive", "stone", "dark"];
const tone = (i: number) => tones[((i % tones.length) + tones.length) % tones.length];

export const collections: Collection[] = [
  { slug: "all", title: "All Products", tone: "stone" },
  { slug: "new-in", title: "New In", tone: "warm" },
  { slug: "shirts", title: "All Shirts", tone: "cool", related: ["formal-shirts", "casual-shirts", "linen", "stretch"] },
  { slug: "formal-shirts", title: "Formal Shirts", tone: "stone", related: ["shirts", "casual-shirts", "linen"] },
  { slug: "casual-shirts", title: "Casual Shirts", tone: "sand", related: ["shirts", "formal-shirts", "linen"] },
  { slug: "linen", title: "Linen", tone: "sand", related: ["shirts", "casual-shirts"] },
  { slug: "stretch", title: "Stretch Collection", tone: "olive", related: ["shirts", "trousers"] },
  { slug: "trousers", title: "All Trousers", tone: "warm", related: ["tailored-trousers", "chinos", "relaxed-trousers"] },
  { slug: "tailored-trousers", title: "Tailored Trousers", tone: "dark", related: ["trousers", "chinos"] },
  { slug: "chinos", title: "Chinos", tone: "sand", related: ["trousers", "tailored-trousers"] },
  { slug: "relaxed-trousers", title: "Relaxed Trousers", tone: "olive", related: ["trousers", "chinos"] },
  { slug: "essentials", title: "Essentials", tone: "stone", related: ["t-shirts", "polos"] },
  { slug: "t-shirts", title: "T-Shirts", tone: "stone", related: ["essentials", "polos"] },
  { slug: "polos", title: "Polos", tone: "warm", related: ["essentials", "t-shirts"] },
  { slug: "outerwear", title: "Outerwear", tone: "dark", related: ["jackets", "overshirts"] },
  { slug: "jackets", title: "Jackets", tone: "dark", related: ["outerwear", "overshirts"] },
  { slug: "overshirts", title: "Overshirts", tone: "olive", related: ["outerwear", "jackets"] },
  { slug: "denim", title: "Denim", tone: "cool", related: ["trousers"] },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

/* ---------------------------------------------------------------- products */

interface ProductSeed {
  type: string;
  category: string;
  price: number;
  collections: string[];
  sizes: string[];
}

const shirtSizes = ["S", "M", "L", "XL", "XXL"];
const waistSizes = ["28", "30", "32", "34", "36", "38"];

const seeds: ProductSeed[] = [
  { type: "Oxford Shirt", category: "Formal Shirts", price: 2299, collections: ["shirts", "formal-shirts"], sizes: shirtSizes },
  { type: "Poplin Shirt", category: "Formal Shirts", price: 2199, collections: ["shirts", "formal-shirts"], sizes: shirtSizes },
  { type: "Linen Shirt", category: "Casual Shirts", price: 2499, collections: ["shirts", "casual-shirts", "linen"], sizes: shirtSizes },
  { type: "Camp Collar Shirt", category: "Casual Shirts", price: 1999, collections: ["shirts", "casual-shirts"], sizes: shirtSizes },
  { type: "Stretch Shirt", category: "Formal Shirts", price: 2399, collections: ["shirts", "formal-shirts", "stretch"], sizes: shirtSizes },
  { type: "Flannel Shirt", category: "Casual Shirts", price: 2599, collections: ["shirts", "casual-shirts"], sizes: shirtSizes },
  { type: "Pleated Trouser", category: "Tailored Trousers", price: 2999, collections: ["trousers", "tailored-trousers"], sizes: waistSizes },
  { type: "Flat Front Trouser", category: "Tailored Trousers", price: 2799, collections: ["trousers", "tailored-trousers", "stretch"], sizes: waistSizes },
  { type: "Chino", category: "Chinos", price: 2299, collections: ["trousers", "chinos"], sizes: waistSizes },
  { type: "Drawstring Trouser", category: "Relaxed Trousers", price: 2199, collections: ["trousers", "relaxed-trousers", "linen"], sizes: waistSizes },
  { type: "Crew Tee", category: "T-Shirts", price: 999, collections: ["essentials", "t-shirts"], sizes: shirtSizes },
  { type: "Knit Polo", category: "Polos", price: 1799, collections: ["essentials", "polos"], sizes: shirtSizes },
  { type: "Overshirt", category: "Overshirts", price: 3499, collections: ["outerwear", "overshirts"], sizes: shirtSizes },
  { type: "Field Jacket", category: "Jackets", price: 4999, collections: ["outerwear", "jackets"], sizes: shirtSizes },
  { type: "Straight Jean", category: "Denim", price: 2999, collections: ["denim", "trousers"], sizes: waistSizes },
  { type: "Relaxed Jean", category: "Denim", price: 3199, collections: ["denim", "trousers"], sizes: waistSizes },
];

const colorNames = ["Ivory", "Navy", "Sand", "Olive", "Grey", "Charcoal"];

export const formatPrice = (value: number) =>
  `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// 32 products: two variants of every seed. Deterministic (no randomness) so SSR and client match.
export const products: Product[] = seeds.flatMap((seed, si) =>
  [0, 1].map((variant) => {
    const i = si * 2 + variant;
    const n = String(variant + 1).padStart(2, "0");
    const title = `${seed.type} ${n}`;
    const colorCount = 2 + (i % 3);
    const colors = Array.from({ length: colorCount }, (_, c) => ({
      name: colorNames[(i + c) % colorNames.length],
      tone: tone(i + c),
    }));
    const isNew = i % 5 === 0;
    return {
      id: `p-${i}`,
      slug: slugify(title),
      title,
      category: seed.category,
      price: formatPrice(seed.price + variant * 200),
      priceValue: seed.price + variant * 200,
      tone: tone(i),
      altTone: tone(i + 2),
      gallery: Array.from({ length: 6 }, (_, g) => tone(i + g)),
      tag: i % 4 === 3 ? "Tag Label" : undefined,
      colorCount: colorCount > 2 ? colorCount : undefined,
      colors,
      sizes: seed.sizes,
      collections: ["all", ...seed.collections, ...(isNew ? ["new-in"] : [])],
      description:
        "Placeholder product description. Two or three sentences about the fit, the fabric and when to wear it. Replace with your own copy.",
      features: ["Feature One", "Feature Two", "Feature Three"],
      materialCare: [
        "Placeholder fabric composition",
        "Machine wash cold, gentle cycle",
        "Do not bleach",
        "Iron on medium heat",
      ],
      details: ["Placeholder fit description", "Placeholder closure detail", "Placeholder pocket detail", "Model is 6'0\" wearing size M"],
    } satisfies Product;
  }),
);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const productsIn = (collectionSlug: string) =>
  products.filter((p) => p.collections.includes(collectionSlug));

export const searchProducts = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => `${p.title} ${p.category}`.toLowerCase().includes(q));
};

/* -------------------------------------------------------------- navigation */

export const announcement = {
  message: "Placeholder offer message here.",
  cta: "Shop now",
  href: routes.collection("all"),
};

export const navItems: NavItem[] = [
  { label: "Shop All", href: routes.collection("all") },
  {
    label: "Shirts",
    href: routes.collection("shirts"),
    hasDropdown: true,
    children: [
      { label: "Formal Shirts", href: routes.collection("formal-shirts") },
      { label: "Casual Shirts", href: routes.collection("casual-shirts") },
    ],
  },
  {
    label: "Trousers",
    href: routes.collection("trousers"),
    hasDropdown: true,
    children: [
      { label: "Tailored Trousers", href: routes.collection("tailored-trousers") },
      { label: "Chinos", href: routes.collection("chinos") },
      { label: "Relaxed Trousers", href: routes.collection("relaxed-trousers") },
    ],
  },
  {
    label: "Essentials",
    href: routes.collection("essentials"),
    hasDropdown: true,
    children: [
      { label: "T-Shirts", href: routes.collection("t-shirts") },
      { label: "Polos", href: routes.collection("polos") },
    ],
  },
  {
    label: "Outerwear",
    href: routes.collection("outerwear"),
    hasDropdown: true,
    children: [
      { label: "Jackets", href: routes.collection("jackets") },
      { label: "Overshirts", href: routes.collection("overshirts") },
    ],
  },
  { label: "Linen", href: routes.collection("linen"), badge: "New" },
  { label: "Denim", href: routes.collection("denim") },
  { label: "New In", href: routes.collection("new-in") },
];

/* ------------------------------------------------------------ home content */

export const heroSlides: Slide[] = [
  "new-in",
  "shirts",
  "linen",
  "trousers",
  "outerwear",
].map((slug, i) => ({ id: `hero-${i}`, tone: tone(i), href: routes.collection(slug) }));

const tile = (title: string, slug: string, i: number): Tile => ({
  title,
  href: routes.collection(slug),
  tone: tone(i),
});

export const categoryTiles: Tile[] = [
  tile("Formal Shirts", "formal-shirts", 0),
  tile("Trousers", "trousers", 1),
  tile("Casual Shirts", "casual-shirts", 2),
  tile("Outerwear", "outerwear", 3),
  tile("T-Shirts", "t-shirts", 4),
  tile("Polos", "polos", 5),
];

export const roundedTiles: Tile[] = [
  tile("Collection One", "linen", 1),
  tile("Collection Two", "tailored-trousers", 2),
  tile("Collection Three", "essentials", 3),
  tile("Collection Four", "stretch", 4),
];

export const stripTiles: Tile[] = [
  { title: "Feature One", href: routes.about, tone: tone(3) },
  { title: "Feature Two Here", href: routes.about, tone: tone(4) },
  { title: "Feature Three", href: routes.about, tone: tone(5) },
];

export const occasionTiles: Tile[] = [
  tile("Occasion One", "essentials", 0),
  tile("Occasion Two", "linen", 1),
  tile("Occasion Three", "formal-shirts", 2),
  tile("Occasion Four", "tailored-trousers", 3),
  tile("Occasion Five", "casual-shirts", 4),
  tile("Occasion Six", "polos", 5),
];

export const signatureSlides: Tile[] = [
  tile("Line One", "stretch", 2),
  tile("Line Two", "formal-shirts", 3),
  tile("Line Three", "casual-shirts", 4),
  tile("Line Four", "linen", 5),
  tile("Line Five", "denim", 6),
];

export const featuredProducts: FeaturedProductSlide[] = products
  .filter((_, i) => i % 6 === 1)
  .slice(0, 5)
  .map((p, i) => ({
    id: `fp-${i}`,
    eyebrow: "Featured",
    title: p.title,
    price: p.price,
    cta: "Shop now",
    href: routes.product(p.slug),
    bgTone: tone(i),
    thumbTone: p.tone,
  }));

export const fabricSlides: FabricSlide[] = Array.from({ length: 8 }, (_, i) => ({
  title: `Fabric Feature ${i + 1}`,
  body: "Placeholder description of the fabric and its benefits. Two or three short lines of copy explain what makes this material worth choosing.",
  tone: tone(i),
}));

/** Banners on the home page and where they link */
export const bannerLinks = {
  one: routes.collection("linen"),
  two: routes.collection("denim"),
  three: routes.collection("essentials"),
  promo: routes.collection("new-in"),
  short: routes.about,
};

export const footerColumns: FooterColumn[] = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: routes.about },
      { label: "Terms & Conditions", href: routes.terms },
      { label: "Privacy Policy", href: routes.privacy },
      { label: "Returns & Exchanges", href: routes.refund },
      { label: "Shipping Policy", href: routes.shipping },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Contact Us", href: routes.contact },
      { label: "Track Order", href: routes.trackOrder },
      { label: "Request a Return", href: routes.returns },
      { label: "FAQs", href: routes.faq },
    ],
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

/** Trust strip used on product and cart pages */
export const trustPoints = [
  { title: "Easy Returns", body: "Placeholder line about the returns window." },
  { title: "Customer Care", body: "Placeholder line about support hours." },
  { title: "Free Delivery", body: "Placeholder line about delivery terms." },
  { title: "Secure Payments", body: "Placeholder line about payment options." },
];

export const shippingNote = "Placeholder dispatch and delivery note";
export const freeShippingThreshold = 1999;
