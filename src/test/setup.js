import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { CATALOG, mockCatalog } from './catalog'

// jsdom does not implement <dialog> modal methods or scrollIntoView.
HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', '') }
HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); this.dispatchEvent(new Event('close')) }
Element.prototype.scrollIntoView = () => {}

// Serve the real public/data/products.json to the app.
beforeEach(() => mockCatalog(CATALOG))

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  localStorage.clear() // the cart persists in localStorage
})
