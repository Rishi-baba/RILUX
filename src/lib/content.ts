// Neutral placeholder content for the whole storefront. None of it is taken from
// the reference site — replace with real brand copy, products and imagery.
import type {
  Collection,
  FabricSlide,
  FeaturedProductSlide,
  FooterColumn,
  NavItem,
  Product,
  ProductReview,
  Slide,
  Tile,
} from "@/types/content";
import type { PlaceholderTone } from "@/components/Placeholder";

export const brandName = "RILUX";

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

// Shirts only. Structure follows the Rilux style sheet: 3 cuts (formal / regular / casual),
// 2 sleeve lengths and 4 fabric families.
export const collections: Collection[] = [
  { slug: "all", title: "All Shirts", tone: "stone", related: ["formal", "regular", "casual", "giza-cotton"] },
  { slug: "new-in", title: "New In", tone: "warm", related: ["formal", "regular", "casual"] },
  { slug: "formal", title: "Formal Shirts", tone: "cool", related: ["regular", "casual", "full-sleeve", "giza-cotton"] },
  { slug: "regular", title: "Regular Shirts", tone: "sand", related: ["formal", "casual", "full-sleeve"] },
  { slug: "casual", title: "Casual Shirts", tone: "olive", related: ["formal", "regular", "half-sleeve"] },
  { slug: "full-sleeve", title: "Full Sleeve", tone: "dark", related: ["half-sleeve", "formal", "regular"] },
  { slug: "half-sleeve", title: "Half Sleeve", tone: "sand", related: ["full-sleeve", "casual", "formal"] },
  { slug: "giza-cotton", title: "Giza Cotton", tone: "stone", related: ["giza-satin", "premium-cotton", "pure-cotton"] },
  { slug: "giza-satin", title: "Giza Satin", tone: "warm", related: ["giza-cotton", "premium-cotton", "pure-cotton"] },
  { slug: "premium-cotton", title: "Premium Cotton", tone: "cool", related: ["giza-cotton", "giza-satin", "pure-cotton"] },
  { slug: "pure-cotton", title: "Pure Cotton", tone: "olive", related: ["giza-cotton", "giza-satin", "premium-cotton"] },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

/* ---------------------------------------------------------------- products */

type Cut = "formal" | "regular" | "casual";
type Sleeve = "full-sleeve" | "half-sleeve";
type FabricFamily = "giza-cotton" | "giza-satin" | "premium-cotton" | "pure-cotton";

/** The 8 construction styles from the Rilux style sheet */
const styles: Record<number, { cut: Cut; sleeve: Sleeve; label: string; details: string[] }> = {
  1: { cut: "regular", sleeve: "full-sleeve", label: "Chambray Collar Shirt", details: ["Contrast chambray collar", "Full sleeves with button cuffs", "Regular fit"] },
  2: { cut: "regular", sleeve: "full-sleeve", label: "Double Pocket Shirt", details: ["Two chest pockets", "Full sleeves with button cuffs", "Regular fit"] },
  3: { cut: "formal", sleeve: "half-sleeve", label: "Half Sleeve Formal Shirt", details: ["Clean front, no pockets", "Half sleeves", "Formal fit"] },
  4: { cut: "casual", sleeve: "half-sleeve", label: "Roll-Up Sleeve Shirt", details: ["Chest pocket", "Half sleeves with roll-up tab", "Relaxed casual fit"] },
  5: { cut: "formal", sleeve: "full-sleeve", label: "Hidden Placket Shirt", details: ["Concealed button placket", "No pockets", "Full sleeves", "Formal fit"] },
  6: { cut: "formal", sleeve: "full-sleeve", label: "Formal Shirt", details: ["Self-fold placket", "No pockets", "Full sleeves", "Formal fit"] },
  7: { cut: "formal", sleeve: "full-sleeve", label: "Pocket Formal Shirt", details: ["Self-fold placket", "Chest pocket", "Full sleeves", "Formal fit"] },
  8: { cut: "regular", sleeve: "full-sleeve", label: "Yoke Shirt", details: ["Back yoke", "Two chest pockets", "Self-fold placket", "Regular fit"] },
};

const fabricLabel: Record<FabricFamily, string> = {
  "giza-cotton": "100% Giza Cotton",
  "giza-satin": "Giza Satin",
  "premium-cotton": "100% Premium Cotton",
  "pure-cotton": "100% Cotton",
};

const cutLabel: Record<Cut, string> = { formal: "Formal Shirts", regular: "Regular Shirts", casual: "Casual Shirts" };

/** One entry per shirt; `shades` = number of fabric colourways for it in the style sheet */
const catalogue: { name: string; style: number; fabric: FabricFamily; shades: number; price: number; isNew?: boolean }[] = [
  { name: "Classic", style: 1, fabric: "pure-cotton", shades: 3, price: 3799 },
  { name: "Signature", style: 1, fabric: "pure-cotton", shades: 3, price: 3799, isNew: true },
  { name: "Verona", style: 2, fabric: "giza-cotton", shades: 2, price: 4999 },
  { name: "Classic", style: 3, fabric: "pure-cotton", shades: 1, price: 3499 },
  { name: "Leece", style: 3, fabric: "giza-cotton", shades: 3, price: 4499, isNew: true },
  { name: "Weekend", style: 4, fabric: "pure-cotton", shades: 3, price: 3499 },
  { name: "Classic", style: 5, fabric: "pure-cotton", shades: 5, price: 3999 },
  { name: "Signature", style: 5, fabric: "pure-cotton", shades: 1, price: 3999 },
  { name: "Wilson", style: 5, fabric: "giza-cotton", shades: 3, price: 5299 },
  { name: "Wilmar", style: 5, fabric: "pure-cotton", shades: 1, price: 4199 },
  { name: "Worton", style: 5, fabric: "giza-cotton", shades: 1, price: 5299, isNew: true },
  { name: "Lyon", style: 6, fabric: "giza-cotton", shades: 6, price: 5499 },
  { name: "Porto", style: 6, fabric: "giza-cotton", shades: 4, price: 5499, isNew: true },
  { name: "Signature", style: 6, fabric: "pure-cotton", shades: 1, price: 3999 },
  { name: "Satin", style: 7, fabric: "giza-satin", shades: 2, price: 5999, isNew: true },
  { name: "Classic", style: 7, fabric: "pure-cotton", shades: 2, price: 3999 },
  { name: "Plantino", style: 7, fabric: "pure-cotton", shades: 1, price: 4299 },
  { name: "Premium", style: 8, fabric: "premium-cotton", shades: 3, price: 4299 },
  { name: "Martin", style: 8, fabric: "pure-cotton", shades: 2, price: 3999 },
];

const shirtSizes = ["S", "M", "L", "XL", "XXL"];

export const formatPrice = (value: number) =>
  `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const cutCopy: Record<Cut, string> = {
  formal: "A crisp formal shirt with a sharp collar, made for long days at the office and the evenings that follow.",
  regular: "A versatile regular-fit shirt that moves easily from the workweek into the weekend.",
  casual: "An easy, relaxed shirt for warm afternoons and unhurried weekends.",
};

const fabricCopy: Record<FabricFamily, string> = {
  "giza-cotton": "Woven from extra-long-staple Giza cotton for a soft hand and a quiet sheen.",
  "giza-satin": "A satin weave of Giza cotton gives it a smooth, lustrous finish.",
  "premium-cotton": "Dense premium cotton keeps it crisp from the first meeting to the last.",
  "pure-cotton": "Breathable 100% cotton keeps it comfortable from morning to night.",
};

// Deterministic (no randomness) so SSR and client match.
export const products: Product[] = catalogue.map((entry, i) => {
  const style = styles[entry.style];
  const fabricName = fabricLabel[entry.fabric];
  const title = `${entry.name} ${style.label}`;
  const colors = Array.from({ length: entry.shades }, (_, c) => ({ name: `Shade ${c + 1}`, tone: tone(i + c) }));
  return {
    id: `s-${i}`,
    slug: slugify(`${entry.name}-${style.label}-${entry.style}`),
    title,
    category: cutLabel[style.cut],
    price: formatPrice(entry.price),
    priceValue: entry.price,
    tone: tone(i),
    altTone: tone(i + 2),
    gallery: Array.from({ length: 6 }, (_, g) => tone(i + g)),
    tag: entry.fabric === "giza-cotton" || entry.fabric === "giza-satin" ? fabricName : undefined,
    colorCount: entry.shades > 1 ? entry.shades : undefined,
    colors,
    sizes: shirtSizes,
    collections: ["all", style.cut, style.sleeve, entry.fabric, ...(entry.isNew ? ["new-in"] : [])],
    description: `${cutCopy[style.cut]} ${fabricCopy[entry.fabric]}`,
    features: [fabricName, style.sleeve === "full-sleeve" ? "Full Sleeve" : "Half Sleeve", cutLabel[style.cut].replace(" Shirts", " Fit")],
    materialCare: [fabricName, "Machine wash cold, gentle cycle", "Do not bleach", "Iron on medium heat"],
    details: [...style.details, "Model is 6'0\" wearing size M"],
  } satisfies Product;
});

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const productsIn = (collectionSlug: string) =>
  products.filter((p) => p.collections.includes(collectionSlug));

export const searchProducts = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => `${p.title} ${p.category} ${p.features.join(" ")}`.toLowerCase().includes(q));
};

/* -------------------------------------------------------------- navigation */

export const announcement = {
  message: "Complimentary shipping across India",
  cta: "Shop now",
  href: routes.collection("all"),
};

export const navItems: NavItem[] = [
  { label: "Shop All", href: routes.collection("all") },
  { label: "Formal", href: routes.collection("formal") },
  { label: "Regular", href: routes.collection("regular") },
  { label: "Casual", href: routes.collection("casual") },
  {
    label: "Sleeve",
    href: routes.collection("full-sleeve"),
    hasDropdown: true,
    children: [
      { label: "Full Sleeve", href: routes.collection("full-sleeve") },
      { label: "Half Sleeve", href: routes.collection("half-sleeve") },
    ],
  },
  {
    label: "Fabric",
    href: routes.collection("giza-cotton"),
    hasDropdown: true,
    children: [
      { label: "Giza Cotton", href: routes.collection("giza-cotton") },
      { label: "Giza Satin", href: routes.collection("giza-satin") },
      { label: "Premium Cotton", href: routes.collection("premium-cotton") },
      { label: "Pure Cotton", href: routes.collection("pure-cotton") },
    ],
  },
  { label: "New In", href: routes.collection("new-in"), badge: "New" },
];

/* ------------------------------------------------------------ home content */

export const heroSlides: Slide[] = ["new-in", "formal", "giza-cotton", "casual", "giza-satin"].map((slug, i) => ({
  id: `hero-${i}`,
  tone: tone(i),
  href: routes.collection(slug),
}));

const tile = (title: string, slug: string, i: number): Tile => ({
  title,
  href: routes.collection(slug),
  tone: tone(i),
});

const productTile = (name: string, i: number): Tile => {
  const p = products.find((x) => x.title.startsWith(name)) ?? products[0];
  return { title: name, href: routes.product(p.slug), tone: tone(i) };
};

export const categoryTiles: Tile[] = [
  tile("Formal Shirts", "formal", 0),
  tile("Regular Shirts", "regular", 1),
  tile("Casual Shirts", "casual", 2),
  tile("Full Sleeve", "full-sleeve", 3),
  tile("Half Sleeve", "half-sleeve", 4),
  tile("Giza Cotton", "giza-cotton", 5),
];

/** Signature construction details */
export const roundedTiles: Tile[] = [
  tile("Hidden Placket", "formal", 1),
  tile("Double Pocket", "regular", 2),
  tile("Chambray Collar", "regular", 3),
  tile("Roll-Up Sleeve", "casual", 4),
];

export const stripTiles: Tile[] = [
  { title: "Egyptian Giza Cotton", href: routes.about, tone: tone(3) },
  { title: "Precision Tailoring", href: routes.about, tone: tone(4) },
  { title: "Considered Details", href: routes.about, tone: tone(5) },
];

/** Dress for the Day: occasions through a day, each linked to a shirt category */
/** `pick` = start of the recommended shirt's title */
export const occasions: { title: string; blurb: string; slug: string; tone: PlaceholderTone; pick: string }[] = [
  { title: "Boardroom", blurb: "Sharp collars and hidden plackets for the meetings that matter.", slug: "formal", tone: "dark", pick: "Lyon" },
  { title: "Everyday Office", blurb: "Full sleeves that stay crisp from the first email to the last call.", slug: "full-sleeve", tone: "cool", pick: "Classic Hidden Placket" },
  { title: "Travel", blurb: "Breathable half sleeves for long days on the move.", slug: "half-sleeve", tone: "sand", pick: "Leece" },
  { title: "Weekend", blurb: "Relaxed cuts and roll-up sleeves for slower days.", slug: "casual", tone: "olive", pick: "Weekend" },
  { title: "Celebrations", blurb: "Fine Giza cotton that looks as good in photographs as it feels.", slug: "giza-cotton", tone: "stone", pick: "Wilson" },
  { title: "Evenings", blurb: "The quiet sheen of Giza satin, made for the night.", slug: "giza-satin", tone: "warm", pick: "Satin" },
];

/** Named fabric lines from the style sheet, linking to their shirt */
export const signatureSlides: Tile[] = [
  productTile("Lyon", 2),
  productTile("Porto", 3),
  productTile("Wilson", 4),
  productTile("Verona", 5),
  productTile("Satin", 6),
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

export const fabricSlides: FabricSlide[] = [
  { title: "Giza Cotton", body: "Extra-long-staple Egyptian cotton with a soft hand and a natural sheen.", tone: "stone" },
  { title: "Giza Satin", body: "A satin weave of Giza cotton for a smooth, lustrous finish suited to evenings.", tone: "warm" },
  { title: "Premium Cotton", body: "A dense, crisp premium cotton that holds its shape through the day.", tone: "cool" },
  { title: "Pure Cotton", body: "Breathable 100% cotton for everyday comfort.", tone: "olive" },
];

/** Banners on the home page and where they link */
export const bannerLinks = {
  three: routes.collection("casual"),
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
  newArrivals: "Just Arrived",
  shopByCategory: "Find Your Shirt",
  wardrobe: "In the Details",
  signature: ["The Mill", "Edit"],
  fabric: ["Cloth", "Matters"],
};

/** Trust strip used on product and cart pages */
export const trustPoints = [
  { title: "Cash on Delivery", body: "Pay when your order arrives." },
  { title: "Free Shipping", body: "On every order, across India." },
  { title: "7-Day Exchange", body: "Easy size or style swaps." },
  { title: "Customer Care", body: "Reach us on WhatsApp or email." },
];

export const shippingNote = "Dispatched within 2 business days · Free shipping across India";
export const freeShippingThreshold = 1999;

/* ---------------------------------------------- additions from the brief */

/** Shop-by-fabric tiles on the home page */
export const fabrics: Tile[] = [
  { title: "Giza Cotton", href: routes.collection("giza-cotton"), tone: "stone" },
  { title: "Giza Satin", href: routes.collection("giza-satin"), tone: "warm" },
  { title: "Premium Cotton", href: routes.collection("premium-cotton"), tone: "cool" },
  { title: "Pure Cotton", href: routes.collection("pure-cotton"), tone: "olive" },
];

/** "Why us" brand points on the home page */
export const brandPoints = [
  { title: "Premium Fabrics", body: "Extra-long-staple Giza cotton and fine satin weaves, chosen for softness and sheen." },
  { title: "Precise Tailoring", body: "Clean plackets, sharp collars and a fit refined until it sits just right." },
  { title: "Made to Last", body: "Dense weaves and careful stitching that hold their shape wash after wash." },
  { title: "Thoughtful Service", body: "Free shipping, cash on delivery and easy 7-day exchanges." },
];

/** Placeholder contact details — replace before launch */
export const contact = {
  email: "hello@example.com",
  phone: "+91 00000 00000",
  /** Digits only, with country code, for the WhatsApp link */
  whatsapp: "910000000000",
};

export const whatsappHref = (message = "Hi! I have a question about your products.") =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

/** Business days from today used for the estimated delivery window on product pages */
export const deliveryDays = { min: 3, max: 6 };

export const paymentMethods = ["UPI", "Cards", "Net Banking", "Cash on Delivery"];

/**
 * SAMPLE CONTENT SWITCH. While true, the site shows the sample reviews and testimonials below,
 * each tagged "Sample" on the page. Set to false (or replace with real customer content, used
 * with permission) before launch — never publish these as genuine customer reviews.
 */
export const showSampleReviews = true;

/** Brand-level testimonials (service, experience) — deliberately different from product reviews. */
export const testimonials: { quote: string; name: string; detail: string }[] = [
  {
    quote: "The exchange was effortless. I messaged on WhatsApp in the morning and the new size was on its way the next day.",
    name: "Sameer A.",
    detail: "Pune",
  },
  {
    quote: "Opening the box felt like receiving a gift. Even the tissue and the little card were thought through.",
    name: "Imran Q.",
    detail: "Hyderabad",
  },
  {
    quote: "I have quietly replaced most of my office shirts with these. They still look sharp at seven in the evening.",
    name: "Dev N.",
    detail: "Bengaluru",
  },
  {
    quote: "Honest pricing for this level of fabric. It is rare to find Giza cotton finished this well from an Indian label.",
    name: "Pranav G.",
    detail: "Mumbai",
  },
];

/** Pool of product-level review texts (fit, fabric, construction). */
const reviewPool: Omit<ProductReview, "id" | "productId" | "createdAt">[] = [
  { rating: 5, title: "Sits perfectly through the shoulders", body: "Ordered my usual size and it fits as if it were measured for me. The collar holds its shape even after a full day of meetings.", name: "Arjun M.", size: "M", fit: "True to size" },
  { rating: 5, title: "Softer than I expected", body: "The fabric has a smooth hand and a slight sheen. I have washed it twice and it has only become softer.", name: "Rohan K.", size: "L", fit: "True to size" },
  { rating: 4, title: "Great shirt, sleeves a touch long", body: "Excellent quality and very neat stitching. The sleeves are slightly long on me, but a single cuff roll fixes it.", name: "Vikram S.", size: "M", fit: "Runs large" },
  { rating: 5, title: "My new office favourite", body: "Crisp, breathable and it barely creases on the commute. I have already ordered a second shade.", name: "Aditya P.", size: "XL", fit: "True to size" },
  { rating: 4, title: "Size up if you are between sizes", body: "Beautiful fabric and finish. I was between sizes and the smaller one felt a little snug across the chest.", name: "Karan J.", size: "L", fit: "Runs small" },
  { rating: 5, title: "Looks even better in person", body: "The details are clean and understated. I wore it to a reception and got more compliments than I expected.", name: "Siddharth R.", size: "M", fit: "True to size" },
  { rating: 5, title: "You can feel the quality", body: "The weave is dense and even, the buttons are firmly attached and every seam lies flat.", name: "Nikhil T.", size: "XXL", fit: "True to size" },
  { rating: 4, title: "Comfortable all day", body: "Wore it on a long travel day and it stayed comfortable and fresh. I would love a few more colour options.", name: "Rahul D.", size: "M", fit: "True to size" },
];

const sampleDates = ["2026-09-28", "2026-09-14", "2026-08-30", "2026-08-11"];

/** Three sample reviews per product, chosen deterministically so server and client match. */
export const sampleReviewsFor = (productId: string): ProductReview[] => {
  if (!showSampleReviews) return [];
  const seed = Number(productId.replace(/\D/g, "")) || 0;
  return [0, 1, 2].map((k) => {
    const r = reviewPool[(seed * 3 + k * 5) % reviewPool.length];
    return { ...r, id: `sample-${productId}-${k}`, productId, createdAt: sampleDates[(seed + k) % sampleDates.length] };
  });
};
