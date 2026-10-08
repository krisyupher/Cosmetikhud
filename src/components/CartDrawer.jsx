import { useState } from 'react'
import { Info, ShoppingBag, Trash2, X } from 'lucide-react'
import Modal from './Modal'
import QtyStepper from './QtyStepper'
import { WhatsAppIcon } from './BrandIcons'
import { whatsappUrl } from '../data/site'
import { orderMessage } from '../lib/order'

export default function CartDrawer({ open, onClose, cart, onBrowse }) {
  const [contact, setContact] = useState({ name: '', city: '' })
  const { lines, count, setQty, remove } = cart
  // Los productos que se agotaron siguen en la lista, pero no se envían en el pedido.
  const orderLines = lines.filter(l => l.product.available)
  const field = key => ({ value: contact[key], onChange: e => setContact(c => ({ ...c, [key]: e.target.value })) })

  return (
    <Modal open={open} onClose={onClose} className="drawer" labelledBy="cart-title">
      <div className="drawer-panel">
        <header className="drawer-head">
          <div>
            <h2 id="cart-title">Tu pedido</h2>
            <p>{count} {count === 1 ? 'producto' : 'productos'}</p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Cerrar">
            <X size={20} />
          </button>
        </header>

        <div className="drawer-body">
          {lines.length ? (
            <>
              <ul className="cart-list">
                {lines.map(({ product, qty }) => (
                  <li key={product.sku} className={`cart-item${product.available ? '' : ' is-unavailable'}`}>
                    <img src={product.image} alt="" width="64" height="64" />
                    <div>
                      <p className="ci-name">{product.name}</p>
                      <p className="ci-sku">{product.presentation} · {product.sku}</p>
                      {product.available
                        ? <QtyStepper value={qty} onChange={v => setQty(product.sku, v)} label={product.name} />
                        : <p className="ci-stock">Agotado: no se incluye en el pedido</p>}
                    </div>
                    <button type="button" className="icon-btn" onClick={() => remove(product.sku)}
                      aria-label={`Quitar ${product.name}`}>
                      <Trash2 size={18} strokeWidth={1.6} />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-form">
                <p className="cart-form-title">Datos para el asesor <span>(opcional)</span></p>
                <label>
                  Nombre o clínica
                  <input type="text" autoComplete="organization" {...field('name')} />
                </label>
                <label>
                  Ciudad
                  <input type="text" autoComplete="address-level2" {...field('city')} />
                </label>
              </div>
            </>
          ) : (
            <div className="cart-empty">
              <span className="cart-empty-icon"><ShoppingBag size={28} strokeWidth={1.4} aria-hidden="true" /></span>
              <p className="cart-empty-title">Tu pedido está vacío</p>
              <p>Explora el catálogo y agrega los productos que necesitas.</p>
              <button type="button" className="btn btn-outline btn-sm" onClick={onBrowse}>Ver catálogo</button>
            </div>
          )}
        </div>

        <footer className="drawer-foot">
          <p className="note">
            <Info size={16} strokeWidth={1.6} aria-hidden="true" />
            Un asesor confirmará disponibilidad, precio y entrega por WhatsApp.
          </p>
          {orderLines.length ? (
            <a className="btn btn-primary btn-block" href={whatsappUrl(orderMessage(orderLines, contact))}
              target="_blank" rel="noopener">
              <WhatsAppIcon size={18} /> Enviar pedido por WhatsApp
            </a>
          ) : (
            <button type="button" className="btn btn-primary btn-block" disabled>
              <WhatsAppIcon size={18} /> Enviar pedido por WhatsApp
            </button>
          )}
        </footer>
      </div>
    </Modal>
  )
}
