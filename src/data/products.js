export const WHATSAPP = '573209949163'

export const CATEGORIES = [
  { name: 'Toxina Botulínica', color: '#0f5c6e' },
  { name: 'Ácido Hialurónico', color: '#7a4f8f' },
  { name: 'Bioestimulador', color: '#a1731f' },
]

// El costo es interno y no se publica en el sitio.
export const PRODUCTS = [
  { sku: 'TOX-NEU-100', category: 'Toxina Botulínica', name: 'Neuronox', brand: 'Medytox' },
  { sku: 'AH-ELA-G', category: 'Ácido Hialurónico', name: 'Elasty G Plus', brand: 'Dongbang' },
  { sku: 'TOX-BOT-100', category: 'Toxina Botulínica', name: 'Botox', brand: 'Allergan' },
  { sku: 'TOX-XEO-100', category: 'Toxina Botulínica', name: 'Xeomin', brand: 'Merz Pharma' },
  { sku: 'TOX-INN-100', category: 'Toxina Botulínica', name: 'Innotox', brand: 'Medytox' },
  { sku: 'TOX-DYS-100', category: 'Toxina Botulínica', name: 'Dysport', brand: 'Ipsen' },
  { sku: 'TOX-BLX-100', category: 'Toxina Botulínica', name: 'Botulax', brand: 'Hugel' },
  { sku: 'BIO-PROF-1', category: 'Bioestimulador', name: 'ProFhilo', brand: 'IBSA' },
].map(p => ({
  ...p,
  color: CATEGORIES.find(c => c.name === p.category).color,
  description: `${p.category} · ${p.brand}. Original importada. Consulte disponibilidad y precio con un asesor.`,
}))
