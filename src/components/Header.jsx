import { useEffect, useState } from 'react'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import Logo from './Logo'
import { SITE, whatsappUrl } from '../data/site'

const NAV = [
  ['#inicio', 'Inicio'],
  ['#categorias', 'Categorías'],
  ['#productos', 'Productos'],
  ['#contacto', 'Contacto'],
]

export default function Header({ cartCount, onSearch, onCart }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <p>Venta exclusiva para profesionales de la salud</p>
          <p className="topbar-extra">
            Envíos a todo Colombia <span aria-hidden="true">·</span> Pago contra entrega{' '}
            <span aria-hidden="true">·</span>{' '}
            <a href={whatsappUrl()} target="_blank" rel="noopener">WhatsApp {SITE.phoneDisplay}</a>
          </p>
        </div>
      </div>

      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container nav-bar">
          <a className="brand" href="#inicio" aria-label="CosmetikHud, ir al inicio">
            <Logo />
          </a>

          <nav id="main-nav" className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Principal">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="icon-btn" onClick={onSearch} aria-label="Buscar productos">
              <Search size={20} strokeWidth={1.6} />
            </button>
            <button className="icon-btn cart-btn" onClick={onCart}
              aria-label={`Tu pedido, ${cartCount} ${cartCount === 1 ? 'producto' : 'productos'}`}>
              <ShoppingBag size={20} strokeWidth={1.6} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
            <button className="icon-btn menu-btn" onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen} aria-controls="main-nav" aria-label="Menú">
              {menuOpen ? <X size={22} strokeWidth={1.6} /> : <Menu size={22} strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
