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

export default function TeamBioModal() {
  const [selected, setSelected] = useState<TeamMember | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useScrollLock(!!selected)

  useEffect(() => {
    if (!selected) return
    closeButtonRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  const initials = (name: string) => name.split(' ').map(n => n[0]).join('')

  return (
    <>
      <div
        className="r3"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          background: '#212429',
        }}
      >
        {TEAM.map((member) => (
          <div
            key={member.name}
            className="hover-border"
            style={{
              border: '1px solid #1e2126',
              cursor: 'pointer',
              transition: 'border-color .2s ease',
            }}
            onClick={() => setSelected(member)}
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

        {/* Placeholder / hiring card */}
        <div style={{ border: '1px solid #1e2126', display: 'flex', flexDirection: 'column' }}>
          <div className="r-team-img" style={{ height: 340, background: '#08090b', display: 'flex', alignItems: 'flex-end', padding: '0 22px 22px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 30% 30%, #111014 0%, #060708 70%)' }} />
            <span style={{ position: 'relative', font: '11px/1 ui-monospace,Menlo,monospace', color: '#8d95a0', letterSpacing: '.2em' }}>PHYSIOTHERAPIST</span>
          </div>
          <div style={{ padding: '24px 22px 26px' }}>
            <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#a3aab4', letterSpacing: '.2em', marginTop: 0, marginBottom: 10 }}>
              IN-HOUSE · COMING SOON
            </p>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 10, color: '#8d95a0' }}>
              Physiotherapist
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: '#a3aab4', margin: '0 0 18px' }}>
              Physiotherapy at Rebuilt is delivered in partnership with Rehab & Beyond. In-house physio is coming soon.
            </p>
            <a href="/physio" style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#a3aab4', letterSpacing: '.16em', textDecoration: 'none' }}>
              LEARN MORE →
            </a>
          </div>
        </div>
      </div>

      {/* ── Bio drawer ──────────────────────────── */}
      {selected && (
        <>
          <div
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,.72)', zIndex: 1000,
              animation: 'ovIn .2s ease both',
            }}
            onClick={() => setSelected(null)}
          />
          <div
            className="no-scrollbar"
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 500,
              background: '#0f1115', borderLeft: '1px solid #262a30', zIndex: 1001,
              overflowY: 'auto', animation: 'drawerIn .28s cubic-bezier(0.2, 0.7, 0.3, 1) both',
            }}
          >
            <button
              ref={closeButtonRef}
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
              <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', marginTop: 0, marginBottom: 28 }}>
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
    </>
  )
}
