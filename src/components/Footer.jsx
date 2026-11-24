import { nav, socials, contact } from '../data/content'
import { scrollToId, scrollToTop } from '../lib/scroll'
import { ArrowUpRight, ArrowDown } from './Icons'
import Magnetic from './Magnetic'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="nav-mark">M.</span>
          <p>
            Independent web developer.
            <br />
            Bengaluru, India.
          </p>
        </div>

        <div className="footer-cols">
          <div>
            <span className="micro">Index</span>
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(item.id)
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div>
            <span className="micro">Elsewhere</span>
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
                <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
          <div>
            <span className="micro">Direct</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            <span className="footer-avail">
              <i />
              Booking Q1 2027
            </span>
          </div>
        </div>
      </div>

      <div className="footer-word" aria-hidden>
        MUKESH<span> M.</span>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Mukesh M. All rights reserved.</span>
        <span className="footer-built">React 19 · R3F · GSAP · Lenis · One long weekend</span>
        <Magnetic strength={0.18}>
          <button type="button" className="footer-top-btn" onClick={scrollToTop}>
            Back to top
            <ArrowDown size={14} />
          </button>
        </Magnetic>
      </div>
    </footer>
  )
}
