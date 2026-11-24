let instance = null

export function setLenis(lenis) {
  instance = lenis
}

export function scrollToId(id) {
  const target = document.getElementById(id)
  if (!target) return
  if (instance) {
    instance.scrollTo(target, { duration: 1.25, offset: 0 })
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function scrollToTop() {
  if (instance) instance.scrollTo(0, { duration: 1.2 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function lockScroll() {
  if (instance) instance.stop()
  document.documentElement.classList.add('is-locked')
}

export function unlockScroll() {
  if (instance) instance.start()
  document.documentElement.classList.remove('is-locked')
}
