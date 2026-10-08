import { useState } from 'react'
import { X } from 'lucide-react'
import Modal from './Modal'
import QtyStepper from './QtyStepper'
import { WhatsAppIcon } from './BrandIcons'
import { whatsappUrl } from '../data/site'
import { productInquiry } from '../lib/order'

function ProductDetail({ product, onAdd, onClose }) {
  const [qty, setQty] = useState(1)
  const { name, category, lab, presentation, description, sku, image, available } = product

  return (
    <div className="pd">
      <button type="button" className="icon-btn modal-close" onClick={onClose} aria-label="Cerrar">
        <X size={20} />
      </button>
      <div className="pd-media">
        <img src={image} alt={`${name}, ${presentation}`} width="640" height="640" />
        {!available && <span className="stock-badge">Agotado</span>}
      </div>
      <div className="pd-info">
        <p className="card-cat">{category}</p>
        <h2 id="pd-title" className="pd-title">{name}</h2>
        <span className="gold-rule" aria-hidden="true" />
        <p className="pd-desc">{description}</p>
        <dl className="specs">
          <div><dt>Laboratorio</dt><dd>{lab}</dd></div>
          <div><dt>Presentación</dt><dd>{presentation}</dd></div>
          <div><dt>Referencia</dt><dd>{sku}</dd></div>
        </dl>
        {available && (
          <div className="pd-qty">
            <span>Cantidad</span>
            <QtyStepper value={qty} onChange={v => setQty(Math.max(1, v))} label={name} />
          </div>
        )}
        <div className="pd-actions">
          <button type="button" className="btn btn-primary" disabled={!available}
            onClick={() => { onAdd(product, qty); onClose() }}>
            {available ? 'Agregar al pedido' : 'Agotado'}
          </button>
          <a className="btn btn-outline" href={whatsappUrl(productInquiry(product))} target="_blank" rel="noopener">
            <WhatsAppIcon size={18} /> Consultar
          </a>
        </div>
        <p className="note">
          {available
            ? 'Precio y disponibilidad se confirman con un asesor por WhatsApp.'
            : 'Agotado temporalmente: consulta disponibilidad por WhatsApp.'}
        </p>
      </div>
    </div>
  )
}

export default function ProductDialog({ product, onClose, onAdd }) {
  return (
    <Modal open={Boolean(product)} onClose={onClose} className="modal" labelledBy="pd-title">
      {product && <ProductDetail key={product.sku} product={product} onAdd={onAdd} onClose={onClose} />}
    </Modal>
  )
}
