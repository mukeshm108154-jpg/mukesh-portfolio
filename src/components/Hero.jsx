import { useEffect, useState } from 'react'
import { scrollToId } from '../lib/scroll'
import Magnetic from './Magnetic'
import MaskReveal from './MaskReveal'
import { ArrowDown, ArrowUpRight, Download } from './Icons'

const resumeUrl = `${import.meta.env.BASE_URL}Mukesh-M-Resume.pdf`

const facts = [
  ['08', 'years on the web'],
  ['42', 'launches shipped'],
  ['04', 'studios before this'],
]

const headlineLines = [
  'Websites with',
  <>
    a <span className="hero-mark">point of view</span>.
  </>,
  <>
    Built to <em>last.</em>
  </>,
]

export default function Hero() {
  const [clock, setClock] = useState('')

  useEffect(() => {
    const tick = () =>
      setClock(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()),
      )
    tick()
    const id = window.setInterval(tick, 30000)
    return () => window.clearInterval(id)
  }, [])

  const goWork = (e) => {
    e.preventDefault()
    scrollToId('work')
  }

  return (
    <section id="home" className="hero">
      <div className="hero-grid" aria-hidden />

      <div className="hero-top">
        <span className="eyebrow">
          <i className="status-dot" />
          Independent web developer
        </span>
        <span className="hero-top-meta">
          Bengaluru, IN
          <span className="hero-top-sep" />
          {clock} IST
        </span>
      </div>

      <div className="hero-main">
        <p className="hero-kicker">Design engineering · Front-end systems · Motion</p>
        <MaskReveal
          as="h1"
          trigger="load"
          className="hero-headline"
          lines={headlineLines}
        />
      </div>

      <div className="hero-bottom">
        <p className="hero-lede">
          I’m Mukesh — a developer who works between the design file and production.
          For teams that have outgrown the template, I build the story, the system and
          the motion as one thing. Fast by default, strange on purpose.
        </p>

        <div className="hero-actions">
          <Magnetic>
            <a className="btn btn--solid" href="#work" onClick={goWork}>
              See selected work
              <ArrowDown />
            </a>
          </Magnetic>
          <Magnetic>
            <a className="btn btn--ghost" href={resumeUrl} download="Mukesh-M-Resume.pdf">
              Download résumé
              <Download />
            </a>
          </Magnetic>
        </div>

        <dl className="hero-facts">
          {facts.map(([value, label]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="hero-foot">
        <a className="hero-scroll" href="#work" onClick={goWork}>
          <span className="hero-scroll-icon">
            <ArrowDown size={14} />
          </span>
          Scroll to selected work
        </a>
        <span className="hero-avail">
          <i className="status-dot" />
          Booking Q1 2027
        </span>
        <span className="hero-note">
          Portfolio — 2018 to 2026
          <ArrowUpRight size={13} />
        </span>
      </div>
    </section>
  )
}
