import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageShell from '@/components/layout/PageShell'
import { SITE } from '@/lib/site'
import ContactForm from '@/components/ui/ContactForm'
import LocationMap from '@/components/ui/LocationMap'
import LocationDrawer from '@/components/sections/LocationDrawer'
import TeamBioModal from '@/components/sections/TeamBioModal'
import CopyText from '@/components/ui/CopyText'
import StatsStrip from '@/components/ui/StatsStrip'

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
      <section style={{ borderBottom: '1px solid #2A2A2A' }}>
        <div className="r2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 500 }}>
          {/* Left: text */}
          <div className="r-px r-tall-pad r-about-header-content" style={{ padding: '88px 48px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#0B0B0B' }}>
            <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.24em', marginTop: 0, marginBottom: 26 }}>
              ABOUT REBUILT
            </p>
            <h1
              className="r-h1"
              style={{ fontSize: 64, fontWeight: 800, lineHeight: 0.96, letterSpacing: '-.03em', marginBottom: 28, marginTop: 0 }}
            >
              A gym built around getting people back.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#A5A5A5', marginTop: 0, marginBottom: 0, maxWidth: 460 }}>
              Coming back from an injury usually means being handed between a clinic and a gym that never speak to each other. Here it happens in one place.
            </p>
          </div>
          {/* Right: photo */}
          <div className="r-about-img" style={{ position: 'relative', minHeight: 400, overflow: 'hidden' }}>
            <Image
              src="/img/about-gym.jpg"
              alt="Rebuilt studio"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0B0B0B 0%, transparent 25%)' }} />
          </div>
        </div>
        {/* Stats strip */}
        <StatsStrip />
      </section>

      {/* ── Facility photos ──────────────────────── */}
      <section style={{ borderBottom: '1px solid #2A2A2A' }}>
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
              color: '#909090',
            }}
          >
            The team
          </span>
          <span className="r-hide" style={{ font: '10px/1 ui-monospace,Menlo,monospace', letterSpacing: '.14em', color: '#909090' }}>
            FOUNDER · CO-FOUNDER · PHYSIOTHERAPY PARTNER
          </span>
        </div>
        <TeamBioModal />
      </section>

      {/* ── Contact ────────────────────────────── */}
      <section
        id="contact"
        className="r2 r-contact-section"
        style={{
          borderTop: '1px solid #2A2A2A',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          scrollMarginTop: 90,
          overflow: 'hidden',
        }}
      >
        {/* Left – form */}
        <div id="contact-form" className="r-px r-tall-pad r-contact-left" style={{ padding: '66px 48px', borderRight: '1px solid #2A2A2A', scrollMarginTop: 90 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-.025em', marginTop: 0, marginBottom: 32, lineHeight: 0.96 }}>
            Get in touch.
          </h2>
          <ContactForm />
        </div>

        {/* Right */}
        <div className="r-contact-right" style={{ minWidth: 0, overflow: 'hidden', width: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Map panel */}
          <div style={{ height: 360, overflow: 'hidden', borderBottom: '1px solid #2A2A2A', flexShrink: 0 }}>
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
                    <span style={{ fontSize: 13, color: '#A5A5A5', lineHeight: 1.4 }}>{l.street}</span>
                  </a>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #1E1E1E', marginBottom: 24 }} />

            {/* Hours + Contact + Social */}
            <div className="r3 r-contact-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 24px' }}>

              {/* Hours */}
              <div>
                <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.2em', margin: '0 0 12px' }}>HOURS</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {SITE.hours.map(h => (
                    <p key={h} style={{ fontSize: 13, color: '#A5A5A5', margin: 0 }}>{h}</p>
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
                      style={{ fontSize: 13, color: '#A5A5A5', textDecoration: 'none' }} className="hover-gold">
                      {SITE.contact.email}
                    </a>
                  </CopyText>
                  <CopyText value={SITE.contact.phone}>
                    <a href={SITE.contact.phoneTel}
                      style={{ fontSize: 13, color: '#A5A5A5', textDecoration: 'none' }} className="hover-gold">
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
                  <span style={{ fontSize: 13, color: '#A5A5A5' }}>@rebuiltbysk</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

    </PageShell>
  )
}
