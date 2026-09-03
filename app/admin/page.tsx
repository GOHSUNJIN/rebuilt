import { Suspense } from 'react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { logoutAction } from '@/app/actions/admin'
import { fetchAnalytics } from '@/lib/analytics'
import type { AnalyticsData, DailyStat, DOWStat } from '@/lib/analytics'
import RefreshButton from './_components/RefreshButton'
import DateRangePicker from './_components/DateRangePicker'
import TrafficChart from './_components/TrafficChart'

// ─── helpers ──────────────────────────────────────────────────────────────────

const PAGE_LABELS: Record<string, string> = {
  '/': 'Home', '/rehab': 'Rehab', '/strength': 'Training',
  '/performance': 'Performance', '/physio': 'Physiotherapy',
  '/about': 'About', '/book': 'Book', '/faq': 'FAQ',
  '/privacy': 'Privacy', '/terms': 'Terms',
}

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

const MONO: React.CSSProperties = {
  font: '11px/1 ui-monospace,Menlo,monospace',
  letterSpacing: '.18em',
  color: '#909090',
  margin: 0,
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

// ─── header ───────────────────────────────────────────────────────────────────

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
          <div style={{ marginTop: 4, font: '8px/1 ui-monospace,Menlo,monospace', letterSpacing: '.22em', color: 'var(--accent)' }}>ANALYTICS</div>
        </div>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 1, background: '#2A2A2A' }}>
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
                  font: '10px/1 ui-monospace,Menlo,monospace',
                  letterSpacing: '.14em',
                  background: active ? 'var(--accent)' : '#171717',
                  color: active ? '#0B0B0B' : '#909090',
                  fontWeight: active ? 700 : 400,
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>
        <div className="admin-refresh-hide"><RefreshButton /></div>
        <form action={logoutAction}>
          <button type="submit" className="btn-outline admin-signout-btn" style={{ padding: '10px 18px', fontSize: 11, letterSpacing: '.16em' }}>
            SIGN OUT
          </button>
        </form>
      </div>
    </header>
  )
}

// ─── data skeleton (shown while analytics loads) ───────────────────────────────

function DataSkeleton() {
  const bar = (w: string | number, h = 12, op = 0.06) => (
    <div style={{
      width: w, height: h, borderRadius: 2,
      background: `rgba(242,244,247,${op})`,
      backgroundImage: 'linear-gradient(90deg,transparent 0%,rgba(255,255,255,.05) 50%,transparent 100%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.6s linear infinite',
    }} />
  )
  return (
    <>
      {/* stat cards */}
      <section style={{ borderBottom: '1px solid #2A2A2A' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: '#2A2A2A' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ background: '#171717', padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {bar('55%', 8, 0.08)}
              {bar('42%', 44, 0.06)}
              {bar('38%', 7, 0.04)}
            </div>
          ))}
        </div>
      </section>
      {/* chart */}
      <div style={{ padding: '36px 48px 32px', borderBottom: '1px solid #2A2A2A' }}>
        {bar(120, 9, 0.08)}
        <div style={{ marginTop: 28, height: 180, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} style={{ flex: 1, height: `${20 + Math.random() * 60}%`, background: 'rgba(183,240,0,0.06)', borderRadius: '2px 2px 0 0' }} />
          ))}
        </div>
      </div>
      {/* rows */}
      <section style={{ borderBottom: '1px solid #2A2A2A' }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '13px 48px', borderBottom: '1px solid #1E1E1E' }}>
            {bar('18%', 10, 0.06)}
            <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }} />
            {bar(36, 10, 0.04)}
          </div>
        ))}
      </section>
    </>
  )
}

// ─── data sections (async — fetches analytics) ─────────────────────────────────

async function DataSections({
  since, until, rangeDays, rangeLabel,
}: {
  since: string; until: string; rangeDays: number; rangeLabel: string
}) {
  const data = await fetchAnalytics(since, until)
  if (!data) return <SetupGuide />

  const avgDaily = Math.round(data.totals.pageviews / rangeDays)
  const bookings = data.events.find(e => e.eventName === 'booking_complete')?.count ?? 0
  const convRate = data.totals.visitors > 0
    ? `${((bookings / data.totals.visitors) * 100).toFixed(1)}%`
    : 'N/A'
  const dow = computeDOW(data.daily)

  return (
    <>
      <section style={{ borderBottom: '1px solid #2A2A2A' }}>
        <div className="r4 admin-stat-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: '#2A2A2A' }}>
          <StatCard title="PAGE VIEWS"      value={fmt(data.totals.pageviews)} sub={rangeLabel} />
          <StatCard title="UNIQUE VISITORS" value={fmt(data.totals.visitors)}  sub={rangeLabel} />
          <StatCard title="AVG DAILY VIEWS" value={fmt(avgDaily)}              sub="PER DAY" />
          <StatCard title="BOOKING RATE"    value={convRate}                   sub={`${bookings} BOOKINGS`} />
        </div>
      </section>
      <TrafficChart daily={data.daily} hourly={data.hourly} dow={dow} />
      <TopPages pages={data.topPages} />
      <section style={{ borderBottom: '1px solid #2A2A2A' }}>
        <div className="r2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: '#2A2A2A' }}>
          <Events events={data.events} />
          <Referrers referrers={data.referrers} />
        </div>
      </section>
      <Devices devices={data.devices} />
    </>
  )
}

// ─── sub-components ────────────────────────────────────────────────────────────

function StatCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div className="admin-stat-card" style={{ background: '#171717', padding: '36px 32px', borderBottom: '1px solid #1E1E1E' }}>
      <p style={{ ...MONO, color: '#6B7280' }}>{title}</p>
      <p className="gradient-gold admin-stat-num" style={{ fontSize: 52, fontWeight: 800, lineHeight: 1, letterSpacing: '-.04em', margin: '18px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {value}
      </p>
      {sub && <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6B7280', margin: '14px 0 0', letterSpacing: '.12em' }}>{sub}</p>}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="r-px" style={{ padding: '22px 48px', borderBottom: '1px solid #2A2A2A' }}>
      <p style={{ ...MONO, color: 'var(--accent)', letterSpacing: '.22em' }}>{children}</p>
    </div>
  )
}

function BarRow({ label, value, pct, barColor, labelStyle }: {
  label: string; value: string; pct: number; barColor: string; labelStyle?: React.CSSProperties
}) {
  return (
    <div className="hover-approach r-px admin-bar-row" style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '14px 48px', borderBottom: '1px solid #1E1E1E' }}>
      <div className="admin-bar-label" style={{ flex: '0 0 160px', fontSize: 13.5, color: '#C0C0C0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', ...labelStyle }} title={label}>
        {label}
      </div>
      <div className="admin-bar-track" style={{ flex: 1, height: 3, background: '#252525', overflow: 'hidden', borderRadius: 2 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: barColor, borderRadius: 2 }} />
      </div>
      <div className="admin-bar-value" style={{ flex: '0 0 52px', textAlign: 'right', font: '12px/1 ui-monospace,Menlo,monospace', color: '#909090', fontWeight: 500 }}>
        {value}
      </div>
    </div>
  )
}

function TopPages({ pages }: { pages: AnalyticsData['topPages'] }) {
  const max = Math.max(...pages.map(p => p.pageviews), 1)
  return (
    <section style={{ borderBottom: '1px solid #2A2A2A' }}>
      <SectionLabel>TOP PAGES</SectionLabel>
      {pages.length === 0
        ? <p className="r-px" style={{ padding: '24px 48px', fontSize: 14, color: '#5f6670', margin: 0, lineHeight: 1.6 }}>No data yet.</p>
        : (
          <div className="admin-rows-scroll">
            {pages.map(p => (
              <div key={p.requestPath} className="hover-approach r-px admin-bar-row" style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '13px 48px', borderBottom: '1px solid #1E1E1E' }}>
                <div className="admin-bar-label" style={{ flex: '0 0 160px', font: '13px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={p.requestPath}>
                  {PAGE_LABELS[p.requestPath] ?? p.requestPath}
                </div>
                <div className="admin-bar-track" style={{ flex: 1, height: 4, background: '#1E1E1E', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(p.pageviews / max) * 100}%`, background: 'var(--accent)' }} />
                </div>
                <div className="admin-bar-value" style={{ flex: '0 0 130px', textAlign: 'right' }}>
                  <span style={{ font: '12px/1 ui-monospace,Menlo,monospace', color: '#C0C0C0', fontWeight: 500 }}>{fmt(p.pageviews)} views</span>
                  <span className="admin-page-visitors" style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6B7280', marginLeft: 10 }}>{fmt(p.visitors)} visitors</span>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </section>
  )
}

function Devices({ devices }: { devices: AnalyticsData['devices'] }) {
  const total = devices.reduce((s, d) => s + d.pageviews, 0) || 1
  return (
    <section>
      <SectionLabel>DEVICES</SectionLabel>
      {devices.length === 0
        ? <p className="r-px" style={{ padding: '24px 48px', fontSize: 14, color: '#5f6670', margin: 0, lineHeight: 1.6 }}>No data yet.</p>
        : devices.map(d => {
          const pct = Math.round((d.pageviews / total) * 100)
          return <BarRow key={d.deviceType} label={d.deviceType.charAt(0).toUpperCase() + d.deviceType.slice(1)} value={`${pct}%`} pct={pct} barColor="var(--accent)" />
        })
      }
    </section>
  )
}

const EVENT_LABELS: Record<string, string> = {
  book_cta_click: 'Book CTA clicks', whatsapp_click: 'WhatsApp clicks',
  mobile_book_click: 'Mobile book taps', mobile_call_click: 'Mobile call taps',
  contact_submit: 'Contact submissions', booking_complete: 'Bookings completed',
  faq_open: 'FAQ opens', faq_tab: 'FAQ tab switches',
}

function Events({ events }: { events: AnalyticsData['events'] }) {
  const max = Math.max(...events.map(e => e.count), 1)
  return (
    <div style={{ background: '#0B0B0B' }}>
      <div className="r-px" style={{ padding: '22px 48px', borderBottom: '1px solid #2A2A2A' }}>
        <p style={{ ...MONO, color: 'var(--accent)', letterSpacing: '.22em' }}>EVENTS</p>
      </div>
      {events.length === 0
        ? <p className="r-px" style={{ padding: '24px 48px', fontSize: 14, color: '#5f6670', margin: 0, lineHeight: 1.6 }}>No events yet.</p>
        : <div className="admin-rows-scroll">{events.map(e => <BarRow key={e.eventName} label={EVENT_LABELS[e.eventName] ?? e.eventName} value={fmt(e.count)} pct={(e.count / max) * 100} barColor="#4ade80" />)}</div>
      }
    </div>
  )
}

function Referrers({ referrers }: { referrers: AnalyticsData['referrers'] }) {
  const max = Math.max(...referrers.map(r => r.pageviews), 1)
  return (
    <div style={{ background: '#171717' }}>
      <div className="r-px" style={{ padding: '22px 48px', borderBottom: '1px solid #2A2A2A' }}>
        <p style={{ ...MONO, color: 'var(--accent)', letterSpacing: '.22em' }}>TOP REFERRERS</p>
      </div>
      {referrers.length === 0
        ? <p className="r-px" style={{ padding: '24px 48px', fontSize: 14, color: '#5f6670', margin: 0, lineHeight: 1.6 }}>No referrer data yet.</p>
        : <div className="admin-rows-scroll">{referrers.map(r => <BarRow key={r.referrerHostname} label={r.referrerHostname} value={fmt(r.pageviews)} pct={(r.pageviews / max) * 100} barColor="var(--accent)" labelStyle={{ font: '13px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)' }} />)}</div>
      }
    </div>
  )
}

function SetupGuide() {
  return (
    <div style={{ borderTop: '1px solid #2A2A2A' }}>
      <div className="r-px" style={{ padding: '80px 48px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: 640 }}>
        <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', letterSpacing: '.28em', color: 'var(--accent)', margin: '0 0 24px' }}>ANALYTICS NOT CONFIGURED</p>
        <h2 style={{ fontSize: 36, fontWeight: 800, lineHeight: 0.95, letterSpacing: '-.03em', margin: '0 0 20px' }}>Set up analytics.</h2>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: '#A5A5A5', margin: '0 0 40px' }}>Add your Vercel credentials to see page views, visitor counts, top pages, and device breakdowns.</p>
        <div style={{ background: '#111', border: '1px solid #2A2A2A', padding: '24px 28px', font: '12px/2.2 ui-monospace,Menlo,monospace', color: '#A5A5A5', marginBottom: 24 }}>
          <div><span style={{ color: '#444' }}># .env.local</span></div>
          <div><span style={{ color: 'var(--accent)' }}>VA_TOKEN</span>=your_vercel_api_token</div>
          <div><span style={{ color: 'var(--accent)' }}>VA_PROJECT_ID</span>=prj_xxxxxxxxxxxx</div>
          <div><span style={{ color: '#444' }}>VA_TEAM_ID</span>=<span style={{ color: '#444' }}>optional</span></div>
        </div>
        <p style={{ font: '11px/1.6 ui-monospace,Menlo,monospace', color: '#444', margin: 0 }}>API tokens: vercel.com/account/tokens &nbsp;·&nbsp; Project ID: project settings</p>
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
  await cookies() // ensures dynamic rendering (auth checked in middleware)

  const { p, since: sinceParam, until: untilParam } = await searchParams

  const isCustom = p === 'custom'
  const days = isCustom ? null : Math.min(Math.max(Number(p) || 30, 7), 90)

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
    ? `${fmtShort(since)} – ${fmtShort(until)}`
    : `LAST ${days} DAYS`

  return (
    <>
      {/* Header renders immediately — correct active tab, no API dependency */}
      <AdminHeader activePeriod={activePeriod} />

      {isCustom && (
        <div className="r-px" style={{ padding: '14px 48px', borderBottom: '1px solid #2A2A2A', background: '#0D0D0D', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.18em', flexShrink: 0 }}>DATE RANGE</span>
          <DateRangePicker currentSince={sinceParam} currentUntil={untilParam} />
        </div>
      )}

      {/* Data streams in while skeleton is shown */}
      <Suspense fallback={<DataSkeleton />}>
        <DataSections since={since} until={until} rangeDays={rangeDays} rangeLabel={rangeLabel} />
      </Suspense>
    </>
  )
}
