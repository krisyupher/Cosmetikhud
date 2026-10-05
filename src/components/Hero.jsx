import { WHATSAPP } from '../data/products'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="wrap">
        <h1>Importación directa para profesionales de la medicina estética</h1>
        <p>Distribuimos al por mayor productos 100% originales, con trazabilidad garantizada, entrega inmediata en Bogotá y envíos a todo el país en 1–3 días hábiles.</p>
        <div className="btns">
          <a className="btn p" href="#productos">Ver catálogo</a>
          <a className="btn w" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener">Escribir por WhatsApp</a>
        </div>
        <div className="trust">
          <span>✔ 100% Originales</span>
          <span>✔ Envíos a todo el país</span>
          <span>✔ Pago Contra-Entrega</span>
        </div>
      </div>
    </section>
  )
}
