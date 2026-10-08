# Behaviors

- **Smooth scroll library:** none (no Lenis/Locomotive). Native scrolling.
- **Header:** sticky wrapper (top 0, z 50) holding a 66px white bar. No style change between scroll 0 and 800.
- **Theme easing:** cubic-bezier(0.104, 0.204, 0.492, 1), 0.25s for links, 0.2s for image fades.
- **Hero carousel:** 5 slides, arrows (44px glass circles), 40×2px line dots. No autoplay observed over 9s.
- **Product cards:** primary image fades to a secondary on hover (opacity 0.2s). Wishlist heart top-right, tag top-left.
- **Featured slider:** 3-up coverflow; centre slide 420×777, sides 357×661 (scale ≈0.85).
- **Featured product hero:** 5-slide slider with floating sand-coloured info card (radius 13px, shadow 0 4px 28px rgba(0,0,0,.1)).
- **Fabric feature:** 8 slides, small round dots.
- **Scroll rows (tiles, occasion, bestsellers):** native horizontal scroll with snap, no arrows.

## Known gaps
- Tablet/mobile could not be measured: the browser window would not resize below 1280px in this session. Mobile layouts in the specs are reasoned defaults, not measured values.
- Hover states on dropdown menus were not captured (dropdowns out of scope).
