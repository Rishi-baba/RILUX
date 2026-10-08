import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Long-form text column. Styles its h2 / p / ul / a descendants.
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto max-w-[760px] px-4 pb-[72px]",
        "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:scroll-mt-28 [&_h2]:font-display [&_h2]:text-[24px] [&_h2]:leading-[1.2] [&_h2]:font-normal [&_h2]:uppercase [&_h2]:text-black",
        "[&_p]:mb-4 [&_p]:font-ui [&_p]:text-[14.5px] [&_p]:leading-[1.8] [&_p]:text-ink-soft",
        "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5 [&_li]:font-ui [&_li]:text-[14.5px] [&_li]:leading-[1.8] [&_li]:text-ink-soft",
        "[&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors [&_a:hover]:text-brand",
        className,
      )}
    >
      {children}
    </div>
  );
}
