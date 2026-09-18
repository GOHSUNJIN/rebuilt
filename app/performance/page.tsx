import type { Metadata } from 'next'
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
  title: 'Performance',
  description: 'Sports performance training in Singapore. Tested, coached blocks for athletes who need speed, power and the conditioning to repeat it.',
  alternates: { canonical: '/performance' },
  openGraph: {
    title: 'Performance',
    description: 'Sport-specific blocks for athletes. Speed, power and conditioning, tested at the start and end of every programme.',
  },
}

const PRICING: PricingItem[] = [
  { type: 'Pre-season',  price: 'SGD 100', sub: 'per session · 3× per week · 8 weeks',  href: '/book?service=performance', featured: false, features: ['Entry and exit testing included', 'Speed, power & conditioning', '1-on-1 coached', 'Instalment plan available'] },
  { type: 'In-season',   price: 'SGD 140', sub: 'per session · 2× per week · monthly',   href: '/book?service=performance', featured: true,  features: ['Maintain numbers through fixtures', '1-on-1 coached', 'Fatigue tracked across match days'] },
  { type: 'Off-season',  price: 'SGD 120', sub: 'per session · 3× per week · 12 weeks', href: '/book?service=performance', featured: false, features: ['Full rebuild block', 'Entry and exit testing included', '1-on-1 coached', 'Instalment plan available'] },
]

const INCLUDED: FeatureItem[] = [
  { num: '01', title: 'Entry baseline test', desc: 'Sprint speed, vertical and horizontal power, single-leg strength and conditioning. Measured on day one.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg> },
  { num: '02', title: 'Speed development',   desc: 'Acceleration mechanics, sprint technique and top-end speed work. Coached every rep.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { num: '03', title: 'Power training',      desc: "Plyometric and loaded work to build ground force and explosive output for your sport.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
  { num: '04', title: 'Sport conditioning',  desc: "Energy system work matched to your sport's demands. Repeatable efforts, not just fitness.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { num: '05', title: 'Load management',     desc: 'Training load tracked alongside match and practice days so fatigue is monitored, not guessed.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { num: '06', title: 'Exit retest',         desc: 'Every metric from week one tested again at the end of the block. Numbers on paper, not just a feeling.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><polyline points="20 6 9 17 4 12"/></svg> },
]

const CROSSLINKS: CrosslinkItem[] = [
  { label: 'Rehab',         href: '/rehab',    desc: 'Returning from injury or surgery? The rehab programme is built around progressive loading and return-to-sport testing.' },
  { label: 'Training',      href: '/strength', desc: 'Not yet at performance level? Training builds the strength and technique foundation before sport-specific work begins.' },
  { label: 'Physiotherapy', href: '/physio',   desc: 'Need assessment or treatment alongside your training? Physiotherapy at Rebuilt Academy runs through our partner Rehab & Beyond.' },
]

export default function PerformancePage() {
  return (
    <PageShell activePage="performance">

      <ServiceHero

        imageSrc="/img/performance-hero.jpg"
        mobileImageSrc="/img/performance-hero-mobile.jpg"
        mobileImagePosition="center 45%"
        imageAlt="Sports performance training"
        heading={<>Train to perform.</>}
        subheading="Speed, power, conditioning. Benchmarked on day one. Proven at the end of every block."
        bookHref="/book?service=performance"
        bookLabel="Book a consult"
        imagePosition="center 35%"
        headingSize={84}
        contentMaxWidth={900}
      />

      {/* Who it's for */}
      <section className="r-px r-whosfor" style={{ padding: '28px 48px', borderBottom: '1px solid #2A2A2A', background: '#0B0B0B', display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
        <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.2em', margin: 0, flexShrink: 0 }}>
          WHO IT&apos;S FOR
        </p>
        <div className="r-whosfor-grid" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Weekend warriors', 'Club athletes', 'Semi-professional', 'National competitors'].map(level => (
            <span key={level} className="r-whosfor-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', border: '1px solid #242424', background: '#111', color: '#C0C0C0', fontSize: 12.5, fontWeight: 500, letterSpacing: '-.01em' }}>
              <span style={{ width: 4, height: 4, background: 'var(--accent)', borderRadius: '50%', flexShrink: 0 }} />
              {level}
            </span>
          ))}
        </div>
      </section>

      <section className="r-px r-section-pad" style={{ padding: '72px 48px', borderBottom: '1px solid #2A2A2A' }}>
        <SectionHeader
          label="WHAT'S INCLUDED"
          heading={<>Built to compete.</>}
          desc="Every block is tested at both ends. You see the improvement in numbers, not just feel it."
          headingSize={44}
        />
        <FeatureGrid items={INCLUDED} />
      </section>

      <PricingCards items={PRICING} />
      <p className="r-px r-instalment-note" style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.12em', marginTop: -40, marginBottom: 0, paddingLeft: 48, paddingRight: 48, paddingBottom: 40, borderBottom: '1px solid #2A2A2A' }}>
        Instalment plans: Pre-season splits into 2 × SGD 1200 / month · Off-season splits into 2 × SGD 2160 / month
      </p>

      <ServiceTestimonial
        imageSrc="/img/performance-testimonial.jpg"
        imageAlt="Football athlete training"
        imagePosition="center 40%"
        quote="My sprint numbers improved by 8% across a 12-week block. More importantly, the testing meant I could actually see it rather than just feel it."
        initial="R" name="Reuben Ng" role="FOOTBALL · SINGAPORE"
      />

      <FAQBar label="HAVE QUESTIONS ABOUT PERFORMANCE?" href="/faq?tab=performance" />

      <CTASection
        heading="Start with a baseline."
        body="Every block starts with a test. Book one and we find out where you stand before we build anything."
        bookHref="/book?service=performance"
        bookLabel="Book a consult"
        imageSrc="/img/performance-cta.jpg"
        imagePosition="center 75%"
      />

      <ServiceCrosslinks items={CROSSLINKS} />

    </PageShell>
  )
}
