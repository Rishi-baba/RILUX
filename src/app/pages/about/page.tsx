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
  description: "Placeholder about page for the storefront template.",
};

const rows: { heading: string; tone: PlaceholderTone }[] = [
  { heading: "Placeholder Heading One", tone: "sand" },
  { heading: "Placeholder Heading Two", tone: "olive" },
  { heading: "Placeholder Heading Three", tone: "cool" },
];

const values = [
  { icon: Scissors, title: "Value One", line: "One short placeholder line about this value." },
  { icon: Leaf, title: "Value Two", line: "One short placeholder line about this value." },
  { icon: Ruler, title: "Value Three", line: "One short placeholder line about this value." },
  { icon: Sparkles, title: "Value Four", line: "One short placeholder line about this value." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" />

      <SingleImageBanner tone="warm" aspect="medium" />

      <section className="mx-auto max-w-[760px] px-4 py-12 text-center md:py-16">
        <p className="font-display text-[22px] leading-[1.4] text-black md:text-[28px]">
          Placeholder statement describing the brand&apos;s story in a sentence or two. Replace with your own words
          about who you are and what you make.
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
              <p className="mb-4 font-ui text-[14.5px] leading-[1.8] text-ink-soft">
                Placeholder paragraph describing one part of the brand&apos;s story. A few sentences about the people,
                the process or the idea behind the label.
              </p>
              <p className="font-ui text-[14.5px] leading-[1.8] text-ink-soft">
                A second placeholder paragraph with supporting detail. Replace this copy with your store&apos;s own
                text before launch.
              </p>
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
          Placeholder Call to Action
        </h2>
        <Link href={routes.collection("all")} className={primaryButtonClass}>
          Shop the collection
        </Link>
      </section>
    </>
  );
}
