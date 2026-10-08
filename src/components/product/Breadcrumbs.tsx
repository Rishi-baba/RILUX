import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-[1100px] px-[16px] py-[16px] md:px-[24px]">
      <ol className="flex flex-wrap items-center gap-x-[6px] font-ui text-[12px] text-stone">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-x-[6px] capitalize">
              {item.href && !last ? (
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined}>{item.label}</span>
              )}
              {!last ? <span aria-hidden>/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
