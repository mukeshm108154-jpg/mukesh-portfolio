import Reveal from './Reveal'
import { Download, ArrowUpRight } from './Icons'

const facts = [
  ['Based', 'Bengaluru, India'],
  ['Focus', 'Product sites, systems, motion'],
  ['Working since', '2018 — present'],
  ['Currently', 'Two slots, Q1 2027'],
]

const principles = [
  {
    n: '01',
    title: 'Readable over clever',
    body: 'If an interface needs a caption, it is not finished. I write the copy with the layout, not after it, and I test the sentence before I decorate the box.',
  },
  {
    n: '02',
    title: 'Fast is a feature',
    body: 'Performance budgets are part of the spec. Every build ships against a measured Web Vitals target on a real mid-range phone — not a promise made on a laptop.',
  },
  {
    n: '03',
    title: 'Ship, then refine',
    body: 'A launch is a beginning. I stay for the first real week of traffic, watch the session recordings, and fix what the data finds. Then I hand over the keys properly.',
  },
]

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="section-head">
        <span className="kicker">01 — About</span>
        <span className="section-note">A short version, honestly told</span>
      </div>

      <div className="about-grid">
        <div className="about-lead">
          <Reveal>
            <h2 className="display about-title">
              I build the <em>quiet parts</em> that make a site feel expensive.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="about-copy">
              <p>
                I’m Mukesh — a web developer who has spent eight years between design files and
                production deploys. I work with founders and product teams who have outgrown the
                template and need one person to own the whole surface: the story, the system, the
                motion, and the graph after launch.
              </p>
              <p>
                Most of my work looks simple because the decisions were made early. Type scale,
                tokens, loading behaviour, the sentence above the button. I care about all of it,
                and I stay long enough to see it hold up in the wild.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="about-sign">
              <span className="signature">Mukesh M</span>
              <span className="micro">Bengaluru · 12.9716° N</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="about-aside">
          <aside className="plate">
            <div className="plate-top">
              <span>Fig. 01</span>
              <span>MM / 08</span>
            </div>
            <div className="plate-mark" aria-hidden>
              M<span>.</span>
            </div>
            <div className="plate-rule">
              <i />
              <span>Web developer · independent</span>
            </div>
            <dl className="plate-facts">
              {facts.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <a className="link-line plate-link" href={`${import.meta.env.BASE_URL}Mukesh-M-Resume.pdf`} download="Mukesh-M-Resume.pdf">
              <Download size={14} />
              Résumé, one page
              <ArrowUpRight size={14} />
            </a>
          </aside>
        </Reveal>
      </div>

      <div className="principles">
        {principles.map((p, i) => (
          <Reveal key={p.n} delay={0.05 * i} className="principle">
            <div className="principle-top">
              <span className="principle-n">{p.n}</span>
              <span className="principle-rule" />
            </div>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
