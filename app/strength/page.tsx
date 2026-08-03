import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

export const metadata: Metadata = { title: 'Personal Training' }

export default function StrengthPage() {
  return (
    <div
      style={{
        fontFamily: 'Archivo,Helvetica,Arial,sans-serif',
        background: '#0b0c0e',
        color: '#f2f4f7',
        minHeight: '100vh',
      }}
    >
      {/* Accent strip */}
      <div style={{ height: 5, background: '#42352a' }} />

      <Navbar activePage="strength" />

      {/* ── Hero ────────────────────────────────── */}
      <section
        style={{
          height: 460,
          position: 'relative',
          display: 'grid',
          alignItems: 'end',
          background: '#111316',
        }}
      >
        {/* Hero image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            animation: 'slowZoom 14s ease both',
          }}
        >
          <ImagePlaceholder placeholder="IMG-14 strength session photo" height="100%" />
        </div>

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(10,10,10,.35) 0%, rgba(10,10,10,.55) 45%, #0b0c0e 100%)',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', padding: '0 48px 64px', maxWidth: 780 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '.34em',
              color: '#d99e5c',
              marginBottom: 16,
              marginTop: 0,
            }}
          >
            SERVICE 02
          </p>
          <h1
            style={{
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 0.96,
              letterSpacing: '-.03em',
              marginBottom: 20,
              marginTop: 0,
            }}
          >
            PERSONAL
            <br />
            TRAINING
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: '#b3b9c2',
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            One to one coaching for people who want a plan, honest feedback and progress
            they can point at, whatever shape they start in.
          </p>
        </div>
      </section>

      {/* ── Pricing grid ────────────────────────── */}
      <section style={{ padding: '76px 48px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            background: '#212429',
          }}
        >
          {/* One to one */}
          <div style={{ background: '#0b0c0e', padding: '32px 24px 38px', borderTop: '3px solid #212429' }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: '#98a0aa',
                marginTop: 0,
                marginBottom: 20,
              }}
            >
              One to one
            </p>
            <p
              style={{
                fontSize: 34,
                fontWeight: 800,
                color: '#f2f4f7',
                margin: '0 0 24px',
                letterSpacing: '-.02em',
              }}
            >
              SGD 150
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Programme written for you',
                'Technique coached every set',
                'Progress reviewed as you go',
              ].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 5, height: 1, background: '#d99e5c', display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontSize: 13.5, color: '#b3b9c2' }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/book" className="btn-outline" style={{ padding: '14px 24px', marginTop: 28, display: 'inline-flex' }}>
              Book
            </Link>
          </div>

          {/* Pairs – MOST POPULAR */}
          <div style={{ background: '#0b0c0e', padding: '32px 24px 38px', borderTop: '3px solid #d99e5c' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: '#98a0aa',
                  margin: 0,
                }}
              >
                Pairs
              </p>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                  color: '#d99e5c',
                  border: '1px solid #4a3d2b',
                  padding: '4px 8px',
                }}
              >
                MOST POPULAR
              </span>
            </div>
            <p
              style={{
                fontSize: 34,
                fontWeight: 800,
                color: '#f2f4f7',
                margin: '0 0 24px',
                letterSpacing: '-.02em',
              }}
            >
              SGD 90
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Two people one coach',
                'Same plan shared sessions',
                'Good for partners and siblings',
              ].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 5, height: 1, background: '#d99e5c', display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontSize: 13.5, color: '#b3b9c2' }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/book" className="btn-gold" style={{ padding: '14px 24px', marginTop: 28, display: 'inline-flex' }}>
              Book
            </Link>
          </div>

          {/* Small group */}
          <div style={{ background: '#0b0c0e', padding: '32px 24px 38px', borderTop: '3px solid #212429' }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: '#98a0aa',
                marginTop: 0,
                marginBottom: 20,
              }}
            >
              Small group
            </p>
            <p
              style={{
                fontSize: 34,
                fontWeight: 800,
                color: '#f2f4f7',
                margin: '0 0 24px',
                letterSpacing: '-.02em',
              }}
            >
              SGD 70
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Three to five people',
                'Coached not just supervised',
                'Fixed weekly slots',
              ].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 5, height: 1, background: '#d99e5c', display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontSize: 13.5, color: '#b3b9c2' }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/book" className="btn-outline" style={{ padding: '14px 24px', marginTop: 28, display: 'inline-flex' }}>
              Book
            </Link>
          </div>
        </div>
      </section>

      {/* ── What a block looks like ──────────────── */}
      <section
        style={{
          padding: '76px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}
      >
        {/* Left – timeline */}
        <div>
          <p
            style={{
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '.3em',
              textTransform: 'uppercase',
              color: '#98a0aa',
              marginTop: 0,
              marginBottom: 32,
            }}
          >
            What a block looks like
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              {
                wk: 'WK 1-2',
                desc: 'Week one is about learning the main lifts and finding starting weights that are honest rather than flattering.',
              },
              {
                wk: 'WK 3-6',
                desc: 'The middle weeks add load in small steps, so the jump is never big enough to break your form.',
              },
              {
                wk: 'WK 7-9',
                desc: 'Near the end we back the volume off and let the work show up as strength.',
              },
              {
                wk: 'WK 10',
                desc: 'Then we retest, look at what actually moved, and write the next block from what we find.',
              },
            ].map(({ wk, desc }) => (
              <div
                key={wk}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '72px 1fr',
                  gap: 20,
                  padding: '20px 0',
                  borderTop: '1px solid #1e2126',
                }}
              >
                <span
                  style={{
                    font: '11px/1 ui-monospace,Menlo,monospace',
                    color: '#d99e5c',
                    letterSpacing: '.12em',
                    paddingTop: 3,
                  }}
                >
                  {wk}
                </span>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: '#a3aab4', margin: 0 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <ImagePlaceholder placeholder="IMG-15 barbell photo" height={400} />
      </section>

      {/* ── CTA split ───────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid #212429',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        {/* Left – image */}
        <ImagePlaceholder placeholder="IMG-16 training photo" style={{ minHeight: 340 }} height="100%" />

        {/* Right */}
        <div
          style={{
            background: '#eef1f5',
            color: '#111316',
            padding: '76px 48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: 44, height: 3, background: '#b78a55', marginBottom: 24 }} />
          <h2
            style={{
              fontSize: 46,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-.02em',
              marginBottom: 16,
              marginTop: 0,
              color: '#111316',
            }}
          >
            Train with a purpose.
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: '#5e6570',
              marginTop: 0,
              marginBottom: 30,
            }}
          >
            Every session has a reason behind it, every set has a target, and nothing gets
            added because it looks good on paper.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link
              href="/book"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '15px 28px',
                background: '#111316',
                color: '#f2f4f7',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                transition: 'all .2s ease',
              }}
            >
              Book a session
            </Link>
            <Link
              href="/about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '15px 28px',
                border: '1px solid #b6bcc5',
                color: '#111316',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                transition: 'all .2s ease',
              }}
            >
              Ask a question
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────── */}
      <section style={{ padding: '66px 48px', borderTop: '1px solid #212429' }}>
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
            Common questions
          </span>
          <span
            style={{
              font: '11px/1 ui-monospace,Menlo,monospace',
              letterSpacing: '.2em',
              color: '#6a7280',
            }}
          >
            CAN&apos;T SEE YOURS? ASK US
          </span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 12,
          }}
        >
          {[
            { num: '01', q: 'How often should I train each week?' },
            { num: '02', q: 'Do I need gym experience to start?' },
            { num: '03', q: 'Can we train around an old injury?' },
            { num: '04', q: 'What happens if I miss a session?' },
          ].map(({ num, q }) => (
            <div
              key={num}
              className="hover-faq"
              style={{
                border: '1px solid #1e2126',
                background: '#14161a',
                padding: '26px 20px',
                cursor: 'pointer',
              }}
            >
              <p
                style={{
                  font: '10px/1 ui-monospace,Menlo,monospace',
                  color: '#d99e5c',
                  letterSpacing: '.2em',
                  marginTop: 0,
                  marginBottom: 14,
                }}
              >
                {num}
              </p>
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 500,
                  color: '#f2f4f7',
                  marginTop: 0,
                  marginBottom: 20,
                  lineHeight: 1.4,
                }}
              >
                {q}
              </p>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                  color: '#d99e5c',
                }}
              >
                Read answer
              </span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
