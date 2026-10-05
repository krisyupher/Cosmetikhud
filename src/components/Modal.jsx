import { useEffect, useRef } from 'react'

// <dialog> nativo: foco atrapado, Escape y fondo inerte sin librerías.
export default function Modal({ open, onClose, className, labelledBy, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className={className}
      aria-labelledby={labelledBy}
      onClose={onClose}
      // Clic en el fondo (fuera del contenido) cierra el diálogo.
      onClick={e => { if (e.target === ref.current) onClose() }}
    >
      {children}
    </dialog>
  )
}
