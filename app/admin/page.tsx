import { logoutAction } from '@/app/actions/admin'
import { fetchAnalytics } from '@/lib/analytics'
import type { AnalyticsData } from '@/lib/analytics'

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

const CARD: React.CSSProperties = {
  background: '#111315',
  border: '1px solid #1C1E21',
  borderRadius: 10,
  overflow: 'hidden',
}

function mono(size: number, extra?: React.CSSProperties): React.CSSProperties {
  return { font: `${size}px/1 ui-monospace,Menlo,monospace`, ...extra }
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={mono(10, { letterSpacing: '.2em', color: '#555', margin: 0 })}>
      {children}
    </p>
  )
}

function StatCard({
  title,
  value,
  sub,
  accentColor = '#C9A84C',
}: {
  title: string
  value: string
  sub?: string
  accentColor?: string
}) {
  return (
    <div
      style={{
        ...CARD,
        padding: '22px 24px 24px',
        borderTop: `2px solid ${accentColor}`,
      }}
    >
      <CardLabel>{title}</CardLabel>
      <p
        style={{
          ...mono(40, { fontWeight: 700, color: '#fff', margin: '14px 0 0' }),
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </p>
      {sub && (
        <p style={{ font: '11px/1 inherit', color: '#484848', margin: '10px 0 0' }}>{sub}</p>
      )}
    </div>
  )
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '18px 24px', borderBottom: '1px solid #191B1E' }}>
      <CardLabel>{children}</CardLabel>
    </div>
  )
}

function BarRow({
  label,
  value,
  pct,
  labelColor,
  barColor,
}: {
  label: string
  labelColor: string
  value: string
  pct: number
  barColor: string
}) {
  return (
    <div
      className="admin-row"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '12px 24px',
        borderBottom: '1px solid #141618',
      }}
    >
      <div
        style={{
          flex: '0 0 160px',
          ...mono(11, { color: labelColor }),
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        title={label}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          height: 5,
          background: '#1A1C1F',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: barColor,
            borderRadius: 3,
          }}
        />
      </div>
      <div style={{ flex: '0 0 44px', textAlign: 'right', ...mono(11, { color: '#666' }) }}>
        {value}
      </div>
    </div>
  )
}

function TopPages({ pages }: { pages: AnalyticsData['topPages'] }) {
  const max = Math.max(...pages.map(p => p.pageviews), 1)
  return (
    <div style={CARD}>
      <SectionHeader>TOP PAGES</SectionHeader>
      {pages.length === 0 ? (
        <p style={{ padding: '24px', font: '13px/1.5 inherit', color: '#484848', margin: 0 }}>
          No data yet.
        </p>
      ) : (
        pages.map(p => (
          <BarRow
            key={p.requestPath}
            label={PAGE_LABELS[p.requestPath] ?? p.requestPath}
            labelColor="#C9A84C"
            value={fmt(p.pageviews)}
            pct={(p.pageviews / max) * 100}
            barColor="linear-gradient(90deg,#C9A84C,#E5C87A)"
          />
        ))
      )}
    </div>
  )
}

function Devices({ devices }: { devices: AnalyticsData['devices'] }) {
  const total = devices.reduce((s, d) => s + d.pageviews, 0) || 1
  return (
    <div style={CARD}>
      <SectionHeader>DEVICES</SectionHeader>
      {devices.length === 0 ? (
        <p style={{ padding: '24px', font: '13px/1.5 inherit', color: '#484848', margin: 0 }}>
          No data yet.
        </p>
      ) : (
        <div style={{ padding: '8px 0' }}>
          {devices.map(d => {
            const pct = Math.round((d.pageviews / total) * 100)
            return (
              <BarRow
                key={d.deviceType}
                label={d.deviceType.charAt(0).toUpperCase() + d.deviceType.slice(1)}
                labelColor="#909090"
                value={`${pct}%`}
                pct={pct}
                barColor="#C9A84C"
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

function DailyChart({ daily }: { daily: AnalyticsData['daily'] }) {
  const max = Math.max(...daily.map(d => d.pageviews), 1)
  return (
    <div style={CARD}>
      <SectionHeader>DAILY VIEWS</SectionHeader>
      <div
        style={{
          padding: '28px 24px 20px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 3,
          height: 196,
        }}
      >
        {daily.length === 0 ? (
          <p style={{ font: '13px/1.5 inherit', color: '#484848', margin: 0 }}>No data yet.</p>
        ) : (
          daily.map((d, i) => {
            const h = Math.max((d.pageviews / max) * 100, 2)
            const date = d.timestamp
              ? new Date(d.timestamp).toLocaleDateString('en-SG', {
                  month: 'short',
                  day: 'numeric',
                })
              : ''
            return (
              <div
                key={i}
                title={`${date}: ${d.pageviews.toLocaleString()} views`}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background: 'linear-gradient(180deg,#C9A84C 0%,rgba(201,168,76,.3) 100%)',
                  borderRadius: '3px 3px 0 0',
                  minWidth: 3,
                  transition: 'opacity .15s',
                }}
              />
            )
          })
        )}
      </div>
    </div>
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
    <div style={CARD}>
      <SectionHeader>EVENTS</SectionHeader>
      {events.length === 0 ? (
        <p style={{ padding: '24px', font: '13px/1.6 inherit', color: '#484848', margin: 0 }}>
          No events yet — appears once users interact with the site.
        </p>
      ) : (
        events.map(e => (
          <BarRow
            key={e.eventName}
            label={EVENT_LABELS[e.eventName] ?? e.eventName}
            labelColor="#909090"
            value={fmt(e.count)}
            pct={(e.count / max) * 100}
            barColor="linear-gradient(90deg,#3EC87A,#5EE89A)"
          />
        ))
      )}
    </div>
  )
}

function Referrers({ referrers }: { referrers: AnalyticsData['referrers'] }) {
  const max = Math.max(...referrers.map(r => r.pageviews), 1)
  return (
    <div style={CARD}>
      <SectionHeader>TOP REFERRERS</SectionHeader>
      {referrers.length === 0 ? (
        <p style={{ padding: '24px', font: '13px/1.5 inherit', color: '#484848', margin: 0 }}>
          No referrer data yet.
        </p>
      ) : (
        referrers.map(r => (
          <BarRow
            key={r.referrerHostname}
            label={r.referrerHostname}
            labelColor="#C9A84C"
            value={fmt(r.pageviews)}
            pct={(r.pageviews / max) * 100}
            barColor="linear-gradient(90deg,#C9A84C,#E5C87A)"
          />
        ))
      )}
    </div>
  )
}

function SetupGuide() {
  return (
    <div
      style={{
        ...CARD,
        padding: '56px 32px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          border: '1px solid #C9A84C',
          borderRadius: 10,
          display: 'grid',
          placeItems: 'center',
          margin: '0 auto 24px',
          color: '#C9A84C',
          fontSize: 18,
        }}
      >
        ⚙
      </div>
      <p style={mono(10, { letterSpacing: '.2em', color: '#555', margin: '0 0 14px' })}>
        ANALYTICS NOT CONFIGURED
      </p>
      <p style={{ font: '14px/1.7 inherit', color: '#555', margin: '0 0 32px', maxWidth: 440, marginInline: 'auto' }}>
        Add your Vercel credentials to see page views, visitor counts, top pages, and device
        breakdowns.
      </p>
      <div
        style={{
          display: 'inline-block',
          textAlign: 'left',
          background: '#0B0C0E',
          border: '1px solid #1C1E21',
          borderRadius: 8,
          padding: '22px 28px',
          ...mono(12, { color: '#888', lineHeight: 2.2 }),
        }}
      >
        <div><span style={{ color: '#444' }}># .env.local</span></div>
        <div><span style={{ color: '#C9A84C' }}>VA_TOKEN</span>=your_vercel_api_token</div>
        <div><span style={{ color: '#C9A84C' }}>VA_PROJECT_ID</span>=prj_xxxxxxxxxxxx</div>
        <div><span style={{ color: '#444' }}>VA_TEAM_ID</span>=<span style={{ color: '#444' }}>optional</span></div>
      </div>
      <p style={{ font: '11px/1.6 inherit', color: '#3A3A3A', margin: '20px 0 0' }}>
        API tokens: vercel.com/account/tokens &nbsp;·&nbsp; Project ID: project settings
      </p>
    </div>
  )
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>
}) {
  const { period = '30' } = await searchParams
  const days = Math.min(Math.max(Number(period) || 30, 7), 90)
  const data = await fetchAnalytics(days)

  const avgDaily = data ? Math.round(data.totals.pageviews / days) : 0

  return (
    <>
      <style>{`
        .admin-row:hover { background: rgba(255,255,255,.025); }
        .period-tab { transition: background .15s, color .15s; }
        .period-tab:hover { color: #C9A84C !important; }
        .signout-btn:hover { border-color: #383838 !important; color: #909090 !important; }
      `}</style>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 72px' }}>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            padding: '28px 0 28px',
            borderBottom: '1px solid #191B1E',
            marginBottom: 36,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 32,
                height: 32,
                border: '1px solid #C9A84C',
                borderRadius: 7,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <div style={{ width: 10, height: 10, background: '#C9A84C', borderRadius: 2 }} />
            </div>
            <div>
              <p style={mono(9, { letterSpacing: '.24em', color: '#484848', marginBottom: 6 })}>
                REBUILT ACADEMY
              </p>
              <h1 style={{ font: '700 18px/1 inherit', color: '#fff', margin: 0 }}>
                Analytics
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Period tabs */}
            <div
              style={{
                display: 'flex',
                background: '#111315',
                border: '1px solid #1C1E21',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              {(['7', '30', '90'] as const).map(p => (
                <a
                  key={p}
                  href={`/admin?period=${p}`}
                  className="period-tab"
                  style={{
                    padding: '10px 16px',
                    ...mono(10, { letterSpacing: '.1em' }),
                    color: days === Number(p) ? '#0B0C0E' : '#555',
                    background: days === Number(p) ? '#C9A84C' : 'transparent',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  {p}D
                </a>
              ))}
            </div>

            {/* Logout */}
            <form action={logoutAction}>
              <button
                type="submit"
                className="signout-btn"
                style={{
                  background: 'none',
                  border: '1px solid #222426',
                  borderRadius: 8,
                  padding: '10px 16px',
                  ...mono(10, { letterSpacing: '.1em', color: '#555' }),
                  cursor: 'pointer',
                  transition: 'border-color .15s, color .15s',
                }}
              >
                SIGN OUT
              </button>
            </form>
          </div>
        </div>

        {!data ? (
          <SetupGuide />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Stat cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: 14,
              }}
            >
              <StatCard
                title="PAGE VIEWS"
                value={fmt(data.totals.pageviews)}
                sub={`Last ${days} days`}
              />
              <StatCard
                title="UNIQUE VISITORS"
                value={fmt(data.totals.visitors)}
                sub={`Last ${days} days`}
              />
              <StatCard
                title="AVG DAILY VIEWS"
                value={fmt(avgDaily)}
                sub="Per day"
              />
              {data.topPages[0] && (
                <StatCard
                  title="TOP PAGE"
                  value={PAGE_LABELS[data.topPages[0].requestPath] ?? data.topPages[0].requestPath}
                  sub={`${fmt(data.topPages[0].pageviews)} views`}
                />
              )}
            </div>

            {/* Daily chart — full width */}
            <DailyChart daily={data.daily} />

            {/* Top pages */}
            <TopPages pages={data.topPages} />

            {/* Events + referrers */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 14,
              }}
            >
              <Events events={data.events} />
              <Referrers referrers={data.referrers} />
            </div>

            {/* Devices — full width at bottom */}
            <Devices devices={data.devices} />
          </div>
        )}
      </div>
    </>
  )
}
