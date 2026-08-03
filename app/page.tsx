import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FadeIn from '@/components/ui/FadeIn'
import CountUp from '@/components/ui/CountUp'

export const metadata: Metadata = {
  title: 'Rebuilt',
}

const dash = (
  <span style={{ width: 5, height: 1, background: '#d99e5c', display: 'inline-block', flexShrink: 0 }} />
)

const SERVICES = [
  {
    num: '01',
    title: 'Rehab',
    href: '/rehab',
    img: 'https://images.unsplash.com/photo-1649751361457-01d3a696c7e6?auto=format&fit=crop&w=800&q=80',
    desc: 'For anyone coming back from injury or surgery, working to a plan that starts from where you are right now.',
    tags: ['Post-surgery return to sport', 'Long-standing pain and niggles', 'Working alongside your clinician'],
  },
  {
    num: '02',
    title: 'Personal training',
    href: '/strength',
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    desc: 'One to one coaching for people who want structure, technique that holds up, and progress they can see.',
    tags: ['One to one sessions', 'Pairs and small groups', 'Programmes you keep between sessions'],
  },
  {
    num: '03',
    title: 'Performance',
    href: '/performance',
    img: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=800&q=80',
    desc: 'For athletes chasing a number: speed, power, change of direction, and the conditioning to repeat it.',
    tags: ['Testing before and after', 'Sport-specific blocks', 'Off-season and in-season plans'],
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Assess',
    desc: 'We start with what you can do now, what hurts, and what you want to get back to. Everything gets written down.',
  },
  {
    num: '02',
    title: 'Rebuild',
    desc: 'Sessions run to a plan with weekly targets, so progress is earned rather than guessed at.',
  },
  {
    num: '03',
    title: 'Perform',
    desc: 'You leave with the load, the numbers, and the confidence to keep going on your own terms.',
  },
]

const OUTCOMES = [
  {
    label: 'OUTCOME 01',
    heading: 'ACL reconstruction',
    body: 'Client returned to full competitive football having passed all return-to-sport testing criteria at 16 weeks post-surgery.',
    result: 'Back on the pitch',
    time: '16 weeks',
  },
  {
    label: 'OUTCOME 02',
    heading: 'Chronic back pain',
    body: 'Three years of recurring pain resolved through targeted loading and movement retraining across 8 weeks of coaching.',
    result: 'Pain-free training',
    time: '8 weeks',
  },
  {
    label: 'OUTCOME 03',
    heading: 'Shoulder impingement',
    body: 'Competitive swimmer returned to full overhead training after structured shoulder rehab and scapular strengthening.',
    result: 'Return to competition',
    time: '10 weeks',
  },
]

const REVIEWS = [
  {
    stars: '★★★★★',
    text: 'Came in eight weeks post-ACL surgery with no idea what was safe to do. The structured approach and weekly testing meant I could see exactly where I was improving every single session.',
    name: 'Daniel C.',
    role: 'REHAB CLIENT · GOOGLE',
  },
  {
    stars: '★★★★★',
    text: 'I have been training seriously for six years and never had a properly periodised programme until now. The difference in my numbers after one block was significant and actually measurable.',
    name: 'Priya S.',
    role: 'TRAINING CLIENT · GOOGLE',
  },
  {
    stars: '★★★★★',
    text: 'They film your lifts, track every metric and actually adjust the plan when something is not working. It is a completely different standard of coaching to anything I have had before.',
    name: 'Wei Jian T.',
    role: 'TRAINING CLIENT · GOOGLE',
  },
]

export default function HomePage() {
  return (
    <div style={{ fontFamily: 'Archivo,Helvetica,Arial,sans-serif', background: '#0b0c0e', color: '#f2f4f7', minHeight: '100vh' }}>
      <Navbar />

      {/* ── 1. Hero ─────────────────────────────── */}
      <section
        className="r-hero"
        style={{ height: 620, position: 'relative', display: 'grid', alignItems: 'end', background: '#111316', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', animation: 'slowZoom 14s ease both' }}>
          <Image
            src="https://images.unsplash.com/photo-1778828494354-9b717d36dc99?auto=format&fit=crop&w=1400&q=85"
            alt=""
            fill
            priority
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,10,10,.35) 0%, rgba(10,10,10,.55) 45%, #0b0c0e 100%)' }} />
        <div className="r-hero-content r-px" style={{ position: 'relative', padding: '0 48px 60px', maxWidth: 900 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.34em', color: '#d99e5c', marginBottom: 22, marginTop: 0, animation: 'heroIn .7s cubic-bezier(.2,.7,.3,1) both' }}>
            REHAB · TRAINING · PERFORMANCE
          </p>
          <h1
            className="r-h1"
            style={{ fontSize: 88, fontWeight: 800, lineHeight: 0.94, letterSpacing: '-.02em', margin: 0, animation: 'heroIn .7s cubic-bezier(.2,.7,.3,1) 0.14s both' }}
          >
            REBUILT
            <br />STRONGER THAN
            <br />BEFORE.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#b3b9c2', marginBottom: 0, marginTop: 26, maxWidth: 520 }}>
            Rehab, personal training and sports performance under one roof, for anyone who wants to get back to doing what they did before.
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/book" className="btn-gold" style={{ padding: '16px 30px' }}>Book an assessment</Link>
            <Link href="/about#contact" className="btn-outline" style={{ padding: '16px 30px' }}>Ask a question</Link>
          </div>
        </div>
      </section>

      {/* ── 2. What we do ───────────────────────── */}
      <section className="r-px" style={{ padding: '92px 48px', borderTop: '1px solid #212429' }}>
        <FadeIn>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-.03em', margin: 0, lineHeight: 0.95 }}>
              What we do.
            </h2>
            <span style={{ font: '11px/1 ui-monospace,Menlo,monospace', letterSpacing: '.2em', color: '#6a7280' }}>
              THREE SERVICES · ONE SYSTEM
            </span>
          </div>
        </FadeIn>

        <div className="r3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: '#212429' }}>
          {SERVICES.map(({ num, title, href, img, desc, tags }, i) => (
            <FadeIn key={num} delay={i * 110}>
              <div className="hover-card" style={{ background: '#0d0f12', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="img-zoom" style={{ height: 300, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={img} alt={title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(13,15,18,.8) 100%)' }} />
                  <span style={{ position: 'absolute', top: 22, left: 24, font: '11px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.22em' }}>
                    {num}
                  </span>
                </div>
                <div style={{ padding: '26px 28px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 10px' }}>{title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#a3aab4', margin: '0 0 20px', flex: 1 }}>{desc}</p>
                  <div style={{ borderTop: '1px solid #1e2126', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 22 }}>
                    {tags.map(tag => (
                      <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#7a828e' }}>
                        {dash}{tag}
                      </div>
                    ))}
                  </div>
                  <Link href={href} style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.2em', textDecoration: 'none' }} className="hover-gold">
                    EXPLORE →
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── 3. Physio coming soon ───────────────── */}
      <FadeIn>
      <section
        className="r2 r-mx"
        style={{ margin: '0 48px', border: '1px solid #262a30', background: 'linear-gradient(180deg, #121418, #0d0e11)', display: 'grid', gridTemplateColumns: '1.15fr 1fr' }}
      >
        <div style={{ padding: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid #4a3d2b', color: '#d99e5c', fontSize: 10, fontWeight: 600, letterSpacing: '.24em', padding: '7px 12px', marginBottom: 26 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d99e5c', animation: 'pulseDot 1.8s ease-in-out infinite', display: 'inline-block' }} />
            COMING SOON
          </div>
          <h2 style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.02, letterSpacing: '-.02em', margin: '0 0 18px' }}>
            Physiotherapy<br />at Rebuilt
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: '#a3aab4', maxWidth: 440, marginTop: 0, marginBottom: 32 }}>
            Physiotherapy is coming, so assessment, treatment and the strength work that follows will sit in one place instead of being spread across three.
          </p>
          <Link href="/physio" className="btn-gold" style={{ padding: '15px 28px' }}>
            Join the waitlist →
          </Link>
        </div>
        <div className="img-zoom" style={{ minHeight: 330, overflow: 'hidden', position: 'relative' }}>
          <Image src="https://images.unsplash.com/photo-1706353399656-210cca727a33?auto=format&fit=crop&w=800&q=80" alt="Physiotherapy" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </section>
      </FadeIn>

      {/* ── 4. How it works ─────────────────────── */}
      <FadeIn>
      <section className="r-px" style={{ padding: '92px 48px', borderTop: '1px solid #212429' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 24 }}>
          <h2 className="r-h2" style={{ fontSize: 60, fontWeight: 800, letterSpacing: '-.03em', lineHeight: 0.95, margin: 0 }}>
            How it<br />works.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: '#a3aab4', maxWidth: 360, margin: 0 }}>
            Every client starts in the same place — an honest look at where they are right now.
          </p>
        </div>
        <div className="r3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#212429' }}>
          {STEPS.map(({ num, title, desc }) => (
            <div key={num} className="hover-approach" style={{ background: '#0d0f12', padding: '44px 36px', position: 'relative', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', top: 12, right: 20, fontSize: 88, fontWeight: 800, lineHeight: 1, color: '#141618', letterSpacing: '-.04em', userSelect: 'none', fontFamily: 'Archivo,sans-serif' }}>
                {num}
              </span>
              <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.22em', marginTop: 0, marginBottom: 32 }}>
                STEP {num}
              </p>
              <h3 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 14px' }}>{title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.72, color: '#a3aab4', margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>
      </FadeIn>

      {/* ── 5. Reviews ──────────────────────────── */}
      <FadeIn>
      <section className="r-px" style={{ background: '#0e1013', borderTop: '1px solid #212429', borderBottom: '1px solid #212429', padding: '76px 48px' }}>
        <div className="r-reviews" style={{ display: 'grid', gridTemplateColumns: '.8fr 1fr 1fr 1fr', gap: 2, background: '#212429' }}>
          <div style={{ background: '#0b0c0e', padding: '32px 24px 28px', display: 'flex', flexDirection: 'column' }}>
            <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.2em', marginTop: 0, marginBottom: 26 }}>
              GOOGLE REVIEWS
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 18 }}>
              <CountUp
                to={4.9}
                decimals={1}
                style={{ fontSize: 76, fontWeight: 800, lineHeight: 0.82, letterSpacing: '-.04em', color: '#d99e5c' }}
              />
              <span style={{ fontSize: 20, fontWeight: 600, color: '#5f6670' }}>/5</span>
            </div>
            <span style={{ display: 'inline-block', border: '1px dashed #4a3d2b', font: '9px/1 ui-monospace,Menlo,monospace', letterSpacing: '.12em', color: '#79818c', padding: '5px 8px', marginBottom: 20, alignSelf: 'flex-start' }}>
              SCORE PULLS FROM GOOGLE
            </span>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: '#98a0aa', marginTop: 0, flex: 1 }}>
              What people say after training here, pulled straight from our Google reviews and left exactly as written.
            </p>
            <a href="https://www.google.com/search?q=Rebuilt+Singapore+gym+reviews" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: '#d99e5c', marginTop: 20 }} className="hover-gold">
              Read them on Google →
            </a>
          </div>

          {REVIEWS.map(({ stars, text, name, role }) => (
            <div key={name} className="hover-review" style={{ background: '#14161a', padding: '32px 24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.16em' }}>{stars}</span>
              <p style={{ fontSize: 17, lineHeight: 1.5, fontWeight: 500, color: '#e9ecf0', margin: 0, flex: 1 }}>{text}</p>
              <div style={{ display: 'flex', gap: 16, paddingTop: 20, borderTop: '1px solid #262a30', alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1e2126', display: 'grid', placeItems: 'center', flexShrink: 0, fontSize: 14, fontWeight: 700, color: '#d99e5c' }}>
                  {name[0]}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 3px', color: '#f2f4f7' }}>{name}</p>
                  <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#79818c', margin: 0, letterSpacing: '.1em' }}>{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      </FadeIn>

      {/* ── 6. Outcomes ─────────────────────────── */}
      <FadeIn>
      <section className="r-px" style={{ borderTop: '1px solid #212429', padding: '80px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36, flexWrap: 'wrap', gap: 12 }}>
          <span style={{ font: '15px/1 Archivo,sans-serif', fontWeight: 600, letterSpacing: '.3em', textTransform: 'uppercase', color: '#98a0aa' }}>
            Client outcomes
          </span>
          <span style={{ font: '11px/1 ui-monospace,Menlo,monospace', letterSpacing: '.2em', color: '#6a7280' }}>
            REAL RESULTS · REAL TIMELINES
          </span>
        </div>
        <div className="r3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#212429' }}>
          {OUTCOMES.map(({ label, heading, body, result, time }) => (
            <div key={label} className="hover-approach" style={{ background: '#0b0c0e', padding: '36px 32px' }}>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.2em', marginTop: 0, marginBottom: 22 }}>
                {label}
              </p>
              <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 14px' }}>{heading}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#6f7783', margin: '0 0 28px' }}>{body}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid #2a2e34', padding: '9px 14px' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#d99e5c', flexShrink: 0 }} />
                <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#c2c7ce', letterSpacing: '.14em' }}>
                  {result} · {time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      </FadeIn>

      {/* ── 7. CTA ──────────────────────────────── */}
      <FadeIn>
      <section
        className="r-px"
        style={{ background: '#080a0c', borderTop: '1px solid #1e2126', padding: '110px 48px', textAlign: 'center' }}
      >
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ width: 40, height: 2, background: '#d99e5c', margin: '0 auto 36px' }} />
          <h2
            className="r-h1"
            style={{ fontSize: 72, fontWeight: 800, lineHeight: 0.94, letterSpacing: '-.03em', margin: '0 0 26px' }}
          >
            Start where<br />you are.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: '#a3aab4', margin: '0 0 44px' }}>
            Whether you are two weeks post-op or chasing a personal best, the first step is an honest look at where you are today.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/book" className="btn-gold" style={{ padding: '17px 36px' }}>Book an assessment</Link>
            <Link href="/about#contact" className="btn-outline" style={{ padding: '17px 36px' }}>Ask a question</Link>
          </div>
        </div>
      </section>
      </FadeIn>

      <Footer />
    </div>
  )
}
