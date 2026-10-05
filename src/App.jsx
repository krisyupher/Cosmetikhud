import { useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Catalog from './components/Catalog'
import CartDialog from './components/CartDialog'
import Footer from './components/Footer'

export default function App() {
  const [category, setCategory] = useState('Todos')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState('')
  const searchRef = useRef(null)

  const goCatalog = () => document.getElementById('productos').scrollIntoView()
  const add = item => {
    setCart(c => [...c, item])
    setToast('Agregado al carrito')
    setTimeout(() => setToast(''), 1800)
  }

  return (
    <>
      <Header cartCount={cart.length} onCart={() => setCartOpen(true)}
        onSearch={() => { goCatalog(); searchRef.current.focus() }} />
      <main>
        <Hero />
        <Categories onPick={c => { setCategory(c); goCatalog() }} />
        <Catalog category={category} setCategory={setCategory} query={query} setQuery={setQuery}
          searchRef={searchRef} onAdd={add} />
      </main>
      <Footer />
      <CartDialog open={cartOpen} onClose={() => setCartOpen(false)} items={cart}
        onRemove={i => setCart(c => c.filter((_, j) => j !== i))} />
      <div id="toast" className={toast ? 'on' : ''}>{toast}</div>
    </>
  )
}
