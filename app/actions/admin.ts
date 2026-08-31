'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHash, timingSafeEqual } from 'crypto'
import { signToken, COOKIE_NAME, MAX_AGE_S } from '@/lib/adminAuth'

function safeEq(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a).digest()
  const hb = createHash('sha256').update(b).digest()
  return timingSafeEqual(ha, hb)
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
