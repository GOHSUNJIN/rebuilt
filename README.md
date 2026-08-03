# Rebuilt Singapore

Coaching-led rehabilitation, personal training, and sports performance — Singapore.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Inline styles + `globals.css` utilities
- **Fonts**: Archivo (Google Fonts)
- **Images**: Unsplash via `next/image`
- **Deployment**: Vercel

## Project structure

```
app/
  layout.tsx              # Site shell, metadata, fonts
  page.tsx                # Home
  not-found.tsx           # 404
  opengraph-image.tsx     # Auto-generated OG image (1200×630)
  robots.ts               # robots.txt
  sitemap.ts              # sitemap.xml
  about/page.tsx
  book/page.tsx
  performance/page.tsx
  physio/page.tsx         # Coming soon — waitlist
  privacy/page.tsx
  rehab/page.tsx
  strength/page.tsx
  terms/page.tsx

components/
  layout/
    Navbar.tsx
    Footer.tsx
  ui/
    ContactForm.tsx       # Form with success state
    FadeIn.tsx            # Scroll-triggered fade
    FAQAccordion.tsx
    WaitlistTags.tsx      # Physio waitlist tag toggles

lib/
  site.ts                 # All contact details, URLs, social handles

public/
  rebuilt-mark.svg        # Logo mark (used as favicon)
  logo.jpeg
```

## Site config

All contact details, social handles, address, and URLs live in **`lib/site.ts`** — update once, applies everywhere.

```ts
// lib/site.ts
export const SITE = {
  contact: {
    email: 'hello@rebuilt.sg',
    phone: '+65 8123 4567',
    whatsapp: 'https://wa.me/6581234567',
  },
  social: {
    instagram: 'https://www.instagram.com/rebuiltsg/',
  },
  address: {
    full: '12 Tanjong Pagar Road, #02-01, Singapore 088443',
    ...
  },
}
```

## Dev

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Deployment

```bash
vercel           # Preview
vercel --prod    # Production
```
