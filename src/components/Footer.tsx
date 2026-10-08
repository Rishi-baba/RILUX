import Link from "next/link";
import { brandName, footerColumns } from "@/lib/content";
import { SocialButtons } from "@/components/SocialButtons";

export function Footer() {
  return (
    <footer className="bg-mist px-[11px] pb-[71px] pt-[42px] md:pb-[61px] text-black md:px-[35px] md:pt-[70px]">
      <Link href="/" className="mb-[83px] block w-fit font-display text-[38px] uppercase leading-[32px] text-brand md:text-[64px] md:leading-[53px]">
        {brandName}
      </Link>
      <div className="grid grid-cols-1 gap-[23px] md:grid-cols-[247px_247px] md:gap-0">
        {footerColumns.map((col) => (
          <div key={col.heading}>
            <h4 className="mb-[19px] font-display text-[16px] font-normal capitalize leading-[20px] text-black [font-variant-caps:small-caps]">
              {col.heading}
            </h4>
            <ul className="flex flex-col gap-3 leading-[21px]">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-ui text-[14px] font-normal capitalize leading-[21px] text-black underline-offset-[3px] hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <SocialButtons />
      <p className="mt-[36px] font-ui text-[13px] leading-[20.8px] text-black">
        © 2026 {brandName}. All rights reserved.
      </p>
    </footer>
  );
}
