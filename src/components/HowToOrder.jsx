import SectionHeading from './SectionHeading'
import { WhatsAppIcon } from './BrandIcons'
import { whatsappUrl } from '../data/site'
import { useReveal } from '../lib/reveal'

const STEPS = [
  ['Arma tu pedido', 'Agrega desde el catálogo los productos y las cantidades que necesitas.'],
  ['Envíalo por WhatsApp', 'Un asesor confirma disponibilidad, precio y datos de entrega.'],
  ['Recibe y paga', 'Entrega inmediata en Bogotá y de 1 a 3 días hábiles en el resto del país, con pago contra entrega.'],
]

// Cada paso se revela al entrar en pantalla; en escritorio, --step los escalona en secuencia.
function Step({ index, title, text }) {
  const reveal = useReveal()
  return (
    <li className="step" ref={reveal} data-stagger="" style={{ '--step': index }}>
      <span className="step-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </li>
  )
}

export default function HowToOrder() {
  const reveal = useReveal()
  return (
    <section className="section section--navy" id="como-pedir">
      <div className="container">
        <SectionHeading index="04" label="Cómo pedir" title="Tu pedido" accent="en tres pasos" />
        <ol className="steps">
          {STEPS.map(([title, text], i) => <Step key={title} index={i} title={title} text={text} />)}
        </ol>
        <a className="btn btn-light" href={whatsappUrl('Hola CosmetikHud, quisiera hacer un pedido.')}
          target="_blank" rel="noopener" ref={reveal} data-reveal="">
          <WhatsAppIcon size={18} /> Hacer un pedido
        </a>
      </div>
    </section>
  )
}
