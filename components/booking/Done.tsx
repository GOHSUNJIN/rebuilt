'use client'
import Link from 'next/link'
import { SITE } from '@/lib/site'

export default function Done() {
  return (
    <div style={{ textAlign: 'center', paddingTop: 40 }}>
      <div style={{ width: 56, height: 56, border: '1px solid var(--accent)', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 28px', color: 'var(--accent)', fontSize: 22 }}>✓</div>
      <h2 className="r-h2" style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-.025em', marginTop: 0, marginBottom: 12, lineHeight: 0.96 }}>Request sent.</h2>
      <p style={{ fontSize: 16, color: '#A5A5A5', marginTop: 0, marginBottom: 16 }}>We&apos;ll get back to you shortly to confirm your slot and arrange payment.</p>
      <p style={{ fontSize: 14, color: '#5f6670', marginTop: 0, marginBottom: 40, lineHeight: 1.6 }}>
        No reply? Reach us at{' '}
        <a href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(SITE.contact.email)}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>{SITE.contact.email}</a>
        {' '}or{' '}
        <a href={SITE.contact.phoneTel} style={{ color: 'var(--accent)' }}>{SITE.contact.phone}</a>.
      </p>
      <Link href="/" className="btn-outline" style={{ padding: '14px 28px' }}>Back to home</Link>
    </div>
  )
}
