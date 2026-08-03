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

| Branch | Purpose | URL |
|--------|---------|-----|
| `main` | Live / public site | [rebuilt.vercel.app](https://rebuilt.vercel.app) |
| `dev`  | In-progress work  | Preview URL per push |

Work on `dev`, merge to `main` when ready to go live.

## Project structure

```
app/               Next.js App Router pages
  page.tsx         Home
  rehab/           Rehab service page
  strength/        Personal training page
  performance/     Sports performance page
  physio/          Physiotherapy (coming soon)
  about/           About + contact
  book/            Booking flow
  privacy/         Privacy policy
  terms/           Terms of service
components/
  Navbar.tsx       Sticky responsive navbar
  Footer.tsx       Site footer
  ImagePlaceholder.tsx  Photo placeholder (swap in real images)
  booking/         Multi-step booking components
public/
  logo.jpeg        Rebuilt logo
```

## Content to fill in

Search for `[ V-` and `[ H-` and `[ T-` and `[ R-` across the pages — these are placeholder tokens from the original design that need real copy, prices, and photos.

Key items:
- Session prices (`[ V-07 ]` through `[ V-73 ]`)
- Coach names (`[ H-41 ]`, `[ H-42 ]`)
- Studio address (`[ V-30 ]`)
- Hours, contact details (`[ V-31 ]`–`[ V-36 ]`)
- Hero and service photos — swap `<ImagePlaceholder>` for `<Image>` once photos are ready
- Google reviews (3 review cards on home page)
- Case study data on the Rehab page

## Deployment

Connected to Vercel. Push to `main` to deploy to production, push to `dev` for a preview URL.
