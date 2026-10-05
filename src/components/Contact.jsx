import { Clock, Mail, MapPin } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './BrandIcons'
import { SITE, whatsappUrl } from '../data/site'
import { useReveal } from '../lib/reveal'

const CARDS = [
  { icon: <WhatsAppIcon size={20} />, label: 'WhatsApp', value: SITE.phoneDisplay, hint: 'Pedidos y asesoría', href: whatsappUrl() },
  { icon: <Mail size={20} strokeWidth={1.6} />, label: 'Correo', value: SITE.email, hint: 'Cotizaciones y facturación', href: `mailto:${SITE.email}` },
  { icon: <InstagramIcon size={20} />, label: 'Instagram', value: `@${SITE.instagram}`, hint: 'Novedades y lanzamientos', href: `https://www.instagram.com/${SITE.instagram}/` },
  { icon: <FacebookIcon size={20} />, label: 'Facebook', value: SITE.facebook, hint: 'Comunidad CosmetikHud', href: `https://www.facebook.com/${SITE.facebook}` },
]

export default function Contact() {
  const revealActions = useReveal()
  const revealCards = useReveal()
  return (
    <section className="section" id="contacto">
      <div className="container contact-layout">
        <div className="contact-intro">
          <SectionHeading index="06" label="Contacto" title="Estamos para" accent="impulsar tu práctica">
            Escríbenos para hacer tu pedido o recibir asesoría sobre nuestros productos.
          </SectionHeading>
          <div ref={revealActions} data-stagger="">
            <ul className="contact-facts">
              <li><MapPin size={18} strokeWidth={1.6} aria-hidden="true" /> {SITE.city} · Envíos a todo el país</li>
              {SITE.hours && <li><Clock size={18} strokeWidth={1.6} aria-hidden="true" /> {SITE.hours}</li>}
            </ul>
            <a className="btn btn-primary" href={whatsappUrl('Hola CosmetikHud, quisiera recibir asesoría.')}
              target="_blank" rel="noopener">
              <WhatsAppIcon size={18} /> Escribir por WhatsApp
            </a>
          </div>
        </div>
        <ul className="contact-grid" ref={revealCards} data-stagger="">
          {CARDS.map(({ icon, label, value, hint, href }) => (
            <li key={label}>
              <a className="contact-card" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener">
                <span className="cc-icon" aria-hidden="true">{icon}</span>
                <span className="cc-label">{label}</span>
                <span className="cc-value">{value}</span>
                <span className="cc-hint">{hint}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
