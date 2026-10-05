// Mensajes de WhatsApp: el pedido se cierra con un asesor, no hay checkout.

export function orderMessage(lines, { name = '', city = '' } = {}) {
  const items = lines.map(({ product, qty }) => `• ${qty} x ${product.name} (${product.sku})`)
  const contact = [
    name.trim() && `Nombre / clínica: ${name.trim()}`,
    city.trim() && `Ciudad: ${city.trim()}`,
  ].filter(Boolean)
  return [
    'Hola CosmetikHud, quisiera hacer el siguiente pedido:',
    ...items,
    ...(contact.length ? ['', ...contact] : []),
  ].join('\n')
}

export const productInquiry = product =>
  `Hola CosmetikHud, quisiera información sobre ${product.name} (${product.sku}).`

// Quita tildes para que "acido" encuentre "Ácido".
export const normalize = text =>
  text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
