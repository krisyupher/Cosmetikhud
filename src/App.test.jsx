import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { PRODUCTS } from './data/products'

const cards = () => document.querySelectorAll('.card')

describe('App', () => {
  it('lists every product initially', () => {
    render(<App />)
    expect(cards()).toHaveLength(PRODUCTS.length)
  })

  it('filters by category tab', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: 'Bioestimulador', exact: true, hidden: false }))
    expect(cards()).toHaveLength(1)
    expect(screen.getAllByText('ProFhilo').length).toBeGreaterThan(0)
  })

  it('filters by the search box', async () => {
    render(<App />)
    await userEvent.type(screen.getByLabelText('Buscar producto'), 'dysport')
    expect(cards()).toHaveLength(1)
    await userEvent.clear(screen.getByLabelText('Buscar producto'))
    await userEvent.type(screen.getByLabelText('Buscar producto'), 'zzz')
    expect(screen.getByText('Sin resultados.')).toBeInTheDocument()
  })

  it('adds to the cart and builds a WhatsApp link', async () => {
    render(<App />)
    const first = cards()[0]
    await userEvent.click(within(first).getByRole('button', { name: 'Agregar' }))
    expect(screen.getByLabelText('Carrito')).toHaveTextContent('1')

    await userEvent.click(screen.getByLabelText('Carrito'))
    const dialog = document.querySelector('dialog')
    expect(within(dialog).getByText('Neuronox — TOX-NEU-100')).toBeInTheDocument()
    const href = within(dialog).getByRole('link', { name: 'Enviar por WhatsApp' }).getAttribute('href')
    expect(href).toContain('https://wa.me/573209949163?text=')
    expect(decodeURIComponent(href)).toContain('- Neuronox — TOX-NEU-100')
  })

  it('removes items from the cart', async () => {
    render(<App />)
    await userEvent.click(within(cards()[0]).getByRole('button', { name: 'Agregar' }))
    await userEvent.click(screen.getByLabelText('Carrito'))
    await userEvent.click(screen.getByLabelText('Quitar'))
    expect(screen.getByLabelText('Carrito')).toHaveTextContent('0')
  })

  it('keeps the legal disclaimer', () => {
    render(<App />)
    expect(screen.getByText(/no tiene afiliación/i)).toBeInTheDocument()
  })
})
