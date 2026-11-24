const bars = [42, 58, 36, 72, 54, 88, 64, 96, 78, 60, 84, 48]

function Sundial() {
  return (
    <div className="art art--sundial">
      <div className="art-chrome">
        <i />
        <i />
        <i />
        <span>sundial.money</span>
      </div>
      <div className="sundial-app">
        <div className="sundial-top">
          <span>Good evening, Asha</span>
          <b>A</b>
        </div>
        <div className="sundial-balance">
          <span>Total balance</span>
          <strong>₹2,48,610</strong>
          <em>+ ₹18,240 this month</em>
        </div>
        <div className="sundial-chart" aria-hidden>
          {bars.map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} className={i === 7 ? 'is-hot' : ''} />
          ))}
        </div>
        <div className="sundial-goal">
          <div>
            <span>Goa, December</span>
            <b>68%</b>
          </div>
          <span className="sundial-track">
            <i />
          </span>
        </div>
      </div>
      <span className="art-caption">Four decisions, then a balance</span>
    </div>
  )
}

function Kettle() {
  return (
    <div className="art art--kettle">
      <span className="kettle-orbit kettle-orbit--1" />
      <span className="kettle-orbit kettle-orbit--2" />
      <div className="kettle-bag">
        <div className="kettle-brand">KETTLE</div>
        <div className="kettle-label">
          <span>Single origin</span>
          <strong>Guji</strong>
          <span>Ethiopia · 1,950 m</span>
          <span>Washed · 250 g</span>
        </div>
        <div className="kettle-rip" />
      </div>
      <div className="kettle-meta">
        <span>Roasted 12 May</span>
        <span>Peach · Jasmine · Honey</span>
      </div>
      <span className="art-caption">A storefront that tastes like the lot</span>
    </div>
  )
}

function Northline() {
  return (
    <div className="art art--northline">
      <div className="north-map" aria-hidden>
        <svg viewBox="0 0 400 260" preserveAspectRatio="none">
          <path d="M16 210 C 80 170, 92 118, 154 108 S 250 150, 306 82 S 356 42, 388 30" />
          <path d="M18 54 C 78 74, 118 40, 172 62 S 268 108, 320 74 S 366 96, 392 128" className="dim" />
          <path d="M44 244 C 96 214, 138 226, 180 194 S 262 196, 300 166 S 354 158, 388 172" className="dim" />
          <circle cx="154" cy="108" r="4.5" />
          <circle cx="306" cy="82" r="4.5" />
          <circle cx="18" cy="54" r="3" className="dim-dot" />
          <circle cx="388" cy="172" r="3" className="dim-dot" />
        </svg>
        <span className="north-label north-label--a">BLR / HUB</span>
        <span className="north-label north-label--b">MAA / 04:12</span>
      </div>
      <div className="north-panel">
        <div className="north-head">
          <span>Live manifest</span>
          <b>14,284</b>
        </div>
        {[
          ['NL-4821', 'In transit', 'On time'],
          ['NL-4822', 'Customs', '2h late'],
          ['NL-4823', 'Delivered', 'On time'],
        ].map(([id, state, status]) => (
          <div className="north-row" key={id}>
            <span>{id}</span>
            <span>{state}</span>
            <b className={status === 'On time' ? '' : 'is-warn'}>{status}</b>
          </div>
        ))}
      </div>
      <span className="art-caption">One surface, every exception in view</span>
    </div>
  )
}

function Folio() {
  return (
    <div className="art art--folio">
      <div className="folio-shelf" aria-hidden>
        <span className="folio-book folio-book--1">
          <em>The Long<br />Afternoon</em>
          <b>FOLIO 018</b>
        </span>
        <span className="folio-book folio-book--2">
          <em>Small<br />Hours</em>
          <b>FOLIO 041</b>
        </span>
        <span className="folio-book folio-book--3">
          <em>Field<br />Notes</em>
          <b>FOLIO 062</b>
        </span>
        <span className="folio-book folio-book--4">
          <em>Salt<br />Water</em>
          <b>FOLIO 089</b>
        </span>
      </div>
      <div className="folio-type">
        <strong>FOLIO</strong>
        <span>240 titles · 0.4s LCP</span>
      </div>
      <span className="art-caption">A publishing system editors can use</span>
    </div>
  )
}

export default function ProjectArt({ id }) {
  if (id === 'sundial') return <Sundial />
  if (id === 'kettle') return <Kettle />
  if (id === 'northline') return <Northline />
  return <Folio />
}
