import { useLayoutEffect, useRef } from 'react'
import { prefersReducedMotion, revealFrom } from '../lib/reveals'

export default function Reveal({ children, delay = 0, y = 26, className = '' }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    revealFrom(ref.current, y)
  }, [y])

  return (
    <div ref={ref} className={className} data-reveal data-reveal-delay={delay}>
      {children}
    </div>
  )
}
