import { Suspense } from 'react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { logoutAction } from '@/app/actions/admin'
import { isAnalyticsConfigured, fetchCritical, fetchSecondary } from '@/lib/analytics'
import type { CriticalData, SecondaryData, DailyStat, DOWStat } from '@/lib/analytics'
import RefreshButton from './_components/RefreshButton'
import DateRangePicker from './_components/DateRangePicker'
import TrafficChart from './_components/TrafficChart'

// ─── shared styles ─────────────────────────────────────────────────────────────

const LABEL: React.CSSProperties = {
  font: '12px/1 ui-monospace,Menlo,monospace',
  letterSpacing: '.2em',
  color: '#909090',
  margin: 0,
}

const ACCENT_LABEL: React.CSSProperties = {
  ...LABEL,
  color: 'var(--accent)',
  letterSpacing: '.22em',
  fontSize: 13,
}

// ─── helpers ──────────────────────────────────────────────────────────────────

const PAGE_LABELS: Record<string, string> = {
  '/': 'Home', '/rehab': 'Rehab', '/strength': 'Training',
  '/performance': 'Performance', '/physio': 'Physiotherapy',
  '/about': 'About', '/book': 'Book', '/faq': 'FAQ',
  '/privacy': 'Privacy', '/terms': 'Terms',
}

const EVENT_LABELS: Record<string, string> = {
  book_cta_click:    'Book CTA clicks',
  whatsapp_click:    'WhatsApp clicks',
  mobile_book_click: 'Mobile book taps',
  mobile_call_click: 'Mobile call taps',
  contact_submit:    'Contact form submissions',
  booking_complete:  'Bookings completed',
  faq_open:          'FAQ opens',
  faq_tab:           'FAQ tab switches',
}

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

const DOW_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function computeDOW(daily: DailyStat[]): DOWStat[] {
  const b = DOW_LABELS.map(day => ({ day, pageviews: 0, visitors: 0, count: 0 }))
  for (const d of daily) {
    if (!d.timestamp) continue
    const i = new Date(d.timestamp).getUTCDay()
    b[i].pageviews += d.pageviews; b[i].visitors += d.visitors; b[i].count++
  }
  return b.map(x => ({
    day: x.day,
    pageviews: x.count > 0 ? Math.round(x.pageviews / x.count) : 0,
    visitors:  x.count > 0 ? Math.round(x.visitors  / x.count) : 0,
  }))
}

function fmtShort(iso: string) {
  return new Date(iso).toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' })
}

function roundToHour(ms: number): string {
  return new Date(Math.floor(ms / 3_600_000) * 3_600_000).toISOString()
}

// ─── sub-components ────────────────────────────────────────────────────────────

const PERIOD_TABS = [
  { value: '7',      label: '7D' },
  { value: '30',     label: '30D' },
  { value: '90',     label: '90D' },
  { value: 'custom', label: 'CUSTOM' },
]

function AdminHeader({ activePeriod }: { activePeriod: string }) {
  return (
    <header
      className="admin-header"
      style={{
        height: 70,
        borderBottom: '1px solid #1E1E1E',
        background: 'rgba(11,12,14,.97)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '0 48px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 13, textDecoration: 'none', flexShrink: 0 }}>
        <Image src="/rebuilt-mark.svg" alt="Rebuilt" width={34} height={34} style={{ display: 'block' }} />
        <div className="admin-wordmark">
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '.28em', color: '#fff', lineHeight: 1 }}>REBUILT ACADEMY</div>
          <div style={{ marginTop: 4, font: '9px/1 ui-monospace,Menlo,monospace', letterSpacing: '.22em', color: 'var(--accent)' }}>ANALYTICS</div>
        </div>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 1, background: '#1A1A1A', border: '1px solid #2A2A2A' }}>
          {PERIOD_TABS.map(({ value, label }) => {
            const active = activePeriod === value
            return (
              <Link
                key={value}
                href={`/admin?p=${value}`}
                className="admin-period-btn"
                style={{
                  display: 'block',
                  padding: '10px 18px',
                  font: '11px/1 ui-monospace,Menlo,monospace',
                  letterSpacing: '.14em',
                  background: active ? 'var(--accent)' : 'transparent',
                  color: active ? '#0B0B0B' : '#909090',
                  fontWeight: active ? 700 : 400,
                  textDecoration: 'none',
                  transition: 'background .15s, color .15s',
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>
        <div className="admin-refresh-hide"><RefreshButton /></div>
        <form action={logoutAction}>
          <button type="submit" className="btn-outline admin-signout-btn" style={{ padding: '10px 18px', fontSize: 12, letterSpacing: '.14em' }}>
            SIGN OUT
          </button>
        </form>
      </div>
    </header>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="r-px" style={{ padding: '24px 48px', borderBottom: '1px solid #2A2A2A' }}>
      <p style={ACCENT_LABEL}>{children}</p>
    </div>
  )
}

function BarRow({ label, value, pct, barColor, labelStyle }: {
  label: string; value: string; pct: number; barColor: string; labelStyle?: React.CSSProperties
}) {
  return (
    <div className="hover-approach r-px admin-bar-row" style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '16px 48px', borderBottom: '1px solid #1E1E1E' }}>
      <div
        className="admin-bar-label"
        style={{ flex: '0 0 180px', fontSize: 14, color: '#C0C0C0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', ...labelStyle }}
        title={label}
      >
        {label}
      </div>
      <div className="admin-bar-track" style={{ flex: 1, height: 4, background: '#252525', overflow: 'hidden', borderRadius: 2 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: barColor, borderRadius: 2 }} />
      </div>
      <div
        className="admin-bar-value"
        style={{ flex: '0 0 60px', textAlign: 'right', font: '13px/1 ui-monospace,Menlo,monospace', color: '#A5A5A5', fontWeight: 600 }}
      >
        {value}
      </div>
    </div>
  )
}

function StatCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div className="admin-stat-card" style={{ background: '#111', padding: '40px 36px', borderBottom: '1px solid #1E1E1E' }}>
      <p style={{ ...LABEL, color: '#6B7280', fontSize: 12 }}>{title}</p>
      <p
        className="gradient-gold admin-stat-num"
        style={{ fontSize: 52, fontWeight: 800, lineHeight: 1, letterSpacing: '-.04em', margin: '20px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        {value}
      </p>
      {sub && (
        <p style={{ font: '12px/1 ui-monospace,Menlo,monospace', color: '#6B7280', margin: '16px 0 0', letterSpacing: '.1em' }}>{sub}</p>
      )}
    </div>
  )
}

// ─── critical section (stat cards + chart + events) ───────────────────────────

async function CriticalSection({
  since, until, rangeDays, rangeLabel,
}: {
  since: string; until: string; rangeDays: number; rangeLabel: string
}) {
  const data: CriticalData = await fetchCritical(since, until)
  const { totals, daily, events } = data

  const avgDaily  = Math.round(totals.pageviews / rangeDays)
  const bookings  = events.find(e => e.eventName === 'booking_complete')?.count ?? 0
  const convRate  = totals.visitors > 0
    ? `${((bookings / totals.visitors) * 100).toFixed(1)}%`
    : 'N/A'
  const dow = computeDOW(daily)
  const maxEvents = Math.max(...events.map(e => e.count), 1)

  return (
    <>
      {/* Stat cards */}
      <section style={{ borderBottom: '1px solid #2A2A2A' }}>
        <div className="r4 admin-stat-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: '#2A2A2A' }}>
          <StatCard title="PAGE VIEWS"      value={fmt(totals.pageviews)} sub={rangeLabel} />
          <StatCard title="UNIQUE VISITORS" value={fmt(totals.visitors)}  sub={rangeLabel} />
          <StatCard title="AVG DAILY VIEWS" value={fmt(avgDaily)}         sub="PER DAY" />
          <StatCard title="BOOKING RATE"    value={convRate}              sub={`${bookings} BOOKINGS`} />
        </div>
      </section>

      {/* Traffic chart */}
      <TrafficChart daily={daily} dow={dow} />

      {/* Events */}
      <section style={{ borderBottom: '1px solid #2A2A2A' }}>
        <SectionLabel>EVENTS</SectionLabel>
        {events.length === 0 ? (
          <p className="r-px" style={{ padding: '28px 48px', fontSize: 15, color: '#909090', margin: 0, lineHeight: 1.6 }}>
            No events yet. These appear once users interact with the site.
          </p>
        ) : (
          <div className="admin-rows-scroll">
            {events.map(e => (
              <BarRow
                key={e.eventName}
                label={EVENT_LABELS[e.eventName] ?? e.eventName}
                value={fmt(e.count)}
                pct={(e.count / maxEvents) * 100}
                barColor="#4ade80"
              />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

// ─── secondary section (pages + devices + referrers) ──────────────────────────

async function SecondarySection({ since, until }: { since: string; until: string }) {
  const data: SecondaryData = await fetchSecondary(since, until)
  const { topPages, devices, referrers } = data

  const maxPages    = Math.max(...topPages.map(p => p.pageviews), 1)
  const totalDevice = devices.reduce((s, d) => s + d.pageviews, 0) || 1
  const maxRef      = Math.max(...referrers.map(r => r.pageviews), 1)

  return (
    <>
      {/* Top pages */}
      <section style={{ borderBottom: '1px solid #2A2A2A' }}>
        <SectionLabel>TOP PAGES</SectionLabel>
        {topPages.length === 0 ? (
          <p className="r-px" style={{ padding: '28px 48px', fontSize: 15, color: '#909090', margin: 0, lineHeight: 1.6 }}>No data yet.</p>
        ) : (
          <div className="admin-rows-scroll">
            {topPages.map(p => (
              <div key={p.requestPath} className="hover-approach r-px admin-bar-row" style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '16px 48px', borderBottom: '1px solid #1E1E1E' }}>
                <div
                  className="admin-bar-label"
                  style={{ flex: '0 0 180px', font: '14px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  title={p.requestPath}
                >
                  {PAGE_LABELS[p.requestPath] ?? p.requestPath}
                </div>
                <div className="admin-bar-track" style={{ flex: 1, height: 4, background: '#252525', overflow: 'hidden', borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${(p.pageviews / maxPages) * 100}%`, background: 'var(--accent)', borderRadius: 2 }} />
                </div>
                <div className="admin-bar-value" style={{ flex: '0 0 160px', textAlign: 'right' }}>
                  <span style={{ font: '13px/1 ui-monospace,Menlo,monospace', color: '#C0C0C0', fontWeight: 600 }}>{fmt(p.pageviews)} views</span>
                  <span className="admin-page-visitors" style={{ font: '12px/1 ui-monospace,Menlo,monospace', color: '#6B7280', marginLeft: 12 }}>{fmt(p.visitors)} visitors</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Referrers + Devices */}
      <section style={{ borderBottom: '1px solid #2A2A2A' }}>
        <div className="r2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: '#2A2A2A' }}>
          {/* Referrers */}
          <div style={{ background: '#0B0B0B' }}>
            <div className="r-px" style={{ padding: '24px 48px', borderBottom: '1px solid #2A2A2A' }}>
              <p style={ACCENT_LABEL}>TOP REFERRERS</p>
            </div>
            {referrers.length === 0 ? (
              <p className="r-px" style={{ padding: '28px 48px', fontSize: 15, color: '#909090', margin: 0, lineHeight: 1.6 }}>No referrer data yet.</p>
            ) : (
              <div className="admin-rows-scroll">
                {referrers.map(r => (
                  <BarRow
                    key={r.referrerHostname}
                    label={r.referrerHostname}
                    value={fmt(r.pageviews)}
                    pct={(r.pageviews / maxRef) * 100}
                    barColor="var(--accent)"
                    labelStyle={{ font: '14px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)' }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Devices */}
          <div style={{ background: '#171717' }}>
            <div className="r-px" style={{ padding: '24px 48px', borderBottom: '1px solid #2A2A2A' }}>
              <p style={ACCENT_LABEL}>DEVICES</p>
            </div>
            {devices.length === 0 ? (
              <p className="r-px" style={{ padding: '28px 48px', fontSize: 15, color: '#909090', margin: 0, lineHeight: 1.6 }}>No data yet.</p>
            ) : (
              devices.map(d => {
                const pct = Math.round((d.pageviews / totalDevice) * 100)
                return (
                  <BarRow
                    key={d.deviceType}
                    label={d.deviceType.charAt(0).toUpperCase() + d.deviceType.slice(1)}
                    value={`${pct}%`}
                    pct={pct}
                    barColor="var(--accent)"
                  />
                )
              })
            )}
          </div>
        </div>
      </section>
    </>
  )
}

// ─── skeletons ─────────────────────────────────────────────────────────────────

const SHIMMER: React.CSSProperties = {
  borderRadius: 2,
  backgroundImage: 'linear-gradient(90deg,transparent 0%,rgba(255,255,255,.05) 50%,transparent 100%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.6s linear infinite',
}

function bar(w: string | number, h = 12, op = 0.06): React.ReactElement {
  return <div style={{ width: w, height: h, background: `rgba(242,244,247,${op})`, ...SHIMMER }} />
}

function CriticalSkeleton() {
  return (
    <>
      <section style={{ borderBottom: '1px solid #2A2A2A' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: '#2A2A2A' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ background: '#111', padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {bar('55%', 9, 0.07)}
              {bar('44%', 48, 0.05)}
              {bar('38%', 9, 0.04)}
            </div>
          ))}
        </div>
      </section>
      <div style={{ padding: '36px 48px 32px', borderBottom: '1px solid #2A2A2A' }}>
        {bar(160, 10, 0.07)}
        <div style={{ marginTop: 32, height: 180, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} style={{ flex: 1, height: `${18 + (i * 13 + 17) % 65}%`, background: 'rgba(183,240,0,0.05)', borderRadius: '2px 2px 0 0' }} />
          ))}
        </div>
      </div>
    </>
  )
}

function SecondarySkeleton() {
  return (
    <section style={{ borderBottom: '1px solid #2A2A2A' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '16px 48px', borderBottom: '1px solid #1E1E1E' }}>
          {bar('20%', 11, 0.06)}
          <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.03)', borderRadius: 2 }} />
          {bar(52, 11, 0.04)}
        </div>
      ))}
    </section>
  )
}

// ─── FAQ / glossary ────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    term: 'Page Views',
    desc: 'Total number of pages loaded by all visitors during the selected period. Refreshing a page counts as another view.',
  },
  {
    term: 'Unique Visitors',
    desc: 'Estimated count of individual people who visited the site, based on device and browser fingerprint. One person visiting 5 pages counts as 1 visitor.',
  },
  {
    term: 'Avg Daily Views',
    desc: 'Total page views divided by the number of days in the selected period. Useful for comparing busier vs. quieter stretches at a glance.',
  },
  {
    term: 'Booking Rate',
    desc: 'Bookings completed divided by unique visitors, shown as a percentage. A rough measure of how effectively traffic converts to paying clients.',
  },
  {
    term: 'Daily Chart',
    desc: 'Page views grouped by calendar day. Useful for spotting trends, traffic spikes, and the effect of campaigns or posts over time.',
  },
  {
    term: 'By Day of Week',
    desc: 'Average page views per weekday across the selected period (e.g., the average for all Mondays). Useful for scheduling posts on high-traffic days.',
  },
  {
    term: 'Top Pages',
    desc: 'Pages that received the most views in the period, ranked by traffic. Useful for understanding what content is drawing visitors.',
  },
  {
    term: 'Events',
    desc: 'Specific user interactions tracked on the site: WhatsApp clicks, Book CTA clicks, contact form submissions, FAQ opens, and completed bookings.',
  },
  {
    term: 'Top Referrers',
    desc: 'External websites or sources that sent visitors to the site. Direct traffic and search engines typically dominate this list.',
  },
  {
    term: 'Devices',
    desc: 'Breakdown of traffic by device type: mobile, desktop, or tablet. Useful for prioritising which experience to optimise first.',
  },
]

function AdminFAQ() {
  return (
    <section style={{ borderTop: '1px solid #2A2A2A' }}>
      <div className="r-px" style={{ padding: '24px 48px', borderBottom: '1px solid #2A2A2A' }}>
        <p style={ACCENT_LABEL}>GLOSSARY</p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 1,
          background: '#1E1E1E',
        }}
      >
        {FAQ_ITEMS.map(({ term, desc }) => (
          <div
            key={term}
            style={{
              background: '#0B0B0B',
              padding: '28px 32px',
            }}
          >
            <p style={{ font: '13px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.12em', margin: '0 0 12px' }}>
              {term.toUpperCase()}
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: '#909090', margin: 0 }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── setup guide ───────────────────────────────────────────────────────────────

function SetupGuide() {
  return (
    <div style={{ borderTop: '1px solid #2A2A2A' }}>
      <div className="r-px" style={{ padding: '80px 48px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: 640 }}>
        <p style={{ ...ACCENT_LABEL, margin: '0 0 24px' }}>ANALYTICS NOT CONFIGURED</p>
        <h2 style={{ fontSize: 36, fontWeight: 800, lineHeight: 0.95, letterSpacing: '-.03em', margin: '0 0 20px' }}>Set up analytics.</h2>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: '#A5A5A5', margin: '0 0 40px' }}>
          Add your Vercel credentials to see page views, visitor counts, top pages, and device breakdowns.
        </p>
        <div style={{ background: '#111', border: '1px solid #2A2A2A', padding: '24px 28px', font: '13px/2.2 ui-monospace,Menlo,monospace', color: '#A5A5A5', marginBottom: 24 }}>
          <div><span style={{ color: '#6B7280' }}># .env.local</span></div>
          <div><span style={{ color: 'var(--accent)' }}>VA_TOKEN</span>=your_vercel_api_token</div>
          <div><span style={{ color: 'var(--accent)' }}>VA_PROJECT_ID</span>=prj_xxxxxxxxxxxx</div>
          <div><span style={{ color: '#6B7280' }}>VA_TEAM_ID</span>=<span style={{ color: '#6B7280' }}>optional</span></div>
        </div>
        <p style={{ font: '12px/1.6 ui-monospace,Menlo,monospace', color: '#6B7280', margin: 0 }}>
          API tokens: vercel.com/account/tokens &nbsp;·&nbsp; Project ID: project settings
        </p>
      </div>
    </div>
  )
}

// ─── page ──────────────────────────────────────────────────────────────────────

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ p?: string; since?: string; until?: string }>
}) {
  await cookies() // ensure dynamic (auth checked in middleware)

  const { p, since: sinceParam, until: untilParam } = await searchParams

  const isCustom = p === 'custom'
  const days     = isCustom ? null : Math.min(Math.max(Number(p) || 30, 7), 90)

  const since = isCustom && sinceParam
    ? new Date(sinceParam + 'T00:00:00.000Z').toISOString()
    : roundToHour(Date.now() - (days ?? 30) * 86_400_000)

  const until = isCustom && untilParam
    ? new Date(untilParam + 'T23:59:59.999Z').toISOString()
    : roundToHour(Date.now())

  const activePeriod = isCustom ? 'custom' : String(days)

  const rangeDays = isCustom && sinceParam && untilParam
    ? Math.max(1, Math.round((new Date(untilParam).getTime() - new Date(sinceParam).getTime()) / 86_400_000))
    : days ?? 30

  const rangeLabel = isCustom && sinceParam && untilParam
    ? `${fmtShort(since)} to ${fmtShort(until)}`
    : `LAST ${days} DAYS`

  const configured = isAnalyticsConfigured()

  return (
    <>
      <AdminHeader activePeriod={activePeriod} />

      {/* Custom date range picker */}
      {isCustom && (
        <div className="r-px" style={{ padding: '32px 48px', borderBottom: '1px solid #2A2A2A', background: '#0D0D0D' }}>
          <p style={{ ...LABEL, color: '#6B7280', marginBottom: 16 }}>SELECT DATE RANGE</p>
          <DateRangePicker currentSince={sinceParam} currentUntil={untilParam} />
          {sinceParam && untilParam && (
            <p style={{ font: '12px/1 ui-monospace,Menlo,monospace', color: '#6B7280', marginTop: 14, letterSpacing: '.08em' }}>
              Showing {rangeDays} day{rangeDays !== 1 ? 's' : ''} of data
            </p>
          )}
        </div>
      )}

      {!configured ? (
        <SetupGuide />
      ) : (
        <>
          {/* Wave 1: stat cards + chart + events (3 API calls) */}
          <Suspense fallback={<CriticalSkeleton />}>
            <CriticalSection since={since} until={until} rangeDays={rangeDays} rangeLabel={rangeLabel} />
          </Suspense>

          {/* Wave 2: top pages + referrers + devices (3 API calls, runs in parallel with wave 1) */}
          <Suspense fallback={<SecondarySkeleton />}>
            <SecondarySection since={since} until={until} />
          </Suspense>
        </>
      )}

      {/* Always visible, no data dependency */}
      <AdminFAQ />
    </>
  )
}
