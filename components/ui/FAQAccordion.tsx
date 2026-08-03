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
    <>
      <style>{`
        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div
        className="faq-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
          background: '#1a1d22',
        }}
      >
        {items.map(({ num, q, a }) => {
          const isOpen = open === num
          return (
            <div
              key={num}
              style={{
                background: isOpen ? '#0f1114' : '#0b0c0e',
                transition: 'background .2s ease',
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : num)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 20,
                  padding: '26px 28px',
                  background: 'none',
                  border: 'none',
                  borderBottom: isOpen ? '1px solid #1e2126' : '1px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  transition: 'border-color .2s ease',
                }}
              >
                <span
                  style={{
                    minWidth: 28,
                    height: 28,
                    border: `1px solid ${isOpen ? '#d99e5c' : '#2a2e34'}`,
                    color: isOpen ? '#d99e5c' : '#4a5060',
                    font: '10px/1 ui-monospace,Menlo,monospace',
                    letterSpacing: '.12em',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    marginTop: 2,
                    transition: 'border-color .2s, color .2s',
                  }}
                >
                  {num}
                </span>
                <span
                  style={{
                    flex: 1,
                    fontSize: 15,
                    fontWeight: 500,
                    color: isOpen ? '#f2f4f7' : '#c2c7ce',
                    lineHeight: 1.45,
                    transition: 'color .15s',
                  }}
                >
                  {q}
                </span>
                <span
                  style={{
                    fontSize: 22,
                    color: '#d99e5c',
                    flexShrink: 0,
                    lineHeight: 1,
                    marginTop: 1,
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform .2s ease',
                    opacity: isOpen ? 1 : 0.5,
                  }}
                >
                  +
                </span>
              </button>

              <div
                style={{
                  overflow: 'hidden',
                  maxHeight: isOpen ? 300 : 0,
                  transition: 'max-height .3s ease',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    padding: '20px 28px 28px 76px',
                    fontSize: 14,
                    lineHeight: 1.75,
                    color: '#8d95a0',
                  }}
                >
                  {a}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
