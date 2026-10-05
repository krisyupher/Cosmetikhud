import { act, render, screen } from '@testing-library/react'

// reveal.js guarda un IntersectionObserver por módulo: cada prueba carga una copia nueva.
async function renderBox() {
  vi.resetModules()
  const { useReveal } = await import('./reveal')
  function Box() {
    return <div data-testid="box" data-reveal="" ref={useReveal()} />
  }
  render(<Box />)
  return screen.getByTestId('box')
}

function stubObserver() {
  const io = { observed: [], unobserved: [] }
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback) { io.callback = callback }
    observe(el) { io.observed.push(el) }
    unobserve(el) { io.unobserved.push(el) }
  })
  return io
}

afterEach(() => vi.unstubAllGlobals())

describe('useReveal', () => {
  it('shows the element right away when IntersectionObserver is not available', async () => {
    const box = await renderBox()
    expect(box).toHaveAttribute('data-revealed')
  })

  it('reveals the element when it enters the viewport, only once', async () => {
    const io = stubObserver()
    const box = await renderBox()
    expect(io.observed).toEqual([box])
    expect(box).not.toHaveAttribute('data-revealed')

    act(() => io.callback([{ isIntersecting: false, target: box }]))
    expect(box).not.toHaveAttribute('data-revealed')

    act(() => io.callback([{ isIntersecting: true, target: box }]))
    expect(box).toHaveAttribute('data-revealed')
    expect(io.unobserved).toContain(box)
  })

  it('skips the animation when the user prefers reduced motion', async () => {
    const io = stubObserver()
    vi.stubGlobal('matchMedia', query => ({ matches: query.includes('reduce'), media: query }))
    const box = await renderBox()
    expect(box).toHaveAttribute('data-revealed')
    expect(io.observed).toEqual([])
  })
})
