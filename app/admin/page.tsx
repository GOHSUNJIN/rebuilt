import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { logoutAction, setPeriodAction } from '@/app/actions/admin'
import { fetchAnalytics } from '@/lib/analytics'
import type { AnalyticsData, DailyStat, DOWStat } from '@/lib/analytics'
import RefreshButton from './_components/RefreshButton'
import DateRangePicker from './_components/DateRangePicker'
import TrafficChart from './_components/TrafficChart'

const PAGE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/rehab': 'Rehab',
  '/strength': 'Training',
  '/performance': 'Performance',
  '/physio': 'Physiotherapy',
  '/about': 'About',
  '/book': 'Book',
  '/faq': 'FAQ',
  '/privacy': 'Privacy',
  '/terms': 'Terms',
}

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

const MONO_LABEL: React.CSSProperties = {
  font: '10px/1 ui-monospace,Menlo,monospace',
  letterSpacing: '.2em',
  color: '#909090',
  margin: 0,
}

const DOW_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function computeDOW(daily: DailyStat[]): DOWStat[] {
  const buckets = DOW_LABELS.map(day => ({ day, pageviews: 0, visitors: 0, count: 0 }))
  for (const d of daily) {
    if (!d.timestamp) continue
    const dow = new Date(d.timestamp).getUTCDay()
    buckets[dow].pageviews += d.pageviews
    buckets[dow].visitors += d.visitors
    buckets[dow].count++
  }
  return buckets.map(b => ({
    day: b.day,
    pageviews: b.count > 0 ? Math.round(b.pageviews / b.count) : 0,
    visitors: b.count > 0 ? Math.round(b.visitors / b.count) : 0,
  }))
}

function fmtShort(iso: string) {
  return new Date(iso).toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' })
}

function StatCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div className="admin-stat-card" style={{ background: '#171717', padding: '36px 32px' }}>
      <p style={MONO_LABEL}>{title}</p>
      <p
        className="gradient-gold admin-stat-num"
        style={{
          fontSize: 52,
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-.04em',
          margin: '16px 0 0',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </p>
      {sub && (
        <p
          style={{
            font: '10px/1 ui-monospace,Menlo,monospace',
            color: '#5f6670',
            margin: '12px 0 0',
            letterSpacing: '.14em',
          }}
        >
          {sub}
        </p>
      )}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="r-px" style={{ padding: '20px 48px', borderBottom: '1px solid #2A2A2A' }}>
      <p style={{ ...MONO_LABEL, color: 'var(--accent)' }}>{children}</p>
    </div>
  )
}

function BarRow({
  label,
  value,
  pct,
  barColor,
  labelStyle,
}: {
  label: string
  value: string
  pct: number
  barColor: string
  labelStyle?: React.CSSProperties
}) {
  return (
    <div
      className="hover-approach r-px admin-bar-row"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '13px 48px',
        borderBottom: '1px solid #1E1E1E',
      }}
    >
      <div
        className="admin-bar-label"
        style={{
          flex: '0 0 160px',
          fontSize: 13,
          color: '#A5A5A5',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          ...labelStyle,
        }}
        title={label}
      >
        {label}
      </div>
      <div
        className="admin-bar-track"
        style={{ flex: 1, height: 4, background: '#1E1E1E', overflow: 'hidden' }}
      >
        <div style={{ height: '100%', width: `${pct}%`, background: barColor }} />
      </div>
      <div
        className="admin-bar-value"
        style={{
          flex: '0 0 48px',
          textAlign: 'right',
          font: '11px/1 ui-monospace,Menlo,monospace',
          color: '#5f6670',
        }}
      >
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
      {pages.length === 0 ? (
        <p className="r-px" style={{ padding: '24px 48px', fontSize: 14, color: '#5f6670', margin: 0, lineHeight: 1.6 }}>
          No data yet.
        </p>
      ) : (
        <div className="admin-rows-scroll">
          {pages.map(p => (
            <div
              key={p.requestPath}
              className="hover-approach r-px admin-bar-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '13px 48px',
                borderBottom: '1px solid #1E1E1E',
              }}
            >
              <div
                className="admin-bar-label"
                style={{
                  flex: '0 0 160px',
                  font: '13px/1 ui-monospace,Menlo,monospace',
                  color: 'var(--accent)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={p.requestPath}
              >
                {PAGE_LABELS[p.requestPath] ?? p.requestPath}
              </div>
              <div className="admin-bar-track" style={{ flex: 1, height: 4, background: '#1E1E1E', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(p.pageviews / max) * 100}%`, background: 'var(--accent)' }} />
              </div>
              <div className="admin-bar-value" style={{ flex: '0 0 130px', textAlign: 'right' }}>
                <span style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#A5A5A5' }}>
                  {fmt(p.pageviews)} views
                </span>
                <span className="admin-page-visitors" style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#5f6670', marginLeft: 10 }}>
                  {fmt(p.visitors)} visitors
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function Devices({ devices }: { devices: AnalyticsData['devices'] }) {
  const total = devices.reduce((s, d) => s + d.pageviews, 0) || 1
  return (
    <section>
      <SectionLabel>DEVICES</SectionLabel>
      {devices.length === 0 ? (
        <p className="r-px" style={{ padding: '24px 48px', fontSize: 14, color: '#5f6670', margin: 0, lineHeight: 1.6 }}>
          No data yet.
        </p>
      ) : (
        devices.map(d => {
          const pct = Math.round((d.pageviews / total) * 100)
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
    </section>
  )
}

const EVENT_LABELS: Record<string, string> = {
  book_cta_click:    'Book CTA clicks',
  whatsapp_click:    'WhatsApp clicks',
  mobile_book_click: 'Mobile book taps',
  mobile_call_click: 'Mobile call taps',
  contact_submit:    'Contact submissions',
  booking_complete:  'Bookings completed',
  faq_open:          'FAQ opens',
  faq_tab:           'FAQ tab switches',
}

function Events({ events }: { events: AnalyticsData['events'] }) {
  const max = Math.max(...events.map(e => e.count), 1)
  return (
    <div style={{ background: '#0B0B0B' }}>
      <div className="r-px" style={{ padding: '20px 48px', borderBottom: '1px solid #2A2A2A' }}>
        <p style={{ ...MONO_LABEL, color: 'var(--accent)' }}>EVENTS</p>
      </div>
      {events.length === 0 ? (
        <p className="r-px" style={{ padding: '24px 48px', fontSize: 14, color: '#5f6670', margin: 0, lineHeight: 1.6 }}>
          No events yet. Appears once users interact with the site.
        </p>
      ) : (
        <div className="admin-rows-scroll">
          {events.map(e => (
            <BarRow
              key={e.eventName}
              label={EVENT_LABELS[e.eventName] ?? e.eventName}
              value={fmt(e.count)}
              pct={(e.count / max) * 100}
              barColor="#4ade80"
            />
          ))}
        </div>
      )}
    </div>
  )
}

function Referrers({ referrers }: { referrers: AnalyticsData['referrers'] }) {
  const max = Math.max(...referrers.map(r => r.pageviews), 1)
  return (
    <div style={{ background: '#171717' }}>
      <div className="r-px" style={{ padding: '20px 48px', borderBottom: '1px solid #2A2A2A' }}>
        <p style={{ ...MONO_LABEL, color: 'var(--accent)' }}>TOP REFERRERS</p>
      </div>
      {referrers.length === 0 ? (
        <p className="r-px" style={{ padding: '24px 48px', fontSize: 14, color: '#5f6670', margin: 0, lineHeight: 1.6 }}>
          No referrer data yet.
        </p>
      ) : (
        <div className="admin-rows-scroll">
          {referrers.map(r => (
            <BarRow
              key={r.referrerHostname}
              label={r.referrerHostname}
              value={fmt(r.pageviews)}
              pct={(r.pageviews / max) * 100}
              barColor="var(--accent)"
              labelStyle={{ font: '13px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function SetupGuide() {
  return (
    <div style={{ borderTop: '1px solid #2A2A2A' }}>
      <div className="r-px" style={{ padding: '80px 48px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: 640 }}>
        <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', letterSpacing: '.28em', color: 'var(--accent)', margin: '0 0 24px' }}>
          ANALYTICS NOT CONFIGURED
        </p>
        <h2 style={{ fontSize: 36, fontWeight: 800, lineHeight: 0.95, letterSpacing: '-.03em', margin: '0 0 20px' }}>
          Set up analytics.
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: '#A5A5A5', margin: '0 0 40px' }}>
          Add your Vercel credentials to see page views, visitor counts, top pages, and device breakdowns.
        </p>
        <div style={{ background: '#111', border: '1px solid #2A2A2A', padding: '24px 28px', font: '12px/2.2 ui-monospace,Menlo,monospace', color: '#A5A5A5', marginBottom: 24 }}>
          <div><span style={{ color: '#444' }}># .env.local</span></div>
          <div><span style={{ color: 'var(--accent)' }}>VA_TOKEN</span>=your_vercel_api_token</div>
          <div><span style={{ color: 'var(--accent)' }}>VA_PROJECT_ID</span>=prj_xxxxxxxxxxxx</div>
          <div><span style={{ color: '#444' }}>VA_TEAM_ID</span>=<span style={{ color: '#444' }}>optional</span></div>
        </div>
        <p style={{ font: '11px/1.6 ui-monospace,Menlo,monospace', color: '#444', margin: 0 }}>
          API tokens: vercel.com/account/tokens &nbsp;·&nbsp; Project ID: project settings
        </p>
      </div>
    </div>
  )
}

export default async function AdminPage() {
  const cookieStore = await cookies()

  const period = cookieStore.get('rebuilt_period')?.value
  const isCustom = period === 'custom'
  const days = isCustom ? null : Math.min(Math.max(Number(period) || 30, 7), 90)

  const customSince = cookieStore.get('rebuilt_since')?.value
  const customUntil = cookieStore.get('rebuilt_until')?.value

  const since = isCustom && customSince
    ? customSince
    : new Date(Date.now() - (days ?? 30) * 86_400_000).toISOString()
  const until = isCustom && customUntil
    ? customUntil
    : new Date().toISOString()

  const data = await fetchAnalytics(since, until)

  const rangeDays = isCustom && customSince && customUntil
    ? Math.max(1, Math.round((new Date(customUntil).getTime() - new Date(customSince).getTime()) / 86_400_000))
    : days ?? 30

  const rangeLabel = isCustom && customSince && customUntil
    ? `${fmtShort(customSince)} – ${fmtShort(customUntil)}`
    : `LAST ${days} DAYS`

  const avgDaily = data ? Math.round(data.totals.pageviews / rangeDays) : 0
  const bookings = data?.events.find(e => e.eventName === 'booking_complete')?.count ?? 0
  const convRate = data && data.totals.visitors > 0
    ? `${((bookings / data.totals.visitors) * 100).toFixed(1)}%`
    : 'N/A'

  const dow = data ? computeDOW(data.daily) : []

  const PERIOD_TABS = [
    { value: '7',      label: '7D' },
    { value: '30',     label: '30D' },
    { value: '90',     label: '90D' },
    { value: 'custom', label: 'CUSTOM' },
  ]
  const activePeriod = isCustom ? 'custom' : String(days)

  return (
    <>
      {/* Header */}
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
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '.28em', color: '#fff', lineHeight: 1 }}>
              REBUILT ACADEMY
            </div>
            <div style={{ marginTop: 4, font: '8px/1 ui-monospace,Menlo,monospace', letterSpacing: '.22em', color: 'var(--accent)' }}>
              ANALYTICS
            </div>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Period tabs */}
          <div style={{ display: 'flex', gap: 1, background: '#2A2A2A' }}>
            {PERIOD_TABS.map(({ value, label }) => (
              <form key={value} action={setPeriodAction} style={{ margin: 0 }}>
                <input type="hidden" name="period" value={value} />
                <button
                  type="submit"
                  className="admin-period-btn"
                  style={{
                    display: 'block',
                    padding: '10px 18px',
                    font: '10px/1 ui-monospace,Menlo,monospace',
                    letterSpacing: '.14em',
                    background: activePeriod === value ? 'var(--accent)' : '#171717',
                    color: activePeriod === value ? '#0B0B0B' : '#909090',
                    fontWeight: activePeriod === value ? 700 : 400,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              </form>
            ))}
          </div>

          <div className="admin-refresh-hide">
            <RefreshButton />
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="btn-outline admin-signout-btn"
              style={{ padding: '10px 18px', fontSize: 11, letterSpacing: '.16em' }}
            >
              SIGN OUT
            </button>
          </form>
        </div>
      </header>

      {/* Date range picker bar (custom mode only) */}
      {isCustom && (
        <div
          className="r-px"
          style={{
            padding: '14px 48px',
            borderBottom: '1px solid #2A2A2A',
            background: '#0D0D0D',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.18em', flexShrink: 0 }}>
            DATE RANGE
          </span>
          <DateRangePicker currentSince={customSince} currentUntil={customUntil} />
        </div>
      )}

      {!data ? (
        <SetupGuide />
      ) : (
        <>
          {/* Stat cards */}
          <section style={{ borderBottom: '1px solid #2A2A2A' }}>
            <div
              className="r4 admin-stat-scroll"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 2,
                background: '#2A2A2A',
              }}
            >
              <StatCard title="PAGE VIEWS"      value={fmt(data.totals.pageviews)} sub={rangeLabel} />
              <StatCard title="UNIQUE VISITORS" value={fmt(data.totals.visitors)}  sub={rangeLabel} />
              <StatCard title="AVG DAILY VIEWS" value={fmt(avgDaily)}              sub="PER DAY" />
              <StatCard title="BOOKING RATE"    value={convRate}                   sub={`${bookings} BOOKINGS`} />
            </div>
          </section>

          {/* Traffic chart with daily / hourly / DOW tabs */}
          <TrafficChart daily={data.daily} hourly={data.hourly} dow={dow} />

          {/* Top pages */}
          <TopPages pages={data.topPages} />

          {/* Events + Referrers */}
          <section style={{ borderBottom: '1px solid #2A2A2A' }}>
            <div
              className="r2"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 2,
                background: '#2A2A2A',
              }}
            >
              <Events events={data.events} />
              <Referrers referrers={data.referrers} />
            </div>
          </section>

          {/* Devices */}
          <Devices devices={data.devices} />
        </>
      )}
    </>
  )
}
