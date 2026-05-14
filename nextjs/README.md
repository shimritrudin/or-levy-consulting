# Or Levy — HR Consultant & Career Advisor

Single-page editorial site, ported to Next.js 14 (App Router).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Accept the defaults — Vercel auto-detects Next.js.

That's it. No environment variables required.

## Project structure

```
app/
  layout.js          Root layout — fonts, metadata, global CSS
  page.js            Imports the Site client component
  globals.css        All styles (light editorial palette)
components/
  Site.jsx           Topbar, Hero, Services, Testimonials, About, Contact
  TweaksPanel.jsx    Editor-only design controls (no-op in production)
public/
  image-slot.js      Web component for drag-drop image placeholders
  assets/
    or-portrait.png  Hero portrait
```
