import { useRef, useState } from 'react'
import { CircleCheck } from 'lucide-react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Categories from './components/Categories'
import Catalog from './components/Catalog'
import Featured from './components/Featured'
import HowToOrder from './components/HowToOrder'
import Social from './components/Social'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProductDialog from './components/ProductDialog'
import CartDrawer from './components/CartDrawer'
import { WhatsAppIcon } from './components/BrandIcons'
import { whatsappUrl } from './data/site'
import { useCart } from './lib/useCart'

export default function App() {
  const [category, setCategory] = useState('Todos')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState({ text: '', visible: false })
  const cart = useCart()
  const searchRef = useRef(null)
  const toastTimer = useRef()

  const goCatalog = () => document.getElementById('productos').scrollIntoView()
  const pickCategory = c => { setCategory(c); setQuery(''); goCatalog() }
  const add = (product, qty = 1) => {
    cart.add(product.sku, qty)
    clearTimeout(toastTimer.current)
    setToast({ text: `${product.name} agregado a tu pedido`, visible: true })
    // El texto se conserva mientras el aviso se desvanece.
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 2400)
  }

  return (
    <>
      <Header cartCount={cart.count} onCart={() => setCartOpen(true)}
        onSearch={() => { goCatalog(); searchRef.current.focus({ preventScroll: true }) }} />
      <main>
        <Hero />
        <About />
        <Categories onPick={pickCategory} />
        <Catalog category={category} setCategory={setCategory} query={query} setQuery={setQuery}
          searchRef={searchRef} onAdd={add} onView={setSelected} />
        <Featured onView={setSelected} />
        <HowToOrder />
        <Social />
        <Contact />
      </main>
      <Footer onPickCategory={pickCategory} />

      <a className="fab" href={whatsappUrl()} target="_blank" rel="noopener" aria-label="Escribir por WhatsApp">
        <WhatsAppIcon size={26} />
      </a>
      <ProductDialog product={selected} onClose={() => setSelected(null)} onAdd={add} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart}
        onBrowse={() => { setCartOpen(false); goCatalog() }} />
      <div className={`toast${toast.visible ? ' is-visible' : ''}`} role="status" aria-live="polite">
        {toast.text && <><CircleCheck size={18} aria-hidden="true" /> {toast.text}</>}
      </div>
    </>
  )
}
