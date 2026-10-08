import { normalizeCatalog } from './catalog'

const base = {
  sku: 'TOX-BOT-100', category: 'Toxina Botulínica', name: 'Botox', lab: 'Allergan, Irlanda',
  presentation: '100 unidades', description: 'Toxina botulínica tipo A.', image: 'botox.webp',
}

describe('normalizeCatalog', () => {
  beforeEach(() => vi.spyOn(console, 'warn').mockImplementation(() => {}))

  it('defaults visible and available to true and resolves the image path', () => {
    expect(normalizeCatalog([base])).toEqual([{ ...base, image: '/products/botox.webp', visible: true, available: true }])
  })

  it('keeps explicit false values', () => {
    const [p] = normalizeCatalog([{ ...base, visible: false, available: false }])
    expect(p).toMatchObject({ visible: false, available: false })
  })

  it('drops incomplete, duplicated and unknown-category entries', () => {
    const result = normalizeCatalog([
      base,
      { ...base, sku: 'TOX-BOT-100' },
      { ...base, sku: 'X-1', name: '' },
      { ...base, sku: 'X-2', category: 'Cremas' },
      { ...base, sku: 'X-3', lab: undefined },
    ])
    expect(result.map(p => p.sku)).toEqual(['TOX-BOT-100'])
    expect(console.warn).toHaveBeenCalledTimes(4)
  })

  it('ignores extra fields such as prices', () => {
    const [p] = normalizeCatalog([{ ...base, price: 400000, costo: 215000 }])
    expect(Object.keys(p)).not.toContain('price')
    expect(Object.keys(p)).not.toContain('costo')
  })

  it('rejects a file that is not a list', () => {
    expect(() => normalizeCatalog({ products: [] })).toThrow()
  })
})
