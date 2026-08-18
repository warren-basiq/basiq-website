# Basiq Website

Astro marketing site for Basiq (basiq.work), backed by Sanity CMS and Cloudinary for media.

## Stack

- **Framework:** Astro 6, no UI framework islands
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`), `@theme` tokens in `src/styles/global.css`
- **CMS:** Sanity 5 (studio at `/studio`)
- **Media:** Cloudinary

`react`, `react-dom`, and `styled-components` are still dependencies **only because the
Sanity studio needs them**. There is no `@astrojs/react` integration and no `.tsx` in
`src/`. Do not add a React island without a reason that plain Astro cannot cover.

## Commands

- `npm run dev` — Astro dev server
- `npm run build` — production build
- `npm run studio` — Sanity studio
- `npm run preview` — preview built site
- `npm run check:copy` — fails if an em dash appears anywhere in `src/`

## Design system — Deep Forest

**Shared with musal.ai.** Tokens are ported verbatim from
`kalibrate-website/src/styles/global.css` (that repo is Musal; the directory keeps the old
Kalibrate name). If a token changes in one repo, change it in the other.

Use the semantic Tailwind utilities (`bg-forest`, `text-heading`, `border-line`,
`font-display`, `font-mono`). Avoid arbitrary values like `bg-[#234136]` when a semantic
class exists.

- **Type:** DM Serif Display (`font-display`) for every heading, Fraunces (the default body
  face) for paragraphs, JetBrains Mono (`font-mono`) for eyebrows, labels, and buttons.
  Headings are **never** `font-bold` — the display face carries the weight. `font-semibold`
  on an inline `<span>` is fine; that is emphasis, not a heading.
- **Surfaces, ascending:** `bg-ivory` `#FCFBF8` is the page canvas and should dominate;
  `bg-stone` `#F5F1EA` is the alternate/inset section; `bg-paper` `#FFFFFF` is reserved for
  raised content (cards, panels, menus).
- **Brand:** `bg-forest` `#234136`, hover `#1C352D`. Reserve it for primary actions, the
  footer, and *one* full-width reset band per page. Most headings stay near-neutral
  `text-heading` `#252525`.
- **Text:** `text-heading` for headings, `text-body` `#57554F` for paragraphs, `text-muted`
  `#6F6C65` for metadata. On dark: `text-on-dark`, `text-on-dark-muted`.
- **Accents, kept quiet:** `sage` `#899083` for decorative shapes only, never with white
  text on it. `gold` `#D4A83F` for small emphasis only (stat metrics, step numerals, active
  markers). Gold only clears AA on dark, so it is never a text color on ivory.
- **Boundaries:** `border-line` `#E3DED5` is decorative and must never be the sole boundary
  of a control. Use `border-control` `#918D84` where the outline identifies a control.
- **Buttons:** exactly two. Primary = `rounded-full bg-forest text-white hover:bg-forest-hover`.
  Secondary = `rounded-full border border-forest bg-transparent text-forest hover:bg-stone`.
  No gradients.
- **Cards:** `rounded-2xl border border-line bg-paper` with `shadow-soft`/`shadow-lift`. On a
  forest band, cards step up to `bg-forest-raised` with `border-line-dark`.
- **Alignment:** narrative sections (the problem, how Basiq helps) are left-aligned; index
  and transition sections (built for your role, closing CTA) are centered.

**This overrides the global CLAUDE.md typography rule** (Plus Jakarta Sans + Inter for SaaS
marketing sites). Basiq is deliberately in the Musal family instead. Do not "fix" it back.

## Copy rules

**No em dashes. Ever.** The `—` character must not appear anywhere in `src/`: not in page
copy, headlines, meta descriptions, `<title>` tags, llms content, or code comments. Rewrite
the sentence rather than swapping the glyph:

- Two independent clauses → two sentences, or a semicolon.
- A trailing clarification → a comma.
- Introducing a list or restatement → a colon.
- A parenthetical aside → real parentheses.

En dashes (`–`) are allowed **only** in numeric ranges (`10–15%`). `npm run check:copy`
enforces this. It cannot see Sanity content, so blog excerpts and episode summaries need
the same care by hand in the studio.

## Site / SEO

- **Live host:** `https://www.basiq.work` (use `www` for canonical, sitemap, JSON-LD)
- Apex `basiq.work` redirects to `www`
- `/topiq` → `https://gettopiq.ai` (301)
- The five retired "What we do" pages (`/ai-strategy`, `/engineering`, `/go-to-market`,
  `/operations`, `/business-applications`) 301 to `/`. Redirects live in **both**
  `astro.config.mjs` and `vercel.json`; Vercel serves the real 301, Astro's are meta-refresh
  stubs. Keep the two lists in sync.
- Always follow the **New Web Page Checklist** in global CLAUDE.md when adding pages
- Audit log lives in `WEBSITE-AUDIT.md`

## Information architecture

- **Solutions** is a persona menu, not a service menu. Audiences live in
  `src/lib/personas.ts` and render through `src/components/RolePage.astro`. Adding a persona
  means a registry entry, a page, and a `site-pages.ts` entry.
- **Products** come from `src/lib/products.ts`, which drives the nav dropdown, footer,
  homepage grid, and `/products` hub.

## Page structure

The homepage follows musal.ai's section order: centered hero with a large visual, a
left-aligned problem section whose visual alternates sides, a stone-inset "how it works"
band of numbered cards each with a visual, the Deep Forest products band, a persona tab
panel, social proof, and a centered CTA.

Persona and product pages both follow the **Topiq solutions-page shape**, via
`RolePage.astro` and `ProductPage.astro`: a left-aligned hero with a pill badge, a three-up
grid of illustrated problem cards, a feature grid, a Deep Forest stats band, and a CTA with
pill links across to the sibling pages. The two components deliberately mirror each other;
change one and consider the other. Their problem illustrations come from the shared
`ProblemIllustration.astro`, whose three indexes carry fixed meanings.

`ProductPage` takes `stats` as optional. Omit it rather than inventing numbers: Qindle
currently ships without the stats band for exactly that reason. Both components expose an
`after-hero` slot for a video or screenshots, and `ProductPage` has a default slot before
the CTA for page-specific sections (LaneScout uses it for its audiences and comparison
table).

## Product visuals

Every visual on the homepage and `/products/qindle` is a same-origin static HTML file in
`public/mocks/`, rendered in an `<iframe>` and sized by two scripts in `index.astro`
(`/products/qindle` carries its own copy of the scaling one): `.mock-frame` scales a
fixed-width mock into its column, and `iframe.fluid-frame` measures the mock's `.stage`
element and grows the frame to fit.

The homepage hero and both persona panels show **Qindle**, in `qindle-focus.html`,
`qindle-deals.html`, and `qindle-customers.html`. The problem and step visuals are **still
Musal's mocks, used as placeholders, and show the wrong product.** `public/mocks/README.md`
lists what each remaining slot should eventually show.

## Podcast

Selling AI lives at `/podcast` with episode pages at `/episode/[slug]`, both fed by the
`podcast` and `episode` Sanity schemas.

**basiq.work is the canonical home for the show.** `PODCAST_CANONICAL_ORIGIN` in
`src/lib/podcast.ts` is `SITE_URL`, and both pages are in the sitemap. Episodes 1 to 28
were first published on gettopiq.ai at `/selling-ai-podcast`. **Any episode republished
here must have its canonical dropped on gettopiq.ai**, or the two sites compete for the
same episode queries and Search Console flags the duplicate.

### Publishing an episode

Episodes are Sanity documents, not files. The repeatable path:

1. Draft the document as `sanity/content/episode-<guest-slug>.json` (see
   `episode-chris-gray.json` for the shape). The **copy rules below apply to Sanity
   content too**, and `npm run check:copy` cannot see it.
2. Import it: `npx sanity documents create sanity/content/episode-<guest-slug>.json --replace`
3. `npm run build` to confirm the page generates at `/episode/<slug>`.

Field notes that are easy to get wrong:

- `takeaways` render twice: as a bullet list on the episode page **and** as small pills on
  `/podcast` (first three only). Keep each one under about 70 characters or the pills wrap
  badly.
- `summary` is a full paragraph. `metaDescription()` in `src/lib/podcast.ts` truncates it
  for the `<meta>` tag, so do not pre-shorten it.
- `chapters` entries need a `_key`. Sanity array items without one break the studio editor.
- Leave `youtubeId`, `applePodcastsUrl`, and `spotifyUrl` null until the episode is live.
  The page falls back to the show-level platform links.
- To stage an episode instead of publishing it, prefix `_id` with `drafts.`. Draft
  documents are invisible to the build, so no page is generated until you publish in the
  studio.

## Discoverability files (llms.txt) — generated, registry-driven

- **Sitemap:** generated by the `@astrojs/sitemap` integration (`/sitemap-index.xml`); it
  auto-discovers routes and is filtered to exclude the `/llms*` endpoints and the podcast
  pages. No manual sitemap maintenance.
- **llms.txt / llms-full.txt:** generated at build time (no static copies in `public/`).
  Source of truth is the `sitePages[]` registry in `src/lib/site-pages.ts`; blog posts are
  pulled from Sanity via `src/lib/site-dynamic.ts`; endpoints are `src/pages/llms.txt.ts` and
  `src/pages/llms-full.txt.ts`. Both derive their sections from the registry, so a new page
  needs no edit to either endpoint.

**When you add, remove, or rename a page, or change positioning / offerings, update
`src/lib/site-pages.ts` and delegate to the `llms-and-sitemap-maintainer` subagent**
(`.claude/agents/llms-and-sitemap-maintainer.md`) to verify the output. A PostToolUse hook
flags any `src/pages/**` route missing from the registry. For any SEO-affecting change, run
the `seo-best-practices` subagent before committing.

## Sanity

- Config: `sanity.config.ts`, schemas under `sanity/schema/` (`post`, `podcast`, `episode`)
- Studio runs locally via `npm run studio`
- Every page degrades to an empty state when Sanity is unreachable, so a build never fails
  because the CMS is down. Keep that property when adding fetchers.
