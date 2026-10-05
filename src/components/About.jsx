import { Award, Lightbulb, ShieldCheck, UserRound } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { useReveal } from '../lib/reveal'
import about from '../assets/images/about.webp'

// Texto y valores del catálogo impreso ("¿Quiénes somos?").
const VALUES = [
  [ShieldCheck, 'Calidad', 'Productos originales y certificados'],
  [Award, 'Confianza', 'Marcas líderes a nivel internacional'],
  [Lightbulb, 'Innovación', 'Soluciones que marcan la diferencia'],
  [UserRound, 'Servicio', 'Acompañamiento profesional'],
]

export default function About() {
  const revealMedia = useReveal()
  const revealText = useReveal()
  const revealValues = useReveal()
  return (
    <section className="section" id="nosotros">
      <div className="container about-grid">
        <div className="about-media" ref={revealMedia} data-reveal="media">
          <img src={about} alt="Viales y productos de estética sobre pedestales blancos" width="800" height="992"
            loading="lazy" decoding="async" />
        </div>
        <div className="about-copy">
          <SectionHeading index="01" label="Nosotros" title="¿Quiénes" accent="somos?" />
          <div className="about-text" ref={revealText} data-stagger="">
            <p>
              Somos una empresa especializada en la distribución de productos de estética, salud y
              bienestar de las mejores marcas internacionales.
            </p>
            <p>
              Ofrecemos soluciones innovadoras y seguras para profesionales de la salud y la estética,
              respaldadas por nuestra experiencia, calidad y compromiso.
            </p>
          </div>
          <ul className="values" ref={revealValues} data-stagger="">
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
