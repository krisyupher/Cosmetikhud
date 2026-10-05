import { WHATSAPP } from '../data/products'

export default function Footer() {
  return (
    <>
      <section id="contacto">
        <div className="wrap">
          <h2>Contacto</h2>
          <p className="sub">Asesores disponibles para tomar su pedido.</p>
          <div className="cols">
            <div>
              <h3>WhatsApp ventas</h3>
              <p><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener">+57 320 994 9163</a></p>
              <p>Instagram: <a href="https://www.instagram.com/cosmetikhud/" target="_blank" rel="noopener">@cosmetikhud</a></p>
            </div>
            <div><h3>Dirección</h3><p>[Dirección del local — por completar]</p><p>Bogotá, Colombia</p></div>
            <div><h3>Horario</h3><p>[Lunes a viernes — por completar]</p><p>[Sábados — por completar]</p></div>
          </div>
        </div>
      </section>
      <footer>
        <div className="wrap">
          CosmetikHud es un distribuidor independiente y no tiene afiliación, patrocinio ni representación de los propietarios de las marcas mencionadas; todos los nombres y marcas pertenecen a sus respectivos titulares. Los productos se venden exclusivamente a profesionales de la salud con licencia o registro vigente, para uso profesional.
        </div>
      </footer>
      <a className="fab" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener">WhatsApp</a>
    </>
  )
}
