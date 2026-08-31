const BASE = 'https://api.vercel.com'

function authHeaders() {
  return {
    Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  }
}

function buildParams(days: number, extra: Record<string, string> = {}): URLSearchParams {
  const since = new Date(Date.now() - days * 86_400_000).toISOString()
  const until = new Date().toISOString()
  const p = new URLSearchParams({
    projectId: process.env.VERCEL_PROJECT_ID ?? '',
    since,
    until,
    ...extra,
  })
  if (process.env.VERCEL_TEAM_ID) p.set('teamId', process.env.VERCEL_TEAM_ID)
  return p
}

async function vercelGet(path: string, params: URLSearchParams) {
  const res = await fetch(`${BASE}${path}?${params}`, {
    headers: authHeaders(),
    next: { revalidate: 300 },
  })
  if (!res.ok) return null
  return res.json() as Promise<{ data: unknown }>
}

export interface AnalyticsTotals {
  pageviews: number
  visitors: number
}

export interface TopPage {
  requestPath: string
  pageviews: number
  visitors: number
}

export interface DeviceStat {
  deviceType: string
  pageviews: number
}

export interface DailyStat {
  timestamp: string
  pageviews: number
  visitors: number
}

export interface EventStat {
  eventName: string
  count: number
}

export interface ReferrerStat {
  referrerHostname: string
  pageviews: number
}

export interface AnalyticsData {
  totals: AnalyticsTotals
  topPages: TopPage[]
  devices: DeviceStat[]
  daily: DailyStat[]
  events: EventStat[]
  referrers: ReferrerStat[]
}

type Row = Record<string, unknown>

export async function fetchAnalytics(days = 30): Promise<AnalyticsData | null> {
  if (!process.env.VERCEL_ACCESS_TOKEN || !process.env.VERCEL_PROJECT_ID) return null

  const [totalsJson, pagesJson, devicesJson, dailyJson, eventsJson, referrersJson] = await Promise.all([
    vercelGet('/v1/query/web-analytics/visits/count', buildParams(days)),
    vercelGet(
      '/v1/query/web-analytics/visits/aggregate',
      buildParams(days, { by: JSON.stringify(['requestPath']), limit: '10' }),
    ),
    vercelGet(
      '/v1/query/web-analytics/visits/aggregate',
      buildParams(days, { by: JSON.stringify(['deviceType']) }),
    ),
    vercelGet(
      '/v1/query/web-analytics/visits/aggregate',
      buildParams(days, { by: JSON.stringify(['day']), limit: '31' }),
    ),
    vercelGet(
      '/v1/query/web-analytics/events/aggregate',
      buildParams(days, { by: JSON.stringify(['eventName']), limit: '10' }),
    ),
    vercelGet(
      '/v1/query/web-analytics/visits/aggregate',
      buildParams(days, { by: JSON.stringify(['referrerHostname']), limit: '8' }),
    ),
  ])

  if (!totalsJson) return null

  const td = totalsJson.data as { pageviews?: number; visitors?: number } | null

  return {
    totals: {
      pageviews: td?.pageviews ?? 0,
      visitors: td?.visitors ?? 0,
    },
    topPages: ((pagesJson?.data ?? []) as Row[])
      .map(r => ({
        requestPath: String(r.requestPath ?? '/'),
        pageviews: Number(r.pageviews ?? 0),
        visitors: Number(r.visitors ?? 0),
      }))
      .sort((a, b) => b.pageviews - a.pageviews),
    devices: ((devicesJson?.data ?? []) as Row[])
      .map(r => ({
        deviceType: String(r.deviceType ?? 'unknown'),
        pageviews: Number(r.pageviews ?? 0),
      }))
      .sort((a, b) => b.pageviews - a.pageviews),
    daily: ((dailyJson?.data ?? []) as Row[])
      .map(r => ({
        timestamp: String(r.timestamp ?? ''),
        pageviews: Number(r.pageviews ?? 0),
        visitors: Number(r.visitors ?? 0),
      }))
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp)),
    events: ((eventsJson?.data ?? []) as Row[])
      .map(r => ({
        eventName: String(r.eventName ?? ''),
        count: Number(r.count ?? r.events ?? r.pageviews ?? 0),
      }))
      .filter(e => e.eventName)
      .sort((a, b) => b.count - a.count),
    referrers: ((referrersJson?.data ?? []) as Row[])
      .map(r => ({
        referrerHostname: String(r.referrerHostname ?? ''),
        pageviews: Number(r.pageviews ?? 0),
      }))
      .filter(r => r.referrerHostname)
      .sort((a, b) => b.pageviews - a.pageviews),
  }
}
