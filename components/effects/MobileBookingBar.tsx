'use client'
import Link from 'next/link'
import { SITE } from '@/lib/site'

export default function MobileBookingBar() {
  return (
    <div className="mobile-book-bar">
      <Link
        href="/book"
        className="btn-gold"
        style={{ flex: 1, justifyContent: 'center', padding: '15px', fontSize: 12, letterSpacing: '.18em' }}
      >
        Book a consult
      </Link>
      <a
        href={SITE.contact.phoneTel}
        aria-label="Call us"
        className="mobile-book-btn"
        style={{
          display: 'grid',
          placeItems: 'center',
          width: 50,
          height: 50,
          border: '1px solid #2A2A2A',
          background: 'transparent',
          flexShrink: 0,
          color: '#909090',
          textDecoration: 'none',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </div>
  )
}
