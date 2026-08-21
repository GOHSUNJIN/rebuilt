'use client'
import { useState, useEffect, useRef } from 'react'
import { TEAM, type TeamMember } from '@/lib/team'
import { useScrollLock } from '@/lib/hooks'

function MemberPlaceholder({ initials, height, className = '' }: { initials: string; height: number; className?: string }) {
  return (
    <div className={className} style={{ height, overflow: 'hidden', position: 'relative', background: '#08090b', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 130% 80% at 30% 20%, #111418 0%, #060708 100%)' }} />
      <span style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        font: `${Math.round(height * 0.42)}px/1 Archivo,sans-serif`, fontWeight: 800,
        color: 'rgba(255,255,255,.025)', letterSpacing: '-.04em',
        userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        {initials}
      </span>
    </div>
  )
}

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
    bio: 'Over 10 years hospital experience across public and private settings. Specialises in sports injury management, post-surgery physiotherapy and neurological rehabilitation. Three-time Service Excellence Award recipient and presenter of award-winning research at international conferences.',
    credentials: ['Master of Clinical Rehabilitation', 'AHPC Registered (Singapore MOH)', 'ACSM Certified Clinical Exercise Physiologist', 'ACS Certified Cancer Exercise Trainer'],
  },
  {
    role: 'SENIOR PHYSIOTHERAPIST',
    name: 'Debra Ow Pei Li',
    image: 'https://gobeyondrehab.sg/wp-content/uploads/2024/01/Debra.jpg',
    bio: '7 years at Tan Tock Seng Hospital as Senior Physiotherapist. Specialist in musculoskeletal and orthopaedic rehabilitation across acute, outpatient and community settings. Community health advocate focused on frailty and healthy aging.',
    credentials: ['AHPC Clinical Supervisor', 'Clinical Educator (Singapore Institute of Technology)', 'Otago Exercise Leader', 'ACE Certified Personal Trainer'],
  },
]

const RNB_RECOGNITION = ['Channel 8', 'CNA938', 'UFM 100.3', 'Best Physio 2024', 'APAC Insider Awards', 'Wellness Festival SG']

export default function TeamBioModal() {
  const [selected, setSelected] = useState<TeamMember | null>(null)
  const [showRnB, setShowRnB]   = useState(false)
  const closeRef    = useRef<HTMLButtonElement>(null)
  const closeRnBRef = useRef<HTMLButtonElement>(null)

  useScrollLock(!!selected || showRnB)

  useEffect(() => {
    if (!selected) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  useEffect(() => {
    if (!showRnB) return
    closeRnBRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowRnB(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showRnB])

  const initials = (name: string) => name.split(' ').map(n => n[0]).join('')

  return (
    <>
      {/* ── Team grid ───────────────────────────── */}
      <div
        className="r3"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: '#212429' }}
      >
        {TEAM.map((member) => (
          <div
            key={member.name}
            role="button"
            tabIndex={0}
            aria-label={`Read ${member.name}'s full bio`}
            className="hover-border"
            style={{ border: '1px solid #1e2126', cursor: 'pointer', transition: 'border-color .2s ease' }}
            onClick={() => setSelected(member)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(member) } }}
          >
            <MemberPlaceholder initials={initials(member.name)} height={340} className="r-team-img" />
            <div style={{ padding: '24px 22px 26px' }}>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em', marginTop: 0, marginBottom: 10 }}>
                {member.role}
              </p>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 10 }}>
                {member.name}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#a3aab4', margin: '0 0 18px' }}>
                {member.short}
              </p>
              <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.16em' }}>
                READ FULL BIO →
              </span>
            </div>
          </div>
        ))}

        {/* Rehab & Beyond card */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Read more about Rehab & Beyond"
          className="hover-border"
          style={{ border: '1px solid #1e2126', cursor: 'pointer', transition: 'border-color .2s ease', display: 'flex', flexDirection: 'column' }}
          onClick={() => setShowRnB(true)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowRnB(true) } }}
        >
          <div className="r-team-img" style={{ height: 340, position: 'relative', overflow: 'hidden', background: '#08090b', flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://gobeyondrehab.sg/wp-content/uploads/2026/01/clinic-1.png"
              alt="Rehab & Beyond physiotherapy clinic"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9,9,13,.75) 0%, rgba(9,9,13,.1) 55%)' }} />
            <div style={{ position: 'absolute', bottom: 18, left: 22, display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://gobeyondrehab.sg/wp-content/uploads/2018/07/Rehab-and-Beyond-Logo-500.png"
                alt="Rehab & Beyond"
                width={28} height={28}
                style={{ borderRadius: '50%', background: '#fff', objectFit: 'cover', display: 'block' }}
              />
              <span style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: 'rgba(242,244,247,.6)', letterSpacing: '.18em' }}>
                GOBEYONDREHAB.SG
              </span>
            </div>
          </div>
          <div style={{ padding: '24px 22px 26px' }}>
            <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em', marginTop: 0, marginBottom: 10 }}>
              PHYSIOTHERAPY PARTNER
            </p>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 10, color: '#f2f4f7' }}>
              Rehab &amp; Beyond
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: '#a3aab4', margin: '0 0 18px' }}>
              AHPC-registered physiotherapists treating sports injuries, post-surgery rehab and musculoskeletal conditions. Named Best Physiotherapy Clinic Singapore 2024.
            </p>
            <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.16em' }}>
              READ MORE →
            </span>
          </div>
        </div>
      </div>

      {/* ── Team member bio drawer ───────────────── */}
      {selected && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.72)', zIndex: 1000, animation: 'ovIn .2s ease both' }}
            onClick={() => setSelected(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-dialog-title"
            className="no-scrollbar"
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 500,
              background: '#0f1115', borderLeft: '1px solid #262a30', zIndex: 1001,
              overflowY: 'auto', animation: 'drawerIn .28s cubic-bezier(0.2, 0.7, 0.3, 1) both',
            }}
          >
            <button
              ref={closeRef}
              onClick={() => setSelected(null)}
              aria-label="Close bio"
              style={{
                position: 'absolute', top: 20, right: 20,
                background: 'rgba(15,17,21,.8)', border: 'none',
                color: '#f2f4f7', width: 40, height: 40, borderRadius: '50%',
                cursor: 'pointer', display: 'grid', placeItems: 'center', fontSize: 18,
                fontFamily: 'inherit', zIndex: 1, backdropFilter: 'blur(8px)',
              }}
            >
              ✕
            </button>

            <div style={{ position: 'relative' }}>
              <MemberPlaceholder initials={initials(selected.name)} height={280} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f1115 0%, transparent 55%)' }} />
            </div>

            <div className="r-drawer-content" style={{ padding: '4px 36px 52px' }}>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.24em', marginTop: 0, marginBottom: 12 }}>
                {selected.role}
              </p>
              <h2 id="member-dialog-title" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', marginTop: 0, marginBottom: 28 }}>
                {selected.name}
              </h2>

              {selected.bio.map((para, i) => (
                <p key={i} style={{ fontSize: 15, lineHeight: 1.72, color: '#a3aab4', marginTop: 0, marginBottom: 18 }}>
                  {para}
                </p>
              ))}

              <div style={{ borderTop: '1px solid #1e2126', marginTop: 28, paddingTop: 28 }}>
                <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#8d95a0', letterSpacing: '.2em', marginTop: 0, marginBottom: 18 }}>
                  CREDENTIALS
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {selected.credentials.map((c) => (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ width: 4, height: 4, background: 'var(--accent)', borderRadius: '50%', flexShrink: 0 }} />
                      <span style={{ fontSize: 13.5, color: '#c2c7ce' }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Rehab & Beyond drawer ───────────────── */}
      {showRnB && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.72)', zIndex: 1000, animation: 'ovIn .2s ease both' }}
            onClick={() => setShowRnB(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rnb-dialog-title"
            className="no-scrollbar"
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 500,
              background: '#0f1115', borderLeft: '1px solid #262a30', zIndex: 1001,
              overflowY: 'auto', animation: 'drawerIn .28s cubic-bezier(0.2, 0.7, 0.3, 1) both',
            }}
          >
            <button
              ref={closeRnBRef}
              onClick={() => setShowRnB(false)}
              aria-label="Close Rehab & Beyond profile"
              style={{
                position: 'absolute', top: 20, right: 20,
                background: 'rgba(15,17,21,.8)', border: 'none',
                color: '#f2f4f7', width: 40, height: 40, borderRadius: '50%',
                cursor: 'pointer', display: 'grid', placeItems: 'center', fontSize: 18,
                fontFamily: 'inherit', zIndex: 2, backdropFilter: 'blur(8px)',
              }}
            >
              ✕
            </button>

            {/* Header image */}
            <div style={{ position: 'relative', height: 300, overflow: 'hidden', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://gobeyondrehab.sg/wp-content/uploads/2026/01/home-1.png"
                alt="Rehab & Beyond physiotherapy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f1115 0%, rgba(15,17,21,.35) 55%, transparent 100%)' }} />
              {/* Wordmark overlay */}
              <div style={{ position: 'absolute', bottom: 28, left: 36, display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://gobeyondrehab.sg/wp-content/uploads/2018/07/Rehab-and-Beyond-Logo-500.png"
                  alt="Rehab & Beyond"
                  width={36} height={36}
                  style={{ borderRadius: '50%', background: '#fff', objectFit: 'cover', display: 'block' }}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#f2f4f7', letterSpacing: '-.01em', lineHeight: 1 }}>Rehab &amp; Beyond</div>
                  <div style={{ marginTop: 4, font: '8px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.18em' }}>GOBEYONDREHAB.SG</div>
                </div>
              </div>
            </div>

            <div className="r-drawer-content" style={{ padding: '4px 36px 52px' }}>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.24em', marginTop: 0, marginBottom: 12 }}>
                PHYSIOTHERAPY PARTNER
              </p>
              <h2 id="rnb-dialog-title" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', marginTop: 0, marginBottom: 28 }}>
                Rehab &amp; Beyond
              </h2>

              <p style={{ fontSize: 15, lineHeight: 1.72, color: '#a3aab4', marginTop: 0, marginBottom: 18 }}>
                Founded in 2018, Rehab &amp; Beyond was built to bring hospital-quality physiotherapy into the community — accessible, affordable, and not locked away after discharge. Their team of AHPC-registered physiotherapists has been recognised on Channel 8, CNA938 and named Best Physiotherapy Clinic Singapore 2024 by District 65.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: '#a3aab4', marginTop: 0, marginBottom: 0 }}>
                At Rebuilt Academy, Rehab &amp; Beyond handle all physiotherapy consultations and treatment. Session notes are shared directly with your Rebuilt coach so recovery and training are always pulling in the same direction. In-house physiotherapy is coming soon.
              </p>

              {/* Inline image */}
              <div style={{ position: 'relative', height: 200, margin: '28px -36px', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://gobeyondrehab.sg/wp-content/uploads/2026/01/clinic-1.png"
                  alt="Physiotherapy treatment at Rehab & Beyond"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,17,21,.6) 0%, transparent 50%)' }} />
              </div>

              {/* What they treat */}
              <div style={{ borderTop: '1px solid #1e2126', marginTop: 0, paddingTop: 28 }}>
                <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#8d95a0', letterSpacing: '.2em', marginTop: 0, marginBottom: 18 }}>
                  WHAT THEY TREAT
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {RNB_SERVICES.map((s) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <span style={{ width: 4, height: 4, background: 'var(--accent)', borderRadius: '50%', flexShrink: 0, marginTop: 7 }} />
                      <span style={{ fontSize: 13.5, color: '#c2c7ce', lineHeight: 1.5 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Their team */}
              <div style={{ borderTop: '1px solid #1e2126', marginTop: 28, paddingTop: 28 }}>
                <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#8d95a0', letterSpacing: '.2em', marginTop: 0, marginBottom: 18 }}>
                  THEIR TEAM
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {RNB_TEAM.map((person) => (
                    <div
                      key={person.name}
                      style={{ border: '1px solid #1e2126', background: '#0c0e13', overflow: 'hidden' }}
                    >
                      {/* Photo + name header */}
                      <div style={{ display: 'flex', gap: 0 }}>
                        <div style={{ width: 110, flexShrink: 0, position: 'relative', overflow: 'hidden', background: '#08090b' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={person.image}
                            alt={person.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', minHeight: 130 }}
                          />
                        </div>
                        <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <p style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em', margin: '0 0 8px' }}>
                            {person.role}
                          </p>
                          <h4 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 0', color: '#f2f4f7', lineHeight: 1.1 }}>
                            {person.name}
                          </h4>
                        </div>
                      </div>
                      {/* Bio + credentials */}
                      <div style={{ padding: '14px 18px 18px', borderTop: '1px solid #1a1e24' }}>
                        <p style={{ fontSize: 13, lineHeight: 1.65, color: '#8d95a0', margin: '0 0 14px' }}>
                          {person.bio}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                          {person.credentials.map((c) => (
                            <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <span style={{ width: 3, height: 3, background: '#5f6670', borderRadius: '50%', flexShrink: 0 }} />
                              <span style={{ fontSize: 12, color: '#7a8290' }}>{c}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recognition */}
              <div style={{ borderTop: '1px solid #1e2126', marginTop: 28, paddingTop: 28 }}>
                <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#8d95a0', letterSpacing: '.2em', marginTop: 0, marginBottom: 16 }}>
                  FEATURED &amp; RECOGNISED
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {RNB_RECOGNITION.map((r) => (
                    <span
                      key={r}
                      style={{ padding: '5px 12px', border: '1px solid #1e2126', background: '#0c0e13', fontSize: 11.5, color: '#8d95a0', letterSpacing: '.04em' }}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href="https://gobeyondrehab.sg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{ fontSize: 11, letterSpacing: '.18em', padding: '13px 22px' }}
                >
                  VISIT SITE ↗
                </a>
                <a
                  href="/physio"
                  className="btn-outline"
                  style={{ fontSize: 11, letterSpacing: '.18em', padding: '13px 22px' }}
                >
                  PHYSIO AT REBUILT →
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
