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
  title: 'Rehabilitation',
  description: 'Coached rehabilitation in Singapore for people coming back from injury or surgery. Post-surgery, long-standing pain and return to sport.',
  openGraph: {
    title: 'Rehabilitation',
    description: 'Coached rehab for people coming back from injury or surgery. One team from assessment to return to sport.',
  },
}

const PRICING: PricingItem[] = [
  { type: 'Assessment',        price: 'SGD 100', sub: '45 min',                    href: '/book?service=rehab', featured: false, features: ['Movement and load assessment', 'Full injury history review', 'Programme written same day'] },
  { type: 'Single session', price: 'SGD 140', sub: '60 min',                    href: '/book?service=rehab', featured: false, features: ['Coached session, tracked weekly', 'Adjusted as you progress', 'Full session notes kept'] },
  { type: 'Block of 10',    price: 'SGD 120', sub: 'per session · 10 sessions', href: '/book?service=rehab', featured: true,  features: ['Save vs single sessions', 'Priority booking guaranteed', 'Reviewed every 4 weeks'] },
]

const INCLUDED: FeatureItem[] = [
  { num: '01', title: 'Rehabilitation coaching', desc: 'Every session is coached 1-on-1. Nothing is left to figure out on your own.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
  { num: '02', title: 'Programme design',        desc: 'Written for your injury and where your body is today. Not a generic template.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M17 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg> },
  { num: '03', title: 'Progress tracking',       desc: 'Tested every 4 weeks. You see the numbers move, not just feel it.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { num: '04', title: 'Safe progression',        desc: 'Load is built in stages. Nothing is added before your body is ready for it.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { num: '05', title: 'Ongoing support',         desc: 'The plan adjusts as you adapt. Nothing is fixed after week one.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { num: '06', title: 'Return-to-sport testing', desc: 'Cleared when the numbers say so, not just a calendar.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
]

const CROSSLINKS: CrosslinkItem[] = [
  { label: 'Training',          href: '/strength',    desc: 'Most rehab clients transition straight into training. No handover, no repetition. Same team, same notes.' },
  { label: 'Performance',       href: '/performance', desc: 'If you are an athlete returning to sport, performance testing closes the gap between gym-fit and field-fit.' },
  { label: 'Physiotherapy',     href: '/physio',      desc: 'Need physiotherapy before or alongside rehab? Rebuilt works in partnership with Rehab & Beyond in the same building.' },
]

export default function RehabPage() {
  return (
    <PageShell activePage="rehab">

      <ServiceHero

        imageSrc="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1400&q=85"
        imageAlt="Rehab session"
        heading={<>Back to what<br />you did before.</>}
        subheading="Coached rehabilitation for people coming back from injury or surgery, built around what your body handles today and where you want it to be."
        bookHref="/book?service=rehab"
        bookLabel="Book a consult"
      />

      <section className="r-px r-section-pad" style={{ padding: '64px 48px', borderBottom: '1px solid #212429', background: '#09090d' }}>
        <SectionHeader
          label="WHAT'S INCLUDED"
          heading={<>Built around what<br />you can handle today.</>}
          desc="Full range of motion, not just less pain. Every session is built around what your body can handle today."
        />
        <FeatureGrid items={INCLUDED} />
      </section>

      <PricingCards items={PRICING} />

      <ServiceTestimonial
        imageSrc="https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80"
        imageAlt="Rehab session"
        quote="I came in eight weeks after ACL surgery with no idea what was safe. The testing at the start and end made the whole process feel measured, not guesswork."
        initial="M" name="Marcus T." role="ACL RECONSTRUCTION · RECREATIONAL FOOTBALLER"
      />

      <FAQBar label="HAVE QUESTIONS ABOUT REHAB?" href="/faq?tab=rehab" />

      <CTASection
        heading="Start where you are."
        body="45 minutes. We map out where you are, write the plan and have you started that same week."
        bookHref="/book?service=rehab"
        bookLabel="Book a consult"
        imageSrc="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
      />

      <ServiceCrosslinks items={CROSSLINKS} />

    </PageShell>
  )
}
