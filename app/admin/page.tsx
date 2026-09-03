import { cookies } from 'next/headers'
import { logoutAction, setPeriodAction } from '@/app/actions/admin'
import { fetchAnalytics } from '@/lib/analytics'
import type { AnalyticsData } from '@/lib/analytics'
import RefreshButton from './_components/RefreshButton'

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

function StatCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div style={{ background: '#171717', padding: '36px 32px' }}>
      <p style={MONO_LABEL}>{title}</p>
      <p
        className="gradient-gold"
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
    <div
      className="r-px"
      style={{
        padding: '20px 48px',
        borderBottom: '1px solid #2A2A2A',
      }}
    >
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
      className="hover-approach r-px"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '13px 48px',
        borderBottom: '1px solid #1E1E1E',
      }}
    >
      <div
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
        style={{
          flex: 1,
          height: 4,
          background: '#1E1E1E',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: barColor,
          }}
        />
      </div>
      <div
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
        pages.map(p => (
          <div
            key={p.requestPath}
            className="hover-approach r-px"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              padding: '13px 48px',
              borderBottom: '1px solid #1E1E1E',
            }}
          >
            <div
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
            <div style={{ flex: 1, height: 4, background: '#1E1E1E', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(p.pageviews / max) * 100}%`, background: 'var(--accent)' }} />
            </div>
            <div style={{ flex: '0 0 130px', textAlign: 'right' }}>
              <span style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#A5A5A5' }}>
                {fmt(p.pageviews)} views
              </span>
              <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#5f6670', marginLeft: 10 }}>
                {fmt(p.visitors)} visitors
              </span>
            </div>
          </div>
        ))
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

function DailyChart({ daily }: { daily: AnalyticsData['daily'] }) {
  const max = Math.max(...daily.map(d => d.pageviews), 1)

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })
  const firstDate = daily[0]?.timestamp ? fmtDate(daily[0].timestamp) : ''
  const lastDate  = daily[daily.length - 1]?.timestamp ? fmtDate(daily[daily.length - 1].timestamp) : ''
  const peakViews = daily.length ? Math.max(...daily.map(d => d.pageviews)) : 0

  return (
    <section
      className="r-px"
      style={{ padding: '36px 48px 32px', borderBottom: '1px solid #2A2A2A' }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28 }}>
        <p style={{ ...MONO_LABEL, color: 'var(--accent)' }}>DAILY VIEWS</p>
        {peakViews > 0 && (
          <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#444', margin: 0 }}>
            PEAK &nbsp;{fmt(peakViews)}
          </p>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 180 }}>
        {daily.length === 0 ? (
          <p style={{ fontSize: 14, color: '#5f6670', margin: 0, lineHeight: 1.6 }}>No data yet.</p>
        ) : (
          daily.map((d, i) => {
            const h = Math.max((d.pageviews / max) * 100, 2)
            const date = d.timestamp ? fmtDate(d.timestamp) : ''
            return (
              <div
                key={i}
                title={`${date}: ${d.pageviews.toLocaleString()} views`}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background: 'linear-gradient(180deg, #B7F000 0%, rgba(183,240,0,0.18) 100%)',
                  borderRadius: '2px 2px 0 0',
                  minWidth: 3,
                }}
              />
            )
          })
        )}
      </div>
      {daily.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#3A3A3A' }}>{firstDate}</span>
          <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#3A3A3A' }}>{lastDate}</span>
        </div>
      )}
    </section>
  )
}

const EVENT_LABELS: Record<string, string> = {
  whatsapp_click:    'WhatsApp clicks',
  mobile_book_click: 'Mobile book taps',
  mobile_call_click: 'Mobile call taps',
  contact_submit:    'Contact submissions',
  booking_complete:  'Bookings completed',
}

function Events({ events }: { events: AnalyticsData['events'] }) {
  const max = Math.max(...events.map(e => e.count), 1)
  return (
    <div style={{ background: '#0B0B0B' }}>
      <div
        className="r-px"
        style={{ padding: '20px 48px', borderBottom: '1px solid #2A2A2A' }}
      >
        <p style={{ ...MONO_LABEL, color: 'var(--accent)' }}>EVENTS</p>
      </div>
      {events.length === 0 ? (
        <p className="r-px" style={{ padding: '24px 48px', fontSize: 14, color: '#5f6670', margin: 0, lineHeight: 1.6 }}>
          No events yet. Appears once users interact with the site.
        </p>
      ) : (
        events.map(e => (
          <BarRow
            key={e.eventName}
            label={EVENT_LABELS[e.eventName] ?? e.eventName}
            value={fmt(e.count)}
            pct={(e.count / max) * 100}
            barColor="#4ade80"
          />
        ))
      )}
    </div>
  )
}

function Referrers({ referrers }: { referrers: AnalyticsData['referrers'] }) {
  const max = Math.max(...referrers.map(r => r.pageviews), 1)
  return (
    <div style={{ background: '#171717' }}>
      <div
        className="r-px"
        style={{ padding: '20px 48px', borderBottom: '1px solid #2A2A2A' }}
      >
        <p style={{ ...MONO_LABEL, color: 'var(--accent)' }}>TOP REFERRERS</p>
      </div>
      {referrers.length === 0 ? (
        <p className="r-px" style={{ padding: '24px 48px', fontSize: 14, color: '#5f6670', margin: 0, lineHeight: 1.6 }}>
          No referrer data yet.
        </p>
      ) : (
        referrers.map(r => (
          <BarRow
            key={r.referrerHostname}
            label={r.referrerHostname}
            value={fmt(r.pageviews)}
            pct={(r.pageviews / max) * 100}
            barColor="var(--accent)"
            labelStyle={{ font: '13px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)' }}
          />
        ))
      )}
    </div>
  )
}

function SetupGuide() {
  return (
    <div style={{ borderTop: '1px solid #2A2A2A' }}>
      <div
        className="r-px"
        style={{
          padding: '80px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          maxWidth: 640,
        }}
      >
        <p
          style={{
            font: '10px/1 ui-monospace,Menlo,monospace',
            letterSpacing: '.28em',
            color: 'var(--accent)',
            margin: '0 0 24px',
          }}
        >
          ANALYTICS NOT CONFIGURED
        </p>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-.03em',
            margin: '0 0 20px',
          }}
        >
          Set up analytics.
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: '#A5A5A5', margin: '0 0 40px' }}>
          Add your Vercel credentials to see page views, visitor counts, top pages, and device
          breakdowns.
        </p>
        <div
          style={{
            background: '#111',
            border: '1px solid #2A2A2A',
            padding: '24px 28px',
            font: '12px/2.2 ui-monospace,Menlo,monospace',
            color: '#A5A5A5',
            marginBottom: 24,
          }}
        >
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
  const days = Math.min(Math.max(Number(period) || 30, 7), 90)
  const data = await fetchAnalytics(days)
  const avgDaily = data ? Math.round(data.totals.pageviews / days) : 0
  const bookings = data?.events.find(e => e.eventName === 'booking_complete')?.count ?? 0
  const convRate = data && data.totals.visitors > 0
    ? `${((bookings / data.totals.visitors) * 100).toFixed(1)}%`
    : 'N/A'

  return (
    <>
      {/* Header */}
      <header
        style={{
          borderBottom: '1px solid #2A2A2A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div className="r-px" style={{ padding: '28px 48px' }}>
          <p
            style={{
              font: '10px/1 ui-monospace,Menlo,monospace',
              letterSpacing: '.28em',
              color: 'var(--accent)',
              margin: '0 0 10px',
            }}
          >
            REBUILT ACADEMY
          </p>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-.03em',
              margin: 0,
              color: '#fff',
            }}
          >
            Analytics
          </h1>
        </div>

        <div className="r-px" style={{ padding: '28px 48px', display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Period tabs */}
          <div style={{ display: 'flex', gap: 1, background: '#2A2A2A' }}>
            {(['7', '30', '90'] as const).map(p => (
              <form key={p} action={setPeriodAction} style={{ margin: 0 }}>
                <input type="hidden" name="period" value={p} />
                <button
                  type="submit"
                  style={{
                    display: 'block',
                    padding: '10px 18px',
                    font: '10px/1 ui-monospace,Menlo,monospace',
                    letterSpacing: '.14em',
                    background: days === Number(p) ? 'var(--accent)' : '#171717',
                    color: days === Number(p) ? '#0B0B0B' : '#909090',
                    fontWeight: days === Number(p) ? 700 : 400,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {p}D
                </button>
              </form>
            ))}
          </div>

          {/* Refresh */}
          <RefreshButton />

          {/* Logout */}
          <form action={logoutAction}>
            <button
              type="submit"
              className="btn-outline"
              style={{ padding: '10px 18px', fontSize: 11, letterSpacing: '.16em' }}
            >
              SIGN OUT
            </button>
          </form>
        </div>
      </header>

      {!data ? (
        <SetupGuide />
      ) : (
        <>
          {/* Stat cards */}
          <section style={{ borderBottom: '1px solid #2A2A2A' }}>
            <div
              className="r4"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 2,
                background: '#2A2A2A',
              }}
            >
              <StatCard
                title="PAGE VIEWS"
                value={fmt(data.totals.pageviews)}
                sub={`LAST ${days} DAYS`}
              />
              <StatCard
                title="UNIQUE VISITORS"
                value={fmt(data.totals.visitors)}
                sub={`LAST ${days} DAYS`}
              />
              <StatCard
                title="AVG DAILY VIEWS"
                value={fmt(avgDaily)}
                sub="PER DAY"
              />
              <StatCard
                title="BOOKING RATE"
                value={convRate}
                sub={`${bookings} BOOKINGS`}
              />
            </div>
          </section>

          {/* Daily chart */}
          <DailyChart daily={data.daily} />

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
