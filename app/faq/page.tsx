import type { Metadata } from 'next'
import PageShell from '@/components/layout/PageShell'
import FAQContent from '@/components/sections/FAQContent'

export const metadata: Metadata = {
  title: 'FAQ | Rebuilt Academy',
  description: 'Answers to common questions about rehab, training, sports performance and physiotherapy at Rebuilt Academy.',
  openGraph: {
    title: 'FAQ | Rebuilt Academy',
    description: 'Common questions about rehabilitation, training, sports performance and physiotherapy at Rebuilt Academy.',
  },
}

export default function FAQPage() {
  return (
    <PageShell activePage="faq">
      <FAQContent />
    </PageShell>
  )
}
