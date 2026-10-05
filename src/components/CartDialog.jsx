import { useEffect, useRef } from 'react'
import { WHATSAPP } from '../data/products'

export default function CartDialog({ open, onClose, items, onRemove }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  const text = encodeURIComponent('Hola, quisiera pedir:\n' + items.map(i => `- ${i}`).join('\n'))
  return (
    <dialog ref={ref} onClose={onClose}>
      <h3 style={{ marginTop: 0 }}>Su pedido</h3>
      {items.length
        ? items.map((it, i) => (
            <div className="li" key={i}>
              <span>{it}</span>
              <button onClick={() => onRemove(i)} aria-label="Quitar">✕</button>
            </div>))
        : <p className="empty">El carrito está vacío.</p>}
      <div className="row" style={{ marginTop: 16 }}>
        <button className="btn o" onClick={onClose}>Cerrar</button>
        <a className="btn w" href={`https://wa.me/${WHATSAPP}?text=${text}`} target="_blank" rel="noopener">Enviar por WhatsApp</a>
      </div>
    </dialog>
  )
}
