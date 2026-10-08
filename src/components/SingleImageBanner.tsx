import Link from "next/link";

import { Placeholder, type PlaceholderTone } from "@/components/Placeholder";
import { routes } from "@/lib/content";
import { cn } from "@/lib/utils";

// Full-bleed linked image banner. Source: image 1265 wide at heights 723 / 466 / 394
// (aspect ≈ 1.75, 2.71, 3.21) with 20–40px bottom spacing; copy is baked into the photo,
// so the placeholder overlays a neutral headline in the same position.
export function SingleImageBanner({
  tone,
  aspect,
  overline,
  title,
  align = "left",
  mobileRatio,
  className,
  href = routes.collection("all"),
}: {
  tone: PlaceholderTone;
  aspect: "tall" | "medium" | "short";
  /** Tailwind aspect class for phones; each reference banner has its own portrait crop */
  mobileRatio?: string;
  overline?: string;
  title?: string;
  align?: "left" | "center";
  className?: string;
  href?: string;
}) {
  const ratio = {
    tall: "md:aspect-[1265/723]",
    medium: "md:aspect-[1265/466]",
    short: "md:aspect-[1265/394]",
  }[aspect];
  const phone = mobileRatio ?? { tall: "aspect-[390/728]", medium: "aspect-[390/500]", short: "aspect-[390/468]" }[aspect];

  return (
    <section className={className}>
      <Link href={href} className={cn("relative block w-full overflow-hidden", phone, ratio)}>
        <Placeholder tone={tone} />
        {title ? (
          <div
            className={cn(
              "absolute inset-0 flex flex-col justify-end p-6 text-white md:p-16",
              align === "center" && "items-center justify-center text-center",
            )}
          >
            {overline ? (
              <span className="font-ui text-sm tracking-[0.2em] uppercase md:text-2xl">{overline}</span>
            ) : null}
            <span className="font-ui text-[36px] leading-[0.95] font-bold uppercase md:text-[80px]">
              {title}
            </span>
          </div>
        ) : null}
      </Link>
    </section>
  );
}
