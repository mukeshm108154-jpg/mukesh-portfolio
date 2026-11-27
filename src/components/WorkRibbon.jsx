import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/content'
import ProjectArt from './ProjectArt'
import { prefersReducedMotion } from '../lib/reveals'

gsap.registerPlugin(ScrollTrigger)

/**
 * 3D work ribbon — MotionSites' "Vante / Video Ribbon" scroll concept, rebuilt in
 * CSS 3D instead of WebGL so the site keeps its single-bundle weight.
 *
 * Four project plates sit on a ring (rotateY(i × 90deg) translateZ(radius)). The
 * section pins, scroll progress turns the ring through all four builds, and the
 * counter tracks which plate is facing the viewer. Reduced motion gets a flat grid.
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
      gsap.fromTo(
        ring.current,
        { rotateY: 0 },
        {
          rotateY: -270,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=180%',
            pin: stage.current,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!count.current) return
              const step = Math.round(self.progress * (projects.length - 1)) + 1
              count.current.textContent = String(Math.min(step, projects.length)).padStart(2, '0')
            },
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="ribbon" ref={root} aria-label="Selected work in depth">
      <div className="ribbon-stage" ref={stage}>
        <div className="ribbon-head">
          <span className="kicker">03B — Work in depth</span>
          <span className="ribbon-count">
            <span ref={count}>01</span>
            <i>/</i>
            {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        <div className="ribbon-viewport">
          <div className={`ribbon-ring${reduced ? ' is-flat' : ''}`} ref={ring}>
            {projects.map((project, i) => (
              <article
                className="ribbon-card"
                key={project.id}
                style={{ '--i': i }}
                aria-hidden={!reduced}
              >
                <div className="ribbon-art">
                  <ProjectArt id={project.id} />
                </div>
                <div className="ribbon-meta">
                  <span>
                    {project.index} — {project.title}
                  </span>
                  <span>{project.year}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="ribbon-note">
          <span className="status-dot" />
          Scroll to turn the ribbon · four builds, three disciplines
        </p>
      </div>
    </section>
  )
}
