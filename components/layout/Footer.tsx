'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { SITE, NAV_LINKS } from '@/lib/site'
import OpenStatus from '@/components/ui/OpenStatus'

type SocialTarget = { label: string; href: string; note: string } | null

export default function Footer() {
  const [target, setTarget] = useState<SocialTarget>(null)
  const pathname = usePathname()

  const socials: { label: string; href: string; note: string; icon: React.ReactNode }[] = [
    {
      label: 'Instagram',
      href: SITE.social.instagram,
      note: 'You\'re leaving the Rebuilt website to view our Instagram profile.',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: 'Email',
      href: `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(SITE.contact.email)}`,
      note: `This will open Gmail to send a message to ${SITE.contact.email}.`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      href: SITE.contact.whatsapp,
      note: 'You\'re leaving the Rebuilt website to open a WhatsApp conversation.',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.6-4.3A8.5 8.5 0 1 1 20.5 11.6z" />
          <path d="M9 9.6c0 3 2.4 5.4 5.4 5.4" />
        </svg>
      ),
    },
  ]

  const SocialButtons = ({ size = 36 }: { size?: number }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {socials.map(({ label, href, note, icon }) => (
        <button
          key={label}
          onClick={() => setTarget({ label, href, note })}
          title={label}
          aria-label={label}
          className="hover-social"
          style={{
            display: 'grid',
            placeItems: 'center',
            width: size,
            height: size,
            border: '1px solid #2A2A2A',
            background: 'transparent',
            cursor: 'pointer',
            color: '#A5A5A5',
            transition: 'border-color .2s ease,color .2s ease,background .2s ease',
            padding: 0,
          }}
        >
          {icon}
        </button>
      ))}
    </div>
  )

  return (
    <>
      {/* Popup overlay */}
      {target && (
        <div
          onClick={() => setTarget(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.72)',
            zIndex: 200,
            display: 'grid',
            placeItems: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="r-social-modal"
            style={{
              background: '#171717',
              border: '1px solid #2A2A2A',
              padding: '32px',
              maxWidth: 340,
              width: '100%',
            }}
          >
            <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em', marginTop: 0, marginBottom: 14 }}>
              {target.label.toUpperCase()}
            </p>
            <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#A5A5A5', marginTop: 0, marginBottom: 28 }}>
              {target.note}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href={target.href}
                target={target.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="btn-gold"
                style={{ padding: '12px 22px', flex: 1, justifyContent: 'center' }}
                onClick={() => setTarget(null)}
              >
                Continue
              </a>
              <button
                onClick={() => setTarget(null)}
                className="btn-outline"
                style={{ padding: '12px 22px', flex: 1, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Desktop nav row (hidden on mobile) ─────── */}
      <div className="r-px r-footer-nav" style={{ borderTop: '1px solid #2A2A2A', background: '#0B0B0B', padding: '18px 48px', display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center', borderBottom: '1px solid #2A2A2A' }}>
        {[...NAV_LINKS, { label: 'Book a consult', href: '/book', page: 'book' }].map(({ label, href }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link key={label} href={href} style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: active ? 'var(--accent)' : '#909090', letterSpacing: '.16em', textDecoration: 'none', transition: 'color .15s' }} className={active ? '' : 'hover-gold'}>
              {label.toUpperCase()}
            </Link>
          )
        })}
      </div>

      {/* ── Desktop footer (hidden on mobile) ──────── */}
      <footer
        className="r-px r-footer-desktop"
        style={{
          background: '#0B0B0B',
          padding: '22px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 28,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <Image src="/rebuilt-mark.svg" alt="Rebuilt" width={28} height={28} style={{ display: 'block' }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.28em', color: '#FFFFFF', lineHeight: 1 }}>REBUILT ACADEMY</div>
              <div style={{ marginTop: 3, font: '7px/1 ui-monospace,Menlo,monospace', letterSpacing: '.2em', color: 'var(--accent)' }}>SINGAPORE</div>
            </div>
          </Link>
          <span style={{ width: 1, height: 22, background: '#2A2A2A', display: 'block' }} />
          <OpenStatus />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
          <a href={SITE.contact.phoneTel} style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.1em', transition: 'color .15s' }} className="hover-gold">
            {SITE.contact.phone}
          </a>
          <span style={{ width: 1, height: 22, background: '#2A2A2A', display: 'block' }} />
          <SocialButtons />
          <Link href="/book" className="btn-gold" style={{ padding: '13px 24px' }}>
            Book a consult
          </Link>
          <span style={{ width: 1, height: 22, background: '#2A2A2A', display: 'block' }} />
          <Link href="/privacy" style={{ transition: 'color .2s ease', color: '#909090', font: '10px/1 ui-monospace,Menlo,monospace', letterSpacing: '.16em' }} className="hover-gold">
            PRIVACY
          </Link>
          <Link href="/terms" style={{ transition: 'color .2s ease', color: '#909090', font: '10px/1 ui-monospace,Menlo,monospace', letterSpacing: '.16em' }} className="hover-gold">
            TERMS
          </Link>
          <span suppressHydrationWarning style={{ font: '10px/1 ui-monospace,Menlo,monospace', letterSpacing: '.16em', color: '#5f6670' }}>
            © {new Date().getFullYear()}
          </span>
        </div>
      </footer>

      {/* ── Mobile footer ───────────────────────────── */}
      <footer
        className="r-px r-footer-mobile"
        style={{
          display: 'none',
          background: '#0B0B0B',
          borderTop: '1px solid #2A2A2A',
          padding: '18px 20px 22px',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {/* Row 1: logo + socials */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid #1E1E1E' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Image src="/rebuilt-mark.svg" alt="Rebuilt" width={24} height={24} style={{ display: 'block' }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.28em', color: '#FFFFFF', lineHeight: 1 }}>REBUILT ACADEMY</div>
              <div style={{ marginTop: 3, font: '7px/1 ui-monospace,Menlo,monospace', letterSpacing: '.2em', color: 'var(--accent)' }}>SINGAPORE</div>
            </div>
          </Link>
          <SocialButtons size={34} />
        </div>

        {/* Row 2: legal */}
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: 14 }}>
          <Link href="/privacy" style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.14em', textDecoration: 'none', marginRight: 20 }} className="hover-gold">
            PRIVACY
          </Link>
          <Link href="/terms" style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.14em', textDecoration: 'none' }} className="hover-gold">
            TERMS
          </Link>
          <span suppressHydrationWarning style={{ marginLeft: 'auto', font: '10px/1 ui-monospace,Menlo,monospace', letterSpacing: '.12em', color: '#5f6670' }}>
            © {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </>
  )
}
