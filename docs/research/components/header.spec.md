# AnnouncementBar + Header Specification

## Overview
- **Target files:** `src/components/AnnouncementBar.tsx`, `src/components/Header.tsx`
- **Interaction model:** static bar + sticky header (CSS `position: sticky`, no JS scroll listener)

## AnnouncementBar
- Height 45px, bg `var(--brand)` rgb(1,40,25), flex center, gap 12px. Scrolls away (not sticky).
- Message: Montserrat (`font-ui`) 12px / 400 / normal line-height, white.
- CTA link: 12px / 600 / letter-spacing 0.6px / uppercase, white, padding 4px 14px, border-bottom 0.67px solid white, no radius.
- Content: `announcement.message`, `announcement.cta` from `@/lib/content`.

## Header
- Wrapper: `position: sticky; top: 0; z-index: 50`. Bar height 66px, solid white bg, full width.
- Inner row: padding 0 63px (desktop), CSS grid `grid-template-columns: 1fr auto`, align-items center.
- Left cluster (flex, align center): logo text then nav.
  - Logo: `brandName` from content, font-display (Cormorant) 30px, letter-spacing 0.02em, uppercase, color rgb(17,17,17). Width ≈ 120px. Margin-right 32px.
  - Nav links (`navItems`): Archivo Narrow 16px / 400 / line-height 25.6px, color rgb(17,17,17), gap 24px between items. Items with `hasDropdown` show `ChevronDownIcon` 12px, stroke 1.5, 3px left margin.
  - Badge (item.badge): inline after label, margin-left 6px, Archivo Narrow 8px / 600 / ls 0.24px / line-height 11.2px / uppercase, white on `var(--brand)`, padding 2px 5px, radius 4px.
- Right cluster (flex, justify end, gap 20px): HeartIcon, UserIcon, SearchIcon, BagIcon — each 20px, stroke 1.5, color rgb(17,17,17). Bag has count bubble: absolute top -6px right -8px, 16×16, radius 50%, bg rgb(17,17,17), white Montserrat 9px/600, text "0".

## States & Behaviors
- Sticky: header sticks at top:0 once the announcement bar scrolls off. No style change on scroll (source keeps solid white; verified at scroll 0 and 800).
- Nav link hover: opacity 1 → 0.6, `transition: opacity .25s var(--ease-theme)`. Icon buttons same.
- Dropdowns: not built (out of scope); chevrons are decorative.

## Responsive
- Desktop ≥1024px: as above.
- <1024px: hide nav; show a menu (hamburger, lucide `Menu` 22px) on the left, logo centered, icons right (hide Heart and User below 768px). Inner padding 0 16px. Height stays 66px (56px under 768px).
