import { Award, Lightbulb, ShieldCheck, UserRound } from 'lucide-react'
import SectionHeading from './SectionHeading'
import about from '../assets/images/about.webp'

// Texto y valores del catálogo impreso ("¿Quiénes somos?").
const VALUES = [
  [ShieldCheck, 'Calidad', 'Productos originales y certificados'],
  [Award, 'Confianza', 'Marcas líderes a nivel internacional'],
  [Lightbulb, 'Innovación', 'Soluciones que marcan la diferencia'],
  [UserRound, 'Servicio', 'Acompañamiento profesional'],
]

export default function About() {
  return (
    <section className="section" id="nosotros">
      <div className="container about-grid">
        <div className="about-media">
          <img src={about} alt="Viales y productos de estética sobre pedestales blancos" width="800" height="992"
            loading="lazy" decoding="async" />
        </div>
        <div className="about-copy">
          <SectionHeading index="01" label="Nosotros" title="¿Quiénes" accent="somos?" />
          <p>
            Somos una empresa especializada en la distribución de productos de estética, salud y
            bienestar de las mejores marcas internacionales.
          </p>
          <p>
            Ofrecemos soluciones innovadoras y seguras para profesionales de la salud y la estética,
            respaldadas por nuestra experiencia, calidad y compromiso.
          </p>
          <ul className="values">
            {VALUES.map(([Icon, title, text]) => (
              <li key={title} className="value">
                <span className="value-icon"><Icon size={22} strokeWidth={1.4} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
