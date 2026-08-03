'use client'
import { useState } from 'react'
import { submitContact } from '@/app/actions/contact'
import { SITE } from '@/lib/site'

const inputStyle = {
  padding: '14px 16px',
  background: '#14161a',
  border: '1px solid #262a30',
  color: '#f2f4f7',
  fontSize: 14,
  fontFamily: 'inherit',
  width: '100%',
  boxSizing: 'border-box' as const,
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const result = await submitContact(new FormData(e.currentTarget))
    if (result.ok) {
      setStatus('done')
    } else {
      setErrorMsg(result.error ?? 'Something went wrong.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div style={{
          width: 48, height: 48, border: '1px solid #d99e5c', borderRadius: '50%',
          display: 'grid', placeItems: 'center', color: '#d99e5c', fontSize: 20, marginBottom: 24,
        }}>
          ✓
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', marginTop: 0, marginBottom: 12 }}>
          Message sent.
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: '#a3aab4', margin: 0 }}>
          We&apos;ll get back to you at {SITE.contact.email} within one business day.
        </p>
      </div>
    )
  }

  return (
    <>
      <h2 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.02, letterSpacing: '-.02em', marginTop: 0, marginBottom: 32 }}>
        Book or ask a question
      </h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: 12 }} onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <input required name="name"  type="text"  placeholder="Your name"       style={inputStyle} />
          <input required name="email" type="email" placeholder="your@email.com"  style={inputStyle} />
        </div>
        <select name="service" style={{ ...inputStyle, color: '#a3aab4' }}>
          <option value="">Select a service</option>
          <option value="Rehab">Rehab</option>
          <option value="Personal Training">Personal Training</option>
          <option value="Performance">Performance</option>
          <option value="Physiotherapy (waitlist)">Physiotherapy (waitlist)</option>
        </select>
        <textarea name="message" placeholder="Your question or message" rows={5} style={{ ...inputStyle, resize: 'none' }} />
        {status === 'error' && (
          <p style={{ fontSize: 13, color: '#e07070', margin: 0 }}>{errorMsg}</p>
        )}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-gold"
          style={{ padding: '15px 28px', alignSelf: 'flex-start', opacity: status === 'sending' ? 0.6 : 1 }}
        >
          {status === 'sending' ? 'Sending…' : 'Submit'}
        </button>
      </form>
    </>
  )
}
