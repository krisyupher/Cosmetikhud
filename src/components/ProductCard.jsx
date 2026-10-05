import { useEffect, useRef, useState } from 'react'
import { Check, Plus } from 'lucide-react'
import { useReveal } from '../lib/reveal'

// column escalona la aparición de las tarjetas de una misma fila.
export default function ProductCard({ product, column = 0, onAdd, onView }) {
  const { name, category, lab, presentation, image } = product
  const reveal = useReveal()
  const [added, setAdded] = useState(false)
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])

  const add = () => {
    onAdd(product)
    setAdded(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 1600)
  }

  return (
    <article className="card" ref={reveal} data-reveal="" style={{ '--col': column }}>
      <button type="button" className="card-media" onClick={() => onView(product)} aria-label={`Ver detalle de ${name}`}>
        <img src={image} alt="" width="640" height="640" loading="lazy" decoding="async" />
      </button>
      <div className="card-body">
        <p className="card-cat">{category}</p>
        <h3 className="card-title">{name}</h3>
        <span className="gold-rule" aria-hidden="true" />
        <dl className="specs">
          <div><dt>Laboratorio</dt><dd>{lab}</dd></div>
          <div><dt>Presentación</dt><dd>{presentation}</dd></div>
        </dl>
        <div className="card-actions">
          <button type="button" className="btn btn-outline btn-sm" onClick={() => onView(product)}>Ver detalle</button>
          <button type="button" className={`btn btn-primary btn-sm btn-add${added ? ' is-added' : ''}`} onClick={add}
            aria-label={`Agregar ${name} al pedido`}>
            <span className="add-label">
              <span className="add-default">
                <span className="add-text">
                  <Plus className="add-icon" size={14} strokeWidth={2.2} aria-hidden="true" />
                  Agregar
                </span>
              </span>
              <span className="add-done" aria-hidden="true"><Check size={14} strokeWidth={2.4} /> Agregado</span>
            </span>
          </button>
        </div>
      </div>
    </article>
  )
}
