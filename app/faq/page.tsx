import type { Metadata } from 'next'
import PageShell from '@/components/layout/PageShell'
import FAQContent from '@/components/sections/FAQContent'
import { ALL_FAQS } from '@/lib/faqData'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about rehab, training, sports performance and physiotherapy at Rebuilt Academy.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | Rebuilt Academy',
    description: 'Common questions about rehabilitation, training, sports performance and physiotherapy at Rebuilt Academy.',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: Object.values(ALL_FAQS).flat().map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export default function FAQPage() {
  return (
    <PageShell activePage="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQContent />
    </PageShell>
  )
}
