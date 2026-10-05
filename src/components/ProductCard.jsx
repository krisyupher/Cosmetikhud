export default function ProductCard({ product, onAdd, onView }) {
  const { name, category, lab, presentation, image } = product
  return (
    <article className="card">
      <button type="button" className="card-media" onClick={() => onView(product)} aria-label={`Ver detalle de ${name}`}>
        <img src={image} alt="" width="640" height="640" loading="lazy" decoding="async" />
      </button>
      <div className="card-body">
        <p className="card-cat">{category}</p>
        <h3 className="card-title">{name}</h3>
        <span className="gold-rule" aria-hidden="true" />
        <dl className="specs">
          <div><dt>Laboratorio</dt><dd>{lab}</dd></div>
          <div><dt>Presentación</dt><dd>{presentation}</dd></div>
        </dl>
        <div className="card-actions">
          <button type="button" className="btn btn-outline btn-sm" onClick={() => onView(product)}>Ver detalle</button>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => onAdd(product)}
            aria-label={`Agregar ${name} al pedido`}>Agregar</button>
        </div>
      </div>
    </article>
  )
}
