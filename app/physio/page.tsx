import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageShell from '@/components/layout/PageShell'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceTestimonial from '@/components/ui/ServiceTestimonial'
import PricingCards from '@/components/ui/PricingCards'
import CTASection from '@/components/ui/CTASection'
import ServiceCrosslinks from '@/components/ui/ServiceCrosslinks'
import SectionHeader from '@/components/ui/SectionHeader'
import FAQBar from '@/components/ui/FAQBar'
import FeatureGrid from '@/components/ui/FeatureGrid'
import type { PricingItem, FeatureItem, CrosslinkItem } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Physiotherapy',
  description: 'Physiotherapy at Rebuilt Academy, delivered in partnership with Rehab & Beyond. Physiotherapy, rehab and training under one roof.',
  alternates: { canonical: '/physio' },
  openGraph: {
    title: 'Physiotherapy',
    description: 'Physiotherapy delivered in partnership with Rehab & Beyond. Treatment and training coordinated from the start.',
  },
}

const INCLUDED: FeatureItem[] = [
  { num: '01', title: 'Coach coordination',    desc: 'Session notes shared directly with your Rebuilt team. Training is adjusted around your rehab from day one.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg> },
  { num: '02', title: 'Clinical assessment',   desc: 'Full movement screen and injury history on your first visit. Treatment plan written in session.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M17 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg> },
  { num: '03', title: 'Hands-on treatment',    desc: 'Manual therapy, soft tissue work and joint mobilisation tailored to your presentation.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
  { num: '04', title: 'Exercise prescription', desc: 'A progressive home and in-clinic exercise programme built around your recovery stage.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
  { num: '05', title: 'Progress tracking',     desc: 'Every session logged. Movement retested at key milestones so your progress is measured, not guessed.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { num: '06', title: 'Return to sport',       desc: 'Cleared when the testing says you are ready, not when the calendar does.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
]

const PRICING: PricingItem[] = [
  { type: '45 min', price: 'SGD 200', sub: '45 min session', href: '/book?service=physio', featured: false, features: ['Hands-on treatment', 'Exercise prescription', 'Progress reviewed every session'] },
  { type: '60 min', price: 'SGD 250', sub: '60 min session', href: '/book?service=physio', featured: true,  features: ['Full clinical assessment', 'Treatment plan written in session', 'Hands-on treatment'] },
]

const CROSSLINKS: CrosslinkItem[] = [
  { label: 'Rehab',       href: '/rehab',       desc: 'Coached rehabilitation for people coming back from injury or surgery. One team from assessment to return to sport.' },
  { label: 'Training',    href: '/strength',    desc: 'One-to-one training with a clear programme, honest feedback and measurable progress from session one.' },
  { label: 'Performance', href: '/performance', desc: 'Sport-specific blocks for athletes. Speed, power and conditioning tested at the start and end of every programme.' },
]

export default function PhysioPage() {
  return (
    <PageShell activePage="physio">

      <ServiceHero

        imageSrc="https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1400&q=85"
        imageAlt="Physiotherapy session"
        heading={<>Physiotherapy at Rebuilt Academy.</>}
        subheading="Delivered in partnership with Rehab & Beyond. Physiotherapy, rehab and training, coordinated from the start."
        bookHref="/book?service=physio"
        bookLabel="Book a consult"
        imagePosition="center 30%"
        headingSize={84}
      />

      {/* Partnership */}
      <section style={{ borderBottom: '1px solid #212429', background: '#09090d' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }} className="r2">
          <div className="r-px r-tall-pad" style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 40 }}>
            <div>
              <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.24em', marginTop: 0, marginBottom: 20 }}>THE PARTNERSHIP</p>
              <h2 style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-.03em', margin: '0 0 20px', lineHeight: 0.9 }}>In partnership<br />with Rehab &amp; Beyond.</h2>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: '#a3aab4', margin: 0, maxWidth: 420 }}>
                Rebuilt Academy and Rehab &amp; Beyond run alongside each other. One point of contact, two teams sharing the same notes so your recovery and your training are never working against each other.
              </p>
            </div>
            <div style={{ borderTop: '1px solid #1e2126', paddingTop: 28 }}>
              <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.2em', margin: '0 0 16px' }}>PARTNER CLINIC</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://gobeyondrehab.sg/favicon.ico"
                    alt="Rehab & Beyond"
                    width={40}
                    height={40}
                    style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', display: 'block', objectFit: 'cover' }}
                  />
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 4px', color: '#f2f4f7', lineHeight: 1 }}>Rehab &amp; Beyond</p>
                    <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.12em', margin: 0 }}>GOBEYONDREHAB.SG</p>
                  </div>
                </div>
                <a
                  href="https://gobeyondrehab.sg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ padding: '10px 18px', fontSize: 10, letterSpacing: '.2em', flexShrink: 0 }}
                >
                  Visit site ↗
                </a>
              </div>
            </div>
          </div>
          <div className="r-partner-img" style={{ position: 'relative', overflow: 'hidden', minHeight: 480 }}>
            <Image
              src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=900&q=85"
              alt="Physiotherapy session at Rebuilt"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(9,9,13,.55) 0%, transparent 40%)' }} />
          </div>
        </div>
      </section>

      <section className="r-px r-section-pad" style={{ padding: '72px 48px', borderBottom: '1px solid #212429' }}>
        <SectionHeader
          label="WHAT'S INCLUDED"
          heading={<>Treatment that<br />talks to training.</>}
          desc="Every physiotherapy session feeds back to your Rebuilt Academy programme. Nothing handled in isolation."
          headingSize={44}
        />
        <FeatureGrid items={INCLUDED} />
      </section>

      <PricingCards items={PRICING} />
      <p className="r-px" style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.12em', marginTop: -40, marginBottom: 0, paddingLeft: 48, paddingRight: 48, paddingBottom: 40, borderBottom: '1px solid #212429' }}>
        Prices are indicative and set by Rehab &amp; Beyond.{' '}
        <Link href="/book?service=physio" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Get in touch</Link> to confirm current rates before booking.
      </p>

      <ServiceTestimonial
        imageSrc="https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?auto=format&fit=crop&w=800&q=80"
        imageAlt="Physiotherapy treatment session"
        quote="Having the physiotherapist and coach talking to each other meant I never had to explain my injury twice. The programme adapted the moment my physiotherapist updated my notes."
        initial="J" name="Jason K." role="SHOULDER REHAB · RETURNED TO COMPETITION"
      />

      <FAQBar label="HAVE QUESTIONS ABOUT PHYSIOTHERAPY?" href="/faq?tab=physiotherapy" />

      <CTASection
        heading="Start treatment this week."
        body="One message. Rebuilt Academy and Rehab & Beyond coordinate everything - your first appointment confirmed within the day."
        bookHref="/book?service=physio"
        bookLabel="Book a consult"
        imageSrc="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80"
        imagePosition="center 30%"
      />

      {/* Coming soon: In-house physio */}
      <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid #212429', minHeight: 540 }}>
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=85"
          alt="Rebuilt training facility"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9,9,13,1) 0%, rgba(9,9,13,0.75) 45%, rgba(9,9,13,0.35) 100%)' }} />

        <div className="r-px" style={{ position: 'relative', padding: '44px 48px 64px', minHeight: 540, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Image src="/rebuilt-mark.svg" alt="Rebuilt" width={26} height={26} style={{ opacity: 0.9 }} />
              <div>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.28em', color: '#f2f4f7', lineHeight: 1 }}>REBUILT ACADEMY</div>
                <div style={{ marginTop: 3, font: '7px/1 ui-monospace,Menlo,monospace', letterSpacing: '.2em', color: 'var(--accent)' }}>SINGAPORE</div>
              </div>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 16px', border: '1px solid rgba(255,255,255,.12)', background: 'rgba(9,9,13,.65)', backdropFilter: 'blur(10px)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#8d95a0', display: 'block', flexShrink: 0 }} />
              <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#8d95a0', letterSpacing: '.22em' }}>COMING SOON</span>
            </div>
          </div>

          {/* Bottom content */}
          <div>
            <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.24em', margin: '0 0 20px' }}>IN-HOUSE PHYSIOTHERAPY</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end' }} className="r2">
              <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-.03em', margin: 0, lineHeight: 0.96, color: '#f2f4f7' }}>
                One team.<br />One building.<br />No handover gaps.
              </h2>
              <div>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: '#b0b8c4', margin: '0 0 24px' }}>
                  We are building Rebuilt Academy&apos;s own in-house physiotherapy. Treatment and coaching under the same roof, sharing the same notes from day one.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['No referrals or handover gaps', 'Physio and coach share session notes', 'Assessment and rehab in the same building'].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 4, height: 4, background: 'var(--accent)', borderRadius: '50%', flexShrink: 0, display: 'block' }} />
                      <span style={{ fontSize: 13.5, color: '#a3aab4' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceCrosslinks items={CROSSLINKS} />

    </PageShell>
  )
}
