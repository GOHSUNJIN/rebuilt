'use client'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div style={{ fontFamily: 'Archivo,Helvetica,Arial,sans-serif', background: '#0B0B0B', color: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className="r-px" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 520 }}>
          <div style={{ width: 40, height: 2, background: 'var(--accent)', margin: '0 auto 32px' }} />
          <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.28em', marginBottom: 22, marginTop: 0 }}>
            SOMETHING WENT WRONG
          </p>
          <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 0.95, letterSpacing: '-.025em', margin: '0 0 20px' }}>
            Unexpected error.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: '#A5A5A5', margin: '0 0 36px' }}>
            Something broke on our end. Try again, or reach out if the problem continues.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={reset} className="btn-gold" style={{ padding: '15px 28px', fontFamily: 'inherit', fontSize: 'inherit', cursor: 'pointer', border: 'none' }}>
              Try again
            </button>
            <Link href="/" className="btn-outline" style={{ padding: '15px 28px' }}>Go home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
