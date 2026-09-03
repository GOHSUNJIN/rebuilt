'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createHash, timingSafeEqual } from 'crypto'
import { signToken, COOKIE_NAME, MAX_AGE_S } from '@/lib/adminAuth'

function safeEq(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a).digest()
  const hb = createHash('sha256').update(b).digest()
  return timingSafeEqual(ha, hb)
}

const PERIOD_COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 30,
  path: '/admin',
}

export async function loginAction(formData: FormData) {
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    redirect('/admin/login?error=1')
  }

  const username = String(formData.get('username') ?? '')
  const password = String(formData.get('password') ?? '')

  const validUser = safeEq(username, process.env.ADMIN_USERNAME)
  const validPass = safeEq(password, process.env.ADMIN_PASSWORD)

  if (!validUser || !validPass) {
    redirect('/admin/login?error=1')
  }

  const token = await signToken(username)
  ;(await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE_S,
    path: '/',
  })
  redirect('/admin')
}

export async function logoutAction() {
  ;(await cookies()).delete(COOKIE_NAME)
  redirect('/admin/login')
}

export async function refreshAdminAction() {
  revalidatePath('/admin')
  redirect('/admin')
}

export async function setPeriodAction(formData: FormData) {
  const p = String(formData.get('period') ?? '30')
  const cs = await cookies()

  if (p === 'custom') {
    cs.set('rebuilt_period', 'custom', PERIOD_COOKIE_OPTS)
    redirect('/admin')
  }

  const days = Math.min(Math.max(Number(p) || 30, 7), 90)
  cs.set('rebuilt_period', String(days), PERIOD_COOKIE_OPTS)
  cs.delete('rebuilt_since')
  cs.delete('rebuilt_until')
  revalidatePath('/admin')
  redirect('/admin')
}

export async function setDateRangeAction(formData: FormData) {
  const since = String(formData.get('since') ?? '')
  const until = String(formData.get('until') ?? '')

  if (!since || !until) redirect('/admin')

  const sinceDate = new Date(since + 'T00:00:00.000Z')
  const untilDate = new Date(until + 'T23:59:59.999Z')

  if (isNaN(sinceDate.getTime()) || isNaN(untilDate.getTime()) || sinceDate >= untilDate) {
    redirect('/admin')
  }

  const cs = await cookies()
  cs.set('rebuilt_period', 'custom', PERIOD_COOKIE_OPTS)
  cs.set('rebuilt_since', sinceDate.toISOString(), PERIOD_COOKIE_OPTS)
  cs.set('rebuilt_until', untilDate.toISOString(), PERIOD_COOKIE_OPTS)

  revalidatePath('/admin')
  redirect('/admin')
}
