# ProductCard + ProductScroller Specification

## Overview
- **Target files:** `src/components/ProductCard.tsx`, `src/components/ProductScroller.tsx` (client)
- **Interaction model:** horizontal click/drag scroller with arrow buttons; card hover swaps image.

## ProductScroller
- Section padding-top 40px, bottom 40px. Heading centered: `font-display` 34px / 400 / line-height 42px, uppercase, black, margin-bottom 20px. Text: `headings.newArrivals`.
- Track: horizontal `overflow-x: auto`, `scroll-snap-type: x mandatory`, utility `scrollbar-none`, `scroll-behavior: smooth`. Gap 6px. Padding-inline 0 (cards run edge to edge; at 1265px viewport ≈ 4.15 cards visible).
- Card width: 304px desktop (≈24% of viewport), 70vw mobile. `scroll-snap-align: start`.
- Arrows: 40×40 white circles, shadow 0 2px 10px rgba(0,0,0,.15), centered vertically on the image area, 16px from edges, ChevronLeft/Right 18px black. Scroll by one card width + gap. Hidden below 768px. Disabled (opacity 0) at scroll ends.
- Items: `products` from `@/lib/content` (12).

## ProductCard (props: `product: Product`, optional `variant?: "default"`)
- Image box: width 100%, aspect 304/380 (4:5), relative, overflow hidden.
  - Primary `<Placeholder tone={product.tone}>` and secondary `<Placeholder tone={product.altTone}>` stacked. Secondary opacity 0; on card hover primary → opacity 0 and secondary → 1. `transition: opacity .2s var(--ease-theme)`.
  - Tag (if `product.tag`): absolute top 10px left 10px, Montserrat 14px / 400, capitalize, white text on `var(--brand)`, padding 3px 8px.
  - Wishlist: HeartIcon 18px, absolute top 10px right 10px, black stroke, button with aria-label.
- Info block padding 10px 8px 16px:
  - Title: `font-display` 14px / 400, capitalize, black, 1 line clamp, margin-bottom 2px.
  - Category: Montserrat 12px / 400 / line-height 18px, capitalize, rgb(154,154,154).
  - Price: Montserrat 14px / 400 / line-height 21px / letter-spacing 0.3px, black, margin-top 4px.
  - Optional `colorCount`: "+N colours" Montserrat 14px, color rgb(1,41,28), margin-top 2px.
