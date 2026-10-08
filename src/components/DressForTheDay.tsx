"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { Placeholder } from "@/components/Placeholder";
import { useAutoplay } from "@/hooks/useAutoplay";
import { getCollection, occasions, products, productsIn, routes } from "@/lib/content";
import { cn } from "@/lib/utils";

const picks = occasions.map((o) => products.find((p) => p.title.startsWith(o.pick)) ?? productsIn(o.slug)[0]);

// "Dress for the Day": occasions listed on the left; the selected one drives a large image
// with its name and a recommended shirt (right). Steps through
// the day on its own; hovering or tapping an entry takes over for a few seconds.
export function DressForTheDay() {
  const [active, setActive] = useState(0);
  const nudge = useAutoplay(() => setActive((i) => (i + 1) % occasions.length), { interval: 5000 });

  const select = (i: number) => {
    nudge();
    setActive(i);
  };

  const current = occasions[active];
  const pick = picks[active];
  const collection = getCollection(current.slug);

  return (
    <section className="bg-[rgb(250,249,247)] px-[16px] py-[56px] md:px-[36px] md:py-[96px]">
      <div className="mx-auto grid max-w-[1280px] gap-[32px] md:grid-cols-[5fr_7fr] md:gap-[64px]">
        {/* Intro + timeline */}
        <div className="flex flex-col">
          <h2 className="font-display text-[36px] uppercase leading-[1.05] text-black md:text-[56px]">
            Dress for
            <br />
            the Day
          </h2>

          {/* Phone: swipeable occasion chips */}
          <div className="scrollbar-none -mx-[16px] mt-[24px] overflow-x-auto md:hidden">
            <ul className="flex w-max gap-[8px] px-[16px]">
              {occasions.map((o, i) => (
                <li key={o.title}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={i === active}
                    className={cn(
                      "rounded-full border px-[18px] py-[10px] transition-colors",
                      i === active ? "border-black bg-black text-white" : "border-black/15 text-ink",
                    )}
                  >
                    <span className="font-display text-[15px] uppercase tracking-[0.04em]">{o.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop: occasion list */}
          <ol className="mt-[40px] hidden border-t border-black/10 md:block">
            {occasions.map((o, i) => {
              const isActive = i === active;
              return (
                <li key={o.title} className="border-b border-black/10">
                  <button
                    type="button"
                    onMouseEnter={() => select(i)}
                    onFocus={() => select(i)}
                    onClick={() => select(i)}
                    aria-pressed={isActive}
                    className="group grid w-full grid-cols-[1fr_auto] items-center gap-[16px] py-[18px] text-left"
                  >
                    <span>
                      <span
                        className={cn(
                          "block font-display text-[28px] uppercase leading-[1.1] transition-colors duration-300",
                          isActive ? "text-black" : "text-black/30 group-hover:text-black/60",
                        )}
                      >
                        {o.title}
                      </span>
                      <span
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-300 ease-theme",
                          isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-[6px] font-ui text-[13px] leading-[1.6] text-ink-soft">{o.blurb}</span>
                        </span>
                      </span>
                    </span>
                    <ArrowRightIcon
                      aria-hidden
                      className={cn("size-[18px] transition-all duration-300", isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0")}
                    />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Visual + pick */}
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[7/6]">
            {occasions.map((o, i) => (
              <div
                key={o.title}
                aria-hidden={i !== active}
                className={cn("absolute inset-0 transition-opacity duration-700 ease-theme", i === active ? "opacity-100" : "opacity-0")}
              >
                <Placeholder tone={o.tone} />
              </div>
            ))}
            <div className="pointer-events-none absolute left-[20px] top-[16px] md:left-[32px] md:top-[24px]">
              <p key={current.title} className="animate-in fade-in font-display text-[40px] uppercase leading-none text-white md:text-[72px]">
                {current.title}
              </p>
            </div>
            <p className="absolute bottom-[112px] left-[20px] right-[20px] font-ui text-[14px] leading-[1.6] text-white md:hidden">
              {current.blurb}
            </p>
          </div>

          {/* Our pick card */}
          {pick ? (
            <div className="absolute bottom-[16px] left-[16px] right-[16px] flex items-center gap-[14px] bg-white p-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:bottom-[28px] md:left-auto md:right-[28px] md:w-[360px] md:p-[16px]">
              <Link href={routes.product(pick.slug)} className="relative h-[80px] w-[64px] flex-none overflow-hidden md:h-[100px] md:w-[80px]">
                <Placeholder tone={pick.tone} />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="font-ui text-[10px] uppercase tracking-[0.18em] text-stone">Our pick</p>
                <Link
                  href={routes.product(pick.slug)}
                  className="mt-[2px] line-clamp-2 font-display leading-[1.2] text-[16px] text-black [font-variant-caps:small-caps] hover:underline md:text-[18px]"
                >
                  {pick.title}
                </Link>
                <p className="font-ui text-[13px] text-black">{pick.price}</p>
                <Link
                  href={routes.collection(current.slug)}
                  className="mt-[6px] inline-flex items-center gap-[6px] font-ui text-[11px] uppercase tracking-[0.12em] text-black underline underline-offset-4 hover:opacity-70"
                >
                  Shop {collection?.title ?? current.title}
                  <ArrowRightIcon aria-hidden className="size-[13px]" />
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
