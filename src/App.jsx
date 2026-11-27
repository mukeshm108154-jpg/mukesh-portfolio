import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import useLenis from './lib/useLenis'
import { initReveals } from './lib/reveals'
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

export default function App() {
  useLenis()

  // All Reveal wrappers share one batched scroll trigger.
  useEffect(() => initReveals(), [])

  useEffect(() => {
    document.documentElement.classList.add('is-ready')
    return () => document.documentElement.classList.remove('is-ready')
  }, [])

  return (
    <>
      <ScrollProgress />
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
    </>
  )
}
