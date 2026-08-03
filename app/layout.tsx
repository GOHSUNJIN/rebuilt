// NOTE: Before running the app, copy `uploads/rebuilt logo.jpeg` to `public/logo.jpeg`
import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: { default: 'Rebuilt', template: '%s | Rebuilt' },
  description:
    'Rebuilt — coached rehabilitation, 1-to-1 personal training and sports performance in Singapore.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={archivo.className}
        style={{ margin: 0, background: '#101113', minHeight: '100vh' }}
      >
        {children}
      </body>
    </html>
  )
}
