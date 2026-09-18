'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { TEAM, type TeamMember } from '@/lib/team'
import { useScrollLock } from '@/lib/hooks'

function MemberPlaceholder({ initials, height, className = '' }: { initials: string; height: number; className?: string }) {
  return (
    <div className={className} style={{ height, overflow: 'hidden', position: 'relative', background: '#0B0B0B', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 130% 80% at 30% 20%, #171717 0%, #060708 100%)' }} />
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

const RNB_RECOGNITION = ['Channel 8', 'CNA938', 'UFM 100.3', 'Best Physio 2024', 'APAC Insider Awards', 'Wellness Festival SG']

const TOTAL_CARDS = TEAM.length + 1 // team members + RnB card

export default function TeamBioModal() {
  const [selected, setSelected] = useState<TeamMember | null>(null)
  const [showRnB, setShowRnB]   = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const closeRef    = useRef<HTMLButtonElement>(null)
  const closeRnBRef = useRef<HTMLButtonElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)

  useScrollLock(!!selected || showRnB)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.scrollWidth / TOTAL_CARDS
    setActiveIdx(Math.min(Math.round(el.scrollLeft / cardWidth), TOTAL_CARDS - 1))
  }, [])

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
        ref={scrollRef}
        onScroll={handleScroll}
        className="r3 r-team-scroll"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: '#2A2A2A' }}
      >
        {TEAM.map((member) => (
          <div
            key={member.name}
            role="button"
            tabIndex={0}
            aria-label={`Read ${member.name}'s full bio`}
            className="hover-border"
            style={{ border: '1px solid #1E1E1E', cursor: 'pointer', transition: 'border-color .2s ease' }}
            onClick={() => setSelected(member)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(member) } }}
          >
            {member.image ? (
              <div
                className="r-team-img"
                role="img"
                aria-label={member.name}
                style={{
                  height: 340,
                  flexShrink: 0,
                  backgroundColor: '#0B0B0B',
                  backgroundImage: `url(${member.image})`,
                  backgroundSize: member.imageSize ?? 'cover',
                  backgroundPosition: member.imagePosition ?? 'center top',
                }}
              />
            ) : (
              <MemberPlaceholder initials={initials(member.name)} height={340} className="r-team-img" />
            )}
            <div style={{ padding: '24px 22px 26px' }}>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em', marginTop: 0, marginBottom: 10 }}>
                {member.role}
              </p>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 10 }}>
                {member.name}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#A5A5A5', margin: '0 0 18px' }}>
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
          style={{ border: '1px solid #1E1E1E', cursor: 'pointer', transition: 'border-color .2s ease', display: 'flex', flexDirection: 'column' }}
          onClick={() => setShowRnB(true)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowRnB(true) } }}
        >
          <div className="r-team-img" style={{ height: 340, position: 'relative', overflow: 'hidden', background: '#FFFFFF', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/rnb-logo.png"
              alt="Rehab & Beyond"
              style={{ width: 240, maxWidth: '80%', objectFit: 'contain', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: 18, left: 22 }}>
              <span style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: 'rgba(0,0,0,.35)', letterSpacing: '.18em' }}>
                GOBEYONDREHAB.SG
              </span>
            </div>
          </div>
          <div style={{ padding: '24px 22px 26px' }}>
            <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em', marginTop: 0, marginBottom: 10 }}>
              PHYSIOTHERAPY PARTNER
            </p>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 10, color: '#FFFFFF' }}>
              Rehab &amp; Beyond
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: '#A5A5A5', margin: '0 0 18px' }}>
              AHPC-registered physiotherapists treating sports injuries, post-surgery rehab and musculoskeletal conditions. Named Best Physiotherapy Clinic Singapore 2024.
            </p>
            <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.16em' }}>
              READ MORE →
            </span>
          </div>
        </div>
      </div>

      {/* Scroll dots — mobile only */}
      <div className="r-team-dots" style={{ display: 'none', justifyContent: 'center', gap: 6, marginTop: 16 }}>
        {Array.from({ length: TOTAL_CARDS }).map((_, i) => (
          <span key={i} style={{ display: 'block', width: i === activeIdx ? 20 : 6, height: 4, borderRadius: 2, background: i === activeIdx ? 'var(--accent)' : '#3A3A3A', transition: 'width .25s, background .25s' }} />
        ))}
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
              background: '#171717', borderLeft: '1px solid #2A2A2A', zIndex: 1001,
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
                color: '#FFFFFF', width: 40, height: 40, borderRadius: '50%',
                cursor: 'pointer', display: 'grid', placeItems: 'center', fontSize: 18,
                fontFamily: 'inherit', zIndex: 1, backdropFilter: 'blur(8px)',
              }}
            >
              ✕
            </button>

            <div style={{ position: 'relative' }}>
              {selected.image ? (
                <div style={{
                  height: 280,
                  flexShrink: 0,
                  backgroundColor: '#0B0B0B',
                  backgroundImage: `url(${selected.image})`,
                  backgroundSize: selected.imageSize ?? 'cover',
                  backgroundPosition: selected.imagePosition ?? 'center top',
                }} />
              ) : (
                <MemberPlaceholder initials={initials(selected.name)} height={280} />
              )}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #171717 0%, transparent 55%)' }} />
            </div>

            <div className="r-drawer-content" style={{ padding: '4px 36px 52px' }}>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.24em', marginTop: 0, marginBottom: 12 }}>
                {selected.role}
              </p>
              <h2 id="member-dialog-title" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', marginTop: 0, marginBottom: 28 }}>
                {selected.name}
              </h2>

              {selected.bio.map((para, i) => (
                <p key={i} style={{ fontSize: 15, lineHeight: 1.72, color: '#A5A5A5', marginTop: 0, marginBottom: 18 }}>
                  {para}
                </p>
              ))}

              <div style={{ borderTop: '1px solid #1E1E1E', marginTop: 28, paddingTop: 28 }}>
                <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.2em', marginTop: 0, marginBottom: 18 }}>
                  CREDENTIALS
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {selected.credentials.map((c) => (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ width: 4, height: 4, background: 'var(--accent)', borderRadius: '50%', flexShrink: 0 }} />
                      <span style={{ fontSize: 13.5, color: '#A5A5A5' }}>{c}</span>
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
              background: '#171717', borderLeft: '1px solid #2A2A2A', zIndex: 1001,
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
                color: '#FFFFFF', width: 40, height: 40, borderRadius: '50%',
                cursor: 'pointer', display: 'grid', placeItems: 'center', fontSize: 18,
                fontFamily: 'inherit', zIndex: 2, backdropFilter: 'blur(8px)',
              }}
            >
              ✕
            </button>

            {/* Header — dark branded block */}
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

              {/* What they treat */}
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

              {/* Their team */}
              <div style={{ borderTop: '1px solid #1E1E1E', marginTop: 28, paddingTop: 28 }}>
                <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.2em', marginTop: 0, marginBottom: 18 }}>
                  THEIR TEAM
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {RNB_TEAM.map((person) => (
                    <div
                      key={person.name}
                      style={{ border: '1px solid #1E1E1E', background: '#0c0e13', overflow: 'hidden' }}
                    >
                      {/* Photo + name header */}
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
                      {/* Bio + credentials */}
                      <div style={{ padding: '14px 18px 18px', borderTop: '1px solid #1E1E1E' }}>
                        <p style={{ fontSize: 13, lineHeight: 1.65, color: '#909090', margin: '0 0 14px' }}>
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
