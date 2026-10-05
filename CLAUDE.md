# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

CosmetikHud: Spanish-language B2B storefront for a Colombian importer of aesthetic-medicine products (botulinum toxins, hyaluronic acid, biostimulators), sold only to licensed professionals. React 18 + Vite, no router, no backend, no tests or linter configured.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/` (this is the only verification available; there is no test suite)
- `docker compose up --build -d` — builds (Node build stage, nginx serve stage) and serves on http://localhost:8080; stop with `docker compose down`

## Architecture

- Single-page app. `src/App.jsx` owns all state (category filter, search query, cart array of strings, cart dialog open, toast) and passes it down; components in `src/components/` are presentational.
- `src/data/products.js` is the whole catalog and also exports `WHATSAPP` (number used for every CTA). Product colors and descriptions are derived there from the category. Edit this file to change products.
- Ordering is WhatsApp-only: the cart (`CartDialog`) builds a `wa.me` link with the cart items as pre-filled text. There is no checkout or payment.
- Styling is one global `src/styles.css` (CSS variables with a dark-mode `prefers-color-scheme` override); no CSS framework.
- `legacy/index.html` is the earlier single-file vanilla version, kept for reference only; it is excluded from the Docker image.

## Business rules to preserve

- Prices and costs are intentionally never shown on the site (the source SKU list had internal "Costo"; the owner said not to display it). Cards say to consult price with an advisor.
- One SKU per product is shown (Neuronox and Botox have extra suffixed SKUs in the owner's list that were deliberately dropped).
- Product images are a generic SVG vial placeholder in `ProductCard.jsx`; real photos are pending.
- Address and hours in `Footer.jsx` are still "por completar" placeholders.
- The footer disclaimer (no affiliation with brand owners, professionals-only sale) is required; keep it.
