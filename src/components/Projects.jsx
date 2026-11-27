import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { projects } from '../data/content'
import ProjectArt from './ProjectArt'
import CaseStudy from './CaseStudy'
import Reveal from './Reveal'
import { ArrowUpRight } from './Icons'

export default function Projects() {
  const [selectedId, setSelectedId] = useState(null)
  const [hovered, setHovered] = useState(null)
  const preview = useRef(null)

  const selected = projects.find((p) => p.id === selectedId) || null
  const next = selected ? projects[(projects.indexOf(selected) + 1) % projects.length] : null

  // Float the artwork near the pointer, flipping sides near the viewport edge.
  const movePreview = (e) => {
    const el = preview.current
    if (!el) return
    const width = 360
    const x = e.clientX + 28 + width > window.innerWidth ? e.clientX - width - 28 : e.clientX + 28
    const y = Math.min(Math.max(e.clientY - 170, 100), window.innerHeight - 300)
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  return (
    <section id="work" className="section work">
      <div className="section-head">
        <span className="kicker">03 — Selected work</span>
        <span className="section-note">04 of 42 launches · 2023 — 2026</span>
      </div>

      <div className="work-intro">
        <Reveal>
          <h2 className="display">
            Four builds I’d show a <em>stranger.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="work-note">
            <p>
              Product sites, a storefront and one very busy dashboard. Each one had a real
              constraint — a stubborn metric, a small team, a launch date that could not move.
            </p>
            <span className="micro">Open a case study for the problem, the build and the numbers.</span>
          </div>
        </Reveal>
      </div>

      <div
        className="work-index"
        onPointerMove={movePreview}
        onPointerLeave={() => setHovered(null)}
      >
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={0.04 * i}>
            <article
              className="work-item"
              onPointerEnter={() => setHovered(project.id)}
              onFocus={() => setHovered(project.id)}
            >
              <span className="work-no">{project.index}</span>

              <button
                type="button"
                className="work-open"
                onClick={() => setSelectedId(project.id)}
              >
                <h3>{project.title}</h3>
                <span className="work-kind">{project.discipline}</span>
              </button>

              <div className="work-result">
                <strong>{project.metrics[0][0]}</strong>
                <span>{project.metrics[0][1]}</span>
              </div>

              <a
                className="work-live"
                href={`${import.meta.env.BASE_URL}work/index.html?p=${project.id}`}
                target="_blank"
                rel="noreferrer"
              >
                Live build
                <ArrowUpRight size={12} />
              </a>

              <button
                type="button"
                className="work-go"
                onClick={() => setSelectedId(project.id)}
                aria-label={`Open the ${project.title} case study`}
              >
                <ArrowUpRight size={18} />
              </button>

              <div className="work-thumb" aria-hidden>
                <ProjectArt id={project.id} />
              </div>
            </article>
          </Reveal>
        ))}

        <div ref={preview} className={`work-preview${hovered ? ' is-on' : ''}`} aria-hidden>
          {hovered && <ProjectArt id={hovered} />}
        </div>
      </div>

      <div className="work-foot">
        <p>
          The rest? Mostly under NDA. I can walk you through them on a call — including the two
          that did not work.
        </p>
        <a className="link-line" href="mailto:hello@mukesh.design?subject=Walk%20me%20through%20the%20rest">
          Ask for the private deck
          <ArrowUpRight />
        </a>
      </div>

      <AnimatePresence>
        {selected && (
          <CaseStudy
            key={selected.id}
            project={selected}
            next={next}
            onClose={() => setSelectedId(null)}
            onNext={(id) => setSelectedId(id)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
