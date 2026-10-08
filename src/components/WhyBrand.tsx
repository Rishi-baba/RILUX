import { brandName, brandPoints } from "@/lib/content";

// Brand pillars: statement on the left, four numbered points in a 2×2 grid on the right.
export function WhyBrand() {
  return (
    <section className="bg-linen px-[20px] py-[56px] md:px-[36px] md:py-[88px]">
      <div className="mx-auto grid max-w-[1200px] gap-[40px] md:grid-cols-[5fr_7fr] md:gap-[80px]">
        <div>
          <p className="font-ui text-[11px] uppercase tracking-[0.24em] text-ink-soft/70 md:text-[12px]">Why {brandName}</p>
          <h2 className="mt-[14px] font-display text-[30px] leading-[1.15] text-black md:text-[42px]">
            Shirts cut from the world&apos;s finest cottons, made to be worn for years.
          </h2>
        </div>

        <ol className="grid gap-x-[40px] gap-y-[32px] sm:grid-cols-2 md:gap-y-[44px]">
          {brandPoints.map((point, i) => (
            <li key={point.title} className="border-t border-black/15 pt-[18px]">
              <span className="font-display text-[15px] text-ink-soft/60">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-[8px] font-ui text-[13px] font-semibold uppercase tracking-[0.12em] text-black">{point.title}</h3>
              <p className="mt-[8px] font-ui text-[14px] leading-[1.7] text-ink-soft">{point.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
