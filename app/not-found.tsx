import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = { title: '404 – Page not found' }

export default function NotFound() {
  return (
    <div style={{ fontFamily: 'Archivo,Helvetica,Arial,sans-serif', background: '#0b0c0e', color: '#f2f4f7', minHeight: '100vh' }}>
      <div style={{ height: 5, background: '#d99e5c' }} />
      <Navbar />

      <section
        className="r-px"
        style={{
          padding: '120px 48px 140px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.24em', marginTop: 0, marginBottom: 20 }}>
          REBUILT · 404
        </p>
        <h1
          className="r-h1"
          style={{ fontSize: 96, fontWeight: 800, lineHeight: 0.92, letterSpacing: '-.035em', marginTop: 0, marginBottom: 24, color: '#f2f4f7' }}
        >
          404
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.65, color: '#a3aab4', maxWidth: 480, marginTop: 0, marginBottom: 44 }}>
          This page doesn&apos;t exist. It might have moved, or you may have followed a broken link.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" className="btn-gold" style={{ padding: '16px 32px' }}>
            Back to home
          </Link>
          <Link href="/book" className="btn-outline" style={{ padding: '16px 32px' }}>
            Book a session
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
