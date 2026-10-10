import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, PackageCheck, RefreshCcw } from "@/components/icons";
import { PageHero } from "@/components/info/PageHero";
import { ReturnForm } from "@/components/info/ReturnForm";
import { routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Request a Return / Exchange",
  description: "Request a return or size exchange for your RILUX order.",
};

const steps = [
  { icon: ClipboardList, title: "Submit a request", line: "Tell us your order number and what you would like to change." },
  { icon: PackageCheck, title: "Pack your item", line: "Pack the shirt unworn with its tags, ready for pickup." },
  { icon: RefreshCcw, title: "Refund or exchange", line: "Once it reaches us, we ship your exchange or process the refund." },
];

export default function ReturnsPage() {
  return (
    <>
      <PageHero title="Request a Return / Exchange" />

      <ol className="mx-auto grid max-w-[1100px] gap-8 px-4 pb-12 md:grid-cols-3 md:gap-6 md:pb-16">
        {steps.map(({ icon: Icon, title, line }, i) => (
          <li key={title} className="flex flex-col items-center text-center">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-mist text-brand">
              <Icon aria-hidden className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <p className="mb-1 font-ui text-[11px] uppercase tracking-[0.12em] text-stone">Step {i + 1}</p>
            <h2 className="mb-1.5 font-ui text-[14px] font-semibold uppercase tracking-[0.08em] text-black">{title}</h2>
            <p className="max-w-[260px] font-ui text-[13px] leading-[1.6] text-stone">{line}</p>
          </li>
        ))}
      </ol>

      <div className="mx-auto max-w-[760px] px-4 pb-[72px]">
        <ReturnForm />
        <p className="mt-6 font-ui text-[13px] text-stone">
          See our{" "}
          <Link href={routes.refund} className="text-black underline underline-offset-2">
            Refund &amp; Exchange Policy
          </Link>{" "}
          for details.
        </p>
      </div>
    </>
  );
}
