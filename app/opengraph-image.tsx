import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Rebuilt Academy: Rehab, Training & Performance'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#0B0B0B',
        fontFamily: 'sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Left lime panel */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: 260,
          background: '#B7F000',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: '#0B0B0B',
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}
        >
          R
        </div>
        <div
          style={{
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: '0.3em',
            color: '#0B0B0B',
            marginTop: 10,
          }}
        >
          REBUILT
        </div>
      </div>

      {/* Right content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 72px',
          flex: 1,
        }}
      >
        {/* Brand label */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.3em',
            color: '#B7F000',
            marginBottom: 36,
          }}
        >
          REBUILT ACADEMY · SINGAPORE
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 92,
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            marginBottom: 32,
          }}
        >
          Rebuild
          <br />
          stronger.
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 19,
            color: '#A5A5A5',
            lineHeight: 1.55,
            maxWidth: 500,
          }}
        >
          Rehabilitation, personal training and sports performance — three locations across Singapore.
        </div>
      </div>
    </div>,
    size,
  )
}
