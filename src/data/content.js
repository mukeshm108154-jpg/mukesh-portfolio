export const nav = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'craft', label: 'Craft', index: '02' },
  { id: 'work', label: 'Work', index: '03' },
  { id: 'path', label: 'Path', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' },
]

export const socials = [
  { label: 'GitHub', handle: '@mukesh-m', href: 'https://github.com/mukesh-m' },
  { label: 'LinkedIn', handle: '/in/mukesh-m', href: 'https://www.linkedin.com/in/mukesh-m' },
  { label: 'X', handle: '@mukesh_m', href: 'https://x.com/mukesh_m' },
  { label: 'Read.cv', handle: '/mukesh', href: 'https://read.cv/mukesh' },
]

export const projects = [
  {
    id: 'sundial',
    index: '01',
    title: 'Sundial',
    discipline: 'Fintech · Product site + onboarding',
    year: '2026',
    tagline: 'Banking that respects your attention.',
    blurb:
      'A challenger bank with a genuinely better product and a site that explained none of it. We rebuilt the story around one promise: money moves at the speed of a decision.',
    role: 'Design engineering, front-end architecture',
    stack: ['Next.js', 'TypeScript', 'Framer Motion', 'Stripe'],
    duration: '14 weeks',
    metrics: [
      ['+38%', 'verified activation'],
      ['1.2s', 'largest paint'],
      ['99', 'Lighthouse, mobile'],
    ],
    challenge:
      'Sundial’s onboarding asked for eleven fields before it showed a single balance. Drop-off sat at 61%. The marketing site was worse: three value props, no proof, and a hero video that took four seconds to say nothing.',
    approach:
      'We cut the application to four decisions, moved KYC behind the first useful screen, and wrote every line of the site around a real customer moment. A live balance preview renders before sign-up. Motion is used only to show cause and effect: a deposit lands, a goal fills, a number moves.',
    result:
      'Activation rose 38% in the first quarter after launch. The onboarding is now the product demo, and the site holds a 99 Lighthouse score on a mid-range Android phone.',
    quote: 'The new site finally sounds like the product. Calm, exact, and on our side.',
    quoteBy: 'Ananya Rao, Head of Product, Sundial',
  },
  {
    id: 'kettle',
    index: '02',
    title: 'Kettle',
    discipline: 'Commerce · Headless storefront',
    year: '2025',
    tagline: 'A coffee shop that smells like the roast.',
    blurb:
      'A specialty roaster selling extraordinary coffee through a theme that felt like a spreadsheet. We made the shop feel like the counter: warm, specific, a little obsessive.',
    role: 'Creative development, commerce UX',
    stack: ['Hydrogen', 'Sanity', 'GSAP', 'Shopify'],
    duration: '10 weeks',
    metrics: [
      ['+52%', 'mobile revenue'],
      ['2.4×', 'subscription starts'],
      ['0.6s', 'interaction latency'],
    ],
    challenge:
      'Kettle ships single-origin lots that change every few weeks. Their theme treated every bag the same. Customers could not taste the difference online, so they bought the cheapest bag or left.',
    approach:
      'Each lot is its own editorial page: farm, altitude, process, roast curve, and a brew recipe written by the roaster. The bag is rendered in the browser, not shot in a studio, so it can change colour with the lot. Subscription is one tap from any coffee page.',
    result:
      'Mobile revenue grew 52% year over year without discounting. Subscription starts more than doubled, and the roaster now sells out of new lots in under a week.',
    quote: 'People arrive for the coffee and stay for the way it is explained.',
    quoteBy: 'Neel Shetty, Founder, Kettle',
  },
  {
    id: 'northline',
    index: '03',
    title: 'Northline',
    discipline: 'Logistics · Operations dashboard',
    year: '2024',
    tagline: 'One screen instead of six.',
    blurb:
      'A freight team ran 14,000 shipments a day across four tabs, two spreadsheets and a group chat. We replaced the lot with one legible command surface.',
    role: 'Product design, front-end lead',
    stack: ['React', 'D3', 'WebSockets', 'Postgres'],
    duration: '20 weeks',
    metrics: [
      ['−41%', 'time to resolve'],
      ['14k', 'shipments a day'],
      ['6→1', 'tools replaced'],
    ],
    challenge:
      'Dispatchers were copying tracking numbers between systems. A delayed container could sit unnoticed for ninety minutes because the alert lived in an inbox nobody owned.',
    approach:
      'We mapped the real decision loop, then built around exceptions, not data volume. The map, the manifest and the message thread share one selection. Live positions stream in without a refresh. Everything is keyboard reachable, because dispatchers do not use mice.',
    result:
      'Median time to resolve an exception fell 41%. The team retired four internal tools and two spreadsheets, and the dashboard now handles the company’s peak season without a new hire.',
    quote: 'It stopped feeling like software and started feeling like the yard.',
    quoteBy: 'Ravi Menon, VP Operations, Northline',
  },
  {
    id: 'folio',
    index: '04',
    title: 'Folio',
    discipline: 'Publishing · Reading platform',
    year: '2023',
    tagline: 'Reading, without the noise.',
    blurb:
      'An independent press with 240 titles and a reading experience buried under cookie banners, carousels and a recommendation engine that had never read a book.',
    role: 'Design systems, front-end',
    stack: ['Astro', 'MDX', 'Postgres', 'Vercel'],
    duration: '12 weeks',
    metrics: [
      ['0.4s', 'LCP on 4G'],
      ['+67%', 'return readers'],
      ['240', 'titles migrated'],
    ],
    challenge:
      'Folio’s catalogue was beautiful and nearly unreadable on a phone. Pages shipped 3.1 MB of JavaScript to display a poem. The team wanted a system they could publish into without calling a developer.',
    approach:
      'A quiet Astro front end, a strict typographic scale, and a small set of MDX blocks that editors can combine. No client-side router. No recommendation carousel. Just the next essay, chosen by an editor, and a reading list that remembers where you stopped.',
    result:
      'LCP dropped to 0.4 seconds on 4G. Return readers rose 67%, and the editorial team has shipped 90 new titles without a single layout bug.',
    quote: 'The site got out of the way. That was the whole brief.',
    quoteBy: 'Meera Joshi, Editor, Folio',
  },
]

export const skills = [
  {
    id: 's1',
    index: '01',
    title: 'Front-end systems',
    lead: 'React, TypeScript, Next.js, Astro',
    body:
      'Component libraries, design tokens and accessible primitives that survive a redesign. I build the boring foundation so the interesting work can move fast.',
    tags: ['React 19', 'TypeScript', 'Next.js', 'Astro', 'Vite', 'Radix'],
  },
  {
    id: 's2',
    index: '02',
    title: 'Motion & 3D',
    lead: 'GSAP, Framer Motion, Three.js',
    body:
      'Scroll choreography, page transitions and WebGL that earns its weight. Every animation is tied to a meaning, a state change or a decision.',
    tags: ['GSAP', 'ScrollTrigger', 'Framer Motion', 'R3F', 'Lenis', 'Shaders'],
  },
  {
    id: 's3',
    index: '03',
    title: 'Backend & data',
    lead: 'Node, Postgres, Prisma, tRPC',
    body:
      'APIs and data models built for the interface that will use them. I stay close to the server so the front end never has to lie about loading states.',
    tags: ['Node', 'Postgres', 'Prisma', 'tRPC', 'Supabase', 'Stripe'],
  },
  {
    id: 's4',
    index: '04',
    title: 'Performance & QA',
    lead: 'Core Web Vitals, Playwright, Sentry',
    body:
      'Budgets from day one, not a rescue mission in week ten. I profile on real devices and write the test that stops the regression coming back.',
    tags: ['Core Web Vitals', 'Playwright', 'Lighthouse CI', 'Sentry', 'A11y'],
  },
  {
    id: 's5',
    index: '05',
    title: 'Design collaboration',
    lead: 'Figma, prototypes, systems',
    body:
      'I work in the file, not just from the screenshot. Tokens, states, edge cases and copy are part of the build, which is why handoff is short and quiet.',
    tags: ['Figma', 'Tokens Studio', 'Prototyping', 'Art direction', 'Copy'],
  },
]

export const timeline = [
  {
    years: '2023 — Now',
    role: 'Independent web developer',
    company: 'Mukesh M Studio · Bengaluru',
    body:
      'Embedded with product teams at Sundial, Northline and Kettle. I lead the front end, write the motion, and stay for the launch graph. Fourteen launches, no redesigns in year one.',
    tags: ['Product sites', 'Design systems', '0→1'],
  },
  {
    years: '2021 — 2023',
    role: 'Front-end lead',
    company: 'Arcline · Product studio',
    body:
      'Led four developers across nine products. Rebuilt the shared design system and cut release time by 40%. Introduced performance budgets and a review culture that outlived me.',
    tags: ['Team lead', 'Design systems', 'Performance'],
  },
  {
    years: '2019 — 2021',
    role: 'Front-end developer',
    company: 'Paperplane Labs · Commerce',
    body:
      'Built twenty-two storefronts for independent brands. Learned that the hardest part of commerce is not the cart; it is the sentence above the button.',
    tags: ['Commerce', 'Accessibility', 'CMS'],
  },
  {
    years: '2018 — 2019',
    role: 'Junior developer',
    company: 'Common Thread · Agency',
    body:
      'Started where everyone should: fixing other people’s forms. Shipped my first production site in month two and my first incident report in month three.',
    tags: ['HTML/CSS', 'JavaScript', 'QA'],
  },
]

export const awards = [
  ['Awwwards', 'Honourable Mention ×2', '2024, 2026'],
  ['CSS Design Awards', 'Best UI Design', '2025'],
  ['HTTP Archive', 'Top 10% performance, IN', '2026'],
]

export const contact = {
  email: 'hello@mukesh.design',
  phone: '+91 98450 21876',
  location: 'Bengaluru, India',
  timezone: 'IST · UTC+5:30',
}
