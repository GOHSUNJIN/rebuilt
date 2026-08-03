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

const WHO = [
  {
    num: '01',
    title: 'Post-surgery',
    desc: 'Cleared to train but unsure what is safe. We pick the plan up from where your surgeon left off, with progressive loading and weekly checks.',
  },
  {
    num: '02',
    title: 'Long-standing pain',
    desc: 'Niggles that come back every time you push. We find the gap in your capacity and load it properly so it stops being a problem.',
  },
  {
    num: '03',
    title: 'Returning to sport',
    desc: 'Fit enough for daily life but not for your sport yet. We close that gap with sport-specific testing before you go back.',
  },
  {
    num: '04',
    title: 'New to training post-injury',
    desc: 'No idea where to start after an injury. We teach the fundamentals before adding weight so nothing gets aggravated.',
  },
]

const PHASES = [
  { phase: '01', title: 'Protect', desc: 'Calm things down and keep moving whatever still works. Nothing is forced before it is ready.' },
  { phase: '02', title: 'Load', desc: 'Add weight where it is safe and build tolerance deliberately, week by week.' },
  { phase: '03', title: 'Strengthen', desc: 'Close the gap between your good side and your injured side with targeted work.' },
  { phase: '04', title: 'Return', desc: 'Test against your sport or activity, then send you back cleared and confident.' },
]

const PRICING = [
  { name: 'Assessment', length: '45 min', price: 'SGD 120', featured: false },
  { name: 'Single session', length: '60 min', price: 'SGD 150', featured: false },
  { name: 'Block of sessions', length: '60 min', price: 'From SGD 130 / session', featured: true },
]

const FAQS = [
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
]

export default function RehabPage() {
  return (
    <div style={{ fontFamily: 'Archivo,Helvetica,Arial,sans-serif', background: '#0b0c0e', color: '#f2f4f7', minHeight: '100vh' }}>
      <Navbar activePage="rehab" />

      {/* ── Hero ─────────────────────────────────── */}
      <section style={{ position: 'relative', height: 660, overflow: 'hidden', display: 'grid', alignItems: 'end' }}>
        <Image
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1400&q=85"
          alt="Rehab session"
          fill
          priority
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(8,9,11,.95) 0%, rgba(8,9,11,.65) 55%, rgba(8,9,11,.18) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0b0c0e 0%, transparent 45%)' }} />

        <div className="r-px" style={{ position: 'relative', padding: '0 48px 68px', maxWidth: 820 }}>
          <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.28em', marginBottom: 26, marginTop: 0, animation: 'heroIn .7s cubic-bezier(.2,.7,.3,1) both' }}>
            SERVICE 01 · REHABILITATION
          </p>
          <h1
            className="r-h1"
            style={{ fontSize: 84, fontWeight: 800, lineHeight: 0.93, letterSpacing: '-.025em', margin: '0 0 26px', animation: 'heroIn .7s cubic-bezier(.2,.7,.3,1) .12s both' }}
          >
            Back to what<br />you did before.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: '#b3b9c2', maxWidth: 520, margin: '0 0 36px' }}>
            Coached rehabilitation for people coming back from injury or surgery, built around what your body handles today and where you want it to be.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/book?service=rehab" className="btn-gold" style={{ padding: '16px 30px' }}>Book an assessment</Link>
            <Link href="/about#contact" className="btn-outline" style={{ padding: '16px 30px' }}>Ask a question</Link>
          </div>
        </div>

        <span style={{ position: 'absolute', right: 40, bottom: 24, fontSize: 200, fontWeight: 800, lineHeight: 0.85, color: 'rgba(255,255,255,.025)', letterSpacing: '-.06em', userSelect: 'none', fontFamily: 'Archivo,sans-serif' }}>
          01
        </span>
      </section>

      {/* ── Who it's for ────────────────────────── */}
      <FadeIn>
      <section className="r-px" style={{ padding: '88px 48px', borderTop: '1px solid #212429' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-.025em', margin: 0, lineHeight: 0.96 }}>
            Who it&apos;s for.
          </h2>
          <span style={{ font: '11px/1 ui-monospace,Menlo,monospace', letterSpacing: '.2em', color: '#6a7280' }}>
            IF NONE OF THESE FIT, ASK US
          </span>
        </div>
        <div className="r2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#212429' }}>
          {WHO.map(({ num, title, desc }) => (
            <div key={num} className="hover-card" style={{ background: '#0d0f12', padding: '40px 36px', display: 'flex', gap: 24 }}>
              <span style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.16em', flexShrink: 0, paddingTop: 3 }}>{num}</span>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>{title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.72, color: '#a3aab4', margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      </FadeIn>

      {/* ── The four phases ──────────────────────── */}
      <FadeIn>
      <section style={{ background: '#080a0c', borderTop: '1px solid #1e2126', borderBottom: '1px solid #1e2126' }}>
        <div className="r-px" style={{ padding: '88px 48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-.025em', margin: 0, lineHeight: 0.96 }}>
              How it runs.
            </h2>
            <span style={{ font: '11px/1 ui-monospace,Menlo,monospace', letterSpacing: '.2em', color: '#6a7280' }}>
              SAME TESTING AT BOTH ENDS
            </span>
          </div>
          <div className="r4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: '#212429' }}>
            {PHASES.map(({ phase, title, desc }, i) => (
              <div key={phase} className="hover-approach" style={{ background: '#0d0f12', padding: '36px 28px', position: 'relative', overflow: 'hidden' }}>
                <span style={{ position: 'absolute', top: 12, right: 16, fontSize: 76, fontWeight: 800, lineHeight: 1, color: '#141618', letterSpacing: '-.04em', userSelect: 'none', fontFamily: 'Archivo,sans-serif' }}>
                  {phase}
                </span>
                <div style={{ width: 1, height: 36, background: i === 0 ? '#d99e5c' : '#272b32', marginBottom: 30 }} />
                <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.2em', marginTop: 0, marginBottom: 16 }}>
                  PHASE {phase}
                </p>
                <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>{title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.72, color: '#a3aab4', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* ── Pricing ─────────────────────────────── */}
      <FadeIn>
      <section className="r-px" style={{ padding: '88px 48px', borderBottom: '1px solid #212429' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-.025em', margin: 0, lineHeight: 0.96 }}>
            Sessions &amp; pricing.
          </h2>
          <span style={{ font: '11px/1 ui-monospace,Menlo,monospace', letterSpacing: '.2em', color: '#6a7280' }}>
            PAYNOW · CARD · INSURANCE
          </span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ border: '1px solid #212429', minWidth: 560 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1.2fr 160px', padding: '14px 28px', background: '#0d0f12', borderBottom: '1px solid #212429' }}>
              {['SESSION', 'LENGTH', 'FROM', ''].map(h => (
                <span key={h} style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.18em' }}>{h}</span>
              ))}
            </div>
            {PRICING.map(({ name, length, price, featured }, i) => (
              <div
                key={name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.6fr 1fr 1.2fr 160px',
                  padding: '22px 28px',
                  borderBottom: i < PRICING.length - 1 ? '1px solid #1a1d22' : 'none',
                  alignItems: 'center',
                  background: featured ? '#0d0f12' : 'transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {featured && <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#d99e5c', flexShrink: 0 }} />}
                  <span style={{ fontSize: 15, fontWeight: 500, color: '#f2f4f7' }}>{name}</span>
                </div>
                <span style={{ fontSize: 13.5, color: '#7a828e' }}>{length}</span>
                <span style={{ fontSize: 13.5, color: featured ? '#d99e5c' : '#7a828e', fontWeight: featured ? 600 : 400 }}>{price}</span>
                <Link href="/book?service=rehab" className={featured ? 'btn-gold' : 'btn-outline'} style={{ padding: '12px 20px', fontSize: 11 }}>Book</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* ── Case study ──────────────────────────── */}
      <FadeIn>
      <section className="r-px" style={{ padding: '88px 48px', background: '#080a0c', borderBottom: '1px solid #1e2126' }}>
        <div className="r2" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 64, alignItems: 'center' }}>
          <div className="img-zoom" style={{ height: 440, overflow: 'hidden', position: 'relative' }}>
            <Image
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80"
              alt="Training session"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.22em', marginTop: 0, marginBottom: 22 }}>
              CASE STUDY
            </p>
            <h2 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-.02em', margin: '0 0 20px' }}>
              Back on the pitch after ACL reconstruction
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.72, color: '#a3aab4', marginTop: 0, marginBottom: 40 }}>
              A recreational footballer cleared for training eight weeks post-op. Returned to full competitive play at 16 weeks with 94% limb symmetry on single-leg testing.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#212429' }}>
              {[
                { value: '16', suffix: '', label: 'WEEKS' },
                { value: '94', suffix: '%', label: 'LIMB SYMMETRY' },
                { value: '28', suffix: '', label: 'SESSIONS' },
              ].map(({ value, suffix, label }) => (
                <div key={label} style={{ background: '#0d0f12', padding: '26px 22px' }}>
                  <p style={{ fontSize: 44, fontWeight: 800, color: '#d99e5c', margin: '0 0 8px', letterSpacing: '-.03em', lineHeight: 1 }}>
                    {value}{suffix}
                  </p>
                  <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', margin: 0, letterSpacing: '.14em' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* ── FAQ ─────────────────────────────────── */}
      <FadeIn>
      <section className="r-px" style={{ padding: '88px 48px', borderTop: '1px solid #212429' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-.025em', margin: 0, lineHeight: 0.96 }}>
            Common questions.
          </h2>
          <Link href="/about#contact" style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.18em', textDecoration: 'none' }} className="hover-gold">
            CAN&apos;T SEE YOURS? ASK US →
          </Link>
        </div>
        <FAQAccordion items={FAQS} />
      </section>
      </FadeIn>

      {/* ── Bottom CTA ──────────────────────────── */}
      <section className="r-px" style={{ background: '#080a0c', borderTop: '1px solid #1e2126', padding: '100px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ width: 40, height: 2, background: '#d99e5c', margin: '0 auto 32px' }} />
          <h2
            className="r-h2"
            style={{ fontSize: 52, fontWeight: 800, lineHeight: 0.95, letterSpacing: '-.025em', margin: '0 0 22px' }}
          >
            Book your assessment.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: '#a3aab4', margin: '0 0 38px' }}>
            45 minutes. We assess where you are, agree what matters most, and hand you a plan to start that week.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/book?service=rehab" className="btn-gold" style={{ padding: '16px 32px' }}>Book an assessment</Link>
            <Link href="/about#contact" className="btn-outline" style={{ padding: '16px 32px' }}>Ask a question</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
