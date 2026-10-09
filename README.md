# RILUX

Storefront for RILUX — premium men's shirts in Giza cotton.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and TypeScript.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Where things live

- `src/lib/content.ts` — catalogue (shirts, collections, prices), menu, home page copy, contact details
- `src/app/` — pages (home, collections, products, cart, checkout, account, info and policy pages)
- `src/components/` — page sections and UI

## Before launch

- Replace placeholder images with product photography
- Set real contact details (`contact` in `src/lib/content.ts`)
- Replace policy page text with reviewed legal copy
- Set `showSampleReviews = false` and add genuine reviews/testimonials
- Checkout is a front-end demo: connect a payment provider and order backend
