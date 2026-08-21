import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageShell from '@/components/layout/PageShell'
import { SITE } from '@/lib/site'
import ContactForm from '@/components/forms/ContactForm'
import LocationMap from '@/components/ui/LocationMap'
import LocationDrawer from '@/components/sections/LocationDrawer'
import TeamBioModal from '@/components/sections/TeamBioModal'
import CopyText from '@/components/ui/CopyText'

export const metadata: Metadata = {
  title: 'About',
  description: 'Rebuilt Academy is a Singapore studio for rehabilitation, training and sports performance. One place, one team, one set of notes.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About',
    description: 'One place for rehab, training and performance. Three locations across Singapore at Core Collective.',
  },
}

export default function AboutPage() {
  return (
    <PageShell activePage="about">

      {/* ── Header ──────────────────────────────── */}
      <section style={{ borderBottom: '1px solid #212429' }}>
        <div className="r2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 500 }}>
          {/* Left: text */}
          <div className="r-px r-tall-pad" style={{ padding: '88px 48px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#09090d' }}>
            <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.24em', marginTop: 0, marginBottom: 26 }}>
              ABOUT REBUILT
            </p>
            <h1
              className="r-h1"
              style={{ fontSize: 64, fontWeight: 800, lineHeight: 0.96, letterSpacing: '-.03em', marginBottom: 28, marginTop: 0 }}
            >
              A gym built around getting people back.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#a3aab4', marginTop: 0, marginBottom: 0, maxWidth: 460 }}>
              Coming back from an injury usually means being handed between a clinic and a gym that never speak to each other. Here it happens in one place.
            </p>
          </div>
          {/* Right: photo */}
          <div className="r-about-img" style={{ position: 'relative', minHeight: 400, overflow: 'hidden' }}>
            <Image
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=85"
              alt="Rebuilt studio"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #09090d 0%, transparent 25%)' }} />
          </div>
        </div>
        {/* Stats strip */}
        <div className="r4 r-px" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #212429', background: '#212429', gap: 1 }} >
          {[
            { label: 'BASED',   value: 'Singapore, 3 locations' },
            { label: 'OPENED',  value: '2021' },
            { label: 'WE DO',   value: 'Rehab, training, performance, physiotherapy' },
            { label: 'NEXT UP', value: 'In-house physio coming soon' },
          ].map(({ label, value }) => (
            <div key={label} style={{ padding: '28px 32px', background: '#0c0e14' }}>
              <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.22em', margin: '0 0 10px' }}>{label}</p>
              <p style={{ fontSize: 14, color: '#f2f4f7', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Facility photos ──────────────────────── */}
      <section style={{ borderBottom: '1px solid #212429' }}>
        <LocationDrawer />
      </section>

      {/* ── The team ────────────────────────────── */}
      <section className="r-px r-section-pad" style={{ padding: '76px 48px' }}>
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
          <span className="r-hide" style={{ font: '10px/1 ui-monospace,Menlo,monospace', letterSpacing: '.14em', color: '#8d95a0' }}>
            FOUNDER · CO-FOUNDER · PHYSIOTHERAPY PARTNER
          </span>
        </div>
        <TeamBioModal />
      </section>

      {/* ── Contact ────────────────────────────── */}
      <section
        id="contact"
        className="r2"
        style={{
          borderTop: '1px solid #212429',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          scrollMarginTop: 90,
          overflow: 'hidden',
        }}
      >
        {/* Left – form */}
        <div className="r-px r-tall-pad" style={{ padding: '66px 48px', borderRight: '1px solid #212429' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-.025em', marginTop: 0, marginBottom: 32, lineHeight: 0.96 }}>
            Get in touch.
          </h2>
          <ContactForm />
        </div>

        {/* Right */}
        <div style={{ minWidth: 0, overflow: 'hidden', width: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Map panel */}
          <div style={{ height: 360, overflow: 'hidden', borderBottom: '1px solid #212429', flexShrink: 0 }}>
            <LocationMap />
          </div>

          {/* Contact details */}
          <div className="r-px" style={{ padding: '32px 48px 48px', flex: 1 }}>

            {/* Locations */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.2em', margin: '0 0 14px' }}>LOCATIONS</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {SITE.locations.map(l => (
                  <a key={l.name} href={l.mapsUrl} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'baseline', gap: 12, textDecoration: 'none' }}
                    className="hover-gold"
                  >
                    <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.16em', flexShrink: 0, minWidth: 62 }}>
                      {l.name.toUpperCase()}
                    </span>
                    <span style={{ fontSize: 13, color: '#a3aab4', lineHeight: 1.4 }}>{l.street}</span>
                  </a>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #1e2126', marginBottom: 24 }} />

            {/* Hours + Contact + Social */}
            <div className="r3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 24px' }}>

              {/* Hours */}
              <div>
                <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.2em', margin: '0 0 12px' }}>HOURS</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {SITE.hours.map(h => (
                    <p key={h} style={{ fontSize: 13, color: '#a3aab4', margin: 0 }}>{h}</p>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.2em', margin: '0 0 12px' }}>CONTACT</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <CopyText value={SITE.contact.email}>
                    <a href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(SITE.contact.email)}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 13, color: '#a3aab4', textDecoration: 'none' }} className="hover-gold">
                      {SITE.contact.email}
                    </a>
                  </CopyText>
                  <CopyText value={SITE.contact.phone}>
                    <a href={SITE.contact.phoneTel}
                      style={{ fontSize: 13, color: '#a3aab4', textDecoration: 'none' }} className="hover-gold">
                      {SITE.contact.phone}
                    </a>
                  </CopyText>
                </div>
              </div>

              {/* Social */}
              <div>
                <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.2em', margin: '0 0 12px' }}>SOCIAL</p>
                <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
                  className="hover-gold">
                  <span style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, display: 'block', background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}>
                    <Image src="/instagram-pfp.jpg" alt="@rebuiltbysk on Instagram" width={32} height={32} style={{ width: 32, height: 32, objectFit: 'cover', display: 'block' }} />
                  </span>
                  <span style={{ fontSize: 13, color: '#a3aab4' }}>@rebuiltbysk</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

    </PageShell>
  )
}
