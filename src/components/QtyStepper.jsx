import { Minus, Plus } from 'lucide-react'

export default function QtyStepper({ value, onChange, label, min = 1 }) {
  return (
    <div className="qty">
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min}
        aria-label={`Disminuir cantidad de ${label}`}>
        <Minus size={14} />
      </button>
      <output aria-label={`Cantidad de ${label}`}>{value}</output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= 99}
        aria-label={`Aumentar cantidad de ${label}`}>
        <Plus size={14} />
      </button>
    </div>
  )
}
