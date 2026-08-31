import Link from 'next/link'
import Image from 'next/image'

interface Props {
  label?: string
  imageSrc: string
  imageAlt: string
  heading: React.ReactNode
  subheading: string
  bookHref: string
  bookLabel?: string
  imagePosition?: string
  headingSize?: number
  contentMaxWidth?: number
  inline?: boolean
}

export default function ServiceHero({
  label,
  imageSrc,
  imageAlt,
  heading,
  subheading,
  bookHref,
  bookLabel = 'Book a consult',
  imagePosition = 'center center',
  headingSize = 84,
  contentMaxWidth = 820,
  inline = false,
}: Props) {
  const large = headingSize >= 100
  return (
    <section className="r-hero" style={{ position: 'relative', height: 660, overflow: 'hidden', display: 'grid', alignItems: 'end' }}>
      <Image
        src={imageSrc} alt={imageAlt} fill priority
        style={{ objectFit: 'cover', objectPosition: imagePosition }}
        sizes="100vw"
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(8,9,11,.88) 0%, rgba(8,9,11,.52) 55%, rgba(8,9,11,.12) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, #0B0B0B 0%, transparent ${large ? 50 : 45}%)` }} />

      {label && (
        <div className="r-px" style={{ position: 'absolute', top: 0, left: 0, right: 0, borderBottom: '1px solid rgba(255,255,255,.07)', padding: '20px 48px' }}>
          <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.28em', margin: 0 }}>{label}</p>
        </div>
      )}
      <div className="r-hero-badge" style={{ position: 'absolute', bottom: 28, right: 28, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', background: 'rgba(9,9,13,.75)', border: '1px solid rgba(255,255,255,.1)', backdropFilter: 'blur(6px)' }}>
        <span style={{ width: 4, height: 4, background: 'var(--accent)', borderRadius: '50%', flexShrink: 0 }} />
        <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#A5A5A5', letterSpacing: '.2em' }}>CORE COLLECTIVE · SINGAPORE</span>
      </div>

      <div className="r-hero-content r-px" style={{ position: 'relative', padding: '0 48px 68px', maxWidth: contentMaxWidth }}>
        <h1
          className="r-h1"
          style={{
            fontSize: headingSize,
            fontWeight: 800,
            lineHeight: large ? 0.88 : 0.93,
            letterSpacing: large ? '-.04em' : '-.025em',
            margin: `0 0 ${large ? 28 : 26}px`,
            animation: `heroIn .7s cubic-bezier(.2,.7,.3,1) ${large ? '' : '.12s '}both`,
          }}
        >
          {heading}
        </h1>

        {inline ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: '#A5A5A5', maxWidth: 480, margin: 0 }}>{subheading}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexShrink: 0 }}>
              <Link href={bookHref} className="btn-gold" style={{ padding: '14px 28px' }}>{bookLabel}</Link>
              <Link href="/about#contact" style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.18em', textDecoration: 'none', transition: 'color .15s' }} className="hover-gold">
                ASK A QUESTION →
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: '#A5A5A5', maxWidth: 520, margin: '0 0 32px' }}>{subheading}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
              <Link href={bookHref} className="btn-gold" style={{ padding: '14px 28px' }}>{bookLabel}</Link>
              <Link href="/about#contact" style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.18em', textDecoration: 'none', transition: 'color .15s' }} className="hover-gold">
                ASK A QUESTION →
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
