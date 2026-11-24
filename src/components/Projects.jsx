import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { projects } from '../data/content'
import ProjectArt from './ProjectArt'
import CaseStudy from './CaseStudy'
import Reveal from './Reveal'
import { ArrowUpRight, ArrowRight } from './Icons'

export default function Projects() {
  const [selectedId, setSelectedId] = useState(null)
  const selected = projects.find((p) => p.id === selectedId) || null
  const next = selected ? projects[(projects.indexOf(selected) + 1) % projects.length] : null

  return (
    <section id="work" className="section projects">
      <div className="section-head">
        <span className="kicker">03 — Selected work</span>
        <span className="section-note">04 of 42 launches, 2023 — 2026</span>
      </div>

      <div className="projects-head">
        <Reveal>
          <h2 className="display">
            Four builds I’d show a <em>stranger.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="projects-note">
            <p>
              Product sites, a storefront and one very busy dashboard. Each one had a real
              constraint — a stubborn metric, a small team, a launch date that could not move.
            </p>
            <span className="micro">Case studies open in place. Live builds open in a new tab.</span>
          </div>
        </Reveal>
      </div>

      <div className="project-grid">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={0.04 * i} className="project-cell">
            <article className="project">
              <div className="project-media">
                <ProjectArt id={project.id} />
                <div className="project-cover">
                  <span className="project-index">{project.index}</span>
                  <span className="project-year">{project.year}</span>
                </div>
                <button
                  type="button"
                  className="project-case-btn"
                  onClick={() => setSelectedId(project.id)}
                  aria-label={`Read the ${project.title} case study`}
                >
                  Read case study
                  <ArrowUpRight size={15} />
                </button>
              </div>

              <div className="project-body">
                <div className="project-title-row">
                  <h3>
                    <button type="button" onClick={() => setSelectedId(project.id)}>
                      {project.title}
                    </button>
                  </h3>
                  <a
                    className="project-live"
                    href={`${import.meta.env.BASE_URL}work/?p=${project.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live build
                    <ArrowUpRight size={14} />
                  </a>
                </div>
                <p className="project-discipline">{project.discipline}</p>
                <p className="project-blurb">{project.blurb}</p>
                <div className="project-foot">
                  <ul className="tag-list">
                    {project.stack.slice(0, 3).map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="project-arrow"
                    onClick={() => setSelectedId(project.id)}
                    aria-label={`Open ${project.title} case study`}
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="projects-foot">
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
