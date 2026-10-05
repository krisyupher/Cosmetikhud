import { CATEGORIES, PRODUCTS } from '../data/products'

export default function Categories({ onPick }) {
  return (
    <section id="categorias">
      <div className="wrap">
        <h2>Categorías</h2>
        <p className="sub">Elija una línea para filtrar el catálogo.</p>
        <div className="cats">
          {CATEGORIES.map(c => {
            const n = PRODUCTS.filter(p => p.category === c.name).length
            return (
              <button key={c.name} className="cat" onClick={() => onPick(c.name)}>
                <strong>{c.name}</strong>
                <small>{n} producto{n === 1 ? '' : 's'}</small>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
