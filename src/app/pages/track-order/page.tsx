import type { Metadata } from "next";
import { PageHero } from "@/components/info/PageHero";
import { TrackOrderForm } from "@/components/info/TrackOrderForm";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "Track your RILUX order.",
};

export default function TrackOrderPage() {
  return (
    <>
      <PageHero
        title="Track Your Order"
        subtitle="Enter your order number and the email or phone used at checkout."
      />
      <TrackOrderForm />
    </>
  );
}
