import Link from 'next/link'
import Image from 'next/image'

interface CTASectionProps {
  heading: string
  body: string
  bookHref: string
  bookLabel: string
  imageSrc: string
  imagePosition?: string
}

export default function CTASection({ heading, body, bookHref, bookLabel, imageSrc, imagePosition = 'center' }: CTASectionProps) {
  return (
    <section style={{ background: '#0B0B0B', borderTop: '1px solid #1E1E1E' }}>
      <div className="r2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 540 }}>
        <div className="r-px r-tall-pad" style={{ padding: '88px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ width: 36, height: 2, background: 'var(--accent)', marginBottom: 28 }} />
          <h2 className="r-h2" style={{ fontSize: 52, fontWeight: 800, lineHeight: 0.95, letterSpacing: '-.025em', margin: '0 0 20px' }}>{heading}</h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: '#A5A5A5', margin: '0 0 36px', maxWidth: 380 }}>{body}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
            <Link href={bookHref} className="btn-gold" style={{ padding: '14px 28px' }}>{bookLabel}</Link>
            <Link href="/about#contact" style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.18em', textDecoration: 'none', transition: 'color .15s' }} className="hover-gold">
              ASK A QUESTION →
            </Link>
          </div>
        </div>
        <div className="r-cta-img" style={{ position: 'relative', minHeight: 420, overflow: 'hidden' }}>
          <Image src={imageSrc} alt="" aria-hidden="true" fill style={{ objectFit: 'cover', objectPosition: imagePosition, opacity: 0.88 }} sizes="50vw" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0B0B0B 0%, rgba(14,18,32,.15) 30%, transparent 55%)' }} />
        </div>
      </div>
    </section>
  )
}
