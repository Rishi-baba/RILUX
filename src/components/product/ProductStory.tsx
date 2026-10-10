import { Placeholder, type PlaceholderTone } from "@/components/Placeholder";
import type { Product } from "@/types/content";

interface Highlight {
  title: string;
  tagline: string;
  text: string;
}

// Construction notes for the three feature panels, picked from the shirt's own attributes.
const collar = {
  spread: {
    title: "Spread Collar",
    tagline: "Sits sharp, with or without a tie.",
    text: "The points open wide enough for a proper tie knot, and the collar keeps its shape when you leave the top button undone.",
  },
  classic: {
    title: "Classic Collar",
    tagline: "Neat at the neck, easy all day.",
    text: "A medium-point collar that looks finished without a tie. Light interlining keeps it firm without making it stiff.",
  },
  chambray: {
    title: "Chambray Collar",
    tagline: "A contrast you notice up close.",
    text: "The inside of the collar band is lined in chambray, so a thin strip of contrast shows when the top button is open.",
  },
  yoke: {
    title: "Front Yoke",
    tagline: "Built through the shoulders.",
    text: "A shaped yoke across the chest gives the shoulders a clean line and helps the shirt hang straight.",
  },
} satisfies Record<string, Highlight>;

const placket: Record<Product["attributes"]["placket"], Highlight> = {
  "Standard Placket": {
    title: "Classic Placket",
    tagline: "The everyday front.",
    text: "A stitched front strip keeps the buttons in a straight line and holds its shape wash after wash.",
  },
  "Concealed Placket": {
    title: "Concealed Placket",
    tagline: "No buttons on show.",
    text: "The buttons sit behind a fold of fabric, so the front reads as one clean panel. Looks especially good under a blazer.",
  },
  "Self-Fold Placket": {
    title: "French Placket",
    tagline: "Clean front, no extra seam.",
    text: "Instead of a separate strip sewn on, the front is folded back and pressed. It lies flatter and looks a touch dressier.",
  },
};

const sleeve = {
  full: {
    title: "Full Sleeves",
    tagline: "Button cuffs that fit over a watch.",
    text: "Two-button adjustable cuffs, and a sleeve long enough to show a little cuff under a jacket.",
  },
  halfFormal: {
    title: "Half Sleeves",
    tagline: "Office-ready on hot days.",
    text: "Cut to end just above the elbow with a clean hem, so it still looks smart enough for work in the summer.",
  },
  halfCasual: {
    title: "Half Sleeves",
    tagline: "Made for warm weekends.",
    text: "A slightly wider sleeve that lets air move, with a tab so you can roll it up a turn and keep it there.",
  },
} satisfies Record<string, Highlight>;

function highlightsFor(product: Product): Highlight[] {
  const { attributes: a, details } = product;
  const first = details.join(" ").toLowerCase();
  const collarNote = first.includes("chambray")
    ? collar.chambray
    : first.includes("yoke")
      ? collar.yoke
      : a.fit === "Formal"
        ? collar.spread
        : collar.classic;
  const sleeveNote =
    a.sleeve === "Full Sleeve" ? sleeve.full : a.fit === "Casual" ? sleeve.halfCasual : sleeve.halfFormal;
  return [collarNote, placket[a.placket], sleeveNote];
}

const panelTones: PlaceholderTone[] = ["sand", "stone", "cool"];

export function ProductStory({ product }: { product: Product }) {
  const highlights = highlightsFor(product);

  return (
    <section aria-label="Shirt details" className="pb-[56px] pt-[24px] md:pt-[40px]">
      <div className="mb-[24px] px-[16px] text-center md:mb-[32px]">
        <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-deep">The details</p>
        <h3 className="mt-[8px] font-display text-[30px] leading-[1.1] text-navy md:text-[40px]">How this shirt is made</h3>
      </div>

      <div className="scrollbar-none flex snap-x snap-mandatory gap-[6px] overflow-x-auto px-[16px] md:grid md:grid-cols-3 md:overflow-visible md:px-[6px]">
        {highlights.map((h, i) => (
          <article
            key={h.title}
            className="relative aspect-[4/5] w-[82%] flex-none snap-start overflow-hidden md:aspect-[3/4] md:w-auto"
          >
            <Placeholder tone={panelTones[i] ?? product.altTone} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent px-[22px] pb-[24px] pt-[90px] md:px-[34px] md:pb-[34px] md:pt-[120px]">
              <h4 className="font-display text-[30px] italic leading-[1.05] text-navy md:text-[38px]">{h.title}</h4>
              <p className="mt-[6px] font-ui text-[14px] font-medium text-ink md:text-[16px]">{h.tagline}</p>
              <p className="mt-[10px] font-ui text-[12.5px] leading-[1.6] text-ink-soft md:text-[13.5px]">{h.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
