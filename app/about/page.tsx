import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ImagePlaceholder from '@/components/ImagePlaceholder'

export const metadata: Metadata = { title: 'About' }

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
          background: '#0b0c0e',
          borderBottom: '1px solid #212429',
        }}
      >
        <div style={{ padding: '88px 48px 0', maxWidth: 1100 }}>
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
          style={{
            padding: '60px 48px 56px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 40,
          }}
        >
          {[
            { label: 'BASED', value: 'Singapore, one studio' },
            { label: 'OPENED', value: '[ V-29 · year opened ]' },
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
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          background: '#212429',
          borderBottom: '1px solid #212429',
        }}
      >
        {[20, 21, 22].map((n) => (
          <ImagePlaceholder
            key={n}
            placeholder={`IMG-${n} facility photo`}
            height={340}
            style={{ minHeight: 340 }}
          />
        ))}
      </section>

      {/* ── The team ────────────────────────────── */}
      <section style={{ padding: '76px 48px' }}>
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
            <ImagePlaceholder placeholder="IMG-23 coach 1 photo" height={340} />
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
                [ H-41 · full name ]
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#a3aab4', margin: 0 }}>
                [ T-41 · 20-30 word bio placeholder describing background and specialisms ]
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
            <ImagePlaceholder placeholder="IMG-24 coach 2 photo" height={340} />
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
                [ H-42 · full name ]
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#a3aab4', margin: 0 }}>
                [ T-42 · 20-30 word bio placeholder describing background and specialisms ]
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

      {/* ── Contact form ────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid #212429',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        {/* Left – form */}
        <div style={{ padding: '66px 48px', borderRight: '1px solid #212429' }}>
          <h2
            style={{
              fontSize: 44,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-.02em',
              marginTop: 0,
              marginBottom: 32,
            }}
          >
            Book or ask a question
          </h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input
                type="text"
                placeholder="Your name"
                style={{
                  padding: '14px 16px',
                  background: '#14161a',
                  border: '1px solid #262a30',
                  color: '#f2f4f7',
                  fontSize: 14,
                  fontFamily: 'inherit',
                }}
              />
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  padding: '14px 16px',
                  background: '#14161a',
                  border: '1px solid #262a30',
                  color: '#f2f4f7',
                  fontSize: 14,
                  fontFamily: 'inherit',
                }}
              />
            </div>
            <select
              style={{
                padding: '14px 16px',
                background: '#14161a',
                border: '1px solid #262a30',
                color: '#a3aab4',
                fontSize: 14,
                fontFamily: 'inherit',
              }}
            >
              <option value="">Select a service</option>
              <option value="rehab">Rehab</option>
              <option value="strength">Personal Training</option>
              <option value="performance">Performance</option>
              <option value="physio">Physiotherapy (waitlist)</option>
            </select>
            <textarea
              placeholder="Your question or message"
              rows={5}
              style={{
                padding: '14px 16px',
                background: '#14161a',
                border: '1px solid #262a30',
                color: '#f2f4f7',
                fontSize: 14,
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
            <button
              type="submit"
              className="btn-gold"
              style={{ padding: '15px 28px', alignSelf: 'flex-start' }}
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right */}
        <div>
          <ImagePlaceholder
            placeholder="IMG-25 map placeholder"
            height={320}
            style={{ borderBottom: '1px solid #212429' }}
          />
          <div
            style={{
              padding: 48,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 36,
            }}
          >
            {[
              { label: 'STUDIO', value: '[ V-30 · studio address placeholder ]' },
              {
                label: 'HOURS',
                value: 'Weekdays: [ V-31 ]\nSaturday: [ V-32 ]\nSunday: [ V-33 ]',
              },
              {
                label: 'CONTACT',
                value: '[ V-34 · email ]\n[ V-35 · phone ]',
              },
              { label: 'SOCIAL', value: '[ V-36 · instagram handle ]' },
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Teams & corporate ───────────────────── */}
      <section style={{ borderTop: '1px solid #212429', padding: '66px 48px' }}>
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

      <Footer />
    </div>
  )
}
