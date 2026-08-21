'use client'
import { inputStyle, formLabelStyle as labelStyle } from '@/lib/styles'
import type { Step4Props } from './types'
import StepHeader from './StepHeader'

export default function Step4({ name, email, phone, notes, setName, setEmail, setPhone, setNotes }: Step4Props) {
  return (
    <>
      <StepHeader step={4} heading="Your details" />
      <p style={{ fontSize: 15, color: '#a3aab4', marginTop: 0, marginBottom: 36 }}>We need a few things before we confirm.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="r2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label htmlFor="book-name" style={labelStyle}>NAME *</label>
            <input id="book-name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" style={inputStyle} />
          </div>
          <div>
            <label htmlFor="book-email" style={labelStyle}>EMAIL *</label>
            <input id="book-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" style={inputStyle} />
          </div>
        </div>
        <div>
          <label htmlFor="book-phone" style={labelStyle}>PHONE</label>
          <input id="book-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. +65 9123 4567" style={inputStyle} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <label htmlFor="book-notes" style={labelStyle}>ANYTHING WE SHOULD KNOW?</label>
            {notes.length > 0 && (
              <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: notes.length > 2700 ? '#e07070' : '#5f6670', letterSpacing: '.1em' }}>
                {notes.length} / 3000
              </span>
            )}
          </div>
          <textarea id="book-notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. 6 weeks post ACL surgery, cleared to load. Looking to return to football by March." rows={4} maxLength={3000} style={{ ...inputStyle, resize: 'none' }} />
        </div>
      </div>
    </>
  )
}
