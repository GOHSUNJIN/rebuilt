import Link from 'next/link'

export default function FAQBar({ label, href }: { label: string; href: string }) {
  return (
    <section className="r-px" style={{ padding: '24px 48px', borderTop: '1px solid #2A2A2A', borderBottom: '1px solid #2A2A2A', background: '#0B0B0B', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
      <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.2em', margin: 0 }}>
        {label}
      </p>
      <Link href={href} style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.18em', textDecoration: 'none', transition: 'color .15s' }} className="hover-gold">
        View FAQ →
      </Link>
    </section>
  )
}
