import { useEffect, useRef, useState } from 'react'

/**
 * "Mask Reveal" text motion, pulled from uberdesigner's text animation generator
 * (effect: mask-reveal — duration 1.1s, stagger 0.12s, power4.out easing,
 * mask rise of 1.25em, trigger on load or on scroll, reduced motion: no motion).
 *
 * Each line sits in its own overflow mask and rises into place, so the type reads
 * as printed line by line instead of fading in as one block.
 */
export default function MaskReveal({
  lines,
  as: Tag = 'h2',
  className = '',
  trigger = 'scroll',
}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(trigger !== 'scroll')

  useEffect(() => {
    if (trigger !== 'scroll' || !ref.current) return
    const el = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setInView(true)
        observer.disconnect()
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [trigger])

  return (
    <Tag
      ref={ref}
      className={`mask-reveal${inView ? ' is-in' : ''}${className ? ` ${className}` : ''}`}
    >
      {lines.map((line, i) => (
        <span className="mask-line" key={i}>
          <span className="mask-line__inner" style={{ '--line': i }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
