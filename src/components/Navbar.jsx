import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, socials, contact } from '../data/content'
import { scrollToId, lockScroll, unlockScroll } from '../lib/scroll'
import Magnetic from './Magnetic'
import { ArrowUpRight, ArrowRight, Close, Menu, iconMap } from './Icons'

const sectionIds = ['home', 'about', 'craft', 'work', 'path', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (open) lockScroll()
    else unlockScroll()
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    window.setTimeout(() => scrollToId(id), 40)
  }

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <a className="nav-brand" href="#home" onClick={go('home')} aria-label="Mukesh M — home">
          <span className="nav-mark">M.</span>
          <span className="nav-brand-text">
            <strong>Mukesh M</strong>
            <span>Web developer</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={go(item.id)}
              className={active === item.id ? 'is-active' : ''}
            >
              <span className="nav-index">{item.index}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <span className="availability">
            <i />
            Booking Q1 ’27
          </span>
          <Magnetic className="nav-cta-wrap">
            <a className="btn btn--solid btn--sm" href="mailto:hello@mukesh.design">
              Start a project
              <ArrowUpRight />
            </a>
          </Magnetic>
          <button
            className="nav-menu"
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menu-top">
              <span className="menu-label">Index — 2026</span>
              <button type="button" className="menu-close" onClick={() => setOpen(false)} aria-label="Close menu">
                Close <Close />
              </button>
            </div>

            <nav className="menu-nav" aria-label="Menu">
              {[{ id: 'home', label: 'Home', index: '00' }, ...nav].map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={go(item.id)}
                  initial={{ y: 48, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 24, opacity: 0 }}
                  transition={{ delay: 0.12 + i * 0.055, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="menu-index">{item.index}</span>
                  <span className="menu-word">{item.label}</span>
                  <ArrowRight size={20} />
                </motion.a>
              ))}
            </nav>

            <div className="menu-foot">
              <div>
                <span className="micro">Say hello</span>
                <a href={`mailto:${contact.email}`} className="menu-mail">
                  {contact.email}
                </a>
              </div>
              <div className="menu-meta">
                <span>{contact.location}</span>
                <span>{contact.timezone}</span>
              </div>
              <div className="menu-social">
                {socials.map((s) => {
                  const Icon = iconMap[s.label]
                  return (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                      <Icon />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
