import neuronox from '../assets/products/neuronox.webp'
import elastyGPlus from '../assets/products/elasty-g-plus.webp'
import botox from '../assets/products/botox.webp'
import xeomin from '../assets/products/xeomin.webp'
import innotox from '../assets/products/innotox.webp'
import dysport from '../assets/products/dysport.webp'
import botulax from '../assets/products/botulax.webp'
import profhilo from '../assets/products/profhilo.webp'

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

// Laboratorio, presentación y descripción según el catálogo impreso.
// El costo es interno y no se publica en el sitio.
export const PRODUCTS = [
  {
    sku: 'TOX-NEU-100', category: 'Toxina Botulínica', name: 'Neuronox',
    lab: 'Medytox, Corea', presentation: '100 unidades',
    description: 'Toxina botulínica tipo A liofilizada para uso profesional.', image: neuronox,
  },
  {
    sku: 'AH-ELA-G', category: 'Ácido Hialurónico', name: 'Elasty G Plus',
    lab: 'Dongbang Medical, Corea', presentation: '1 jeringa de 1 ml, densidad alta',
    description: 'Ácido hialurónico reticulado con lidocaína para armonización facial.', image: elastyGPlus,
  },
  {
    sku: 'TOX-BOT-100', category: 'Toxina Botulínica', name: 'Botox',
    lab: 'Allergan, Irlanda', presentation: '100 unidades',
    description: 'Toxina botulínica tipo A liofilizada para uso profesional.', image: botox,
  },
  {
    sku: 'TOX-XEO-100', category: 'Toxina Botulínica', name: 'Xeomin',
    lab: 'Merz Pharma, Alemania', presentation: '100 unidades',
    description: 'Toxina botulínica tipo A liofilizada para uso profesional.', image: xeomin,
  },
  {
    sku: 'TOX-INN-100', category: 'Toxina Botulínica', name: 'Innotox',
    lab: 'Medytox, Corea', presentation: '100 unidades',
    description: 'Toxina botulínica tipo A para uso profesional.', image: innotox,
  },
  {
    sku: 'TOX-DYS-100', category: 'Toxina Botulínica', name: 'Dysport',
    lab: 'Ipsen Biopharm, Francia', presentation: '500 unidades',
    description: 'Toxina botulínica tipo A liofilizada para uso profesional.', image: dysport,
  },
  {
    sku: 'TOX-BLX-100', category: 'Toxina Botulínica', name: 'Botulax',
    lab: 'Hugel, Corea del Sur', presentation: '100 unidades',
    description: 'Toxina botulínica tipo A liofilizada para uso profesional.', image: botulax,
  },
  {
    sku: 'BIO-PROF-1', category: 'Bioestimulador', name: 'ProFhilo',
    lab: 'IBSA Derma, Italia', presentation: '1 jeringa prellenada de 2 ml',
    description: 'Jeringa prellenada que contiene ácido hialurónico, para uso profesional.', image: profhilo,
  },
]

export const findProduct = sku => PRODUCTS.find(p => p.sku === sku)
