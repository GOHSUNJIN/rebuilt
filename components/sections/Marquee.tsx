const DEFAULT_ITEMS = [
  'REHAB',
  'PERSONAL TRAINING',
  'SPORTS PERFORMANCE',
  'CORE COLLECTIVE',
  'EST. 2021',
  'REBUILT ACADEMY',
  'ONE TEAM',
  'ONE SET OF NOTES',
]

export default function Marquee({
  items = DEFAULT_ITEMS,
  speed = 50,
  reverse = false,
}: {
  items?: string[]
  speed?: number
  reverse?: boolean
}) {
  const doubled = [...items, ...items]

  return (
    <div style={{ overflow: 'hidden', background: '#050607', borderTop: '1px solid #1a1d22', borderBottom: '1px solid #1a1d22' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          animation: `marqueeScroll ${speed}s linear infinite ${reverse ? 'reverse' : ''}`,
          padding: '16px 0',
        }}
      >
        {doubled.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <span
              style={{
                font: '11px/1 ui-monospace,Menlo,monospace',
                color: '#8d95a0',
                letterSpacing: '.28em',
                padding: '0 28px',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </span>
            <span style={{ fontSize: 8, color: 'var(--accent)', flexShrink: 0, opacity: 0.65 }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  )
}
