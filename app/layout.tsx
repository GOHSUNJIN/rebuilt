import type { Metadata, Viewport } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'
import { SITE } from '@/lib/site'
import WhatsAppButton from '@/components/effects/WhatsAppButton'
import ScrollProgress from '@/components/effects/ScrollProgress'
import CursorGlow from '@/components/effects/CursorGlow'
import ThemePlayground from '@/components/effects/ThemePlayground'
import BackToTop from '@/components/ui/BackToTop'
import AnalyticsWrapper from './_components/AnalyticsWrapper'
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
  title: { default: 'Rebuilt Academy', template: '%s | Rebuilt Academy' },
  description:
    'Rebuilt Academy: coached rehabilitation, training and sports performance in Singapore.',
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Rebuilt Academy',
    description: 'Coached rehabilitation, training and sports performance in Singapore.',
    url: SITE.url,
    siteName: 'Rebuilt Academy',
    locale: 'en_SG',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Rebuilt Academy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rebuilt Academy',
    description: 'Coached rehabilitation, training and sports performance in Singapore.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/rebuilt-mark.svg',
    shortcut: '/rebuilt-mark.svg',
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Rebuilt Academy',
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
        style={{ margin: 0, background: '#0B0B0B', minHeight: '100vh' }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <CursorGlow />
        <ScrollProgress />
        <div id="main-content">{children}</div>
        <BackToTop />
        <WhatsAppButton />
        {process.env.NODE_ENV === 'development' && <ThemePlayground />}
        <AnalyticsWrapper />
        <SpeedInsights />
      </body>
    </html>
  )
}
