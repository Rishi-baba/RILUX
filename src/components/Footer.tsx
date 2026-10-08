import Link from "next/link";
import { brandName, footerColumns } from "@/lib/content";
import { SocialButtons } from "@/components/SocialButtons";

export function Footer() {
  return (
    <footer className="bg-mist px-4 pb-6 pt-10 text-black md:px-[35px] md:pb-8 md:pt-12">
      <Link href="/" className="mb-10 block w-fit font-display text-[52px] uppercase leading-none text-brand">
        {brandName}
      </Link>
      <div className="grid grid-cols-2 gap-8 md:flex md:gap-20">
        {footerColumns.map((col) => (
          <div key={col.heading}>
            <h4 className="mb-4 font-display text-[16px] font-normal capitalize text-black">
              {col.heading}
            </h4>
            <ul className="flex flex-col gap-3">
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
      <p className="mt-8 font-ui text-[13px] leading-[20.8px] text-black">
        © 2026 {brandName}. All rights reserved.
      </p>
    </footer>
  );
}
