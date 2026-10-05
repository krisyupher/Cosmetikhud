import { Banknote, ShieldCheck, Truck } from 'lucide-react'
import { WhatsAppIcon } from './BrandIcons'
import { whatsappUrl } from '../data/site'
import hero from '../assets/images/hero.webp'

const TRUST = [
  [ShieldCheck, '100% originales', 'Productos certificados'],
  [Banknote, 'Pago contra entrega', 'En todo el país'],
  [Truck, 'Envíos de 1 a 3 días', 'Inmediato en Bogotá'],
]

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <svg className="hero-plus" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M36 2h28v34h34v28H64v34H36V64H2V36h34z" />
      </svg>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Distribución especializada</p>
          <h1>
            Importación directa
            <span className="accent">para profesionales de la estética</span>
          </h1>
          <span className="gold-rule" aria-hidden="true" />
          <p className="hero-lead">
            Toxina botulínica, ácido hialurónico y bioestimuladores de laboratorios líderes,
            con trazabilidad garantizada y atención personalizada.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#productos">Ver catálogo</a>
            <a className="btn btn-outline" href={whatsappUrl('Hola CosmetikHud, quisiera hablar con un asesor.')}
              target="_blank" rel="noopener">
              <WhatsAppIcon size={18} /> Hablar con un asesor
            </a>
          </div>
          <ul className="hero-trust">
            {TRUST.map(([Icon, title, text]) => (
              <li key={title}>
                <Icon size={26} strokeWidth={1.4} aria-hidden="true" />
                <span><strong>{title}</strong>{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-media">
          <img src={hero} alt="Viales CosmetikHud sobre un pedestal de mármol" width="804" height="972"
            fetchpriority="high" />
        </div>
      </div>
    </section>
  )
}
