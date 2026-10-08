"use client";

import { useState, type FormEvent } from "react";

import { Field, primaryButtonClass, secondaryButtonClass } from "@/components/account/form";
import type { MockUser } from "@/types/content";

interface Address {
  id: number;
  name: string;
  address: string;
  city: string;
  pin: string;
  phone: string;
}

type Draft = Omit<Address, "id">;
type Errors = Partial<Record<keyof Draft, string>>;

const blank: Draft = { name: "", address: "", city: "", pin: "", phone: "" };

function validate(d: Draft): Errors {
  const e: Errors = {};
  if (!d.name.trim()) e.name = "Enter a name.";
  if (!d.address.trim()) e.address = "Enter an address.";
  if (!d.city.trim()) e.city = "Enter a city.";
  if (!/^\d{6}$/.test(d.pin.trim())) e.pin = "Enter a 6-digit PIN code.";
  if (!/^\d{10}$/.test(d.phone.replace(/\D/g, ""))) e.phone = "Enter a 10-digit phone number.";
  return e;
}

const textButton = "font-ui text-[13px] text-black underline underline-offset-4 hover:text-brand";

// Addresses live in component state only (lost on reload) — a layout demo.
export function AddressesPanel({ user }: { user: MockUser }) {
  const [list, setList] = useState<Address[]>([]);
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(blank);
  const [errors, setErrors] = useState<Errors>({});
  const [nextId, setNextId] = useState(1);

  function openForm(target: number | "new") {
    const existing = typeof target === "number" ? list.find((a) => a.id === target) : undefined;
    setDraft(existing ? { ...existing } : blank);
    setErrors({});
    setEditing(target);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate(draft);
    setErrors(next);
    if (Object.keys(next).length) return;
    const clean: Draft = {
      name: draft.name.trim(),
      address: draft.address.trim(),
      city: draft.city.trim(),
      pin: draft.pin.trim(),
      phone: draft.phone.trim(),
    };
    if (editing === "new") {
      setList((l) => [...l, { id: nextId, ...clean }]);
      setNextId((n) => n + 1);
    } else if (typeof editing === "number") {
      setList((l) => l.map((a) => (a.id === editing ? { id: a.id, ...clean } : a)));
    }
    setEditing(null);
  }

  const set = (key: keyof Draft) => (e: { target: { value: string } }) =>
    setDraft((d) => ({ ...d, [key]: e.target.value }));

  const fullName = `${user.firstName} ${user.lastName}`.trim();

  return (
    <div>
      <div className="grid gap-[16px] sm:grid-cols-2">
        <div className="border border-black/10 p-[20px]">
          <p className="mb-[10px] font-ui text-[11px] uppercase tracking-[0.08em] text-stone">Default address</p>
          <p className="font-ui text-[14px] leading-[22px] text-black">
            {fullName || "Your name"}
            <br />
            Placeholder street address
            <br />
            City, State 000000
            <br />
            India
          </p>
        </div>
        {list.map((a) => (
          <div key={a.id} className="flex flex-col border border-black/10 p-[20px]">
            <p className="flex-1 font-ui text-[14px] leading-[22px] text-black">
              {a.name}
              <br />
              {a.address}
              <br />
              {a.city} {a.pin}
              <br />
              {a.phone}
            </p>
            <div className="mt-[14px] flex gap-[18px]">
              <button type="button" className={textButton} onClick={() => openForm(a.id)}>
                Edit
              </button>
              <button
                type="button"
                className={textButton}
                onClick={() => {
                  setList((l) => l.filter((x) => x.id !== a.id));
                  if (editing === a.id) setEditing(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing === null ? (
        <button type="button" className={`${secondaryButtonClass} mt-[24px]`} onClick={() => openForm("new")}>
          Add address
        </button>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-[28px] max-w-[520px] border-t border-black/10 pt-[24px]">
          <h3 className="mb-[18px] font-display text-[22px] uppercase text-black">
            {editing === "new" ? "Add address" : "Edit address"}
          </h3>
          <Field id="addr-name" label="Full name" autoComplete="name" value={draft.name} onChange={set("name")} error={errors.name} />
          <Field id="addr-line" label="Address" autoComplete="street-address" value={draft.address} onChange={set("address")} error={errors.address} />
          <div className="grid gap-x-[16px] sm:grid-cols-2">
            <Field id="addr-city" label="City" autoComplete="address-level2" value={draft.city} onChange={set("city")} error={errors.city} />
            <Field id="addr-pin" label="PIN code" inputMode="numeric" autoComplete="postal-code" value={draft.pin} onChange={set("pin")} error={errors.pin} />
          </div>
          <Field id="addr-phone" label="Phone" type="tel" autoComplete="tel" value={draft.phone} onChange={set("phone")} error={errors.phone} />
          <div className="flex flex-col gap-[12px] sm:flex-row">
            <button type="submit" className={`${primaryButtonClass} sm:w-auto sm:px-[32px]`}>
              Save address
            </button>
            <button type="button" className={`${secondaryButtonClass} h-[50px]`} onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
