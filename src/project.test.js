import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { extname, join } from 'node:path'
import { PRODUCTS } from './data/products'

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

  it('bundles every product image from src/assets/products', () => {
    PRODUCTS.forEach(p => {
      expect(p.image, p.sku).toMatch(/^\/src\/assets\/products\/[\w-]+\.webp$/)
      expect(existsSync(join(ROOT, p.image)), p.image).toBe(true)
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
