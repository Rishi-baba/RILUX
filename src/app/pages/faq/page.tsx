import type { Metadata } from "next";
import Link from "next/link";
import { FaqBrowser, type FaqCategory } from "@/components/info/FaqBrowser";
import { primaryButtonClass } from "@/components/info/fields";
import { PageHero } from "@/components/info/PageHero";
import { routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Placeholder frequently asked questions for the storefront template.",
};

const topics = ["Orders", "Shipping", "Returns", "Products", "Payments"];
const counts = [5, 4, 5, 4, 4];
const ordinals = ["first", "second", "third", "fourth", "fifth"];

const categories: FaqCategory[] = topics.map((name, ti) => ({
  name,
  items: Array.from({ length: counts[ti] }, (_, i) => ({
    q: `Placeholder ${ordinals[i]} question about ${name.toLowerCase()}?`,
    a: `Short placeholder answer to the ${ordinals[i]} ${name.toLowerCase()} question. Replace with your store's own answer in one or two sentences.`,
  })),
}));

export default function FaqPage() {
  return (
    <>
      <PageHero title="FAQs" subtitle="Placeholder line introducing answers to common questions." />
      <FaqBrowser categories={categories} />
      <section className="mx-auto max-w-[860px] px-4 pb-[72px]">
        <div className="flex flex-col items-center gap-4 rounded-[6px] bg-linen px-6 py-10 text-center">
          <h2 className="font-display text-[28px] leading-[1.1] uppercase text-black">Still need help?</h2>
          <p className="font-ui text-[14px] text-ink-soft">Placeholder line pointing customers to the support team.</p>
          <Link href={routes.contact} className={primaryButtonClass}>
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
