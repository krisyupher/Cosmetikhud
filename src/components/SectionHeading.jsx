// Encabezado de sección con el recurso del catálogo impreso:
// número en recuadro, línea fina y título en dos tonos (azul / dorado).
export default function SectionHeading({ index, label, title, accent, children }) {
  return (
    <div className="sec-head">
      <div className="sec-index" aria-hidden="true">
        <span className="sec-num">{index}</span>
        <span className="sec-line" />
        <span className="sec-label">{label}</span>
      </div>
      <h2 className="sec-title">
        {title} <span className="accent">{accent}</span>
      </h2>
      <span className="gold-rule" aria-hidden="true" />
      {children && <p className="sec-lead">{children}</p>}
    </div>
  )
}
