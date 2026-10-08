# FabricFeature + AppDownload + Footer Specification

## Overview
- **Target files:** `src/components/FabricFeature.tsx` (client), `src/components/AppDownload.tsx`, `src/components/Footer.tsx`
- **Interaction model:** FabricFeature = horizontal slider driven by dots + swipe (one slide visible). AppDownload and Footer static with link hover.

## FabricFeature (data: `fabricSlides`, 8; heading rendered by page)
- Section height ≈ 386px desktop, max-width 1100px centered, padding 0 24px.
- Each slide: 2-column flex, gap 16px, align center. Left column (text) 50%, centered text, padding 0 40px. Right: image box 500×300 (aspect 5/3), radius 8px, overflow hidden, `<Placeholder>`.
  - Title: Montserrat 22px / 700 / line-height 35.2px / ls 2.2px / uppercase, rgb(21,21,21).
  - Divider: 40px × 1px rgb(21,21,21) 40% opacity, centered, margin 18px auto.
  - Body: Montserrat 19.5px / 400 / line-height 29.25px, rgb(21,21,21), max 4 lines.
- Track translateX, `transition: transform .5s var(--ease-theme)`; swipe ≥50px.
- Dots: centered row below, margin-top 24px, gap 10px; 6×6 circles, rgb(21,21,21) opacity .25, active opacity 1.
- Mobile: stack image on top, text below; body 16px / 24px.

## AppDownload
- Full-width band, bg `var(--linen)` rgb(238,236,233), height 181px, flex col center, gap 18px.
- Row: PhoneIcon 16px + label "Get the app" Montserrat 14px / 600 / ls 1.4px / uppercase, rgb(21,21,21).
- Two store-style buttons side by side, gap 12px: 176×56 (scale to 150×48 mobile), black bg, radius 8px, white text two-line (Montserrat 9px "Get it on" / 18px 600 "App Store A" and "App Store B"). Use generic labels only — no third-party store logos.

## Footer
- bg `var(--mist)` rgb(245,245,245). Padding 48px 35px 32px.
- Logo block: `brandName` in `font-display` 52px, uppercase, color var(--brand), margin-bottom 40px (stands in for a 257×53 logo).
- Columns row: flex gap 80px (mobile: grid 2 cols gap 32px). Per `footerColumns`:
  - Heading: `font-display` 16px / 400, capitalize, black, margin-bottom 16px.
  - Links: flex col gap 12px, Montserrat 14px / 400 / line-height 21px, capitalize, black. Hover: underline, `text-underline-offset: 3px`.
- Social row margin-top 40px, gap 16px: two 18px icon placeholders (lucide `Globe`, `AtSign` — generic, no brand logos).
- Copyright margin-top 32px: Montserrat 13px / line-height 20.8px, black: "© 2026 BRAND. All rights reserved." built from `brandName`.
