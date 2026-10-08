"use client";

import { SelectField, TextField } from "@/components/checkout/fields";
import type { ShippingAddress } from "@/components/checkout/pricing";

export const countries = ["India"] as const;

export const indianStates = [
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
] as const;

export const emptyAddress: ShippingAddress = {
  country: "India",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  pin: "",
  phone: "",
};

export type AddressErrors = Partial<Record<keyof ShippingAddress, string>>;

export function validateAddress(a: ShippingAddress): AddressErrors {
  const e: AddressErrors = {};
  if (!a.country) e.country = "Select a country";
  if (!a.firstName.trim()) e.firstName = "Enter a first name";
  if (!a.lastName.trim()) e.lastName = "Enter a last name";
  if (!a.address.trim()) e.address = "Enter an address";
  if (!a.city.trim()) e.city = "Enter a city";
  if (!a.state) e.state = "Select a state";
  if (!a.pin.trim()) e.pin = "Enter a PIN code";
  else if (!/^[1-9]\d{5}$/.test(a.pin.trim())) e.pin = "Enter a valid 6-digit PIN code";
  if (!a.phone.trim()) e.phone = "Enter a phone number";
  else if (!/^[6-9]\d{9}$/.test(a.phone.replace(/\s+/g, ""))) e.phone = "Enter a valid 10-digit mobile number";
  return e;
}

const digits = (v: string, max: number) => v.replace(/\D/g, "").slice(0, max);

/** Country / name / address / city / state / PIN / phone grid. */
export function AddressFields({
  idPrefix,
  value,
  errors,
  onChange,
}: {
  idPrefix: string;
  value: ShippingAddress;
  errors: AddressErrors;
  onChange: (next: ShippingAddress) => void;
}) {
  const set = <K extends keyof ShippingAddress>(key: K) => (v: ShippingAddress[K]) => onChange({ ...value, [key]: v });

  return (
    <div className="grid grid-cols-2 gap-3">
      <SelectField
        id={`${idPrefix}-country`}
        label="Country / Region"
        value={value.country}
        onChange={set("country")}
        options={countries}
        error={errors.country}
        autoComplete="country-name"
        className="col-span-2"
      />
      <TextField
        id={`${idPrefix}-first-name`}
        label="First name"
        value={value.firstName}
        onChange={set("firstName")}
        error={errors.firstName}
        autoComplete="given-name"
        className="col-span-2 sm:col-span-1"
      />
      <TextField
        id={`${idPrefix}-last-name`}
        label="Last name"
        value={value.lastName}
        onChange={set("lastName")}
        error={errors.lastName}
        autoComplete="family-name"
        className="col-span-2 sm:col-span-1"
      />
      <TextField
        id={`${idPrefix}-address`}
        label="Address"
        value={value.address}
        onChange={set("address")}
        error={errors.address}
        autoComplete="address-line1"
        className="col-span-2"
      />
      <TextField
        id={`${idPrefix}-apartment`}
        label="Apartment, suite, etc. (optional)"
        value={value.apartment}
        onChange={set("apartment")}
        autoComplete="address-line2"
        className="col-span-2"
      />
      <TextField
        id={`${idPrefix}-city`}
        label="City"
        value={value.city}
        onChange={set("city")}
        error={errors.city}
        autoComplete="address-level2"
        className="col-span-2 sm:col-span-1"
      />
      <SelectField
        id={`${idPrefix}-state`}
        label="State"
        value={value.state}
        onChange={set("state")}
        options={indianStates}
        placeholder="Select a state"
        error={errors.state}
        autoComplete="address-level1"
        className="col-span-2 sm:col-span-1"
      />
      <TextField
        id={`${idPrefix}-pin`}
        label="PIN code"
        value={value.pin}
        onChange={(v) => set("pin")(digits(v, 6))}
        error={errors.pin}
        inputMode="numeric"
        autoComplete="postal-code"
        maxLength={6}
        className="col-span-2 sm:col-span-1"
      />
      <TextField
        id={`${idPrefix}-phone`}
        label="Phone"
        type="tel"
        value={value.phone}
        onChange={(v) => set("phone")(digits(v, 10))}
        error={errors.phone}
        inputMode="tel"
        autoComplete="tel-national"
        maxLength={10}
        className="col-span-2 sm:col-span-1"
      />
    </div>
  );
}

export function formatAddress(a: ShippingAddress): string[] {
  return [
    `${a.firstName} ${a.lastName}`.trim(),
    [a.address, a.apartment].filter(Boolean).join(", "),
    `${a.city}, ${a.state} ${a.pin}`.trim(),
    a.country,
    a.phone ? `+91 ${a.phone}` : "",
  ].filter(Boolean);
}
