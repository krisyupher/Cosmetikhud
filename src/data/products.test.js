import { CATEGORIES, PRODUCTS, WHATSAPP } from './products'

describe('catalog data', () => {
  it('has unique SKUs', () => {
    const skus = PRODUCTS.map(p => p.sku)
    expect(new Set(skus).size).toBe(skus.length)
  })

  it('assigns every product to a known category', () => {
    const names = CATEGORIES.map(c => c.name)
    PRODUCTS.forEach(p => expect(names).toContain(p.category))
  })

  it('never exposes price or cost fields', () => {
    PRODUCTS.forEach(p => {
      expect(Object.keys(p).join()).not.toMatch(/price|precio|cost|costo/i)
      expect(p.description).not.toMatch(/\$\s?\d/)
    })
  })

  it('uses the sales WhatsApp number', () => {
    expect(WHATSAPP).toBe('573209949163')
  })
})
