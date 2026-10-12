'use client'
import { formLabelStyle as labelStyle } from '@/lib/styles'
import { LOCATION_OPTIONS, DAYS, ALL_TIMES, SAT_TIMES } from '@/lib/bookData'
import type { Step3Props } from './types'
import StepHeader from './StepHeader'

export default function Step3({ activeDay, slots, setActiveDay, toggleSlot, location, setLocation, showLocation }: Step3Props) {
  return (
    <>
      <StepHeader step={3} heading="Preferred time slots" />
      <p style={{ fontSize: 15, color: '#A5A5A5', marginTop: 0, marginBottom: 36 }}>Pick the days and times that work for you. We will confirm the exact slot.</p>

      {showLocation && (
        <>
          <p style={{ ...labelStyle, marginBottom: 14 }}>LOCATION PREFERENCE</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
            {LOCATION_OPTIONS.map(({ id, sub }) => {
              const active = location === id
              return (
                <button key={id} type="button" onClick={() => setLocation(id)}
                  style={{ padding: '11px 18px', background: active ? 'var(--accent)' : '#171717', border: `1px solid ${active ? 'var(--accent)' : '#1E1E1E'}`, color: active ? '#0B0B0B' : '#A5A5A5', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s', textAlign: 'left' }}
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
              style={{ padding: '12px 20px', background: isActive ? 'var(--accent)' : hasSelected ? 'rgba(183,240,0,.07)' : '#171717', border: `1px solid ${isActive ? 'var(--accent)' : hasSelected ? 'rgba(183,240,0,.3)' : '#2A2A2A'}`, color: isActive ? '#0B0B0B' : hasSelected ? 'var(--accent)' : '#A5A5A5', cursor: 'pointer', fontSize: 12, fontWeight: 700, letterSpacing: '.16em', fontFamily: 'inherit', transition: 'all .15s', position: 'relative' }}
            >
              {d.toUpperCase()}
              {hasSelected && !isActive && <span style={{ position: 'absolute', top: 4, right: 4, width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />}
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
                  style={{ padding: '13px 22px', fontSize: 13, background: isSelected ? 'var(--accent)' : '#171717', border: `1px solid ${isSelected ? 'var(--accent)' : '#2A2A2A'}`, color: isSelected ? '#0B0B0B' : '#A5A5A5', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s', fontWeight: isSelected ? 700 : 400 }}
                >
                  {time}
                </button>
              )
            })}
          </div>
        </>
      )}

      {slots.length > 0 && (
        <div style={{ padding: '16px 18px', background: '#171717', border: '1px solid #2A2A2A' }}>
          <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.16em', margin: '0 0 12px' }}>
            SELECTED · {slots.length} {slots.length === 1 ? 'SLOT' : 'SLOTS'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[...slots].sort((a, b) => {
              const [da, ta] = a.split('-'); const [db, tb] = b.split('-')
              const d = DAYS.indexOf(da) - DAYS.indexOf(db)
              return d !== 0 ? d : (ta ?? '').localeCompare(tb ?? '')
            }).map(s => (
              <button key={s} type="button" onClick={() => toggleSlot(s)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 12px', background: '#171717', border: '1px solid rgba(183,240,0,.25)', color: 'var(--accent)', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', letterSpacing: '.08em' }}
              >
                {s.replace('-', ' ')} <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ opacity: 0.6, flexShrink: 0 }}><line x1="1" y1="1" x2="7" y2="7"/><line x1="7" y1="1" x2="1" y2="7"/></svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
