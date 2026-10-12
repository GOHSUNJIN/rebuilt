import Link from 'next/link'
import type { CrosslinkItem } from '@/lib/types'

export default function ServiceCrosslinks({ items }: { items: CrosslinkItem[] }) {
  return (
    <section style={{ borderTop: '1px solid #2A2A2A', background: '#0B0B0B' }}>
      <div className="r-crosslinks-section r-px r-tall-pad" style={{ padding: '52px 48px' }}>
        <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.22em', marginTop: 0, marginBottom: 28 }}>
          ALSO AT REBUILT
        </p>
        <div className="r-crosslinks-grid r3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: '#1E1E1E' }}>
          {items.map(({ label, href, desc }) => (
            <Link key={label} href={href} className="hover-approach r-feature-cell r-crosslinks-card" style={{ background: '#0B0B0B', padding: '32px 28px', textDecoration: 'none', display: 'block' }}>
              <p className="r-crosslinks-label" style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.18em', marginTop: 0, marginBottom: 12 }}>{label.toUpperCase()}</p>
              <p className="r-crosslinks-desc" style={{ fontSize: 14, lineHeight: 1.65, color: '#A5A5A5', margin: '0 0 18px' }}>{desc}</p>
              <span className="r-crosslinks-cta" style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.16em' }}>LEARN MORE →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
