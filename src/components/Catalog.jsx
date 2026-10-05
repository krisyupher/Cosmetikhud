import { Search, SearchX, X } from 'lucide-react'
import SectionHeading from './SectionHeading'
import ProductCard from './ProductCard'
import { CATEGORIES, PRODUCTS } from '../data/products'
import { normalize } from '../lib/order'

export default function Catalog({ category, setCategory, query, setQuery, searchRef, onAdd, onView }) {
  const q = normalize(query.trim())
  const list = PRODUCTS.filter(p =>
    (category === 'Todos' || p.category === category) &&
    normalize(`${p.name} ${p.category} ${p.lab} ${p.description}`).includes(q))

  const tabs = ['Todos', ...CATEGORIES.map(c => c.name)]
  const countFor = c => (c === 'Todos' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === c).length)

  return (
    <section className="section" id="productos">
      <div className="container">
        <SectionHeading index="03" label="Productos" title="Catálogo" accent="profesional">
          Venta exclusiva a profesionales de la salud con registro vigente. Precio y disponibilidad
          se confirman con un asesor.
        </SectionHeading>

        <div className="toolbar">
          <div className="tabs" role="group" aria-label="Filtrar por categoría">
            {tabs.map(c => (
              <button key={c} type="button" className={`tab${c === category ? ' is-active' : ''}`}
                aria-pressed={c === category} onClick={() => setCategory(c)}>
                {c} <span className="tab-count">{countFor(c)}</span>
              </button>
            ))}
          </div>
          <div className="search">
            <Search size={18} strokeWidth={1.6} aria-hidden="true" />
            <input ref={searchRef} type="search" placeholder="Buscar producto o laboratorio"
              aria-label="Buscar producto" value={query} onChange={e => setQuery(e.target.value)} />
            {query && (
              <button type="button" className="search-clear" onClick={() => setQuery('')} aria-label="Limpiar búsqueda">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? 'producto' : 'productos'}
        </p>

        {list.length ? (
          <div className="grid">
            {list.map(p => <ProductCard key={p.sku} product={p} onAdd={onAdd} onView={onView} />)}
          </div>
        ) : (
          <div className="empty">
            <SearchX size={32} strokeWidth={1.4} aria-hidden="true" />
            <p>Sin resultados para esta búsqueda.</p>
            <button type="button" className="btn btn-outline btn-sm"
              onClick={() => { setQuery(''); setCategory('Todos') }}>
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
