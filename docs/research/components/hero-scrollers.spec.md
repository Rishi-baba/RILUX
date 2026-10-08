# HeroProductScroller + HeroCollectionScroller Specification

## Overview
- **Target files:** `src/components/HeroProductScroller.tsx` (client), `src/components/HeroCollectionScroller.tsx` (client)
- **Interaction model:** static background panel with a horizontally scrollable card row overlapping its lower part (scroll-snap, drag). No arrows.

## HeroProductScroller (data: `products.slice(0,6)`, `headings.bestsellers`)
- Section relative, full-bleed, height 724px desktop (min-height 620px mobile). `<Placeholder tone="warm">` fills it.
- Headline: absolute right 64px top 22%, single line. `overline` part Montserrat 30px / 500 / uppercase / ls 0.04em, white 85% opacity; `strong` part Montserrat 56px / 700 / uppercase, white, margin-left 16px. Mobile: left 16px, top 40px, sizes 18px / 34px, stacked.
- Card row: absolute left 0 right 0 bottom 24px, flex, gap 10px, padding 0 16px, overflow-x auto, scroll-snap, `scrollbar-none`.
  - Card: width 205px, flex none, white bg, `scroll-snap-align: start`.
    - Image: aspect 188/235, `<Placeholder tone={altTone}>`, optional tag top-left (Montserrat 14px white on `var(--brand)`, padding 3px 8px), HeartIcon 16px top-right white.
    - Info padding 8px 8px 16px: title `font-display` 14px capitalize black 2-line clamp; price Montserrat 13px black.
- Trailing CTA tile after last card: width 205px, flex col center, white text "View all" Montserrat 20px / 600 / line-height 32px / ls 1.6px / uppercase, with ArrowRightIcon 20px below.

## HeroCollectionScroller (data: `occasionTiles`, `headings.occasion`)
- Section relative, full-bleed, height 529px desktop (min-height 520px mobile). `<Placeholder tone="sand">` background.
- Heading: absolute top 32px centered, `font-display` 44px / 400 / uppercase, white.
- Tile row: absolute bottom 0, flex gap 8px, padding 0 24px 24px, overflow-x auto, scroll-snap, `scrollbar-none`.
  - Tile: width 185px, aspect 185/247, relative, overflow hidden, `<Placeholder>` + overlay rgba(0,0,0,.25). Label centered, `font-display` 24px / 400 / line-height 1.05, uppercase, white, 2 lines max. Hover overlay → rgba(0,0,0,.4), `transition: background .3s`.
  - At ≥1265px all 6 tiles fit in one row; below that it scrolls.
