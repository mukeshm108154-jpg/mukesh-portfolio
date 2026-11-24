import { timeline, awards } from '../data/content'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import { Download, ArrowUpRight } from './Icons'

export default function Experience() {
  return (
    <section id="path" className="section experience">
      <div className="section-head">
        <span className="kicker">04 — Path</span>
        <span className="section-note">2018 — 2026, in reverse</span>
      </div>

      <div className="exp-grid">
        <div className="exp-intro">
          <Reveal>
            <h2 className="display">
              Eight years,
              <br />
              four teams,
              <br />
              one <em>obsession.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p>
              I learned this craft in agencies, then in a product studio, then on my own. The
              titles changed. The job did not: make the thing feel inevitable, then make it fast.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <Magnetic>
              <a
                className="btn btn--ghost"
                href={`${import.meta.env.BASE_URL}Mukesh-M-Resume.pdf`}
                download="Mukesh-M-Resume.pdf"
              >
                Download the résumé
                <Download />
              </a>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="awards">
              <span className="micro">Selected recognition</span>
              {awards.map(([name, detail, year]) => (
                <div className="award" key={name}>
                  <span>{name}</span>
                  <span>{detail}</span>
                  <span>{year}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <ol className="timeline">
          {timeline.map((job, i) => (
            <Reveal key={job.years} delay={0.05 * i}>
              <li className="timeline-item">
                <div className="timeline-meta">
                  <span className="timeline-year">{job.years}</span>
                  <span className="timeline-dot" aria-hidden />
                </div>
                <div className="timeline-card">
                  <h3>{job.role}</h3>
                  <p className="timeline-company">{job.company}</p>
                  <p className="timeline-body">{job.body}</p>
                  <ul className="tag-list">
                    {job.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="exp-foot">
        <div>
          <span className="micro">Education</span>
          <p>
            B.E. Computer Science
            <br />
            PES University, Bengaluru · 2014 — 2018
          </p>
        </div>
        <div>
          <span className="micro">Off the clock</span>
          <p>
            Film photography, long Sunday runs,
            <br />
            and a dosa batter I treat like a design system.
          </p>
        </div>
        <div>
          <span className="micro">Elsewhere</span>
          <a className="link-line" href="https://github.com/mukesh-m" target="_blank" rel="noreferrer">
            GitHub — open notes and small tools
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
