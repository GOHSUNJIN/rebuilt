'use client'
import { useState, useEffect } from 'react'

const PRESETS = [
  { name: 'Red',     accent: '#e03535', hover: '#f04545' },
  { name: 'Copper',  accent: '#c4714a', hover: '#d4845e' },
  { name: 'Sage',    accent: '#7aad6e', hover: '#8fc082' },
  { name: 'Steel',   accent: '#6b8fae', hover: '#7ea3c0' },
  { name: 'Violet',  accent: '#9b7cc4', hover: '#ae91d4' },
  { name: 'Rose',    accent: '#c47a8a', hover: '#d48e9c' },
  { name: 'Amber',   accent: '#d4a017', hover: '#e2b020' },
  { name: 'Teal',    accent: '#4aada8', hover: '#5cbfba' },
]

export default function ThemePlayground() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [custom, setCustom] = useState('')

  useEffect(() => {
    const preset = PRESETS[active]
    document.documentElement.style.setProperty('--accent', preset.accent)
    document.documentElement.style.setProperty('--accent-hover', preset.hover)
  }, [active])

  function applyCustom(hex: string) {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return
    document.documentElement.style.setProperty('--accent', hex)
    document.documentElement.style.setProperty('--accent-hover', hex)
  }

  return (
    <div style={{ position: 'fixed', bottom: 80, left: 16, zIndex: 9999, fontFamily: 'ui-monospace,Menlo,monospace' }}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Theme Playground"
        style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--accent)', border: 'none',
          cursor: 'pointer', display: 'grid', placeItems: 'center',
          boxShadow: '0 2px 12px rgba(0,0,0,.5)',
          fontSize: 14, transition: 'transform .15s',
          transform: open ? 'rotate(45deg)' : 'none',
        }}
        aria-label="Toggle theme playground"
      >
        ✦
      </button>

      {open && (
        <div style={{
          position: 'absolute', bottom: 44, left: 0,
          background: '#14161a', border: '1px solid #262a30',
          padding: '16px', width: 224,
          boxShadow: '0 8px 32px rgba(0,0,0,.6)',
        }}>
          <p style={{ fontSize: 9, color: '#5f6670', letterSpacing: '.22em', margin: '0 0 14px' }}>
            THEME · DEV ONLY
          </p>

          {/* Presets */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 14 }}>
            {PRESETS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => { setActive(i); setCustom('') }}
                title={p.name}
                style={{
                  height: 28, borderRadius: 2,
                  background: p.accent,
                  border: i === active ? '2px solid #fff' : '2px solid transparent',
                  cursor: 'pointer', padding: 0,
                  transition: 'border-color .1s',
                }}
              />
            ))}
          </div>

          {/* Preset label */}
          <p style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '.16em', margin: '0 0 12px' }}>
            {custom ? 'CUSTOM' : PRESETS[active].name.toUpperCase()}
          </p>

          {/* Custom hex */}
          <div style={{ display: 'flex', gap: 6 }}>
            <input
              type="text"
              value={custom}
              onChange={e => setCustom(e.target.value)}
              placeholder="#e03535"
              maxLength={7}
              style={{
                flex: 1, background: '#0e1015', border: '1px solid #262a30',
                color: '#f2f4f7', fontSize: 11, padding: '7px 10px',
                fontFamily: 'inherit', outline: 'none',
              }}
            />
            <button
              onClick={() => applyCustom(custom)}
              style={{
                background: '#1e2126', border: '1px solid #262a30',
                color: '#a3aab4', fontSize: 10, letterSpacing: '.1em',
                padding: '0 10px', cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              SET
            </button>
          </div>

          <button
            onClick={() => {
              setActive(0)
              setCustom('')
              document.documentElement.style.setProperty('--accent', PRESETS[0].accent)
              document.documentElement.style.setProperty('--accent-hover', PRESETS[0].hover)
            }}
            style={{
              marginTop: 10, width: '100%', background: 'none',
              border: '1px solid #1e2126', color: '#5f6670',
              fontSize: 9, letterSpacing: '.18em', padding: '7px',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            RESET TO DEFAULT
          </button>
        </div>
      )}
    </div>
  )
}
