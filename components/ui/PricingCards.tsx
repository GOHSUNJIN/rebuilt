import Link from 'next/link'
import type { PricingItem } from '@/lib/types'

export default function PricingCards({ items }: { items: PricingItem[] }) {
  return (
    <section className="r-px r-section-pad" style={{ padding: '72px 48px', borderTop: '1px solid #212429' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
        <h2 className="r-section-h2" style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-.025em', margin: 0, lineHeight: 0.96 }}>Sessions &amp; pricing.</h2>
        <span className="r-hide" style={{ font: '11px/1 ui-monospace,Menlo,monospace', letterSpacing: '.2em', color: '#8d95a0' }}>PAYNOW · CARD</span>
      </div>
      <div className="r3" style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 1, background: '#212429' }}>
        {items.map(({ type, price, sub, features, featured, href }) => (
          <div
            key={type}
            className="r-pricing-card"
            style={{ background: '#141922', padding: '36px 32px 40px', display: 'flex', flexDirection: 'column', borderTop: featured ? '2px solid var(--accent)' : '2px solid transparent' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#98a0aa', letterSpacing: '.2em', margin: 0 }}>{type.toUpperCase()}</p>
              {featured && <span style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', border: '1px solid rgba(217,158,92,.25)', padding: '4px 7px', letterSpacing: '.14em' }}>MOST POPULAR</span>}
            </div>
            {price.toLowerCase().startsWith('from ') && (
              <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#8d95a0', letterSpacing: '.2em', display: 'block', marginBottom: 6 }}>FROM</span>
            )}
            <p style={{ fontSize: 40, fontWeight: 800, color: featured ? 'var(--accent)' : '#f2f4f7', margin: '0 0 4px', letterSpacing: '-.02em', lineHeight: 1 }}>
              {price.toLowerCase().startsWith('from ') ? price.slice(5) : price}
            </p>
            <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.12em', margin: '0 0 28px' }}>{sub.toUpperCase()}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, marginBottom: 32 }}>
              {features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 4, height: 4, background: 'var(--accent)', borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontSize: 13.5, color: '#a3aab4' }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href={href} className={`${featured ? 'btn-gold' : 'btn-outline'} r-btn-full`} style={{ padding: '14px 24px', alignSelf: 'flex-start' }}>Book</Link>
          </div>
        ))}
      </div>
    </section>
  )
}
