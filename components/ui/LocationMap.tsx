'use client'
import { useState } from 'react'

const LOCATIONS = [
  {
    label: 'Robinson',
    address: '120 Robinson Rd, #10-01',
    mapSrc: 'https://maps.google.com/maps?q=Core+Collective+Robinson+120+Robinson+Rd+Singapore&output=embed',
    directionsHref: 'https://www.google.com/maps/dir/?api=1&destination=Core+Collective+120+Robinson+Rd+Singapore',
  },
  {
    label: 'Dempsey',
    address: '27A Loewen Rd',
    mapSrc: 'https://maps.google.com/maps?q=Core+Collective+Dempsey+27A+Loewen+Rd+Singapore&output=embed',
    directionsHref: 'https://www.google.com/maps/dir/?api=1&destination=Core+Collective+27A+Loewen+Rd+Singapore',
  },
  {
    label: 'Katong',
    address: '112 East Coast Rd',
    mapSrc: 'https://maps.google.com/maps?q=Core+Collective+i12+Katong+112+East+Coast+Rd+Singapore&output=embed',
    directionsHref: 'https://www.google.com/maps/dir/?api=1&destination=Core+Collective+112+East+Coast+Rd+Singapore',
  },
]

export default function LocationMap() {
  const [active, setActive] = useState(0)
  const loc = LOCATIONS[active]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex', background: '#0B0B0B', borderBottom: '1px solid #1E1E1E', flexShrink: 0 }}>
        {LOCATIONS.map(({ label, address }, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setActive(i)}
            style={{
              flex: 1, padding: '12px 8px 10px', background: 'none', border: 'none',
              borderBottom: `2px solid ${active === i ? 'var(--accent)' : 'transparent'}`,
              marginBottom: -1,
              cursor: 'pointer', textAlign: 'center', fontFamily: 'inherit',
              transition: 'all .15s',
            }}
          >
            <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: active === i ? 'var(--accent)' : '#909090', letterSpacing: '.2em', margin: '0 0 3px', fontWeight: 700 }}>
              {label.toUpperCase()}
            </p>
            <p style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: active === i ? '#6f7783' : '#5f6670', letterSpacing: '.1em', margin: 0 }}>
              {address}
            </p>
          </button>
        ))}
      </div>

      {/* Map */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <iframe
          key={loc.mapSrc}
          title={loc.label}
          src={loc.mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block', width: '100%', height: '100%' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
        <a
          href={loc.directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute', bottom: 12, right: 12,
            font: '9px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)',
            letterSpacing: '.16em', background: 'rgba(11,12,14,.92)',
            border: '1px solid #2A2A2A', padding: '8px 12px',
            textDecoration: 'none', zIndex: 1, backdropFilter: 'blur(4px)',
          }}
        >
          GET DIRECTIONS ↗︎
        </a>
      </div>
    </div>
  )
}
