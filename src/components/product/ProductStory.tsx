import { Asterisk } from "lucide-react";

import { Placeholder, type PlaceholderTone } from "@/components/Placeholder";

export function ProductStory({
  productType,
  tone,
}: {
  productType: string;
  tone: PlaceholderTone;
}) {
  return (
    <div className="overflow-hidden">
      {/* Giant title band */}
      <section className="relative px-[24px] py-[48px] text-center">
        <Asterisk
          aria-hidden
          strokeWidth={1}
          className="pointer-events-none absolute left-[-40px] top-1/2 size-[260px] -translate-y-1/2 opacity-[0.06]"
        />
        <h2 className="relative break-words font-ui text-[clamp(56px,11vw,160px)] font-black uppercase leading-[0.95] text-black">
          {productType}
        </h2>
      </section>

      {/* Split block */}
      <section className="mx-auto grid max-w-[1100px] items-center gap-[32px] px-[16px] pb-[48px] md:grid-cols-2 md:gap-[48px] md:px-[24px]">
        <div>
          <h3 className="font-ui text-[28px] font-bold uppercase leading-[1.15] text-black md:text-[36px]">
            Cut With Care.
          </h3>
          <div className="mt-[20px] space-y-[16px] font-sans text-[19px] leading-[1.5] text-ink-soft">
            <p className="max-w-[300px]">A considered pattern that sits close without ever restricting movement.</p>
            <p className="max-w-[300px]">Fine yarns, tightly woven, for a smooth hand that softens with every wear.</p>
            <p className="max-w-[300px]">Tuck it into tailored trousers for the office, or wear it open on slower days.</p>
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full">
          <Placeholder tone={tone} />
        </div>
      </section>

      {/* Image banner */}
      <section className="pb-[48px]">
        <h3 className="mb-[24px] px-[16px] text-center font-ui text-[30px] font-bold uppercase leading-[1.1] text-black md:text-[44px]">
          Made to Be Worn Well.
        </h3>
        <div className="relative aspect-[4/5] w-full sm:aspect-[1265/600]">
          <Placeholder tone="dark" />
          <p className="absolute bottom-0 left-0 max-w-[640px] p-[24px] font-sans text-[18px] leading-[1.5] text-white md:p-[48px] md:text-[20px]">
            Every RILUX shirt starts with the cloth: the finest cottons we can find, cut and finished to last.
          </p>
        </div>
      </section>
    </div>
  );
}
