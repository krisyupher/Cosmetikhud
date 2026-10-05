import { useEffect, useState } from 'react'
import { findProduct } from '../data/products'

const KEY = 'cosmetikhud:cart'
const MAX_QTY = 99

// El pedido se guarda en el navegador para no perderlo al recargar.
// Se descartan SKUs que ya no existan en el catálogo.
function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(saved) ? saved.filter(i => findProduct(i.sku) && i.qty > 0) : []
  } catch {
    return []
  }
}

export function useCart() {
  const [items, setItems] = useState(load)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* almacenamiento no disponible */ }
  }, [items])

  const setQty = (sku, qty) => setItems(list =>
    qty > 0
      ? list.map(i => (i.sku === sku ? { ...i, qty: Math.min(qty, MAX_QTY) } : i))
      : list.filter(i => i.sku !== sku))

  const add = (sku, qty = 1) => setItems(list =>
    list.some(i => i.sku === sku)
      ? list.map(i => (i.sku === sku ? { ...i, qty: Math.min(i.qty + qty, MAX_QTY) } : i))
      : [...list, { sku, qty: Math.min(qty, MAX_QTY) }])

  const remove = sku => setItems(list => list.filter(i => i.sku !== sku))

  const lines = items.map(i => ({ product: findProduct(i.sku), qty: i.qty }))
  const count = items.reduce((n, i) => n + i.qty, 0)

  return { lines, count, add, setQty, remove }
}
