import type { Metadata, Viewport } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'
import { SITE } from '@/lib/site'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ScrollProgress from '@/components/ui/ScrollProgress'
import CursorGlow from '@/components/ui/CursorGlow'
import LandscapeBlock from '@/components/ui/LandscapeBlock'
import MobileBookingBar from '@/components/ui/MobileBookingBar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: { default: 'Rebuilt', template: '%s | Rebuilt' },
  description:
    'Rebuilt: coached rehabilitation, training and sports performance in Singapore.',
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: 'Rebuilt',
    description: 'Coached rehabilitation, training and sports performance in Singapore.',
    url: SITE.url,
    siteName: 'Rebuilt',
    locale: 'en_SG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rebuilt',
    description: 'Coached rehabilitation, training and sports performance in Singapore.',
  },
  icons: {
    icon: '/rebuilt-mark.svg',
    shortcut: '/rebuilt-mark.svg',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Rebuilt Singapore',
  description: 'Coached rehabilitation, personal training and sports performance in Singapore.',
  url: SITE.url,
  telephone: SITE.contact.phone,
  email: SITE.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '120 Robinson Rd, #10-01',
    addressLocality: 'Singapore',
    postalCode: '068913',
    addressCountry: 'SG',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 1.2789,
    longitude: 103.8467,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '14:00',
    },
  ],
  priceRange: 'SGD 90-150',
  currenciesAccepted: 'SGD',
  paymentAccepted: 'PayNow',
  hasMap: SITE.locations[0].mapsUrl,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={archivo.className}
        style={{ margin: 0, background: '#101113', minHeight: '100vh' }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LandscapeBlock />
        <CursorGlow />
        <ScrollProgress />
        {children}
        <MobileBookingBar />
        <WhatsAppButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
