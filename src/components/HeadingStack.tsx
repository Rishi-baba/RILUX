import { cn } from "@/lib/utils";

// Centered display heading between sections. Type size + vertical padding measured on the
// reference at 1440px and 390px (e.g. md: 44px with 32/28 padding, 20px with 24/8 on phones).
const sizes = {
  md: "pt-[24px] pb-[8px] text-[20px] leading-[22px] md:pt-[32px] md:pb-[28px] md:text-[44px] md:leading-[48.4px]",
  lg: "pt-[20px] pb-[15px] text-[26px] leading-[28.6px] md:pt-[40px] md:pb-[28px] md:text-[52px] md:leading-[57.2px]",
  xl: "pt-[16px] pb-[16px] text-[26px] leading-[28.6px] md:pt-[36px] md:pb-[24px] md:text-[56px] md:leading-[61.6px]",
};

export function HeadingStack({
  lines,
  size = "lg",
  className,
}: {
  lines: string[];
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <section className={cn("px-[20px] text-center md:px-0", sizes[size], className)}>
      <h2 className="font-display font-normal uppercase text-black">
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h2>
    </section>
  );
}
