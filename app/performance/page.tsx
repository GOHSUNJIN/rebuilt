import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FadeIn from '@/components/ui/FadeIn'
import FAQAccordion from '@/components/ui/FAQAccordion'

export const metadata: Metadata = {
  title: 'Performance',
  description: 'Sports performance training in Singapore. Tested, coached blocks for athletes who need speed, power and the conditioning to repeat it.',
}

export default function PerformancePage() {
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
      <div style={{ height: 5, background: '#26332c' }} />

      <Navbar activePage="performance" />

      {/* ── Hero grid ───────────────────────────── */}
      <section
        className="r2"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid #212429',
        }}
      >
        {/* Left – image */}
        <div style={{ minHeight: 420, overflow: 'hidden', position: 'relative' }}>
          <Image src="https://images.unsplash.com/photo-1519766304817-4f37bda74a26?auto=format&fit=crop&w=900&q=80" alt="Sports performance" fill priority style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
        </div>

        {/* Right */}
        <div className="r-px" style={{ padding: '66px 48px' }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '.34em',
              color: '#d99e5c',
              marginBottom: 18,
              marginTop: 0,
            }}
          >
            SERVICE 03
          </p>
          <h1
            className="r-h2"
            style={{
              fontSize: 54,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-.03em',
              marginBottom: 22,
              marginTop: 0,
            }}
          >
            PERFORMANCE
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: '#b3b9c2',
              maxWidth: 460,
              marginBottom: 34,
              marginTop: 0,
            }}
          >
            Testing, training blocks and retesting for athletes who need speed, power and
            the conditioning to repeat it when it counts.
          </p>
          <Link href="/book?service=performance" className="btn-gold" style={{ padding: '16px 30px' }}>
            Book an assessment
          </Link>
        </div>
      </section>

      {/* ── Programmes ──────────────────────────── */}
      <FadeIn>
      <section className="r-px" style={{ padding: '76px 48px 0' }}>
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
            Programmes
          </span>
          <span
            style={{
              font: '11px/1 ui-monospace,Menlo,monospace',
              letterSpacing: '.2em',
              color: '#6a7280',
            }}
          >
            FIXED LENGTH · MEASURED START AND FINISH
          </span>
        </div>
        <div
          className="r2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 14,
          }}
        >
          {[
            {
              num: '01',
              title: 'Pre-season',
              desc: 'Build the physical capacity needed for the demands of your sport before the season starts.',
              length: '8 weeks', perWeek: '3x / week', format: '1-on-1 coached',
            },
            {
              num: '02',
              title: 'In-season',
              desc: 'Maintain strength and speed without adding fatigue on top of a full match and training schedule.',
              length: 'Ongoing', perWeek: '2x / week', format: '1-on-1 coached',
            },
            {
              num: '03',
              title: 'Return to sport',
              desc: 'Close the gap between gym-fit and sport-fit with testing that proves you are ready to go.',
              length: '6 weeks', perWeek: '3x / week', format: '1-on-1 coached',
            },
            {
              num: '04',
              title: 'Off-season',
              desc: 'Address the deficits the season exposed, and come back bigger, faster and more durable.',
              length: '12 weeks', perWeek: '3x / week', format: '1-on-1 coached',
            },
          ].map(({ num, title, desc, length, perWeek, format }) => (
            <div
              key={num}
              className="hover-faq"
              style={{
                border: '1px solid #1e2126',
                background: '#14161a',
                padding: '32px 24px',
              }}
            >
              <p
                style={{
                  font: '10px/1 ui-monospace,Menlo,monospace',
                  color: '#d99e5c',
                  letterSpacing: '.2em',
                  marginTop: 0,
                  marginBottom: 22,
                }}
              >
                PROGRAMME 0{num}
              </p>
              <h3 style={{ fontSize: 24, fontWeight: 700, marginTop: 0, marginBottom: 12 }}>
                {title}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#a3aab4', margin: '0 0 24px' }}>
                {desc}
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 12,
                  borderTop: '1px solid #1e2126',
                  paddingTop: 20,
                }}
              >
                {[
                  { label: 'Length', val: length },
                  { label: 'Per week', val: perWeek },
                  { label: 'Format', val: format },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <p
                      style={{
                        font: '9px/1 ui-monospace,Menlo,monospace',
                        color: '#6f7783',
                        letterSpacing: '.16em',
                        margin: '0 0 5px',
                      }}
                    >
                      {label.toUpperCase()}
                    </p>
                    <p style={{ fontSize: 13, color: '#a3aab4', margin: 0 }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      </FadeIn>

      {/* ── Test / Train / Retest ───────────────── */}
      <FadeIn>
      <section className="r-px" style={{ padding: '76px 48px 56px' }}>
        <div
          className="r3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            background: '#212429',
          }}
        >
          {[
            {
              num: '01',
              title: 'Test',
              desc: 'Every programme starts with a baseline so we know where you stand before we add anything.',
            },
            {
              num: '02',
              title: 'Train',
              desc: 'Work through the programme with sessions that are planned, not ad-hoc, and tracked across every week.',
            },
            {
              num: '03',
              title: 'Retest',
              desc: 'At the end we run the same tests and compare the numbers, so improvement is measured, not estimated.',
            },
          ].map(({ num, title, desc }) => (
            <div
              key={num}
              style={{ background: '#0b0c0e', padding: '32px 24px 34px' }}
            >
              <p
                style={{
                  font: '11px/1 ui-monospace,Menlo,monospace',
                  color: '#d99e5c',
                  letterSpacing: '.16em',
                  marginTop: 0,
                  marginBottom: 28,
                }}
              >
                0{num}
              </p>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 0, marginBottom: 12 }}>
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

      {/* ── Quote ───────────────────────────────── */}
      <FadeIn>
      <section
        className="r2 r-px"
        style={{
          borderTop: '1px solid #212429',
          padding: '66px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          background: '#111316',
          alignItems: 'center',
        }}
      >
        <blockquote
          style={{
            fontSize: 30,
            lineHeight: 1.35,
            fontWeight: 500,
            letterSpacing: '-.01em',
            color: '#f2f4f7',
            margin: 0,
          }}
        >
          &#8220;My sprint numbers improved by 8% across a 12-week block. More importantly, the testing meant I could actually see it rather than just feel it.&#8221;
        </blockquote>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: '#1e2126',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              fontSize: 20,
              fontWeight: 700,
              color: '#d99e5c',
            }}
          >
            R
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, margin: '0 0 5px', color: '#f2f4f7' }}>
              Reuben Ng
            </p>
            <p
              style={{
                font: '10px/1 ui-monospace,Menlo,monospace',
                color: '#79818c',
                margin: 0,
                letterSpacing: '.14em',
              }}
            >
              RUGBY · SINGAPORE COMBINED SCHOOLS
            </p>
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
              q: 'How is this different from personal training?',
              a: 'Performance work is structured around testing at both ends of the block so improvement is measurable. The focus is on specific athletic qualities — speed, power, conditioning — rather than general fitness or body composition.',
            },
            {
              num: '02',
              q: 'What do you actually test?',
              a: 'Depending on your sport and goals we test sprint speed over 10 and 30 metres, vertical and horizontal power, single-leg strength and sport-specific conditioning. Everything is retested at the end of the block.',
            },
            {
              num: '03',
              q: 'Can you work with my club coach?',
              a: 'Yes. We can share session data, loading parameters and recovery status with your club coach, and time the programme to complement what you are doing in team training.',
            },
            {
              num: '04',
              q: 'Do I need to be at a certain level?',
              a: 'No minimum level is required. We have worked with recreational athletes chasing fitness goals and national-level competitors. The programme is calibrated to where you start, not where we think you should be.',
            },
          ]}
        />
      </section>
      </FadeIn>

      {/* ── CTA ─────────────────────────────────── */}
      <FadeIn>
      <section
        className="r2"
        style={{
          background: '#0e1013',
          borderTop: '1px solid #262a30',
          borderBottom: '1px solid #262a30',
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr',
        }}
      >
        <div
          className="r-px"
          style={{
            padding: '80px 48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: 44, height: 3, background: '#d99e5c', marginBottom: 28 }} />
          <h2
            style={{
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: '-.03em',
              marginBottom: 20,
              marginTop: 0,
            }}
          >
            Ready to test what you have?
          </h2>
          <p
            style={{
              fontSize: 16.5,
              lineHeight: 1.65,
              color: '#a3aab4',
              maxWidth: 480,
              marginBottom: 34,
              marginTop: 0,
            }}
          >
            Every block starts with a baseline. Book an assessment and we will test where you stand before we build anything.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/book?service=performance" className="btn-gold" style={{ padding: '17px 32px' }}>
              Book an assessment
            </Link>
            <Link href="/about#contact" className="btn-outline" style={{ padding: '17px 32px' }}>
              Ask a question
            </Link>
          </div>
        </div>

        <div
          style={{
            borderLeft: '1px solid #1e2126',
            background: '#0b0c0e',
            padding: '88px 48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              font: '10px/1 ui-monospace,Menlo,monospace',
              color: '#6f7783',
              letterSpacing: '.2em',
              marginTop: 0,
              marginBottom: 26,
            }}
          >
            THE PROCESS
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {[
              { num: '01', title: 'Baseline test', desc: 'Sprint, power and strength numbers before we add anything.' },
              { num: '02', title: 'Your programme', desc: 'A block built around the gaps the testing exposed.' },
              { num: '03', title: 'Retest', desc: 'Same tests at the end. Numbers go up or we find out why.' },
            ].map(({ num, title, desc }) => (
              <div key={num} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    border: '1px solid #4a3d2b',
                    color: '#d99e5c',
                    font: '10px/1 ui-monospace,Menlo,monospace',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  {num}
                </span>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 5px', color: '#f2f4f7' }}>{title}</p>
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#a3aab4', margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      <Footer />
    </div>
  )
}
