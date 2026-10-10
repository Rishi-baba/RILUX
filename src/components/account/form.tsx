import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

// Shared styling for the mock account forms (login, register, details, addresses).

export const inputClass =
  "h-[48px] w-full rounded-[4px] border border-black/20 bg-white px-[14px] font-ui text-[14px] text-black outline-none transition-colors duration-200 ease-theme placeholder:text-stone focus:border-black aria-[invalid=true]:border-red-600";

export const labelClass =
  "mb-[6px] block font-ui text-[12px] uppercase tracking-[0.08em] text-black";

export const primaryButtonClass =
  "flex h-[50px] w-full items-center justify-center bg-brand font-ui text-[14px] uppercase tracking-[0.1em] text-white transition-opacity duration-200 ease-theme hover:opacity-90 disabled:opacity-60";

export const secondaryButtonClass =
  "inline-flex h-[44px] items-center justify-center border border-black px-[20px] font-ui text-[13px] uppercase tracking-[0.1em] text-black transition-colors duration-200 ease-theme hover:bg-navy hover:border-navy hover:text-white";

export const linkClass = "font-ui text-[13px] text-black underline underline-offset-4 hover:text-brand";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-[420px] px-[16px] pb-[72px] pt-[56px]">
      <h1 className="text-center font-display text-[36px] uppercase leading-[1.1] text-black">
        {title}
      </h1>
      <p className="mb-[28px] mt-[8px] text-center font-ui text-[14px] text-stone">{subtitle}</p>
      {children}
    </section>
  );
}

export function DemoNote() {
  return (
    <p className="mt-[20px] rounded-[4px] bg-mist px-[12px] py-[10px] text-center font-ui text-[12px] text-ink-soft">
      Demo store — accounts are stored only in this browser.
    </p>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-[6px] font-ui text-[12px] text-red-600">
      {message}
    </p>
  );
}

export function Field({
  id,
  label,
  error,
  className,
  ...input
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className">) {
  const errorId = `${id}-error`;
  return (
    <div className={cn("mb-[18px]", className)}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        className={inputClass}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...input}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

/** Only allow same-site relative redirects. */
export function safeRedirect(value: string | undefined, fallback: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}
