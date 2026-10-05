import { PackageCheck, ShieldCheck, Tag, UserRound } from 'lucide-react'
import { WhatsAppIcon } from './BrandIcons'
import { findProduct } from '../data/products'
import { whatsappUrl } from '../data/site'
import { productInquiry } from '../lib/order'
import { useReveal } from '../lib/reveal'
import featured from '../assets/images/featured-neuronox.webp'

// Basado en la pieza de pauta "Post Para Pauta Neuronox" (src/design/Post/Mayo), sin precios.
const product = findProduct('TOX-NEU-100')

const POINTS = [
  [Tag, 'Precio especial', 'por volumen'],
  [PackageCheck, 'Disponibilidad', 'inmediata'],
  [UserRound, 'Atención', 'personalizada'],
  [ShieldCheck, 'Distribución', 'especializada'],
]

export default function Featured({ onView }) {
  const revealCopy = useReveal()
  const revealMedia = useReveal()
  const inquiry = `${productInquiry(product)} ¿Me comparten los precios especiales por volumen?`
  return (
    <section className="featured" aria-labelledby="featured-title">
      <div className="container featured-grid">
        <div className="featured-copy" ref={revealCopy} data-stagger="">
          <p className="eyebrow">Producto destacado</p>
          <h2 id="featured-title" className="featured-title">
            Neuronox<sup>®</sup> <span className="accent">100U</span>
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p className="featured-lead">
            Toxina botulínica <strong>tipo A</strong> para uso profesional. Distribución especializada
            para medicina estética.
          </p>
          <ul className="featured-points">
            {POINTS.map(([Icon, title, text]) => (
              <li key={title}>
                <span className="fp-icon"><Icon size={18} strokeWidth={1.6} aria-hidden="true" /></span>
                <span><strong>{title}</strong>{text}</span>
              </li>
            ))}
          </ul>
          <div className="featured-ctas">
            <a className="btn btn-primary" href={whatsappUrl(inquiry)} target="_blank" rel="noopener">
              <WhatsAppIcon size={18} /> Conoce los precios especiales
            </a>
            <button type="button" className="btn btn-outline" onClick={() => onView(product)}>Ver detalle</button>
          </div>
        </div>
        <div className="featured-media" ref={revealMedia} data-reveal="media">
          <img src={featured} alt="Neuronox de 100 unidades sobre un pedestal de mármol" width="610" height="710"
            loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  )
}
