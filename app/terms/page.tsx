import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Rebuilt Academy. Read before booking a session or using our website.',
  openGraph: {
    title: 'Terms of Service',
    description: 'Terms of service for Rebuilt Academy. Read before booking a session or using our website.',
  },
}

const TOC = [
  { num: '01', id: 'about',     title: 'About us' },
  { num: '02', id: 'bookings',  title: 'Bookings' },
  { num: '03', id: 'cancel',    title: 'Cancellations' },
  { num: '04', id: 'payment',   title: 'Payment' },
  { num: '05', id: 'health',    title: 'Health & safety' },
  { num: '06', id: 'liability', title: 'Liability' },
  { num: '07', id: 'ip',        title: 'Intellectual property' },
  { num: '08', id: 'changes',   title: 'Changes' },
  { num: '09', id: 'law',       title: 'Governing law' },
  { num: '10', id: 'contact',   title: 'Contact' },
]

function Num({ n }: { n: string }) {
  return (
    <span style={{
      font: '9px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)',
      letterSpacing: '.22em', border: '1px solid rgba(183,240,0,.25)',
      padding: '5px 10px', flexShrink: 0,
    }}>
      {n}
    </span>
  )
}

function Section({ id, num, title, children, first = false }: {
  id: string; num: string; title: string; children: React.ReactNode; first?: boolean
}) {
  return (
    <div id={id} style={{ scrollMarginTop: 90, paddingTop: first ? 0 : 56, paddingBottom: 56, borderTop: first ? 'none' : '1px solid #1E1E1E' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
        <Num n={num} />
        <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: '-.02em', color: '#FFFFFF', lineHeight: 1.1 }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

const bodyText = { fontSize: 15, lineHeight: 1.8, color: '#A5A5A5', marginTop: 0, marginBottom: 14 } as const

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 10 }}>
      <span style={{ width: 3, height: 3, background: 'var(--accent)', borderRadius: '50%', flexShrink: 0, marginTop: 10 }} />
      <p style={{ ...bodyText, marginBottom: 0 }}>{children}</p>
    </div>
  )
}

export default function TermsPage() {
  return (
    <div style={{ fontFamily: 'Archivo,Helvetica,Arial,sans-serif', background: '#0B0B0B', color: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />

      {/* ── Header ────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid #2A2A2A', background: '#0B0B0B' }}>
        {/* Breadcrumb */}
        <div className="r-px" style={{ padding: '16px 48px', borderBottom: '1px solid #1E1E1E', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/" style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.2em', textDecoration: 'none' }}>REBUILT</Link>
          <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#333333' }}>/</span>
          <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.2em' }}>LEGAL</span>
          <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#333333' }}>/</span>
          <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em' }}>TERMS OF SERVICE</span>
        </div>

        {/* Title area */}
        <div className="r-px" style={{ padding: '56px 48px 52px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -10, right: 40, font: '200px/0.82 ui-monospace,Menlo,monospace', color: 'rgba(183,240,0,.04)', fontWeight: 700, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-.05em' }}>
            §
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <h1 className="r-h1" style={{ fontSize: 76, fontWeight: 800, lineHeight: 0.9, letterSpacing: '-.04em', margin: '0 0 24px', color: '#FFFFFF' }}>
                Terms of<br />Service.
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: '#A5A5A5', maxWidth: 460, margin: 0 }}>
                These terms govern your use of the Rebuilt Academy website and the services we provide. By booking a session or using our website, you agree to these terms.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }} className="r-hide">
              {[
                { label: 'LAST UPDATED', value: '31 AUG 2026' },
                { label: 'JURISDICTION', value: 'Singapore Law' },
                { label: 'SECTIONS', value: '10' },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: 'right' }}>
                  <p style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.18em', margin: '0 0 4px' }}>{label}</p>
                  <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.12em', margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────── */}
      <div className="r-px" style={{ padding: '72px 48px', display: 'flex', gap: 72, maxWidth: 1100, margin: '0 auto', boxSizing: 'border-box' }}>

        {/* TOC */}
        <div className="r-hide" style={{ width: 196, flexShrink: 0, position: 'sticky', top: 90, alignSelf: 'start' }}>
          <div style={{ borderLeft: '2px solid #1E1E1E', paddingLeft: 20 }}>
            <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.22em', marginTop: 0, marginBottom: 22 }}>CONTENTS</p>
            {TOC.map(({ num, id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                className="hover-gold"
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '9px 0', borderBottom: '1px solid #171717',
                  color: '#6f7783', fontSize: 13, textDecoration: 'none',
                  transition: 'color .15s',
                }}
              >
                <span style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.1em', flexShrink: 0, minWidth: 16 }}>
                  {num}
                </span>
                {title}
              </a>
            ))}
          </div>

          <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid #1E1E1E' }}>
            <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.18em', marginTop: 0, marginBottom: 10 }}>QUESTIONS?</p>
            <a href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(SITE.contact.email)}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: 'var(--accent)', textDecoration: 'none', lineHeight: 1.5 }}>
              {SITE.contact.email}
            </a>
          </div>
        </div>

        {/* Sections */}
        <div style={{ flex: 1, minWidth: 0 }}>

          <Section id="about" num="01" title="About us" first>
            <p style={bodyText}>Rebuilt Academy operates across 3 locations in Singapore at Core Collective (Robinson, Dempsey and Katong). We provide coached rehabilitation, training and sports performance services. These terms apply to all clients and website visitors.</p>
          </Section>

          <Section id="bookings" num="02" title="Bookings">
            <p style={bodyText}>Sessions are confirmed only once a deposit has been received and we have sent a confirmation. Selecting a time slot without paying a deposit does not guarantee that slot.</p>
            <p style={bodyText}>We reserve the right to decline a booking at our discretion, in which case any deposit paid will be refunded in full.</p>
          </Section>

          <Section id="cancel" num="03" title="Cancellations and rescheduling">
            <p style={bodyText}>We require at least 12 hours&apos; notice to cancel or reschedule a session. Notify us by email at{' '}
              <a href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(SITE.contact.email)}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>{SITE.contact.email}</a>{' '}or by WhatsApp.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 16 }}>
              {[
                { tier: 'More than 12 hours notice', policy: 'Reschedule to any available slot at no charge. Deposits are carried forward.' },
                { tier: 'Less than 12 hours notice', policy: 'The deposit is forfeited. You may still reschedule but a new deposit is required.' },
                { tier: 'No-show', policy: 'The full session fee is charged. We will always try to reach you first.' },
              ].map(({ tier, policy }) => (
                <div key={tier} style={{ background: '#171717', border: '1px solid #1E1E1E', padding: '16px 20px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ width: 3, background: 'var(--accent)', alignSelf: 'stretch', flexShrink: 0, borderRadius: 2 }} />
                  <div>
                    <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.18em', margin: '0 0 7px' }}>
                      {tier.toUpperCase()}
                    </p>
                    <p style={{ fontSize: 14, color: '#A5A5A5', margin: 0, lineHeight: 1.6 }}>{policy}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={bodyText}>Exceptions may be made at our discretion in cases of genuine emergency or illness.</p>
          </Section>

          <Section id="payment" num="04" title="Payment">
            <p style={bodyText}>All fees are in Singapore dollars (SGD). A deposit of SGD 50 is required to confirm each booking; the balance is due at the end of the session.</p>
            <p style={bodyText}>We accept payment by PayNow. Block-of-sessions packages are invoiced in full at the start of the block and are non-refundable once commenced, except where we have cancelled sessions.</p>
          </Section>

          <Section id="health" num="05" title="Health and safety">
            <p style={bodyText}>You must disclose any injuries, medical conditions, recent surgeries or medications that may affect your ability to train safely. This information is used to plan your sessions and protect your health.</p>
            <p style={bodyText}>By attending a session, you confirm that you are physically capable of participating in the planned activities, or that you have informed us of any limitations. Training is undertaken at your own risk.</p>
            <p style={bodyText}>We reserve the right to refuse or modify a session if we believe proceeding would put you at risk.</p>
          </Section>

          <Section id="liability" num="06" title="Liability">
            <p style={bodyText}>Rebuilt takes all reasonable care to provide a safe training environment. To the extent permitted by Singapore law, our liability for any loss or injury arising from the use of our services is limited to the fees paid for the relevant session.</p>
            <p style={bodyText}>We are not liable for pre-existing conditions aggravated during training where you disclosed them and we took appropriate precautions, or for loss or damage to personal property at our studio.</p>
          </Section>

          <Section id="ip" num="07" title="Intellectual property">
            <p style={bodyText}>All content on this website, including text, images, programme templates and training materials, is owned by Rebuilt Academy or used with permission. You may not reproduce or distribute it without our written consent.</p>
          </Section>

          <Section id="changes" num="08" title="Changes to these terms">
            <p style={bodyText}>We may update these terms from time to time. Changes take effect when published on this page. We will notify existing clients of significant changes by email.</p>
          </Section>

          <Section id="law" num="09" title="Governing law">
            <p style={bodyText}>These terms are governed by the laws of Singapore. Any disputes will be subject to the exclusive jurisdiction of the Singapore courts.</p>
          </Section>

          <Section id="contact" num="10" title="Contact">
            <p style={bodyText}>For questions about these terms:</p>
            <div style={{ background: '#171717', border: '1px solid #1E1E1E', borderLeft: '2px solid var(--accent)', padding: '24px 28px', marginBottom: 0 }}>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em', margin: '0 0 12px' }}>REBUILT ACADEMY</p>
              <p style={{ fontSize: 14, color: '#6f7783', margin: '0 0 10px', lineHeight: 1.6 }}>
                Core Collective · Robinson, Dempsey &amp; Katong
              </p>
              <a href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(SITE.contact.email)}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
                {SITE.contact.email}
              </a>
            </div>
          </Section>

        </div>
      </div>

      <Footer />
    </div>
  )
}
