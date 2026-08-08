# Rebuilt Singapore

This is the website for **Rebuilt Singapore**, a gym and rehabilitation studio based in Tanjong Pagar, Singapore. The studio offers three services: coached rehabilitation (for people recovering from injuries or surgery), personal training, and sports performance coaching.

The site is a marketing and booking website. It explains what the studio does, introduces the team, and lets visitors send a booking request.

---

## What the site does

- Describes each service (Rehab, Personal Training, Performance) with pricing
- Lets visitors submit a booking request through a step-by-step form, which sends a pre-filled message to the studio via WhatsApp or email
- Shows the team with bios that open in a slide-out panel
- Has a contact form that delivers enquiries directly to the studio's email inbox
- Has a waitlist page for an upcoming physiotherapy service
- Handles SEO automatically so the studio appears in Google searches

---

## Technology used (plain language)

| What | Why |
|---|---|
| **Next.js 15** | The framework that builds and runs the website. Handles routing, performance and server logic. |
| **TypeScript** | A version of JavaScript with stricter rules: helps catch mistakes before they reach the live site. |
| **Vercel** | Where the website is hosted. Automatically redeploys every time the code is updated. |
| **Resend** | A third-party email service used to deliver contact form submissions to the studio's inbox. Requires an API key (see setup below). |
| **Vercel Analytics** | Tracks visitor numbers and page views with no extra setup needed. |

---

## Setting up locally

These steps are for developers who want to run the site on their own computer.

**Requirements:** Node.js 18 or later installed.

```bash
# 1. Install dependencies
npm install

# 2. Create a local environment file
#    (copy the example, then fill in your Resend API key)
cp .env.example .env.local

# 3. Start the development server
npm run dev
# Site will be available at http://localhost:3000
```

Other useful commands:

```bash
npm run build     # Build the site for production
npx tsc --noEmit  # Check for TypeScript errors without building
npm run lint      # Check for code style issues
```

---

## Environment variables

The site needs one secret to function fully in production:

| Variable | What it does | Where to get it |
|---|---|---|
| `RESEND_API_KEY` | Allows the contact form to send emails | Create a free account at resend.com |

**Without this key**, the contact form will appear to work but will not actually send any emails. Set this in Vercel under Project Settings > Environment Variables before going live.

---

## File structure explained

```
app/                        All pages live here
  layout.tsx                The wrapper around every page (font, analytics, SEO metadata)
  page.tsx                  Home page
  not-found.tsx             Custom page shown when someone visits a URL that does not exist
  opengraph-image.tsx       The image shown when a link is shared on WhatsApp or social media
  robots.ts                 Tells Google which pages to index
  sitemap.ts                A map of all pages, submitted to Google automatically
  globals.css               Global styles, animations, and mobile layout rules
  about/page.tsx            About page (team, studio photos, contact form, map)
  book/page.tsx             Booking page (4-step flow, sends via WhatsApp or email)
  faq/page.tsx              FAQ page (category sidebar + full-text search)
  performance/page.tsx      Sports performance service page
  physio/page.tsx           Physiotherapy page with partner section and waitlist form
  privacy/page.tsx          Privacy policy
  rehab/page.tsx            Rehabilitation service page
  strength/page.tsx         Personal training service page
  terms/page.tsx            Terms and conditions
  actions/
    contact.ts              Server-side logic that sends contact form emails via Resend

components/
  layout/
    Navbar.tsx              Navigation bar (hides on scroll down, shows on scroll up)
    Footer.tsx              Footer with social links, open/closed status, and legal links
  ui/
    ServiceHero.tsx         The large image + heading block at the top of each service page
    SectionHeader.tsx       Shared mono label + h2 + optional description (used on all service pages)
    FeatureGrid.tsx         3-column icon/title/desc grid (used on all service pages)
    FAQBar.tsx              "Have questions?" strip linking to the relevant FAQ tab
    PricingCards.tsx        Pricing grid (1–3 columns, highlights featured tier)
    ServiceCrosslinks.tsx   "Also at Rebuilt" link strip at the bottom of service pages
    FAQContent.tsx          Full FAQ page UI (tabbed sidebar + real-time search)
    FAQAccordion.tsx        Expandable FAQ accordion used inside FAQContent
    FAQSection.tsx          Compact FAQ accordion for inline use on other pages
    ServiceTestimonial.tsx  Full-width client quote with photo background
    CTASection.tsx          Full-width CTA with background image
    ContactForm.tsx         The enquiry form on the About page
    PhysioForm.tsx          Waitlist/booking form for physio pages
    ReviewsSection.tsx      Star reviews strip
    TeamBioModal.tsx        The team grid with slide-out bio panels (data lives in lib/team.ts)
    Marquee.tsx             The scrolling text strip between sections
    LocationMap.tsx         Embedded Google Maps iframe
    LocationDrawer.tsx      Mobile slide-in location detail
    CountUp.tsx             Animated number (used for stats like "300+ clients")
    CopyText.tsx            Click-to-copy (used on phone number and email address)
    OpenStatus.tsx          Shows "Open now" or "Closed" based on Singapore time
    WhatsAppButton.tsx      Floating WhatsApp button in the bottom right corner
    MobileBookingBar.tsx    Fixed bottom booking bar (mobile only)
    CursorGlow.tsx          Subtle glow that follows the mouse cursor
    ScrollProgress.tsx      Thin gold bar at the top of the screen showing scroll progress
    ScrollToTop.tsx         Scroll-to-top button

lib/
  site.ts                   All contact details, addresses, opening hours and social links in one place
  types.ts                  Shared TypeScript interfaces: PricingItem, CrosslinkItem, FeatureItem, FAQItem
  faqData.ts                All FAQ content (FAQ_TABS, ALL_FAQS) — imported by FAQContent
  bookData.ts               All booking form data: service lists, coach options, time slots, step labels
  team.ts                   Team member data (name, role, bio, photo) — imported by TeamBioModal
  styles.ts                 Shared inline style objects for form inputs and labels
  hooks.ts                  Shared React hooks (useScrollLock — prevents page scroll when a panel is open)

public/
  rebuilt-mark.svg          The logo mark used in the navigation bar and footer
```

---

## How to update common things

All contact details, the phone number, email address, Instagram link and studio address are stored in one file: **`lib/site.ts`**. Change them there and they update automatically across the entire site.

**Update opening hours**: edit the `hours` array in **`lib/site.ts`**. This updates the footer, about page, and anywhere else hours are shown.

**Update team bios**: edit the `TEAM` array in **`lib/team.ts`**. Replace the placeholder photo URLs with real photos once available.

**Update pricing**: edit the `PRICING` array at the top of each service page (`app/rehab/page.tsx`, `app/strength/page.tsx`, `app/performance/page.tsx`, `app/physio/page.tsx`). The `PricingItem` type is defined in `lib/types.ts`.

**Update FAQ content**: edit `lib/faqData.ts`. All categories and questions live there and are shared between the FAQ page and search.

**Update booking options**: edit `lib/bookData.ts`. This file controls the service list, coach roster, available time slots, and step labels shown in the booking form.

**Update the Google reviews link**: search for `google.com/search?q=Rebuilt+Singapore` in `app/page.tsx` and replace with the direct link to the studio's Google Business Profile.

**Replace studio photos**: swap the Unsplash image URLs in `app/about/page.tsx` (facility grid) and the service pages with real photos. Upload real photos to the `public/` folder and reference them as `/filename.jpg`.

---

## Mobile layout

The site is fully responsive. Layout classes in `globals.css` handle the breakpoints:

| Class | Desktop | Mobile (under 768px) |
|---|---|---|
| `.r2` | 2-column grid | 1 column (stacked) |
| `.r3` | 3-column grid | 1 column (stacked) |
| `.r4` | 4-column grid | 2 columns |
| `.r6` | 6-column grid | 3 columns |
| `.r-hide` | Visible | Hidden |
| `.r-px` | 48px side padding | 20px side padding |
| `.r-h1` | Large heading (84–108px) | 44px |
| `.r-h2` | Medium heading | 30px |
| `.book-content` | Normal padding | Compact top/bottom padding for booking page |
| `.book-nav` | Row layout | Stacked column layout, full-width buttons |

---

## Deployment

The site is deployed on Vercel and connected to a Git repository. Every push to the main branch automatically redeploys.

```bash
vercel        # Deploy a preview (does not affect the live site)
vercel --prod # Deploy to production (live site)
```

Make sure `RESEND_API_KEY` is added in Vercel environment variables before going to production.

---

## Potential future improvements

These are features that could be added as the business grows:

**Booking system**
The current booking flow sends a WhatsApp or email message: there is no real-time calendar. Integrating a booking platform (such as Calendly, Acuity or a custom-built calendar) would let clients book and pay instantly without the studio needing to reply manually.

**Online payments**
Add Stripe or PayNow integration so clients can pay a deposit or full session fee at the time of booking, reducing no-shows.

**Client portal**
A login area where clients can view their session history, upcoming bookings and their programme notes. Would require a database (such as Supabase or PlanetScale) and authentication.

**Physiotherapy launch**
The `/physio` page is currently a coming-soon waitlist. When physiotherapy launches, it will need its own full service page with pricing, team profiles and a booking flow matching the other service pages.

**Blog or resources section**
Articles on rehab, training and performance would help the studio rank in Google searches and demonstrate expertise to potential clients.

**Real Instagram feed**
The Instagram grid on the home page currently uses placeholder photos. It could be connected to the real Instagram account via the Instagram Graph API to show live posts automatically.

**WhatsApp Business integration**
Replace the current basic WhatsApp link with WhatsApp Business API for automated replies, booking confirmations and follow-ups.

**Multilingual support**
Singapore has a large Mandarin-speaking population. Adding a Chinese language version of the site (using Next.js internationalisation) could expand the client base.
