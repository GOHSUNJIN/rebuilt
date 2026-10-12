import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

export async function POST(req: Request) {
  try {
    const { service, coach, location, slots, name, email, phone, notes, showLocation } = await req.json()

    const rows: [string, string][] = [
      ['Service', service ?? 'Not sure yet'],
      ...(showLocation && location ? [['Location', location] as [string, string]] : []),
      ['Coach', coach],
      ...(slots?.length > 0 ? [['Preferred times', slots.join(', ')] as [string, string]] : []),
      ['Name', name],
      ['Email', email],
      ...(phone ? [['Phone', phone] as [string, string]] : []),
      ...(notes ? [['Notes', notes] as [string, string]] : []),
    ]

    const rowsHtml = rows.map(([label, value]) => `
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#6f7783;letter-spacing:.14em;padding:12px 0;border-bottom:1px solid #1E1E1E;white-space:nowrap;padding-right:32px;vertical-align:top">${label.toUpperCase()}</td>
        <td style="font-size:14px;color:#C0C0C0;padding:12px 0;border-bottom:1px solid #1E1E1E;vertical-align:top;line-height:1.5">${value.replace(/\n/g, '<br/>')}</td>
      </tr>
    `).join('')

    await transporter.sendMail({
      from: `"Rebuilt Academy" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      replyTo: email,
      subject: `New Booking: ${service ?? 'Not sure yet'} from ${name}`,
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

  <p style="font-family:monospace;font-size:9px;color:#3a3a3a;letter-spacing:.16em;text-align:center;margin:24px 0 0">
    REBUILT ACADEMY · SINGAPORE
  </p>
</div>
</body></html>`,
    })

    return Response.json({ ok: true })
  } catch (err) {
    console.error('[api/book]', err instanceof Error ? err.message : err)
    return Response.json({ ok: false }, { status: 500 })
  }
}
