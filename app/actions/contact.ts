'use server'
import { Resend } from 'resend'
import { SITE } from '@/lib/site'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContact(formData: FormData) {
  const name    = formData.get('name')    as string
  const email   = formData.get('email')   as string
  const service = formData.get('service') as string
  const message = formData.get('message') as string

  if (!name || !email) return { ok: false, error: 'Name and email are required.' }

  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — email not sent')
    return { ok: true }
  }

  try {
    await resend.emails.send({
      from: 'Rebuilt Website <noreply@rebuilt.sg>',
      to: SITE.contact.email,
      replyTo: email,
      subject: `New enquiry from ${name}${service ? ` — ${service}` : ''}`,
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
    console.error('Resend error:', err)
    return { ok: false, error: 'Failed to send. Please email us directly.' }
  }
}
