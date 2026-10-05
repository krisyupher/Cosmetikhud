export default function Header({ cartCount, onSearch, onCart }) {
  return (
    <header>
      <div className="wrap bar">
        <a className="logo" href="#inicio"><b>CH</b>CosmetikHud</a>
        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#categorias">Categorías</a>
          <a href="#productos">Productos</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <div className="icons">
          <button className="ib" onClick={onSearch} aria-label="Buscar">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="9" r="6" /><path d="M14 14l4 4" /></svg>
          </button>
          <button className="ib" onClick={onCart} aria-label="Carrito">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h3l2 11h11l2-8H6" /><circle cx="9" cy="19" r="1.3" /><circle cx="17" cy="19" r="1.3" /></svg>
            <span className="badge">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
