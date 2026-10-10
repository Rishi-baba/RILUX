"use client";

import { useId, useState } from "react";
import { Plus } from "@/components/icons";

import { cn } from "@/lib/utils";

export interface AccordionItem {
  title: string;
  /** Paragraph text, or a list rendered as bullets */
  content: string | string[];
}

function AccordionRow({ item, defaultOpen }: { item: AccordionItem; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className="mt-[10px] rounded-[4px] border border-black/10">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-header`}
          onClick={() => setOpen((o) => !o)}
          className="flex h-[52px] w-full items-center justify-between px-[16px] text-left font-ui text-[14px] text-black"
        >
          {item.title}
          <Plus
            aria-hidden
            strokeWidth={1.5}
            className={cn(
              "size-[18px] transition-transform duration-300 ease-theme",
              open && "rotate-45",
            )}
          />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-header`}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-theme",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className="px-[16px] pb-[16px] font-ui text-[13.5px] leading-[1.7] text-ink-soft">
            {Array.isArray(item.content) ? (
              <ul className="list-disc space-y-[2px] pl-[18px]">
                {item.content.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <p>{item.content}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductAccordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="mt-[20px]">
      {items.map((item, i) => (
        <AccordionRow key={item.title} item={item} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
