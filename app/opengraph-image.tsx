import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Rebuilt Singapore — Rehab, Training & Performance'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0b0c0e',
        padding: '72px 80px',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Top accent */}
      <div style={{ width: '100%', height: 4, background: '#d99e5c', position: 'absolute', top: 0, left: 0 }} />

      {/* Logo */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '0.34em', color: '#f2f4f7' }}>REBUILT</div>
        <div style={{ fontSize: 10, letterSpacing: '0.22em', color: '#d99e5c', marginTop: 4 }}>SINGAPORE</div>
      </div>

      {/* Main headline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 0.96,
            letterSpacing: '-0.03em',
            color: '#f2f4f7',
          }}
        >
          Rebuild stronger.
        </div>
        <div style={{ fontSize: 22, color: '#a3aab4', lineHeight: 1.5, maxWidth: 620 }}>
          Coached rehabilitation, personal training and sports performance in Singapore.
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: 'flex',
          gap: 32,
          borderTop: '1px solid #212429',
          paddingTop: 24,
        }}
      >
        {['Rehab', 'Personal Training', 'Performance', 'Physiotherapy'].map((s) => (
          <div key={s} style={{ fontSize: 11, letterSpacing: '0.2em', color: '#5f6670' }}>
            {s.toUpperCase()}
          </div>
        ))}
      </div>
    </div>,
    size,
  )
}
