import type { ReactNode } from "react";
import { ChevronDown } from "@/components/icons";
import { cn } from "@/lib/utils";

// Shared form styling for the info pages (front-end only forms).

export const inputClass =
  "h-[48px] w-full rounded-[4px] border border-black/20 bg-white px-[14px] font-ui text-[14px] text-black outline-none transition-colors placeholder:text-stone focus:border-black aria-[invalid=true]:border-red-600";

export const textareaClass = cn(inputClass, "h-auto resize-y py-3 leading-[1.6]");

export const labelClass = "mb-2 block font-ui text-[12px] font-medium uppercase tracking-[0.08em] text-black";

export const primaryButtonClass =
  "inline-flex h-[50px] items-center justify-center gap-2 rounded-[4px] bg-brand px-8 font-ui text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-50";

export const secondaryButtonClass =
  "inline-flex h-[50px] items-center justify-center gap-2 rounded-[4px] border border-black px-8 font-ui text-[13px] font-semibold uppercase tracking-[0.1em] text-black transition-colors hover:bg-navy hover:border-navy hover:text-white";

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

export function Field({
  id,
  label,
  optional,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {optional ? <span className="ml-1 normal-case tracking-normal text-stone">(optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 font-ui text-[12px] text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Props that wire a control to its Field error message. */
export const errorProps = (id: string, error?: string) =>
  error ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` } : {};

/** Native select styled like the text inputs, with a chevron. */
export function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  error?: string;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputClass, "appearance-none pr-10", !value && "text-stone")}
        {...errorProps(id, error)}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((o) => (
          <option key={o} value={o} className="text-black">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[14px] h-4 w-4 -translate-y-1/2 text-black/60"
      />
    </div>
  );
}

/** Inline success panel that replaces a submitted form. */
export function SuccessState({
  title,
  children,
  action,
}: {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div role="status" className="flex flex-col items-center px-4 py-12 text-center">
      <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
        <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <p className="font-display text-[26px] leading-[1.2] text-black">{title}</p>
      {children ? <div className="mt-3 font-ui text-[14px] leading-[1.7] text-ink-soft">{children}</div> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
