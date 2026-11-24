import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ProjectArt from './ProjectArt'
import { ArrowRight, ArrowUpRight, Close } from './Icons'
import { lockScroll, unlockScroll } from '../lib/scroll'

export default function CaseStudy({ project, next, onClose, onNext }) {
  const closeRef = useRef(null)

  useEffect(() => {
    lockScroll()
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      unlockScroll()
    }
  }, [onClose])

  return (
    <motion.div
      className="case-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.article
        className="case"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        initial={{ y: 64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="case-bar">
          <span className="micro">
            Case study · {project.index} / 04
          </span>
          <button type="button" className="case-close" onClick={onClose} ref={closeRef}>
            Close
            <Close size={17} />
          </button>
        </div>

        <div className="case-scroll">
          <p className="eyebrow">
            <span>{project.year}</span> {project.discipline}
          </p>
          <h2 id="case-title" className="case-title">
            {project.title}
          </h2>
          <p className="case-tagline">{project.tagline}</p>

          <div className="case-art">
            <ProjectArt id={project.id} />
          </div>

          <div className="case-metrics">
            {project.metrics.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="case-cols">
            <div>
              <h3>
                <span>01</span> The problem
              </h3>
              <p>{project.challenge}</p>
            </div>
            <div>
              <h3>
                <span>02</span> What we built
              </h3>
              <p>{project.approach}</p>
            </div>
            <div>
              <h3>
                <span>03</span> What changed
              </h3>
              <p>{project.result}</p>
            </div>
          </div>

          <blockquote>
            “{project.quote}”
            <cite>{project.quoteBy}</cite>
          </blockquote>

          <div className="case-foot">
            <dl>
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Timeline</dt>
                <dd>{project.duration}</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>{project.stack.join(' · ')}</dd>
              </div>
            </dl>
            <a
              className="btn btn--solid"
              href={`${import.meta.env.BASE_URL}work/?p=${project.id}`}
              target="_blank"
              rel="noreferrer"
            >
              Open the live build
              <ArrowUpRight />
            </a>
          </div>

          <div className="case-next">
            <span className="micro">Next case study</span>
            <button type="button" onClick={() => onNext(next.id)}>
              <span>{next.index} — {next.title}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}
