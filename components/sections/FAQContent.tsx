'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { FAQ_TABS, ALL_FAQS } from '@/lib/faqData'

function FAQInner() {
  const searchParams = useSearchParams()
  const initial = searchParams.get('tab') || 'general'
  const [activeTab, setActiveTab] = useState(FAQ_TABS.find(t => t.id === initial) ? initial : 'general')
  const [search, setSearch] = useState('')

  const items = ALL_FAQS[activeTab] || []

  const query = search.trim()
  const searchGroups = query.length >= 2
    ? Object.entries(ALL_FAQS)
        .map(([cat, faqItems]) => ({
          cat,
          label: FAQ_TABS.find(t => t.id === cat)?.label ?? cat,
          items: faqItems.filter(item =>
            item.q.toLowerCase().includes(query.toLowerCase()) ||
            item.a.toLowerCase().includes(query.toLowerCase())
          ),
        }))
        .filter(g => g.items.length > 0)
    : null

  const totalResults = searchGroups
    ? searchGroups.reduce((n, g) => n + g.items.length, 0)
    : 0

  return (
    <>
      {/* Hero */}
      <section className="r-px r-section-pad r-faq-hero" style={{ padding: '64px 48px 52px', borderBottom: '1px solid #2A2A2A', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.24em', marginTop: 0, marginBottom: 18 }}>FAQ</p>
          <h1 className="r-h1" style={{ fontSize: 64, fontWeight: 800, letterSpacing: '-.03em', margin: 0, lineHeight: 0.92 }}>Questions answered.</h1>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: '#5f6670', margin: 0, maxWidth: 300 }}>
          Pick a category or search below. If you do not find what you need, get in touch directly.
        </p>
      </section>

      {/* Search bar */}
      <div className="r-px" style={{ padding: '16px 48px', borderBottom: '1px solid #2A2A2A', background: '#0B0B0B' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#171717', border: '1px solid #2A2A2A', padding: '0 16px', maxWidth: 560 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="14" height="14" style={{ color: '#5f6670', flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search all questions"
            placeholder="Search all questions…"
            style={{
              flex: 1,
              padding: '14px 0',
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              fontSize: 13.5,
              fontFamily: 'inherit',
              outline: 'none',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{ background: 'none', border: 'none', color: '#5f6670', cursor: 'pointer', fontSize: 14, padding: '4px 8px', lineHeight: 1, flexShrink: 0 }}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {searchGroups !== null ? (
        /* ── Search results ─────────────────────── */
        <div className="r-faq-content r-px" style={{ padding: '40px 56px 72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
            <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.16em', margin: 0 }}>
              {totalResults} RESULT{totalResults !== 1 ? 'S' : ''} FOR &ldquo;{query}&rdquo;
            </p>
            <button
              onClick={() => setSearch('')}
              style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.16em', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}
            >
              ← BROWSE CATEGORIES
            </button>
          </div>
          {totalResults === 0 ? (
            <p style={{ fontSize: 15, color: '#5f6670', lineHeight: 1.65 }}>
              No questions match your search. Try a different term or browse by category below.
            </p>
          ) : (
            searchGroups.map(g => (
              <div key={g.cat} style={{ marginBottom: 40 }}>
                <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em', margin: '0 0 4px' }}>
                  {g.label.toUpperCase()}
                </p>
                <FAQAccordion items={g.items} />
              </div>
            ))
          )}
        </div>
      ) : (
        /* ── Normal tabbed layout ───────────────── */
        <div className="r-faq" style={{ display: 'flex', minHeight: 560 }}>

          {/* Sidebar */}
          <aside className="r-faq-sidebar" style={{ width: 220, flexShrink: 0, borderRight: '1px solid #2A2A2A', background: '#0B0B0B', padding: '40px 0', display: 'flex', flexDirection: 'column' }}>
            <p className="r-faq-hide-mobile" style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.22em', margin: '0 0 20px', paddingLeft: 40 }}>CATEGORY</p>
            {FAQ_TABS.map(({ id, label }, i) => {
              const active = activeTab === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => { if (id !== activeTab) track('faq_tab', { tab: id }); setActiveTab(id) }}
                  className={`r-faq-btn${active ? ' r-faq-btn-active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    width: '100%',
                    padding: '13px 40px',
                    background: 'none',
                    border: 'none',
                    color: active ? 'var(--accent)' : '#909090',
                    fontSize: 13,
                    fontWeight: active ? 700 : 500,
                    letterSpacing: '-.01em',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                    transition: 'color .15s',
                  }}
                >
                  <span style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: active ? 'var(--accent)' : '#909090', letterSpacing: '.1em', minWidth: 16 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {label}
                </button>
              )
            })}

            {/* Divider + CTA */}
            <div className="r-faq-hide-mobile" style={{ borderTop: '1px solid #1E1E1E', margin: '32px 40px 28px' }} />
            <div className="r-faq-hide-mobile" style={{ padding: '0 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link href="/book" className="btn-gold" style={{ padding: '11px 16px', fontSize: 10, letterSpacing: '.18em', textAlign: 'center' }}>Book a consult</Link>
              <Link href="/about#contact-form" style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.16em', textDecoration: 'none', textAlign: 'center', transition: 'color .15s' }} className="hover-gold">
                SEND A MESSAGE →
              </Link>
            </div>
          </aside>

          {/* Accordion content */}
          <div className="r-faq-content r-px" style={{ flex: 1, minWidth: 0, padding: '40px 56px 72px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 32 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.02em', margin: 0, color: '#FFFFFF' }}>
                {FAQ_TABS.find(t => t.id === activeTab)?.label}
              </h2>
              <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.16em' }}>
                {items.length} QUESTION{items.length !== 1 ? 'S' : ''}
              </span>
            </div>
            <FAQAccordion key={activeTab} items={items} />

            {/* Mobile CTA */}
            <div className="r-faq-mobile-cta" style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #1E1E1E', display: 'none', gap: 12 }}>
              <Link href="/book" className="btn-gold" style={{ padding: '13px 26px' }}>Book a consult</Link>
              <Link href="/about#contact-form" className="btn-outline" style={{ padding: '13px 26px' }}>Send a message</Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function FAQSkeleton() {
  const bar = (w: string, h = 12, opacity = 0.06) => (
    <div style={{ width: w, height: h, background: `rgba(242,244,247,${opacity})`, borderRadius: 2, animation: 'shimmer 1.6s linear infinite', backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.06) 50%, transparent 100%)', backgroundSize: '200% 100%' }} />
  )
  return (
    <div style={{ minHeight: 560 }}>
      <div style={{ padding: '64px 48px 52px', borderBottom: '1px solid #2A2A2A', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {bar('40px', 8, 0.1)}
          {bar('260px', 52, 0.08)}
        </div>
        {bar('220px', 40, 0.04)}
      </div>
      <div style={{ display: 'flex', minHeight: 480 }}>
        <div style={{ width: 220, flexShrink: 0, borderRight: '1px solid #2A2A2A', background: '#0B0B0B', padding: '40px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[80, 60, 72, 90, 100].map((w, i) => (
            <div key={i} style={{ padding: '13px 40px' }}>{bar(`${w}%`, 10, 0.06)}</div>
          ))}
        </div>
        <div style={{ flex: 1, padding: '40px 56px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {bar('140px', 22, 0.08)}
          {[1,2,3,4].map(i => (
            <div key={i} style={{ padding: '22px 0', borderBottom: '1px solid #1E1E1E', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {bar('70%', 11, 0.06)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function FAQContent() {
  return (
    <Suspense fallback={<FAQSkeleton />}>
      <FAQInner />
    </Suspense>
  )
}
