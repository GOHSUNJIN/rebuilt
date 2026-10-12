'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { NAV_LINKS } from '@/lib/site'

type NavbarProps = { activePage?: string }

export default function Navbar({ activePage = '' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const menuOpenRef = useRef(false)

  useEffect(() => { menuOpenRef.current = menuOpen }, [menuOpen])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (menuOpenRef.current) {
        lastY.current = y
        return
      }
      if (y < 80) {
        setHidden(false)
      } else if (y > lastY.current + 40) {
        setHidden(true)
        lastY.current = y
      } else if (y < lastY.current - 8) {
        setHidden(false)
        lastY.current = y
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
          borderBottom: '1px solid #1E1E1E',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* ── Logo ─────────────────────────────────── */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 13, flexShrink: 0 }}>
          <Image src="/rebuilt-mark.svg" alt="Rebuilt" width={34} height={34} style={{ display: 'block' }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '.28em', color: '#FFFFFF', lineHeight: 1 }}>
              REBUILT ACADEMY
            </div>
            <div style={{ marginTop: 4, font: '8px/1 ui-monospace,Menlo,monospace', letterSpacing: '.22em', color: 'var(--accent)' }}>
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
                  color: active ? 'var(--accent)' : '#A5A5A5',
                }}
                className="hover-nav"
              >
                {label}
              </Link>
            )
          })}

        </div>

        {/* ── Book CTA ─────────────────────────────── */}
        <Link href="/book" className="btn-gold r-hide" style={{ padding: '11px 22px', fontSize: 11, letterSpacing: '.2em' }}>
          Book a consult
        </Link>

        {/* ── Mobile hamburger ─────────────────────── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          style={{
            display: 'none',
            background: 'none',
            border: '1px solid #2A2A2A',
            color: '#A5A5A5',
            cursor: 'pointer',
            padding: '14px',
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
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#0B0B0B', borderBottom: '1px solid #1E1E1E', zIndex: 100, animation: 'mdIn 0.22s cubic-bezier(0.4,0,0.2,1) both' }}>
            {NAV_LINKS.map(({ href, label, page }) => (
              <Link
                key={page}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '16px 24px',
                  borderBottom: '1px solid #1E1E1E',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: activePage === page ? 'var(--accent)' : '#A5A5A5',
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setMenuOpen(false)}
              style={{ display: 'block', padding: '16px 24px', fontSize: 11, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)' }}
            >
              Book a consult
            </Link>
          </div>
        )}
      </nav>

      {/* Spacer so content doesn't sit under the fixed nav */}
      <div style={{ height: 70 }} />

      {/* Mobile menu backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            zIndex: 99,
            animation: 'ovIn 0.2s ease both',
          }}
        />
      )}
    </>
  )
}
