// Datos de contacto (fuente: catálogo impreso, página "Contáctanos").
export const SITE = {
  name: 'CosmetikHud',
  tagline: 'Distribución de productos de estética, salud y bienestar',
  whatsapp: '573209949163',
  phoneDisplay: '+57 320 994 9163',
  email: 'cosmetikhud@gmail.com',
  instagram: 'cosmetikhud',
  facebook: 'cosmetikhud',
  city: 'Bogotá D.C., Colombia',
  // Horario de atención, p. ej. 'Lunes a viernes, 8:00 a. m. – 6:00 p. m.'.
  // Mientras sea null no se muestra en el sitio.
  hours: null,
}

export const whatsappUrl = text =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
