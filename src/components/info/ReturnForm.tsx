"use client";

import { useState, type FormEvent } from "react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  errorProps,
  Field,
  inputClass,
  isEmail,
  labelClass,
  primaryButtonClass,
  secondaryButtonClass,
  Select,
  SuccessState,
  textareaClass,
  type FieldErrors,
} from "@/components/info/fields";

const reasons = ["Size", "Quality", "Changed mind", "Other"] as const;
const types = ["Return", "Exchange"] as const;

type Key = "order" | "email" | "items" | "reason" | "type" | "comments";
const initial: Record<Key, string> = { order: "", email: "", items: "", reason: "", type: "Return", comments: "" };

/** Deterministic mock reference from the order number (djb2 hash, no randomness). */
export function returnReference(order: string, type: string) {
  const clean = order.trim().replace(/^#/, "").toUpperCase().replace(/[^A-Z0-9]/g, "") || "0000";
  let hash = 5381;
  for (const ch of `${clean}:${type}`) hash = ((hash << 5) + hash + ch.charCodeAt(0)) >>> 0;
  const suffix = hash.toString(36).toUpperCase().padStart(4, "0").slice(-4);
  return `${type === "Exchange" ? "EX" : "RT"}-${clean}-${suffix}`;
}

export function ReturnForm() {
  const { notify } = useStore();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<FieldErrors<Key>>({});
  const [reference, setReference] = useState<string | null>(null);

  const set = (key: Key) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: FieldErrors<Key> = {};
    if (!values.order.trim().replace(/^#/, "")) next.order = "Please enter your order number.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!isEmail(values.email)) next.email = "Please enter a valid email address.";
    if (!values.items.trim()) next.items = "Please list the item(s) you'd like to send back.";
    if (!values.reason) next.reason = "Please choose a reason.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      document.getElementById(`return-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setReference(returnReference(values.order, values.type));
    notify(`${values.type} request submitted`);
  };

  if (reference) {
    return (
      <div className="rounded-[6px] border border-black/10">
        <SuccessState
          title={`${values.type} request received`}
          action={
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => {
                setValues(initial);
                setReference(null);
              }}
            >
              Start another request
            </button>
          }
        >
          <p>
            Your reference number is{" "}
            <span className="font-semibold tracking-[0.04em] text-black">{reference}</span>.
          </p>
          <p>We&apos;ll be in touch to arrange a pickup. Nothing has been sent — this is a demo form.</p>
        </SuccessState>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Return or exchange request" className="grid gap-5 sm:grid-cols-2">
      <Field id="return-order" label="Order number" error={errors.order}>
        <input
          id="return-order"
          name="order"
          placeholder="#1001"
          className={inputClass}
          value={values.order}
          onChange={(e) => set("order")(e.target.value)}
          {...errorProps("return-order", errors.order)}
        />
      </Field>
      <Field id="return-email" label="Email" error={errors.email}>
        <input
          id="return-email"
          name="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          value={values.email}
          onChange={(e) => set("email")(e.target.value)}
          {...errorProps("return-email", errors.email)}
        />
      </Field>
      <Field id="return-items" label="Item(s) to return" error={errors.items} className="sm:col-span-2">
        <textarea
          id="return-items"
          name="items"
          rows={3}
          placeholder="Product name, size and colour"
          className={textareaClass}
          value={values.items}
          onChange={(e) => set("items")(e.target.value)}
          {...errorProps("return-items", errors.items)}
        />
      </Field>
      <Field id="return-reason" label="Reason" error={errors.reason}>
        <Select
          id="return-reason"
          value={values.reason}
          onChange={set("reason")}
          options={reasons}
          placeholder="Choose a reason"
          error={errors.reason}
        />
      </Field>
      <fieldset>
        <legend className={labelClass}>Return or exchange</legend>
        <div className="flex gap-3">
          {types.map((t) => (
            <label
              key={t}
              className={cn(
                "flex h-[48px] flex-1 cursor-pointer items-center gap-2.5 rounded-[4px] border px-[14px] font-ui text-[14px] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-black/30",
                values.type === t ? "border-black" : "border-black/20",
              )}
            >
              <input
                type="radio"
                name="type"
                value={t}
                checked={values.type === t}
                onChange={() => set("type")(t)}
                className="h-4 w-4 accent-black"
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>
      <Field id="return-comments" label="Comments" optional className="sm:col-span-2">
        <textarea
          id="return-comments"
          name="comments"
          rows={4}
          className={textareaClass}
          value={values.comments}
          onChange={(e) => set("comments")(e.target.value)}
        />
      </Field>
      <div className="sm:col-span-2">
        <button type="submit" className={primaryButtonClass}>
          Submit request
        </button>
      </div>
    </form>
  );
}
