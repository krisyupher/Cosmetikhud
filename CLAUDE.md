# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

CosmetikHud: Spanish-language B2B storefront for a Colombian importer of aesthetic-medicine products (botulinum toxins, hyaluronic acid, biostimulators), sold only to licensed professionals. React 18 + Vite, no router, no backend, Vitest tests, no linter.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/`
- `npm test` — Vitest + Testing Library (jsdom); single file: `npx vitest run src/App.test.jsx`, single test: `-t "name"`. `src/test/setup.js` polyfills <dialog> and scrollIntoView for jsdom and clears localStorage between tests
- `docker compose up --build -d` — the build stage runs `npm test` then `npm run build` (a failing test fails the image); the nginx stage serves on http://localhost:8080 (`PORT` overrides) with a healthcheck; stop with `docker compose down`

## Architecture

- Single-page app. `src/App.jsx` owns UI state (category filter, search query, selected product for the detail dialog, cart drawer open, toast) and passes it down; components in `src/components/` are presentational.
- Cart: `src/lib/useCart.js` keeps `[{ sku, qty }]` in localStorage (`cosmetikhud:cart`) and exposes `lines` resolved against the catalog; unknown SKUs are dropped on load.
- Ordering is WhatsApp-only: `CartDrawer` builds a `wa.me` link from `orderMessage()` in `src/lib/order.js`. There is no checkout or payment.
- Data: `src/data/products.js` is the catalog (lab, presentation and description come from the printed catalog PDF; images are imported from `src/assets/products/`). `src/data/site.js` holds contact info and `whatsappUrl()`.
- Dialogs use the native `<dialog>` through `components/Modal.jsx`.
- Styling is one global `src/styles.css` built on brand tokens (light theme only). The logo is inline SVG in `components/Logo.jsx`, extracted from `src/design/Logotipo/Editables/Logotipo.ai`. Icons come from `lucide-react`; social logos are Simple Icons paths in `components/BrandIcons.jsx`.
- `src/design/` holds the owner's brand sources (~1 GB: catalog PDF, logo, social posts). It is git-ignored and excluded from the Docker context, so it only exists on the owner's machine. Never import from it: the web images in `src/assets/` were cropped and converted to WebP from those files, and `src/project.test.js` fails if any source file references `design/`.
- `legacy/index.html` is the earlier single-file vanilla version, kept for reference only; it is excluded from the Docker image.

## Brand rules (from the owner's social-media design log)

- Montserrat only; navy `#0d2b52`, gold `#c8a97e`, neutrals white / cream `#e8ded2` / blue-gray `#d9dde3`, text `#111111`. Bright blue `#2563eb` is for paid ads only — never on the site.
- Minimalist: lots of negative space, one gold line as the accent. Section titles are uppercase two-tone (navy line + gold line) with the numbered-square motif from the printed catalog (`SectionHeading`).
- Gold text on light backgrounds uses the darker `--gold-ink` / `--gold-display` tokens for contrast; plain `--gold` is for lines, fills and text on navy.

## Business rules to preserve

- Prices and costs are intentionally never shown on the site (the source SKU list had internal "Costo" and the social posts show promo prices; the owner said not to display them). Cards say to consult price with an advisor.
- One SKU per product is shown (Neuronox and Botox have extra suffixed SKUs in the owner's list that were deliberately dropped).
- Opening hours are pending: set `SITE.hours` in `src/data/site.js` to show them.
- The footer disclaimer (no affiliation with brand owners, professionals-only sale) is required; keep it.
