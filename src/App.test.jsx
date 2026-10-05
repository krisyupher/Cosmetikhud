import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { PRODUCTS } from './data/products'

const cards = () => document.querySelectorAll('.card')
const cartButton = () => screen.getByRole('button', { name: /^Tu pedido/ })
const drawer = () => screen.getByRole('dialog', { name: 'Tu pedido' })
const tabs = () => screen.getByRole('group', { name: 'Filtrar por categoría' })
const addFirst = () => userEvent.click(within(cards()[0]).getByRole('button', { name: /^Agregar/ }))
const orderText = () => decodeURIComponent(
  within(drawer()).getByRole('link', { name: /Enviar pedido por WhatsApp/ }).getAttribute('href'))

describe('App', () => {
  it('lists every product with its lab and presentation', () => {
    render(<App />)
    expect(cards()).toHaveLength(PRODUCTS.length)
    expect(within(cards()[0]).getByText('Medytox, Corea')).toBeInTheDocument()
    expect(within(cards()[0]).getByText('100 unidades')).toBeInTheDocument()
  })

  it('filters by category tab', async () => {
    render(<App />)
    await userEvent.click(within(tabs()).getByRole('button', { name: /^Bioestimulador/ }))
    expect(cards()).toHaveLength(1)
    expect(within(cards()[0]).getByText('ProFhilo')).toBeInTheDocument()
  })

  it('filters from a category card', async () => {
    render(<App />)
    const section = document.getElementById('categorias')
    await userEvent.click(within(section).getByRole('button', { name: /^Ácido Hialurónico/ }))
    expect(cards()).toHaveLength(1)
    expect(within(tabs()).getByRole('button', { name: /^Ácido Hialurónico/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('searches ignoring accents and recovers from an empty result', async () => {
    render(<App />)
    const search = screen.getByLabelText('Buscar producto')
    await userEvent.type(search, 'acido')
    expect(cards()).toHaveLength(2)
    await userEvent.clear(search)
    await userEvent.type(search, 'zzz')
    expect(screen.getByText('Sin resultados para esta búsqueda.')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Ver todos los productos' }))
    expect(cards()).toHaveLength(PRODUCTS.length)
  })

  it('adds products and sends the order by WhatsApp', async () => {
    render(<App />)
    await addFirst()
    await addFirst()
    expect(cartButton()).toHaveAccessibleName('Tu pedido, 2 productos')
    await userEvent.click(cartButton())
    const text = orderText()
    expect(text).toContain('https://wa.me/573209949163?text=')
    expect(text).toContain('• 2 x Neuronox (TOX-NEU-100)')
  })

  it('includes the optional contact data in the order', async () => {
    render(<App />)
    await addFirst()
    await userEvent.click(cartButton())
    await userEvent.type(within(drawer()).getByLabelText('Nombre o clínica'), 'Clínica Sol')
    await userEvent.type(within(drawer()).getByLabelText('Ciudad'), 'Medellín')
    expect(orderText()).toContain('Nombre / clínica: Clínica Sol')
    expect(orderText()).toContain('Ciudad: Medellín')
  })

  it('changes quantities and removes items', async () => {
    render(<App />)
    await addFirst()
    await userEvent.click(cartButton())
    await userEvent.click(within(drawer()).getByRole('button', { name: 'Aumentar cantidad de Neuronox' }))
    expect(orderText()).toContain('• 2 x Neuronox')
    await userEvent.click(within(drawer()).getByRole('button', { name: 'Quitar Neuronox' }))
    expect(cartButton()).toHaveAccessibleName('Tu pedido, 0 productos')
    expect(within(drawer()).getByText('Tu pedido está vacío')).toBeInTheDocument()
  })

  it('opens product details and adds the chosen quantity', async () => {
    render(<App />)
    await userEvent.click(within(cards()[0]).getByRole('button', { name: 'Ver detalle' }))
    const detail = screen.getByRole('dialog', { name: 'Neuronox' })
    expect(within(detail).getByText('TOX-NEU-100')).toBeInTheDocument()
    await userEvent.click(within(detail).getByRole('button', { name: 'Aumentar cantidad de Neuronox' }))
    await userEvent.click(within(detail).getByRole('button', { name: 'Agregar al pedido' }))
    expect(cartButton()).toHaveAccessibleName('Tu pedido, 2 productos')
    expect(screen.queryByRole('dialog', { name: 'Neuronox' })).not.toBeInTheDocument()
  })

  it('opens the featured product details', async () => {
    render(<App />)
    const featured = screen.getByRole('region', { name: /Neuronox/ })
    await userEvent.click(within(featured).getByRole('button', { name: 'Ver detalle' }))
    expect(screen.getByRole('dialog', { name: 'Neuronox' })).toBeInTheDocument()
  })

  it('asks about a product on WhatsApp and closes the detail', async () => {
    render(<App />)
    await userEvent.click(within(cards()[2]).getByRole('button', { name: 'Ver detalle' }))
    const detail = screen.getByRole('dialog', { name: 'Botox' })
    const href = within(detail).getByRole('link', { name: /Consultar/ }).getAttribute('href')
    expect(decodeURIComponent(href)).toContain('información sobre Botox (TOX-BOT-100)')
    await userEvent.click(within(detail).getByRole('button', { name: 'Cerrar' }))
    expect(screen.queryByRole('dialog', { name: 'Botox' })).not.toBeInTheDocument()
  })

  it('does not send an empty order', async () => {
    render(<App />)
    await userEvent.click(cartButton())
    expect(within(drawer()).getByText('Tu pedido está vacío')).toBeInTheDocument()
    expect(within(drawer()).getByRole('button', { name: /Enviar pedido por WhatsApp/ })).toBeDisabled()
  })

  it('clears the search', async () => {
    render(<App />)
    await userEvent.type(screen.getByLabelText('Buscar producto'), 'botox')
    expect(cards()).toHaveLength(1)
    await userEvent.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }))
    expect(screen.getByLabelText('Buscar producto')).toHaveValue('')
    expect(cards()).toHaveLength(PRODUCTS.length)
  })

  it('filters from the footer categories', async () => {
    render(<App />)
    await userEvent.click(within(screen.getByRole('contentinfo')).getByRole('button', { name: 'Toxina Botulínica' }))
    expect(cards()).toHaveLength(6)
  })

  it('opens and closes the mobile menu', async () => {
    render(<App />)
    const menu = screen.getByRole('button', { name: 'Menú' })
    expect(menu).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(menu)
    expect(menu).toHaveAttribute('aria-expanded', 'true')
    await userEvent.click(within(screen.getByRole('navigation', { name: 'Principal' })).getByRole('link', { name: 'Productos' }))
    expect(menu).toHaveAttribute('aria-expanded', 'false')
  })

  it('confirms on the Agregar button for a moment', () => {
    vi.useFakeTimers()
    try {
      render(<App />)
      const button = within(cards()[0]).getByRole('button', { name: /^Agregar/ })
      fireEvent.click(button)
      expect(button).toHaveClass('is-added')
      act(() => vi.advanceTimersByTime(1600))
      expect(button).not.toHaveClass('is-added')
    } finally {
      vi.useRealTimers()
    }
  })

  it('compacts the header after scrolling past the top bar', () => {
    render(<App />)
    const header = screen.getByRole('banner')
    expect(header).not.toHaveClass('is-scrolled')
    window.scrollY = 200
    fireEvent.scroll(window)
    expect(header).toHaveClass('is-scrolled')
    window.scrollY = 0
    fireEvent.scroll(window)
    expect(header).not.toHaveClass('is-scrolled')
  })

  it('keeps the order after a reload', async () => {
    const { unmount } = render(<App />)
    await addFirst()
    unmount()
    render(<App />)
    expect(cartButton()).toHaveAccessibleName('Tu pedido, 1 producto')
  })

  it('never shows prices or placeholder text', () => {
    render(<App />)
    expect(document.body.textContent).not.toMatch(/\$\s?\d/)
    expect(document.body.textContent).not.toMatch(/por completar/i)
  })

  it('keeps the legal disclaimer', () => {
    render(<App />)
    expect(screen.getByText(/no tiene afiliación/i)).toBeInTheDocument()
  })
})
