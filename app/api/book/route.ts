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

const FORMAT_DISPLAY: Record<string, string> = {
  'One to one': 'One to One',
  'Small group': 'Small Group',
  'Pairs': 'Pairs',
}

function categoryLabel(cat: string): string {
  if (cat === 'Not sure yet') return 'Not sure yet'
  return cat
}

function serviceLabel(service: string): string {
  if (service === 'Physiotherapy') return 'Physiotherapy with Rehab & Beyond'
  if (service === 'Not sure yet') return 'Not sure yet'
  if (service.endsWith(' · block')) {
    const format = service.replace(' · block', '')
    return `${FORMAT_DISPLAY[format] ?? format}, Block of 10`
  }
  if (PT_TYPES[service]) return `${FORMAT_DISPLAY[service] ?? service}, Single Session`
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

function toWaLink(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  const full = digits.length === 8 ? `65${digits}` : digits
  return `https://wa.me/${full}`
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

function tableRow(lbl: string, value: string) {
  return `<tr>
    <td style="${tdLabel}">${lbl.toUpperCase()}</td>
    <td style="${tdValue}">${value.replace(/\n/g, '<br/>')}</td>
  </tr>`
}

const footer = `<p style="font-family:monospace;font-size:9px;color:#3a3a3a;letter-spacing:.16em;text-align:center;margin:24px 0 0">REBUILT ACADEMY · SINGAPORE</p>`

export async function POST(req: Request) {
  try {
    const { service, category, coach, location, slots, name, email, phone, notes, showLocation } = await req.json()

    const orderId = generateOrderId()
    const catLabel = category ? categoryLabel(category) : 'Not specified'
    const label = service ? serviceLabel(service) : catLabel
    const price = service ? servicePrice(service) : null
    const notSureYet = category === 'Not sure yet' || !service

    const adminRows = buildRows([
      tableRow('Order', orderId),
      tableRow('Category', catLabel),
      ...(label !== catLabel ? [tableRow('Service', label)] : []),
      ...(price ? [tableRow('Price', price)] : []),
      ...(showLocation && location ? [tableRow('Location', location)] : []),
      tableRow('Coach', coach),
      ...(slots?.length > 0 ? [tableRow('Preferred times', slots.join(', '))] : []),
      tableRow('Name', name),
      tableRow('Email', email),
      ...(phone ? [tableRow('Phone', `<a href="${toWaLink(phone)}" style="color:#B7F000;text-decoration:none">${phone}</a> &middot; <a href="${toWaLink(phone)}" style="color:#B7F000;text-decoration:none">WhatsApp</a>`)] : []),
      ...(notes ? [tableRow('Notes', notes)] : []),
    ])

    const subject = service && !notSureYet
      ? `[${orderId}] ${label} - ${name}`
      : `[${orderId}] New Booking from ${name}`

    const customerSummaryRows = buildRows([
      tableRow('Category', catLabel),
      ...(label !== catLabel ? [tableRow('Service', label)] : []),
      ...(price ? [tableRow('Price', price)] : []),
      ...(showLocation && location ? [tableRow('Location', location)] : []),
      tableRow('Coach', coach),
      ...(slots?.length > 0 ? [tableRow('Preferred times', slots.join(', '))] : []),
    ])

    const bookingIntro = notSureYet
      ? `Thanks for reaching out. We have received your request and will be in touch to help you find the right programme.`
      : `Thanks for reaching out. We have received your booking request for <strong style="color:#ffffff">${label}</strong> and will confirm your slot within the day.`

    await transporter.sendMail({
      from: `"Rebuilt Academy" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      replyTo: email,
      subject,
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0B0B0B;font-family:Arial,Helvetica,sans-serif;">
<span style="display:none;font-size:1px;color:#0B0B0B;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">&#847;</span>
<div style="max-width:560px;margin:0 auto;padding:40px 20px;">

  <div style="background:#171717;border:1px solid #2A2A2A;border-bottom:none;padding:28px 32px;">
    <p style="font-family:monospace;font-size:10px;color:#B7F000;letter-spacing:.24em;margin:0 0 10px">REBUILT ACADEMY</p>
    <h1 style="font-size:22px;font-weight:800;color:#ffffff;margin:0;letter-spacing:-.02em">New Booking Request</h1>
  </div>

  <div style="background:#171717;border:1px solid #2A2A2A;border-top:none;padding:8px 32px 24px">
    <table style="width:100%;border-collapse:collapse">
      ${adminRows}
    </table>
  </div>

  <table style="border-collapse:collapse;margin-top:16px;">
    <tr>
      <td style="padding-right:12px;">
        <a href="mailto:${email}" style="display:inline-block;padding:12px 24px;background:#B7F000;color:#0B0B0B;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:.16em;text-decoration:none;text-transform:uppercase;">Reply to ${name}</a>
      </td>
      ${phone ? `<td><a href="${toWaLink(phone)}" style="display:inline-block;padding:12px 24px;background:#171717;border:1px solid #2A2A2A;color:#B7F000;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:.16em;text-decoration:none;text-transform:uppercase;">WhatsApp</a></td>` : ''}
    </tr>
  </table>

  ${footer}
</div>
</body></html>`,
    })

    await transporter.sendMail({
      from: `"Rebuilt Academy" <${process.env.MAIL_USER}>`,
      to: email,
      subject: `Request Received: ${orderId}`,
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
    <h1 style="font-size:22px;font-weight:800;color:#ffffff;margin:0;letter-spacing:-.02em">Request Received.</h1>
  </div>

  <div style="background:#171717;border:1px solid #2A2A2A;border-top:none;padding:24px 32px 28px">
    <p style="font-size:15px;color:#C0C0C0;margin:0 0 20px;line-height:1.6">Hi ${name},</p>
    <p style="font-size:15px;color:#C0C0C0;margin:0 0 28px;line-height:1.6">${bookingIntro}</p>

    <p style="font-family:monospace;font-size:10px;color:#6f7783;letter-spacing:.14em;margin:0 0 4px">YOUR REFERENCE</p>
    <p style="font-size:17px;font-weight:700;color:#ffffff;margin:0 0 28px;letter-spacing:.06em">${orderId}</p>

    <p style="font-family:monospace;font-size:10px;color:#6f7783;letter-spacing:.14em;margin:0 0 2px">BOOKING SUMMARY</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:28px">
      ${customerSummaryRows}
    </table>

    <p style="font-family:monospace;font-size:10px;color:#6f7783;letter-spacing:.14em;margin:0 0 14px">WHAT HAPPENS NEXT</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:28px">
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#B7F000;letter-spacing:.1em;padding:10px 0;border-bottom:1px solid #1E1E1E;white-space:nowrap;padding-right:24px;vertical-align:top">01</td>
        <td style="font-size:14px;color:#C0C0C0;padding:10px 0;border-bottom:1px solid #1E1E1E;line-height:1.5">We will reach out to confirm your slot.</td>
      </tr>
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#B7F000;letter-spacing:.1em;padding:10px 0;border-bottom:1px solid #1E1E1E;white-space:nowrap;padding-right:24px;vertical-align:top">02</td>
        <td style="font-size:14px;color:#C0C0C0;padding:10px 0;border-bottom:1px solid #1E1E1E;line-height:1.5">Once confirmed, we will send payment details.</td>
      </tr>
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#B7F000;letter-spacing:.1em;padding:10px 0;white-space:nowrap;padding-right:24px;vertical-align:top">03</td>
        <td style="font-size:14px;color:#C0C0C0;padding:10px 0;line-height:1.5">We look forward to seeing you at your first session.</td>
      </tr>
    </table>

    <p style="font-size:14px;color:#5f6670;margin:0;line-height:1.6">Questions? Reply to this email or reach us at <a href="${SITE.contact.phoneTel}" style="color:#B7F000;text-decoration:none;white-space:nowrap">${SITE.contact.phone}</a>.</p>
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
