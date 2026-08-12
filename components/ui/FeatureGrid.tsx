import type { FeatureItem } from '@/lib/types'

export default function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <div className="r3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: '#1a1d22' }}>
      {items.map(({ num, title, desc, icon }) => (
        <div key={num} className="r-feature-cell" style={{ background: '#0c0e14', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ color: 'var(--accent)' }}>{icon}</div>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-.01em', lineHeight: 1.2 }}>{title}</h3>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: '#a3aab4', margin: 0 }}>{desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
