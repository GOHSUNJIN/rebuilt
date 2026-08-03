'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

type NavbarProps = { activePage?: string }

const NAV_LINKS = [
  { href: '/rehab', label: 'Rehab', page: 'rehab' },
  { href: '/strength', label: 'Personal Training', page: 'strength' },
  { href: '/performance', label: 'Performance', page: 'performance' },
  { href: '/about', label: 'About', page: 'about' },
]

export default function Navbar({ activePage = '' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 80) {
        setHidden(false)
      } else if (y > lastY.current + 4) {
        setHidden(true)
        setMenuOpen(false)
      } else if (y < lastY.current - 4) {
        setHidden(false)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          background: 'rgba(11,12,14,.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid #1e2126',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* ── Logo ─────────────────────────────────── */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 13, flexShrink: 0 }}>
          <Image src="/rebuilt-mark.svg" alt="Rebuilt" width={34} height={34} style={{ display: 'block' }} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '.36em', color: '#f2f4f7', lineHeight: 1 }}>
              REBUILT
            </div>
            <div style={{ marginTop: 4, font: '8px/1 ui-monospace,Menlo,monospace', letterSpacing: '.22em', color: '#d99e5c' }}>
              SINGAPORE
            </div>
          </div>
        </Link>

        {/* ── Desktop nav ──────────────────────────── */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {NAV_LINKS.map(({ href, label, page }) => {
            const active = activePage === page
            return (
              <Link
                key={page}
                href={href}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: active ? '#d99e5c' : '#8d95a0',
                  transition: 'color .15s',
                }}
                className={active ? '' : 'hover-nav'}
              >
                {label}
              </Link>
            )
          })}

          <Link
            href="/physio"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              color: activePage === 'physio' ? '#d99e5c' : '#525960',
              transition: 'color .15s',
            }}
          >
            Physiotherapy
            <span style={{ fontSize: 8, letterSpacing: '.14em', color: '#d99e5c', border: '1px solid rgba(217,158,92,.3)', padding: '2px 5px' }}>
              SOON
            </span>
          </Link>
        </div>

        {/* ── Book CTA ─────────────────────────────── */}
        <Link href="/book" className="btn-gold" style={{ padding: '11px 22px', fontSize: 11, letterSpacing: '.2em' }}>
          Book a session
        </Link>

        {/* ── Mobile hamburger ─────────────────────── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'none',
            background: 'none',
            border: '1px solid #2a2e34',
            color: '#c2c7ce',
            cursor: 'pointer',
            padding: '7px 9px',
            lineHeight: 0,
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          )}
        </button>

        {/* ── Mobile dropdown ──────────────────────── */}
        {menuOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#0b0c0e', borderBottom: '1px solid #1e2126', zIndex: 100 }}>
            {[...NAV_LINKS, { href: '/physio', label: 'Physiotherapy', page: 'physio' }].map(({ href, label, page }) => (
              <Link
                key={page}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 24px',
                  borderBottom: '1px solid #1a1d22',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: activePage === page ? '#d99e5c' : '#b0b7c0',
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setMenuOpen(false)}
              style={{ display: 'block', padding: '14px 24px', fontSize: 11, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#d99e5c' }}
            >
              Book a session
            </Link>
          </div>
        )}
      </nav>

      {/* Spacer so content doesn't sit under the fixed nav */}
      <div style={{ height: 70 }} />
    </>
  )
}
