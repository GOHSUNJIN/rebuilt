'use server'
import nodemailer from 'nodemailer'
import { headers } from 'next/headers'
import { SITE } from '@/lib/site'
import { isValidEmail } from '@/lib/bookData'

const rateMap = new Map<string, { n: number; resetAt: number }>()
function checkRate(ip: string): boolean {
  const now = Date.now()
  if (rateMap.size > 10_000) {
    for (const [k, v] of rateMap) if (now > v.resetAt) rateMap.delete(k)
  }
  const e = rateMap.get(ip)
  if (!e || now > e.resetAt) { rateMap.set(ip, { n: 1, resetAt: now + 60_000 }); return true }
  if (e.n >= 5) return false
  e.n++; return true
}

function sanitize(v: FormDataEntryValue | null): string {
  return String(v ?? '').trim().slice(0, 5000).replace(/[<>"'`&]/g, '')
}

export async function submitContact(formData: FormData) {
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anon'
  if (!checkRate(ip)) return { ok: false, error: 'Too many requests. Please wait a minute and try again.' }

  const name    = sanitize(formData.get('name'))
  const email   = sanitize(formData.get('email'))
  const service = sanitize(formData.get('service'))
  const message = sanitize(formData.get('message'))

  if (!name || !email) return { ok: false, error: 'Name and email are required.' }
  if (!isValidEmail(email)) return { ok: false, error: 'Please enter a valid email address.' }
  if (message.length > 2000) return { ok: false, error: 'Message must be under 2000 characters.' }

  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    return { ok: false, error: 'Email service is temporarily unavailable. Please try again later.' }
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
  })

  try {
    await transporter.sendMail({
      from: `"Rebuilt Academy" <${process.env.MAIL_USER}>`,
      to: SITE.contact.email,
      replyTo: email,
      subject: `New enquiry from ${name}${service ? `: ${service}` : ''}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Service: ${service || 'Not specified'}`,
        '',
        message || '(No message)',
      ].join('\n'),
    })
    return { ok: true }
  } catch (err) {
    console.error('[contact]', err instanceof Error ? err.message : String(err))
    return { ok: false, error: 'Failed to send. Please email us directly.' }
  }
}
