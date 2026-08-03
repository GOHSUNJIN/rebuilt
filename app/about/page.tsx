import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FadeIn from '@/components/ui/FadeIn'
import { SITE } from '@/lib/site'
import ContactForm from '@/components/ui/ContactForm'

export const metadata: Metadata = {
  title: 'About',
  description: 'Rebuilt is a Singapore studio for rehabilitation, personal training and sports performance. One place, one team, one set of notes.',
}

export default function AboutPage() {
  return (
    <div
      style={{
        fontFamily: 'Archivo,Helvetica,Arial,sans-serif',
        background: '#0b0c0e',
        color: '#f2f4f7',
        minHeight: '100vh',
      }}
    >
      <Navbar activePage="about" />

      {/* ── Header ──────────────────────────────── */}
      <section
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #141208 0%, #0b0c0e 65%)',
          borderBottom: '1px solid #212429',
        }}
      >
        <div className="r-px r-px-top" style={{ padding: '88px 48px 0', maxWidth: 1100 }}>
          <p
            style={{
              font: '11px/1 ui-monospace,Menlo,monospace',
              color: '#d99e5c',
              letterSpacing: '.24em',
              marginTop: 0,
              marginBottom: 26,
            }}
          >
            ABOUT REBUILT
          </p>
          <h1
            className="r-h2"
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 0.96,
              letterSpacing: '-.03em',
              marginBottom: 30,
              marginTop: 0,
            }}
          >
            A gym built around getting people back.
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: '#a3aab4',
              maxWidth: 720,
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            Rebuilt started because coming back from an injury usually means being handed
            between a clinic and a gym that never speak to each other. Here it happens in
            one place.
          </p>
        </div>

        {/* Stats */}
        <div
          className="r-stats r-px"
          style={{
            padding: '60px 48px 56px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 40,
          }}
        >
          {[
            { label: 'BASED', value: 'Singapore, one studio' },
            { label: 'OPENED', value: '2022' },
            { label: 'WE DO', value: 'Rehab, personal training, sports performance' },
            { label: 'COMING', value: 'Physiotherapy' },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{ paddingTop: 22, borderTop: '1px solid #1e2126' }}
            >
              <p
                style={{
                  font: '10px/1 ui-monospace,Menlo,monospace',
                  color: '#6f7783',
                  letterSpacing: '.2em',
                  marginTop: 0,
                  marginBottom: 10,
                }}
              >
                {label}
              </p>
              <p style={{ fontSize: 15, color: '#c2c7ce', margin: 0, lineHeight: 1.5 }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Facility photos ──────────────────────── */}
      <section
        className="r3"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          background: '#212429',
          borderBottom: '1px solid #212429',
        }}
      >
        {[
          'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?auto=format&fit=crop&w=800&q=80',
        ].map((src, i) => (
          <div key={i} className="img-zoom" style={{ height: 340, overflow: 'hidden', position: 'relative' }}>
            <Image src={src} alt="Rebuilt studio" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
        ))}
      </section>

      {/* ── The team ────────────────────────────── */}
      <FadeIn>
      <section className="r-px" style={{ padding: '76px 48px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 28,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '.3em',
              textTransform: 'uppercase',
              color: '#98a0aa',
            }}
          >
            The team
          </span>
          <span
            style={{
              font: '11px/1 ui-monospace,Menlo,monospace',
              letterSpacing: '.2em',
              color: '#6a7280',
            }}
          >
            CLICK ANY NAME FOR A FULL BIO
          </span>
        </div>
        <div
          className="r3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            background: '#212429',
          }}
        >
          {/* Coach 1 */}
          <div
            className="hover-border"
            style={{
              border: '1px solid #1e2126',
              cursor: 'pointer',
              transition: 'border-color .2s ease',
            }}
          >
            <div className="img-zoom" style={{ height: 340, overflow: 'hidden', position: 'relative' }}>
              <Image src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80" alt="James Lim" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div style={{ padding: '24px 22px 26px' }}>
              <p
                style={{
                  font: '10px/1 ui-monospace,Menlo,monospace',
                  color: '#d99e5c',
                  letterSpacing: '.2em',
                  marginTop: 0,
                  marginBottom: 10,
                }}
              >
                HEAD OF REHAB
              </p>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 10 }}>
                James Lim
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#a3aab4', margin: 0 }}>
                Registered physiotherapist with 9 years in clinical rehab, specialising in lower limb reconstruction and return-to-sport testing across football and rugby.
              </p>
            </div>
          </div>

          {/* Coach 2 */}
          <div
            className="hover-border"
            style={{
              border: '1px solid #1e2126',
              cursor: 'pointer',
              transition: 'border-color .2s ease',
            }}
          >
            <div className="img-zoom" style={{ height: 340, overflow: 'hidden', position: 'relative' }}>
              <Image src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80" alt="Marcus Tan" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div style={{ padding: '24px 22px 26px' }}>
              <p
                style={{
                  font: '10px/1 ui-monospace,Menlo,monospace',
                  color: '#d99e5c',
                  letterSpacing: '.2em',
                  marginTop: 0,
                  marginBottom: 10,
                }}
              >
                STRENGTH COACH
              </p>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 10 }}>
                Marcus Tan
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#a3aab4', margin: 0 }}>
                Strength and conditioning coach with a background in competitive powerlifting and 7 years coaching athletes from amateur club level to national representation.
              </p>
            </div>
          </div>

          {/* Hiring card */}
          <div
            style={{
              border: '1px solid #1e2126',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                flex: 1,
                background: '#111316',
                display: 'grid',
                placeItems: 'center',
                minHeight: 340,
              }}
            >
              <span
                style={{
                  font: '11px/1 ui-monospace,Menlo,monospace',
                  color: '#2a2e34',
                  letterSpacing: '.2em',
                }}
              >
                PHYSIOTHERAPIST
              </span>
            </div>
            <div style={{ padding: '24px 22px 26px' }}>
              <p
                style={{
                  font: '10px/1 ui-monospace,Menlo,monospace',
                  color: '#4a3d2b',
                  letterSpacing: '.2em',
                  marginTop: 0,
                  marginBottom: 10,
                }}
              >
                COMING SOON
              </p>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 10, color: '#5f6670' }}>
                Physiotherapist
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#4a4f57', margin: 0 }}>
                Joining ahead of the physiotherapy launch.
              </p>
            </div>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* ── Contact form ────────────────────────── */}
      <FadeIn>
      <section
        id="contact"
        className="r2"
        style={{
          borderTop: '1px solid #212429',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        {/* Left – form */}
        <div className="r-px" style={{ padding: '66px 48px', borderRight: '1px solid #212429' }}>
          <ContactForm />
        </div>

        {/* Right */}
        <div>
          {/* Map placeholder */}
          <a
            href={SITE.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              height: 320,
              background: '#111316',
              borderBottom: '1px solid #212429',
              display: 'grid',
              placeItems: 'center',
              textDecoration: 'none',
              transition: 'background .2s ease',
            }}
            className="hover-approach"
          >
            <div style={{ textAlign: 'center' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d99e5c" strokeWidth="1.5" style={{ display: 'block', margin: '0 auto 12px' }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#4a5060', letterSpacing: '.2em', margin: '0 0 8px' }}>
                12 TANJONG PAGAR ROAD
              </p>
              <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#3a3f47', letterSpacing: '.16em', margin: 0 }}>
                OPEN IN MAPS ↗
              </p>
            </div>
          </a>
          <div
            className="r2 r-px"
            style={{
              padding: 48,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 36,
            }}
          >
            {[
              { label: 'STUDIO', value: `${SITE.address.street}\n${SITE.address.city}` },
              {
                label: 'HOURS',
                value: 'Mon-Fri: 7am-9pm\nSaturday: 8am-2pm\nSunday: Closed',
              },
              {
                label: 'CONTACT',
                value: `${SITE.contact.email}\n${SITE.contact.phone}`,
              },
              { label: 'SOCIAL', value: '@rebuiltsg' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p
                  style={{
                    font: '10px/1 ui-monospace,Menlo,monospace',
                    color: '#6f7783',
                    letterSpacing: '.2em',
                    marginTop: 0,
                    marginBottom: 10,
                  }}
                >
                  {label}
                </p>
                {label === 'CONTACT' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <a href={`mailto:${SITE.contact.email}`} style={{ fontSize: 13.5, color: '#a3aab4', textDecoration: 'none' }} className="hover-gold">
                      {SITE.contact.email}
                    </a>
                    <a href={SITE.contact.phoneTel} style={{ fontSize: 13.5, color: '#a3aab4', textDecoration: 'none' }} className="hover-gold">
                      {SITE.contact.phone}
                    </a>
                  </div>
                ) : (
                  <p
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.7,
                      color: '#a3aab4',
                      margin: 0,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* ── Teams & corporate ───────────────────── */}
      <FadeIn>
      <section className="r-px" style={{ borderTop: '1px solid #212429', padding: '66px 48px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 28,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '.3em',
              textTransform: 'uppercase',
              color: '#98a0aa',
            }}
          >
            Teams &amp; corporate
          </span>
          <span
            style={{
              font: '11px/1 ui-monospace,Menlo,monospace',
              letterSpacing: '.2em',
              color: '#6a7280',
            }}
          >
            ENQUIRE FOR RATES
          </span>
        </div>
        <div
          className="r3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: '#212429',
          }}
        >
          {[
            {
              title: 'Sports teams',
              desc: 'Ongoing support for amateur and semi-professional teams, covering conditioning, rehab and return to sport.',
            },
            {
              title: 'Workplaces',
              desc: 'Group sessions and injury screening for companies that want their people to move better and miss less work.',
            },
            {
              title: 'Something else',
              desc: 'If you have a group or partnership in mind that does not fit neatly into the above, get in touch.',
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="hover-card"
              style={{ background: '#14161a', padding: '34px 24px 38px' }}
            >
              <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 0, marginBottom: 14 }}>
                {title}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#a3aab4', margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      </FadeIn>

      <Footer />
    </div>
  )
}
