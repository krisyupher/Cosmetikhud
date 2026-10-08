import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { CATALOG, PRODUCTS, mockCatalog } from './test/catalog'
import { normalize } from './lib/order'

const cards = () => document.querySelectorAll('.card')
const countIn = category => PRODUCTS.filter(p => p.category === category).length

// The catalog loads asynchronously from products.json.
async function renderApp(catalog) {
  if (catalog) mockCatalog(catalog)
  const view = render(<App />)
  await waitFor(() => expect(cards().length).toBeGreaterThan(0))
  return view
}
const cartButton = () => screen.getByRole('button', { name: /^Tu pedido/ })
const drawer = () => screen.getByRole('dialog', { name: 'Tu pedido' })
const tabs = () => screen.getByRole('group', { name: 'Filtrar por categoría' })
const addFirst = () => userEvent.click(within(cards()[0]).getByRole('button', { name: /^Agregar/ }))
const orderText = () => decodeURIComponent(
  within(drawer()).getByRole('link', { name: /Enviar pedido por WhatsApp/ }).getAttribute('href'))

describe('App', () => {
  it('lists every product with its lab and presentation', async () => {
    await renderApp()
    expect(cards()).toHaveLength(PRODUCTS.length)
    expect(within(cards()[0]).getByText('Medytox, Corea')).toBeInTheDocument()
    expect(within(cards()[0]).getByText('100 unidades')).toBeInTheDocument()
  })

  it('filters by category tab', async () => {
    await renderApp()
    await userEvent.click(within(tabs()).getByRole('button', { name: /^Bioestimulador/ }))
    expect(cards()).toHaveLength(countIn('Bioestimulador'))
    expect(screen.getByText('ProFhilo')).toBeInTheDocument()
  })

  it('filters from a category card', async () => {
    await renderApp()
    const section = document.getElementById('categorias')
    await userEvent.click(within(section).getByRole('button', { name: /^Ácido Hialurónico/ }))
    expect(cards()).toHaveLength(countIn('Ácido Hialurónico'))
    expect(within(tabs()).getByRole('button', { name: /^Ácido Hialurónico/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('searches ignoring accents and recovers from an empty result', async () => {
    await renderApp()
    const search = screen.getByLabelText('Buscar producto')
    await userEvent.type(search, 'acido')
    expect(cards()).toHaveLength(PRODUCTS.filter(p =>
      normalize(`${p.name} ${p.category} ${p.lab} ${p.description}`).includes('acido')).length)
    await userEvent.clear(search)
    await userEvent.type(search, 'zzz')
    expect(screen.getByText('Sin resultados para esta búsqueda.')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Ver todos los productos' }))
    expect(cards()).toHaveLength(PRODUCTS.length)
  })

  it('adds products and sends the order by WhatsApp', async () => {
    await renderApp()
    await addFirst()
    await addFirst()
    expect(cartButton()).toHaveAccessibleName('Tu pedido, 2 productos')
    await userEvent.click(cartButton())
    const text = orderText()
    expect(text).toContain('https://wa.me/573209949163?text=')
    expect(text).toContain('• 2 x Neuronox (TOX-NEU-100)')
  })

  it('includes the optional contact data in the order', async () => {
    await renderApp()
    await addFirst()
    await userEvent.click(cartButton())
    await userEvent.type(within(drawer()).getByLabelText('Nombre o clínica'), 'Clínica Sol')
    await userEvent.type(within(drawer()).getByLabelText('Ciudad'), 'Medellín')
    expect(orderText()).toContain('Nombre / clínica: Clínica Sol')
    expect(orderText()).toContain('Ciudad: Medellín')
  })

  it('changes quantities and removes items', async () => {
    await renderApp()
    await addFirst()
    await userEvent.click(cartButton())
    await userEvent.click(within(drawer()).getByRole('button', { name: 'Aumentar cantidad de Neuronox' }))
    expect(orderText()).toContain('• 2 x Neuronox')
    await userEvent.click(within(drawer()).getByRole('button', { name: 'Quitar Neuronox' }))
    expect(cartButton()).toHaveAccessibleName('Tu pedido, 0 productos')
    expect(within(drawer()).getByText('Tu pedido está vacío')).toBeInTheDocument()
  })

  it('opens product details and adds the chosen quantity', async () => {
    await renderApp()
    await userEvent.click(within(cards()[0]).getByRole('button', { name: 'Ver detalle' }))
    const detail = screen.getByRole('dialog', { name: 'Neuronox' })
    expect(within(detail).getByText('TOX-NEU-100')).toBeInTheDocument()
    await userEvent.click(within(detail).getByRole('button', { name: 'Aumentar cantidad de Neuronox' }))
    await userEvent.click(within(detail).getByRole('button', { name: 'Agregar al pedido' }))
    expect(cartButton()).toHaveAccessibleName('Tu pedido, 2 productos')
    expect(screen.queryByRole('dialog', { name: 'Neuronox' })).not.toBeInTheDocument()
  })

  it('opens the featured product details', async () => {
    await renderApp()
    const featured = screen.getByRole('region', { name: /Neuronox/ })
    await userEvent.click(within(featured).getByRole('button', { name: 'Ver detalle' }))
    expect(screen.getByRole('dialog', { name: 'Neuronox' })).toBeInTheDocument()
  })

  it('asks about a product on WhatsApp and closes the detail', async () => {
    await renderApp()
    await userEvent.click(within(cards()[1]).getByRole('button', { name: 'Ver detalle' }))
    const detail = screen.getByRole('dialog', { name: 'Botox' })
    const href = within(detail).getByRole('link', { name: /Consultar/ }).getAttribute('href')
    expect(decodeURIComponent(href)).toContain('información sobre Botox (TOX-BOT-100)')
    await userEvent.click(within(detail).getByRole('button', { name: 'Cerrar' }))
    expect(screen.queryByRole('dialog', { name: 'Botox' })).not.toBeInTheDocument()
  })

  it('does not send an empty order', async () => {
    await renderApp()
    await userEvent.click(cartButton())
    expect(within(drawer()).getByText('Tu pedido está vacío')).toBeInTheDocument()
    expect(within(drawer()).getByRole('button', { name: /Enviar pedido por WhatsApp/ })).toBeDisabled()
  })

  it('clears the search', async () => {
    await renderApp()
    await userEvent.type(screen.getByLabelText('Buscar producto'), 'botox')
    expect(cards()).toHaveLength(1)
    await userEvent.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }))
    expect(screen.getByLabelText('Buscar producto')).toHaveValue('')
    expect(cards()).toHaveLength(PRODUCTS.length)
  })

  it('filters from the footer categories', async () => {
    await renderApp()
    await userEvent.click(within(screen.getByRole('contentinfo')).getByRole('button', { name: 'Toxina Botulínica' }))
    expect(cards()).toHaveLength(countIn('Toxina Botulínica'))
  })

  it('opens and closes the mobile menu', async () => {
    await renderApp()
    const menu = screen.getByRole('button', { name: 'Menú' })
    expect(menu).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(menu)
    expect(menu).toHaveAttribute('aria-expanded', 'true')
    await userEvent.click(within(screen.getByRole('navigation', { name: 'Principal' })).getByRole('link', { name: 'Productos' }))
    expect(menu).toHaveAttribute('aria-expanded', 'false')
  })

  it('confirms on the Agregar button for a moment', async () => {
    await renderApp()
    vi.useFakeTimers()
    try {
      const button = within(cards()[0]).getByRole('button', { name: /^Agregar/ })
      fireEvent.click(button)
      expect(button).toHaveClass('is-added')
      act(() => vi.advanceTimersByTime(1600))
      expect(button).not.toHaveClass('is-added')
    } finally {
      vi.useRealTimers()
    }
  })

  it('compacts the header after scrolling past the top bar', async () => {
    await renderApp()
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
    const { unmount } = await renderApp()
    await addFirst()
    unmount()
    await renderApp()
    expect(cartButton()).toHaveAccessibleName('Tu pedido, 1 producto')
  })

  it('never shows prices or placeholder text', async () => {
    await renderApp()
    expect(document.body.textContent).not.toMatch(/\$\s?\d/)
    expect(document.body.textContent).not.toMatch(/por completar/i)
  })

  it('hides products marked visible: false', async () => {
    await renderApp(CATALOG.map(p => (p.sku === 'TOX-BOT-100' ? { ...p, visible: false } : p)))
    expect(cards()).toHaveLength(PRODUCTS.length - 1)
    expect(screen.queryByText('Botox')).not.toBeInTheDocument()
  })

  it('shows sold-out products as Agotado and keeps them out of the order', async () => {
    await renderApp(CATALOG.map(p => (p.sku === 'TOX-BOT-100' ? { ...p, available: false } : p)))
    const card = [...cards()].find(c => within(c).queryByText('Botox'))
    expect(within(card).getByText('Agotado', { selector: '.stock-badge' })).toBeInTheDocument()
    expect(within(card).getByRole('button', { name: 'Botox agotado' })).toBeDisabled()
    expect(within(card).queryByRole('button', { name: /^Agregar/ })).not.toBeInTheDocument()

    await userEvent.click(within(card).getByRole('button', { name: 'Ver detalle' }))
    const detail = screen.getByRole('dialog', { name: 'Botox' })
    expect(within(detail).getByRole('button', { name: 'Agotado' })).toBeDisabled()
    expect(within(detail).getByRole('link', { name: /Consultar/ })).toBeInTheDocument()
  })

  it('drops a product from the order when it sells out after being added', async () => {
    localStorage.setItem('cosmetikhud:cart', JSON.stringify([{ sku: 'TOX-BOT-100', qty: 1 }, { sku: 'TOX-NEU-100', qty: 2 }]))
    await renderApp(CATALOG.map(p => (p.sku === 'TOX-BOT-100' ? { ...p, available: false } : p)))
    await userEvent.click(cartButton())
    expect(within(drawer()).getByText('Agotado: no se incluye en el pedido')).toBeInTheDocument()
    expect(orderText()).toContain('• 2 x Neuronox (TOX-NEU-100)')
    expect(orderText()).not.toContain('Botox')
  })

  it('hides the featured section when Neuronox is sold out', async () => {
    await renderApp(CATALOG.map(p => (p.sku === 'TOX-NEU-100' ? { ...p, available: false } : p)))
    expect(screen.queryByRole('region', { name: /Neuronox/ })).not.toBeInTheDocument()
  })

  it('offers WhatsApp when the catalog cannot be loaded', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    mockCatalog(null, { ok: false })
    render(<App />)
    expect(await screen.findByText(/No pudimos cargar el catálogo/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Pedir el catálogo/ })).toHaveAttribute('href', expect.stringContaining('wa.me'))
  })

  it('keeps the legal disclaimer', async () => {
    await renderApp()
    expect(screen.getByText(/no tiene afiliación/i)).toBeInTheDocument()
  })
})
