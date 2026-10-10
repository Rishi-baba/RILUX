// Neutral placeholder content for the whole storefront. None of it is taken from
// the reference site — replace with real brand copy, products and imagery.
import type {
  Collection,
  FeaturedProductSlide,
  FooterColumn,
  NavItem,
  Product,
  ProductAttributes,
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
  { slug: "all", title: "All Shirts", tone: "stone", related: ["formal", "regular", "casual", "giza-cotton"], description: "All our shirts in one place. Formal, regular and casual, in Giza cotton, Giza satin, premium cotton and 100% cotton." },
  { slug: "new-in", title: "New In", tone: "warm", related: ["formal", "regular", "casual"], description: "Shirts added in the last few weeks, including new shades of our best sellers." },
  { slug: "formal", title: "Formal Shirts", tone: "cool", related: ["regular", "casual", "full-sleeve", "giza-cotton"], description: "Shirts for work and formal occasions. Firm collars, neat plackets and a fit that stays tucked in." },
  { slug: "regular", title: "Regular Shirts", tone: "sand", related: ["formal", "casual", "full-sleeve"], description: "A regular fit that works at the office and on weekends. Look for double pockets, front yokes and chambray-trim collars." },
  { slug: "casual", title: "Casual Shirts", tone: "olive", related: ["formal", "regular", "half-sleeve"], description: "Looser half-sleeve shirts in soft cotton, for weekends, trips and warm days." },
  { slug: "full-sleeve", title: "Full Sleeve", tone: "dark", related: ["half-sleeve", "formal", "regular"], description: "Full-sleeve shirts with button cuffs. Wear them buttoned at work and rolled up after." },
  { slug: "half-sleeve", title: "Half Sleeve", tone: "sand", related: ["full-sleeve", "casual", "formal"], description: "Half-sleeve shirts for hot days, stitched and finished the same way as our full sleeves." },
  { slug: "giza-cotton", title: "Giza Cotton", tone: "stone", related: ["giza-satin", "premium-cotton", "pure-cotton"], description: "Made from Egyptian Giza cotton. The long fibres make the fabric softer and stronger, and it keeps a slight shine." },
  { slug: "giza-satin", title: "Giza Satin", tone: "warm", related: ["giza-cotton", "premium-cotton", "pure-cotton"], description: "Giza cotton woven as satin, so it feels smooth and has a soft shine. Good for evenings and functions." },
  { slug: "premium-cotton", title: "Premium Cotton", tone: "cool", related: ["giza-cotton", "giza-satin", "pure-cotton"], description: "A tightly woven cotton that feels crisp and doesn't crease easily." },
  { slug: "pure-cotton", title: "100% Cotton", tone: "olive", related: ["giza-cotton", "giza-satin", "premium-cotton"], description: "Pure cotton that breathes well and is easy to wash and iron. Our everyday shirts." },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

/* ---------------------------------------------------------------- products */

type Cut = "formal" | "regular" | "casual";
type Sleeve = "full-sleeve" | "half-sleeve";
type FabricFamily = "giza-cotton" | "giza-satin" | "premium-cotton" | "pure-cotton";

/** The 8 construction styles from the Rilux style sheet and launch deck */
const styles: Record<
  number,
  {
    cut: Cut;
    sleeve: Sleeve;
    pocket: ProductAttributes["pocket"];
    placket: ProductAttributes["placket"];
    label: string;
    details: string[];
  }
> = {
  1: { cut: "regular", sleeve: "full-sleeve", pocket: "Single Pocket", placket: "Standard Placket", label: "Chambray Collar Shirt", details: ["Regular collar with chambray trim", "Chest pocket", "Full sleeves with button cuffs", "Regular fit"] },
  2: { cut: "regular", sleeve: "full-sleeve", pocket: "Double Pocket", placket: "Standard Placket", label: "Double Pocket Shirt", details: ["Regular collar", "Two chest pockets", "Full sleeves with button cuffs", "Regular fit"] },
  3: { cut: "formal", sleeve: "half-sleeve", pocket: "No Pocket", placket: "Standard Placket", label: "Half Sleeve Formal Shirt", details: ["Clean front, no pockets", "Half sleeves", "Formal fit"] },
  4: { cut: "casual", sleeve: "half-sleeve", pocket: "Single Pocket", placket: "Standard Placket", label: "Roll-Up Sleeve Shirt", details: ["Chest pocket", "Half sleeves with roll-up tab", "Relaxed casual fit"] },
  5: { cut: "formal", sleeve: "full-sleeve", pocket: "No Pocket", placket: "Concealed Placket", label: "Hidden Placket Shirt", details: ["Concealed button placket", "No pockets", "Full sleeves", "Formal fit"] },
  6: { cut: "formal", sleeve: "full-sleeve", pocket: "No Pocket", placket: "Self-Fold Placket", label: "Formal Shirt", details: ["Self-fold placket", "No pockets", "Full sleeves", "Formal fit"] },
  7: { cut: "formal", sleeve: "full-sleeve", pocket: "Single Pocket", placket: "Self-Fold Placket", label: "Pocket Formal Shirt", details: ["Self-fold placket", "Single chest pocket", "Full sleeves", "Formal fit"] },
  8: { cut: "regular", sleeve: "full-sleeve", pocket: "Double Pocket", placket: "Self-Fold Placket", label: "Yoke Shirt", details: ["Front yoke", "Two flap chest pockets", "Self-fold placket", "Regular fit"] },
};

const fabricLabel: Record<FabricFamily, string> = {
  "giza-cotton": "100% Giza Cotton",
  "giza-satin": "Giza Satin",
  "premium-cotton": "100% Premium Cotton",
  "pure-cotton": "100% Cotton",
};

const fabricTitle: Record<FabricFamily, string> = {
  "giza-cotton": "Giza Cotton",
  "giza-satin": "Giza Satin",
  "premium-cotton": "Premium Cotton",
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
  formal: "A formal shirt with a firm collar that stays neat through a full working day.",
  regular: "A regular-fit shirt you can wear to work and on weekends.",
  casual: "A relaxed half-sleeve shirt for weekends and warm days.",
};

const fabricCopy: Record<FabricFamily, string> = {
  "giza-cotton": "Made in Giza cotton, which is soft, strong and has a slight natural shine.",
  "giza-satin": "The satin weave gives it a smooth feel and a soft shine.",
  "premium-cotton": "The tightly woven premium cotton keeps it crisp and slow to crease.",
  "pure-cotton": "100% cotton, so it breathes well and is easy to care for.",
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
    materialCare: [fabricName, "Machine wash warm, delicate cycle", "Wash with similar colours", "Do not bleach", "Iron on medium heat", "Made in India"],
    details: [...style.details, "Model is 6'0\" wearing size M"],
    attributes: {
      fit: style.cut === "formal" ? "Formal" : style.cut === "regular" ? "Regular" : "Casual",
      sleeve: style.sleeve === "full-sleeve" ? "Full Sleeve" : "Half Sleeve",
      fabric: fabricTitle[entry.fabric],
      pocket: style.pocket,
      placket: style.placket,
    },
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
  message: "Free shipping · Buy 2, get 10% off",
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
      { label: "100% Cotton", href: routes.collection("pure-cotton") },
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
  { title: "Giza Cotton", href: routes.about, tone: tone(3) },
  { title: "Stitched in India", href: routes.about, tone: tone(4) },
  { title: "Real Buttons, Real Cuffs", href: routes.about, tone: tone(5) },
];

/** Dress for the Day: occasions through a day, each linked to a shirt category */
/** `pick` = start of the recommended shirt's title */
export const occasions: { title: string; blurb: string; slug: string; tone: PlaceholderTone; pick: string }[] = [
  { title: "Boardroom", blurb: "Firm collars and hidden plackets. Looks right with a blazer and a tie.", slug: "formal", tone: "dark", pick: "Lyon" },
  { title: "Everyday Office", blurb: "Full sleeves that are easy to iron and don't crease much at the desk.", slug: "full-sleeve", tone: "cool", pick: "Classic Hidden Placket" },
  { title: "Travel", blurb: "Half sleeves in light cotton for flights, trains and long drives.", slug: "half-sleeve", tone: "sand", pick: "Leece" },
  { title: "Weekend", blurb: "Loose fit and roll-up sleeves. Wear it untucked.", slug: "casual", tone: "olive", pick: "Weekend" },
  { title: "Celebrations", blurb: "Giza cotton for weddings and family functions.", slug: "giza-cotton", tone: "stone", pick: "Wilson" },
  { title: "Evenings", blurb: "Giza satin has a soft shine that looks good under evening lights.", slug: "giza-satin", tone: "warm", pick: "Satin" },
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
};

/** Trust strip used on product and cart pages */
export const trustPoints = [
  { title: "Cash on Delivery", body: "Pay when your order arrives." },
  { title: "Free Shipping", body: "On every order, across India." },
  { title: "7-Day Exchange", body: "Wrong size? We'll swap it." },
  { title: "Customer Care", body: "Reach us on WhatsApp or email." },
];

export const shippingNote = "Dispatched within 2 business days · Free shipping across India";

/* ---------------------------------------------- additions from the brief */

/** Shop-by-fabric tiles on the home page */
export const fabrics: Tile[] = [
  { title: "Giza Cotton", href: routes.collection("giza-cotton"), tone: "stone" },
  { title: "Giza Satin", href: routes.collection("giza-satin"), tone: "warm" },
  { title: "Premium Cotton", href: routes.collection("premium-cotton"), tone: "cool" },
  { title: "100% Cotton", href: routes.collection("pure-cotton"), tone: "olive" },
];

/** "Why us" brand points on the home page */
export const brandPoints = [
  { title: "Better Fabric", body: "Giza cotton, Giza satin and premium cotton. You can feel the difference the first time you wear it." },
  { title: "A Fit That Works", body: "We test every pattern on real people across sizes S to XXL before it goes on sale." },
  { title: "Lasts Longer", body: "Tight stitching and firmly sewn buttons, so the shirt still looks right after many washes." },
  { title: "Easy to Buy", body: "Free shipping, cash on delivery, and size exchanges within 7 days." },
];

/** Placeholder contact details — replace before launch */
export const contact = {
  email: "customerservice.in@rilux.com",
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
 * SAMPLE CONTENT SWITCH. While true, the sample reviews below are shown — but only when the site
 * is opened on a local preview host (see src/hooks/useSamplePreview.ts), never on a real domain. Set to false (or replace with real customer content, used
 * with permission) before launch — never publish these as genuine customer reviews.
 */
export const showSampleReviews = true;

/** Store-wide rating shown in the cart drawer. Same rule as the sample reviews: preview hosts only. */
export const storeRating = { rating: 4.8, customers: "50,000+" };

/** Brand-level testimonials (service, experience) — deliberately different from product reviews. */
export const testimonials: { quote: string; name: string; detail: string; bought: string }[] = [
  {
    quote: "Ordered M, it was a bit tight on the chest. Sent a WhatsApp and the L reached in 3 days, no questions asked. Fits perfectly now.",
    name: "Sameer A.",
    detail: "Pune",
    bought: "Lyon Formal Shirt",
  },
  {
    quote: "I wear formal shirts five days a week and these are the first ones that don't look tired by evening. I have four now.",
    name: "Dev N.",
    detail: "Bengaluru",
    bought: "Classic Hidden Placket Shirt",
  },
  {
    quote: "Was unsure about buying shirts online without trying them. The size guide was spot on, and the collar is firm without being uncomfortable.",
    name: "Pranav G.",
    detail: "Mumbai",
    bought: "Verona Double Pocket Shirt",
  },
  {
    quote: "Gifted two to my father on his birthday. He wore one to a wedding and kept talking about the fabric all evening.",
    name: "Imran Q.",
    detail: "Hyderabad",
    bought: "Satin Pocket Formal Shirt",
  },
];

/** Pool of product-level reviews, written the way customers actually write them. */
const reviewPool: Omit<ProductReview, "id" | "productId" | "createdAt">[] = [
  { rating: 5, title: "Good fit", body: "Took M. Fits well on the shoulders and the sleeve length is right. Fabric feels nice, not too thin.", name: "Rohit S.", city: "Delhi", build: "5'10\", 75 kg", size: "M", fit: "True to size", helpful: 14 },
  { rating: 4, title: "Nice shirt, delivery took time", body: "Quality is really good, stitching is neat. Took 6 days to reach Guwahati though. Otherwise happy with it.", name: "Ankit B.", city: "Guwahati", size: "L", fit: "True to size", helpful: 6 },
  { rating: 5, title: "Second purchase", body: "Bought the white one last month and came back for blue. Washed it maybe 8 times, no fading so far.", name: "Mohammed F.", city: "Lucknow", size: "XL", fit: "True to size", helpful: 21 },
  { rating: 3, title: "Runs a little small", body: "Chest is snug. I wear L in most brands, should have taken XL here. No complaints about the fabric. Exchanging it.", name: "Harsh V.", city: "Ahmedabad", build: "5'11\", 84 kg", size: "L", fit: "Runs small", helpful: 9 },
  { rating: 5, title: "worth the price", body: "honestly i was hesitant at this price but the fabric is clearly better than what i usually buy. wore it a full day, office AC and outside heat, stayed comfortable", name: "Karthik R.", city: "Chennai", size: "M", fit: "True to size", helpful: 17 },
  { rating: 4, title: "Colour slightly darker", body: "The shade is a little darker than in the photos. Still looks good. Fit is perfect.", name: "Aman G.", city: "Jaipur", size: "M", fit: "True to size", helpful: 4 },
  { rating: 5, title: "Great for office", body: "Doesn't crease much even after an hour in the car. Collar stays in place all day.", name: "Sandeep N.", city: "Pune", build: "5'8\", 70 kg", size: "M", fit: "True to size", helpful: 11 },
  { rating: 5, title: "Fits well", body: "Perfect fit. Will order again.", name: "Varun", city: "Indore", size: "S", fit: "True to size", helpful: 2 },
  { rating: 4, title: "One button was loose", body: "Overall a good shirt. One cuff button was a bit loose, took two minutes to fix at home. Fabric and fit are excellent.", name: "Prakash M.", city: "Kochi", size: "XL", fit: "True to size", helpful: 8 },
  { rating: 5, title: "Very soft", body: "Soft right out of the box, no stiffness at all. Easy to iron too.", name: "Nitin K.", city: "Nagpur", size: "M", fit: "True to size", helpful: 5 },
  { rating: 5, title: "Exchange was smooth", body: "Ordered the wrong size. They picked it up and the new one came in 4 days. The shirt itself is great.", name: "Abhishek T.", city: "Kolkata", size: "L", fit: "True to size", helpful: 13 },
  { rating: 4, title: "Want more colours", body: "Fit and fabric are great. Would buy more if this style came in a few more colours.", name: "Rajat D.", city: "Chandigarh", build: "6'1\", 92 kg", size: "XXL", fit: "Runs large", helpful: 3 },
];

const sampleDates = ["2026-10-03", "2026-09-26", "2026-09-17", "2026-09-05", "2026-08-22", "2026-08-09", "2026-07-28", "2026-07-11"];

/** 4 to 7 sample reviews per product, chosen deterministically so server and client match. */
export const sampleReviewsFor = (productId: string): ProductReview[] => {
  if (!showSampleReviews) return [];
  const seed = Number(productId.replace(/\D/g, "")) || 0;
  const count = 4 + ((seed * 7) % 4);
  return Array.from({ length: count }, (_, k) => {
    const r = reviewPool[(seed * 5 + k * 7) % reviewPool.length];
    return {
      ...r,
      verified: true,
      id: `sample-${productId}-${k}`,
      productId,
      createdAt: sampleDates[(seed + k) % sampleDates.length],
    };
  }).sort((x, y) => y.createdAt.localeCompare(x.createdAt));
};
