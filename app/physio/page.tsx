import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WaitlistTags from '@/components/ui/WaitlistTags'

export const metadata: Metadata = {
  title: 'Physiotherapy – Coming Soon',
  description: 'Physiotherapy is coming to Rebuilt Singapore. Join the waitlist — assessment, treatment and strength work in one place.',
}

export default function PhysioPage() {
  return (
    <div
      style={{
        fontFamily: 'Archivo,Helvetica,Arial,sans-serif',
        background: '#0b0c0e',
        color: '#f2f4f7',
        minHeight: '100vh',
      }}
    >
      {/* Top gold accent strip */}
      <div style={{ height: 5, background: '#d99e5c' }} />

      <Navbar activePage="physio" />

      {/* ── Hero ────────────────────────────────── */}
      <section
        className="r-px"
        style={{
          padding: '76px 48px 72px',
          textAlign: 'center',
          borderBottom: '1px solid #212429',
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, #1a1508 0%, #0b0c0e 70%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* COMING SOON badge */}
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
            marginBottom: 32,
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

        <h1
          className="r-h1"
          style={{
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 0.94,
            letterSpacing: '-.025em',
            marginTop: 0,
            marginBottom: 28,
            animation: 'heroIn .7s cubic-bezier(.2,.7,.3,1) both',
          }}
        >
          PHYSIOTHERAPY
        </h1>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.65,
            color: '#b3b9c2',
            maxWidth: 620,
            marginTop: 0,
            marginBottom: 48,
          }}
        >
          Physiotherapy is on the way. Assessment, treatment and the strength work that
          follows will run in the same room, with the same people, so nothing gets lost
          between a clinic and a gym.
        </p>

        {/* Waitlist form */}
        <div style={{ width: '100%', maxWidth: 560, textAlign: 'left' }}>
          <p
            style={{
              font: '10px/1 ui-monospace,Menlo,monospace',
              color: '#6f7783',
              letterSpacing: '.2em',
              marginTop: 0,
              marginBottom: 14,
            }}
          >
            JOIN THE WAITLIST
          </p>
          <div
            className="r2"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
              marginBottom: 10,
            }}
          >
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
          <p
            style={{
              font: '10px/1 ui-monospace,Menlo,monospace',
              color: '#6f7783',
              letterSpacing: '.2em',
              margin: '16px 0 12px',
            }}
          >
            WHAT DO YOU NEED?
          </p>
          <WaitlistTags />
          <button
            style={{
              width: '100%',
              padding: '16px',
              background: '#d99e5c',
              color: '#0b0c0e',
              border: 'none',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Notify me
          </button>
          <p
            style={{
              font: '10px/1 ui-monospace,Menlo,monospace',
              color: '#5f6670',
              letterSpacing: '.14em',
              marginTop: 14,
              marginBottom: 0,
              textAlign: 'center',
            }}
          >
            LAUNCHING: Q1 2026
          </p>
        </div>
      </section>

      {/* ── What it will cover ──────────────────── */}
      <section className="r-px" style={{ padding: '76px 48px 60px' }}>
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
            What it will cover
          </span>
          <span
            style={{
              font: '11px/1 ui-monospace,Menlo,monospace',
              letterSpacing: '.2em',
              color: '#6a7280',
            }}
          >
            ONE BUILDING, ONE SET OF NOTES
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
          {[
            {
              num: '01',
              title: 'Assess',
              desc: 'A thorough assessment that looks at movement, load tolerance and the history behind the problem, not just where it hurts today.',
            },
            {
              num: '02',
              title: 'Treat',
              desc: 'Hands-on treatment and structured exercise, with a clear explanation of what is happening and why each part of it matters.',
            },
            {
              num: '03',
              title: 'Rebuild',
              desc: 'Strength and conditioning that follows on from treatment, so discharge does not mean the end. It means the next stage.',
            },
          ].map(({ num, title, desc }) => (
            <div
              key={num}
              className="hover-approach"
              style={{
                background: '#14161a',
                padding: '32px 24px 34px',
                display: 'grid',
                gridTemplateColumns: '56px 1fr',
                gap: 20,
                alignItems: 'start',
              }}
            >
              <span
                style={{
                  font: '11px/1 ui-monospace,Menlo,monospace',
                  color: '#d99e5c',
                  letterSpacing: '.16em',
                  paddingTop: 4,
                }}
              >
                0{num}
              </span>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 0, marginBottom: 12 }}>
                  {title}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#a3aab4', margin: 0 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bridge section ──────────────────────── */}
      <section className="r-px" style={{ padding: '0 48px 60px' }}>
        <div
          className="r2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
            background: '#212429',
          }}
        >
          {/* Left */}
          <div style={{ background: '#14161a', padding: '56px 32px' }}>
            <h2
              style={{
                fontSize: 34,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-.02em',
                marginTop: 0,
                marginBottom: 16,
              }}
            >
              Need something before then?
            </h2>
            <p
              style={{
                fontSize: 15.5,
                lineHeight: 1.65,
                color: '#a3aab4',
                marginTop: 0,
                marginBottom: 28,
              }}
            >
              Our rehab service covers most of what physiotherapy will add. If you have an
              injury or you are coming back from surgery, we can start now.
            </p>
            <Link href="/rehab" className="btn-outline" style={{ padding: '14px 24px' }}>
              See rehab
            </Link>
          </div>

          {/* Right */}
          <div style={{ minHeight: 340, overflow: 'hidden', position: 'relative' }}>
            <Image src="https://images.unsplash.com/photo-1706353399656-210cca727a33?auto=format&fit=crop&w=800&q=80" alt="Physiotherapy" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
