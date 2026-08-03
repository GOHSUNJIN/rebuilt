'use client'
import { useState } from 'react'

export interface FAQItem {
  num: string
  q: string
  a: string
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#1a1d22' }}>
      {items.map(({ num, q, a }) => {
        const isOpen = open === num
        return (
          <div key={num} style={{ background: '#0b0c0e' }}>
            <button
              onClick={() => setOpen(isOpen ? null : num)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24,
                padding: '22px 24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'inherit',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, flex: 1 }}>
                <span
                  style={{
                    font: '10px/1 ui-monospace,Menlo,monospace',
                    color: '#d99e5c',
                    letterSpacing: '.2em',
                    flexShrink: 0,
                  }}
                >
                  {num}
                </span>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: isOpen ? '#f2f4f7' : '#c2c7ce',
                    lineHeight: 1.4,
                    transition: 'color .15s',
                  }}
                >
                  {q}
                </span>
              </div>
              <span
                style={{
                  fontSize: 20,
                  color: '#d99e5c',
                  flexShrink: 0,
                  lineHeight: 1,
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                  transition: 'transform .2s ease',
                }}
              >
                +
              </span>
            </button>

            {isOpen && (
              <p
                style={{
                  margin: 0,
                  padding: '0 24px 22px 60px',
                  fontSize: 14,
                  lineHeight: 1.72,
                  color: '#8d95a0',
                }}
              >
                {a}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
