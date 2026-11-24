import { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import useLenis from './lib/useLenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden />
}

function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    document.documentElement.classList.add('has-cursor')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let scale = 1
    let targetScale = 1
    let raf = 0

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
        dot.current.style.opacity = '1'
        ring.current.style.opacity = '1'
      }
      const hot = e.target.closest?.('a, button, [data-cursor], .project-media, .plate, .footer-word')
      targetScale = hot ? 1.9 : 1
    }

    const onLeave = () => {
      if (dot.current) dot.current.style.opacity = '0'
      if (ring.current) ring.current.style.opacity = '0'
    }

    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      scale += (targetScale - scale) * 0.14
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [reduce])

  return (
    <>
      <span className="cursor-dot" ref={dot} aria-hidden />
      <span className="cursor-ring" ref={ring} aria-hidden />
    </>
  )
}

export default function App() {
  useLenis()

  useEffect(() => {
    document.documentElement.classList.add('is-ready')
    return () => document.documentElement.classList.remove('is-ready')
  }, [])

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <div className="grain" aria-hidden />
    </>
  )
}
