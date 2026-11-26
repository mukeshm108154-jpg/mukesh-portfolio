import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToId } from '../lib/scroll'
import Magnetic from './Magnetic'
import { ArrowDown, ArrowUpRight, Download } from './Icons'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 100
const resumeUrl = `${import.meta.env.BASE_URL}Mukesh-M-Resume.pdf`
const frameUrl = (index) =>
  `${import.meta.env.BASE_URL}frames/frame-${String(index).padStart(3, '0')}.jpg`

export default function Hero() {
  const stage = useRef(null)
  const film = useRef(null)
  const copy = useRef(null)
  const canvas = useRef(null)
  const fill = useRef(null)
  const counter = useRef(null)
  const frames = useRef([])
  const target = useRef(0)

  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  // Fetch every frame up front; the sequence is drawn from memory as you scroll.
  useEffect(() => {
    frames.current = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = frameUrl(i + 1)
      return img
    })
  }, [])

  // Canvas renderer: cover-fits the current frame and eases toward scroll progress.
  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const ctx = el.getContext('2d')
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    let shown = -1
    let smooth = 0

    const resize = () => {
      const rect = el.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.round(rect.width * dpr))
      height = Math.max(1, Math.round(rect.height * dpr))
      el.width = width
      el.height = height
      shown = -1
    }

    const paint = (index) => {
      const img = frames.current[index]
      if (!img || !img.complete || !img.naturalWidth) return false
      const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight)
      const w = img.naturalWidth * scale
      const h = img.naturalHeight * scale
      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h)
      return true
    }

    const loop = () => {
      const goal = reduceMotion ? 1 : target.current
      smooth += (goal - smooth) * 0.18
      if (Math.abs(goal - smooth) < 0.0006) smooth = goal

      const index = Math.round(smooth * (TOTAL_FRAMES - 1))
      if (index !== shown && paint(index)) {
        shown = index
        if (counter.current) counter.current.textContent = String(index + 1).padStart(3, '0')
        if (fill.current) fill.current.style.transform = `scaleY(${(index + 1) / TOTAL_FRAMES})`
      }
      raf = requestAnimationFrame(loop)
    }

    resize()
    loop()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduceMotion])

  // Scroll drives the film; near the end it dissolves into the hero copy.
  useEffect(() => {
    if (reduceMotion) return

    const trigger = ScrollTrigger.create({
      trigger: stage.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        target.current = self.progress
      },
    })

    const ctx = gsap.context(() => {
      gsap.set(copy.current, { autoAlpha: 0, y: 56 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      })

      // Positions are in timeline seconds; the zero-duration tween at 1 pins the
      // timeline length to 1 so each position equals scroll progress.
      tl.to(film.current, { opacity: 0, scale: 1.06, ease: 'none', duration: 0.14 }, 0.6)
        .to(copy.current, { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.14 }, 0.68)
        .set({}, {}, 1)
    }, stage)

    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      trigger.kill()
      ctx.revert()
    }
  }, [reduceMotion])

  const goWork = (e) => {
    e.preventDefault()
    scrollToId('work')
  }

  return (
    <section id="home" className={`intro${reduceMotion ? ' is-static' : ''}`} ref={stage}>
      <div className="intro-pin">
        <div className="intro-film" ref={film} aria-hidden>
          <canvas className="intro-canvas" ref={canvas} />
          <div className="intro-hud">
            <span>Intro film — MM/26</span>
            <span className="intro-hud-mid">Portfolio · Selected work 2018—2026</span>
            <span>
              Frame <b ref={counter}>001</b> / 100
            </span>
          </div>
          <div className="intro-rail">
            <span className="intro-rail-label">Scroll to play</span>
            <span className="intro-rail-track">
              <i ref={fill} />
            </span>
          </div>
        </div>

        <div className="intro-copy" ref={copy}>
          <p className="hero-kicker">
            <span className="dot" />
            Independent web developer — Bengaluru
          </p>

          <div className="intro-copy-main">
            <h1 className="hero-title">
              <span className="hero-name">Mukesh</span> <span className="hero-initial">M.</span>
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

          <div className="hero-foot">
            <span>Independent since 2018 · Previously Arcline, Paperplane</span>
            <span className="hero-foot-mid">
              <i />
              Currently building Sundial v2
            </span>
            <span className="hero-foot-end">
              <a
                className="link-line"
                href="#work"
                onClick={goWork}
              >
                Skip to the work
              </a>
              <ArrowUpRight />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
