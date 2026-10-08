import type { Metadata } from "next";
import Link from "next/link";
import { primaryButtonClass, secondaryButtonClass } from "@/components/info/fields";
import { routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="flex flex-col items-center px-4 py-20 text-center md:py-28">
      <p aria-hidden className="font-display text-[96px] leading-none text-black md:text-[120px]">
        404
      </p>
      <h1 className="mt-4 font-ui text-[18px] font-semibold uppercase tracking-[0.1em] text-black">Page not found</h1>
      <p className="mt-3 max-w-[420px] font-ui text-[14px] leading-[1.7] text-stone">
        The page you&apos;re looking for may have moved or no longer exists.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href={routes.home} className={primaryButtonClass}>
          Back to home
        </Link>
        <Link href={routes.collection("all")} className={secondaryButtonClass}>
          Shop all
        </Link>
      </div>
    </section>
  );
}
