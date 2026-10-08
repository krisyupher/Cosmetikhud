import { act, renderHook } from '@testing-library/react'
import { useCart } from './useCart'
import { PRODUCTS } from '../test/catalog'

const KEY = 'cosmetikhud:cart'

describe('useCart', () => {
  it('adds products, merges repeated SKUs and caps the quantity', () => {
    const { result } = renderHook(() => useCart(PRODUCTS))
    act(() => result.current.add('TOX-BOT-100'))
    act(() => result.current.add('TOX-BOT-100', 2))
    expect(result.current.count).toBe(3)
    expect(result.current.lines).toEqual([{ product: expect.objectContaining({ name: 'Botox' }), qty: 3 }])

    act(() => result.current.add('TOX-BOT-100', 500))
    expect(result.current.lines[0].qty).toBe(99)
  })

  it('removes a line when its quantity reaches zero or it is removed', () => {
    const { result } = renderHook(() => useCart(PRODUCTS))
    act(() => { result.current.add('TOX-BOT-100'); result.current.add('TOX-NEU-100') })
    act(() => result.current.setQty('TOX-BOT-100', 0))
    act(() => result.current.remove('TOX-NEU-100'))
    expect(result.current.lines).toEqual([])
    expect(result.current.count).toBe(0)
  })

  it('saves the order in localStorage', () => {
    const { result } = renderHook(() => useCart(PRODUCTS))
    act(() => result.current.add('AH-ELA-G', 2))
    expect(JSON.parse(localStorage.getItem(KEY))).toEqual([{ sku: 'AH-ELA-G', qty: 2 }])
  })

  it('restores a saved order and drops SKUs that are no longer in the catalog', () => {
    localStorage.setItem(KEY, JSON.stringify([
      { sku: 'TOX-BOT-100', qty: 2 },
      { sku: 'NO-EXISTE', qty: 1 },
      { sku: 'TOX-NEU-100', qty: 0 },
    ]))
    const { result } = renderHook(() => useCart(PRODUCTS))
    expect(result.current.lines).toEqual([{ product: expect.objectContaining({ sku: 'TOX-BOT-100' }), qty: 2 }])
  })

  it('keeps sold-out products in the list but out of the count', () => {
    const products = PRODUCTS.map(p => (p.sku === 'TOX-BOT-100' ? { ...p, available: false } : p))
    const { result } = renderHook(() => useCart(products))
    act(() => { result.current.add('TOX-BOT-100'); result.current.add('TOX-NEU-100', 2) })
    expect(result.current.lines).toHaveLength(2)
    expect(result.current.count).toBe(2)
  })

  it('starts empty when the saved data is corrupted', () => {
    localStorage.setItem(KEY, '{no es json')
    const { result } = renderHook(() => useCart(PRODUCTS))
    expect(result.current.lines).toEqual([])
  })
})
