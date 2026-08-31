import type { FeatureItem } from '@/lib/types'

export default function FeatureGrid({ items, cols = 3 }: { items: FeatureItem[], cols?: 3 | 4 }) {
  return (
    <div className={cols === 4 ? 'r4' : 'r3'} style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 2, background: '#1E1E1E' }}>
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
  )
}
