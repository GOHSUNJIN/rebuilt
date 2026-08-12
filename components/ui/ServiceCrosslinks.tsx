import Link from 'next/link'
import type { CrosslinkItem } from '@/lib/types'

export default function ServiceCrosslinks({ items }: { items: CrosslinkItem[] }) {
  return (
    <section style={{ borderTop: '1px solid #1e2126', background: '#09090d' }}>
      <div className="r-px r-tall-pad" style={{ padding: '52px 48px' }}>
        <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#8d95a0', letterSpacing: '.22em', marginTop: 0, marginBottom: 28 }}>
          ALSO AT REBUILT
        </p>
        <div className="r3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: '#1e2126' }}>
          {items.map(({ label, href, desc }) => (
            <Link key={label} href={href} className="hover-approach r-feature-cell" style={{ background: '#0c0e14', padding: '32px 28px', textDecoration: 'none', display: 'block' }}>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.18em', marginTop: 0, marginBottom: 12 }}>{label.toUpperCase()}</p>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#a3aab4', margin: '0 0 18px' }}>{desc}</p>
              <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.16em' }}>LEARN MORE →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
