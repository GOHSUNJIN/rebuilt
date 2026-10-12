'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ScrollDots from '@/components/ui/ScrollDots'

interface ServiceItem {
  num: string
  title: string
  from: string
  href: string
  img: string
  imgPos: string
  desc: string
  tags: string[]
}

export default function ServiceCarousel({ items }: { items: ServiceItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.scrollWidth / items.length
    setActiveIndex(Math.min(Math.round(el.scrollLeft / cardWidth), items.length - 1))
  }, [items.length])

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="r3 r-service-scroll"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: '#2A2A2A' }}
      >
        {items.map(({ num, title, from, href, img, imgPos, desc, tags }) => (
          <div key={num} className="hover-card r-service-card" style={{ background: '#171717', display: 'flex', flexDirection: 'column' }}>
            <div className="img-zoom r-card-img" style={{ height: 340, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
              <Image src={img} alt={title} fill style={{ objectFit: 'cover', objectPosition: imgPos }} sizes="(max-width: 768px) 100vw, 33vw" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(13,15,18,.85) 100%)' }} />
              <div className="img-overlay" />
            </div>
            <div className="r-service-content" style={{ padding: '28px 28px 36px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
                <h3 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: '-.015em' }}>{title}</h3>
                <span className="r-service-price" style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.12em', whiteSpace: 'nowrap', flexShrink: 0 }}>{from}</span>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#A5A5A5', margin: '0 0 20px', flex: 1 }}>{desc}</p>
              <div className="r-service-tags" style={{ borderTop: '1px solid #1E1E1E', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 28 }}>
                {tags.map(tag => (
                  <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#A5A5A5' }}>
                    <span style={{ width: 4, height: 4, background: 'var(--accent)', borderRadius: '50%', flexShrink: 0 }} />{tag}
                  </div>
                ))}
              </div>
              <Link
                href={href}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, font: '11px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em', textDecoration: 'none', paddingTop: 20, borderTop: '1px solid #1E1E1E' }}
                className="hover-gold r-service-link"
              >
                LEARN MORE →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <ScrollDots count={items.length} activeIndex={activeIndex} className="r-service-dots" />
    </>
  )
}
