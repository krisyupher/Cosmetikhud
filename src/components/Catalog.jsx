import { CATEGORIES, PRODUCTS } from '../data/products'
import ProductCard from './ProductCard'

export default function Catalog({ category, setCategory, query, setQuery, searchRef, onAdd }) {
  const q = query.trim().toLowerCase()
  const list = PRODUCTS.filter(p =>
    (category === 'Todos' || p.category === category) &&
    `${p.name} ${p.brand} ${p.description}`.toLowerCase().includes(q))

  return (
    <section id="productos" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2>Catálogo</h2>
        <p className="sub">Venta exclusiva a profesionales de la salud con registro vigente.</p>
        <div className="tools">
          <div className="tabs">
            {['Todos', ...CATEGORIES.map(c => c.name)].map(c => (
              <button key={c} className={`tab${c === category ? ' on' : ''}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
          <input id="q" ref={searchRef} type="search" placeholder="Buscar producto…" aria-label="Buscar producto"
            value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div className="grid">
          {list.length
            ? list.map(p => <ProductCard key={p.sku} product={p} onAdd={onAdd} onView={setQuery} />)
            : <p className="empty">Sin resultados.</p>}
        </div>
      </div>
    </section>
  )
}
