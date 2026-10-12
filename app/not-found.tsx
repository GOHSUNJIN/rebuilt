import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <div style={{ fontFamily: 'Archivo,Helvetica,Arial,sans-serif', background: '#0B0B0B', color: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className="r-px r-404-wrap" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ maxWidth: 520, width: '100%' }}>
          <span style={{ fontSize: 'clamp(80px, 22vw, 160px)', fontWeight: 800, lineHeight: 1, color: 'rgba(255,255,255,.03)', display: 'block', letterSpacing: '-.04em', fontFamily: 'Archivo,sans-serif', marginBottom: -8, userSelect: 'none' }}>
            404
          </span>
          <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.28em', marginBottom: 20, marginTop: 0 }}>
            PAGE NOT FOUND
          </p>
          <h1 style={{ fontSize: 'clamp(32px, 7vw, 52px)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-.025em', margin: '0 0 18px' }}>
            Nothing here.
          </h1>
          <p style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', lineHeight: 1.65, color: '#A5A5A5', margin: '0 0 32px' }}>
            The page you are looking for has moved or does not exist.
          </p>
          <div className="r-404-btns" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-gold" style={{ padding: '15px 28px' }}>Go home</Link>
            <Link href="/about#contact-form" className="btn-outline" style={{ padding: '15px 28px' }}>Contact us</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
