import { CATEGORIES, PRODUCTS, findProduct } from './products'
import { SITE, whatsappUrl } from './site'

describe('catalog data', () => {
  it('has unique SKUs', () => {
    const skus = PRODUCTS.map(p => p.sku)
    expect(new Set(skus).size).toBe(skus.length)
  })

  it('assigns every product to a known category', () => {
    const names = CATEGORIES.map(c => c.name)
    PRODUCTS.forEach(p => expect(names).toContain(p.category))
  })

  it('documents lab, presentation, description and image for every product', () => {
    PRODUCTS.forEach(p => {
      ['lab', 'presentation', 'description', 'image'].forEach(key => expect(p[key], `${p.sku}.${key}`).toBeTruthy())
    })
  })

  it('never exposes price or cost fields', () => {
    PRODUCTS.forEach(p => {
      expect(Object.keys(p).join()).not.toMatch(/price|precio|cost|costo/i)
      expect(p.description).not.toMatch(/\$\s?\d/)
    })
  })

  it('finds products by SKU', () => {
    expect(findProduct('TOX-BOT-100').name).toBe('Botox')
    expect(findProduct('NO-EXISTE')).toBeUndefined()
  })
})

describe('site data', () => {
  it('uses the sales WhatsApp number', () => {
    expect(SITE.whatsapp).toBe('573209949163')
    expect(whatsappUrl()).toBe('https://wa.me/573209949163')
    expect(whatsappUrl('Hola mundo')).toBe('https://wa.me/573209949163?text=Hola%20mundo')
  })
})
