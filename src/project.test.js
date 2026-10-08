import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { extname, join } from 'node:path'
import { CATEGORY_NAMES } from './data/categories'

const ROOT = process.cwd() // Vitest se ejecuta desde la raíz del proyecto
const SRC = join(ROOT, 'src')

// Código fuente de la app, sin las fuentes de diseño (src/design no se versiona).
function sourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return entry.name === 'design' && dir === SRC ? [] : sourceFiles(path)
    return ['.js', '.jsx', '.css'].includes(extname(entry.name)) ? [path] : []
  })
}

describe('project setup', () => {
  it('never imports from src/design, which is not in git', () => {
    const offenders = [...sourceFiles(SRC), join(ROOT, 'index.html'), join(ROOT, 'vite.config.js')]
      .filter(file => /(?:from\s+|import\s*\(\s*|url\(\s*)['"]?[^'")]*design\//.test(readFileSync(file, 'utf8')))
    expect(offenders).toEqual([])
  })

  describe('public/data/products.json', () => {
    const products = JSON.parse(readFileSync(join(ROOT, 'public/data/products.json'), 'utf8'))
    const required = ['sku', 'category', 'name', 'lab', 'presentation', 'description', 'image']

    it('has every required field on every product', () => {
      products.forEach(p => required.forEach(key => expect(p[key], `${p.sku}.${key}`).toBeTruthy()))
    })

    it('uses unique SKUs and known categories', () => {
      const skus = products.map(p => p.sku)
      expect(new Set(skus).size).toBe(skus.length)
      products.forEach(p => expect(CATEGORY_NAMES, p.sku).toContain(p.category))
    })

    it('points every image to a file in public/products', () => {
      products.forEach(p => expect(existsSync(join(ROOT, 'public/products', p.image)), p.image).toBe(true))
    })

    it('never contains prices or costs', () => {
      const text = JSON.stringify(products)
      expect(text).not.toMatch(/"(price|precio|cost|costo|valor)[a-z]*"\s*:/i)
      expect(text).not.toMatch(/\$\s?\d/)
    })

    it('only uses true/false for visible and available', () => {
      products.forEach(p => ['visible', 'available'].forEach(key => {
        if (key in p) expect(typeof p[key], `${p.sku}.${key}`).toBe('boolean')
      }))
    })
  })

  it('ships the favicon and touch icon referenced by index.html', () => {
    const html = readFileSync(join(ROOT, 'index.html'), 'utf8')
    for (const icon of ['favicon.svg', 'apple-touch-icon.png']) {
      expect(html).toContain(`/${icon}`)
      expect(existsSync(join(ROOT, 'public', icon)), icon).toBe(true)
    }
  })
})
