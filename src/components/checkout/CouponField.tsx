"use client";

import { useId, useState, type FormEvent } from "react";
import { Tag, X } from "lucide-react";
import { COUPON_KEY, couponPercent } from "@/components/checkout/pricing";
import { useSessionValue } from "@/components/checkout/useSessionValue";
import { cn } from "@/lib/utils";

/** Discount code input + Apply, with a removable chip for the applied code. Persists in sessionStorage. */
export function CouponField({ className, inputClassName }: { className?: string; inputClassName?: string }) {
  const id = useId();
  const [stored, setStored] = useSessionValue(COUPON_KEY);
  const applied = stored && couponPercent(stored) ? stored.toUpperCase() : null;
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const apply = (e: FormEvent) => {
    e.preventDefault();
    const code = value.trim().toUpperCase();
    if (!code) return;
    if (couponPercent(code)) {
      setStored(code);
      setValue("");
      setError(null);
    } else {
      setError("Invalid code");
    }
  };

  return (
    <div className={className}>
      <form onSubmit={apply} className="flex gap-2" noValidate>
        <label htmlFor={id} className="sr-only">
          Discount code
        </label>
        <input
          id={id}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Discount code"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "h-[48px] min-w-0 flex-1 rounded-[5px] border bg-white px-[14px] font-ui text-[14px] text-black outline-none placeholder:text-stone focus:border-black focus:ring-1 focus:ring-black",
            error ? "border-red-600" : "border-black/20",
            inputClassName,
          )}
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="h-[48px] flex-none rounded-[5px] bg-ink-soft px-5 font-ui text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-opacity duration-200 ease-theme disabled:opacity-40"
        >
          Apply
        </button>
      </form>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 font-ui text-[12px] text-red-600">
          {error}
        </p>
      ) : null}
      {applied ? (
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-[4px] bg-black/[0.07] py-1 pl-2 pr-1 font-ui text-[12px] font-medium text-black">
          <Tag size={12} aria-hidden />
          {applied}
          <button
            type="button"
            onClick={() => setStored(null)}
            aria-label={`Remove code ${applied}`}
            className="flex size-5 items-center justify-center rounded-full hover:bg-black/10"
          >
            <X size={12} />
          </button>
        </span>
      ) : null}
    </div>
  );
}
