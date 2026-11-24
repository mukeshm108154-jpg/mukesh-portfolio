import { useEffect, useState } from 'react'
import { contact, socials } from '../data/content'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import { ArrowUpRight, Check, Copy, iconMap } from './Icons'

const initial = { name: '', email: '', type: '', budget: '', message: '' }

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'A name, so I know who I am writing back to.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'That address does not look complete.'
  }
  if (!values.type) errors.type = 'Pick the closest shape.'
  if (values.message.trim().length < 24) errors.message = 'A little more context, please — at least a sentence.'
  return errors
}

export default function Contact() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date()),
      )
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      const first = document.querySelector('.field.has-error input, .field.has-error textarea, .field.has-error select')
      first?.focus()
      return
    }

    const subject = encodeURIComponent(`Project enquiry — ${values.type} — ${values.name.trim()}`)
    const body = encodeURIComponent(
      `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\nProject: ${values.type}\nBudget: ${values.budget || 'To discuss'}\n\n${values.message.trim()}`,
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="section-head">
        <span className="kicker">05 — Contact</span>
        <span className="section-note">Usually a reply within one working day</span>
      </div>

      <div className="contact-grid">
        <div className="contact-lede">
          <Reveal>
            <h2 className="display">
              Let’s make
              <br />
              something
              <br />
              <em>worth keeping.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="contact-copy">
              If you have a product that deserves better than a template — or a front end that has
              quietly become the bottleneck — tell me the hard part. I will tell you honestly
              whether I am the right person.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="contact-details">
              <div className="contact-row">
                <span className="micro">Email</span>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <button type="button" className="copy-btn" onClick={copyEmail} aria-label="Copy email address">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="contact-row">
                <span className="micro">Phone</span>
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
                <span className="contact-note">Calls after 4pm IST</span>
              </div>
              <div className="contact-row">
                <span className="micro">Studio</span>
                <span>{contact.location}</span>
                <span className="contact-clock">{clock} IST</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="contact-social">
              {socials.map((s) => {
                const Icon = iconMap[s.label]
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                    <span>
                      <Icon />
                      {s.label}
                    </span>
                    <ArrowUpRight size={13} />
                  </a>
                )
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="contact-form-wrap">
          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <div className="form-head">
              <h3>Tell me the hard part</h3>
              <span className="micro">No brief, no problem</span>
            </div>

            <div className="form-row">
              <div className={`field${errors.name ? ' has-error' : ''}`}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  value={values.name}
                  onChange={update('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
              </div>

              <div className={`field${errors.email ? ' has-error' : ''}`}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={values.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className={`field${errors.type ? ' has-error' : ''}`}>
                <label htmlFor="type">What is it?</label>
                <select
                  id="type"
                  name="type"
                  value={values.type}
                  onChange={update('type')}
                  aria-invalid={Boolean(errors.type)}
                >
                  <option value="">Choose one</option>
                  <option>Product site</option>
                  <option>Design system</option>
                  <option>Front-end rescue</option>
                  <option>Motion / 3D</option>
                  <option>Something else</option>
                </select>
                {errors.type && <span className="field-error">{errors.type}</span>}
              </div>

              <div className="field">
                <label htmlFor="budget">Budget</label>
                <select id="budget" name="budget" value={values.budget} onChange={update('budget')}>
                  <option value="">To discuss</option>
                  <option>₹5 — 10 lakh</option>
                  <option>₹10 — 20 lakh</option>
                  <option>₹20 lakh +</option>
                </select>
              </div>
            </div>

            <div className={`field${errors.message ? ' has-error' : ''}`}>
              <label htmlFor="message">The hard part</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="What are you trying to change, and by when?"
                value={values.message}
                onChange={update('message')}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && <span className="field-error" id="message-error">{errors.message}</span>}
            </div>

            <div className="form-actions">
              <Magnetic>
                <button className="btn btn--solid" type="submit">
                  Send the brief
                  <ArrowUpRight />
                </button>
              </Magnetic>
              <p className="form-note">
                Opens your email app with everything filled in. Prefer to write directly?{' '}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            </div>

            <div className="form-status" role="status" aria-live="polite">
              {sent && (
                <span>
                  <Check size={14} />
                  Draft opened. Send it from your mail app — I will reply within a day.
                </span>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
