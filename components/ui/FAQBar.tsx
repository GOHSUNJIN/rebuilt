import Link from 'next/link'

export default function FAQBar({ label, href }: { label: string; href: string }) {
  return (
    <section className="r-px" style={{ padding: '24px 48px', borderTop: '1px solid #212429', borderBottom: '1px solid #212429', background: '#09090d', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
      <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.2em', margin: 0 }}>
        {label}
      </p>
      <Link href={href} style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.18em', textDecoration: 'none' }}>
        View FAQ →
      </Link>
    </section>
  )
}
