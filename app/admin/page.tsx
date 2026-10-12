import { Suspense } from 'react'
import { after } from 'next/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { logoutAction } from '@/app/actions/admin'
import { isAnalyticsConfigured, fetchCritical, fetchSecondary } from '@/lib/analytics'
import type { CriticalData, SecondaryData, DailyStat, DOWStat } from '@/lib/analytics'
import RefreshButton from './_components/RefreshButton'
import DateRangePicker from './_components/DateRangePicker'
import TrafficChart from './_components/TrafficChart'

// ─── icons ─────────────────────────────────────────────────────────────────────

const Ic = {
  eye:      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" width="13" height="13"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/><circle cx="8" cy="8" r="2"/></svg>,
  users:    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" width="13" height="13"><path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM2 14v-1a6 6 0 0 1 12 0v1"/></svg>,
  trending: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" width="13" height="13"><polyline points="1 11 5 7 8 10 11 6 15 6"/><polyline points="11 6 15 6 15 10"/></svg>,
  target:   <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" width="13" height="13"><circle cx="8" cy="8" r="7"/><circle cx="8" cy="8" r="3"/><line x1="8" y1="1" x2="8" y2="4"/><line x1="8" y1="12" x2="8" y2="15"/><line x1="1" y1="8" x2="4" y2="8"/><line x1="12" y1="8" x2="15" y2="8"/></svg>,
  activity: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" width="12" height="12"><polyline points="1 8 4 8 6 3 9 13 11 8 15 8"/></svg>,
  file:     <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" width="12" height="12"><path d="M9 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6L9 2z"/><polyline points="9 2 9 6 13 6"/><line x1="5" y1="9" x2="11" y2="9"/><line x1="5" y1="11" x2="9" y2="11"/></svg>,
  globe:    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" width="12" height="12"><circle cx="8" cy="8" r="7"/><path d="M1 8h14M8 1c-2 2-3 4.5-3 7s1 5 3 7M8 1c2 2 3 4.5 3 7s-1 5-3 7"/></svg>,
  monitor:  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" width="12" height="12"><rect x="1" y="2" width="14" height="10" rx="1"/><path d="M5 15h6M8 12v3"/></svg>,
}

// ─── helpers ──────────────────────────────────────────────────────────────────

const PAGE_LABELS: Record<string, string> = {
  '/': 'Home', '/rehab': 'Rehab', '/strength': 'Training',
  '/performance': 'Performance', '/physio': 'Physio',
  '/about': 'About', '/book': 'Book', '/faq': 'FAQ',
}

const EVENT_LABELS: Record<string, string> = {
  book_cta_click:    'Book CTA',
  whatsapp_click:    'WhatsApp',
  mobile_book_click: 'Mobile book',
  mobile_call_click: 'Mobile call',
  contact_submit:    'Contact form',
  booking_complete:  'Booking done',
  faq_open:          'FAQ open',
  faq_tab:           'FAQ tab',
}

function fmt(n: number) {
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

// ─── tooltip ──────────────────────────────────────────────────────────────────

function Tip({ text }: { text: string }) {
  return (
    <span className="admin-tip">
      <svg className="admin-tip-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" aria-hidden="true">
        <circle cx="8" cy="8" r="7"/>
        <path d="M6.5 6.5a1.75 1.75 0 0 1 3.5 0c0 1.4-1.75 1.75-1.75 3"/>
        <circle cx="8" cy="12.5" r=".5" fill="currentColor" stroke="none"/>
      </svg>
      <span className="admin-tip-box">{text}</span>
    </span>
  )
}

// ─── layout primitives ─────────────────────────────────────────────────────────

const P = '40px'

function SecHead({ icon, label, tip }: { icon: React.ReactNode; label: string; tip?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: `14px ${P}`, borderBottom: '1px solid #222' }}>
      <span style={{ color: '#888', display: 'flex', alignItems: 'center' }}>{icon}</span>
      <span style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#C0C0C0', letterSpacing: '.2em' }}>{label}</span>
      {tip && <Tip text={tip} />}
    </div>
  )
}

function BarRow({ label, value, pct, barColor, mono }: {
  label: string; value: string; pct: number; barColor: string; mono?: boolean
}) {
  return (
    <div className="admin-bar-row" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: `11px ${P}`, borderBottom: '1px solid #222' }}>
      <div
        className="admin-bar-label"
        style={{ flex: '0 0 150px', fontSize: 12.5, color: mono ? 'var(--accent)' : '#C0C0C0', font: mono ? '12px/1 ui-monospace,Menlo,monospace' : undefined, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        title={label}
      >
        {label}
      </div>
      <div className="admin-bar-track" style={{ flex: 1, height: 3, background: '#333', borderRadius: 2 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: barColor, borderRadius: 2 }} />
      </div>
      <div className="admin-bar-value" style={{ flex: '0 0 44px', textAlign: 'right', font: '11px/1 ui-monospace,Menlo,monospace', color: '#C0C0C0' }}>
        {value}
      </div>
    </div>
  )
}

// ─── stat card ─────────────────────────────────────────────────────────────────

function StatCard({ icon, title, value, sub, tip }: {
  icon: React.ReactNode; title: string; value: string; sub?: string; tip?: string
}) {
  return (
    <div className="admin-stat-card" style={{ background: '#111', padding: '24px 28px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 20, right: 20, color: '#484848' }}>{icon}</div>
      <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#A0A0A0', letterSpacing: '.2em', margin: 0, display: 'flex', alignItems: 'center' }}>
        {title}{tip && <Tip text={tip} />}
      </p>
      <p
        className="gradient-gold admin-stat-num"
        style={{ fontSize: 40, fontWeight: 800, lineHeight: 1, letterSpacing: '-.04em', margin: '14px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        {value}
      </p>
      {sub && <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#909090', margin: '10px 0 0', letterSpacing: '.12em' }}>{sub}</p>}
    </div>
  )
}

// ─── period tabs ───────────────────────────────────────────────────────────────

const PERIOD_TABS = [
  { value: '1',      label: 'TODAY' },
  { value: '7',      label: '7D' },
  { value: '30',     label: '30D' },
  { value: '90',     label: '90D' },
  { value: 'custom', label: 'RANGE' },
]

function AdminHeader({ activePeriod }: { activePeriod: string }) {
  return (
    <header
      className="admin-header"
      style={{
        height: 58,
        borderBottom: '1px solid #2A2A2A',
        background: 'rgba(10,10,10,.98)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: `0 ${P}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', flexShrink: 0 }}>
        <Image src="/rebuilt-mark.svg" alt="Rebuilt" width={28} height={28} style={{ display: 'block' }} />
        <div className="admin-wordmark">
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.28em', color: '#FFFFFF', lineHeight: 1 }}>REBUILT ACADEMY</div>
          <div style={{ marginTop: 3, font: '8px/1 ui-monospace,Menlo,monospace', letterSpacing: '.22em', color: 'var(--accent)' }}>ANALYTICS</div>
        </div>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', border: '1px solid #2A2A2A' }}>
          {PERIOD_TABS.map(({ value, label }, idx) => {
            const active = activePeriod === value
            return (
              <Link
                key={value}
                href={`/admin?p=${value}`}
                className="admin-period-btn"
                data-active={active || undefined}
                style={{
                  display: 'block',
                  padding: '8px 14px',
                  font: '10px/1 ui-monospace,Menlo,monospace',
                  letterSpacing: '.14em',
                  background: active ? 'var(--accent)' : 'transparent',
                  color: active ? '#0B0B0B' : '#A0A0A0',
                  fontWeight: active ? 700 : 400,
                  textDecoration: 'none',
                  borderRight: idx < PERIOD_TABS.length - 1 ? '1px solid #2A2A2A' : 'none',
                  transition: 'background .12s, color .12s',
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>
        <div className="admin-refresh-hide"><RefreshButton /></div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="btn-outline admin-signout-btn"
            style={{ padding: '12px 14px', fontSize: 10, letterSpacing: '.14em', lineHeight: 1 }}
          >
            SIGN OUT
          </button>
        </form>
      </div>
    </header>
  )
}

// ─── skeletons ─────────────────────────────────────────────────────────────────

const SH: React.CSSProperties = {
  borderRadius: 1,
  backgroundImage: 'linear-gradient(90deg,transparent 0%,rgba(255,255,255,.04) 50%,transparent 100%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.6s linear infinite',
}

function bar(w: string | number, h = 10, op = 0.05) {
  return <div style={{ width: w, height: h, background: `rgba(255,255,255,${op})`, ...SH }} />
}

function CriticalSkeleton() {
  return (
    <>
      <section style={{ borderBottom: '1px solid #222' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: '#222' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ background: '#111', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {bar('52%', 8, 0.06)}
              {bar('38%', 36, 0.04)}
              {bar('44%', 7, 0.03)}
            </div>
          ))}
        </div>
      </section>
      <div style={{ padding: `24px ${P} 20px`, borderBottom: '1px solid #222' }}>
        {bar(100, 8, 0.05)}
        <div style={{ marginTop: 20, height: 120, display: 'flex', alignItems: 'flex-end', gap: 2 }}>
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} style={{ flex: 1, height: `${15 + (i * 17 + 11) % 70}%`, background: 'rgba(183,240,0,0.04)', borderRadius: '1px 1px 0 0' }} />
          ))}
        </div>
      </div>
    </>
  )
}

function SecondarySkeleton() {
  return (
    <section style={{ borderBottom: '1px solid #222' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: `11px ${P}`, borderBottom: '1px solid #222' }}>
          {bar('18%', 9, 0.05)}
          <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 1 }} />
          {bar(36, 9, 0.03)}
        </div>
      ))}
    </section>
  )
}

// ─── critical section ──────────────────────────────────────────────────────────

async function CriticalSection({
  since, until, rangeDays, rangeLabel,
}: {
  since: string; until: string; rangeDays: number; rangeLabel: string
}) {
  const { totals, daily, events }: CriticalData = await fetchCritical(since, until)

  const avgDaily = Math.round(totals.pageviews / rangeDays)
  const bookings = events.find(e => e.eventName === 'booking_complete')?.count ?? 0
  const convRate = totals.visitors > 0 ? `${((bookings / totals.visitors) * 100).toFixed(1)}%` : '--'
  const maxEv    = Math.max(...events.map(e => e.count), 1)
  const dow      = computeDOW(daily)

  return (
    <>
      <section style={{ borderBottom: '1px solid #222' }}>
        <div className="r4 admin-stat-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: '#222' }}>
          <StatCard icon={Ic.eye}      title="PAGE VIEWS"      value={fmt(totals.pageviews)} sub={rangeLabel}             tip="Total pages loaded by all visitors. Refreshing counts as another view." />
          <StatCard icon={Ic.users}    title="UNIQUE VISITORS" value={fmt(totals.visitors)}  sub={rangeLabel}             tip="Estimated distinct people based on device and browser fingerprint." />
          <StatCard icon={Ic.trending} title="AVG DAILY VIEWS" value={fmt(avgDaily)}         sub="PER DAY"                tip="Total page views divided by the number of days in the selected period." />
          <StatCard icon={Ic.target}   title="BOOKING RATE"    value={convRate}              sub={`${bookings} BOOKINGS`} tip="Bookings completed divided by unique visitors. A rough conversion metric." />
        </div>
      </section>

      <TrafficChart daily={daily} dow={dow} />

      <section style={{ borderBottom: '1px solid #222' }}>
        <SecHead icon={Ic.activity} label="EVENTS" tip="Tracked user interactions: WhatsApp clicks, Book CTA clicks, contact form submissions, FAQ opens, and bookings completed." />
        {events.length === 0 ? (
          <p style={{ padding: `16px ${P}`, fontSize: 13, color: '#909090', margin: 0 }}>No events yet.</p>
        ) : (
          <div className="admin-rows-scroll">
            {events.map(e => (
              <BarRow key={e.eventName} label={EVENT_LABELS[e.eventName] ?? e.eventName} value={fmt(e.count)} pct={(e.count / maxEv) * 100} barColor="#4ade80" />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

// ─── secondary section ─────────────────────────────────────────────────────────

async function SecondarySection({ since, until }: { since: string; until: string }) {
  const { topPages, devices, referrers }: SecondaryData = await fetchSecondary(since, until)

  const maxPg  = Math.max(...topPages.map(p => p.pageviews), 1)
  const totDev = devices.reduce((s, d) => s + d.pageviews, 0) || 1
  const maxRef = Math.max(...referrers.map(r => r.pageviews), 1)

  return (
    <>
      <section style={{ borderBottom: '1px solid #222' }}>
        <SecHead icon={Ic.file} label="TOP PAGES" tip="Pages with the most views in the period, ranked by traffic." />
        {topPages.length === 0 ? (
          <p style={{ padding: `16px ${P}`, fontSize: 13, color: '#909090', margin: 0 }}>No data yet.</p>
        ) : (
          <div className="admin-rows-scroll">
            {topPages.map(p => {
              const label = PAGE_LABELS[p.requestPath] ?? p.requestPath
              return (
                <div key={p.requestPath} className="admin-bar-row" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: `11px ${P}`, borderBottom: '1px solid #222' }}>
                  <div className="admin-bar-label" style={{ flex: '0 0 150px', font: '12px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={p.requestPath}>
                    {label}
                  </div>
                  <div className="admin-bar-track" style={{ flex: 1, height: 3, background: '#333', borderRadius: 2 }}>
                    <div style={{ height: '100%', width: `${(p.pageviews / maxPg) * 100}%`, background: 'var(--accent)', borderRadius: 2 }} />
                  </div>
                  <div className="admin-bar-value" style={{ flex: '0 0 44px', textAlign: 'right' }}>
                    <span style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#C0C0C0' }}>{fmt(p.pageviews)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <section style={{ borderBottom: '1px solid #222' }}>
        <div className="r2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#222' }}>
          <div style={{ background: '#0B0B0B' }}>
            <SecHead icon={Ic.globe} label="TOP REFERRERS" tip="External sites and sources that sent visitors here. Direct traffic and search engines typically lead." />
            {referrers.length === 0 ? (
              <p style={{ padding: `16px ${P}`, fontSize: 13, color: '#909090', margin: 0 }}>No data yet.</p>
            ) : (
              <div className="admin-rows-scroll">
                {referrers.map(r => (
                  <BarRow key={r.referrerHostname} label={r.referrerHostname} value={fmt(r.pageviews)} pct={(r.pageviews / maxRef) * 100} barColor="var(--accent)" mono />
                ))}
              </div>
            )}
          </div>
          <div style={{ background: '#111' }}>
            <SecHead icon={Ic.monitor} label="DEVICES" tip="Traffic split by device type: mobile, desktop, or tablet." />
            {devices.length === 0 ? (
              <p style={{ padding: `16px ${P}`, fontSize: 13, color: '#909090', margin: 0 }}>No data yet.</p>
            ) : (
              devices.map(d => {
                const pct = Math.round((d.pageviews / totDev) * 100)
                return <BarRow key={d.deviceType} label={d.deviceType.charAt(0).toUpperCase() + d.deviceType.slice(1)} value={`${pct}%`} pct={pct} barColor="var(--accent)" />
              })
            )}
          </div>
        </div>
      </section>
    </>
  )
}

// ─── setup guide ───────────────────────────────────────────────────────────────

function SetupGuide() {
  return (
    <div style={{ borderTop: '1px solid #222' }}>
      <div style={{ padding: `64px ${P}`, maxWidth: 560 }}>
        <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', letterSpacing: '.28em', color: 'var(--accent)', margin: '0 0 20px' }}>NOT CONFIGURED</p>
        <h2 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1, letterSpacing: '-.03em', margin: '0 0 16px' }}>Set up analytics.</h2>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: '#A0A0A0', margin: '0 0 32px' }}>
          Add Vercel credentials to see traffic data.
        </p>
        <div style={{ background: '#111', border: '1px solid #2A2A2A', padding: '20px 24px', font: '12px/2.2 ui-monospace,Menlo,monospace', color: '#909090' }}>
          <div><span style={{ color: 'var(--accent)' }}>VA_TOKEN</span>=your_vercel_api_token</div>
          <div><span style={{ color: 'var(--accent)' }}>VA_PROJECT_ID</span>=prj_xxxxxxxxxxxx</div>
          <div>VA_TEAM_ID=optional</div>
        </div>
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
  await cookies()

  const { p, since: sinceParam, until: untilParam } = await searchParams

  const isCustom = p === 'custom'
  const days     = isCustom ? null : Math.min(Math.max(Number(p) || 30, 1), 90)

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
    : isCustom
    ? 'CUSTOM RANGE'
    : days === 1
    ? 'TODAY'
    : `LAST ${days}D`

  // Pre-warm the cache for other standard periods after responding,
  // so switching to them is fast (hits Next.js Data Cache instead of live API)
  if (isAnalyticsConfigured() && !isCustom) {
    after(async () => {
      const now = Date.now()
      const others = ([1, 7, 30, 90] as const).filter(d => String(d) !== activePeriod)
      await Promise.all(others.flatMap(d => {
        const s = roundToHour(now - d * 86_400_000)
        const u = roundToHour(now)
        return [fetchCritical(s, u), fetchSecondary(s, u)]
      }))
    })
  }

  return (
    <>
      <AdminHeader activePeriod={activePeriod} />

      {isCustom && (
        <div style={{ padding: `20px ${P}`, borderBottom: '1px solid #222', background: '#0A0A0A', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.2em', flexShrink: 0 }}>RANGE</span>
          <DateRangePicker currentSince={sinceParam} currentUntil={untilParam} />
          {sinceParam && untilParam && (
            <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.1em' }}>
              {rangeDays}d selected
            </span>
          )}
        </div>
      )}

      {!isAnalyticsConfigured() ? (
        <SetupGuide />
      ) : (
        <>
          <Suspense fallback={<CriticalSkeleton />}>
            <CriticalSection since={since} until={until} rangeDays={rangeDays} rangeLabel={rangeLabel} />
          </Suspense>
          <Suspense fallback={<SecondarySkeleton />}>
            <SecondarySection since={since} until={until} />
          </Suspense>
        </>
      )}

      <div style={{ height: 48 }} />
    </>
  )
}
