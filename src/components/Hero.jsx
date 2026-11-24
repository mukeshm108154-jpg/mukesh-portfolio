import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sceneState } from '../three/scene-state'
import { scrollToId } from '../lib/scroll'
import Magnetic from './Magnetic'
import { ArrowDown, ArrowUpRight, Download } from './Icons'

gsap.registerPlugin(ScrollTrigger)

const Scene = lazy(() => import('../three/Scene'))
const resumeUrl = `${import.meta.env.BASE_URL}Mukesh-M-Resume.pdf`

export default function Hero() {
  const stage = useRef(null)
  const pin = useRef(null)
  const beat0 = useRef(null)
  const beat1 = useRef(null)
  const beat2 = useRef(null)
  const progressFill = useRef(null)
  const counter = useRef(null)
  const [showScene, setShowScene] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)')
    const update = () => setShowScene(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set([beat1.current, beat2.current], { autoAlpha: 0, y: 50 })

        const trigger = {
          trigger: stage.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.9,
          onUpdate: (self) => {
            sceneState.progress = self.progress
            if (counter.current) {
              const step = self.progress < 0.3 ? '01' : self.progress < 0.66 ? '02' : '03'
              if (counter.current.textContent !== step) counter.current.textContent = step
            }
          },
        }

        const tl = gsap.timeline({ scrollTrigger: trigger })
        tl.to(beat0.current, { autoAlpha: 0, y: -60, duration: 0.2, ease: 'power2.inOut' }, 0.25)
          .to(beat1.current, { autoAlpha: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.34)
          .to(beat1.current, { autoAlpha: 0, y: -60, duration: 0.2, ease: 'power2.inOut' }, 0.62)
          .to(beat2.current, { autoAlpha: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.71)
          .to('.hero-canvas', { opacity: 0.5, duration: 0.28, ease: 'none' }, 0.24)
          .to('.hero-canvas', { opacity: 0.3, duration: 0.24, ease: 'none' }, 0.52)
          .to('.hero-canvas', { opacity: 0.42, duration: 0.2, ease: 'none' }, 0.76)

        gsap.fromTo(progressFill.current, { scaleY: 0 }, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: stage.current, start: 'top top', end: 'bottom bottom', scrub: true },
        })

        gsap.to('.hero-word', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: stage.current, start: 'top top', end: 'bottom bottom', scrub: true },
        })
      })

      mm.add('(max-width: 900px), (prefers-reduced-motion: reduce)', () => {
        sceneState.progress = 0
        gsap.set(beat0.current, { autoAlpha: 1, y: 0 })
      })
    }, pin)

    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => ctx.revert()
  }, [])

  const goWork = (e) => {
    e.preventDefault()
    scrollToId('work')
  }

  return (
    <section id="home" className="hero-stage" ref={stage}>
      <div className="hero-pin" ref={pin}>
        <div className="hero-canvas" aria-hidden>
          {showScene && (
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          )}
        </div>

        <div className={`hero-fallback${showScene ? ' is-hidden' : ''}`} aria-hidden>
          <span className="hf-ring hf-ring--1" />
          <span className="hf-ring hf-ring--2" />
          <span className="hf-ring hf-ring--3" />
          <span className="hf-core">M</span>
          <span className="hf-cross hf-cross--x" />
          <span className="hf-cross hf-cross--y" />
        </div>

        <div className="hero-meta" aria-hidden>
          <span>Portfolio — MM/26</span>
          <span>Front-end · Product · Motion</span>
          <span>12.9716° N, 77.5946° E</span>
        </div>

        <div className="hero-rail" aria-hidden>
          <span className="hero-rail-label">Scroll</span>
          <span className="hero-rail-track">
            <i ref={progressFill} />
          </span>
          <span className="hero-rail-count">
            <b ref={counter}>01</b> / 03
          </span>
        </div>

        <div className="hero-word" aria-hidden>
          MUKESH
        </div>

        <div className="hero-beats">
          <div className="beat beat-0" ref={beat0}>
            <div className="beat-inner">
              <p className="hero-kicker">
                <span className="dot" />
                Independent web developer — Bengaluru
              </p>

              <h1 className="hero-title">
                <span className="hero-name">Mukesh</span>{' '}
                <span className="hero-initial">M.</span>
                <span className="hero-title-note">
                  Independent
                  <br />
                  since 2018
                  <br />
                  <span>Bengaluru, IN</span>
                </span>
              </h1>

              <div className="hero-lower">
                <p className="hero-lede">
                  I build product sites and design systems for teams that care how the details feel.
                  Fast by default. Strange on purpose.
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
              </div>
            </div>
          </div>

          <div className="beat beat-1" ref={beat1}>
            <div className="beat-inner">
              <p className="eyebrow">
                <span>02</span> The work, in one sentence
              </p>
              <h2 className="statement">
                I don’t decorate pages.
                <br />
                I <em>engineer</em> them.
              </h2>
              <div className="hero-proof">
                <div>
                  <strong>08</strong>
                  <span>years shipping for the web</span>
                </div>
                <div>
                  <strong>42</strong>
                  <span>launches, from seed to scale</span>
                </div>
                <div>
                  <strong>98</strong>
                  <span>median Lighthouse score</span>
                </div>
              </div>
              <p className="beat-note">
                Interfaces, systems and motion for product teams from Bengaluru to Berlin.
                No template. No hand-off theatre.
              </p>
            </div>
          </div>

          <div className="beat beat-2" ref={beat2}>
            <div className="beat-inner">
              <p className="eyebrow">
                <span>03</span> Next available — Q1 2027
              </p>
              <h2 className="statement">
                Two slots.
                <br />
                One <em>good</em> problem.
              </h2>
              <p className="hero-lede hero-lede--wide">
                I take on a small number of builds a year, usually as the senior front-end
                partner inside an existing team. Bring the hard part.
              </p>
              <div className="hero-actions">
                <Magnetic>
                  <a className="btn btn--solid" href="mailto:hello@mukesh.design?subject=Project%20enquiry">
                    Start a conversation
                    <ArrowUpRight />
                  </a>
                </Magnetic>
                <a className="link-line" href="#contact" onClick={(e) => { e.preventDefault(); scrollToId('contact') }}>
                  Or read the brief guide
                  <ArrowUpRight />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-foot">
          <span>Independent since 2018 · Previously Arcline, Paperplane</span>
          <span className="hero-foot-mid">
            <i />
            Currently building Sundial v2
          </span>
          <span className="hero-foot-end">
            Scroll to enter
            <ArrowDown />
          </span>
        </div>
      </div>
    </section>
  )
}
