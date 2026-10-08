"use client";

import { FabricFeature } from "@/components/FabricFeature";
import { HeadingStack } from "@/components/HeadingStack";
import { useSamplePreview } from "@/hooks/useSamplePreview";
import { testimonials } from "@/lib/content";
import type { PlaceholderTone } from "@/components/Placeholder";

const tones: PlaceholderTone[] = ["stone", "warm", "cool", "olive"];

// Testimonials in the text-left / image-right slideshow. The image slot is for a customer photo.
// Sample testimonials only appear on local preview hosts (see useSamplePreview).
export function TestimonialSlider() {
  const preview = useSamplePreview();
  if (!preview) return null;

  const slides = testimonials.map((t, i) => ({
    title: `${t.name} · ${t.detail}`,
    body: `“${t.quote}”`,
    tone: tones[i % tones.length],
  }));

  return (
    <>
      <HeadingStack lines={["Worn", "& Trusted"]} className="pb-[11px] md:pt-[36px] md:pb-[24px]" />
      <FabricFeature slides={slides} />
    </>
  );
}
