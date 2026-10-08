import { ArrowRight, Droplet, Sparkles, Syringe } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { useReveal } from '../lib/reveal'
import { CATEGORIES } from '../data/categories'

const ICONS = { syringe: Syringe, droplet: Droplet, sparkles: Sparkles }

export default function Categories({ products, onPick }) {
  const reveal = useReveal()
  return (
    <section className="section section--soft" id="categorias">
      <div className="container">
        <SectionHeading index="02" label="Categorías" title="Nuestras" accent="líneas">
          Productos seleccionados para resultados excepcionales.
        </SectionHeading>
        <div className="cat-grid" ref={reveal} data-stagger="">
          {CATEGORIES.map((c, i) => {
            const Icon = ICONS[c.icon]
            const n = products.filter(p => p.category === c.name).length
            return (
              <button key={c.name} type="button" className="cat-card" onClick={() => onPick(c.name)}>
                <span className="cat-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="cat-icon"><Icon size={26} strokeWidth={1.4} aria-hidden="true" /></span>
                <h3>{c.name}</h3>
                <p>{c.description}</p>
                <span className="cat-foot">
                  <span className="cat-count">{n} producto{n === 1 ? '' : 's'}</span>
                  <span className="cat-link">Ver productos <ArrowRight size={16} aria-hidden="true" /></span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
