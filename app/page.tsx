import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Marquee from '@/components/sections/Marquee'
import ReviewsSection from '@/components/sections/ReviewsSection'
import ServiceCarousel from '@/components/ui/ServiceCarousel'

export const metadata: Metadata = {
  title: 'Rebuilt Academy | Rehab, Training & Performance · Singapore',
  description: 'Rebuilt Academy is a Singapore gym for rehabilitation, personal training, sports performance and physiotherapy. One team, one set of notes, three locations at Core Collective.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Rebuilt Academy | Rehab, Training & Performance',
    description: 'One place for rehabilitation, personal training, sports performance and physiotherapy. Three locations across Singapore.',
  },
}

const SERVICES = [
  {
    num: '01',
    title: 'Rehab',
    from: 'from SGD 120',
    href: '/rehab',
    img: '/img/card-rehab.jpg',
    imgPos: 'center top',
    desc: 'For anyone coming back from injury or surgery, working to a plan that starts from where you are right now.',
    tags: ['Post-surgery return to sport', 'Long-standing pain and niggles', 'Working alongside your clinician'],
  },
  {
    num: '02',
    title: 'Strength Training',
    from: 'from SGD 90',
    href: '/strength',
    img: '/img/card-strength.jpg',
    imgPos: 'center 30%',
    desc: 'One to one coaching for people who want structure, technique that holds up, and progress they can see.',
    tags: ['One to one sessions', 'Pairs and small groups', 'Programmes you keep between sessions'],
  },
  {
    num: '03',
    title: 'Sports Performance',
    from: 'from SGD 100',
    href: '/performance',
    img: '/img/card-performance.jpg',
    imgPos: 'center 35%',
    desc: 'For athletes chasing a number: speed, power, change of direction, and the conditioning to repeat it.',
    tags: ['Testing before and after', 'Sport-specific blocks', 'Off-season and in-season plans'],
  },
]


export default function HomePage() {
  return (
    <div style={{ fontFamily: 'Archivo,Helvetica,Arial,sans-serif', background: '#0B0B0B', color: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />

      {/* ── 1. Hero ─────────────────────────────── */}
      <section
        className="r-hero"
        style={{ height: 680, position: 'relative', display: 'grid', alignItems: 'end', background: '#171717', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', animation: 'slowZoom 14s ease both' }}>
          <Image
            src="/img/home-hero.jpg"
            alt="Strength and conditioning training session at Rebuilt Academy"
            fill
            priority
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,10,10,.1) 0%, rgba(10,10,10,.3) 50%, #0B0B0B 100%)' }} />

        <div className="r-hero-content r-px" style={{ position: 'relative', padding: '0 48px 72px', maxWidth: 900 }}>
          <p className="r-hero-label" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.34em', color: 'var(--accent)', marginBottom: 22, marginTop: 0, animation: 'heroIn .7s cubic-bezier(.2,.7,.3,1) both' }}>
            REHAB · TRAINING · PERFORMANCE
          </p>
          <h1
            className="r-h1"
            style={{ fontSize: 96, fontWeight: 800, lineHeight: 0.92, letterSpacing: '-.03em', margin: 0, color: '#ffffff', animation: 'heroIn .7s cubic-bezier(.2,.7,.3,1) 0.14s both' }}
          >
            REBUILT<br />FROM SETBACK<br />TO COMEBACK.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#A5A5A5', marginBottom: 0, marginTop: 28, maxWidth: 460 }}>
            Rehab, training and performance. One team, three locations.
          </p>
          <div className="r-hero-btns" style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
            <Link href="/book" className="btn-gold" style={{ padding: '16px 30px' }}>Book a consult</Link>
            <Link href="/about#contact" style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.18em', textDecoration: 'none', transition: 'color .15s' }} className="hover-gold">
              ASK A QUESTION →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Marquee ─────────────────────────────── */}
      <Marquee />

      {/* ── 2. Stats strip ──────────────────────── */}
      <section style={{ borderBottom: '1px solid #2A2A2A' }}>
        <div className="r3 r-px r-stat-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#2A2A2A' }}>
          {[
            { num: '300+', label: 'Clients coached' },
            { num: '4.9', label: 'Google rating' },
            { num: '2021', label: 'Est. Singapore' },
          ].map(({ num, label }) => (
            <div key={label} className="r-stat-cell" style={{ background: '#0B0B0B', padding: '52px 48px' }}>
              <p className="gradient-gold r-stat-num" style={{ fontSize: 68, fontWeight: 800, lineHeight: 1, letterSpacing: '-.04em', margin: '0 0 10px', fontFamily: 'Archivo,sans-serif' }}>{num}</p>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#A5A5A5', letterSpacing: '.2em', margin: 0 }}>{label.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. What we do ───────────────────────── */}
      <section className="r-px r-section-pad" style={{ padding: '72px 48px', borderBottom: '1px solid #2A2A2A' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <h2 className="r-section-h2" style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-.03em', margin: 0, lineHeight: 0.95 }}>
            What we do.
          </h2>
        </div>
        <ServiceCarousel items={SERVICES} />
      </section>

      {/* ── 4a. Physio — Available Now ──────────── */}
      <section style={{ borderBottom: '1px solid #2A2A2A', background: '#0B0B0B' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }} className="r2">

          {/* Left: content */}
          <div className="r-px" style={{ padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20, borderRight: '1px solid #2A2A2A' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 800, letterSpacing: '-.03em', margin: 0, lineHeight: 0.95 }}>Physiotherapy with<br />Rehab &amp; Beyond.</h2>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: '#A5A5A5', margin: 0, maxWidth: 380 }}>Physiotherapy, rehab and training coordinated from the start. One point of contact, two teams sharing the same notes.</p>
            <Link href="/physio" style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.18em', textDecoration: 'none' }} className="hover-gold">
              BOOK A CONSULT →
            </Link>
            {/* Mobile: partner badge replaces white logo box */}
            <div className="r-partner-mobile" style={{ display: 'none', borderTop: '1px solid #1E1E1E', paddingTop: 20 }}>
              <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.2em', margin: '0 0 14px' }}>PARTNER CLINIC</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Image src="/rnb-favicon.ico" alt="Rehab & Beyond" width={32} height={32} style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', objectFit: 'cover', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-.01em', margin: '0 0 3px', color: '#FFFFFF', lineHeight: 1 }}>Rehab &amp; Beyond</p>
                    <p style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.12em', margin: 0 }}>GOBEYONDREHAB.SG</p>
                  </div>
                </div>
                <a href="https://gobeyondrehab.sg/" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '8px 14px', fontSize: 9, letterSpacing: '.16em', flexShrink: 0, textDecoration: 'none' }}>
                  Visit ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right: R&B logo on white */}
          <div className="r-home-rnb" style={{ background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 380, padding: 48 }}>
            <Image
              src="/rnb-logo.png"
              alt="Rehab & Beyond"
              width={300}
              height={130}
              style={{ objectFit: 'contain', width: '100%', maxWidth: 300, height: 'auto' }}
            />
          </div>

        </div>
      </section>

      {/* ── 4b. Physio — Coming Soon ─────────────── */}
      <section className="r-inhome-section" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid #2A2A2A', minHeight: 620 }}>
        <Image
          src="/img/gym-interior.jpg"
          alt="Rebuilt training facility" fill
          style={{ objectFit: 'cover', objectPosition: 'center 35%', opacity: 0.35 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9,9,13,1) 0%, rgba(9,9,13,.8) 55%, rgba(9,9,13,.3) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--accent)' }} />
        <div className="r-px r-inhome-content" style={{ position: 'relative', padding: '88px 48px', minHeight: 620, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 26 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '11px 26px', border: '1px solid var(--accent)', background: 'rgba(183,240,0,.1)', backdropFilter: 'blur(10px)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'block', flexShrink: 0, animation: 'pulseDot 1.8s ease-in-out infinite' }} />
            <span style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.32em' }}>COMING SOON</span>
          </div>
          <p className="r-inhome-eyebrow" style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.24em', margin: 0 }}>IN-HOUSE PHYSIOTHERAPY · REBUILT ACADEMY</p>
          <h2 style={{ fontSize: 'clamp(44px, 6vw, 80px)', fontWeight: 800, letterSpacing: '-.04em', margin: 0, lineHeight: 0.92, color: '#FFFFFF' }}>
            In-house<br />Physiotherapy.
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#C0C0C0', margin: 0, maxWidth: 480 }}>
            Rebuilt Academy is bringing physiotherapy in-house.<br />Same building, same team, same notes from day one.
          </p>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['No referrals', 'Shared notes', 'One building'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 4, height: 4, background: 'var(--accent)', borderRadius: '50%', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: '#B5B5B5', letterSpacing: '.01em' }}>{item}</span>
              </div>
            ))}
          </div>
          <Link href="/about#contact" className="btn-outline" style={{ fontSize: 11, letterSpacing: '.2em', padding: '14px 30px', marginTop: 6 }}>
            Get in touch →
          </Link>
        </div>
      </section>

      {/* ── 5. Reviews ──────────────────────────── */}
      <ReviewsSection />

      {/* ── 6. Instagram ────────────────────────── */}
      <section style={{ borderBottom: '1px solid #2A2A2A', background: '#111111' }}>
        <div style={{ height: 3, background: 'linear-gradient(90deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }} />
        <div className="r-px r-ig-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '36px 48px', flexWrap: 'wrap', gap: 20 }}>
          <div className="r-ig-content" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <defs>
                <linearGradient id="ig-s" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#f09433"/>
                  <stop offset="40%" stopColor="#dc2743"/>
                  <stop offset="100%" stopColor="#bc1888"/>
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig-s)" strokeWidth="1.75"/>
              <circle cx="12" cy="12" r="4.5" stroke="url(#ig-s)" strokeWidth="1.75"/>
              <circle cx="17.3" cy="6.7" r="1.1" fill="#dc2743"/>
            </svg>
            <div>
              <p style={{ fontSize: 16, fontWeight: 800, margin: '0 0 5px', color: '#FFFFFF', letterSpacing: '-.01em' }}>@rebuiltbysk</p>
              <p style={{ fontSize: 13, color: '#6f7783', margin: 0, lineHeight: 1.5 }}>Training footage, client results and what actually happens inside sessions.</p>
            </div>
          </div>
          <a href="https://www.instagram.com/rebuiltbysk/" target="_blank" rel="noopener noreferrer"
            className="btn-gold" style={{ padding: '13px 26px', fontSize: 11, letterSpacing: '.2em', flexShrink: 0, textDecoration: 'none' }}>
            Follow →
          </a>
        </div>
      </section>

      {/* ── 7. CTA ──────────────────────────────── */}
      <section style={{ borderTop: '1px solid #2A2A2A', background: '#0B0B0B' }}>
        <div className="r2 r-cta-section-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 680 }}>

          {/* Left: content */}
          <div className="r-px r-tall-pad r-cta-section-left" style={{ padding: '80px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid #1E1E1E' }}>
            <div>
              <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.24em', marginTop: 0, marginBottom: 28 }}>
                START WHERE YOU ARE
              </p>
              <h2
                className="r-h1"
                style={{ fontSize: 68, fontWeight: 800, lineHeight: 0.93, letterSpacing: '-.03em', margin: '0 0 24px' }}
              >
                Whatever<br />the starting point.
              </h2>
              <p className="r-cta-body" style={{ fontSize: 15.5, lineHeight: 1.65, color: '#A5A5A5', margin: '0 0 44px', maxWidth: 400 }}>
                Two weeks post-op or chasing a personal best. The first step is the same: an honest look at where you are today.
              </p>

              {/* Decision rows */}
              <div className="r-decision-rows" style={{ display: 'flex', flexDirection: 'column', marginBottom: 44 }}>
                {[
                  { situation: 'Coming back from injury or surgery',    service: 'Rehab',             href: '/rehab' },
                  { situation: 'Want to get stronger or fitter',        service: 'Training',          href: '/strength' },
                  { situation: 'Training seriously for a sport',        service: 'Performance',       href: '/performance' },
                  { situation: 'Have pain or need a physiotherapy assessment', service: 'Physiotherapy', href: '/physio' },
                ].map(({ situation, service, href }, i, arr) => (
                  <Link
                    key={service}
                    href={href}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '18px 0 18px 10px',
                      borderBottom: i < arr.length - 1 ? '1px solid #2A2A2A' : 'none',
                      textDecoration: 'none', gap: 24,
                    }}
                    className="hover-approach"
                  >
                    <span style={{ fontSize: 14.5, color: '#909090', lineHeight: 1.4 }}>{situation}</span>
                    <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.18em', flexShrink: 0 }}>
                      {service.toUpperCase()} →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="r-cta-btns" style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
              <Link href="/book" className="btn-gold" style={{ padding: '14px 28px' }}>Book a consult</Link>
              <Link href="/about#contact" style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.18em', textDecoration: 'none', transition: 'color .15s' }} className="hover-gold">
                ASK A QUESTION →
              </Link>
            </div>
          </div>

          {/* Right: image */}
          <div className="r-hide" style={{ position: 'relative', overflow: 'hidden', minHeight: 500 }}>
            <Image
              src="/img/gym-interior.jpg"
              alt=""
              aria-hidden="true"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
              sizes="50vw"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0B0B0B 0%, transparent 25%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,14,20,.4) 0%, transparent 40%)' }} />
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
