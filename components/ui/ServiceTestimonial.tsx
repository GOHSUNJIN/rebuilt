import Image from 'next/image'

const AVATAR_COLORS = ['#4285F4', '#0F9D58', '#DB4437', '#F4B400', '#9C27B0', '#00ACC1', '#FF7043', '#5C6BC0', '#26A69A']
function avatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

interface Props {
  imageSrc: string
  imageAlt: string
  quote: string
  initial: string
  name: string
  role: string
}

export default function ServiceTestimonial({ imageSrc, imageAlt, quote, initial, name, role }: Props) {
  return (
    <section style={{ background: '#141922', borderTop: '1px solid #1e2126', borderBottom: '1px solid #1e2126' }}>
      <div className="r2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 340 }}>
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: 280 }}>
          <Image
            src={imageSrc} alt={imageAlt} fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, transparent 30%, #141922 100%)' }} />
        </div>
        <div className="r-px r-tall-pad" style={{ padding: '52px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--accent)', letterSpacing: '.06em', margin: '0 0 20px' }}>★★★★★</p>
          <blockquote style={{ fontSize: 22, lineHeight: 1.55, fontWeight: 500, letterSpacing: '-.01em', color: '#e8eaed', margin: '0 0 28px', fontStyle: 'normal' }}>
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: avatarColor(name), display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: 'Arial, sans-serif', flexShrink: 0 }}>
              {name[0]}
            </div>
            <div>
              <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#c2c7ce', margin: '0 0 6px', letterSpacing: '.1em' }}>{name}</p>
              <p className="r-testimonial-role" style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#8d95a0', margin: 0, letterSpacing: '.18em' }}>{role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
