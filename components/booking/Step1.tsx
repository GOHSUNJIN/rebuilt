'use client'
import { TABS, REHAB_OPTIONS, PT_FORMATS, PT_TYPES } from '@/lib/bookData'
import type { Step1Props } from './types'
import StepHeader from './StepHeader'

const miniLabel: React.CSSProperties = {
  font: '9px/1 ui-monospace,Menlo,monospace', color: '#8d95a0',
  letterSpacing: '.2em', margin: '0 0 10px',
}

export default function Step1({ category, ptFormat, service, selectCategory, setPtFormat, setService }: Step1Props) {
  return (
    <>
      <StepHeader step={1} heading={<>What are you<br />coming in for?</>} large />

      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: '2px solid #1a1d22', marginBottom: 24, overflowX: 'auto', gap: 0, scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}>
        {TABS.map(({ id, label }) => (
          <button key={id} type="button" onClick={() => selectCategory(id)}
            style={{ padding: '10px 18px', flexShrink: 0, background: 'none', border: 'none', borderBottom: `2px solid ${category === id ? 'var(--accent)' : 'transparent'}`, marginBottom: -2, color: category === id ? 'var(--accent)' : '#5f6670', fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', transition: 'color .15s' }}
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
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', background: service === label ? '#15181f' : '#0c0e12', border: 'none', borderLeft: `3px solid ${service === label ? 'var(--accent)' : 'transparent'}`, cursor: 'pointer', color: '#f2f4f7', fontFamily: 'inherit', textAlign: 'left', transition: 'all .15s' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: service === label ? '#f2f4f7' : '#a3aab4' }}>{label}</span>
                  {popular && <span style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', border: '1px solid rgba(224,53,53,.3)', padding: '3px 6px', letterSpacing: '.12em' }}>POPULAR</span>}
                </div>
                <span style={{ fontSize: 12, color: '#5f6670' }}>{sub}</span>
              </div>
              {service === label && <span style={{ color: 'var(--accent)', flexShrink: 0, marginLeft: 16 }}>✓</span>}
            </button>
          ))}
        </div>
      )}

      {/* PT: two-stage */}
      {category === 'Training' && (
        <>
          <p style={miniLabel}>FORMAT</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#1a1d22', marginBottom: ptFormat ? 2 : 0 }}>
            {PT_FORMATS.map(({ id, sub }) => (
              <button key={id} type="button" onClick={() => { setPtFormat(id); setService(null) }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 18px', background: ptFormat === id ? '#15181f' : '#0c0e12', border: 'none', borderLeft: `3px solid ${ptFormat === id ? 'var(--accent)' : 'transparent'}`, cursor: 'pointer', color: '#f2f4f7', fontFamily: 'inherit', textAlign: 'left', transition: 'all .15s' }}
              >
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 3px', color: ptFormat === id ? '#f2f4f7' : '#a3aab4' }}>{id}</p>
                  <p style={{ fontSize: 12, color: '#5f6670', margin: 0 }}>{sub}</p>
                </div>
                {ptFormat === id && <span style={{ color: 'var(--accent)', flexShrink: 0, marginLeft: 16 }}>✓</span>}
              </button>
            ))}
          </div>
          {ptFormat && (
            <>
              <p style={{ ...miniLabel, marginTop: 16 }}>COMMITMENT</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#1a1d22' }}>
                <button type="button" onClick={() => setService(ptFormat)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', background: service === ptFormat ? '#15181f' : '#0c0e12', border: 'none', borderLeft: `3px solid ${service === ptFormat ? 'var(--accent)' : 'transparent'}`, cursor: 'pointer', color: '#f2f4f7', fontFamily: 'inherit', textAlign: 'left', transition: 'all .15s' }}
                >
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 3px', color: service === ptFormat ? '#f2f4f7' : '#a3aab4' }}>Single session</p>
                    <p style={{ fontSize: 12, color: '#5f6670', margin: 0 }}>{PT_TYPES[ptFormat].single}</p>
                  </div>
                  {service === ptFormat && <span style={{ color: 'var(--accent)', flexShrink: 0, marginLeft: 16 }}>✓</span>}
                </button>
                <button type="button" onClick={() => setService(`${ptFormat} · block`)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', position: 'relative', background: service === `${ptFormat} · block` ? '#15181f' : '#0c0e12', border: 'none', borderLeft: `3px solid ${service === `${ptFormat} · block` ? 'var(--accent)' : 'transparent'}`, cursor: 'pointer', color: '#f2f4f7', fontFamily: 'inherit', textAlign: 'left', transition: 'all .15s' }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: service === `${ptFormat} · block` ? '#f2f4f7' : '#a3aab4' }}>Block of 20</p>
                      <span style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', border: '1px solid rgba(224,53,53,.3)', padding: '3px 6px', letterSpacing: '.12em' }}>POPULAR</span>
                    </div>
                    <p style={{ fontSize: 12, color: '#5f6670', margin: 0 }}>{PT_TYPES[ptFormat].block}</p>
                  </div>
                  {service === `${ptFormat} · block` && <span style={{ color: 'var(--accent)', flexShrink: 0, marginLeft: 16 }}>✓</span>}
                </button>
              </div>
            </>
          )}
        </>
      )}

      {/* Physiotherapy: two options, one available, one coming soon */}
      {category === 'Physiotherapy' && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#1a1d22' }}>
            <div style={{ padding: '18px 20px', background: '#0d0f12', borderLeft: '3px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px', color: '#c2c7ce' }}>Physiotherapy with Rehab &amp; Beyond</p>
                <p style={{ fontSize: 12, color: '#8d95a0', margin: 0 }}>Partner clinic · available now</p>
              </div>
              <span style={{ color: 'var(--accent)', fontSize: 14, flexShrink: 0, marginLeft: 20 }}>✓</span>
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
          <div style={{ padding: '18px 20px', background: '#0d0f12', borderLeft: '3px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px', color: '#c2c7ce' }}>{category}</p>
              <p style={{ fontSize: 12, color: '#8d95a0', margin: 0 }}>
                {category === 'Performance' ? 'Pre-season, in-season or off-season blocks' : 'We\'ll help you choose the right service'}
              </p>
            </div>
            <span style={{ color: 'var(--accent)', fontSize: 14, flexShrink: 0, marginLeft: 20 }}>✓</span>
          </div>
          <p style={{ fontSize: 13, color: '#6f7783', margin: '14px 0 0', lineHeight: 1.5 }}>
            Hit continue to select your coach and preferred times.
          </p>
        </>
      )}
    </>
  )
}
