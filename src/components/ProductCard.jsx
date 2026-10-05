export default function ProductCard({ product, onAdd, onView }) {
  const { name, brand, color, description, sku } = product
  return (
    <article className="card">
      <div className="car">
        <div className="slide on" style={{ background: `linear-gradient(135deg,${color},#0e1519)` }}>
          <svg viewBox="0 0 120 120" width="55%" aria-hidden="true">
            <rect x="44" y="12" width="32" height="14" rx="3" fill="#fff" opacity=".9" />
            <rect x="40" y="26" width="40" height="8" rx="2" fill="#c9a45c" />
            <rect x="38" y="34" width="44" height="72" rx="8" fill="#fff" opacity=".18" stroke="#fff" strokeWidth="2" />
            <rect x="44" y="58" width="32" height="30" rx="3" fill="#fff" opacity=".85" />
            <text x="60" y="77" textAnchor="middle" fontSize="9" fontWeight="700" fill="#14222b">{brand}</text>
          </svg>
        </div>
      </div>
      <div className="body">
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="row">
          <button className="btn o" onClick={() => onView(name)}>Ver</button>
          <button className="btn g" onClick={() => onAdd(`${name} — ${sku}`)}>Agregar</button>
        </div>
      </div>
    </article>
  )
}
