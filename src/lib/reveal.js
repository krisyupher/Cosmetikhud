import { useCallback, useRef } from 'react'

// Revelado al hacer scroll. Los elementos con data-reveal (o data-stagger, que anima a sus
// hijos en secuencia) reciben data-revealed al entrar en pantalla; las animaciones están en
// styles.css. Sin IntersectionObserver o con movimiento reducido se muestran de inmediato.

let observer

const motionAllowed = () =>
  typeof IntersectionObserver !== 'undefined' &&
  !window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

// Atributo y no clase: React reescribe className en cada render y borraría la marca.
const show = el => { el.dataset.revealed = '' }

function getObserver() {
  observer ??= new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      show(entry.target)
      observer.unobserve(entry.target)
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 })
  return observer
}

export function useReveal() {
  const node = useRef(null)
  return useCallback(el => {
    if (node.current) observer?.unobserve(node.current)
    node.current = el
    if (!el || 'revealed' in el.dataset) return
    if (motionAllowed()) getObserver().observe(el)
    else show(el)
  }, [])
}
