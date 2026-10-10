// Centred brand statement: serif heading over two short paragraphs.
export function BrandStatement() {
  return (
    <section className="mx-auto max-w-[1000px] px-[20px] py-[48px] text-center md:py-[72px]">
      <h2 className="font-display text-[30px] font-normal leading-[1.15] text-black md:text-[48px]">
        We Only Make Shirts.
      </h2>
      <div className="mx-auto mt-[20px] max-w-[880px] space-y-[18px] font-ui text-[15px] leading-[1.75] text-ink-soft md:mt-[28px] md:text-[17px]">
        <p>
          That&apos;s on purpose. When you make one thing, you can spend your time on what matters: the fabric, the fit
          and the small bits most people never notice, like how the collar sits or whether a button stays on.
        </p>
        <p>
          Our shirts are made in Giza cotton, Giza satin, premium cotton and pure cotton, in formal, regular and casual
          fits. Every one is cut and stitched in India and checked by hand before it is packed.
        </p>
      </div>
    </section>
  );
}
