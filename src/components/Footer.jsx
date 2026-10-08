import Logo from './Logo'
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './BrandIcons'
import { CATEGORIES } from '../data/categories'
import { SITE, whatsappUrl } from '../data/site'

const NAV = [
  ['#inicio', 'Inicio'],
  ['#nosotros', 'Nosotros'],
  ['#categorias', 'Categorías'],
  ['#productos', 'Productos'],
  ['#como-pedir', 'Cómo pedir'],
  ['#instagram', 'Instagram'],
  ['#contacto', 'Contacto'],
]

export default function Footer({ onPickCategory }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo inverse />
            <p>{SITE.tagline}.</p>
            <div className="social">
              <a href={whatsappUrl()} target="_blank" rel="noopener" aria-label="WhatsApp"><WhatsAppIcon size={18} /></a>
              <a href={`https://www.instagram.com/${SITE.instagram}/`} target="_blank" rel="noopener" aria-label="Instagram"><InstagramIcon size={18} /></a>
              <a href={`https://www.facebook.com/${SITE.facebook}`} target="_blank" rel="noopener" aria-label="Facebook"><FacebookIcon size={18} /></a>
            </div>
          </div>
          <nav className="footer-col" aria-label="Secciones">
            <h3>Navegación</h3>
            <ul>{NAV.map(([href, label]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
          </nav>
          <div className="footer-col">
            <h3>Categorías</h3>
            <ul>
              {CATEGORIES.map(c => (
                <li key={c.name}><button type="button" onClick={() => onPickCategory(c.name)}>{c.name}</button></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h3>Contacto</h3>
            <ul>
              <li><a href={whatsappUrl()} target="_blank" rel="noopener">{SITE.phoneDisplay}</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li>{SITE.city}</li>
              {SITE.hours && <li>{SITE.hours}</li>}
            </ul>
          </div>
        </div>

        <p className="legal">
          CosmetikHud es un distribuidor independiente y no tiene afiliación, patrocinio ni representación
          de los propietarios de las marcas mencionadas; todos los nombres y marcas pertenecen a sus
          respectivos titulares. Los productos se venden exclusivamente a profesionales de la salud con
          licencia o registro vigente, para uso profesional.
        </p>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} CosmetikHud. Todos los derechos reservados.</span>
          <span className="footer-motto">Tu práctica, nuestro compromiso.</span>
        </div>
      </div>
    </footer>
  )
}
