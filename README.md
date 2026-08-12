# Rebuilt Singapore

Website for **Rebuilt**, a gym and rehab studio operating across three Core Collective locations in Singapore. The studio offers coached rehabilitation, personal training, sports performance, and physiotherapy in partnership with Rehab & Beyond.

Built with Next.js 15 App Router.

---

## What the site does

- Four service pages (Rehab, Training, Performance, Physiotherapy) with feature grids, pricing, testimonials, and FAQ links
- Physiotherapy delivered in partnership with Rehab & Beyond, with a waitlist for upcoming in-house physiotherapy
- Five-step booking wizard that pre-fills a WhatsApp or email message for the studio to confirm
- Team bios on the About page with slide-out detail panels
- Contact form that delivers enquiries to the studio inbox via Resend
- Three location cards with slide-in detail panels and embedded Google Maps
- FAQ page with category tabs and full-text search
- SEO: metadata, Open Graph image, JSON-LD structured data, sitemap, robots.txt

---

## Tech stack

| What | Why |
|---|---|
| **Next.js 15** | App Router, server actions, static page generation |
| **TypeScript** | Type safety across data, props and form handling |
| **Vercel** | Hosting and automatic redeploys on push |
| **Resend** | Email delivery for the contact form |
| **Vercel Analytics + Speed Insights** | Traffic and performance monitoring |

---

## Local setup

**Requires Node.js 18+**

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY
npm run dev                  # http://localhost:3000
```

```bash
npm run build    # production build
npx tsc --noEmit # type-check without building
npm run lint     # ESLint
```

---

## Environment variables

| Variable | Purpose | Where to get it |
|---|---|---|
| `RESEND_API_KEY` | Sends contact form emails | resend.com |

Without this key the contact form silently no-ops — no error shown to the user, no email sent. Set it in Vercel → Project Settings → Environment Variables before going live.

---

## File structure

```
app/
  layout.tsx              Root layout — font, analytics, JSON-LD, skip link, global overlays
  page.tsx                Home page — hero, stats, services, reviews, CTA
  globals.css             All global styles, animations and responsive CSS classes
  error.tsx               Branded runtime error boundary page
  not-found.tsx           404 page
  opengraph-image.tsx     Social share image (auto-generated, 1200×630)
  robots.ts               SEO robots.txt
  sitemap.ts              SEO sitemap

  about/page.tsx          About page — team bios, location gallery, contact form
  book/page.tsx           Booking orchestrator — state, URL params, WhatsApp/Gmail URL
                          building, step navigation. Steps live in components/booking/
  faq/page.tsx            FAQ page
  performance/page.tsx    Sports performance service page
  physio/page.tsx         Physiotherapy — Rehab & Beyond partnership + in-house waitlist
  rehab/page.tsx          Rehabilitation service page
  strength/page.tsx       Personal training service page
  privacy/page.tsx        Privacy policy (PDPA)
  terms/page.tsx          Terms and conditions

  actions/
    contact.ts            Server action — rate-limited, sanitised, sends via Resend

components/
  layout/
    Navbar.tsx            Fixed nav — auto-hides on scroll down, returns on scroll up
    Footer.tsx            Footer — separate desktop and mobile layouts

  ui/                     Small, reusable pieces used across multiple pages
    CTASection.tsx          Two-column call-to-action with background image
    CopyText.tsx            Click-to-copy wrapper (email, phone)
    CountUp.tsx             Animated number counter
    FAQAccordion.tsx        Expandable accordion items
    FAQBar.tsx              One-line FAQ teaser strip
    FeatureGrid.tsx         3-col icon/title/desc grid
    LocationMap.tsx         Embedded Google Maps iframe (About page static map)
    OpenStatus.tsx          Live open/closed indicator (Singapore time)
    PricingCards.tsx        Pricing grid with featured-tier highlight
    SectionHeader.tsx       Label + h2 + optional description
    ServiceCrosslinks.tsx   Related services link strip
    ServiceTestimonial.tsx  Full-width client quote with photo

  sections/               Large, page-level section components
    FAQContent.tsx          Full FAQ UI — category tabs, accordion, live search
    LocationDrawer.tsx      Location cards with slide-in detail panel and map
    Marquee.tsx             Scrolling text ticker (home page stats strip)
    PhysioForm.tsx          Physio waitlist / booking form (WhatsApp + email)
    ReviewsSection.tsx      Star rating strip with shuffled client reviews
    ServiceHero.tsx         Full-bleed hero for service pages
    TeamBioModal.tsx        Team grid with slide-out bio drawer

  forms/
    ContactForm.tsx         About page enquiry form (server action, rate-limited)

  effects/                Fixed overlays, animations, dev tools
    CursorGlow.tsx          Mouse-follow glow effect (desktop only)
    MobileBookingBar.tsx    Fixed bottom booking bar (mobile only, hidden on /book)
    ScrollProgress.tsx      Scroll-depth progress bar at page top
    ScrollToTop.tsx         Back-to-top button
    ThemePlayground.tsx     Accent colour picker — dev mode only
    WhatsAppButton.tsx      Floating WhatsApp CTA

  booking/                Booking wizard steps (imported by app/book/page.tsx)
    types.ts                Shared TypeScript interfaces for all step props
    Step1.tsx               Service selection — category tabs, PT format, service picker
    Step2.tsx               Coach preference
    Step3.tsx               Time slots — day + time grid, location preference, SGT noted
    Step4.tsx               Contact details — name, email, phone, notes (char counter)
    Step5.tsx               Review and send — summary table, WhatsApp / Gmail buttons
    Done.tsx                Confirmation screen

lib/
  site.ts       Contact details, locations, hours, social links
  team.ts       Team member data — name, role, bio paragraphs, credentials
  types.ts      Shared TypeScript interfaces (PricingItem, FeatureItem, CrosslinkItem)
  faqData.ts    All FAQ content — tab list and questions by category
  bookData.ts   Booking form data — services, coaches, time slots, step config, isValidEmail
  styles.ts     Shared inline style objects for form inputs and labels
  hooks.ts      useScrollLock — prevents body scroll when a drawer is open

public/
  rebuilt-mark.svg     Logo mark (nav, footer, hero overlays)
  instagram-pfp.jpg    Instagram profile photo
```

---

## How to update content

**Contact details, phone, email, addresses, hours, social links** → `lib/site.ts`. Change once, updates everywhere.

**Team bios** → `lib/team.ts`. Each member has `role`, `name`, `short` (card preview text), `bio` (array of paragraphs) and `credentials`. To add real photos, update `TeamBioModal.tsx` to use `next/image` instead of the initials placeholder.

**Pricing** → `PRICING` array at the top of each service page (`app/rehab/page.tsx`, `app/strength/page.tsx`, `app/performance/page.tsx`, `app/physio/page.tsx`).

**FAQ content** → `lib/faqData.ts`. Organised by the same category tabs shown on the FAQ page.

**Booking options** (services, coaches, time slots) → `lib/bookData.ts`.

**Studio photos** → replace Unsplash URLs in each service page and `app/about/page.tsx` with real photos. Upload to `public/` and reference as `/filename.jpg`.

---

## Responsive CSS classes

All breakpoints are in `globals.css`. Add these `className` values in JSX — the CSS handles the rest at `≤768px` (and `≤480px` for small phones).

### Layout

| Class | Desktop | Mobile (≤768px) |
|---|---|---|
| `.r2` | 2-column grid | 1 column |
| `.r3` | 3-column grid | 1 column |
| `.r4` | 4-column grid | 2 columns |
| `.r6` | 6-column grid | 3 columns |
| `.r-px` | 48px side padding | 20px (16px at ≤480px) |
| `.r-hide` | visible | hidden |

### Typography

| Class | Desktop | Mobile (≤768px) | ≤480px |
|---|---|---|---|
| `.r-h1` | 84–108px | 40px | 32px |
| `.r-h2` | ~64px | 26px | 22px |
| `.r-section-h2` | 44–48px | 34px | 28px |

### Spacing

| Class | Purpose |
|---|---|
| `.r-section-pad` | Reduces 64–92px vertical padding → 44px |
| `.r-tall-pad` | Reduces 52–88px vertical padding → 44px |
| `.r-feature-cell` | Reduces 32px cell padding → 20px |
| `.r-pricing-card` | Reduces pricing card inner padding |

### Component-specific

| Class | Mobile behaviour |
|---|---|
| `.r-hero` | Auto height, min 500px |
| `.r-hero-badge` | Hidden |
| `.r-team-img` | Height capped at 220px |
| `.r-location-card` | Height capped at 280px |
| `.r-cta-img` | Min-height 200px |
| `.r-about-img` | Min-height 220px |
| `.r-partner-img` | Min-height 240px |
| `.r-inhouse-grid` | Gap reduced when stacked |
| `.r-reviews-scroll` | Horizontal swipe carousel |
| `.r-physio-btns` | Stacks buttons vertically |
| `.r-btn-full` | Full-width button |

### Booking page

| Class | Mobile behaviour |
|---|---|
| `.book-content` | Compact vertical padding |
| `.book-nav` | Stacked, full-width buttons |
| `.book-step-label` | Hidden (step numbers only) |
| `.book-page-nav` | Reduced padding |

---

## Deployment

Hosted on Vercel. Pushes to `main` redeploy automatically.

```bash
vercel        # Preview deploy — isolated URL, does not affect production
vercel --prod # Production deploy
```

Ensure `RESEND_API_KEY` is set in Vercel environment variables before going to production.

---

## What's not built yet

**Real booking calendar** — the current flow sends a pre-filled WhatsApp or email message. A live calendar integration (Calendly, Acuity, or custom-built) would let clients book and get instant confirmation without manual follow-up from the studio.

**Online payments** — no payment collected at booking. Stripe or PayNow integration would reduce no-shows and simplify admin.

**Client portal** — session history, programme notes, upcoming bookings. Requires a database (Supabase or similar) and authentication.

**Blog or resources section** — articles on rehab and training would improve SEO and demonstrate expertise to potential clients.

**Live Instagram feed** — the home page grid uses placeholder photos. The Instagram Graph API could pull in real posts automatically.

**WhatsApp Business API** — replace the current basic link with automated replies, booking confirmations and follow-ups.
