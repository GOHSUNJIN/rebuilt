'use client'
import { COACHES } from '@/lib/bookData'
import { TEAM } from '@/lib/team'
import type { Step2Props } from './types'
import StepHeader from './StepHeader'

export default function Step2({ coach, setCoach }: Step2Props) {
  return (
    <>
      <StepHeader step={2} heading="Choose a coach." />
      <p style={{ fontSize: 15, color: '#A5A5A5', marginTop: 0, marginBottom: 28 }}>You can always switch after your first session.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#1E1E1E' }}>
        {COACHES.map(({ label, sub, detail }) => {
          const member = TEAM.find(t => t.name === label)
          const selected = coach === label
          const initials = label.split(' ').map((n: string) => n[0]).join('')

          return (
            <button
              key={label}
              type="button"
              onClick={() => setCoach(label)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 18,
                padding: '22px',
                background: selected ? '#171717' : '#0B0B0B',
                border: 'none',
                borderLeft: `3px solid ${selected ? 'var(--accent)' : 'transparent'}`,
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'left',
                transition: 'background .15s, border-color .15s',
              }}
            >
              {/* Avatar */}
              {member ? (
                member.image ? (
                  <div style={{
                    width: 72,
                    height: 72,
                    flexShrink: 0,
                    border: `1px solid ${selected ? 'var(--accent)' : '#2A2A2A'}`,
                    backgroundImage: `url(${member.image})`,
                    backgroundSize: member.avatarImageSize ?? member.imageSize ?? 'cover',
                    backgroundPosition: member.avatarImagePosition ?? member.imagePosition ?? 'center top',
                    transition: 'border-color .15s',
                  }} />
                ) : (
                <div style={{
                  width: 72,
                  height: 72,
                  background: '#0e1015',
                  border: `1px solid ${selected ? 'var(--accent)' : '#2A2A2A'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 15,
                  fontWeight: 800,
                  color: selected ? 'var(--accent)' : '#3a4250',
                  letterSpacing: '-.02em',
                  transition: 'border-color .15s, color .15s',
                }}>
                  {initials}
                </div>
                )
              ) : (
                <div style={{
                  width: 72,
                  height: 72,
                  background: '#0e1015',
                  border: `1px solid ${selected ? 'var(--accent)' : '#1E1E1E'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'border-color .15s',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={selected ? 'var(--accent)' : '#5f6670'} strokeWidth="1.5">
                    <circle cx="9" cy="7" r="3" /><path d="M3 21v-2a5 5 0 0 1 5-5h2" />
                    <circle cx="17" cy="10" r="3" /><path d="M21 21v-2a5 5 0 0 0-4-4.9" />
                  </svg>
                </div>
              )}

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em', margin: '0 0 7px' }}>
                  {sub.toUpperCase()}
                </p>
                <p style={{ fontSize: 15, fontWeight: 700, margin: '0 0 8px', color: selected ? '#FFFFFF' : '#A5A5A5', letterSpacing: '-.01em', transition: 'color .15s' }}>
                  {label}
                </p>
                <p style={{ fontSize: 12.5, lineHeight: 1.55, color: '#636b78', margin: 0 }}>
                  {member ? member.short : detail}
                </p>
                {member && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                    {member.credentials.slice(0, 2).map(c => (
                      <span key={c} style={{
                        font: '9px/1 ui-monospace,Menlo,monospace',
                        color: '#5f6670',
                        border: '1px solid #1E1E1E',
                        padding: '4px 8px',
                        letterSpacing: '.1em',
                        background: '#0B0B0B',
                      }}>
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {selected && (
                <span style={{ color: 'var(--accent)', fontSize: 14, flexShrink: 0, marginTop: 4 }}>✓</span>
              )}
            </button>
          )
        })}
      </div>
    </>
  )
}
