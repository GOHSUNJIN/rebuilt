'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/site'
import { inputStyle, formLabelStyle as labelStyle } from '@/lib/styles'
import {
  SERVICE_PARAM_MAP, SERVICE_CATEGORY_MAP, SERVICE_FORMAT_MAP,
  isValidEmail, TABS, REHAB_OPTIONS, PT_FORMATS, PT_TYPES,
  COACHES, LOCATION_OPTIONS, DAYS, ALL_TIMES, SAT_TIMES, STEPS,
} from '@/lib/bookData'

const miniLabel: React.CSSProperties = {
  font: '9px/1 ui-monospace,Menlo,monospace', color: '#8d95a0',
  letterSpacing: '.2em', margin: '0 0 10px',
}

// ── Step sub-components ──────────────────────────────────────────────────────

interface Step1Props {
  category: string | null; ptFormat: string | null; service: string | null
  selectCategory: (id: string) => void
  setPtFormat: (id: string) => void
  setService: (s: string | null) => void
}

function Step1({ category, ptFormat, service, selectCategory, setPtFormat, setService }: Step1Props) {
  return (
    <>
      <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.22em', marginTop: 0, marginBottom: 20 }}>STEP 01 OF 05</p>
      <h2 className="r-h1" style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-.03em', marginTop: 0, marginBottom: 24, lineHeight: 0.93 }}>What are you<br />coming in for?</h2>

      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: '2px solid #1a1d22', marginBottom: 24, overflowX: 'auto', gap: 0, scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}>
        {TABS.map(({ id, label }) => (
          <button key={id} type="button" onClick={() => selectCategory(id)}
            style={{ padding: '10px 18px', flexShrink: 0, background: 'none', border: 'none', borderBottom: `2px solid ${category === id ? '#d99e5c' : 'transparent'}`, marginBottom: -2, color: category === id ? '#d99e5c' : '#5f6670', fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', transition: 'color .15s' }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {!category && (
        <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.18em', margin: '32px 0', textAlign: 'center' }}>
          SELECT A SERVICE ABOVE
        </p>
      )}

      {/* Rehab options */}
      {category === 'Rehabilitation' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#1a1d22' }}>
          {REHAB_OPTIONS.map(({ label, sub, popular }) => (
            <button key={label} type="button" onClick={() => setService(label)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', background: service === label ? '#15181f' : '#0c0e12', border: 'none', borderLeft: `3px solid ${service === label ? '#d99e5c' : 'transparent'}`, cursor: 'pointer', color: '#f2f4f7', fontFamily: 'inherit', textAlign: 'left', transition: 'all .15s' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: service === label ? '#f2f4f7' : '#a3aab4' }}>{label}</span>
                  {popular && <span style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', border: '1px solid rgba(217,158,92,.3)', padding: '3px 6px', letterSpacing: '.12em' }}>POPULAR</span>}
                </div>
                <span style={{ fontSize: 12, color: '#5f6670' }}>{sub}</span>
              </div>
              {service === label && <span style={{ color: '#d99e5c', flexShrink: 0, marginLeft: 16 }}>✓</span>}
            </button>
          ))}
        </div>
      )}

      {/* PT — two-stage */}
      {category === 'Training' && (
        <>
          <p style={miniLabel}>FORMAT</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#1a1d22', marginBottom: ptFormat ? 2 : 0 }}>
            {PT_FORMATS.map(({ id, sub }) => (
              <button key={id} type="button" onClick={() => { setPtFormat(id); setService(null) }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 18px', background: ptFormat === id ? '#15181f' : '#0c0e12', border: 'none', borderLeft: `3px solid ${ptFormat === id ? '#d99e5c' : 'transparent'}`, cursor: 'pointer', color: '#f2f4f7', fontFamily: 'inherit', textAlign: 'left', transition: 'all .15s' }}
              >
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 3px', color: ptFormat === id ? '#f2f4f7' : '#a3aab4' }}>{id}</p>
                  <p style={{ fontSize: 12, color: '#5f6670', margin: 0 }}>{sub}</p>
                </div>
                {ptFormat === id && <span style={{ color: '#d99e5c', flexShrink: 0, marginLeft: 16 }}>✓</span>}
              </button>
            ))}
          </div>
          {ptFormat && (
            <>
              <p style={{ ...miniLabel, marginTop: 16 }}>COMMITMENT</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#1a1d22' }}>
                <button type="button" onClick={() => setService(ptFormat)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', background: service === ptFormat ? '#15181f' : '#0c0e12', border: 'none', borderLeft: `3px solid ${service === ptFormat ? '#d99e5c' : 'transparent'}`, cursor: 'pointer', color: '#f2f4f7', fontFamily: 'inherit', textAlign: 'left', transition: 'all .15s' }}
                >
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 3px', color: service === ptFormat ? '#f2f4f7' : '#a3aab4' }}>Single session</p>
                    <p style={{ fontSize: 12, color: '#5f6670', margin: 0 }}>{PT_TYPES[ptFormat].single}</p>
                  </div>
                  {service === ptFormat && <span style={{ color: '#d99e5c', flexShrink: 0, marginLeft: 16 }}>✓</span>}
                </button>
                <button type="button" onClick={() => setService(`${ptFormat} · block`)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', position: 'relative', background: service === `${ptFormat} · block` ? '#15181f' : '#0c0e12', border: 'none', borderLeft: `3px solid ${service === `${ptFormat} · block` ? '#d99e5c' : 'transparent'}`, cursor: 'pointer', color: '#f2f4f7', fontFamily: 'inherit', textAlign: 'left', transition: 'all .15s' }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: service === `${ptFormat} · block` ? '#f2f4f7' : '#a3aab4' }}>Block of 20</p>
                      <span style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', border: '1px solid rgba(217,158,92,.3)', padding: '3px 6px', letterSpacing: '.12em' }}>POPULAR</span>
                    </div>
                    <p style={{ fontSize: 12, color: '#5f6670', margin: 0 }}>{PT_TYPES[ptFormat].block}</p>
                  </div>
                  {service === `${ptFormat} · block` && <span style={{ color: '#d99e5c', flexShrink: 0, marginLeft: 16 }}>✓</span>}
                </button>
              </div>
            </>
          )}
        </>
      )}

      {/* Physiotherapy — two options, one available, one coming soon */}
      {category === 'Physiotherapy' && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#1a1d22' }}>
            <div style={{ padding: '18px 20px', background: '#0d0f12', borderLeft: '3px solid #d99e5c', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px', color: '#c2c7ce' }}>Physiotherapy with Rehab &amp; Beyond</p>
                <p style={{ fontSize: 12, color: '#8d95a0', margin: 0 }}>Partner clinic · available now</p>
              </div>
              <span style={{ color: '#d99e5c', fontSize: 14, flexShrink: 0, marginLeft: 20 }}>✓</span>
            </div>
            <div style={{ padding: '18px 20px', background: '#0a0b0e', borderLeft: '3px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'not-allowed', userSelect: 'none' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#6f7783' }}>In-house Physiotherapy at Rebuilt</p>
                  <span style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: '#6f7783', border: '1px solid rgba(111,119,131,.3)', padding: '3px 6px', letterSpacing: '.12em', flexShrink: 0 }}>COMING SOON</span>
                </div>
                <p style={{ fontSize: 12, color: '#5f6670', margin: 0 }}>One team, same building · not yet available</p>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: '#6f7783', margin: '14px 0 0', lineHeight: 1.5 }}>
            Hit continue to select your coach and preferred times.
          </p>
        </>
      )}

      {/* Auto-confirmed tabs */}
      {(category === 'Performance' || category === 'Not sure yet') && (
        <>
          <div style={{ padding: '18px 20px', background: '#0d0f12', borderLeft: '3px solid #d99e5c', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px', color: '#c2c7ce' }}>{category}</p>
              <p style={{ fontSize: 12, color: '#8d95a0', margin: 0 }}>
                {category === 'Performance' ? 'Pre-season, in-season or off-season blocks' : 'We\'ll help you choose the right service'}
              </p>
            </div>
            <span style={{ color: '#d99e5c', fontSize: 14, flexShrink: 0, marginLeft: 20 }}>✓</span>
          </div>
          <p style={{ fontSize: 13, color: '#6f7783', margin: '14px 0 0', lineHeight: 1.5 }}>
            Hit continue to select your coach and preferred times.
          </p>
        </>
      )}
    </>
  )
}

interface Step2Props {
  coach: string
  setCoach: (c: string) => void
}

function Step2({ coach, setCoach }: Step2Props) {
  return (
    <>
      <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.22em', marginTop: 0, marginBottom: 20 }}>STEP 02 OF 05</p>
      <h2 className="r-h2" style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-.025em', marginTop: 0, marginBottom: 8, lineHeight: 0.96 }}>Choose a coach.</h2>
      <p style={{ fontSize: 15, color: '#a3aab4', marginTop: 0, marginBottom: 28 }}>You can always switch after your first session.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#1a1d22' }}>
        {COACHES.map(({ label, sub, detail }) => {
          const selected = coach === label
          return (
            <button key={label} type="button" onClick={() => setCoach(label)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 22px', background: selected ? '#15181f' : '#0d0f12', border: 'none', borderLeft: `3px solid ${selected ? '#d99e5c' : 'transparent'}`, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all .15s' }}
            >
              <div>
                <p style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.2em', margin: '0 0 8px' }}>{sub.toUpperCase()}</p>
                <p style={{ fontSize: 15, fontWeight: 700, margin: '0 0 5px', color: selected ? '#f2f4f7' : '#c2c7ce', letterSpacing: '-.01em' }}>{label}</p>
                <p style={{ fontSize: 12.5, color: '#8d95a0', margin: 0 }}>{detail}</p>
              </div>
              {selected && <span style={{ color: '#d99e5c', fontSize: 14, flexShrink: 0, marginLeft: 20 }}>✓</span>}
            </button>
          )
        })}
      </div>
    </>
  )
}

interface Step3Props {
  activeDay: string | null; slots: string[]
  setActiveDay: (d: string) => void
  toggleSlot: (key: string) => void
  location: string
  setLocation: (l: string) => void
  showLocation: boolean
}

function Step3({ activeDay, slots, setActiveDay, toggleSlot, location, setLocation, showLocation }: Step3Props) {
  return (
    <>
      <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.22em', marginTop: 0, marginBottom: 20 }}>STEP 03 OF 05</p>
      <h2 className="r-h2" style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-.025em', marginTop: 0, marginBottom: 8, lineHeight: 0.96 }}>Preferred time slots</h2>
      <p style={{ fontSize: 15, color: '#a3aab4', marginTop: 0, marginBottom: 36 }}>Pick the days and times that work for you. We will confirm the exact slot.</p>

      {showLocation && (
        <>
          <p style={{ ...labelStyle, marginBottom: 14 }}>LOCATION PREFERENCE</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
            {LOCATION_OPTIONS.map(({ id, sub }) => {
              const active = location === id
              return (
                <button key={id} type="button" onClick={() => setLocation(id)}
                  style={{ padding: '11px 18px', background: active ? '#d99e5c' : '#111316', border: `1px solid ${active ? '#d99e5c' : '#1e2126'}`, color: active ? '#0b0c0e' : '#a3aab4', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s', textAlign: 'left' }}
                >
                  <p style={{ fontSize: 12, fontWeight: 700, margin: '0 0 2px', letterSpacing: '.06em', color: 'inherit' }}>{id}</p>
                  <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', margin: 0, opacity: 0.7, letterSpacing: '.1em', color: 'inherit' }}>{sub.toUpperCase()}</p>
                </button>
              )
            })}
          </div>
        </>
      )}

      <p style={{ ...labelStyle, marginBottom: 14 }}>DAY</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {DAYS.map(d => {
          const hasSelected = slots.some(s => s.startsWith(`${d}-`))
          const isActive = activeDay === d
          return (
            <button key={d} type="button" onClick={() => setActiveDay(d)}
              style={{ padding: '12px 20px', background: isActive ? '#d99e5c' : hasSelected ? '#1a2010' : '#111316', border: `1px solid ${isActive ? '#d99e5c' : hasSelected ? '#4a7c30' : '#1e2126'}`, color: isActive ? '#0b0c0e' : hasSelected ? '#8dc860' : '#a3aab4', cursor: 'pointer', fontSize: 12, fontWeight: 700, letterSpacing: '.16em', fontFamily: 'inherit', transition: 'all .15s', position: 'relative' }}
            >
              {d.toUpperCase()}
              {hasSelected && !isActive && <span style={{ position: 'absolute', top: 4, right: 4, width: 5, height: 5, borderRadius: '50%', background: '#8dc860', display: 'block' }} />}
            </button>
          )
        })}
      </div>

      {activeDay && (
        <>
          <p style={{ ...labelStyle, marginBottom: 14 }}>TIMES · {activeDay.toUpperCase()} <span style={{ color: '#5f6670', letterSpacing: '.1em' }}>(select all that work)</span></p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: slots.length > 0 ? 28 : 0 }}>
            {(activeDay === 'Sat' ? SAT_TIMES : ALL_TIMES).map(time => {
              const key = `${activeDay}-${time}`
              const isSelected = slots.includes(key)
              return (
                <button key={time} type="button" onClick={() => toggleSlot(key)}
                  style={{ padding: '13px 22px', fontSize: 13, background: isSelected ? '#d99e5c' : '#111316', border: `1px solid ${isSelected ? '#d99e5c' : '#1e2126'}`, color: isSelected ? '#0b0c0e' : '#a3aab4', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s', fontWeight: isSelected ? 700 : 400 }}
                >
                  {time}
                </button>
              )
            })}
          </div>
        </>
      )}

      {slots.length > 0 && (
        <div style={{ padding: '16px 18px', background: '#111316', border: '1px solid #1e2126' }}>
          <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.16em', margin: '0 0 12px' }}>
            SELECTED · {slots.length} {slots.length === 1 ? 'SLOT' : 'SLOTS'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {slots.map(s => (
              <button key={s} type="button" onClick={() => toggleSlot(s)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 12px', background: '#111316', border: '1px solid rgba(217,158,92,.25)', color: '#d99e5c', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', letterSpacing: '.08em' }}
              >
                {s.replace('-', ' ')} <span style={{ fontSize: 10, opacity: 0.6 }}>✕</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

interface Step4Props {
  name: string; email: string; phone: string; notes: string
  setName: (v: string) => void; setEmail: (v: string) => void
  setPhone: (v: string) => void; setNotes: (v: string) => void
}

function Step4({ name, email, phone, notes, setName, setEmail, setPhone, setNotes }: Step4Props) {
  return (
    <>
      <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.22em', marginTop: 0, marginBottom: 20 }}>STEP 04 OF 05</p>
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
          <label style={labelStyle}>ANYTHING WE SHOULD KNOW?</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. 6 weeks post ACL surgery, cleared to load. Looking to return to football by March." rows={4} style={{ ...inputStyle, resize: 'none' }} />
        </div>
      </div>
    </>
  )
}

interface Step5Props {
  summaryRows: { label: string; value: string | null | undefined }[]
  waUrl: string
  gmailUrl: string
}

function Step5({ summaryRows, waUrl, gmailUrl }: Step5Props) {
  return (
    <>
      <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.22em', marginTop: 0, marginBottom: 20 }}>STEP 05 OF 05</p>
      <h2 className="r-h2" style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-.025em', marginTop: 0, marginBottom: 8, lineHeight: 0.96 }}>Review &amp; send</h2>
      <p style={{ fontSize: 15, color: '#a3aab4', marginTop: 0, marginBottom: 36 }}>
        Check your details, then send your request. We&apos;ll confirm your slot and arrange payment shortly.
      </p>
      <div style={{ border: '1px solid #1e2126', background: '#111316', padding: '28px 24px', marginBottom: 24 }}>
        <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.16em', marginTop: 0, marginBottom: 20 }}>YOUR REQUEST</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {summaryRows.map(({ label, value }, i) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, padding: '12px 0', borderBottom: i < summaryRows.length - 1 ? '1px solid #1a1d22' : 'none' }}>
              <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.14em', flexShrink: 0, paddingTop: 2 }}>{label.toUpperCase()}</span>
              <span style={{ fontSize: 14, color: '#c2c7ce', textAlign: 'right', lineHeight: 1.5 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
      <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.14em', marginBottom: 16, marginTop: 0 }}>SEND YOUR REQUEST VIA</p>
      <div className="book-nav" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: '15px 28px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.6-4.3A8.5 8.5 0 1 1 20.5 11.6z" />
          </svg>
          WhatsApp
        </a>
        <a href={gmailUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '15px 28px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M2 7l10 7 10-7" />
          </svg>
          Email
        </a>
      </div>
    </>
  )
}

function Done() {
  return (
    <div style={{ textAlign: 'center', paddingTop: 40 }}>
      <div style={{ width: 56, height: 56, border: '1px solid #d99e5c', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 28px', color: '#d99e5c', fontSize: 22 }}>✓</div>
      <h2 className="r-h2" style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-.025em', marginTop: 0, marginBottom: 12, lineHeight: 0.96 }}>Request sent.</h2>
      <p style={{ fontSize: 16, color: '#a3aab4', marginTop: 0, marginBottom: 16 }}>We&apos;ll get back to you shortly to confirm your slot and arrange payment.</p>
      <p style={{ fontSize: 14, color: '#5f6670', marginTop: 0, marginBottom: 40, lineHeight: 1.6 }}>
        No reply? Reach us at{' '}
        <a href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(SITE.contact.email)}`} target="_blank" rel="noopener noreferrer" style={{ color: '#d99e5c' }}>{SITE.contact.email}</a>
        {' '}or{' '}
        <a href={SITE.contact.phoneTel} style={{ color: '#d99e5c' }}>{SITE.contact.phone}</a>.
      </p>
      <Link href="/" className="btn-outline" style={{ padding: '14px 28px' }}>Back to home</Link>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

function BookContent() {
  const searchParams = useSearchParams()
  const [step, setStep]           = useState(1)
  const [category, setCategory]   = useState<string | null>('Rehabilitation')
  const [ptFormat, setPtFormat]   = useState<string | null>(null)
  const [service, setService]     = useState<string | null>(null)
  const [coach, setCoach]         = useState('No preference')
  const [activeDay, setActiveDay] = useState<string | null>(null)
  const [slots, setSlots]         = useState<string[]>([])
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [phone, setPhone]         = useState('')
  const [notes, setNotes]         = useState('')
  const [showError, setShowError] = useState(false)
  const [location, setLocation]   = useState('No preference')
  const contentRef = useRef<HTMLDivElement>(null)
  const mounted    = useRef(false)

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step])

  useEffect(() => {
    const param = searchParams.get('service')
    if (param && SERVICE_PARAM_MAP[param]) {
      setService(SERVICE_PARAM_MAP[param])
      setCategory(SERVICE_CATEGORY_MAP[param] ?? null)
      const fmt = SERVICE_FORMAT_MAP[param]
      if (fmt) setPtFormat(fmt)
      setStep(2)
    }
  }, [searchParams])

  useEffect(() => { setShowError(false) }, [step])

  const toggleSlot = (key: string) => setSlots(prev => prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key])

  const canContinue = () => {
    if (step === 1) return !!service
    if (step === 2) return true
    if (step === 3) return slots.length > 0
    if (step === 4) return name.trim() !== '' && isValidEmail(email)
    return true
  }

  const selectCategory = (id: string) => {
    setCategory(id); setPtFormat(null)
    setService(id === 'Performance' || id === 'Physiotherapy' || id === 'Not sure yet' ? id : null)
  }

  const showLocation = category === 'Rehabilitation' || category === 'Training' || category === 'Performance'

  const sep = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`

  const bookingLines = [
    `Service:          ${service ?? 'Not specified'}`,
    showLocation ? `Location:         ${location}` : null,
    `Coach:            ${coach}`,
    `Preferred times:  ${slots.map(s => s.replace('-', ' ')).join(', ') || 'Not specified'}`,
  ].filter(Boolean).join('\n')

  const contactLines = [
    `Name:             ${name.trim()}`,
    `Email:            ${email.trim()}`,
    phone ? `Phone:            ${phone}` : null,
  ].filter(Boolean).join('\n')

  const emailBody = [
    `REBUILT SINGAPORE`,
    `Rehab · Training · Performance · Physiotherapy`,
    sep,
    ``,
    `Hi Rebuilt,`,
    ``,
    `I'd like to book a consultation.`,
    ``,
    `BOOKING`,
    sep,
    bookingLines,
    ``,
    `CONTACT`,
    sep,
    contactLines,
    notes ? `\nNOTES\n${sep}\n${notes}` : null,
    ``,
    sep,
    `Thank you`,
  ].filter(l => l !== null).join('\n')

  const waUrl = `${SITE.contact.whatsapp}?text=${encodeURIComponent(`Hi Rebuilt,\n\nI'd like to book a consultation.\n\n${sep}\n${bookingLines}\n\n${sep}\n${contactLines}`)}`

  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(SITE.contact.email)}&su=${encodeURIComponent('Consultation Booking - Rebuilt')}&body=${encodeURIComponent(emailBody)}`

  const summaryRows = [
    { label: 'Service',         value: service },
    { label: 'Coach',           value: coach },
    { label: 'Location',        value: showLocation ? location : null },
    { label: 'Preferred times', value: slots.length > 0 ? slots.map(s => s.replace('-', ' ')).join(', ') : null },
    { label: 'Name',            value: name || null },
    { label: 'Email',           value: email || null },
    { label: 'Phone',           value: phone || null },
    { label: 'Notes',           value: notes || null },
  ].filter(r => r.value)

  return (
    <div className="book-page-root" style={{ fontFamily: 'Archivo,Helvetica,Arial,sans-serif', background: '#0b0c0e', color: '#f2f4f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <nav className="r-px" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', background: '#0b0c0e', borderBottom: '1px solid #212429' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
          <Image src="/rebuilt-mark.svg" alt="Rebuilt" width={30} height={30} style={{ display: 'block' }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '.34em', color: '#f2f4f7', lineHeight: 1 }}>REBUILT</div>
            <div style={{ marginTop: 3, font: '7px/1 ui-monospace,Menlo,monospace', letterSpacing: '.2em', color: '#d99e5c' }}>SINGAPORE</div>
          </div>
        </Link>
        <Link href="/" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: '#8d95a0', textDecoration: 'none' }}>← Close</Link>
      </nav>

      {/* Step indicator */}
      <div className="r-px" style={{ display: 'flex', alignItems: 'center', padding: '0 48px', borderBottom: '1px solid #1e2126', background: '#0b0c0e', overflowX: 'auto' }}>
        {STEPS.map(({ num, label }, i) => {
          const done = step > num; const current = step === num
          return (
            <div key={num} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '18px 0', paddingRight: i < STEPS.length - 1 ? 20 : 0, opacity: done || current ? 1 : 0.3 }}>
                <span style={{ width: 22, height: 22, border: `1px solid ${done || current ? '#d99e5c' : '#2a2e34'}`, background: done ? '#d99e5c' : 'transparent', color: done ? '#0b0c0e' : current ? '#d99e5c' : '#5f6670', font: '9px/1 ui-monospace,Menlo,monospace', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  {done ? '✓' : num}
                </span>
                <span className="book-step-label" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: current ? '#f2f4f7' : done ? '#d99e5c' : '#5f6670' }}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <span style={{ width: 16, height: 1, background: '#1e2126', display: 'block', marginRight: 20, flexShrink: 0 }} />}
            </div>
          )
        })}
      </div>

      {/* Content */}
      <div ref={contentRef} className="r-px book-content" style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '52px 48px 80px' }}>
        <div style={{ width: '100%', maxWidth: 600 }}>

          {/* Summary bar (steps 2-5) */}
          {step >= 2 && step < 6 && (service || slots.length > 0) && (
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 40, padding: '13px 18px', background: '#111316', border: '1px solid #1e2126' }}>
              {service && <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.14em' }}>SERVICE: <span style={{ color: '#c2c7ce' }}>{service}</span></span>}
              {coach !== 'No preference' && step > 2 && <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.14em' }}>COACH: <span style={{ color: '#c2c7ce' }}>{coach}</span></span>}
              {slots.length > 0 && <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.14em' }}>TIMES: <span style={{ color: '#c2c7ce' }}>{slots.length} selected</span></span>}
            </div>
          )}

          {step === 1 && <Step1 category={category} ptFormat={ptFormat} service={service} selectCategory={selectCategory} setPtFormat={id => { setPtFormat(id); setService(null) }} setService={setService} />}
          {step === 2 && <Step2 coach={coach} setCoach={setCoach} />}
          {step === 3 && <Step3 activeDay={activeDay} slots={slots} setActiveDay={setActiveDay} toggleSlot={toggleSlot} location={location} setLocation={setLocation} showLocation={showLocation} />}
          {step === 4 && <Step4 name={name} email={email} phone={phone} notes={notes} setName={setName} setEmail={setEmail} setPhone={setPhone} setNotes={setNotes} />}
          {step === 5 && <Step5 summaryRows={summaryRows} waUrl={waUrl} gmailUrl={gmailUrl} />}
          {step === 6 && <Done />}

          {/* Navigation (steps 1–4) */}
          {step >= 1 && step <= 4 && (
            <div style={{ marginTop: 40, paddingTop: 28, borderTop: '1px solid #1e2126' }}>
              <div className="book-nav" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                {step > 1 && (
                  <button type="button" onClick={() => setStep(s => s - 1)} style={{ padding: '14px 24px', background: 'transparent', border: '1px solid #2a2e34', color: '#8d95a0', fontSize: 12, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>← Back</button>
                )}
                <button type="button"
                  onClick={() => { if (canContinue()) { setStep(s => s + 1); setShowError(false) } else { setShowError(true) } }}
                  style={{ padding: '14px 36px', background: canContinue() ? '#d99e5c' : '#1a1d22', color: canContinue() ? '#0b0c0e' : '#4a4f57', border: 'none', fontSize: 12, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', cursor: canContinue() ? 'pointer' : 'not-allowed', fontFamily: 'inherit', transition: 'background .2s, color .2s', opacity: canContinue() ? 1 : 0.65 }}
                >
                  Continue →
                </button>
              </div>
              {showError && !canContinue() && (
                <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#e05c5c', letterSpacing: '.12em', marginTop: 16, marginBottom: 0 }}>
                  {step === 1 ? 'Please select a session type to continue.' : step === 3 ? 'Please select at least one preferred time slot.' : 'Please enter your name and email to continue.'}
                </p>
              )}
            </div>
          )}

          {/* Back + Done on review step */}
          {step === 5 && (
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #1e2126' }}>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#4a5060', letterSpacing: '.12em', margin: '0 0 16px' }}>SENT YOUR REQUEST? CLICK DONE TO FINISH.</p>
              <div className="book-nav" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <button type="button" onClick={() => setStep(4)} style={{ padding: '12px 22px', background: 'transparent', border: '1px solid #2a2e34', color: '#8d95a0', fontSize: 12, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>← Back</button>
                <button type="button" onClick={() => setStep(6)} style={{ padding: '12px 28px', background: '#d99e5c', border: 'none', color: '#0b0c0e', fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>Done</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default function BookPage() {
  return <Suspense><BookContent /></Suspense>
}
