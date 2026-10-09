import type { Product, ProductAttributes } from "@/types/content";

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title-asc", label: "Alphabetical A–Z" },
  { value: "title-desc", label: "Alphabetical Z–A" },
  { value: "newest", label: "Newest" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

/**
 * Catalogue facets (from the Rilux style sheet). Each maps a Filters list to a product
 * attribute and a URL parameter; `order` fixes the display order of the options.
 */
export const attributeFacets = [
  { key: "fits", attr: "fit", param: "fit", label: "Fit", order: ["Formal", "Regular", "Casual"] },
  { key: "sleeves", attr: "sleeve", param: "sleeve", label: "Sleeve", order: ["Full Sleeve", "Half Sleeve"] },
  { key: "fabrics", attr: "fabric", param: "fabric", label: "Fabric", order: ["Giza Cotton", "Giza Satin", "Premium Cotton", "100% Cotton"] },
  { key: "pockets", attr: "pocket", param: "pocket", label: "Pocket", order: ["No Pocket", "Single Pocket", "Double Pocket"] },
  { key: "plackets", attr: "placket", param: "placket", label: "Placket", order: ["Standard Placket", "Concealed Placket", "Self-Fold Placket"] },
] as const satisfies readonly { key: string; attr: keyof ProductAttributes; param: string; label: string; order: readonly string[] }[];

export type AttributeKey = (typeof attributeFacets)[number]["key"];
export type ListKey = AttributeKey | "sizes";

export type Filters = Record<ListKey, string[]> & {
  /** null = no lower / upper bound */
  priceMin: number | null;
  priceMax: number | null;
};

export const emptyFilters: Filters = {
  fits: [],
  sleeves: [],
  fabrics: [],
  pockets: [],
  plackets: [],
  sizes: [],
  priceMin: null,
  priceMax: null,
};

export interface FacetOption {
  value: string;
  count: number;
}

export interface Facets {
  maxPrice: number;
  sizes: string[];
  attributes: Record<AttributeKey, FacetOption[]>;
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
  const sizes = new Set<string>();
  let max = 0;
  for (const p of products) {
    max = Math.max(max, p.priceValue);
    p.sizes.forEach((s) => sizes.add(s));
  }
  const attributes = Object.fromEntries(
    attributeFacets.map((f) => {
      const counts = new Map<string, number>();
      for (const p of products) {
        const v = p.attributes[f.attr];
        counts.set(v, (counts.get(v) ?? 0) + 1);
      }
      const order: readonly string[] = f.order;
      const options = [...counts.entries()]
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => order.indexOf(a.value) - order.indexOf(b.value));
      return [f.key, options];
    }),
  ) as Record<AttributeKey, FacetOption[]>;

  return {
    maxPrice: Math.ceil(max / 100) * 100,
    sizes: [...sizes].sort(compareSizes),
    attributes,
  };
}

export function applyFilters(products: Product[], f: Filters): Product[] {
  return products.filter(
    (p) =>
      (f.priceMin === null || p.priceValue >= f.priceMin) &&
      (f.priceMax === null || p.priceValue <= f.priceMax) &&
      (!f.sizes.length || p.sizes.some((s) => f.sizes.includes(s))) &&
      attributeFacets.every((facet) => !f[facet.key].length || f[facet.key].includes(p.attributes[facet.attr])),
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
  attributeFacets.reduce((n, facet) => n + f[facet.key].length, 0) +
  f.sizes.length +
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
  const filters: Filters = { ...emptyFilters, sizes: list(params.get("size")), priceMin, priceMax };
  for (const facet of attributeFacets) filters[facet.key] = list(params.get(facet.param));
  return { sort, filters };
}

export function buildQuery(base: URLSearchParams, sort: SortValue, f: Filters): string {
  const params = new URLSearchParams(base);
  const set = (key: string, value: string | null) => {
    if (value) params.set(key, value);
    else params.delete(key);
  };
  set("sort", sort === "featured" ? null : sort);
  for (const facet of attributeFacets) set(facet.param, f[facet.key].join(","));
  set("size", f.sizes.join(","));
  set(
    "price",
    f.priceMin !== null || f.priceMax !== null ? `${f.priceMin ?? ""}-${f.priceMax ?? ""}` : null,
  );
  // drop parameters from the old colour/category filters if an old link is opened
  params.delete("color");
  params.delete("category");
  // Keep list separators readable: ?size=M,L instead of ?size=M%2CL
  return params.toString().replace(/%2C/gi, ",");
}
