export default function LandscapeBlock() {
  return (
    <div className="landscape-block">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '0 32px', textAlign: 'center' }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d99e5c" strokeWidth="1.5" strokeLinecap="round">
          <rect x="4" y="7" width="16" height="11" rx="2" />
          <path d="M12 3v4M9 3l3-2 3 2" />
        </svg>
        <div>
          <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.28em', marginBottom: 14, marginTop: 0 }}>
            REBUILT SINGAPORE
          </p>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#f2f4f7', margin: '0 0 10px', letterSpacing: '-.01em' }}>
            Please rotate your device
          </p>
          <p style={{ fontSize: 14, color: '#6f7783', margin: 0, lineHeight: 1.6 }}>
            This site is best viewed in portrait mode
          </p>
        </div>
      </div>
    </div>
  )
}
