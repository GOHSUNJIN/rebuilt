'use client'
import { formLabelStyle as labelStyle } from '@/lib/styles'
import { LOCATION_OPTIONS, DAYS, ALL_TIMES, SAT_TIMES } from '@/lib/bookData'
import type { Step3Props } from './types'

export default function Step3({ activeDay, slots, setActiveDay, toggleSlot, location, setLocation, showLocation }: Step3Props) {
  return (
    <>
      <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.22em', marginTop: 0, marginBottom: 20 }}>STEP 03 OF 05</p>
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
                  style={{ padding: '11px 18px', background: active ? 'var(--accent)' : '#111316', border: `1px solid ${active ? 'var(--accent)' : '#1e2126'}`, color: active ? '#0b0c0e' : '#a3aab4', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s', textAlign: 'left' }}
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
              style={{ padding: '12px 20px', background: isActive ? 'var(--accent)' : hasSelected ? '#1a2010' : '#111316', border: `1px solid ${isActive ? 'var(--accent)' : hasSelected ? '#4a7c30' : '#1e2126'}`, color: isActive ? '#0b0c0e' : hasSelected ? '#8dc860' : '#a3aab4', cursor: 'pointer', fontSize: 12, fontWeight: 700, letterSpacing: '.16em', fontFamily: 'inherit', transition: 'all .15s', position: 'relative' }}
            >
              {d.toUpperCase()}
              {hasSelected && !isActive && <span style={{ position: 'absolute', top: 4, right: 4, width: 5, height: 5, borderRadius: '50%', background: '#8dc860', display: 'block' }} />}
            </button>
          )
        })}
      </div>

      {activeDay && (
        <>
          <p style={{ ...labelStyle, marginBottom: 14 }}>TIMES · {activeDay.toUpperCase()} <span style={{ color: '#5f6670', letterSpacing: '.1em' }}>(select all that work · SGT)</span></p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: slots.length > 0 ? 28 : 0 }}>
            {(activeDay === 'Sat' ? SAT_TIMES : ALL_TIMES).map(time => {
              const key = `${activeDay}-${time}`
              const isSelected = slots.includes(key)
              return (
                <button key={time} type="button" onClick={() => toggleSlot(key)}
                  style={{ padding: '13px 22px', fontSize: 13, background: isSelected ? 'var(--accent)' : '#111316', border: `1px solid ${isSelected ? 'var(--accent)' : '#1e2126'}`, color: isSelected ? '#0b0c0e' : '#a3aab4', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s', fontWeight: isSelected ? 700 : 400 }}
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
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 12px', background: '#111316', border: '1px solid rgba(217,158,92,.25)', color: 'var(--accent)', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', letterSpacing: '.08em' }}
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
