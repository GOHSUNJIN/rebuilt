import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms of service for Rebuilt Singapore. Read before booking a session or using our website.',
}

const p: CSSProperties = { fontSize: 15, lineHeight: 1.8, color: '#a3aab4', marginTop: 0, marginBottom: 14 }
const ul: CSSProperties = { fontSize: 15, lineHeight: 1.8, color: '#a3aab4', paddingLeft: 20, margin: '0 0 14px' }

const TOC = [
  { num: '01', id: 'about',       title: 'About us' },
  { num: '02', id: 'bookings',    title: 'Bookings' },
  { num: '03', id: 'cancel',      title: 'Cancellations' },
  { num: '04', id: 'payment',     title: 'Payment' },
  { num: '05', id: 'health',      title: 'Health & safety' },
  { num: '06', id: 'liability',   title: 'Liability' },
  { num: '07', id: 'ip',          title: 'Intellectual property' },
  { num: '08', id: 'changes',     title: 'Changes' },
  { num: '09', id: 'law',         title: 'Governing law' },
  { num: '10', id: 'contact',     title: 'Contact' },
]

function Num({ n }: { n: string }) {
  return (
    <span style={{
      width: 32, height: 32, border: '1px solid #4a3d2b', color: '#d99e5c',
      font: '10px/1 ui-monospace,Menlo,monospace', letterSpacing: '.1em',
      display: 'grid', placeItems: 'center', flexShrink: 0,
    }}>
      {n}
    </span>
  )
}

export default function TermsPage() {
  return (
    <div style={{ fontFamily: 'Archivo,Helvetica,Arial,sans-serif', background: '#0b0c0e', color: '#f2f4f7', minHeight: '100vh' }}>
      <div style={{ height: 5, background: '#d99e5c' }} />
      <Navbar />

      {/* ── Header ──────────────────────────────── */}
      <section
        className="r-px"
        style={{
          padding: '72px 48px 56px',
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #141208 0%, #0b0c0e 65%)',
          borderBottom: '1px solid #212429',
        }}
      >
        <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.24em', marginTop: 0, marginBottom: 20 }}>
          REBUILT · LEGAL
        </p>
        <h1
          className="r-h2"
          style={{ fontSize: 58, fontWeight: 800, lineHeight: 0.96, letterSpacing: '-.025em', marginTop: 0, marginBottom: 22 }}
        >
          Terms of Service
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: '#a3aab4', maxWidth: 600, marginTop: 0, marginBottom: 36 }}>
          These terms govern your use of the Rebuilt website and the services we provide at our Singapore studio. By booking a session or using our website, you agree to these terms.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.16em' }}>
            LAST UPDATED: 1 JAN 2025
          </span>
          <span style={{ width: 1, height: 12, background: '#2a2e34', display: 'block' }} />
          <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.16em' }}>
            SINGAPORE LAW
          </span>
          <span style={{ width: 1, height: 12, background: '#2a2e34', display: 'block' }} />
          <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.16em' }}>
            10 SECTIONS
          </span>
        </div>
      </section>

      {/* ── Body ────────────────────────────────── */}
      <div
        className="r-px"
        style={{ padding: '64px 48px 96px', display: 'flex', gap: 80, maxWidth: 1100, margin: '0 auto', boxSizing: 'border-box' }}
      >
        {/* TOC — hidden on mobile via r-hide */}
        <div
          className="r-hide"
          style={{ width: 210, flexShrink: 0, position: 'sticky', top: 60, alignSelf: 'start' }}
        >
          <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.2em', marginTop: 0, marginBottom: 18 }}>
            CONTENTS
          </p>
          {TOC.map(({ num, id, title }) => (
            <a
              key={id}
              href={`#${id}`}
              className="hover-gold"
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '9px 0', borderBottom: '1px solid #1a1d22',
                color: '#5f6670', fontSize: 13, textDecoration: 'none',
                transition: 'color .15s',
              }}
            >
              <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#3a3f47', letterSpacing: '.1em', flexShrink: 0, minWidth: 20 }}>
                {num}
              </span>
              {title}
            </a>
          ))}
        </div>

        {/* Sections */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>

          <div id="about" style={{ paddingBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="01" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>About us</h2>
            </div>
            <p style={p}>Rebuilt operates from {SITE.address.full}. We provide coached rehabilitation, personal training and sports performance services. These terms apply to all clients and website visitors.</p>
          </div>

          <div id="bookings" style={{ borderTop: '1px solid #1a1d22', paddingTop: 48, paddingBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="02" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>Bookings</h2>
            </div>
            <p style={p}>Sessions are confirmed only once a deposit has been received and we have sent a confirmation. Selecting a time slot without paying a deposit does not guarantee that slot.</p>
            <p style={p}>We reserve the right to decline a booking at our discretion, in which case any deposit paid will be refunded in full.</p>
          </div>

          <div id="cancel" style={{ borderTop: '1px solid #1a1d22', paddingTop: 48, paddingBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="03" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>Cancellations and rescheduling</h2>
            </div>
            <p style={p}>We require at least 24 hours&apos; notice to cancel or reschedule a session. Notify us by email at {SITE.contact.email} or by WhatsApp.</p>
            <ul style={ul}>
              <li><strong style={{ color: '#c2c7ce' }}>More than 24 hours&apos; notice</strong> &mdash; your deposit is carried forward to your next session or refunded on request</li>
              <li><strong style={{ color: '#c2c7ce' }}>Less than 24 hours&apos; notice</strong> &mdash; the deposit is forfeited</li>
              <li><strong style={{ color: '#c2c7ce' }}>No-show</strong> &mdash; the full session fee is charged</li>
            </ul>
            <p style={p}>Exceptions may be made at our discretion in cases of genuine emergency or illness.</p>
          </div>

          <div id="payment" style={{ borderTop: '1px solid #1a1d22', paddingTop: 48, paddingBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="04" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>Payment</h2>
            </div>
            <p style={p}>All fees are in Singapore dollars (SGD). A deposit of SGD 50 is required to confirm each booking; the balance is due at the end of the session.</p>
            <p style={p}>We accept payment by PayNow. Block-of-sessions packages are invoiced in full at the start of the block and are non-refundable once commenced, except where we have cancelled sessions.</p>
          </div>

          <div id="health" style={{ borderTop: '1px solid #1a1d22', paddingTop: 48, paddingBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="05" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>Health and safety</h2>
            </div>
            <p style={p}>You must disclose any injuries, medical conditions, recent surgeries or medications that may affect your ability to train safely. This information is used to plan your sessions and protect your health.</p>
            <p style={p}>By attending a session, you confirm that you are physically capable of participating in the planned activities, or that you have informed us of any limitations. Training is undertaken at your own risk.</p>
            <p style={p}>We reserve the right to refuse or modify a session if we believe proceeding would put you at risk.</p>
          </div>

          <div id="liability" style={{ borderTop: '1px solid #1a1d22', paddingTop: 48, paddingBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="06" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>Liability</h2>
            </div>
            <p style={p}>Rebuilt takes all reasonable care to provide a safe training environment. To the extent permitted by Singapore law, our liability for any loss or injury arising from the use of our services is limited to the fees paid for the relevant session.</p>
            <p style={p}>We are not liable for pre-existing conditions aggravated during training where you disclosed them and we took appropriate precautions, or for loss or damage to personal property at our studio.</p>
          </div>

          <div id="ip" style={{ borderTop: '1px solid #1a1d22', paddingTop: 48, paddingBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="07" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>Intellectual property</h2>
            </div>
            <p style={p}>All content on this website — including text, images, programme templates and training materials — is owned by Rebuilt or used with permission. You may not reproduce or distribute it without our written consent.</p>
          </div>

          <div id="changes" style={{ borderTop: '1px solid #1a1d22', paddingTop: 48, paddingBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="08" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>Changes to these terms</h2>
            </div>
            <p style={p}>We may update these terms from time to time. Changes take effect when published on this page. We will notify existing clients of significant changes by email.</p>
          </div>

          <div id="law" style={{ borderTop: '1px solid #1a1d22', paddingTop: 48, paddingBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="09" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>Governing law</h2>
            </div>
            <p style={p}>These terms are governed by the laws of Singapore. Any disputes will be subject to the exclusive jurisdiction of the Singapore courts.</p>
          </div>

          <div id="contact" style={{ borderTop: '1px solid #1a1d22', paddingTop: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="10" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>Contact</h2>
            </div>
            <p style={p}>For questions about these terms:</p>
            <div style={{ border: '1px solid #1e2126', background: '#111316', padding: '24px 28px', marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#f2f4f7', margin: '0 0 8px' }}>Rebuilt Singapore</p>
              <p style={{ fontSize: 14, color: '#a3aab4', margin: '0 0 6px', lineHeight: 1.6 }}>
                {SITE.address.full}
              </p>
              <a href={`mailto:${SITE.contact.email}`} style={{ fontSize: 14, color: '#d99e5c', textDecoration: 'none' }}>
                {SITE.contact.email}
              </a>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}
