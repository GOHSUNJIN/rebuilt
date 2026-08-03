import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FadeIn from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Rebuilt',
}

const dash = (
  <span style={{ width: 5, height: 1, background: '#d99e5c', display: 'inline-block', flexShrink: 0 }} />
)

export default function HomePage() {
  return (
    <div
      style={{
        fontFamily: 'Archivo,Helvetica,Arial,sans-serif',
        background: '#0b0c0e',
        color: '#f2f4f7',
        minHeight: '100vh',
      }}
    >
      <Navbar />

      {/* ── 1. Hero ─────────────────────────────── */}
      <section
        style={{
          height: 620,
          position: 'relative',
          display: 'grid',
          alignItems: 'end',
          background: '#111316',
          overflow: 'hidden',
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1778828494354-9b717d36dc99?auto=format&fit=crop&w=1400&q=85"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
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
        <div style={{ position: 'relative', padding: '0 48px 60px', maxWidth: 900 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '.34em',
              color: '#d99e5c',
              marginBottom: 22,
              marginTop: 0,
              animation: 'heroIn .7s cubic-bezier(.2,.7,.3,1) both',
            }}
          >
            REHAB · TRAINING · PERFORMANCE
          </p>
          <h1
            style={{
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 0.94,
              letterSpacing: '-.02em',
              margin: 0,
              animation: 'heroIn .7s cubic-bezier(.2,.7,.3,1) 0.14s both',
            }}
          >
            REBUILT
            <br />
            STRONGER THAN
            <br />
            BEFORE.
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: '#b3b9c2',
              marginBottom: 0,
              marginTop: 26,
              maxWidth: 520,
            }}
          >
            Rehab, personal training and sports performance under one roof, for anyone who
            wants to get back to doing what they did before.
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/book" className="btn-gold" style={{ padding: '16px 30px' }}>
              Book an assessment
            </Link>
            <Link href="/about" className="btn-outline" style={{ padding: '16px 30px' }}>
              Ask a question
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Pillars ──────────────────────────── */}
      <FadeIn>
      <section style={{ padding: '92px 48px', borderTop: '1px solid #212429' }}>
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 32,
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
            What we do
          </span>
          <span
            style={{
              font: '11px/1 ui-monospace,Menlo,monospace',
              letterSpacing: '.2em',
              color: '#6a7280',
            }}
          >
            THREE STAGES · ONE SYSTEM
          </span>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            background: '#212429',
            border: '1px solid #212429',
          }}
        >
          {/* Card 01 – Rehab */}
          <div
            className="hover-card"
            style={{ background: '#14161a', padding: '0 0 36px' }}
          >
            <div style={{ height: 200, overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1649751361457-01d3a696c7e6?auto=format&fit=crop&w=800&q=80" alt="Rehab" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ padding: '28px 24px 0' }}>
            <p
              style={{
                font: '11px/1 ui-monospace,Menlo,monospace',
                color: '#d99e5c',
                marginBottom: 18,
                marginTop: 0,
              }}
            >
              01
            </p>
            <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 14, marginTop: 0 }}>
              Rehab
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: '#a3aab4', marginTop: 0 }}>
              For anyone coming back from injury or surgery, working to a plan that starts
              from where you are right now.
            </p>
            <div style={{ borderTop: '1px solid #262a30', marginTop: 4, display: 'flex', flexDirection: 'column' }}>
              {[
                'Post-surgery return to sport',
                'Long-standing pain and niggles',
                'Working alongside your clinician',
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 11,
                    padding: '11px 0',
                    fontSize: 13.5,
                    color: '#b3b9c2',
                    borderBottom: '1px solid #1a1d22',
                  }}
                >
                  {dash}
                  {item}
                </div>
              ))}
            </div>
            </div>
          </div>

          {/* Card 02 – Personal Training */}
          <div
            className="hover-card"
            style={{
              background: '#14161a',
              padding: '0 0 36px',
              animation: 'revIn .6s ease 0.09s both',
            }}
          >
            <div style={{ height: 200, overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80" alt="Personal Training" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ padding: '28px 24px 0' }}>
            <p
              style={{
                font: '11px/1 ui-monospace,Menlo,monospace',
                color: '#d99e5c',
                marginBottom: 18,
                marginTop: 0,
              }}
            >
              02
            </p>
            <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 14, marginTop: 0 }}>
              Personal training
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: '#a3aab4', marginTop: 0 }}>
              One to one coaching for people who want structure, technique that holds up
              and progress they can actually see.
            </p>
            <div style={{ borderTop: '1px solid #262a30', marginTop: 4, display: 'flex', flexDirection: 'column' }}>
              {[
                'One to one sessions',
                'Pairs and small groups',
                'Programmes you keep between sessions',
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 11,
                    padding: '11px 0',
                    fontSize: 13.5,
                    color: '#b3b9c2',
                    borderBottom: '1px solid #1a1d22',
                  }}
                >
                  {dash}
                  {item}
                </div>
              ))}
            </div>
            </div>
          </div>

          {/* Card 03 – Sports Performance */}
          <div
            className="hover-card"
            style={{
              background: '#14161a',
              padding: '0 0 36px',
              animation: 'revIn .6s ease 0.18s both',
            }}
          >
            <div style={{ height: 200, overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=800&q=80" alt="Sports Performance" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ padding: '28px 24px 0' }}>
            <p
              style={{
                font: '11px/1 ui-monospace,Menlo,monospace',
                color: '#d99e5c',
                marginBottom: 18,
                marginTop: 0,
              }}
            >
              03
            </p>
            <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 14, marginTop: 0 }}>
              Sports performance
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: '#a3aab4', marginTop: 0 }}>
              For athletes chasing a number: speed, power, change of direction, and the
              conditioning to repeat it.
            </p>
            <div style={{ borderTop: '1px solid #262a30', marginTop: 4, display: 'flex', flexDirection: 'column' }}>
              {[
                'Testing before and after',
                'Sport specific blocks',
                'Off-season and in-season plans',
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 11,
                    padding: '11px 0',
                    fontSize: 13.5,
                    color: '#b3b9c2',
                    borderBottom: '1px solid #1a1d22',
                  }}
                >
                  {dash}
                  {item}
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* ── 3. Physio coming soon ───────────────── */}
      <FadeIn>
      <section
        style={{
          margin: '0 48px',
          border: '1px solid #262a30',
          background: 'linear-gradient(180deg, #121418, #0d0e11)',
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr',
        }}
      >
        {/* Left */}
        <div style={{ padding: 48 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              border: '1px solid #4a3d2b',
              color: '#d99e5c',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '.24em',
              padding: '7px 12px',
              marginBottom: 26,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#d99e5c',
                animation: 'pulseDot 1.8s ease-in-out infinite',
                display: 'inline-block',
              }}
            />
            COMING SOON
          </div>
          <h2
            style={{
              fontSize: 46,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-.02em',
              margin: '0 0 18px',
            }}
          >
            Physiotherapy
            <br />at Rebuilt
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: '#a3aab4',
              maxWidth: 440,
              marginTop: 0,
              marginBottom: 28,
            }}
          >
            Physiotherapy is coming, so assessment, treatment and the strength work that
            follows will sit in one place instead of being spread across three.
          </p>
          <div
            style={{
              maxWidth: 420,
              border: '1px solid #2a2e34',
              display: 'flex',
            }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1,
                padding: '15px 16px',
                fontSize: 14,
                color: '#868e99',
                background: 'transparent',
                border: 'none',
                fontFamily: 'inherit',
              }}
            />
            <Link href="/about" className="btn-gold" style={{ padding: '16px 24px' }}>
              See services
            </Link>
          </div>
        </div>

        {/* Right */}
        <div style={{ minHeight: 330, overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1706353399656-210cca727a33?auto=format&fit=crop&w=800&q=80" alt="Physiotherapy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      </section>
      </FadeIn>

      {/* ── 4. Approach ─────────────────────────── */}
      <FadeIn>
      <section
        style={{
          padding: '92px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}
      >
        {/* Left – image */}
        <div style={{ height: 390, overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1761971975769-97e598bf526b?auto=format&fit=crop&w=900&q=80" alt="Our studio" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>

        {/* Right – steps */}
        <div>
          <p
            style={{
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '.3em',
              textTransform: 'uppercase',
              color: '#98a0aa',
              marginTop: 0,
              marginBottom: 28,
            }}
          >
            The approach
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              {
                step: 'STEP 01',
                title: 'Assess',
                desc: 'We start with what you can do now, what hurts, and what you want to get back to.',
              },
              {
                step: 'STEP 02',
                title: 'Rebuild',
                desc: 'Sessions run to a plan with targets, so progress is earned rather than guessed at.',
              },
              {
                step: 'STEP 03',
                title: 'Perform',
                desc: 'You leave with the load, the numbers and the confidence to keep going on your own.',
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="hover-approach"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '56px 1fr',
                  gap: 20,
                  padding: '24px 0',
                  borderTop: '1px solid #1e2126',
                }}
              >
                <span
                  style={{
                    font: '11px/1 ui-monospace,Menlo,monospace',
                    color: '#d99e5c',
                    paddingTop: 4,
                  }}
                >
                  {step}
                </span>
                <div>
                  <p style={{ fontSize: 17, fontWeight: 600, margin: '0 0 8px' }}>{title}</p>
                  <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#a3aab4', margin: 0 }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* ── 5. Referrals & insurers ─────────────── */}
      <FadeIn>
      <section style={{ padding: '0 48px 54px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
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
            Referrals &amp; insurers
          </span>
          <span
            style={{
              font: '11px/1 ui-monospace,Menlo,monospace',
              letterSpacing: '.2em',
              color: '#6a7280',
            }}
          >
            WE WORK ALONGSIDE YOUR CLINICIAN
          </span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 12,
          }}
        >
          {['NTUC Income', 'AIA', 'Prudential', 'Great Eastern', 'AXA'].map((name) => (
            <div
              key={name}
              style={{
                border: '1px solid #1e2126',
                height: 84,
                display: 'grid',
                placeItems: 'center',
                background: '#14161a',
              }}
            >
              <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', letterSpacing: '.14em', color: '#4a5060' }}>
                {name.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </section>
      </FadeIn>

      {/* ── 6. Reviews ──────────────────────────── */}
      <FadeIn>
      <section
        style={{
          background: '#0e1013',
          borderTop: '1px solid #212429',
          borderBottom: '1px solid #212429',
          padding: '76px 48px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '.8fr 1fr 1fr 1fr',
            gap: 2,
            background: '#212429',
          }}
        >
          {/* Rating column */}
          <div
            style={{
              background: '#0b0c0e',
              padding: '32px 24px 28px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <p
              style={{
                font: '10px/1 ui-monospace,Menlo,monospace',
                color: '#d99e5c',
                letterSpacing: '.2em',
                marginTop: 0,
                marginBottom: 26,
              }}
            >
              GOOGLE REVIEWS
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 4,
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  fontSize: 76,
                  fontWeight: 800,
                  lineHeight: 0.82,
                  letterSpacing: '-.04em',
                  color: '#3a3f47',
                }}
              >
                4.9
              </span>
              <span style={{ fontSize: 20, fontWeight: 600, color: '#3a3f47' }}>/5</span>
            </div>
            <span
              style={{
                display: 'inline-block',
                border: '1px dashed #4a3d2b',
                fontSize: 9,
                font: '9px/1 ui-monospace,Menlo,monospace',
                letterSpacing: '.12em',
                color: '#79818c',
                padding: '5px 8px',
                marginBottom: 20,
                alignSelf: 'flex-start',
              }}
            >
              SCORE PULLS FROM GOOGLE
            </span>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.6,
                color: '#98a0aa',
                marginTop: 0,
                flex: 1,
              }}
            >
              What people say after training here, pulled straight from our Google reviews
              and left exactly as written.
            </p>
            <a
              href="#"
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: '#d99e5c',
                marginTop: 20,
              }}
              className="hover-gold"
            >
              Read them on Google →
            </a>
          </div>

          {/* Review cards */}
          {[
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
          ].map(({ stars, text, name, role }) => (
            <div
              key={name}
              className="hover-review"
              style={{
                background: '#14161a',
                padding: '32px 24px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              <span
                style={{
                  font: '10px/1 ui-monospace,Menlo,monospace',
                  color: '#d99e5c',
                  letterSpacing: '.16em',
                }}
              >
                {stars}
              </span>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.5,
                  fontWeight: 500,
                  color: '#e9ecf0',
                  margin: 0,
                  flex: 1,
                }}
              >
                {text}
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: 16,
                  paddingTop: 20,
                  borderTop: '1px solid #262a30',
                  alignItems: 'center',
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1e2126', display: 'grid', placeItems: 'center', flexShrink: 0, fontSize: 14, fontWeight: 700, color: '#d99e5c' }}>
                  {name[0]}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 3px', color: '#f2f4f7' }}>
                    {name}
                  </p>
                  <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#79818c', margin: 0, letterSpacing: '.1em' }}>
                    {role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      </FadeIn>

      {/* ── 7. Outcomes strip ───────────────────── */}
      <FadeIn>
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: '#ccd1d8',
          borderTop: '1px solid #212429',
          borderBottom: '1px solid #212429',
        }}
      >
        {[
          {
            label: 'OUTCOME 01',
            heading: 'ACL reconstruction',
            body: 'Client returned to full competitive football having passed all return-to-sport testing criteria at 16 weeks.',
            result: 'Back on the pitch · 16 weeks',
          },
          {
            label: 'OUTCOME 02',
            heading: 'Chronic lower back pain',
            body: 'Three years of recurring pain resolved through targeted loading and movement retraining across 8 weeks of coaching.',
            result: 'Pain-free training · 8 weeks',
          },
          {
            label: 'OUTCOME 03',
            heading: 'Shoulder impingement',
            body: 'Competitive swimmer returned to full overhead training after structured shoulder rehab and scapular strengthening.',
            result: 'Return to competition · 10 weeks',
          },
        ].map(({ label, heading, body, result }) => (
          <div
            key={label}
            style={{ background: '#eef1f5', color: '#111316', padding: 32 }}
          >
            <p
              style={{
                font: '10px/1 ui-monospace,Menlo,monospace',
                color: '#b78a55',
                letterSpacing: '.2em',
                marginTop: 0,
                marginBottom: 16,
              }}
            >
              {label}
            </p>
            <h3
              style={{
                fontSize: 30,
                fontWeight: 800,
                marginBottom: 12,
                marginTop: 0,
                letterSpacing: '-.02em',
              }}
            >
              {heading}
            </h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: '#5e6570', marginTop: 0 }}>
              {body}
            </p>
            <div
              style={{
                borderTop: '1px solid #d5d9e0',
                paddingTop: 14,
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: '.16em',
                color: '#828a95',
              }}
            >
              {result}
            </div>
          </div>
        ))}
      </section>
      </FadeIn>

      {/* ── 8. CTA section ──────────────────────── */}
      <FadeIn>
      <section
        style={{
          background: '#0e1013',
          borderTop: '1px solid #262a30',
          borderBottom: '1px solid #262a30',
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr',
        }}
      >
        {/* Left */}
        <div
          style={{
            padding: '80px 48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 44,
              height: 3,
              background: '#d99e5c',
              marginBottom: 28,
            }}
          />
          <h2
            style={{
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: '-.03em',
              marginBottom: 20,
              marginTop: 0,
            }}
          >
            Start where you are.
          </h2>
          <p
            style={{
              fontSize: 16.5,
              lineHeight: 1.65,
              color: '#a3aab4',
              maxWidth: 520,
              marginBottom: 34,
              marginTop: 0,
            }}
          >
            Whether you are two weeks post-op or chasing a personal best, the first step
            is the same: an honest look at where you are today.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/book" className="btn-gold" style={{ padding: '17px 32px' }}>
              Book an assessment
            </Link>
            <Link href="/about" className="btn-outline" style={{ padding: '17px 32px' }}>
              Ask a question
            </Link>
          </div>
        </div>

        {/* Right */}
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
            THE FIRST SESSION
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {[
              {
                num: '01',
                title: 'Assessment',
                desc: 'We look at movement, strength and history, then agree what matters most.',
              },
              {
                num: '02',
                title: 'Your numbers',
                desc: 'Everything we test gets written down, so progress is measured rather than remembered.',
              },
              {
                num: '03',
                title: 'Your plan',
                desc: 'A programme you can start that week.',
              },
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
                  <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 5px', color: '#f2f4f7' }}>
                    {title}
                  </p>
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#a3aab4', margin: 0 }}>
                    {desc}
                  </p>
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
