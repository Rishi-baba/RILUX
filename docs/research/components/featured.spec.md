# FeaturedSlider + FeaturedProductHero Specification

## Overview
- **Target files:** `src/components/FeaturedSlider.tsx` (client), `src/components/FeaturedProductHero.tsx` (client)
- **Interaction model:** FeaturedSlider = click/drag coverflow (center slide enlarged). FeaturedProductHero = click-driven slider (arrows + dots), no autoplay.

## FeaturedSlider (data: `signatureSlides`, 5; heading `headings.signature` rendered by page, not here)
- Section height ≈ 831px desktop, padding-bottom 40px, overflow hidden.
- Three visible slides in a row, centered: side slides 357×661, center slide 420×777, gap 24px. Side slides vertically centered relative to the center slide.
- Implementation: track of all slides; active index centered. Size/scale via `transform: scale(0.85)` on non-active slides (357/420 ≈ 0.85), `transition: transform .5s var(--ease-theme), opacity .5s`. Slides beyond ±1 are hidden (opacity 0, pointer-events none).
- Slide: `<a>`, relative, overflow hidden, `<Placeholder>`; label absolute bottom 20%, centered, `font-display` 44px / 400 / uppercase, white. Center slide shows a white circle button (40×40, radius 50%) with ChevronRight at top-right 16px. Side slides: clicking makes them active.
- Loops. Drag/swipe ≥50px moves one slide. Mobile (<768px): show only the active slide at 78vw wide, neighbors peeking 8vw.

## FeaturedProductHero (data: `featuredProducts`, 5)
- Section full-bleed, height 799px desktop (aspect 1265/759 for the bg). Mobile: min-height 640px.
- Slide bg: `<Placeholder tone={bgTone}>` fills slide. Track translateX with `transition: transform .6s var(--ease-theme)`.
- Info card: absolute right 64px top 0 (card hangs from the top edge on desktop, see reference), width 650px, padding 28px, radius 13px, bg `var(--sand)` rgb(237,233,225), shadow 0 4px 28px rgba(0,0,0,.1), flex row gap 15px align center.
  - Left column (flex 1):
    - Eyebrow: Archivo Narrow 14px / 500 / line-height 22.4px / ls 2.24px / uppercase, rgb(21,21,21).
    - Divider 40px × 1px rgb(21,21,21) at 30% opacity, margin 10px 0.
    - Title: `font-display` 32px / 400 / line-height 36.8px, rgb(21,21,21), 2 lines max.
    - Price: Montserrat 23px / 400 / line-height 36.8px, rgb(21,21,21), margin-top 10px.
    - CTA `<a>`: margin-top 14px, inline-flex gap 8px align center, padding 5px 12px, radius 6px, bg rgb(21,21,21), white Montserrat 13px / 500 / line-height 20.8px, ArrowRightIcon 14px. Hover opacity .8, `transition: opacity .2s`.
  - Right: thumbnail 187×228, radius 13px, overflow hidden, `<Placeholder tone={thumbTone}>`.
- Arrows: same style as hero (44×44 circle, bg rgba(255,255,255,.2), border .67px rgba(255,255,255,.5), white chevron) at left/right 24px, vertically centered. Hidden <768px.
- Dots: absolute bottom 24px centered, gap 3px; 40×2px white lines, inactive opacity .4.
- Mobile: card becomes static below the image area: left/right 16px, bottom 16px absolute, width auto, padding 18px, thumbnail 96×118, title 22px.
