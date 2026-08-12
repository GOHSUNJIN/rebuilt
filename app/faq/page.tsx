import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FAQContent from '@/components/sections/FAQContent'

export const metadata: Metadata = {
  title: 'FAQ | Rebuilt Singapore',
  description: 'Answers to common questions about rehab, training, sports performance and physiotherapy at Rebuilt Singapore.',
  openGraph: {
    title: 'FAQ | Rebuilt Singapore',
    description: 'Common questions about rehabilitation, training, sports performance and physiotherapy at Rebuilt Singapore.',
  },
}

export default function FAQPage() {
  return (
    <div style={{ fontFamily: 'Archivo,Helvetica,Arial,sans-serif', background: '#0c0e14', color: '#f2f4f7', minHeight: '100vh' }}>
      <Navbar activePage="faq" />
      <FAQContent />
      <Footer />
    </div>
  )
}
