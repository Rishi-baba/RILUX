import { cn } from "@/lib/utils";

// Centered display heading between sections. Source sizes: 44px/48.4 (h108),
// 52px/57.2 two-line (h174–182), 56px/61.6 (h122). Uppercase serif, black.
const sizes = {
  md: "text-[30px] leading-[1.1] md:text-[44px] md:leading-[48.4px]",
  lg: "text-[34px] leading-[1.1] md:text-[52px] md:leading-[57.2px]",
  xl: "text-[36px] leading-[1.1] md:text-[56px] md:leading-[61.6px]",
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
    <section className={cn("px-4 pt-10 pb-6 text-center md:pt-12 md:pb-8", className)}>
      <h2 className={cn("font-display font-normal uppercase text-black", sizes[size])}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h2>
    </section>
  );
}
