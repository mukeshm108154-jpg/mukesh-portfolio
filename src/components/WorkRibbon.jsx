import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '../data/content'
import { prefersReducedMotion } from '../lib/reveals'

gsap.registerPlugin(ScrollTrigger)

const plates = skills
const STEP = 360 / plates.length

/**
 * Craft ribbon — MotionSites' "Vante / Video Ribbon" depth concept, rebuilt in CSS 3D.
 *
 * Five discipline plates sit on a ring. The section pins and the scroll timeline
 * holds each plate face-on for most of its step, turning only in the last 45% —
 * so plates settle square to the viewer instead of resting mid-rotation.
 * Reduced motion gets a flat grid with no pin and no rotation.
 */
export default function WorkRibbon() {
  const root = useRef(null)
  const stage = useRef(null)
  const ring = useRef(null)
  const count = useRef(null)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=200%',
          pin: stage.current,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (!count.current) return
            const step = Math.round(self.progress * (plates.length - 1)) + 1
            count.current.textContent = String(Math.min(step, plates.length)).padStart(2, '0')
          },
        },
      })

      // One unit per plate: 55% held face-on, 45% turning to the next plate.
      for (let i = 0; i < plates.length - 1; i += 1) {
        tl.to(
          ring.current,
          { rotateY: -(i + 1) * STEP, duration: 0.45, ease: 'power2.inOut' },
          i + 0.55,
        )
      }
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="ribbon" ref={root} aria-label="Craft in depth">
      <div className="ribbon-stage" ref={stage}>
        <div className="ribbon-head">
          <span className="kicker">03B — Craft in depth</span>
          <span className="ribbon-count">
            <span ref={count}>01</span>
            <i>/</i>
            {String(plates.length).padStart(2, '0')}
          </span>
        </div>

        <div className="ribbon-viewport">
          <div className={`ribbon-ring${reduced ? ' is-flat' : ''}`} ref={ring}>
            {plates.map((plate, i) => (
              <article className="ribbon-card" key={plate.id} style={{ '--i': i }}>
                <div className="ribbon-card-inner">
                  <span className="ribbon-card-index">{plate.index}</span>
                  <h3>{plate.title}</h3>
                  <p className="ribbon-card-lead">{plate.lead}</p>
                  <ul className="tag-list">
                    {plate.tags.slice(0, 4).map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <div className="ribbon-meta">
                  <span>{plate.title}</span>
                  <span>{plate.index}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="ribbon-note">
          <span className="status-dot" />
          Scroll to turn the ribbon · five disciplines, one hand-off
        </p>
      </div>
    </section>
  )
}
