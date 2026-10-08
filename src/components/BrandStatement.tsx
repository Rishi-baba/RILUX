// Centred brand statement: serif heading over two short paragraphs.
export function BrandStatement() {
  return (
    <section className="mx-auto max-w-[1000px] px-[20px] py-[48px] text-center md:py-[72px]">
      <h2 className="font-display text-[30px] font-normal leading-[1.15] text-black md:text-[48px]">
        Shirts, Considered From the Thread Up.
      </h2>
      <div className="mx-auto mt-[20px] max-w-[880px] space-y-[18px] font-ui text-[15px] leading-[1.75] text-ink-soft md:mt-[28px] md:text-[17px]">
        <p>
          A great shirt does its work quietly. It holds a crisp line through a long day, softens with every wash, and
          never asks for attention it hasn&apos;t earned.
        </p>
        <p>
          At RILUX we start with extra-long-staple Giza cotton and fine satin weaves, cut them into formal, regular and
          casual shapes, and finish every collar, cuff and placket to the same standard. The result is a shirt you reach
          for without thinking, and keep wearing for years.
        </p>
      </div>
    </section>
  );
}
