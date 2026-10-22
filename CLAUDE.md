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
- Cart: `useCart(products)` (`src/lib/useCart.js`) keeps `[{ sku, qty }]` in localStorage (`cosmetikhud:cart`) and resolves `lines` against the loaded catalog; SKUs not in it are skipped (but kept in storage). Sold-out lines stay listed, are excluded from `count` and from the WhatsApp message.
- Ordering is WhatsApp-only: `CartDrawer` builds a `wa.me` link from `orderMessage()` in `src/lib/order.js`. There is no checkout or payment.
- Data: the product list is `public/data/products.json`, fetched at runtime by `useCatalog()` (`src/lib/catalog.js`) so the owner can edit it without a rebuild; `normalizeCatalog()` drops invalid entries, defaults `visible`/`available` to true and maps `image` to `/products/<file>` (photos live in `public/products/`). `App` passes the visible products down as props; there is no static product list in code. Categories are in `src/data/categories.js`; `src/data/site.js` holds contact info and `whatsappUrl()`. Tests serve the real JSON via a stubbed `fetch` (`src/test/catalog.js`, `mockCatalog()`), so App tests must wait for cards (`renderApp()`).
- Dialogs use the native `<dialog>` through `components/Modal.jsx`.
- Motion is CSS-only except scroll reveal: `useReveal()` (`src/lib/reveal.js`) is a ref callback that sets `data-revealed` when the element enters the viewport (one shared IntersectionObserver; immediate without IO or with reduced motion). Mark elements with `data-reveal` (animates itself, `="media"` for a scale-in) or `data-stagger` (animates its children in order; `--i` comes from `:nth-child` rules in `styles.css`). Reveal uses the individual `translate`/`scale`/`opacity` properties so it never fights the `transform` hover states, and elements that have their own `transition` (`.btn`, `.card`, `.cat-card`) must list `opacity`/`translate` with `var(--delay)` too. Use an attribute, not a class, for revealed state: React rewrites `className`.
- The sticky header keeps a fixed layout height (`--header-h-compact`); its background (`::before`) and contents shrink with `transform` on scroll, so nothing below moves. Timing/easing tokens (`--ease-*`, `--dur-*`, `--stagger`) are in `:root`; the reduced-motion block at the end of `styles.css` must stay last.
- Styling is one global `src/styles.css` built on brand tokens (light theme only). The logo is inline SVG in `components/Logo.jsx`, extracted from `src/design/Logotipo/Editables/Logotipo.ai`. Icons come from `lucide-react`; social logos are Simple Icons paths in `components/BrandIcons.jsx`.
- `src/design/` holds the owner's brand sources (~1 GB: catalog PDF, logo, social posts). It is git-ignored and excluded from the Docker context, so it only exists on the owner's machine. Never import from it: the web images in `src/assets/` were cropped and converted to WebP from those files, and `src/project.test.js` fails if any source file references `design/`.
- Product images are square 640×640 WebP on a white background (cards crop them with `object-fit: cover`). Section numbers in `SectionHeading` (`01`–`06`) are hard-coded per component and follow page order in `App.jsx`; renumber when adding or moving a section.
- `legacy/index.html` is the earlier single-file vanilla version, kept for reference only; it is excluded from the Docker image.

## Brand rules (from the owner's social-media design log)

- Montserrat only; navy `#0d2b52`, gold `#c8a97e`, neutrals white / cream `#e8ded2` / blue-gray `#d9dde3`, text `#111111`. Bright blue `#2563eb` is for paid ads only — never on the site.
- Minimalist: lots of negative space, one gold line as the accent. Section titles are uppercase two-tone (navy line + gold line) with the numbered-square motif from the printed catalog (`SectionHeading`).
- Gold text on light backgrounds uses the darker `--gold-ink` / `--gold-display` tokens for contrast; plain `--gold` is for lines, fills and text on navy.

## Business rules to preserve

- Prices and costs are intentionally never shown on the site (the source SKU list had internal "Costo" and the social posts show promo prices; the owner said not to display them). Cards say to consult price with an advisor.
- One SKU per product is shown (Neuronox and Botox have extra suffixed SKUs in the owner's list that were deliberately dropped).
- Cash on delivery (pago contra entrega) and free first delivery are Bogotá only; the rest of the country ships in 1–3 business days with shipping cost quoted by an advisor. Never claim nationwide cash on delivery.
- Opening hours are pending: set `SITE.hours` in `src/data/site.js` to show them.
- The footer disclaimer (no affiliation with brand owners, professionals-only sale) is required; keep it.
- `products.json` must never contain prices (the printed catalog has them); `src/project.test.js` checks it. In Docker, `public/data` and `public/products` are bind-mounted and `/data/` is served with `Cache-Control: no-cache`.
