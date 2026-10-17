import type { Metadata } from 'next'
import BookClient from './_client'

export const metadata: Metadata = {
  title: 'Book a Session',
  description: 'Book a rehabilitation, personal training, sports performance or physiotherapy consultation at Rebuilt Academy Singapore.',
  alternates: { canonical: '/book' },
  openGraph: {
    title: 'Book a Session',
    description: 'Book a rehabilitation, personal training, sports performance or physiotherapy consultation at Rebuilt Academy Singapore.',
  },
}

export default function BookPage() {
  return <BookClient />
}
