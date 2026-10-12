'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { track } from '@vercel/analytics'
import { SITE, WHATSAPP_MESSAGES, DEFAULT_WHATSAPP_MESSAGE } from '@/lib/site'

export default function WhatsAppButton() {
  const pathname = usePathname()
  const [nearBottom, setNearBottom] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      setNearBottom(scrolled >= total - 10)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname.startsWith('/admin') || pathname === '/contact') return null

  const message = WHATSAPP_MESSAGES[pathname] ?? DEFAULT_WHATSAPP_MESSAGE
  const href = `${SITE.contact.whatsapp}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={() => track('whatsapp_click', { page: pathname })}
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 95,
        width: 52,
        height: 52,
        borderRadius: '50%',
        background: '#25D366',
        display: 'grid',
        placeItems: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,.35)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.4s ease',
        opacity: nearBottom ? 0 : 1,
        pointerEvents: nearBottom ? 'none' : 'auto',
      }}
      className="whatsapp-btn"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0B0B0B">
        <path d="M20.5 3.5A11.95 11.95 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.98L0 24l6.19-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.5-8.5zM12 22c-1.85 0-3.67-.5-5.25-1.43l-.38-.22-3.93 1.03 1.05-3.82-.25-.4A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10 2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.47-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.15 8.15 0 0 1-2.4-1.48 9.02 9.02 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.59-.49-.5-.68-.51l-.58-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
      </svg>
    </a>
  )
}
