import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ServiceHero from '@/components/ui/ServiceHero'
import ServiceTestimonial from '@/components/ui/ServiceTestimonial'
import PricingCards from '@/components/ui/PricingCards'
import CTASection from '@/components/ui/CTASection'
import ServiceCrosslinks from '@/components/ui/ServiceCrosslinks'
import SectionHeader from '@/components/ui/SectionHeader'
import FAQBar from '@/components/ui/FAQBar'
import FeatureGrid from '@/components/ui/FeatureGrid'
import type { PricingItem, FeatureItem, CrosslinkItem } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Training | Rebuilt Singapore',
  description: 'Personal training in Singapore. Structured programmes, honest coaching and measurable progress for any starting point.',
  openGraph: {
    title: 'Training | Rebuilt Singapore',
    description: 'Personal training in Singapore. A structured plan, honest feedback and measurable progress — whatever shape you start in.',
  },
}

const PRICING: PricingItem[] = [
  { type: 'One to one',  price: 'SGD 140', sub: 'per session · 20-session block', href: '/book?service=strength',   featured: false, features: ['Programme written for you', 'Technique coached every set', 'Single session: SGD 155'] },
  { type: 'Pairs',       price: 'SGD 90',  sub: 'per person · 20-session block',  href: '/book?service=pairs',      featured: true,  features: ['Two people, one coach', 'Same plan, shared sessions', 'Single session: SGD 120 per person'] },
  { type: 'Small group', price: 'SGD 70',  sub: 'per person · 20-session block',  href: '/book?service=smallgroup', featured: false, features: ['Three to five people', 'Coached, not just supervised', 'Single session: SGD 100 per person'] },
]

const INCLUDED: FeatureItem[] = [
  { num: '01', title: 'Personal coaching',  desc: 'Every session coached 1-on-1. Technique corrected, sets tracked, effort counted.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
  { num: '02', title: 'Programme design',   desc: 'Built around your goals and schedule. Updated as you progress.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M17 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg> },
  { num: '03', title: 'Nutrition guidance', desc: 'Practical advice aligned with your training. No rigid plans, no tracking apps.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> },
  { num: '04', title: 'Progress tracking',  desc: 'Strength numbers, body composition, performance goals. All logged.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { num: '05', title: 'Ongoing support',    desc: 'The programme adapts when life gets in the way. Consistent results across inconsistent weeks.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { num: '06', title: 'Safe progression',   desc: 'Load managed so you build without breaking. Injury prevention is built in.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
]

const CROSSLINKS: CrosslinkItem[] = [
  { label: 'Rehab',         href: '/rehab',       desc: 'Training around an existing injury or coming back from surgery? The rehab programme is designed exactly for that.' },
  { label: 'Performance',   href: '/performance', desc: 'Playing sport seriously? Performance blocks are built around testing so your results are measured, not guessed.' },
  { label: 'Physiotherapy', href: '/physio',      desc: 'Working through pain or recovering from an injury? Physiotherapy at Rebuilt runs through our partner Rehab & Beyond.' },
]

export default function StrengthPage() {
  return (
    <div style={{ fontFamily: 'Archivo,Helvetica,Arial,sans-serif', background: '#0c0e14', color: '#f2f4f7', minHeight: '100vh' }}>
      <Navbar activePage="strength" />

      <ServiceHero

        imageSrc="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=1400&q=85"
        imageAlt="Personal training"
        heading={<>Train with a purpose.</>}
        subheading="A plan, honest feedback and measurable progress. Whatever shape you start in."
        bookHref="/book?service=strength"
        bookLabel="Book a consult"
      />

      <section className="r-px" style={{ padding: '64px 48px', borderBottom: '1px solid #212429', background: '#09090d' }}>
        <SectionHeader
          label="WHAT'S INCLUDED"
          heading={<>Built around your goals.</>}
          desc="Whatever you are working toward. A structured plan built around your goals, not a generic template."
        />
        <FeatureGrid items={INCLUDED} />
      </section>

      <PricingCards items={PRICING} />

      <ServiceTestimonial
        imageSrc="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80"
        imageAlt="Training session"
        quote="Three months in and I am lifting more than I ever have. The programme adapts when life gets in the way, and you can always see exactly where you stand."
        initial="S" name="Sarah K." role="TRAINING · 3-MONTH BLOCK"
      />

      <FAQBar label="HAVE QUESTIONS ABOUT TRAINING?" href="/faq?tab=training" />

      <CTASection
        heading="Show up for session one."
        body="No induction. No assessment fee. Just a session where we find out what you need and start building it."
        bookHref="/book?service=strength"
        bookLabel="Book a consult"
        imageSrc="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80"
        imagePosition="center 30%"
      />

      <ServiceCrosslinks items={CROSSLINKS} />

      <Footer />
    </div>
  )
}
