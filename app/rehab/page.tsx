import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FadeIn from '@/components/ui/FadeIn'
import FAQAccordion from '@/components/ui/FAQAccordion'

export const metadata: Metadata = {
  title: 'Rehab',
  description: 'Coached rehabilitation in Singapore for people coming back from injury or surgery. Post-surgery, long-standing pain and return to sport.',
}

export default function RehabPage() {
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
      <div style={{ height: 5, background: '#2b3742' }} />

      <Navbar activePage="rehab" />

      {/* ── Hero grid ───────────────────────────── */}
      <section
        className="r2"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid #212429',
        }}
      >
        {/* Left */}
        <div className="r-px" style={{ padding: '66px 48px' }}>
          <p
            style={{
              font: '11px/1 ui-monospace,Menlo,monospace',
              color: '#8d95a0',
              letterSpacing: '.2em',
              marginTop: 0,
              marginBottom: 26,
            }}
          >
            HOME / SERVICES / REHAB
          </p>
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
            SERVICE 01
          </p>
          <h1
            className="r-h1"
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 0.94,
              letterSpacing: '-.025em',
              marginBottom: 22,
              marginTop: 0,
            }}
          >
            REHAB
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: '#b3b9c2',
              maxWidth: 480,
              marginBottom: 34,
              marginTop: 0,
            }}
          >
            Coached rehabilitation for people coming back from injury or surgery, built
            around what your body handles today and where you want it to be.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/book?service=rehab" className="btn-gold" style={{ padding: '16px 30px' }}>
              Book an assessment
            </Link>
            <Link href="/about#contact" className="btn-outline" style={{ padding: '16px 30px' }}>
              Ask a question
            </Link>
          </div>
        </div>

        {/* Right */}
        <div style={{ minHeight: 400, overflow: 'hidden', position: 'relative' }}>
          <Image src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80" alt="Rehab session" fill priority style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </section>

      {/* ── Who it's for ────────────────────────── */}
      <FadeIn>
      <section className="r-px" style={{ padding: '76px 48px 56px' }}>
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
            Who it&apos;s for
          </span>
          <span
            style={{
              font: '11px/1 ui-monospace,Menlo,monospace',
              letterSpacing: '.2em',
              color: '#6a7280',
            }}
          >
            IF NONE OF THESE FIT, ASK US
          </span>
        </div>
        <div
          className="r4"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            background: '#212429',
            border: '1px solid #212429',
          }}
        >
          {[
            {
              title: 'Post-surgery',
              desc: 'Cleared to train but unsure what is safe. We pick the plan up from where your surgeon left off.',
            },
            {
              title: 'Long-standing pain',
              desc: 'Niggles that come back every time you push. We find the gap and load it properly.',
            },
            {
              title: 'Returning to sport',
              desc: 'Fit enough for daily life but not for your sport yet. We close that gap with testing.',
            },
            {
              title: 'New to training',
              desc: 'No idea where to start after an injury. We teach the basics before we add any weight.',
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="hover-card"
              style={{ background: '#14161a', padding: '32px 24px' }}
            >
              <h3
                style={{
                  fontSize: 19,
                  fontWeight: 600,
                  marginTop: 0,
                  marginBottom: 14,
                }}
              >
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

      {/* ── How it runs ─────────────────────────── */}
      <FadeIn>
      <section className="r-px" style={{ padding: '0 48px 56px' }}>
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
            How it runs
          </span>
          <span
            style={{
              font: '11px/1 ui-monospace,Menlo,monospace',
              letterSpacing: '.2em',
              color: '#6a7280',
            }}
          >
            SAME TESTING AT BOTH ENDS
          </span>
        </div>
        <div
          className="r4"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            background: '#212429',
          }}
        >
          {[
            {
              phase: 'PHASE 01',
              title: 'Protect',
              desc: 'Calm things down and keep moving whatever still works.',
            },
            {
              phase: 'PHASE 02',
              title: 'Load',
              desc: 'Add weight where it is safe and build tolerance week by week.',
            },
            {
              phase: 'PHASE 03',
              title: 'Strength',
              desc: 'Close the gap between your good side and your injured side.',
            },
            {
              phase: 'PHASE 04',
              title: 'Return',
              desc: 'Test against your sport, then send you back to it.',
            },
          ].map(({ phase, title, desc }) => (
            <div
              key={phase}
              className="hover-card"
              style={{ background: '#14161a', padding: '28px 24px 32px' }}
            >
              <p
                style={{
                  font: '11px/1 ui-monospace,Menlo,monospace',
                  color: '#d99e5c',
                  marginTop: 0,
                  marginBottom: 34,
                  letterSpacing: '.16em',
                }}
              >
                {phase}
              </p>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  marginTop: 0,
                  marginBottom: 12,
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#a3aab4', margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      </FadeIn>

      {/* ── Sessions & pricing ──────────────────── */}
      <FadeIn>
      <section className="r-px" style={{ padding: '0 48px 56px' }}>
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
          Sessions &amp; pricing
        </p>
        <div style={{ overflowX: 'auto' }}>
        <div style={{ border: '1px solid #212429', minWidth: 560 }}>
          {/* Header row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr 1fr 180px',
              padding: '16px 24px',
              borderBottom: '1px solid #212429',
            }}
          >
            {['SESSION', 'LENGTH', 'FROM', ''].map((h) => (
              <span
                key={h}
                style={{
                  font: '11px/1 ui-monospace,Menlo,monospace',
                  color: '#8d95a0',
                  letterSpacing: '.16em',
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {[
            { name: 'Assessment', length: '45 min', price: 'SGD 120', gold: false },
            { name: 'Single session', length: '60 min', price: 'SGD 150', gold: false },
            { name: 'Block of sessions', length: '60 min', price: 'From SGD 130 / session', gold: true },
          ].map(({ name, length, price, gold }) => (
            <div
              key={name}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.4fr 1fr 1fr 180px',
                padding: '20px 24px',
                borderBottom: '1px solid #1a1d22',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 500, color: '#f2f4f7' }}>{name}</span>
              <span style={{ fontSize: 13.5, color: '#a3aab4' }}>{length}</span>
              <span style={{ fontSize: 13.5, color: '#a3aab4' }}>{price}</span>
              <Link
                href="/book?service=rehab"
                className={gold ? 'btn-gold' : 'btn-outline'}
                style={{ padding: '12px 20px', fontSize: 11 }}
              >
                Book
              </Link>
            </div>
          ))}
        </div>
        </div>
      </section>
      </FadeIn>

      {/* ── Common questions ────────────────────── */}
      <FadeIn>
      <section
        className="r-px"
        style={{
          borderTop: '1px solid #212429',
          padding: '66px 48px',
        }}
      >
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
              q: 'Do I need a referral or a scan first?',
              a: 'No referral or scan is needed to start. We can work from your surgical notes or clinic letters if you have them, but most clients come in directly and we carry out our own assessment first.',
            },
            {
              num: '02',
              q: 'Can you work with my physio or surgeon?',
              a: 'Yes, and we actively encourage it. We can liaise directly with your clinician, share session notes, and adjust your programme based on their input at any point during your rehab.',
            },
            {
              num: '03',
              q: 'How soon after surgery can I start?',
              a: 'This depends on the procedure, but for most surgeries we can start non-affected work within days of your operation. We have worked with clients from week one post-ACL, shoulder repair and hip replacement.',
            },
            {
              num: '04',
              q: 'What should I bring to a session?',
              a: 'Comfortable training clothes and trainers. If you have any clinic letters, discharge notes or scan results, bring those too — they help us understand where you are and calibrate the programme accordingly.',
            },
          ]}
        />
      </section>
      </FadeIn>

      {/* ── Case study ──────────────────────────── */}
      <FadeIn>
      <section
        className="r2 r-px"
        style={{
          borderTop: '1px solid #212429',
          background: '#eef1f5',
          color: '#111316',
          padding: '76px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        {/* Left */}
        <div style={{ height: 380, overflow: 'hidden', position: 'relative' }}>
          <Image src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80" alt="Training session" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
        </div>

        {/* Right */}
        <div>
          <p
            style={{
              font: '10px/1 ui-monospace,Menlo,monospace',
              color: '#b78a55',
              letterSpacing: '.2em',
              marginTop: 0,
              marginBottom: 18,
            }}
          >
            CASE STUDY
          </p>
          <h2
            style={{
              fontSize: 38,
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: 16,
              marginTop: 0,
              color: '#111316',
            }}
          >
            Back on the pitch after ACL reconstruction
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: '#5e6570',
              marginTop: 0,
              marginBottom: 28,
            }}
          >
            A recreational footballer cleared for training eight weeks post-op. Returned to full competitive play at 16 weeks with 94% limb symmetry on single-leg testing.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
              background: '#ccd1d8',
              border: '1px solid #ccd1d8',
            }}
          >
            {[
              { value: '16', label: 'Weeks' },
              { value: '94%', label: 'Limb symmetry' },
              { value: '28', label: 'Sessions' },
            ].map(({ value, label }) => (
              <div key={label} style={{ background: '#eef1f5', padding: '20px 16px' }}>
                <p
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: '#111316',
                    margin: '0 0 4px',
                    letterSpacing: '-.02em',
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    font: '10px/1 ui-monospace,Menlo,monospace',
                    color: '#828a95',
                    margin: 0,
                    letterSpacing: '.12em',
                  }}
                >
                  {label}
                </p>
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
