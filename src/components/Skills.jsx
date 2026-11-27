import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skills } from '../data/content'
import Reveal from './Reveal'
import { Plus } from './Icons'

const steps = [
  ['Week 01–02', 'Read the room', 'Interviews, analytics, a content audit. I write a one-page brief we can argue with before anyone opens Figma.'],
  ['Week 03–09', 'Build in the open', 'A working preview every Friday. Tokens and components first, then the pages, then the motion that makes them legible.'],
  ['Week 10–12', 'Land it', 'Performance pass, accessibility pass, analytics, a handover doc, and two weeks of on-call while the real traffic arrives.'],
]

const ticker = ['React', 'TypeScript', 'Next.js', 'GSAP', 'Three.js', 'Node', 'Postgres', 'Framer Motion', 'Astro', 'Playwright']

export default function Skills() {
  const [open, setOpen] = useState('s1')

  return (
    <section id="craft" className="section skills">
      <div className="section-head">
        <span className="kicker">02 — Craft</span>
        <span className="section-note">Tools, and what I use them for</span>
      </div>

      <div className="skills-grid">
        <div className="skills-intro">
          <Reveal>
            <h2 className="display">
              A toolkit
              <br />
              with <em>opinions.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p>
              I am not loyal to a framework. I am loyal to the result: a page that loads before
              you notice, reads before you squint, and still makes sense to the next developer.
            </p>
            <p>
              Everything below has shipped to production, been maintained by someone else, and
              survived a redesign. That is the only certification I trust.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="skills-note">
              <span className="status-dot" />
              <span>Open to senior front-end and design-engineering contracts.</span>
            </div>
          </Reveal>
        </div>

        <div className="skills-list">
          {skills.map((skill, i) => {
            const isOpen = open === skill.id
            return (
              <Reveal key={skill.id} delay={0.04 * i}>
                <div className={`skill${isOpen ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="skill-button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : skill.id)}
                  >
                    <span className="skill-num">{skill.index}</span>
                    <span className="skill-heading">
                      <span className="skill-title">{skill.title}</span>
                      <span className="skill-lead">{skill.lead}</span>
                    </span>
                    <span className="skill-ghost" aria-hidden>
                      {skill.index}
                    </span>
                    <span className="skill-icon">
                      <Plus size={17} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="skill-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="skill-panel-inner">
                          <p>{skill.body}</p>
                          <ul className="tag-list" aria-label={`${skill.title} tools`}>
                            {skill.tags.map((tag) => (
                              <li key={tag}>{tag}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      <div className="process">
        <div className="process-head">
          <span className="micro">Working rhythm</span>
          <span className="micro">Typically 8 — 14 weeks</span>
        </div>
        <div className="process-grid">
          {steps.map(([week, title, body], i) => (
            <Reveal key={title} delay={0.06 * i} className="process-step">
              <span className="process-week">{week}</span>
              <h3>
                <span>0{i + 1}</span>
                {title}
              </h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="ticker" aria-hidden>
        <div className="ticker-track">
          {[...ticker, ...ticker, ...ticker].map((item, i) => (
            <span key={`${item}-${i}`}>
              {item}
              <i>✳</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
