'use client'

import { useRef, useState, useCallback } from 'react'
import type { FeatureItem } from '@/lib/types'
import ScrollDots from '@/components/ui/ScrollDots'

export default function FeatureGrid({ items, cols = 3 }: { items: FeatureItem[], cols?: 3 | 4 }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.scrollWidth / items.length
    setActiveIndex(Math.min(Math.round(el.scrollLeft / cardWidth), items.length - 1))
  }, [items.length])

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={`r-feature-scroll ${cols === 4 ? 'r4' : 'r3'}`}
        style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 2, background: '#2A2A2A' }}
      >
        {items.map(({ num, title, desc, icon }) => (
          <div key={num} className="r-feature-cell" style={{ background: '#0B0B0B', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ color: 'var(--accent)' }}>{icon}</div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-.01em', lineHeight: 1.2 }}>{title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: '#A5A5A5', margin: 0 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <ScrollDots count={items.length} activeIndex={activeIndex} className="r-feature-dots" />
    </>
  )
}
