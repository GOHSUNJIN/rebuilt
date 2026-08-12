'use client'
import { useState } from 'react'
import { SITE } from '@/lib/site'
import { inputStyle } from '@/lib/styles'
import { isValidEmail } from '@/lib/bookData'

const TAGS = ['Injury', 'Post-surgery', 'Pain', 'Return to sport', 'Not sure']

export default function PhysioForm({ compact = false }: { compact?: boolean }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const toggleTag = (tag: string) =>
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )

  const canSubmit = name.trim() && isValidEmail(email)

  const message = compact
    ? [
        'Hi Rebuilt! I would like to join the in-house physiotherapy waitlist.',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
      ].join('\n')
    : [
        'Hi Rebuilt! I would like to book a physiotherapy session.',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        selectedTags.length > 0 ? `What I need: ${selectedTags.join(', ')}` : null,
      ].filter(Boolean).join('\n')

  const subject = compact ? 'In-house physiotherapy waitlist' : 'Physiotherapy booking enquiry'
  const waUrl   = `${SITE.contact.whatsapp}?text=${encodeURIComponent(message)}`
  const mailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(SITE.contact.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`

  if (submitted) {
    return (
      <div style={{ width: '100%', maxWidth: 560, textAlign: 'center', padding: '32px 0' }}>
        <div style={{ width: 32, height: 1, background: 'var(--accent)', margin: '0 auto 24px' }} />
        <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em', marginBottom: 16, marginTop: 0 }}>
          {compact ? 'ON THE LIST' : 'REQUEST SENT'}
        </p>
        <p style={{ fontSize: 16, color: '#a3aab4', lineHeight: 1.65, margin: 0 }}>
          {compact
            ? 'We will reach out when in-house physiotherapy opens.'
            : 'We will be in touch shortly to confirm your session.'}
        </p>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: 560, textAlign: 'left' }}>
      {!compact && (
        <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#a3aab4', letterSpacing: '.2em', marginTop: 0, marginBottom: 14 }}>
          YOUR DETAILS
        </p>
      )}
      <div className="r2" style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1fr 1fr', gap: 10, marginBottom: 10 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#a3aab4', letterSpacing: '.2em' }}>NAME</span>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ ...inputStyle, padding: '14px 16px' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#a3aab4', letterSpacing: '.2em' }}>EMAIL</span>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ ...inputStyle, padding: '14px 16px' }}
          />
        </label>
      </div>
      {!compact && (
        <>
          <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#a3aab4', letterSpacing: '.2em', margin: '16px 0 12px' }}>
            WHAT DO YOU NEED?
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {TAGS.map(tag => {
              const active = selectedTags.includes(tag)
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    padding: '8px 14px',
                    border: `1px solid ${active ? 'var(--accent)' : '#2a2e34'}`,
                    background: active ? 'rgba(217,158,92,.1)' : 'transparent',
                    color: active ? 'var(--accent)' : '#a3aab4',
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: '.08em',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all .15s',
                  }}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </>
      )}
      {canSubmit ? (
        <div className="r-physio-btns" style={{ display: 'flex', gap: 10, marginTop: compact ? 10 : 0 }}>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setTimeout(() => setSubmitted(true), 400)}
            className="btn-gold"
            style={{ flex: 1, padding: '15px 16px' }}
          >
            Send via WhatsApp
          </a>
          <a
            href={mailUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setTimeout(() => setSubmitted(true), 400)}
            className="btn-outline"
            style={{ flex: 1, padding: '15px 16px' }}
          >
            Send via Email
          </a>
        </div>
      ) : (
        <button
          disabled
          style={{
            width: '100%',
            padding: '16px',
            background: '#1a1d22',
            color: '#5f6670',
            border: '1px solid #262a30',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '.16em',
            textTransform: 'uppercase',
            cursor: 'not-allowed',
            fontFamily: 'inherit',
            marginTop: compact ? 10 : 0,
          }}
        >
          Enter name and email to continue
        </button>
      )}
    </div>
  )
}
