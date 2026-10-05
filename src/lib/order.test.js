import { normalize, orderMessage, productInquiry } from './order'
import { findProduct } from '../data/products'

const neuronox = findProduct('TOX-NEU-100')
const botox = findProduct('TOX-BOT-100')

describe('orderMessage', () => {
  it('lists each line with quantity, name and SKU', () => {
    expect(orderMessage([{ product: neuronox, qty: 2 }, { product: botox, qty: 1 }])).toBe(
      'Hola CosmetikHud, quisiera hacer el siguiente pedido:\n' +
      '• 2 x Neuronox (TOX-NEU-100)\n' +
      '• 1 x Botox (TOX-BOT-100)')
  })

  it('appends only the contact data that was filled in', () => {
    expect(orderMessage([{ product: botox, qty: 1 }], { name: '  Clínica Sol ', city: ' ' })).toBe(
      'Hola CosmetikHud, quisiera hacer el siguiente pedido:\n' +
      '• 1 x Botox (TOX-BOT-100)\n\n' +
      'Nombre / clínica: Clínica Sol')
  })
})

it('builds a product inquiry', () => {
  expect(productInquiry(botox)).toBe('Hola CosmetikHud, quisiera información sobre Botox (TOX-BOT-100).')
})

it('normalizes accents and case for search', () => {
  expect(normalize('Ácido HIALURÓNICO')).toBe('acido hialuronico')
})
