import type { Metadata } from "next";
import Link from "next/link";
import { Leaf, Ruler, Scissors, Sparkles } from "lucide-react";
import { primaryButtonClass } from "@/components/info/fields";
import { PageHero } from "@/components/info/PageHero";
import { Placeholder, type PlaceholderTone } from "@/components/Placeholder";
import { SingleImageBanner } from "@/components/SingleImageBanner";
import { routes } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description: "The story behind RILUX: premium shirts in Giza cotton, tailored to last.",
};

const rows: { heading: string; tone: PlaceholderTone; body: [string, string] }[] = [
  {
    heading: "It Starts With the Cloth",
    tone: "sand",
    body: [
      "Most of our shirts are woven from Giza cotton, an extra-long-staple Egyptian cotton prized for its softness, strength and natural lustre.",
      "Alongside it sit satin weaves and premium cottons, each chosen for how it feels against the skin and how it wears over time.",
    ],
  },
  {
    heading: "Cut for the Way You Move",
    tone: "olive",
    body: [
      "Formal, regular or casual, every RILUX shirt is cut to sit cleanly through the shoulders and chest without restricting you.",
      "Full sleeves for the boardroom, half sleeves for warmer days, all finished to the same standard.",
    ],
  },
  {
    heading: "Small Details, Done Properly",
    tone: "cool",
    body: [
      "Hidden plackets, self-fold fronts, double pockets and contrast collars: the details are what make a shirt yours.",
      "We keep them simple and execute them carefully, so the shirt looks right every time you wear it.",
    ],
  },
];

const values = [
  { icon: Scissors, title: "Craft", line: "Patterns refined and finished with care." },
  { icon: Leaf, title: "Fabric First", line: "Only fine, long-staple cottons make the cut." },
  { icon: Ruler, title: "Fit", line: "Shapes that flatter without feeling tight." },
  { icon: Sparkles, title: "Longevity", line: "Shirts that look better the more you wear them." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" />

      <SingleImageBanner tone="warm" aspect="medium" />

      <section className="mx-auto max-w-[760px] px-4 py-12 text-center md:py-16">
        <p className="font-display text-[22px] leading-[1.4] text-black md:text-[28px]">
          RILUX makes one thing: the shirt. We start with the finest cottons we can find and cut them into shirts
          that feel as good at the end of the day as they did when you put them on.
        </p>
      </section>

      <section className="mx-auto flex max-w-[1100px] flex-col gap-12 px-4 pb-16 md:gap-14 md:pb-20">
        {rows.map((row, i) => (
          <div key={row.heading} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <div className={cn("relative aspect-[4/5] overflow-hidden", i % 2 === 1 && "md:order-2")}>
              <Placeholder tone={row.tone} />
            </div>
            <div>
              <h2 className="mb-4 font-ui text-[22px] leading-[1.2] font-bold uppercase text-black md:text-[26px]">
                {row.heading}
              </h2>
              <p className="mb-4 font-ui text-[14.5px] leading-[1.8] text-ink-soft">{row.body[0]}</p>
              <p className="font-ui text-[14.5px] leading-[1.8] text-ink-soft">{row.body[1]}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="border-t border-black/10 px-4 py-14 md:py-16">
        <h2 className="mb-10 text-center font-display text-[28px] leading-[1.1] uppercase text-black md:text-[36px]">
          What We Value
        </h2>
        <ul className="mx-auto grid max-w-[1100px] grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {values.map(({ icon: Icon, title, line }) => (
            <li key={title} className="flex flex-col items-center text-center">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-mist text-brand">
                <Icon aria-hidden className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mb-1.5 font-ui text-[14px] font-semibold uppercase tracking-[0.08em] text-black">
                {title}
              </h3>
              <p className="max-w-[220px] font-ui text-[13px] leading-[1.6] text-stone">{line}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-linen px-4 py-14 text-center md:py-20">
        <h2 className="mb-6 font-display text-[28px] leading-[1.15] uppercase text-black md:text-[40px]">
          Find Your Next Favourite Shirt
        </h2>
        <Link href={routes.collection("all")} className={primaryButtonClass}>
          Shop the collection
        </Link>
      </section>
    </>
  );
}
