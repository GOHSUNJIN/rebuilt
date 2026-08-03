import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FadeIn from '@/components/ui/FadeIn'
import FAQAccordion from '@/components/ui/FAQAccordion'

export const metadata: Metadata = {
  title: 'Personal Training',
  description: '1-to-1 personal training in Singapore. Structured programmes, honest coaching and measurable progress for any starting point.',
}

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
        className="r-hero"
        style={{
          height: 460,
          position: 'relative',
          display: 'grid',
          alignItems: 'end',
          background: '#111316',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            animation: 'slowZoom 14s ease both',
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=85"
            alt="Personal training"
            fill priority style={{ objectFit: 'cover' }} sizes="100vw"
          />
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(10,10,10,.35) 0%, rgba(10,10,10,.55) 45%, #0b0c0e 100%)',
          }}
        />

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
            className="r-h1"
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
          <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/book?service=strength" className="btn-gold" style={{ padding: '16px 30px' }}>
              Book a session
            </Link>
            <Link href="/about#contact" className="btn-outline" style={{ padding: '16px 30px' }}>
              Ask a question
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pricing grid ────────────────────────── */}
      <FadeIn>
      <section className="r-px" style={{ padding: '76px 48px' }}>
        <div
          className="r3"
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
            <Link href="/book?service=strength" className="btn-outline" style={{ padding: '14px 24px', marginTop: 28, display: 'inline-flex' }}>
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
            <Link href="/book?service=pairs" className="btn-gold" style={{ padding: '14px 24px', marginTop: 28, display: 'inline-flex' }}>
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
            <Link href="/book?service=strength" className="btn-outline" style={{ padding: '14px 24px', marginTop: 28, display: 'inline-flex' }}>
              Book
            </Link>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* ── What a block looks like ──────────────── */}
      <FadeIn>
      <section
        className="r2 r-px"
        style={{
          padding: '0 48px 76px',
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

        {/* Right – barbell image */}
        <div style={{ height: 400, overflow: 'hidden', position: 'relative' }}>
          <Image src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80" alt="Barbell training" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </section>
      </FadeIn>

      {/* ── CTA split ───────────────────────────── */}
      <FadeIn>
      <section
        className="r2"
        style={{
          borderTop: '1px solid #212429',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        {/* Left – image */}
        <div style={{ minHeight: 340, overflow: 'hidden', position: 'relative' }}>
          <Image src="https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=900&q=80" alt="Training coaching" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
        </div>

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
              href="/book?service=strength"
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
              href="/about#contact"
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
      </FadeIn>

      {/* ── FAQ ─────────────────────────────────── */}
      <FadeIn>
      <section className="r-px" style={{ padding: '66px 48px', borderTop: '1px solid #212429' }}>
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
        <FAQAccordion
          items={[
            {
              num: '01',
              q: 'How often should I train each week?',
              a: 'For most people, two to three sessions per week is the right balance. We factor in your recovery, your schedule and what you are doing outside of these sessions when we write your programme.',
            },
            {
              num: '02',
              q: 'Do I need gym experience to start?',
              a: 'No. We have coached complete beginners through to competitive athletes. If you are new to training, the first few sessions are about learning the basics so that everything that comes after is built on solid ground.',
            },
            {
              num: '03',
              q: 'Can we train around an old injury?',
              a: 'Almost always yes. Old injuries are something we factor into the programme from the start, not something we work around by avoiding. Often they are a reason to train, not a reason not to.',
            },
            {
              num: '04',
              q: 'What happens if I miss a session?',
              a: 'We adjust the programme and carry on. Missing a session does not derail the block — we just pick up where we left off and keep the overall plan intact.',
            },
          ]}
        />
      </section>
      </FadeIn>

      <Footer />
    </div>
  )
}
