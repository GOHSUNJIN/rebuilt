'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

type NavbarProps = { activePage?: string }

export default function Navbar({ activePage = '' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLink = (href: string, label: string, page: string) => {
    const isActive = activePage === page
    return (
      <Link
        href={href}
        style={{
          paddingBottom: 4,
          color: isActive ? '#f2f4f7' : '#c2c7ce',
          borderBottom: isActive ? '1px solid #d99e5c' : 'none',
        }}
        className={isActive ? '' : 'hover-nav'}
      >
        {label}
      </Link>
    )
  }

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '22px 48px',
        background: '#0b0c0e',
        borderBottom: '1px solid #212429',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}
      >
        <span
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'block',
            flexShrink: 0,
            background: '#0b0c0e',
            position: 'relative',
          }}
        >
          <Image
            src="/logo.jpeg"
            alt="Rebuilt"
            width={96}
            height={96}
            style={{ position: 'absolute', width: '250%', height: 'auto', top: '-41%', left: '-75%' }}
          />
        </span>
        <span
          style={{ fontSize: 17, fontWeight: 700, letterSpacing: '.34em', color: '#f2f4f7' }}
        >
          REBUILT
        </span>
      </Link>

      {/* Desktop nav */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 38,
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '.16em',
          textTransform: 'uppercase',
        }}
        className="desktop-nav"
      >
        {navLink('/rehab', 'Rehab', 'rehab')}
        {navLink('/strength', 'Personal training', 'strength')}
        {navLink('/performance', 'Performance', 'performance')}
        <Link
          href="/physio"
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            paddingBottom: 4,
            color: activePage === 'physio' ? '#f2f4f7' : '#8d95a0',
            borderBottom: activePage === 'physio' ? '1px solid #d99e5c' : 'none',
          }}
        >
          Physiotherapy
          <span
            style={{
              fontSize: 9,
              letterSpacing: '.1em',
              color: '#d99e5c',
              border: '1px solid #4a3d2b',
              padding: '3px 6px',
              whiteSpace: 'nowrap',
            }}
          >
            SOON
          </span>
        </Link>
        {navLink('/about', 'About', 'about')}
      </div>

      {/* Book CTA */}
      <Link href="/book" className="btn-gold" style={{ padding: '13px 24px' }}>
        Book a session
      </Link>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: '#c2c7ce',
          cursor: 'pointer',
        }}
        className="mobile-menu-btn"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#0b0c0e',
            borderBottom: '1px solid #212429',
            zIndex: 100,
          }}
          className="mobile-dropdown"
        >
          {[
            { href: '/rehab', label: 'Rehab', page: 'rehab' },
            { href: '/strength', label: 'Personal Training', page: 'strength' },
            { href: '/performance', label: 'Performance', page: 'performance' },
            { href: '/physio', label: 'Physiotherapy', page: 'physio' },
            { href: '/about', label: 'About', page: 'about' },
            { href: '/book', label: 'Book a session', page: 'book' },
          ].map(({ href, label, page }) => (
            <Link
              key={page}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '16px 24px',
                borderBottom: '1px solid #1a1d22',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: activePage === page ? '#d99e5c' : '#e9ecf0',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
