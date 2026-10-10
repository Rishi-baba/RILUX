"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle, MapPin } from "@phosphor-icons/react/ssr";
import { Banknote, RefreshCcw, Truck } from "@/components/icons";

const PIN_KEY = "rilux-pin";
const fmt = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

/** Adds business days (skips Sundays) to today */
function addBusinessDays(from: Date, days: number) {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) added++;
  }
  return d;
}

// Postal zone = first digit of an Indian PIN code. Front-end estimate only; swap for the courier's
// serviceability API when one is connected.
const zones: Record<string, string> = {
  "1": "Delhi, Haryana, Punjab, HP & J&K",
  "2": "Uttar Pradesh & Uttarakhand",
  "3": "Rajasthan & Gujarat",
  "4": "Maharashtra, MP, Chhattisgarh & Goa",
  "5": "Andhra Pradesh, Telangana & Karnataka",
  "6": "Tamil Nadu & Kerala",
  "7": "West Bengal, Odisha & the North East",
  "8": "Bihar & Jharkhand",
};
// Metro prefixes: Delhi, Mumbai, Pune, Ahmedabad, Hyderabad, Bengaluru, Chennai, Kolkata
const metros = ["11", "40", "41", "38", "50", "56", "60", "70"];
const remote = ["18", "19", "79", "74"]; // J&K/Ladakh, North East, Andaman

function estimate(pin: string) {
  const prefix = pin.slice(0, 2);
  const days = metros.includes(prefix) ? [2, 4] : remote.includes(prefix) ? [6, 9] : [3, 6];
  const today = new Date();
  return {
    region: zones[pin[0]],
    range: `${fmt(addBusinessDays(today, days[0]))} – ${fmt(addBusinessDays(today, days[1]))}`,
    fast: days[0] === 2,
  };
}

const valid = (pin: string) => /^[1-8]\d{5}$/.test(pin);

const badges = [
  { label: "Cash on Delivery", Icon: Banknote },
  { label: "Free Shipping", Icon: Truck },
  { label: "7-Day Exchange", Icon: RefreshCcw },
];

// PIN code check under the price: enter a PIN, get an estimated delivery window for that area.
// The last PIN is remembered in this browser.
export function DeliveryEstimate() {
  const [pin, setPin] = useState("");
  const [checked, setChecked] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PIN_KEY);
      if (saved && valid(saved)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- restore the visitor's saved PIN
        setPin(saved);
        setChecked(saved);
      }
    } catch {
      // storage blocked; start empty
    }
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!valid(pin)) {
      setError("Enter a valid 6-digit PIN code");
      setChecked(null);
      return;
    }
    setError("");
    setChecked(pin);
    try {
      window.localStorage.setItem(PIN_KEY, pin);
    } catch {
      // ignore
    }
  };

  const result = checked ? estimate(checked) : null;

  return (
    <div className="mb-[18px]">
      <form onSubmit={onSubmit} noValidate>
        <label htmlFor="pin-check" className="flex items-center gap-[6px] font-ui text-[13px] font-medium text-navy">
          <MapPin size={16} weight="light" aria-hidden />
          Check delivery date
        </label>
        <div className="mt-[8px] flex h-[44px] border border-navy/25 focus-within:border-navy">
          <input
            id="pin-check"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={6}
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
              if (error) setError("");
            }}
            placeholder="Enter PIN code"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "pin-error" : result ? "pin-result" : undefined}
            className="min-w-0 flex-1 bg-transparent px-[14px] font-ui text-[14px] tracking-[0.08em] text-ink outline-none placeholder:tracking-normal placeholder:text-stone"
          />
          <button
            type="submit"
            className="px-[18px] font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-navy transition-opacity hover:opacity-70"
          >
            Check
          </button>
        </div>
      </form>

      {error ? (
        <p id="pin-error" role="alert" className="mt-[6px] font-ui text-[12px] text-red-600">
          {error}
        </p>
      ) : null}

      {result ? (
        <div id="pin-result" aria-live="polite" className="mt-[10px] rounded-[4px] bg-[#faf7ef] px-[12px] py-[10px] font-ui text-[12.5px] text-ink">
          <p className="flex items-start gap-[8px]">
            <Truck className="mt-[1px] size-[16px] flex-none text-navy" aria-hidden />
            <span>
              Delivery to <strong className="font-semibold">{checked}</strong> by{" "}
              <strong className="font-semibold text-navy">{result.range}</strong>
              {result.region ? <span className="block text-[11.5px] text-stone">{result.region}</span> : null}
            </span>
          </p>
          <p className="mt-[6px] flex items-center gap-[8px] text-[#2f6b3a]">
            <CheckCircle size={16} weight="fill" className="flex-none" aria-hidden />
            Cash on delivery available · Free shipping
          </p>
        </div>
      ) : null}

      <ul className="mt-[12px] flex flex-wrap gap-[6px]">
        {badges.map(({ label, Icon }) => (
          <li
            key={label}
            className="inline-flex items-center gap-[5px] rounded-[4px] bg-mist px-[8px] py-[6px] font-ui text-[10.5px] uppercase tracking-[0.04em] text-ink-soft"
          >
            <Icon className="size-[14px]" aria-hidden />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
