const BASE = 'https://api.vercel.com'

function authHeaders() {
  return {
    Authorization: `Bearer ${process.env.VA_TOKEN}`,
    'Content-Type': 'application/json',
  }
}

function buildParams(since: string, until: string, extra: Record<string, string> = {}): URLSearchParams {
  const p = new URLSearchParams({ projectId: process.env.VA_PROJECT_ID ?? '', since, until, ...extra })
  if (process.env.VA_TEAM_ID) p.set('teamId', process.env.VA_TEAM_ID)
  return p
}

async function vercelGet(path: string, params: URLSearchParams) {
  const url = `${BASE}${path}?${params}`
  console.log(`[analytics] GET ${path} projectId=${params.get('projectId')} since=${params.get('since')} until=${params.get('until')}`)
  const res = await fetch(url, {
    headers: authHeaders(),
    next: { revalidate: 300 },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error(`[analytics] ${res.status} ${res.statusText} — ${path}`, body)
    return null
  }
  const json = await res.json() as { data: unknown }
  const rows = Array.isArray(json?.data) ? json.data.length : '(non-array)'
  console.log(`[analytics] OK ${path} — ${rows} rows`)
  return json
}

export function isAnalyticsConfigured(): boolean {
  const ok = !!(process.env.VA_TOKEN && process.env.VA_PROJECT_ID)
  if (!ok) console.warn('[analytics] VA_TOKEN or VA_PROJECT_ID is missing')
  else console.log(`[analytics] configured — project=${process.env.VA_PROJECT_ID?.slice(0, 12)}…`)
  return ok
}

type Row = Record<string, unknown>

export interface AnalyticsTotals { pageviews: number; visitors: number }
export interface TopPage        { requestPath: string; pageviews: number; visitors: number }
export interface DeviceStat     { deviceType: string; pageviews: number }
export interface DailyStat      { timestamp: string; pageviews: number; visitors: number }
export interface DOWStat        { day: string; pageviews: number; visitors: number }
export interface EventStat      { eventName: string; count: number }
export interface ReferrerStat   { referrerHostname: string; pageviews: number }

export interface CriticalData {
  totals: AnalyticsTotals
  daily: DailyStat[]
  events: EventStat[]
}

export interface SecondaryData {
  topPages: TopPage[]
  devices: DeviceStat[]
  referrers: ReferrerStat[]
}

// First render wave: totals + daily chart + events (3 parallel calls)
export async function fetchCritical(since: string, until: string): Promise<CriticalData> {
  const [totalsJson, dailyJson, eventsJson] = await Promise.all([
    vercelGet('/v1/query/web-analytics/visits/count', buildParams(since, until)),
    vercelGet('/v1/query/web-analytics/visits/aggregate', buildParams(since, until, { by: JSON.stringify(['day']), limit: '366' })),
    vercelGet('/v1/query/web-analytics/events/aggregate', buildParams(since, until, { by: JSON.stringify(['eventName']), limit: '20' })),
  ])

  const td = totalsJson?.data as { pageviews?: number; visitors?: number } | null

  return {
    totals: { pageviews: td?.pageviews ?? 0, visitors: td?.visitors ?? 0 },
    daily: ((dailyJson?.data ?? []) as Row[])
      .map(r => ({ timestamp: String(r.timestamp ?? ''), pageviews: Number(r.pageviews ?? 0), visitors: Number(r.visitors ?? 0) }))
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp)),
    events: ((eventsJson?.data ?? []) as Row[])
      .map(r => ({ eventName: String(r.eventName ?? ''), count: Number(r.count ?? r.events ?? r.pageviews ?? 0) }))
      .filter(e => e.eventName)
      .sort((a, b) => b.count - a.count),
  }
}

// Second render wave: pages + devices + referrers (3 parallel calls)
export async function fetchSecondary(since: string, until: string): Promise<SecondaryData> {
  const [pagesJson, devicesJson, referrersJson] = await Promise.all([
    vercelGet('/v1/query/web-analytics/visits/aggregate', buildParams(since, until, { by: JSON.stringify(['requestPath']), limit: '10' })),
    vercelGet('/v1/query/web-analytics/visits/aggregate', buildParams(since, until, { by: JSON.stringify(['deviceType']) })),
    vercelGet('/v1/query/web-analytics/visits/aggregate', buildParams(since, until, { by: JSON.stringify(['referrerHostname']), limit: '8' })),
  ])

  return {
    topPages: ((pagesJson?.data ?? []) as Row[])
      .map(r => ({ requestPath: String(r.requestPath ?? '/'), pageviews: Number(r.pageviews ?? 0), visitors: Number(r.visitors ?? 0) }))
      .sort((a, b) => b.pageviews - a.pageviews),
    devices: ((devicesJson?.data ?? []) as Row[])
      .map(r => ({ deviceType: String(r.deviceType ?? 'unknown'), pageviews: Number(r.pageviews ?? 0) }))
      .sort((a, b) => b.pageviews - a.pageviews),
    referrers: ((referrersJson?.data ?? []) as Row[])
      .map(r => ({ referrerHostname: String(r.referrerHostname ?? ''), pageviews: Number(r.pageviews ?? 0) }))
      .filter(r => r.referrerHostname)
      .sort((a, b) => b.pageviews - a.pageviews),
  }
}
