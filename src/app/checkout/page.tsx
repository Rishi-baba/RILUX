"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, Info, ShoppingBag } from "lucide-react";
import {
  AddressFields,
  emptyAddress,
  formatAddress,
  validateAddress,
  type AddressErrors,
} from "@/components/checkout/AddressFields";
import { RadioCard, TextField } from "@/components/checkout/fields";
import { OrderSummary, type Totals } from "@/components/checkout/OrderSummary";
import {
  COUPON_KEY,
  EXPRESS_FEE,
  LAST_ORDER_KEY,
  couponPercent,
  discountFor,
  paymentLabels,
  shippingFor,
  shippingLabels,
  standardFee,
  type LastOrder,
  type PaymentMethod,
  type ShippingAddress,
  type ShippingMethod,
} from "@/components/checkout/pricing";
import { useSessionValue, writeSession } from "@/components/checkout/useSessionValue";
import { formatPrice, routes } from "@/lib/content";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;
const stepNames = ["Information", "Shipping", "Payment"] as const;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const primaryButton =
  "flex w-full items-center justify-center rounded-[5px] bg-brand font-ui text-[14px] font-medium uppercase tracking-[0.1em] text-white transition-opacity duration-200 ease-theme hover:opacity-90";

function StepIndicator({ step }: { step: Step }) {
  return (
    <nav aria-label="Checkout steps">
      <ol className="flex flex-wrap items-center gap-1.5 font-ui text-[12px]">
        {stepNames.map((name, i) => (
          <li key={name} className="flex items-center gap-1.5">
            <span
              aria-current={step === i + 1 ? "step" : undefined}
              className={step === i + 1 ? "font-bold text-black" : step > i + 1 ? "text-black" : "text-stone"}
            >
              {name}
            </span>
            {i < stepNames.length - 1 ? (
              <span aria-hidden className="text-stone">
                ›
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function SummaryRow({ label, children, onChange }: { label: string; children: ReactNode; onChange: () => void }) {
  return (
    <div className="flex items-start gap-4 px-4 py-3.5 font-ui text-[13px] [&+&]:border-t [&+&]:border-black/10">
      <span className="w-[72px] flex-none text-stone">{label}</span>
      <span className="min-w-0 flex-1 break-words text-black">{children}</span>
      <button type="button" onClick={onChange} className="flex-none text-[12px] underline underline-offset-2 hover:text-stone">
        Change
      </button>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-4 font-ui text-[18px] font-semibold text-black">{children}</h2>;
}

function CheckoutSkeleton() {
  return (
    <div className="mx-auto max-w-[600px] space-y-4 px-6 py-10" aria-hidden>
      <div className="h-4 w-40 animate-pulse bg-mist" />
      <div className="h-[48px] animate-pulse bg-mist" />
      <div className="h-[48px] animate-pulse bg-mist" />
      <div className="h-[200px] animate-pulse bg-mist" />
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, hydrated, user, placeOrder } = useStore();
  const [coupon] = useSessionValue(COUPON_KEY);
  const placingRef = useRef(false);

  const [step, setStep] = useState<Step>(1);
  const [summaryOpen, setSummaryOpen] = useState(false);

  // null = untouched, so the signed-in user's email can prefill once the store hydrates.
  const [emailInput, setEmailInput] = useState<string | null>(null);
  const email = emailInput ?? user?.email ?? "";
  const [newsOptIn, setNewsOptIn] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>();

  const [address, setAddress] = useState<ShippingAddress>(emptyAddress);
  const [addressErrors, setAddressErrors] = useState<AddressErrors>({});

  const [method, setMethod] = useState<ShippingMethod>("standard");
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [billingSame, setBillingSame] = useState(true);
  const [billing, setBilling] = useState<ShippingAddress>(emptyAddress);
  const [billingErrors, setBillingErrors] = useState<AddressErrors>({});

  useEffect(() => {
    if (hydrated && cart.length === 0 && !placingRef.current) router.replace(routes.cart);
  }, [hydrated, cart.length, router]);

  const discountPercent = couponPercent(coupon);
  const discount = discountFor(cartSubtotal, coupon);
  const shipping = step >= 2 ? shippingFor(cartSubtotal, method) : null;
  const totals: Totals = {
    subtotal: cartSubtotal,
    discount,
    discountPercent,
    shipping,
    total: Math.max(0, cartSubtotal - discount) + (shipping ?? 0),
  };

  const focusFirstError = () => {
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    });
  };

  const submitInformation = (e: FormEvent) => {
    e.preventDefault();
    const nextEmailError = !email.trim()
      ? "Enter an email"
      : emailPattern.test(email.trim())
        ? undefined
        : "Enter a valid email address";
    const nextAddressErrors = validateAddress(address);
    setEmailError(nextEmailError);
    setAddressErrors(nextAddressErrors);
    if (nextEmailError || Object.keys(nextAddressErrors).length > 0) {
      focusFirstError();
      return;
    }
    setStep(2);
  };

  const submitShipping = (e: FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const submitPayment = (e: FormEvent) => {
    e.preventDefault();
    if (!billingSame) {
      const errs = validateAddress(billing);
      setBillingErrors(errs);
      if (Object.keys(errs).length > 0) {
        focusFirstError();
        return;
      }
    }
    const lines = cart;
    const finalShipping = shippingFor(cartSubtotal, method);
    const finalTotal = Math.max(0, cartSubtotal - discount) + finalShipping;
    placingRef.current = true;
    const order = placeOrder(finalTotal);
    if (!order) {
      placingRef.current = false;
      return;
    }
    const snapshot: LastOrder = {
      id: order.id,
      createdAt: order.createdAt,
      email: email.trim(),
      address,
      method,
      payment,
      lines,
      subtotal: cartSubtotal,
      discount,
      coupon: discountPercent ? (coupon ?? "").toUpperCase() : null,
      shipping: finalShipping,
      total: finalTotal,
    };
    writeSession(LAST_ORDER_KEY, JSON.stringify(snapshot));
    writeSession(COUPON_KEY, null);
    router.push(routes.checkoutSuccess);
  };

  if (!hydrated || cart.length === 0) return <CheckoutSkeleton />;

  const freeStandard = standardFee(cartSubtotal) === 0;

  return (
    <div className="lg:grid lg:min-h-[calc(100vh-90px)] lg:grid-cols-[1fr_420px]">
      {/* Mobile: collapsible order summary */}
      <div className="border-b border-black/10 bg-mist lg:hidden">
        <button
          type="button"
          onClick={() => setSummaryOpen((o) => !o)}
          aria-expanded={summaryOpen}
          aria-controls="mobile-order-summary"
          className="flex w-full items-center justify-between gap-3 px-6 py-4 font-ui text-[14px]"
        >
          <span className="flex items-center gap-2 text-black">
            <ShoppingBag size={18} strokeWidth={1.5} aria-hidden />
            {summaryOpen ? "Hide order summary" : "Show order summary"}
            <ChevronDown
              size={16}
              aria-hidden
              className={cn("transition-transform duration-200 ease-theme", summaryOpen && "rotate-180")}
            />
          </span>
          <span className="font-semibold text-black">{formatPrice(totals.total)}</span>
        </button>
        {summaryOpen ? (
          <div id="mobile-order-summary" className="border-t border-black/10 px-6 py-6">
            <OrderSummary lines={cart} totals={totals} />
          </div>
        ) : null}
      </div>

      {/* Left: form */}
      <div className="flex justify-center lg:justify-end">
        <div className="w-full max-w-[600px] flex-1 px-6 pb-12 pt-8 lg:pl-10 lg:pr-12 lg:pt-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href={routes.cart}
              className="inline-flex items-center gap-1.5 font-ui text-[13px] text-black underline-offset-4 hover:underline"
            >
              <ArrowLeft size={14} aria-hidden />
              Back to cart
            </Link>
            <StepIndicator step={step} />
          </div>

          {step > 1 ? (
            <div className="mt-8 rounded-[5px] border border-black/20">
              <SummaryRow label="Contact" onChange={() => setStep(1)}>
                {email}
              </SummaryRow>
              <SummaryRow label="Ship to" onChange={() => setStep(1)}>
                {formatAddress(address).slice(0, 4).join(", ")}
              </SummaryRow>
              {step > 2 ? (
                <SummaryRow label="Method" onChange={() => setStep(2)}>
                  {shippingLabels[method]} ·{" "}
                  {shippingFor(cartSubtotal, method) === 0 ? "Free" : formatPrice(shippingFor(cartSubtotal, method))}
                </SummaryRow>
              ) : null}
            </div>
          ) : null}

          {step === 1 ? (
            <form onSubmit={submitInformation} noValidate className="mt-8">
              <section aria-labelledby="contact-heading">
                <div className="mb-4 flex items-baseline justify-between gap-3">
                  <h2 id="contact-heading" className="font-ui text-[18px] font-semibold text-black">
                    Contact
                  </h2>
                  {!user ? (
                    <Link href={routes.login} className="font-ui text-[12px] underline underline-offset-2">
                      Log in
                    </Link>
                  ) : null}
                </div>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(v) => {
                    setEmailInput(v);
                    if (emailError) setEmailError(undefined);
                  }}
                  error={emailError}
                />
                <label className="mt-3 flex cursor-pointer items-center gap-2.5 font-ui text-[13px] text-black">
                  <input
                    type="checkbox"
                    checked={newsOptIn}
                    onChange={(e) => setNewsOptIn(e.target.checked)}
                    className="size-[16px] accent-black"
                  />
                  Email me with news and offers
                </label>
              </section>

              <section aria-labelledby="address-heading" className="mt-8">
                <h2 id="address-heading" className="mb-4 font-ui text-[18px] font-semibold text-black">
                  Shipping address
                </h2>
                <AddressFields
                  idPrefix="ship"
                  value={address}
                  errors={addressErrors}
                  onChange={(next) => {
                    setAddress(next);
                    if (Object.keys(addressErrors).length) setAddressErrors(validateAddressPartial(next, addressErrors));
                  }}
                />
              </section>

              <button type="submit" className={cn(primaryButton, "mt-8 h-[54px]")}>
                Continue to shipping
              </button>
            </form>
          ) : null}

          {step === 2 ? (
            <form onSubmit={submitShipping} className="mt-8">
              <fieldset>
                <legend className="contents">
                  <SectionTitle>Shipping method</SectionTitle>
                </legend>
                <div>
                  <RadioCard
                    name="shipping-method"
                    value="standard"
                    checked={method === "standard"}
                    onChange={(v) => setMethod(v as ShippingMethod)}
                    label={shippingLabels.standard}
                    hint={freeStandard ? "Free on this order" : "Free on orders above ₹1,999"}
                    aside={freeStandard ? "Free" : formatPrice(standardFee(cartSubtotal))}
                  />
                  <RadioCard
                    name="shipping-method"
                    value="express"
                    checked={method === "express"}
                    onChange={(v) => setMethod(v as ShippingMethod)}
                    label={shippingLabels.express}
                    hint="Priority dispatch"
                    aside={formatPrice(EXPRESS_FEE)}
                  />
                </div>
              </fieldset>
              <button type="submit" className={cn(primaryButton, "mt-8 h-[54px]")}>
                Continue to payment
              </button>
            </form>
          ) : null}

          {step === 3 ? (
            <form onSubmit={submitPayment} noValidate className="mt-8">
              <fieldset>
                <legend className="contents">
                  <SectionTitle>Payment</SectionTitle>
                </legend>
                <div>
                  <RadioCard
                    name="payment-method"
                    value="cod"
                    checked={payment === "cod"}
                    onChange={(v) => setPayment(v as PaymentMethod)}
                    label={paymentLabels.cod}
                  />
                  <RadioCard
                    name="payment-method"
                    value="online"
                    checked={payment === "online"}
                    onChange={(v) => setPayment(v as PaymentMethod)}
                    label={paymentLabels.online}
                  />
                </div>
              </fieldset>
              <p className="mt-3 flex items-start gap-2 rounded-[5px] bg-mist px-4 py-3 font-ui text-[12px] text-ink-soft">
                <Info size={14} aria-hidden className="mt-px flex-none" />
                Demo store — no payment is taken.
              </p>

              <section aria-labelledby="billing-heading" className="mt-8">
                <h2 id="billing-heading" className="mb-3 font-ui text-[18px] font-semibold text-black">
                  Billing address
                </h2>
                <label className="flex cursor-pointer items-center gap-2.5 font-ui text-[13px] text-black">
                  <input
                    type="checkbox"
                    checked={billingSame}
                    onChange={(e) => setBillingSame(e.target.checked)}
                    className="size-[16px] accent-black"
                  />
                  Same as shipping address
                </label>
                {!billingSame ? (
                  <div className="mt-4">
                    <AddressFields
                      idPrefix="bill"
                      value={billing}
                      errors={billingErrors}
                      onChange={(next) => {
                        setBilling(next);
                        if (Object.keys(billingErrors).length) setBillingErrors(validateAddressPartial(next, billingErrors));
                      }}
                    />
                  </div>
                ) : null}
              </section>

              <button type="submit" className={cn(primaryButton, "mt-8 h-[54px]")}>
                Place order
              </button>
            </form>
          ) : null}

          <nav aria-label="Policies" className="mt-12 border-t border-black/10 pt-5">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 font-ui text-[12px]">
              <li>
                <Link href={routes.refund} className="underline underline-offset-2 hover:text-stone">
                  Refund policy
                </Link>
              </li>
              <li>
                <Link href={routes.shipping} className="underline underline-offset-2 hover:text-stone">
                  Shipping policy
                </Link>
              </li>
              <li>
                <Link href={routes.privacy} className="underline underline-offset-2 hover:text-stone">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href={routes.terms} className="underline underline-offset-2 hover:text-stone">
                  Terms of service
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop: order summary column */}
      <aside aria-label="Order summary" className="hidden border-l border-black/10 bg-mist lg:block">
        <div className="sticky top-[90px] px-10 py-12">
          <OrderSummary lines={cart} totals={totals} />
        </div>
      </aside>
    </div>
  );
}

/** Once errors are showing, re-validate on edit but only keep errors for fields that already had one. */
function validateAddressPartial(next: ShippingAddress, current: AddressErrors): AddressErrors {
  const fresh = validateAddress(next);
  const result: AddressErrors = {};
  (Object.keys(current) as (keyof ShippingAddress)[]).forEach((k) => {
    if (fresh[k]) result[k] = fresh[k];
  });
  return result;
}
