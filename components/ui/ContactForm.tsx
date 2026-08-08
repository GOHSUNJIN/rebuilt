'use client'
import { useState } from 'react'
import { submitContact } from '@/app/actions/contact'
import { SITE } from '@/lib/site'
import { inputStyle, formLabelStyle as labelStyle } from '@/lib/styles'

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
      <form style={{ display: 'flex', flexDirection: 'column', gap: 12 }} onSubmit={handleSubmit}>
        <div className="r2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <label>
            <span style={labelStyle}>NAME *</span>
            <input required name="name" type="text" placeholder="Your name" style={inputStyle} />
          </label>
          <label>
            <span style={labelStyle}>EMAIL *</span>
            <input required name="email" type="email" placeholder="your@email.com" style={inputStyle} />
          </label>
        </div>
        <label>
          <span style={labelStyle}>SERVICE</span>
          <select name="service" style={{ ...inputStyle, color: '#a3aab4' }}>
            <option value="" disabled>Select a service</option>
            <option value="Rehab">Rehab</option>
            <option value="Training">Training</option>
            <option value="Performance">Performance</option>
            <option value="Physiotherapy">Physiotherapy</option>
          </select>
        </label>
        <label>
          <span style={labelStyle}>MESSAGE</span>
          <textarea name="message" placeholder="Your question or message" rows={5} style={{ ...inputStyle, resize: 'none' }} />
        </label>
        {status === 'error' && (
          <p style={{ fontSize: 13, color: '#e07070', margin: 0 }}>{errorMsg}</p>
        )}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-gold r-btn-full"
          style={{ padding: '15px 28px', alignSelf: 'flex-start', opacity: status === 'sending' ? 0.6 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </form>
    </>
  )
}
