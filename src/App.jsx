import { useEffect, useMemo, useState } from 'react'
import Chatbot from './Chatbot.jsx'

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth' })
}

function openGoogleMapsDirections({ originQuery, destinationQuery }) {
  const url = new URL('https://www.google.com/maps/dir/')
  url.searchParams.set('api', '1')
  url.searchParams.set('origin', originQuery)
  url.searchParams.set('destination', destinationQuery)
  url.searchParams.set('travelmode', 'driving')
  window.open(url.toString(), '_blank', 'noopener,noreferrer')
}

export default function App() {
  const [activeSection, setActiveSection] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const navItems = useMemo(
    () => [
      { id: 'why', label: 'Location' },
      { id: 'features', label: 'Amenities' },
      { id: 'testimonials', label: 'Testimonials' },
      { id: 'pricing', label: 'Plots' },
      { id: 'invest', label: 'Why Invest' },
      { id: 'contact', label: 'Contact' },
    ],
    [],
  )

  useEffect(() => {
    const revealEls = Array.from(document.querySelectorAll('.reveal'))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add('visible')
        }
      },
      { threshold: 0.12 },
    )

    for (const el of revealEls) observer.observe(el)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'))

    const onScroll = () => {
      let current = ''
      const y = window.scrollY
      for (const s of sections) {
        if (y >= s.offsetTop - 100) current = s.id
      }
      setActiveSection(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const onDownloadBrief = async () => {
    const { buildBsdProjectBriefPdf } = await import('./briefPdf.js')
    const doc = buildBsdProjectBriefPdf()
    doc.save('bsd-express-city-brief.pdf')
  }

  const mapsOriginQuery = 'BSD Express City, Lucknow'

  return (
    <>
      <nav>
        <div className="container nav-inner">
          <div className="nav-logo">
            BSD <span>Express City</span>
          </div>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(item.id)
                  }}
                  style={{
                    color:
                      activeSection === item.id ? 'var(--gold)' : undefined,
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button className="nav-cta" onClick={() => scrollToId('contact')}>
            Book Site Visit
          </button>
        </div>
      </nav>

      <section id="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-scroll">Scroll to Explore</div>

        <aside className="hero-highlights" aria-label="Project highlights">
          <div className="highlight-card highlight-card--featured">
            <div className="highlight-ring" aria-hidden="true">
              <svg viewBox="0 0 120 120" width="120" height="120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="rgba(201,168,76,0.25)"
                  strokeWidth="1"
                />
                <path
                  id="heroRingPath"
                  fill="none"
                  d="M 60,60 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0"
                />
                <text
                  fontFamily="DM Sans, sans-serif"
                  fontSize="8.5"
                  fill="rgba(201,168,76,0.65)"
                  letterSpacing="2.5"
                >
                  <textPath href="#heroRingPath">
                    LUCKNOW · KANPUR CORRIDOR · PRIME PLOTS ·
                  </textPath>
                </text>
              </svg>
              <span className="highlight-ring-icon">✈</span>
            </div>
            <div className="highlight-body">
              <span className="highlight-kicker">Connectivity</span>
              <div className="highlight-value">
                10<span className="highlight-unit">min</span>
              </div>
              <div className="highlight-label">To Airport</div>
              <div className="highlight-meta">CCS Airport · Elevated road</div>
            </div>
          </div>

          <div className="highlight-row">
            <div className="highlight-card highlight-card--stat">
              <div className="highlight-value highlight-value--sm">4+</div>
              <div className="highlight-label">Plot Sizes</div>
            </div>
            <div className="highlight-card highlight-card--stat">
              <div className="highlight-value highlight-value--sm">24/7</div>
              <div className="highlight-label">Security</div>
            </div>
          </div>

          <button
            type="button"
            className="highlight-cta"
            onClick={() => scrollToId('contact')}
          >
            Invest Now
          </button>
        </aside>

        <div className="container hero-inner">
          <div className="reveal" style={{ position: 'relative', zIndex: 2 }}>
            <div className="hero-tag">
              Lucknow–Kanpur NH &amp; New Expressway Junction
            </div>
            <h1 className="hero-title">
              BSD
              <br />
              <span className="accent">Express</span>
              <br />
              City
            </h1>
            <p className="hero-sub">
              Plotted development positioned along Lucknow&apos;s emerging growth
              corridor — designed for strong connectivity and long-term value.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollToId('contact')}>
                Book Site Visit
              </button>
              <button className="btn-outline" onClick={() => scrollToId('why')}>
                Explore Location
              </button>
              <button className="btn-outline" onClick={onDownloadBrief}>
                Download Brief (PDF)
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>Prime Plots in Lucknow</span>
          <span>✦</span>
          <span>Lucknow–Kanpur NH</span>
          <span>✦</span>
          <span>10 Min From Airport</span>
          <span>✦</span>
          <span>24/7 Security</span>
          <span>✦</span>
          <span>Wide Roads</span>
          <span>✦</span>
          <span>Commercial Complex</span>
          <span>✦</span>
          <span>Cycle Track</span>
          <span>✦</span>
          <span>Pre-Development Pricing</span>
          <span>✦</span>
          <span>Prime Plots in Lucknow</span>
          <span>✦</span>
          <span>Lucknow–Kanpur NH</span>
          <span>✦</span>
          <span>10 Min From Airport</span>
          <span>✦</span>
          <span>24/7 Security</span>
          <span>✦</span>
          <span>Wide Roads</span>
          <span>✦</span>
          <span>Commercial Complex</span>
          <span>✦</span>
          <span>Cycle Track</span>
          <span>✦</span>
          <span>Pre-Development Pricing</span>
          <span>✦</span>
        </div>
      </div>

      <section id="why" className="reveal">
        <div className="container section-inner">
          <div className="why-left">
            <div className="section-tag">Prime Location</div>
            <h2 className="section-title">
              The <span className="accent">Growth</span> Corridor
              <br />
              you can measure
            </h2>
            <p className="why-desc">
              Positioned around the Lucknow–Kanpur corridor with access to key
              transport hubs. Use the live map links to check distances in real time.
            </p>
            <div className="why-grid">
              <div className="why-card">
                <div className="why-card-icon">🛣️</div>
                <div className="why-card-title">Direct highway access</div>
                <div className="why-card-text">
                  Easy movement across Lucknow–Kanpur routes for daily commuting and business travel.
                </div>
              </div>
              <div className="why-card">
                <div className="why-card-icon">🚦</div>
                <div className="why-card-title">Multiple approach roads</div>
                <div className="why-card-text">
                  Diversified entry routes help reduce dependency on a single bottleneck.
                </div>
              </div>
              <div className="why-card">
                <div className="why-card-icon">🌿</div>
                <div className="why-card-title">Planned township layout</div>
                <div className="why-card-text">
                  Wide roads, green belts, and modern utilities designed for predictable growth.
                </div>
              </div>
              <div className="why-card">
                <div className="why-card-icon">🧾</div>
                <div className="why-card-title">Documentation-led process</div>
                <div className="why-card-text">
                  Share your requirement and we&apos;ll guide you through the next steps clearly.
                </div>
              </div>
            </div>
          </div>

          <div className="why-right reveal">
            <div className="location-visual">
              <div className="lv-heading">Connectivity at a Glance</div>
              <ul className="connect-list">
              {[
                {
                  icon: '🚇',
                  name: 'CCS Airport Metro Station',
                  time: '10 MIN',
                  destinationQuery: 'CCS Airport Metro Station, Lucknow',
                },
                {
                  icon: '✈️',
                  name: 'Amausi International Airport',
                  time: '10 MIN',
                  destinationQuery:
                    'Chaudhary Charan Singh International Airport, Lucknow',
                },
                {
                  icon: '🚌',
                  name: 'Alambagh Bus Stand',
                  time: '15 MIN',
                  destinationQuery: 'Alambagh Bus Stand, Lucknow',
                },
                {
                  icon: '🚂',
                  name: 'Charbagh Railway Station',
                  time: '20 MIN',
                  destinationQuery: 'Charbagh Railway Station, Lucknow',
                },
                {
                  icon: '🏨',
                  name: 'Ramada Star Hotel',
                  time: 'Nearby',
                  destinationQuery: 'Ramada Lucknow, Lucknow',
                },
                {
                  icon: '🎡',
                  name: 'Anandi Magic World',
                  time: 'Nearby',
                  destinationQuery: 'Anandi Magic World, Lucknow',
                },
              ].map((item) => (
                <li
                  key={item.name}
                  role="button"
                  tabIndex={0}
                  title="Open live route in Google Maps"
                  onClick={() =>
                    openGoogleMapsDirections({
                      originQuery: mapsOriginQuery,
                      destinationQuery: item.destinationQuery,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ')
                      openGoogleMapsDirections({
                        originQuery: mapsOriginQuery,
                        destinationQuery: item.destinationQuery,
                      })
                  }}
                >
                  <div className="connect-icon">{item.icon}</div>
                  <span className="connect-name">{item.name}</span>
                  <span className="connect-time">{item.time}</span>
                </li>
              ))}
              </ul>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--gray)',
                  marginTop: 20,
                  lineHeight: 1.6,
                }}
              >
                Travel times vary by traffic and route. Click any item to see the live distance on maps.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="features-header reveal">
          <div className="section-tag">Amenities</div>
          <h2 className="section-title">
            Everything <span className="accent">within</span>
            <br />
            your community
          </h2>
        </div>
        <div className="features-grid reveal">
          <div className="feat-card">
            <div className="feat-icon">🏛️</div>
            <div className="feat-name">Main Entry Gate</div>
            <div className="feat-desc">
              Grand, architecturally designed entry gate that makes a statement
              from day one.
            </div>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🛣️</div>
            <div className="feat-name">Wide Roads</div>
            <div className="feat-desc">
              Broad internal roads ensuring smooth traffic flow and a premium
              streetscape.
            </div>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🏬</div>
            <div className="feat-name">Commercial Complex</div>
            <div className="feat-desc">
              Integrated commercial zone bringing daily conveniences right to
              your doorstep.
            </div>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🔐</div>
            <div className="feat-name">24×7 Security</div>
            <div className="feat-desc">
              Round-the-clock security surveillance and professional guards for
              your peace of mind.
            </div>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🏫</div>
            <div className="feat-name">School</div>
            <div className="feat-desc">
              Quality educational institution within the community for your
              children&apos;s bright future.
            </div>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🏥</div>
            <div className="feat-name">Hospital</div>
            <div className="feat-desc">
              Healthcare facility ensuring medical assistance is never far from
              your home.
            </div>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🌳</div>
            <div className="feat-name">Green Areas</div>
            <div className="feat-desc">
              Roadside green belts and parks creating a refreshing, lung-friendly
              environment.
            </div>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🚴</div>
            <div className="feat-name">Cycle Track</div>
            <div className="feat-desc">
              Dedicated cycling lanes promoting a healthy and sustainable
              lifestyle.
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="reveal testimonials">
        <div className="testimonials-header">
          <div className="section-tag">Customer Stories</div>
          <h2 className="section-title">
            Happy <span className="accent">customers</span>
            <br />
            real experiences
          </h2>
          <p className="testimonials-sub">
            A quick look at what buyers say about the location, support, and
            overall experience.
          </p>
          <div className="testimonials-actions">
            <button className="btn-primary" onClick={onDownloadBrief}>
              Download Project Brief (PDF)
            </button>
            <button className="btn-outline" onClick={() => scrollToId('contact')}>
              Share Your Requirement
            </button>
          </div>
        </div>

        <div className="testimonials-grid">
          {[
            {
              name: 'Amit Verma',
              note:
                'Great guidance and transparent process. Location connectivity is the biggest plus.',
              videoId: 'jNQXAC9IVRw',
            },
            {
              name: 'Priya Kapoor',
              note:
                'Clear documentation and a well-planned layout. The team was responsive throughout the booking.',
              videoId: 'tgbNymZ7vqY',
            },
            {
              name: 'Rahul Sharma',
              note:
                'Impressed with the planned layout and amenities. Feeling confident about long-term value.',
              videoId: 'oHg5SJYRHA0',
            },
          ].map((t) => (
            <div key={t.name} className="t-card">
              <div className="t-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${t.videoId}`}
                  title={`Testimonial - ${t.name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="t-body">
                <div className="t-name">{t.name}</div>
                <div className="t-note">{t.note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="reveal">
        <div className="pricing-intro">
          <div className="section-tag">Plot Sizes &amp; Pricing</div>
          <h2 className="section-title">
            Choose your <span className="accent">ideal</span>
            <br />
            plot size
          </h2>
          <p className="pricing-body">
            We offer a range of plot sizes to suit every requirement — from
            compact residential plots to expansive land parcels. All with
            flexible payment plans and secure land registry.
          </p>
          <div className="pricing-perks">
            <div className="perk-item">
              <div className="perk-check">✓</div>
              <span>
                Secure land registry with complete legal ownership rights
              </span>
            </div>
            <div className="perk-item">
              <div className="perk-check">✓</div>
              <span>Flexible payment plans tailored to your budget</span>
            </div>
            <div className="perk-item">
              <div className="perk-check">✓</div>
              <span>
                Early-bird pricing — invest before development boosts prices
              </span>
            </div>
            <div className="perk-item">
              <div className="perk-check">✓</div>
              <span>Best area/sector selections available for early investors</span>
            </div>
          </div>
        </div>
        <div className="pricing-table reveal">
          <div className="pricing-table-title">Available Plot Configurations</div>

          {[
            { area: '1,200 Sq.Ft', meta: 'Residential · Compact' },
            { area: '1,800 Sq.Ft', meta: 'Residential · Standard' },
            { area: '3,000 Sq.Ft', meta: 'Residential · Premium' },
            { area: 'Above 3,000 Sq.Ft', meta: 'Commercial / Villa · Luxury' },
          ].map((row) => (
            <div
              key={row.area}
              className="price-row"
              onClick={() => scrollToId('contact')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') scrollToId('contact')
              }}
            >
              <div>
                <div className="price-area">{row.area}</div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--gray)',
                    marginTop: 4,
                  }}
                >
                  {row.meta}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="price-tag" style={{ color: 'var(--gold)' }}>
                  Enquire for Price
                </div>
                <div className="price-arrow">→</div>
              </div>
            </div>
          ))}

          <div className="pricing-cta">
            <button className="btn-primary" onClick={() => scrollToId('contact')}>
              Get Exclusive Pricing
            </button>
          </div>
        </div>
      </section>

      <section id="invest" className="reveal">
        <div className="section-tag" style={{ justifyContent: 'center' }}>
          Why Invest Now
        </div>
        <h2 className="invest-title">
          Invest{' '}
          <span
            className="accent"
            style={{ color: 'var(--gold)', fontStyle: 'italic' }}
          >
            before development
          </span>{' '}
          &amp; unlock maximum returns
        </h2>
        <p className="invest-sub">
          Once infrastructure is in place, land prices soar. Secure your plot
          today at pre-development pricing and multiply your profits.
        </p>
        <div className="invest-pillars">
          <div className="pillar">
            <div className="pillar-num">01</div>
            <div className="pillar-title">Low Entry, High Returns</div>
            <div className="pillar-text">
              Pre-development prices are a fraction of post-completion values.
              Why pay a premium later when you can invest early?
            </div>
          </div>
          <div className="pillar">
            <div className="pillar-num">02</div>
            <div className="pillar-title">Limited Inventory</div>
            <div className="pillar-text">
              Investors entering at this stage get early-bird pricing and the
              best area/sector selections for maximum gains.
            </div>
          </div>
          <div className="pillar">
            <div className="pillar-num">03</div>
            <div className="pillar-title">Tangible Asset</div>
            <div className="pillar-text">
              Unlike stocks or mutual funds, land offers a solid, appreciating
              asset with complete legal ownership rights.
            </div>
          </div>
        </div>
        <div style={{ marginTop: 56 }}>
          <button className="btn-primary" onClick={() => scrollToId('contact')}>
            Book Site Visit Today
          </button>
        </div>
      </section>

      <section id="contact">
        <div className="contact-left reveal">
          <div className="section-tag">Get in Touch</div>
          <h2 className="section-title">
            Start your <span className="accent">journey</span>
            <br />
            with us
          </h2>
          <p className="contact-intro">
            Get exclusive project details, pricing, and early-bird offers
            directly. Our team will help you find the perfect plot for your
            needs.
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <div className="c-icon">📍</div>
              <div>
                <div className="c-label">Office Address</div>
                <div className="c-value">
                  104, First Floor, JB Metro Height,
                  <br />
                  Near RTO Office &amp; Transport Nagar Metro, Lucknow
                </div>
              </div>
            </div>
            <div className="contact-item">
              <div className="c-icon">✉️</div>
              <div>
                <div className="c-label">Email</div>
                <div className="c-value">
                  info@bsdprojects.in
                  <br />
                  contact@bsdprojects.in
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form reveal">
          <div className="form-title">Book a Site Visit</div>
          <div className="form-sub">
            Fill in your details — we&apos;ll reach out with exclusive pricing
            &amp; offers.
          </div>

          {!submitted ? (
            <form onSubmit={onSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fname">Full Name</label>
                  <input
                    type="text"
                    id="fname"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fmobile">Mobile Number</label>
                  <input
                    type="tel"
                    id="fmobile"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fage">Age</label>
                  <input
                    type="number"
                    id="fage"
                    placeholder="Your age"
                    min="18"
                    max="99"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fcity">City</label>
                  <input
                    type="text"
                    id="fcity"
                    placeholder="Your city"
                    required
                  />
                </div>
                <div className="form-group full">
                  <label htmlFor="fmsg">Message / Query</label>
                  <textarea
                    id="fmsg"
                    placeholder="Any specific requirements or questions?"
                  />
                </div>
                <div className="form-consent">
                  <input type="checkbox" id="fconsent" required />
                  <label
                    htmlFor="fconsent"
                    style={{
                      textTransform: 'none',
                      letterSpacing: 0,
                      fontSize: '0.78rem',
                      color: 'rgba(250,250,248,0.5)',
                    }}
                  >
                    I consent to receiving RCS, WhatsApp, Email or SMS from BSD
                    Projects &amp; I have reviewed and agree to Terms &amp;
                    Privacy Policy.
                  </label>
                </div>
                <button type="submit" className="btn-submit">
                  Submit Enquiry
                </button>
              </div>
            </form>
          ) : (
            <div
              id="form-success"
              style={{
                marginTop: 20,
                padding: 20,
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid var(--gold)',
                color: 'var(--gold)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
              }}
            >
              ✓ Thank you! Our team will contact you shortly with exclusive
              pricing and offers.
            </div>
          )}
        </div>
      </section>

      <footer>
        <div className="footer-logo">
          BSD <span>Express City</span>
        </div>
        <div className="footer-links">
          {navItems.map((item) => (
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
          <a href="#" onClick={(e) => e.preventDefault()}>
            Terms &amp; Conditions
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            Privacy Policy
          </a>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} BSD Projects. All rights reserved.
        </div>
      </footer>

      <Chatbot onOpenContact={() => scrollToId('contact')} />
    </>
  )
}

