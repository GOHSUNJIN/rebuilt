import nodemailer from 'nodemailer'
import { SITE } from '@/lib/site'
import { PT_TYPES, REHAB_OPTIONS } from '@/lib/bookData'

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

function generateOrderId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6)
  return `RA-${date}-${rand}`
}

function serviceLabel(service: string): string {
  if (service.endsWith(' · block')) {
    const format = service.replace(' · block', '')
    return `${format} — Block of 10`
  }
  if (PT_TYPES[service]) return `${service} — Single session`
  return service
}

function servicePrice(service: string): string | null {
  if (service.endsWith(' · block')) {
    const format = service.replace(' · block', '')
    return PT_TYPES[format]?.block ?? null
  }
  if (PT_TYPES[service]) return PT_TYPES[service].single
  const rehab = REHAB_OPTIONS.find(o => o.label === service)
  return rehab?.sub ?? null
}

export async function POST(req: Request) {
  try {
    const { service, category, coach, location, slots, name, email, phone, notes, showLocation } = await req.json()

    const orderId = generateOrderId()
    const label = service ? serviceLabel(service) : 'Not sure yet'
    const price = service ? servicePrice(service) : null

    const rows: [string, string][] = [
      ['Order', orderId],
      ['Category', category ?? 'Not specified'],
      ['Service', label],
      ...(price ? [['Price', price] as [string, string]] : []),
      ...(showLocation && location ? [['Location', location] as [string, string]] : []),
      ['Coach', coach],
      ...(slots?.length > 0 ? [['Preferred times', slots.join(', ')] as [string, string]] : []),
      ['Name', name],
      ['Email', email],
      ...(phone ? [['Phone', phone] as [string, string]] : []),
      ...(notes ? [['Notes', notes] as [string, string]] : []),
    ]

    const rowsHtml = rows.map(([lbl, value]) => `
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#6f7783;letter-spacing:.14em;padding:12px 0;border-bottom:1px solid #1E1E1E;white-space:nowrap;padding-right:32px;vertical-align:top">${lbl.toUpperCase()}</td>
        <td style="font-size:14px;color:#C0C0C0;padding:12px 0;border-bottom:1px solid #1E1E1E;vertical-align:top;line-height:1.5">${value.replace(/\n/g, '<br/>')}</td>
      </tr>
    `).join('')

    const subject = service
      ? `[${orderId}] ${label} — ${name}`
      : `[${orderId}] New Booking from ${name}`

    const footer = `
  <p style="font-family:monospace;font-size:9px;color:#3a3a3a;letter-spacing:.16em;text-align:center;margin:24px 0 0">
    REBUILT ACADEMY · SINGAPORE
  </p>`

    await transporter.sendMail({
      from: `"Rebuilt Academy" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      replyTo: email,
      subject,
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0B0B0B;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:40px 20px;">
  <div style="background:#171717;border:1px solid #2A2A2A;border-bottom:none;padding:28px 32px;">
    <p style="font-family:monospace;font-size:10px;color:#B7F000;letter-spacing:.24em;margin:0 0 10px">REBUILT ACADEMY</p>
    <h1 style="font-size:22px;font-weight:800;color:#ffffff;margin:0;letter-spacing:-.02em">New Booking Request</h1>
  </div>
  <div style="background:#171717;border:1px solid #2A2A2A;border-top:none;padding:8px 32px 24px">
    <table style="width:100%;border-collapse:collapse">
      ${rowsHtml}
    </table>
  </div>
  ${footer}
</div>
</body></html>`,
    })

    await transporter.sendMail({
      from: `"Rebuilt Academy" <${process.env.MAIL_USER}>`,
      to: email,
      subject: `Request received — ${orderId}`,
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0B0B0B;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:40px 20px;">
  <div style="background:#171717;border:1px solid #2A2A2A;border-bottom:none;padding:28px 32px;">
    <p style="font-family:monospace;font-size:10px;color:#B7F000;letter-spacing:.24em;margin:0 0 10px">REBUILT ACADEMY</p>
    <h1 style="font-size:22px;font-weight:800;color:#ffffff;margin:0;letter-spacing:-.02em">Request received.</h1>
  </div>
  <div style="background:#171717;border:1px solid #2A2A2A;border-top:none;padding:24px 32px 28px">
    <p style="font-size:15px;color:#C0C0C0;margin:0 0 20px;line-height:1.6">Hi ${name},</p>
    <p style="font-size:15px;color:#C0C0C0;margin:0 0 20px;line-height:1.6">Thanks for reaching out. We have received your booking request for <strong style="color:#ffffff">${label}</strong> and will get back to you shortly to confirm your slot and arrange payment.</p>
    <p style="font-family:monospace;font-size:10px;color:#6f7783;letter-spacing:.14em;margin:0 0 6px">YOUR REFERENCE</p>
    <p style="font-size:16px;font-weight:700;color:#ffffff;margin:0 0 24px;letter-spacing:.04em">${orderId}</p>
    <p style="font-size:15px;color:#C0C0C0;margin:0;line-height:1.6">If you have any questions in the meantime, reply to this email or reach us at <a href="${SITE.contact.phoneTel}" style="color:#B7F000;text-decoration:none">${SITE.contact.phone}</a>.</p>
  </div>
  ${footer}
</div>
</body></html>`,
    })

    return Response.json({ ok: true })
  } catch (err) {
    console.error('[api/book]', err instanceof Error ? err.message : err)
    return Response.json({ ok: false }, { status: 500 })
  }
}
