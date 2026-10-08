import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { vi } from 'vitest'
import { normalizeCatalog } from '../lib/catalog'

// The site fetches public/data/products.json at runtime; tests serve the real file
// (setup.js) or a custom list with mockCatalog().
export const CATALOG = JSON.parse(readFileSync(join(process.cwd(), 'public/data/products.json'), 'utf8'))
export const PRODUCTS = normalizeCatalog(CATALOG)
export const findProduct = sku => PRODUCTS.find(p => p.sku === sku)

export function mockCatalog(data, { ok = true } = {}) {
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok, status: ok ? 200 : 500, json: async () => data })))
}
