"use client";

import type { ReactNode } from "react";
import { ChevronDown } from "@/components/icons";
import { cn } from "@/lib/utils";

export const inputClass =
  "h-[48px] w-full rounded-[5px] border bg-white px-[14px] font-ui text-[14px] text-black outline-none transition-colors duration-150 placeholder:text-stone focus:border-black focus:ring-1 focus:ring-black";

function FieldShell({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block font-ui text-[12px] text-stone">
        {label}
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

export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  className,
  type = "text",
  autoComplete,
  inputMode,
  maxLength,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: "text" | "email" | "numeric" | "tel";
  maxLength?: number;
  placeholder?: string;
}) {
  return (
    <FieldShell id={id} label={label} error={error} className={className}>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClass, error ? "border-red-600" : "border-black/20")}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  error,
  className,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  error?: string;
  className?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <FieldShell id={id} label={label} error={error} className={className}>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(inputClass, "appearance-none pr-10", error ? "border-red-600" : "border-black/20")}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          aria-hidden
          className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-stone"
        />
      </div>
    </FieldShell>
  );
}

/** Bordered radio "card" used for shipping and payment options. */
export function RadioCard({
  name,
  value,
  checked,
  onChange,
  label,
  hint,
  aside,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  hint?: string;
  aside?: ReactNode;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 border px-4 py-4 font-ui text-[14px] transition-colors duration-150 first:rounded-t-[5px] last:rounded-b-[5px] [&+&]:-mt-px",
        checked ? "relative z-[1] border-black bg-black/[0.03]" : "border-black/20",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="size-[18px] flex-none accent-black"
      />
      <span className="flex-1">
        <span className="block text-black">{label}</span>
        {hint ? <span className="mt-0.5 block text-[12px] text-stone">{hint}</span> : null}
      </span>
      {aside ? <span className="flex-none text-black">{aside}</span> : null}
    </label>
  );
}
