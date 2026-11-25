import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Puts an element into its pre-reveal state with GSAP (no CSS class flash). */
export function revealFrom(el, y = 26) {
  if (!el) return
  gsap.set(el, { autoAlpha: 0, y })
}

/**
 * One ScrollTrigger.batch for every [data-reveal] element instead of an
 * IntersectionObserver per Reveal, so reveals share a single trigger pass
 * and animate only transform/opacity on GSAP's ticker.
 */
export function initReveals(scope = document.body) {
  if (prefersReducedMotion()) return () => {}

  const ctx = gsap.context(() => {
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%',
      once: true,
      interval: 0.08,
      batchMax: 8,
      onEnter: (batch) =>
        batch.forEach((el, i) => {
          gsap.to(el, {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            delay: (parseFloat(el.dataset.revealDelay) || 0) + i * 0.05,
            ease: 'power3.out',
            onComplete: () => gsap.set(el, { clearProps: 'transform,opacity,visibility' }),
          })
        }),
    })
  }, scope)

  ScrollTrigger.refresh()
  return () => ctx.revert()
}
