'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { SITE } from '@/lib/site'
import { useScrollLock } from '@/lib/hooks'

interface Location {
  label: string
  tag: string
  address: string
  postal: string
  mapSrc: string
  directionsHref: string
}

const LOCATIONS: Location[] = [
  {
    label: 'Robinson',
    tag: 'CBD',
    address: '120 Robinson Rd, #10-01',
    postal: 'Singapore 068913',
    mapSrc: 'https://maps.google.com/maps?q=Core+Collective+Robinson+120+Robinson+Rd+Singapore&output=embed',
    directionsHref: 'https://www.google.com/maps/dir/?api=1&destination=Core+Collective+120+Robinson+Rd+Singapore',
  },
  {
    label: 'Dempsey',
    tag: 'Dempsey Hill',
    address: '27A Loewen Rd',
    postal: 'Singapore 248839',
    mapSrc: 'https://maps.google.com/maps?q=Core+Collective+Dempsey+27A+Loewen+Rd+Singapore&output=embed',
    directionsHref: 'https://www.google.com/maps/dir/?api=1&destination=Core+Collective+27A+Loewen+Rd+Singapore',
  },
  {
    label: 'Katong',
    tag: 'East Coast',
    address: 'i12 Katong, 112 East Coast Rd',
    postal: 'Singapore 428802',
    mapSrc: 'https://maps.google.com/maps?q=Core+Collective+i12+Katong+112+East+Coast+Rd+Singapore&output=embed',
    directionsHref: 'https://www.google.com/maps/dir/?api=1&destination=Core+Collective+112+East+Coast+Rd+Singapore',
  },
]

const LOCATION_IMAGES: Record<string, string> = {
  Robinson: 'https://www.corecollective.sg/hubfs/locations%20slider_rr.png',
  Dempsey:  'https://www.corecollective.sg/hubfs/Location_Dempsey.jpg',
  Katong:   'https://www.corecollective.sg/hubfs/Locations%20Page%20Image_Katong.png',
}

function LocationPlaceholder({ label, height }: { label: string; height: number }) {
  return (
    <div style={{ height, position: 'relative', overflow: 'hidden', background: '#08090b', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 130% 80% at 15% 10%, #111418 0%, #060708 100%)' }} />
      <span style={{
        position: 'absolute', bottom: -16, right: -8,
        font: `${height * 0.28}px/1 Archivo,sans-serif`, fontWeight: 800,
        color: 'rgba(255,255,255,.022)', letterSpacing: '-.04em',
        userSelect: 'none', pointerEvents: 'none',
      }}>
        {label.toUpperCase()}
      </span>
    </div>
  )
}

export default function LocationDrawer() {
  const [selected, setSelected] = useState<Location | null>(null)

  useScrollLock(!!selected)

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: '#212429' }} className="r3">
        {LOCATIONS.map((loc) => (
          <button
            key={loc.label}
            onClick={() => setSelected(loc)}
            className="hover-border r-location-card"
            style={{
              height: 460, overflow: 'hidden', position: 'relative',
              border: 'none', cursor: 'pointer', padding: 0, background: 'transparent',
              display: 'block', width: '100%', textAlign: 'left',
              transition: 'border-color .2s ease',
            }}
          >
            <div style={{ position: 'relative', height: 460, flexShrink: 0 }}>
              <Image
                src={LOCATION_IMAGES[loc.label] ?? ''}
                alt={loc.label}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,7,10,.92) 0%, transparent 55%)' }} />
            <div className="img-overlay" />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 22px' }}>
              <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.24em', margin: '0 0 6px' }}>CORE COLLECTIVE</p>
              <p style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 4px', color: '#f2f4f7' }}>{loc.label}</p>
              <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#a3aab4', letterSpacing: '.14em', margin: '0 0 12px' }}>{loc.address}</p>
              <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.16em' }}>VIEW DETAILS →</span>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.72)', zIndex: 1000, animation: 'ovIn .2s ease both' }}
            onClick={() => setSelected(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="location-dialog-title"
            className="no-scrollbar"
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: '100%', maxWidth: 500,
              background: '#0f1115', borderLeft: '1px solid #262a30',
              zIndex: 1001, overflowY: 'auto',
              animation: 'drawerIn .28s cubic-bezier(0.2, 0.7, 0.3, 1) both',
            }}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close location details"
              style={{
                position: 'absolute', top: 20, right: 20,
                background: 'rgba(15,17,21,.8)', border: 'none',
                color: '#f2f4f7', width: 40, height: 40, borderRadius: '50%',
                cursor: 'pointer', display: 'grid', placeItems: 'center',
                fontSize: 18, fontFamily: 'inherit', zIndex: 1, backdropFilter: 'blur(8px)',
              }}
            >
              ✕
            </button>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'relative', height: 240, flexShrink: 0 }}>
                <Image
                  src={LOCATION_IMAGES[selected.label] ?? ''}
                  alt={selected.label}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="500px"
                />
              </div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f1115 0%, transparent 55%)' }} />
            </div>

            <div className="r-drawer-content" style={{ padding: '4px 36px 52px' }}>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.24em', marginTop: 0, marginBottom: 12 }}>
                CORE COLLECTIVE · {selected.tag.toUpperCase()}
              </p>
              <h2 id="location-dialog-title" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', marginTop: 0, marginBottom: 6 }}>
                {selected.label}
              </h2>
              <p style={{ fontSize: 14, color: '#a3aab4', margin: '0 0 28px', lineHeight: 1.6 }}>
                {selected.address}<br />{selected.postal}
              </p>

              <div style={{ borderTop: '1px solid #1e2126', paddingTop: 24, marginBottom: 28 }}>
                <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#8d95a0', letterSpacing: '.2em', marginTop: 0, marginBottom: 16 }}>HOURS</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {SITE.hours.map(h => (
                    <p key={h} style={{ fontSize: 14, color: '#c2c7ce', margin: 0 }}>{h}</p>
                  ))}
                </div>
              </div>

              <div style={{ height: 220, marginBottom: 24, overflow: 'hidden' }}>
                <iframe
                  key={selected.mapSrc}
                  title={`Map: ${selected.label}`}
                  src={selected.mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>

              <a
                href={selected.directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 10, padding: '15px 24px', textDecoration: 'none',
                }}
              >
                Get directions ↗
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
