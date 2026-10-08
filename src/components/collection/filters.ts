import type { PlaceholderTone } from "@/components/Placeholder";
import type { Product } from "@/types/content";

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title-asc", label: "Alphabetical A–Z" },
  { value: "title-desc", label: "Alphabetical Z–A" },
  { value: "newest", label: "Newest" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

export interface Filters {
  colors: string[];
  sizes: string[];
  categories: string[];
  /** null = no lower / upper bound */
  priceMin: number | null;
  priceMax: number | null;
}

export const emptyFilters: Filters = {
  colors: [],
  sizes: [],
  categories: [],
  priceMin: null,
  priceMax: null,
};

export interface FacetOption {
  value: string;
  count: number;
  tone?: PlaceholderTone;
}

export interface Facets {
  maxPrice: number;
  colors: FacetOption[];
  sizes: string[];
  categories: FacetOption[];
}

const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];
const compareSizes = (a: string, b: string) => {
  const na = Number(a);
  const nb = Number(b);
  if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
  const ia = sizeOrder.indexOf(a);
  const ib = sizeOrder.indexOf(b);
  if (ia !== -1 && ib !== -1) return ia - ib;
  if (ia !== -1 || ib !== -1) return ia === -1 ? 1 : -1;
  return a.localeCompare(b);
};

export function buildFacets(products: Product[]): Facets {
  const colors = new Map<string, FacetOption>();
  const categories = new Map<string, FacetOption>();
  const sizes = new Set<string>();
  let max = 0;
  for (const p of products) {
    max = Math.max(max, p.priceValue);
    for (const c of p.colors) {
      const entry = colors.get(c.name);
      if (entry) entry.count += 1;
      else colors.set(c.name, { value: c.name, count: 1, tone: c.tone });
    }
    const cat = categories.get(p.category);
    if (cat) cat.count += 1;
    else categories.set(p.category, { value: p.category, count: 1 });
    p.sizes.forEach((s) => sizes.add(s));
  }
  return {
    maxPrice: Math.ceil(max / 100) * 100,
    colors: [...colors.values()].sort((a, b) => a.value.localeCompare(b.value)),
    sizes: [...sizes].sort(compareSizes),
    categories: [...categories.values()].sort((a, b) => a.value.localeCompare(b.value)),
  };
}

export function applyFilters(products: Product[], f: Filters): Product[] {
  return products.filter(
    (p) =>
      (f.priceMin === null || p.priceValue >= f.priceMin) &&
      (f.priceMax === null || p.priceValue <= f.priceMax) &&
      (!f.colors.length || p.colors.some((c) => f.colors.includes(c.name))) &&
      (!f.sizes.length || p.sizes.some((s) => f.sizes.includes(s))) &&
      (!f.categories.length || f.categories.includes(p.category)),
  );
}

const productIndex = (p: Product) => Number(p.id.replace(/\D/g, "")) || 0;

export function sortProducts(products: Product[], sort: SortValue): Product[] {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.priceValue - b.priceValue);
    case "price-desc":
      return list.sort((a, b) => b.priceValue - a.priceValue);
    case "title-asc":
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return list.sort((a, b) => b.title.localeCompare(a.title));
    case "newest":
      return list.sort((a, b) => {
        const na = a.collections.includes("new-in") ? 1 : 0;
        const nb = b.collections.includes("new-in") ? 1 : 0;
        return nb - na || productIndex(b) - productIndex(a);
      });
    default:
      return list;
  }
}

export const activeFilterCount = (f: Filters) =>
  f.colors.length +
  f.sizes.length +
  f.categories.length +
  (f.priceMin !== null || f.priceMax !== null ? 1 : 0);

/* ------------------------------------------------------------ URL helpers */

const list = (v: string | null) => (v ? v.split(",").map((s) => s.trim()).filter(Boolean) : []);

export function parseQuery(params: URLSearchParams): { sort: SortValue; filters: Filters } {
  const rawSort = params.get("sort");
  const sort = sortOptions.some((o) => o.value === rawSort) ? (rawSort as SortValue) : "featured";
  let priceMin: number | null = null;
  let priceMax: number | null = null;
  const price = params.get("price");
  if (price) {
    const [lo, hi] = price.split("-");
    const nlo = Number(lo);
    const nhi = Number(hi);
    if (lo !== "" && Number.isFinite(nlo)) priceMin = nlo;
    if (hi !== undefined && hi !== "" && Number.isFinite(nhi)) priceMax = nhi;
  }
  return {
    sort,
    filters: {
      colors: list(params.get("color")),
      sizes: list(params.get("size")),
      categories: list(params.get("category")),
      priceMin,
      priceMax,
    },
  };
}

export function buildQuery(base: URLSearchParams, sort: SortValue, f: Filters): string {
  const params = new URLSearchParams(base);
  const set = (key: string, value: string | null) => {
    if (value) params.set(key, value);
    else params.delete(key);
  };
  set("sort", sort === "featured" ? null : sort);
  set("color", f.colors.join(","));
  set("size", f.sizes.join(","));
  set("category", f.categories.join(","));
  set(
    "price",
    f.priceMin !== null || f.priceMax !== null ? `${f.priceMin ?? ""}-${f.priceMax ?? ""}` : null,
  );
  // Keep list separators readable: ?size=M,L instead of ?size=M%2CL
  return params.toString().replace(/%2C/gi, ",");
}
