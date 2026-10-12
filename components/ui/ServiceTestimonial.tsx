import Image from 'next/image'
import { avatarColor } from '@/lib/utils'

interface Props {
  imageSrc: string
  imageAlt: string
  imagePosition?: string
  quote: string
  initial: string
  name: string
  role: string
}

export default function ServiceTestimonial({ imageSrc, imageAlt, imagePosition, quote, initial, name, role }: Props) {
  return (
    <section className="r-testimonial-section" style={{ background: '#171717', borderTop: '1px solid #2A2A2A', borderBottom: '1px solid #2A2A2A' }}>
      <div className="r2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 340 }}>
        <div className="r-testimonial-img" style={{ position: 'relative', overflow: 'hidden', minHeight: 280 }}>
          <Image
            src={imageSrc} alt={imageAlt} fill
            style={{ objectFit: 'cover', objectPosition: imagePosition }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, transparent 30%, #171717 100%)' }} />
        </div>
        <div className="r-testimonial-content r-px r-tall-pad" style={{ padding: '52px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 14, color: '#F4B400', letterSpacing: '.06em', margin: '0 0 20px' }}>★★★★★</p>
          <blockquote className="r-testimonial-quote" style={{ fontSize: 22, lineHeight: 1.55, fontWeight: 500, letterSpacing: '-.01em', color: '#FFFFFF', margin: '0 0 28px', fontStyle: 'normal', borderLeft: '2px solid var(--accent)', paddingLeft: 20 }}>
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: avatarColor(name), display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: 'Arial, sans-serif', flexShrink: 0 }}>
              {initial}
            </div>
            <div>
              <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#A5A5A5', margin: '0 0 6px', letterSpacing: '.1em' }}>{name}</p>
              <p className="r-testimonial-role" style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#909090', margin: 0, letterSpacing: '.18em' }}>{role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
