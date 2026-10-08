# HeroCarousel Specification

## Overview
- **Target file:** `src/components/HeroCarousel.tsx` (client component)
- **Interaction model:** click-driven slider (arrows + dots) with drag/swipe. No autoplay (observed: active slide unchanged over 9s).

## DOM / Styles
- Section full-bleed, height 585px at 1265px width (aspect 1265/585 ≈ 2.16). Mobile: aspect 4/5.
- Track: flex row, slides 100% width, `transform: translateX(-index*100%)`, `transition: transform .6s var(--ease-theme)`.
- Each slide: relative, `<a href>` covering the slide, `<Placeholder tone=...>` as background (object-cover equivalent). Transparent overlay layer (no tint).
- Loop: wrap from last to first and first to last.
- Arrows (prev/next): absolute, vertically centered, 24px from edges. 44×44, radius 50%, bg rgba(255,255,255,0.2), border 0.67px solid rgba(255,255,255,0.5), white chevron 18px, `backdrop-filter: blur(4px)`. Hover: bg rgba(255,255,255,0.35), `transition: background .2s`. Hide below 768px.
- Pagination: absolute bottom 24px, full width, flex centered, padding 0 17px. Each dot is a line 40×2px, margin 0 3px, bg white. Inactive opacity 0.4, active opacity 1. `transition: background .2s, transform .2s, opacity .2s`. Buttons with aria-label "Go to slide N".

## Content
- `heroSlides` from `@/lib/content` (5 slides, each has tone + href).

## Behaviors
- Click arrow → index ±1 (looping). Click dot → index. Pointer drag/swipe ≥50px → next/prev.
- Keyboard: ArrowLeft/ArrowRight when the carousel has focus.
