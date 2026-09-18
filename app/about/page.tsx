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
          <p className="r-mobile-only" style={{ display: 'none', fontSize: 15, fontWeight: 600, letterSpacing: '.3em', textTransform: 'uppercase', color: '#909090', margin: '0', padding: '24px 20px 16px' }}>Our Locations</p>
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
                  <span style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', border: '1px solid #2A2A2A' }}>
                    <svg viewBox="0 0 24 24" fill="white" style={{ width: 17, height: 17, display: 'block' }}>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
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
