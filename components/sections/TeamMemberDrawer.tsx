'use client'
import { useEffect, useRef } from 'react'
import { type TeamMember } from '@/lib/team'
import { getInitials } from '@/lib/utils'
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

export { MemberPlaceholder }

interface Props {
  member: TeamMember | null
  onClose: () => void
}

export default function TeamMemberDrawer({ member, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useScrollLock(!!member)

  useEffect(() => {
    if (!member) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [member, onClose])

  if (!member) return null

  return (
    <>
      <div
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.72)', zIndex: 1000, animation: 'ovIn .2s ease both' }}
        onClick={onClose}
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
          onClick={onClose}
          aria-label="Close bio"
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(15,17,21,.8)', border: 'none',
            color: '#FFFFFF', width: 48, height: 48, borderRadius: '50%',
            cursor: 'pointer', display: 'grid', placeItems: 'center',
            fontFamily: 'inherit', zIndex: 1, backdropFilter: 'blur(8px)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/></svg>
        </button>

        <div style={{ position: 'relative' }}>
          {member.image ? (
            <div style={{
              height: 280, flexShrink: 0,
              backgroundColor: '#0B0B0B',
              backgroundImage: `url(${member.image})`,
              backgroundSize: member.imageSize ?? 'cover',
              backgroundPosition: member.imagePosition ?? 'center top',
            }} />
          ) : (
            <MemberPlaceholder initials={getInitials(member.name)} height={280} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #171717 0%, transparent 55%)' }} />
        </div>

        <div className="r-drawer-content" style={{ padding: '4px 36px 52px' }}>
          <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.24em', marginTop: 0, marginBottom: 12 }}>
            {member.role}
          </p>
          <h2 id="member-dialog-title" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', marginTop: 0, marginBottom: 28 }}>
            {member.name}
          </h2>

          {member.bio.map((para, i) => (
            <p key={i} style={{ fontSize: 15, lineHeight: 1.72, color: '#A5A5A5', marginTop: 0, marginBottom: 18 }}>
              {para}
            </p>
          ))}

          <div style={{ borderTop: '1px solid #1E1E1E', marginTop: 28, paddingTop: 28 }}>
            <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.2em', marginTop: 0, marginBottom: 18 }}>
              CREDENTIALS
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {member.credentials.map((c) => (
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
  )
}
