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

function generateEnquiryId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6)
  return `ENQ-${date}-${rand}`
}

const tdLabel = `font-family:monospace;font-size:10px;color:#6f7783;letter-spacing:.14em;padding:12px 0;border-bottom:1px solid #1E1E1E;white-space:nowrap;padding-right:32px;vertical-align:top`
const tdValue = `font-size:14px;color:#C0C0C0;padding:12px 0;border-bottom:1px solid #1E1E1E;vertical-align:top;line-height:1.5`
const tdLabelLast = tdLabel.replace('border-bottom:1px solid #1E1E1E;', 'border-bottom:none;')
const tdValueLast = tdValue.replace('border-bottom:1px solid #1E1E1E;', 'border-bottom:none;')

function buildRows(rows: string[]): string {
  if (rows.length === 0) return ''
  const all = [...rows]
  all[all.length - 1] = all[all.length - 1]
    .replace(tdLabel, tdLabelLast)
    .replace(tdValue, tdValueLast)
  return all.join('')
}

function row(lbl: string, value: string) {
  return `<tr><td style="${tdLabel}">${lbl}</td><td style="${tdValue}">${value.replace(/\n/g, '<br/>')}</td></tr>`
}

const footer = `<p style="font-family:monospace;font-size:9px;color:#3a3a3a;letter-spacing:.16em;text-align:center;margin:24px 0 0">REBUILT ACADEMY · SINGAPORE</p>`

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

  const enquiryId = generateEnquiryId()

  const adminRows = buildRows([
    row('ENQUIRY', enquiryId),
    row('NAME', name),
    row('EMAIL', email),
    ...(service ? [row('SERVICE', service)] : []),
    ...(message ? [row('MESSAGE', message)] : []),
  ])

  try {
    await transporter.sendMail({
      from: `"Rebuilt Academy" <${process.env.MAIL_USER}>`,
      to: SITE.contact.email,
      replyTo: email,
      subject: `[${enquiryId}] New Enquiry from ${name}${service ? `: ${service}` : ''}`,
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0B0B0B;font-family:Arial,Helvetica,sans-serif;">
<span style="display:none;font-size:1px;color:#0B0B0B;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">&#847;</span>
<div style="max-width:560px;margin:0 auto;padding:40px 20px;">

  <div style="background:#171717;border:1px solid #2A2A2A;border-bottom:none;padding:28px 32px;">
    <p style="font-family:monospace;font-size:10px;color:#B7F000;letter-spacing:.24em;margin:0 0 10px">REBUILT ACADEMY</p>
    <h1 style="font-size:22px;font-weight:800;color:#ffffff;margin:0;letter-spacing:-.02em">New Enquiry</h1>
  </div>

  <div style="background:#171717;border:1px solid #2A2A2A;border-top:none;padding:8px 32px 24px">
    <table style="width:100%;border-collapse:collapse">
      ${adminRows}
    </table>
  </div>

  <table style="border-collapse:collapse;margin-top:16px;">
    <tr>
      <td>
        <a href="mailto:${email}" style="display:inline-block;padding:12px 24px;background:#B7F000;color:#0B0B0B;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:.16em;text-decoration:none;text-transform:uppercase;">Reply to ${name}</a>
      </td>
    </tr>
  </table>

  ${footer}
</div>
</body></html>`,
    })

    await transporter.sendMail({
      from: `"Rebuilt Academy" <${process.env.MAIL_USER}>`,
      to: email,
      subject: `Enquiry Received: ${enquiryId}`,
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0B0B0B;font-family:Arial,Helvetica,sans-serif;">
<span style="display:none;font-size:1px;color:#0B0B0B;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">&#847;</span>
<div style="max-width:560px;margin:0 auto;padding:40px 20px;">

  <div style="text-align:center;margin-bottom:24px;">
    <img src="https://www.rebuiltacademy.sg/instagram-pfp.jpg" width="72" height="72" alt="Rebuilt Academy" style="border-radius:50%;display:inline-block;" />
  </div>

  <div style="background:#171717;border:1px solid #2A2A2A;border-bottom:none;padding:28px 32px;">
    <p style="font-family:monospace;font-size:10px;color:#B7F000;letter-spacing:.24em;margin:0 0 10px">REBUILT ACADEMY</p>
    <h1 style="font-size:22px;font-weight:800;color:#ffffff;margin:0;letter-spacing:-.02em">Message Received.</h1>
  </div>

  <div style="background:#171717;border:1px solid #2A2A2A;border-top:none;padding:24px 32px 28px">
    <p style="font-size:15px;color:#C0C0C0;margin:0 0 20px;line-height:1.6">Hi ${name},</p>
    <p style="font-size:15px;color:#C0C0C0;margin:0 0 28px;line-height:1.6">Thanks for reaching out. We have received your message and will get back to you within one business day.</p>

    <p style="font-family:monospace;font-size:10px;color:#6f7783;letter-spacing:.14em;margin:0 0 4px">YOUR REFERENCE</p>
    <p style="font-size:17px;font-weight:700;color:#ffffff;margin:0 0 28px;letter-spacing:.06em">${enquiryId}</p>

    <p style="font-size:14px;color:#5f6670;margin:0;line-height:1.6">Need something sooner? Reply to this email or reach us at <a href="${SITE.contact.phoneTel}" style="color:#B7F000;text-decoration:none;white-space:nowrap">${SITE.contact.phone}</a>.</p>
  </div>

  ${footer}
</div>
</body></html>`,
    })

    return { ok: true, enquiryId }
  } catch (err) {
    console.error('[contact]', err instanceof Error ? err.message : String(err))
    return { ok: false, error: 'Failed to send. Please email us directly.' }
  }
}
