# Rebuilt

Coaching-led rehabilitation, personal training, and sports performance — Singapore.

## Overview

Rebuilt is a single-studio facility in Singapore offering:
- **Rehab** — coached return to sport and daily function after injury or surgery
- **Personal Training** — one-to-one, pairs, and small group coaching
- **Sports Performance** — testing, training blocks, and retesting for athletes
- **Physiotherapy** — in-house assessment and treatment (coming soon)

## Development

```bash
npm run dev     # local dev server at http://localhost:3000
npm run build   # production build
npm run lint    # lint check
```

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Live / public site |
| `dev`  | In-progress work (preview URL per push) |

Work on `dev`, merge to `main` when ready to go live.

## Project structure

```
app/
  page.tsx           Home — hero, service pillars, approach, reviews, CTA
  rehab/             Rehab service page
  strength/          Personal training page
  performance/       Sports performance page
  physio/            Physiotherapy coming-soon page
  about/             About + contact form
  book/              Multi-step booking flow (service → coach → time → details → deposit)
  privacy/           Privacy policy
  terms/             Terms of service
  icon.svg           Favicon (rounded-square, dark background)

components/
  layout/
    Navbar.tsx       Sticky glassmorphic navbar with mobile toggle
    Footer.tsx       Site footer with social links
  ui/
    FadeIn.tsx       Intersection-Observer scroll-in animation wrapper
    FAQAccordion.tsx Interactive accordion for FAQ sections

public/
  rebuilt-mark.svg   SVG R-in-circle mark (transparent background, used in nav + footer)
```

## Images

All photos are sourced from Unsplash CDN (`images.unsplash.com`). Allowed in `next.config.ts` via `remotePatterns`. Replace with owned photography when available by swapping the `src` URLs in each page.

## Booking / payment

The booking flow (step 5) shows PayNow payment instructions. To integrate a real payment processor, replace the PayNow block in `app/book/page.tsx` (step 5 panel) with a Stripe Elements or similar embed.

## Things still to do

- Wire up the contact form on `/about` to a backend (Formspree, Resend, or similar)
- Add real Google Maps embed to the contact section
- Replace Unsplash photos with owned studio and coach photography
- Add real Instagram profile URL to footer social link
- Add WhatsApp number to footer WhatsApp link
- Add Google Reviews embed or pull live rating
- Physiotherapy page content (currently a holding page)
