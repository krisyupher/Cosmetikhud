import SectionHeading from './SectionHeading'
import { InstagramIcon } from './BrandIcons'
import { SITE } from '../data/site'
import bienvenida from '../assets/social/bienvenida.webp'
import lineaEstetica from '../assets/social/linea-estetica.webp'
import calidadConfianza from '../assets/social/calidad-confianza.webp'
import innovacion from '../assets/social/innovacion.webp'
import profesionalismo from '../assets/social/profesionalismo.webp'
import aliadoConfiable from '../assets/social/aliado-confiable.webp'

// Piezas finales de la campaña de mayo (src/design/Post/Mayo/Piezas Finales).
const POSTS = [
  [bienvenida, 'Bienvenidos a CosmetikHud: distribución profesional para estética, salud y bienestar.'],
  [lineaEstetica, 'Soluciones premium para profesionales de la estética.'],
  [calidadConfianza, 'La confianza también se distribuye.'],
  [innovacion, 'Innovación que transforma resultados.'],
  [profesionalismo, 'Salud, bienestar y profesionalismo que conectan.'],
  [aliadoConfiable, 'Tu aliado confiable en cada tratamiento.'],
]

export default function Social() {
  const profile = `https://www.instagram.com/${SITE.instagram}/`
  return (
    <section className="section section--soft" id="instagram">
      <div className="container">
        <div className="social-head">
          <SectionHeading index="05" label="Comunidad" title="Síguenos en" accent="Instagram" />
          <a className="btn btn-outline" href={profile} target="_blank" rel="noopener">
            <InstagramIcon size={18} /> @{SITE.instagram}
          </a>
        </div>
        <ul className="social-grid">
          {POSTS.map(([src, alt]) => (
            <li key={src}>
              <a className="social-tile" href={profile} target="_blank" rel="noopener">
                <img src={src} alt={alt} width="480" height="600" loading="lazy" decoding="async" />
                <span className="social-overlay" aria-hidden="true"><InstagramIcon size={26} /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
