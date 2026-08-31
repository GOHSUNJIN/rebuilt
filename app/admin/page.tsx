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

function card(style?: React.CSSProperties): React.CSSProperties {
  return {
    background: '#111315',
    border: '1px solid #1E2022',
    borderRadius: 8,
    ...style,
  }
}

function label(extra?: React.CSSProperties): React.CSSProperties {
  return {
    font: '9px/1 ui-monospace,Menlo,monospace',
    letterSpacing: '.2em',
    color: '#606060',
    margin: 0,
    ...extra,
  }
}

function StatCard({
  title,
  value,
  sub,
}: {
  title: string
  value: string
  sub?: string
}) {
  return (
    <div style={{ ...card(), padding: '20px 24px' }}>
      <p style={label({ marginBottom: 14 })}>{title}</p>
      <p
        style={{
          font: '700 30px/1 ui-monospace,Menlo,monospace',
          color: '#fff',
          margin: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </p>
      {sub && (
        <p style={{ font: '11px/1 inherit', color: '#505050', margin: '8px 0 0' }}>{sub}</p>
      )}
    </div>
  )
}

function TopPages({ pages }: { pages: AnalyticsData['topPages'] }) {
  const max = Math.max(...pages.map(p => p.pageviews), 1)
  return (
    <div style={card({ overflow: 'hidden' })}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #1A1C1E' }}>
        <p style={label()}>TOP PAGES</p>
      </div>
      {pages.length === 0 ? (
        <p style={{ padding: 24, font: '13px/1.5 inherit', color: '#505050', margin: 0 }}>
          No data yet.
        </p>
      ) : (
        pages.map(p => (
          <div
            key={p.requestPath}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '11px 24px',
              borderBottom: '1px solid #141618',
            }}
          >
            <div
              style={{
                flex: '0 0 150px',
                font: '11px/1 ui-monospace,Menlo,monospace',
                color: '#C9A84C',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={p.requestPath}
            >
              {PAGE_LABELS[p.requestPath] ?? p.requestPath}
            </div>
            <div
              style={{ flex: 1, height: 3, background: '#1A1C1E', borderRadius: 2, overflow: 'hidden' }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${(p.pageviews / max) * 100}%`,
                  background: 'linear-gradient(90deg,#C9A84C,#E5C87A)',
                  borderRadius: 2,
                }}
              />
            </div>
            <div
              style={{
                flex: '0 0 52px',
                textAlign: 'right',
                font: '11px/1 ui-monospace,Menlo,monospace',
                color: '#909090',
              }}
            >
              {fmt(p.pageviews)}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

function Devices({ devices }: { devices: AnalyticsData['devices'] }) {
  const total = devices.reduce((s, d) => s + d.pageviews, 0) || 1
  return (
    <div style={card({ overflow: 'hidden' })}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #1A1C1E' }}>
        <p style={label()}>DEVICES</p>
      </div>
      {devices.length === 0 ? (
        <p style={{ padding: 24, font: '13px/1.5 inherit', color: '#505050', margin: 0 }}>
          No data yet.
        </p>
      ) : (
        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {devices.map(d => {
            const pct = Math.round((d.pageviews / total) * 100)
            return (
              <div key={d.deviceType} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    flex: '0 0 80px',
                    font: '11px/1 inherit',
                    color: '#909090',
                    textTransform: 'capitalize',
                  }}
                >
                  {d.deviceType}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 3,
                    background: '#1A1C1E',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: '#C9A84C',
                      borderRadius: 2,
                    }}
                  />
                </div>
                <div
                  style={{
                    flex: '0 0 36px',
                    textAlign: 'right',
                    font: '11px/1 ui-monospace,Menlo,monospace',
                    color: '#606060',
                  }}
                >
                  {pct}%
                </div>
              </div>
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
    <div style={card({ overflow: 'hidden' })}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #1A1C1E' }}>
        <p style={label()}>DAILY VIEWS</p>
      </div>
      <div
        style={{
          padding: '24px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 3,
          height: 96,
        }}
      >
        {daily.length === 0 ? (
          <p style={{ font: '13px/1.5 inherit', color: '#505050', margin: 0 }}>No data yet.</p>
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
                  background: '#C9A84C',
                  opacity: 0.75,
                  borderRadius: '2px 2px 0 0',
                  minWidth: 3,
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
    <div style={card({ overflow: 'hidden' })}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #1A1C1E' }}>
        <p style={label()}>EVENTS</p>
      </div>
      {events.length === 0 ? (
        <p style={{ padding: 24, font: '13px/1.5 inherit', color: '#505050', margin: 0 }}>
          No events yet — they appear once users interact with the site.
        </p>
      ) : (
        events.map(e => (
          <div
            key={e.eventName}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '11px 24px',
              borderBottom: '1px solid #141618',
            }}
          >
            <div
              style={{
                flex: '0 0 180px',
                font: '11px/1 inherit',
                color: '#909090',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {EVENT_LABELS[e.eventName] ?? e.eventName}
            </div>
            <div style={{ flex: 1, height: 3, background: '#1A1C1E', borderRadius: 2, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${(e.count / max) * 100}%`,
                  background: 'linear-gradient(90deg,#3EC87A,#5EE89A)',
                  borderRadius: 2,
                }}
              />
            </div>
            <div
              style={{
                flex: '0 0 40px',
                textAlign: 'right',
                font: '11px/1 ui-monospace,Menlo,monospace',
                color: '#909090',
              }}
            >
              {fmt(e.count)}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

function Referrers({ referrers }: { referrers: AnalyticsData['referrers'] }) {
  const max = Math.max(...referrers.map(r => r.pageviews), 1)
  return (
    <div style={card({ overflow: 'hidden' })}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #1A1C1E' }}>
        <p style={label()}>TOP REFERRERS</p>
      </div>
      {referrers.length === 0 ? (
        <p style={{ padding: 24, font: '13px/1.5 inherit', color: '#505050', margin: 0 }}>
          No referrer data yet.
        </p>
      ) : (
        referrers.map(r => (
          <div
            key={r.referrerHostname}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '11px 24px',
              borderBottom: '1px solid #141618',
            }}
          >
            <div
              style={{
                flex: '0 0 180px',
                font: '11px/1 ui-monospace,Menlo,monospace',
                color: '#C9A84C',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {r.referrerHostname}
            </div>
            <div style={{ flex: 1, height: 3, background: '#1A1C1E', borderRadius: 2, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${(r.pageviews / max) * 100}%`,
                  background: 'linear-gradient(90deg,#C9A84C,#E5C87A)',
                  borderRadius: 2,
                }}
              />
            </div>
            <div
              style={{
                flex: '0 0 40px',
                textAlign: 'right',
                font: '11px/1 ui-monospace,Menlo,monospace',
                color: '#909090',
              }}
            >
              {fmt(r.pageviews)}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

function SetupGuide() {
  return (
    <div
      style={{
        ...card(),
        padding: '48px 32px',
        textAlign: 'center',
      }}
    >
      <p style={label({ marginBottom: 16 })}>ANALYTICS NOT CONFIGURED</p>
      <p style={{ font: '14px/1.6 inherit', color: '#606060', margin: '0 0 28px', maxWidth: 440, marginInline: 'auto' }}>
        Add your Vercel credentials to see page views, visitor counts, top pages, and device
        breakdowns.
      </p>
      <div
        style={{
          display: 'inline-block',
          textAlign: 'left',
          background: '#0B0C0E',
          border: '1px solid #1E2022',
          borderRadius: 6,
          padding: '20px 24px',
          font: '12px/2 ui-monospace,Menlo,monospace',
          color: '#909090',
        }}
      >
        <div>
          <span style={{ color: '#505050' }}># .env.local</span>
        </div>
        <div>
          <span style={{ color: '#C9A84C' }}>ADMIN_USERNAME</span>=your_username
        </div>
        <div>
          <span style={{ color: '#C9A84C' }}>ADMIN_PASSWORD</span>=your_password
        </div>
        <div>
          <span style={{ color: '#C9A84C' }}>ADMIN_SECRET</span>=random_32char_string
        </div>
        <div style={{ marginTop: 8 }}>
          <span style={{ color: '#C9A84C' }}>VA_TOKEN</span>=your_vercel_api_token
        </div>
        <div>
          <span style={{ color: '#C9A84C' }}>VA_PROJECT_ID</span>=prj_xxxxxxxxxxxx
        </div>
        <div>
          <span style={{ color: '#505050' }}>VA_TEAM_ID</span>=
          <span style={{ color: '#505050' }}>optional_team_id</span>
        </div>
      </div>
      <p style={{ font: '11px/1.5 inherit', color: '#404040', margin: '20px 0 0' }}>
        API tokens: vercel.com/account/tokens &nbsp;·&nbsp; Project ID: vercel.com/dashboard → project settings
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
    <div style={{ maxWidth: 1040, margin: '0 auto', padding: '36px 24px 64px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 40,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <p style={label({ marginBottom: 10, letterSpacing: '.28em' })}>REBUILT ACADEMY</p>
          <h1 style={{ font: '700 22px/1.1 inherit', color: '#fff', margin: 0 }}>Analytics</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Period tabs */}
          <div
            style={{
              display: 'flex',
              background: '#111315',
              border: '1px solid #1E2022',
              borderRadius: 6,
              overflow: 'hidden',
            }}
          >
            {(['7', '30', '90'] as const).map(p => (
              <a
                key={p}
                href={`/admin?period=${p}`}
                style={{
                  padding: '9px 14px',
                  font: '10px/1 ui-monospace,Menlo,monospace',
                  letterSpacing: '.12em',
                  color: days === Number(p) ? '#0B0C0E' : '#606060',
                  background: days === Number(p) ? '#C9A84C' : 'transparent',
                  textDecoration: 'none',
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
              style={{
                background: 'none',
                border: '1px solid #252729',
                borderRadius: 6,
                padding: '9px 14px',
                font: '10px/1 ui-monospace,Menlo,monospace',
                letterSpacing: '.12em',
                color: '#606060',
                cursor: 'pointer',
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Stat cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 16,
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
            <StatCard title="AVG DAILY VIEWS" value={fmt(avgDaily)} sub="Per day" />
            {data.topPages[0] && (
              <StatCard
                title="TOP PAGE"
                value={PAGE_LABELS[data.topPages[0].requestPath] ?? data.topPages[0].requestPath}
                sub={`${fmt(data.topPages[0].pageviews)} views`}
              />
            )}
          </div>

          {/* Top pages */}
          <TopPages pages={data.topPages} />

          {/* Devices + chart */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(200px, 1fr) 2fr',
              gap: 16,
            }}
          >
            <Devices devices={data.devices} />
            <DailyChart daily={data.daily} />
          </div>

          {/* Events + referrers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}
          >
            <Events events={data.events} />
            <Referrers referrers={data.referrers} />
          </div>
        </div>
      )}
    </div>
  )
}
