import Link from "next/link";
import { routes } from "@/lib/content";
import { cn } from "@/lib/utils";

// Centered page title used by the info and policy pages.
export function PageHero({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <section className={cn("px-4 pt-12 pb-8 text-center", className)}>
      <nav aria-label="Breadcrumb" className="mb-3 font-ui text-[12px] text-stone">
        <ol className="flex items-center justify-center gap-1.5">
          <li>
            <Link href={routes.home} className="transition-colors hover:text-black">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>
      <h1 className="font-display text-[32px] leading-[1.1] font-normal uppercase text-black md:text-[44px]">
        {title}
      </h1>
      {subtitle ? (
        <p className="mx-auto mt-3 max-w-[560px] font-ui text-[14px] leading-[1.6] text-stone">{subtitle}</p>
      ) : null}
    </section>
  );
}
