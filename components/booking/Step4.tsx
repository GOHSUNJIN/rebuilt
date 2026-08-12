'use client'
import { inputStyle, formLabelStyle as labelStyle } from '@/lib/styles'
import type { Step4Props } from './types'

export default function Step4({ name, email, phone, notes, setName, setEmail, setPhone, setNotes }: Step4Props) {
  return (
    <>
      <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.22em', marginTop: 0, marginBottom: 20 }}>STEP 04 OF 05</p>
      <h2 className="r-h2" style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-.025em', marginTop: 0, marginBottom: 8, lineHeight: 0.96 }}>Your details</h2>
      <p style={{ fontSize: 15, color: '#a3aab4', marginTop: 0, marginBottom: 36 }}>We need a few things before we confirm.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="r2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={labelStyle}>NAME *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Jane Tan" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>EMAIL *</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="e.g. jane@email.com" style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>PHONE</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. +65 9123 4567" style={inputStyle} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <label style={labelStyle}>ANYTHING WE SHOULD KNOW?</label>
            {notes.length > 0 && (
              <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: notes.length > 2700 ? '#e07070' : '#5f6670', letterSpacing: '.1em' }}>
                {notes.length} / 3000
              </span>
            )}
          </div>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. 6 weeks post ACL surgery, cleared to load. Looking to return to football by March." rows={4} maxLength={3000} style={{ ...inputStyle, resize: 'none' }} />
        </div>
      </div>
    </>
  )
}
