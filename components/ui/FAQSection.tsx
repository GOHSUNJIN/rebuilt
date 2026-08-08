import Link from 'next/link'
import FAQAccordion from './FAQAccordion'

interface FAQItem {
  num: string
  q: string
  a: string
}

interface FAQSectionProps {
  items: FAQItem[]
  sectionStyle?: React.CSSProperties
}

export default function FAQSection({ items, sectionStyle }: FAQSectionProps) {
  return (
    <section className="r-px" style={{ padding: '72px 48px', ...sectionStyle }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8, flexWrap: 'wrap', gap: 16 }}>
        <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-.025em', margin: 0, lineHeight: 0.96 }}>Questions.</h2>
        <Link href="/about#contact" style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.18em', textDecoration: 'none' }} className="hover-gold">
          ASK YOURS →
        </Link>
      </div>
      <FAQAccordion items={items} />
    </section>
  )
}
