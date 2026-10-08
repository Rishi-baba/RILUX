# CategoryGrid + TileSlider + StripTiles Specification

## Overview
- **Target files:** `src/components/CategoryGrid.tsx`, `src/components/TileSlider.tsx` (client), `src/components/StripTiles.tsx` (client)
- **Interaction model:** CategoryGrid static with hover; TileSlider and StripTiles are horizontal drag/scroll-snap rows (no arrows, no dots).

## CategoryGrid (data: `categoryTiles`, 6)
- Container max-width 1100px (3×362.67 + 2×6), centered, padding-bottom 24px.
- CSS grid 3 columns, gap 6px. Mobile (<768px): 2 columns, gap 4px, padding-inline 4px.
- Tile: `<a>`, relative, aspect 363/399, overflow hidden, `<Placeholder>` background.
  - Bottom gradient overlay: linear-gradient(to top, rgba(0,0,0,.45), transparent 50%).
  - Label: absolute left 20px bottom 18px, Montserrat 34px / 400 / line-height 42px, uppercase, white. Mobile 20px/26px, left 12px bottom 10px.
  - Hover: placeholder `transform: scale(1.04)`, `transition: transform .6s var(--ease-theme)`.

## TileSlider (data: `roundedTiles`, 4)
- Section padding 0 24px 36px. Horizontal flex row, `overflow-x: auto`, `scroll-snap-type: x mandatory`, `scrollbar-none`, gap 6px.
- Slide width 366px (desktop shows ≈3.3 tiles), aspect 366/415, radius 8px, overflow hidden, `scroll-snap-align: start`. Mobile width 75vw.
- Label centered both axes: `font-display` 38px / 400 / line-height 1.05, uppercase, white, text-shadow 0 1px 12px rgba(0,0,0,.25). Mobile 28px.
- Hover: same zoom as CategoryGrid.

## StripTiles (data: `stripTiles`, 3)
- Section padding-bottom 0. Horizontal flex row, scroll-snap, `scrollbar-none`, gap 6px, padding-inline 6px.
- Slide width 540px, aspect 540/202 (wide strip), no radius. Mobile 85vw.
- Label: centered, `font-display` 34px / 400 / line-height 1.05, uppercase, white, max 2 lines. Dark overlay rgba(0,0,0,.25) for legibility.
