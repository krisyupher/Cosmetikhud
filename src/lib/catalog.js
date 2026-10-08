import { useEffect, useState } from 'react'
import { CATEGORY_NAMES } from '../data/categories'

// El catálogo vive en public/data/products.json y se lee en cada visita, así que
// editarlo no requiere volver a compilar el sitio.
export const CATALOG_URL = '/data/products.json'
const REQUIRED = ['sku', 'category', 'name', 'lab', 'presentation', 'description', 'image']

// Descarta entradas incompletas, repetidas o de categorías desconocidas, y completa
// los valores por defecto: visible y available son true salvo que digan false.
export function normalizeCatalog(data) {
  if (!Array.isArray(data)) throw new Error('products.json debe ser una lista de productos')
  const seen = new Set()
  return data.flatMap((item, i) => {
    const missing = REQUIRED.filter(key => typeof item?.[key] !== 'string' || !item[key].trim())
    const problem = missing.length ? `faltan ${missing.join(', ')}`
      : seen.has(item.sku) ? `SKU repetido ${item.sku}`
      : !CATEGORY_NAMES.includes(item.category) ? `categoría desconocida "${item.category}"`
      : null
    if (problem) {
      console.warn(`products.json, producto ${i + 1} ignorado: ${problem}`)
      return []
    }
    seen.add(item.sku)
    return [{
      sku: item.sku,
      category: item.category,
      name: item.name,
      lab: item.lab,
      presentation: item.presentation,
      description: item.description,
      image: `/products/${item.image}`,
      visible: item.visible !== false,
      available: item.available !== false,
    }]
  })
}

// status: 'loading' | 'ready' | 'error'. Solo devuelve los productos visibles.
export function useCatalog() {
  const [state, setState] = useState({ status: 'loading', products: [] })
  useEffect(() => {
    let active = true
    fetch(CATALOG_URL, { cache: 'no-cache' })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => active && setState({ status: 'ready', products: normalizeCatalog(data).filter(p => p.visible) }))
      .catch(error => {
        console.error('No se pudo cargar el catálogo', error)
        if (active) setState({ status: 'error', products: [] })
      })
    return () => { active = false }
  }, [])
  return state
}
