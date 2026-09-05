# Rebuilt Academy

Website for **Rebuilt Academy**, a gym and rehab studio across three Core Collective locations in Singapore. The studio offers coached rehabilitation, personal training, sports performance, and physiotherapy in partnership with Rehab & Beyond.

Built with Next.js 15.

---

## Before we go live

A simple checklist of what needs to be sorted before the website launches publicly. Items marked **you** need input from the client. Items marked **handled** will be taken care of on the technical side.

### Photos and content

- [ ] **You** Provide real studio photos (for the hero banners on each service page, the About page, and the location gallery)
- [ ] **You** Provide headshots or photos of Shafiq and Joshua for their team cards
- [ ] **You** Confirm the phone number, email address, studio addresses, and opening hours are all correct
- [ ] **You** Confirm the team bios and credentials for Shafiq and Joshua read exactly as you want them
- [ ] **You** Share 5 to 10 real client reviews (copy from your Google listing) to replace the placeholder ones on the site
- [ ] **You** Provide real Instagram content for the home page grid, or let us know if you want it connected to your account automatically
- [ ] **You** Read through the privacy policy and terms of service and confirm the details are accurate

### Domain and email

- [ ] **You** Purchase a website domain, for example `rebuiltacademy.sg` or `rebuilt.sg`. This costs around SGD 30 to 50 per year. You can buy one from any domain registrar (GoDaddy, Namecheap, or SGNIC for a .sg address).
- [ ] **You** Set up a business email inbox so that `hello@rebuilt.sg` is a real, working address. Google Workspace or Zoho Mail both work and cost around SGD 8 to 20 per month. Without this, contact form messages have nowhere to land.
- [ ] **Handled** Connect the domain to the website once purchased.

### Analytics and admin dashboard

- [ ] **You** Decide on a username and password for the private analytics dashboard at `/admin`. This is where you will see visitor numbers, booking clicks, and traffic sources.
- [ ] **Handled** Set up the analytics connection and admin login using the credentials you provide.

### Final checks before launch

- [ ] **Handled** Test the contact form end to end to confirm enquiries reach the inbox.
- [ ] **Handled** Test the full booking flow to confirm WhatsApp and email links work correctly.
- [ ] **Handled** Check the site on iPhone and Android to confirm everything looks right on mobile.
- [ ] **Handled** Submit the site to Google so it starts appearing in search results.
- [ ] **You** Review the site on the staging link one final time and give the go ahead to launch.
- [ ] **Handled** Flip the site live on your domain.

---

## What Rebuilt Academy does

Rebuilt Academy is built around one idea: rehab, training, and physiotherapy should all be handled by the same team, sharing the same notes, without clients having to repeat themselves or be passed between providers who never speak to each other.

The studio runs four services:

- **Rehabilitation** coached return from injury or surgery, one on one, with progress tested every four weeks
- **Strength Training** personal training in one to one, pairs, or small group formats
- **Sports Performance** preseason, in season, and off season blocks for athletes, with testing at the start and end of every programme
- **Physiotherapy** delivered in partnership with Rehab & Beyond, coordinated directly with the coaching team

Three locations across Singapore at Core Collective: Robinson (CBD), Dempsey Hill, and Katong (East Coast).

---

## What the website does for the business

**Converts visitors into bookings.** Every page has a direct booking path. The five step booking wizard collects all the information the studio needs and sends it as a prefilled WhatsApp or email message, so the team can confirm and reply quickly without chasing the client for details.

**Shows pricing upfront.** All services have transparent pricing listed on their pages. No hidden costs, no contact us for a quote. Clients can compare options and know what they are committing to before reaching out.

**Handles enquiries automatically.** The contact form on the About page sends messages directly to the studio inbox (hello@rebuilt.sg) without anyone needing to check a separate tool. Replies go straight to the client's email.

**Runs on mobile.** The site is fully responsive and works on any phone, tablet, or desktop. The mobile version has a fixed booking bar at the bottom of every page so the booking button is always visible, no matter how far a user has scrolled.

**Tracks what matters.** Vercel Analytics records page views, unique visitors, and booking related actions (button clicks, form submissions, WhatsApp taps). The admin dashboard at /admin shows all of this in one place, with filters for the last 7, 30, or 90 days, or any custom date range.

**Supports search engines.** Every page has proper meta titles, descriptions, and structured data so Google understands what the business does and can show it in search results for relevant queries in Singapore.

**Handles legal compliance.** A full privacy policy and terms of service are included, written for PDPA (Singapore's personal data protection law).

---

## Pages

| Page | What it does |
|---|---|
| `/` | Home page: hero, stats (300+ clients, 4.9 rating), service overview, physio partnership cards, client reviews, Instagram grid, call to action |
| `/rehab` | Rehabilitation service page with features, pricing, testimonial, and FAQ link |
| `/strength` | Personal training page with format options (one to one, pairs, small group), pricing, and features |
| `/performance` | Sports performance page with block types (preseason, in season, off season), testing overview, and instalment plan details |
| `/physio` | Physiotherapy page covering the Rehab & Beyond partnership, session types, pricing, and the upcoming in house physiotherapy |
| `/about` | Team bios (slide out detail panels), all three location cards with maps, and the contact form |
| `/faq` | Frequently asked questions across five categories (General, Rehab, Training, Performance, Physiotherapy) with live search |
| `/book` | Five step booking wizard (see below) |
| `/privacy` | Privacy policy, PDPA compliant |
| `/terms` | Terms and conditions |
| `/admin` | Analytics dashboard, protected by login |

---

## The booking flow

The booking wizard collects everything the studio needs in five steps and then opens a prefilled WhatsApp message or Gmail compose window with all the details already written out.

**Step 1: Service selection**
The client picks a category (Rehab, Training, Performance, Physiotherapy, or Not sure yet). Training shows a second stage for format (one to one, pairs, or small group) and then session type (single or block of 10). All options show pricing.

**Step 2: Coach preference**
The client can choose Shafiq Khalit (Founder, strength and rehab) or Joshua Seow (Co Founder, sports performance), or no preference.

**Step 3: Time slots and location**
The client picks preferred days (Monday to Saturday) and time slots, and selects a preferred location from the three Core Collective sites. Multiple slots can be selected. All times are shown in Singapore time (SGT).

**Step 4: Contact details**
Name, email, and an optional notes field for injury history, goals, or any other context the coach should know before the first session.

**Step 5: Review and send**
The client sees a summary of all their selections. They send the request via WhatsApp or email. The studio confirms the slot and arranges payment separately.

After sending, a confirmation screen shows with the studio's contact details in case there is no reply within 24 hours.

---

## Admin dashboard

The admin dashboard is at `/admin`. It is password protected and shows live traffic and conversion data pulled from Vercel Analytics.

**What it shows:**

- Page views and unique visitors for the selected period
- Average daily views
- Booking rate (how many visitors clicked to book vs. total visitors)
- A traffic chart showing daily trends
- Events log: how many times each key button was clicked (Book, WhatsApp, Contact form, etc.)
- Top pages by traffic
- Top referring sites
- Device breakdown (mobile vs desktop vs tablet)

**Period options:** Last 7 days, 30 days, 90 days, or a custom date range.

Access is protected by a username and password. The session lasts 8 hours, then requires logging in again.

---

## Contact and email

**Contact form** on the About page sends messages directly to hello@rebuilt.sg via Resend. The client's reply to address is set automatically, so replying to the email in the inbox goes straight back to them. The form is rate limited to prevent spam.

**WhatsApp** is available as a floating button on every page. On the booking page, it prefills a full booking request with all the details the client entered in the wizard.

**Click to copy** is available on the email address and phone number wherever they appear on the site.

---

## Pricing summary

| Service | Price |
|---|---|
| Rehab Assessment | SGD 100 (45 min) |
| Rehab Single session | SGD 140 (60 min) |
| Rehab Block of 10 | SGD 120 per session |
| Training One to one (single) | SGD 160 per session |
| Training One to one (block of 10) | SGD 140 per session |
| Training Pairs (single) | SGD 120 per person |
| Training Pairs (block of 10) | SGD 90 per person |
| Training Small group (single) | SGD 100 per person |
| Training Small group (block of 10) | SGD 70 per person |
| Performance Preseason | SGD 100 per session (3x per week, 8 weeks) |
| Performance In season | SGD 140 per session (2x per week, monthly) |
| Performance Off season | SGD 120 per session (3x per week, 12 weeks) |
| Physiotherapy 45 min | SGD 200 |
| Physiotherapy 60 min | SGD 250 |

Performance instalment plans: preseason splits into 2 x SGD 1,200 per month. Off season splits into 2 x SGD 2,160 per month.

---

## How to update content

All business information is in one place. Most updates do not require touching any design or code.

**Contact details, address, hours, social links**
Edit `lib/site.ts`. This file is the single source of truth. Change it once and it updates everywhere on the site automatically.

**Team bios**
Edit `lib/team.ts`. Each team member has a name, role, short description (used on the card), full bio paragraphs, and credentials. To add a real photo, update `components/sections/TeamBioModal.tsx` to use an image file from the `public/` folder instead of the initials placeholder.

**Pricing**
Edit the `PRICING` array at the top of each service page:
- Rehab: `app/rehab/page.tsx`
- Training: `app/strength/page.tsx`
- Performance: `app/performance/page.tsx`
- Physiotherapy: `app/physio/page.tsx`

Also update `lib/bookData.ts` to keep the booking wizard in sync with the service pages.

**FAQ content**
Edit `lib/faqData.ts`. Questions are grouped by the same category tabs shown on the FAQ page. Add or remove items from any category.

**Booking options** (services listed, coaches, time slots)
Edit `lib/bookData.ts`.

**Photos**
All current photos use placeholder images from Unsplash. To replace with real studio photos, upload the image to the `public/` folder and update the `src` value on each page. Photos appear in the hero sections, service pages, and About page.

**Reviews**
Edit `components/sections/ReviewsSection.tsx`. The review pool is a static array. Add or remove review cards from the list.

---

## Tech stack

| What | Purpose |
|---|---|
| Next.js 15 | Website framework. Handles pages, routing, server logic, and performance optimisation |
| TypeScript | Catches errors before they reach the live site |
| Vercel | Hosting. Deploys automatically every time code is pushed |
| Resend | Sends contact form emails to the studio inbox |
| Vercel Analytics | Tracks page views, visitors, and key button clicks |
| Vercel Speed Insights | Monitors how fast the site loads for real visitors |

---

## Local setup

Requires Node.js 18 or later.

```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY and admin credentials
npm run dev                  # opens at http://localhost:3000
```

```bash
npm run build    # production build
npx tsc --noEmit # type check without building
npm run lint     # ESLint
```

---

## Environment variables

| Variable | Purpose | Required |
|---|---|---|
| `RESEND_API_KEY` | Sends contact form emails | Yes (soft fails if missing, no email sent) |
| `ADMIN_USERNAME` | Admin dashboard login | Yes for /admin access |
| `ADMIN_PASSWORD` | Admin dashboard login | Yes for /admin access |
| `ADMIN_SECRET` | Signs the admin session token | Yes for /admin access |
| `VA_TOKEN` | Vercel Analytics API token | Yes for dashboard data |
| `VA_PROJECT_ID` | Vercel project ID | Yes for dashboard data |
| `VA_TEAM_ID` | Vercel team ID | Only for team accounts |

Set all variables in Vercel under Project Settings > Environment Variables before going to production. The `.env.example` file in the repo lists all of them.

If `RESEND_API_KEY` is missing, the contact form shows a success message but no email is sent. If the `VA_*` variables are missing, the admin dashboard shows a setup guide instead of data.

---

## Deployment

Hosted on Vercel. Every push to the `main` branch redeploys the live site automatically.

```bash
vercel        # Preview deploy: generates a unique URL, does not touch production
vercel --prod # Deploy to production
```

---

## File structure

```
app/
  layout.tsx              Root layout: fonts, analytics, JSON-LD schema, skip link
  page.tsx                Home page
  globals.css             All styles, animations, and responsive CSS classes
  error.tsx               Branded error page
  not-found.tsx           404 page
  opengraph-image.tsx     Social share image (auto generated, 1200 x 630 px)
  robots.ts               SEO robots file
  sitemap.ts              SEO sitemap

  rehab/page.tsx          Rehabilitation service page
  strength/page.tsx       Personal training service page
  performance/page.tsx    Sports performance service page
  physio/page.tsx         Physiotherapy service page
  about/page.tsx          About page: team, locations, contact form
  faq/page.tsx            FAQ page
  book/page.tsx           Booking wizard: all state, step navigation, message building
  privacy/page.tsx        Privacy policy
  terms/page.tsx          Terms and conditions

  admin/
    page.tsx              Analytics dashboard (protected)
    _components/          Dashboard only components (chart, date picker, etc.)

  actions/
    contact.ts            Server action: rate limited, sanitised, sends via Resend
    admin.ts              Server action: logout

components/
  layout/
    Navbar.tsx            Fixed nav, auto hides on scroll down
    Footer.tsx            Desktop and mobile footer layouts
    PageShell.tsx         Shared wrapper for all service and utility pages

  ui/                     Small reusable components
    ContactForm.tsx
    CTASection.tsx
    CopyText.tsx
    FAQAccordion.tsx
    FAQBar.tsx
    FeatureGrid.tsx
    LocationMap.tsx
    OpenStatus.tsx
    PricingCards.tsx
    SectionHeader.tsx
    ServiceCrosslinks.tsx
    ServiceTestimonial.tsx

  sections/               Large page level section components
    FAQContent.tsx
    LocationDrawer.tsx
    Marquee.tsx
    ReviewsSection.tsx
    ServiceHero.tsx
    TeamBioModal.tsx

  effects/                Fixed overlays and animation components
    CursorGlow.tsx
    MobileBookingBar.tsx
    ScrollProgress.tsx
    ThemePlayground.tsx   (dev mode only)
    WhatsAppButton.tsx

  booking/                Five step booking wizard
    types.ts
    Step1.tsx through Step5.tsx
    Done.tsx
    StepHeader.tsx

lib/
  site.ts       Business config: contact, locations, hours, social
  team.ts       Coach and staff data
  faqData.ts    All FAQ content, grouped by category
  bookData.ts   Booking wizard data: services, pricing, coaches, time slots
  types.ts      Shared TypeScript interfaces
  styles.ts     Shared form input styles
  adminAuth.ts  Session token signing and verification
  analytics.ts  Vercel Analytics API helpers
  hooks.ts      useScrollLock

public/
  rebuilt-mark.svg     Logo mark
  instagram-pfp.jpg    Instagram profile photo
  shafiq.jpg           Founder photo
  joshua.jpg           Co founder photo
  rnb-logo.png         Rehab and Beyond logo
  rnb-debra.jpg        Rehab and Beyond senior physiotherapist photo
```

---

## Responsive design

The site works on all screen sizes. Breakpoints are at 768px (tablet/mobile) and 480px (small phones). Custom CSS classes handle layout changes:

| Class | Desktop | Mobile |
|---|---|---|
| `.r2` | 2 column grid | 1 column |
| `.r3` | 3 column grid | 1 column |
| `.r4` | 4 column grid | 2 columns |
| `.r6` | 6 column grid | 3 columns |
| `.r-px` | 48px side padding | 20px |
| `.r-h1` | 84 to 108px | 40px |
| `.r-section-h2` | 44 to 48px | 34px |
| `.r-btn-full` | auto width | full width |
| `.r-hide` | visible | hidden |

The mobile booking bar (fixed at the bottom of the screen) is shown only on mobile and hidden on the `/book` and `/admin` pages.

---

## What is not built yet

### Booking and scheduling

**Real booking calendar.** The current flow sends a prefilled WhatsApp or email request. A live calendar integration (Calendly, Acuity, or a custom build) would let clients pick and confirm a slot instantly, without waiting for the studio to reply.

**Online payments.** No payment is collected at the point of booking. Stripe or PayNow integration at checkout would reduce no shows and remove the follow up step for the team.

**Session packages and credits.** Selling blocks of sessions upfront (for example, a 10 session rehab block) with a digital credit balance the client draws down. Requires a database and a basic client account system.

**Waitlist for cancelled slots.** When a session cancels, automatically notify the next client on a waitlist. Keeps the calendar full without manual effort.

### Client experience

**Client portal.** A secure login area where clients can see session history, programme notes, upcoming bookings, and progress data. Requires a database (Supabase or similar) and authentication (Clerk or NextAuth).

**Progress tracking dashboard.** Charts showing strength numbers, sprint times, movement scores, and rehab milestones over time. Particularly valuable for performance and rehab clients who already receive entry and exit testing.

**Automated session reminders.** WhatsApp or email reminders sent 24 hours and 2 hours before a session. Reduces no shows without any manual work from the team. Built on WhatsApp Business API or a service like Twilio.

**Post session feedback.** A short survey sent after each session covering how the body felt and any concerns. Gives coaches early signals before the next visit.

### Marketing

**Blog or resources section.** Articles on rehab protocols, training principles, and injury prevention improve organic search rankings and build the coaches' authority online. A Next.js blog with proper schema markup is straightforward to add.

**Case studies page.** Anonymised client journeys with before and after metrics (ACL return to sport timeline, strength numbers across a block). More persuasive than short testimonials and harder for competitors to replicate.

**Live Instagram feed.** The home page grid currently uses placeholder photos. The Instagram Graph API can pull in real posts automatically and keep the site looking current without manual updates.

**Google Reviews.** Pull live reviews and ratings directly from Google Places so the numbers on the site always reflect the current score without manual editing.

**Referral programme page.** A dedicated page explaining the referral incentive and tracking referral links. Most gym clients come through word of mouth; formalising it usually increases volume.

### Operations

**WhatsApp Business API.** Replace the basic phone link with a proper API integration. Enables automated confirmations, session reminders, programme updates, and a structured inbox rather than messages landing on a personal number.

**Coach availability management.** A simple internal tool or Notion/Airtable integration where coaches mark their availability, feeding directly into the booking calendar. Removes the manual back and forth of confirming slots.

**Physiotherapy intake form.** A structured form for Rehab & Beyond referrals, separate from the general booking wizard. Captures injury details, surgeon or GP notes, and consent upfront so the first appointment can be fully clinical from the start.

**Email marketing.** A newsletter or programme announcement list for existing clients. Resend (already in use for contact form emails) supports audience lists, so no new tool is needed.
