import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #d99e5c',
        background: '#0e0f11',
        padding: '26px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 28,
        flexWrap: 'wrap',
      }}
    >
      {/* Left */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 26, flexWrap: 'wrap' }}
      >
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'block',
              flexShrink: 0,
              background: '#0b0c0e',
              position: 'relative',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpeg"
              alt="Rebuilt"
              style={{ position: 'absolute', width: '250%', height: 'auto', top: '-41%', left: '-75%' }}
            />
          </span>
          <span
            style={{ fontSize: 14, fontWeight: 700, letterSpacing: '.3em', color: '#f2f4f7' }}
          >
            REBUILT
          </span>
        </Link>
        <span style={{ width: 1, height: 22, background: '#23262b', display: 'block' }} />
        <span
          style={{
            font: '10px/1 ui-monospace,Menlo,monospace',
            letterSpacing: '.2em',
            color: '#79818c',
          }}
        >
          SINGAPORE
        </span>
      </div>

      {/* Right */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a
            href="#"
            title="Instagram"
            aria-label="Instagram"
            style={{
              display: 'grid',
              placeItems: 'center',
              width: 36,
              height: 36,
              border: '1px solid #262a30',
              transition: 'border-color .2s ease,color .2s ease,background .2s ease',
              color: '#a3aab4',
            }}
            className="hover-social"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="mailto:"
            title="Email"
            aria-label="Email"
            style={{
              display: 'grid',
              placeItems: 'center',
              width: 36,
              height: 36,
              border: '1px solid #262a30',
              transition: 'border-color .2s ease,color .2s ease,background .2s ease',
              color: '#a3aab4',
            }}
            className="hover-social"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="2.5" y="5" width="19" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </a>
          <a
            href="https://wa.me/"
            title="WhatsApp"
            aria-label="WhatsApp"
            style={{
              display: 'grid',
              placeItems: 'center',
              width: 36,
              height: 36,
              border: '1px solid #262a30',
              transition: 'border-color .2s ease,color .2s ease,background .2s ease',
              color: '#a3aab4',
            }}
            className="hover-social"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.6-4.3A8.5 8.5 0 1 1 20.5 11.6z" />
              <path d="M9 9.6c0 3 2.4 5.4 5.4 5.4" />
            </svg>
          </a>
        </div>
        <Link href="/book" className="btn-gold" style={{ padding: '13px 24px' }}>
          Book a session
        </Link>
        <span style={{ width: 1, height: 22, background: '#23262b', display: 'block' }} />
        <Link
          href="/privacy"
          style={{
            transition: 'color .2s ease',
            color: '#868e99',
            font: '10px/1 ui-monospace,Menlo,monospace',
            letterSpacing: '.16em',
          }}
          className="hover-gold"
        >
          PRIVACY
        </Link>
        <Link
          href="/terms"
          style={{
            transition: 'color .2s ease',
            color: '#868e99',
            font: '10px/1 ui-monospace,Menlo,monospace',
            letterSpacing: '.16em',
          }}
          className="hover-gold"
        >
          TERMS
        </Link>
        <span
          style={{
            font: '10px/1 ui-monospace,Menlo,monospace',
            letterSpacing: '.16em',
            color: '#5f6670',
          }}
        >
          © 2026
        </span>
      </div>
    </footer>
  )
}
