'use client'
import { useState, useRef, useCallback } from 'react'

const STATS = [
  { label: 'BASED',   value: 'Singapore, 3 locations' },
  { label: 'OPENED',  value: '2021' },
  { label: 'WE DO',   value: 'Rehab, training, performance, physiotherapy' },
  { label: 'NEXT UP', value: 'In-house physio coming soon' },
]

export default function StatsStrip() {
  const [activeIdx, setActiveIdx] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const handleScroll = useCallback(() => {
    const el = scrollRef.current; if (!el) return
    const cardWidth = el.scrollWidth / STATS.length
    setActiveIdx(Math.min(Math.round(el.scrollLeft / cardWidth), STATS.length - 1))
  }, [])

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="r4 r-about-stats"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #2A2A2A', background: '#2A2A2A', gap: 1 }}
      >
        {STATS.map(({ label, value }) => (
          <div key={label} style={{ padding: '28px 32px', background: '#0B0B0B' }}>
            <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.22em', margin: '0 0 10px' }}>{label}</p>
            <p style={{ fontSize: 14, color: '#FFFFFF', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>{value}</p>
          </div>
        ))}
      </div>
      <div className="r-stats-dots" style={{ display: 'none', justifyContent: 'center', gap: 6, padding: '10px 0', background: '#0B0B0B' }}>
        {STATS.map((_, i) => (
          <span key={i} style={{ width: i === activeIdx ? 20 : 6, height: 4, borderRadius: 2, background: i === activeIdx ? 'var(--accent)' : '#3A3A3A', transition: 'width .25s, background .25s', display: 'block' }} />
        ))}
      </div>
    </>
  )
}
