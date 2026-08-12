'use client'
import { useState } from 'react'
import type { FAQItem } from '@/lib/types'

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div>
      {items.map(({ num, q, a }) => {
        const isOpen = open === num
        return (
          <div key={num} style={{ borderTop: '1px solid #1e2126' }}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${num}`}
              onClick={() => setOpen(isOpen ? null : num)}
              style={{
                width: '100%',
                padding: '22px 0',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'inherit',
              }}
            >
              <span style={{
                font: '9px/1 ui-monospace,Menlo,monospace',
                color: isOpen ? 'var(--accent)' : '#8d95a0',
                letterSpacing: '.18em',
                flexShrink: 0,
                width: 22,
                transition: 'color .15s',
              }}>
                {num}
              </span>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  margin: 0,
                  flex: 1,
                  lineHeight: 1.35,
                  letterSpacing: '-.015em',
                  color: isOpen ? '#f2f4f7' : '#c2c7ce',
                  transition: 'color .15s',
                }}
              >
                {q}
              </h3>
              <span
                style={{
                  width: 26,
                  height: 26,
                  border: `1px solid ${isOpen ? 'var(--accent)' : '#2a2e34'}`,
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                  color: isOpen ? 'var(--accent)' : '#5f6670',
                  fontSize: 16,
                  lineHeight: 1,
                  transition: 'transform .22s ease, border-color .15s, color .15s',
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                  fontWeight: 300,
                }}
              >
                +
              </span>
            </button>
            <div
              id={`faq-answer-${num}`}
              role="region"
              style={{
                overflow: 'hidden',
                maxHeight: isOpen ? 1200 : 0,
                transition: 'max-height 0.32s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              <p
                className="r-faq-answer"
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.75,
                  color: '#a3aab4',
                  margin: '0 0 26px',
                  paddingLeft: 42,
                  paddingRight: 52,
                }}
              >
                {a}
              </p>
            </div>
          </div>
        )
      })}
      <div style={{ borderTop: '1px solid #1e2126' }} />
    </div>
  )
}
