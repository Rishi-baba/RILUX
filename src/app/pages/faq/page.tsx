import type { Metadata } from "next";
import Link from "next/link";
import { FaqBrowser, type FaqCategory } from "@/components/info/FaqBrowser";
import { primaryButtonClass } from "@/components/info/fields";
import { PageHero } from "@/components/info/PageHero";
import { routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers about orders, shipping, exchanges, fabrics and payments at RILUX.",
};

const categories: FaqCategory[] = [
  {
    name: "Orders",
    items: [
      { q: "How do I place an order?", a: "Choose your shirt, pick a size and shade, add it to your cart and complete checkout. You'll receive a confirmation as soon as it's placed." },
      { q: "Can I change or cancel my order?", a: "Message us on WhatsApp or email as soon as possible. If your order hasn't been dispatched yet, we'll update or cancel it for you." },
      { q: "How do I track my order?", a: "Use the Track Order page with your order number, or check the updates we send once your parcel is on its way." },
      { q: "Do I need an account to order?", a: "No. You can check out as a guest, though an account lets you see past orders and saved addresses." },
    ],
  },
  {
    name: "Shipping",
    items: [
      { q: "Do you ship across India?", a: "Yes, we deliver to most PIN codes across India, and shipping is free on every order." },
      { q: "When will my order arrive?", a: "Orders are usually dispatched within 2 business days. The estimated delivery date is shown on each product page." },
      { q: "Do you offer cash on delivery?", a: "Yes, cash on delivery is available on most PIN codes." },
    ],
  },
  {
    name: "Returns",
    items: [
      { q: "What is your exchange policy?", a: "You can exchange a shirt for another size or style within 7 days of delivery, as long as it's unworn and has its tags." },
      { q: "How do I request an exchange?", a: "Fill in the Request a Return form with your order number and we'll arrange a pickup." },
      { q: "When will I get my refund?", a: "Refunds are processed once the returned shirt reaches us and passes a quick check." },
    ],
  },
  {
    name: "Products",
    items: [
      { q: "What is Giza cotton?", a: "Giza cotton is an extra-long-staple Egyptian cotton. Its long fibres make a fabric that is softer, stronger and more lustrous than regular cotton." },
      { q: "How do I find my size?", a: "Open the size guide on any product page for garment measurements and tips on how to measure." },
      { q: "How should I care for my shirt?", a: "Machine wash cold on a gentle cycle, avoid bleach and iron on medium heat. Care details are listed on every product page." },
      { q: "What is the difference between formal, regular and casual fits?", a: "Formal shirts have a cleaner, sharper line for the office; regular shirts are versatile everyday fits; casual shirts are relaxed for off-duty days." },
    ],
  },
  {
    name: "Payments",
    items: [
      { q: "Which payment methods do you accept?", a: "We accept UPI, cards, net banking and cash on delivery." },
      { q: "Is it safe to pay online?", a: "Online payments are handled by a secure payment provider; we never see or store your card details." },
      { q: "Are prices inclusive of taxes?", a: "Yes, all prices shown include applicable taxes." },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero title="FAQs" subtitle="Answers to the questions we hear most often." />
      <FaqBrowser categories={categories} />
      <section className="mx-auto max-w-[860px] px-4 pb-[72px]">
        <div className="flex flex-col items-center gap-4 rounded-[6px] bg-linen px-6 py-10 text-center">
          <h2 className="font-display text-[28px] leading-[1.1] uppercase text-black">Still need help?</h2>
          <p className="font-ui text-[14px] text-ink-soft">Our team is a message away on WhatsApp or email.</p>
          <Link href={routes.contact} className={primaryButtonClass}>
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
