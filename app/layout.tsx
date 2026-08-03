import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'
import { SITE } from '@/lib/site'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ScrollProgress from '@/components/ui/ScrollProgress'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: { default: 'Rebuilt', template: '%s | Rebuilt' },
  description:
    'Rebuilt: coached rehabilitation, 1-to-1 personal training and sports performance in Singapore.',
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: 'Rebuilt',
    description: 'Coached rehabilitation, personal training and sports performance in Singapore.',
    url: SITE.url,
    siteName: 'Rebuilt',
    locale: 'en_SG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rebuilt',
    description: 'Coached rehabilitation, personal training and sports performance in Singapore.',
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
    streetAddress: '12 Tanjong Pagar Road, #02-01',
    addressLocality: 'Singapore',
    postalCode: '088443',
    addressCountry: 'SG',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 1.2775,
    longitude: 103.8445,
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
  priceRange: 'SGD 70–150',
  currenciesAccepted: 'SGD',
  paymentAccepted: 'PayNow',
  hasMap: SITE.address.mapsUrl,
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
        <ScrollProgress />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
