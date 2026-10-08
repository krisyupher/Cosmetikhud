import { useEffect, useState } from 'react'

const KEY = 'cosmetikhud:cart'
const MAX_QTY = 99

// El pedido se guarda en el navegador para no perderlo al recargar.
function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(saved) ? saved.filter(i => typeof i?.sku === 'string' && i.qty > 0) : []
  } catch {
    return []
  }
}

// products: catálogo visible. Los SKU guardados que ya no están (ocultos o eliminados)
// no se muestran; se conservan en el navegador por si el producto vuelve a publicarse.
export function useCart(products) {
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

  const bySku = new Map(products.map(p => [p.sku, p]))
  const lines = items.filter(i => bySku.has(i.sku)).map(i => ({ product: bySku.get(i.sku), qty: i.qty }))
  // Solo cuenta lo que se puede pedir: los productos agotados quedan fuera del pedido.
  const count = lines.reduce((n, l) => n + (l.product.available ? l.qty : 0), 0)

  return { lines, count, add, setQty, remove }
}
