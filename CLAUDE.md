# Basiq Website

Astro marketing site for Basiq (basiq.work), backed by Sanity CMS and Cloudinary for media.

## Stack

- **Framework:** Astro 6 + React 19
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **CMS:** Sanity 5 (studio at `/studio`)
- **Media:** Cloudinary
- **Animation:** Framer Motion

## Commands

- `npm run dev` — Astro dev server
- `npm run build` — production build
- `npm run studio` — Sanity studio
- `npm run preview` — preview built site

## Site / SEO

- **Live host:** `https://www.basiq.work` (use `www` for canonical, sitemap, JSON-LD)
- Apex `basiq.work` redirects to `www`
- `/topiq` → `https://gettopiq.ai` (301)
- Always follow the **New Web Page Checklist** in global CLAUDE.md when adding pages (SEO meta, OG, Twitter card, JSON-LD, audit entry, nav links)
- Audit log lives in `WEBSITE-AUDIT.md`

## Typography

Uses the standard SaaS font system (Plus Jakarta Sans + Inter) per global CLAUDE.md. Never substitute system fonts.

## Sanity

- Config: `sanity.config.ts`, schemas under `sanity/`
- Studio runs locally via `npm run studio`
