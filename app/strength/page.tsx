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
  title: 'Training',
  description: 'Personal training in Singapore. Structured programmes, honest coaching and measurable progress for any starting point.',
  alternates: { canonical: '/strength' },
  openGraph: {
    title: 'Training',
    description: 'Personal training in Singapore. A structured plan, honest feedback and measurable progress, whatever shape you start in.',
  },
}

const PRICING: PricingItem[] = [
  { type: 'One to one',  price: 'SGD 140', sub: 'per session · 10-session block', href: '/book?service=strength',   featured: false, features: ['Programme written for you', 'Technique coached every set', 'Single session: SGD 160 per session'] },
  { type: 'Pairs',       price: 'SGD 90',  sub: 'per person · 10-session block',  href: '/book?service=pairs',      featured: true,  features: ['Two people, one coach', 'Same plan, shared sessions', 'Single session: SGD 120 per person'] },
  { type: 'Small group', price: 'SGD 70',  sub: 'per person · 10-session block',  href: '/book?service=smallgroup', featured: false, features: ['Three to five people', 'Coached, not just supervised', 'Single session: SGD 100 per person'] },
]

const INCLUDED: FeatureItem[] = [
  { num: '01', title: 'Programme design',      desc: 'Built around your goals and schedule. Updated as you progress.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M17 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg> },
  { num: '02', title: 'Personal coaching',     desc: 'Every session coached 1-on-1. Technique corrected, sets tracked, effort counted.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
  { num: '03', title: 'Safe progression',      desc: 'Load managed so you build without breaking. Injury prevention is built in.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { num: '04', title: 'Nutrition guidance',    desc: 'Practical advice aligned with your training. No rigid plans, no tracking apps.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> },
  { num: '05', title: 'Progress tracking',     desc: 'Strength numbers, body composition, performance goals. All logged.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { num: '06', title: 'Fat measurements',      desc: 'Body composition tracked at regular intervals so your results are based on data, not guesswork.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M3 3l18 18M9 9a3 3 0 0 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/></svg> },
  { num: '07', title: 'Before and after photos', desc: 'Progress documented with photos at the start and end of each block so you can see what has changed.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> },
  { num: '08', title: 'Ongoing support',       desc: 'The programme adapts when life gets in the way. Consistent results across inconsistent weeks.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
]

const CROSSLINKS: CrosslinkItem[] = [
  { label: 'Rehab',         href: '/rehab',       desc: 'Training around an existing injury or coming back from surgery? The rehab programme is designed exactly for that.' },
  { label: 'Performance',   href: '/performance', desc: 'Playing sport seriously? Performance blocks are built around testing so your results are measured, not guessed.' },
  { label: 'Physiotherapy', href: '/physio',      desc: 'Working through pain or recovering from an injury? Physiotherapy at Rebuilt runs through our partner Rehab & Beyond.' },
]

export default function StrengthPage() {
  return (
    <PageShell activePage="strength">

      <ServiceHero
        imageSrc="/img/strength-hero.jpg"
        imageAlt="Personal training"
        imagePosition="center 40%"
        heading={<>Train with a purpose.</>}
        subheading="A plan, honest feedback and measurable progress. Whatever shape you start in."
        bookHref="/book?service=strength"
        bookLabel="Book a consult"
      />

      <section className="r-px r-section-pad" style={{ padding: '72px 48px', borderBottom: '1px solid #2A2A2A', background: '#0B0B0B' }}>
        <SectionHeader
          label="WHAT'S INCLUDED"
          heading={<>Built around your goals.</>}
          desc="Whatever you are working toward. A structured plan built around your goals, not a generic template."
          headingSize={44}
        />
        <FeatureGrid items={INCLUDED} cols={4} />
      </section>

      <PricingCards items={PRICING} />

      <ServiceTestimonial
        imageSrc="/img/strength-testimonial.jpg"
        imageAlt="Training session"
        imagePosition="center 30%"
        quote="Three months in and I am lifting more than I ever have. The programme adapts when life gets in the way, and you can always see exactly where you stand."
        initial="M" name="Marcus L." role="TRAINING · 3-MONTH BLOCK"
      />

      <FAQBar label="HAVE QUESTIONS ABOUT TRAINING?" href="/faq?tab=training" />

      <CTASection
        heading="Show up for session one."
        body="No induction. No assessment fee. Just a session where we find out what you need and start building it."
        bookHref="/book?service=strength"
        bookLabel="Book a consult"
        imageSrc="/img/strength-cta.jpg"
        imagePosition="center 30%"
      />

      <ServiceCrosslinks items={CROSSLINKS} />

    </PageShell>
  )
}
