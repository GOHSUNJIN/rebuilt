'use client'
import { useState } from 'react'

const ITEMS = [
  {
    term: 'Page Views',
    desc: 'Total pages loaded by all visitors in the period. Refreshing counts as another view.',
  },
  {
    term: 'Unique Visitors',
    desc: 'Estimated number of distinct people, based on device and browser fingerprint. One person visiting 5 pages counts as 1 visitor.',
  },
  {
    term: 'Avg Daily Views',
    desc: 'Total page views divided by the number of days in the selected period.',
  },
  {
    term: 'Booking Rate',
    desc: 'Bookings completed divided by unique visitors. A rough conversion metric from traffic to clients.',
  },
  {
    term: 'Daily Chart',
    desc: 'Page views grouped by calendar day. Useful for spotting trends and the effect of campaigns over time.',
  },
  {
    term: 'By Day of Week',
    desc: 'Average page views for each weekday across the period. Useful for scheduling posts on high-traffic days.',
  },
  {
    term: 'Top Pages',
    desc: 'Pages with the most views in the period, ranked by traffic.',
  },
  {
    term: 'Events',
    desc: 'Tracked user interactions: WhatsApp clicks, Book CTA clicks, contact form submissions, FAQ opens, and bookings completed.',
  },
  {
    term: 'Top Referrers',
    desc: 'External sites and sources that sent visitors here. Direct traffic and search engines typically lead.',
  },
  {
    term: 'Devices',
    desc: 'Traffic split by device type: mobile, desktop, or tablet.',
  },
]

export default function GlossaryAccordion() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div>
      {ITEMS.map(({ term, desc }) => {
        const isOpen = open === term
        return (
          <div key={term} style={{ borderBottom: '1px solid #141414' }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : term)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 40px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                gap: 12,
              }}
            >
              <span style={{
                font: '11px/1 ui-monospace,Menlo,monospace',
                color: isOpen ? 'var(--accent)' : '#6B7280',
                letterSpacing: '.18em',
                transition: 'color .15s',
                textAlign: 'left',
              }}>
                {term.toUpperCase()}
              </span>
              <svg
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                width="10"
                height="10"
                style={{
                  color: isOpen ? 'var(--accent)' : '#3A3A3A',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform .2s, color .15s',
                  flexShrink: 0,
                }}
              >
                <polyline points="2 4 6 8 10 4" />
              </svg>
            </button>
            {isOpen && (
              <p style={{ padding: '0 40px 14px', fontSize: 13, color: '#909090', lineHeight: 1.7, margin: 0 }}>
                {desc}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
