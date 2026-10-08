// Los productos se editan en public/data/products.json (ver README).

// Descripciones de categoría tomadas del catálogo impreso.
export const CATEGORIES = [
  {
    name: 'Toxina Botulínica',
    icon: 'syringe',
    description: 'Marcas líderes de toxina botulínica tipo A, seleccionadas bajo altos estándares de calidad, seguridad y eficacia.',
  },
  {
    name: 'Ácido Hialurónico',
    icon: 'droplet',
    description: 'Ácido hialurónico de alta pureza para hidratación, volumen, definición y armonización facial.',
  },
  {
    name: 'Bioestimulador',
    icon: 'sparkles',
    description: 'Tecnología para estimular la producción natural de colágeno y mejorar la firmeza de la piel de forma progresiva.',
  },
]

export const CATEGORY_NAMES = CATEGORIES.map(c => c.name)
