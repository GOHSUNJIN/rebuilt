'use client'
import { useEffect, useRef } from 'react'
import { useScrollLock } from '@/lib/hooks'

const RNB_SERVICES = [
  'Sports injuries and return to sport',
  'Post-surgery rehabilitation',
  'Musculoskeletal conditions: back, neck, knee, shoulder',
  'Neurological rehabilitation (stroke, Parkinson\'s)',
  'Geriatric and community rehabilitation',
  'Pulmonary and cardiac rehabilitation',
]

const RNB_TEAM = [
  {
    role: 'FOUNDER / LEAD PHYSIOTHERAPIST',
    name: 'Jaden',
    image: 'https://gobeyondrehab.sg/wp-content/uploads/2019/04/RnB-Jaden.jpg',
    imagePosition: 'center top',
    bio: 'Over 10 years hospital experience across public and private settings. Specialises in sports injury management, post-surgery physiotherapy and neurological rehabilitation. Three-time Service Excellence Award recipient and presenter of award-winning research at international conferences.',
    credentials: ['Master of Clinical Rehabilitation', 'AHPC Registered (Singapore MOH)', 'ACSM Certified Clinical Exercise Physiologist', 'ACS Certified Cancer Exercise Trainer'],
  },
  {
    role: 'SENIOR PHYSIOTHERAPIST',
    name: 'Debra Ow Pei Li',
    image: '/rnb-debra.jpg',
    imagePosition: 'center 18%',
    bio: '7 years at Tan Tock Seng Hospital as Senior Physiotherapist. Specialist in musculoskeletal and orthopaedic rehabilitation across acute, outpatient and community settings. Community health advocate focused on frailty and healthy aging.',
    credentials: ['AHPC Clinical Supervisor', 'Clinical Educator (Singapore Institute of Technology)', 'Otago Exercise Leader', 'ACE Certified Personal Trainer'],
  },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function PartnerDrawer({ open, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <div
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.72)', zIndex: 1000, animation: 'ovIn .2s ease both' }}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rnb-dialog-title"
        className="no-scrollbar"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 500,
          background: '#171717', borderLeft: '1px solid #2A2A2A', zIndex: 1001,
          overflowY: 'auto', animation: 'drawerIn .28s cubic-bezier(0.2, 0.7, 0.3, 1) both',
        }}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close Rehab & Beyond profile"
          style={{
            position: 'absolute', top: 20, right: 20,
            background: 'rgba(15,17,21,.8)', border: 'none',
            color: '#FFFFFF', width: 40, height: 40, borderRadius: '50%',
            cursor: 'pointer', display: 'grid', placeItems: 'center',
            fontFamily: 'inherit', zIndex: 2, backdropFilter: 'blur(8px)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/></svg>
        </button>

        <div style={{
          flexShrink: 0,
          background: 'linear-gradient(160deg, #0a1f35 0%, #0d2840 60%, #071829 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '64px 36px',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/rnb-logo.png"
            alt="Rehab & Beyond"
            style={{ width: '75%', maxWidth: 320, objectFit: 'contain', display: 'block', filter: 'brightness(0) invert(1)' }}
          />
        </div>

        <div className="r-drawer-content" style={{ padding: '32px 36px 52px' }}>
          <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.24em', marginTop: 0, marginBottom: 12 }}>
            PHYSIOTHERAPY PARTNER
          </p>
          <h2 id="rnb-dialog-title" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', marginTop: 0, marginBottom: 28 }}>
            Rehab &amp; Beyond
          </h2>

          <p style={{ fontSize: 15, lineHeight: 1.72, color: '#A5A5A5', marginTop: 0, marginBottom: 18 }}>
            Founded in 2018, Rehab &amp; Beyond was built to bring hospital-quality physiotherapy into the community: accessible, affordable, and not locked away after discharge. Their team of AHPC-registered physiotherapists has been recognised on Channel 8, CNA938 and named Best Physiotherapy Clinic Singapore 2024 by District 65.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.72, color: '#A5A5A5', marginTop: 0, marginBottom: 0 }}>
            At Rebuilt Academy, Rehab &amp; Beyond handle all physiotherapy consultations and treatment. Session notes are shared directly with your Rebuilt coach so recovery and training are always pulling in the same direction. In-house physiotherapy is coming soon.
          </p>

          <div style={{ borderTop: '1px solid #1E1E1E', marginTop: 28, paddingTop: 28 }}>
            <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.2em', marginTop: 0, marginBottom: 18 }}>
              WHAT THEY TREAT
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {RNB_SERVICES.map((s) => (
                <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ width: 4, height: 4, background: 'var(--accent)', borderRadius: '50%', flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontSize: 13.5, color: '#A5A5A5', lineHeight: 1.5 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid #1E1E1E', marginTop: 28, paddingTop: 28 }}>
            <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.2em', marginTop: 0, marginBottom: 18 }}>
              THEIR TEAM
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {RNB_TEAM.map((person) => (
                <div key={person.name} style={{ border: '1px solid #1E1E1E', background: '#0B0B0B', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', gap: 0 }}>
                    <div style={{ width: 110, flexShrink: 0, position: 'relative', overflow: 'hidden', background: '#0B0B0B' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={person.image}
                        alt={person.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: person.imagePosition ?? 'center top', display: 'block', minHeight: 130 }}
                      />
                    </div>
                    <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <p style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em', margin: '0 0 8px' }}>
                        {person.role}
                      </p>
                      <h4 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 0', color: '#FFFFFF', lineHeight: 1.1 }}>
                        {person.name}
                      </h4>
                    </div>
                  </div>
                  <div style={{ padding: '14px 18px 18px', borderTop: '1px solid #1E1E1E' }}>
                    <p style={{ fontSize: 13, lineHeight: 1.65, color: '#909090', margin: '0 0 14px' }}>
                      {person.bio}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {person.credentials.map((c) => (
                        <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ width: 3, height: 3, background: '#5f6670', borderRadius: '50%', flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: '#6f7783' }}>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="r-rnb-btns" style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href="https://gobeyondrehab.sg/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold r-rnb-btn"
              style={{ fontSize: 11, letterSpacing: '.18em', padding: '13px 22px' }}
            >
              VISIT SITE ↗︎
            </a>
            <a
              href="/physio"
              className="btn-outline r-rnb-btn"
              style={{ fontSize: 11, letterSpacing: '.18em', padding: '13px 22px' }}
            >
              PHYSIO AT REBUILT →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
