import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <div style={{ fontFamily: 'Archivo,Helvetica,Arial,sans-serif', background: '#0b0c0e', color: '#f2f4f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className="r-px" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 520 }}>
          <span className="r-404" style={{ fontSize: 160, fontWeight: 800, lineHeight: 1, color: 'rgba(255,255,255,.03)', display: 'block', letterSpacing: '-.04em', fontFamily: 'Archivo,sans-serif', marginBottom: -16, userSelect: 'none' }}>
            404
          </span>
          <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.28em', marginBottom: 22, marginTop: 0 }}>
            PAGE NOT FOUND
          </p>
          <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 0.95, letterSpacing: '-.025em', margin: '0 0 20px' }}>
            Nothing here.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: '#a3aab4', margin: '0 0 36px' }}>
            The page you are looking for has moved or does not exist.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-gold" style={{ padding: '15px 28px' }}>Go home</Link>
            <Link href="/about#contact" className="btn-outline" style={{ padding: '15px 28px' }}>Contact us</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
