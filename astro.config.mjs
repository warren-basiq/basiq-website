// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.basiq.work',

  // Mirrored as real 301s in vercel.json — on a static build these compile to
  // meta-refresh stubs, which Google treats as a weaker soft redirect. Vercel's
  // config redirects run ahead of the filesystem, so prod serves a true 301.
  redirects: {
    '/topiq': { status: 301, destination: 'https://gettopiq.ai' },
    '/musal': { status: 301, destination: 'https://www.musal.ai' },
    '/epiq': { status: 301, destination: '/' },

    // Qenerate was renamed to Qindle.
    '/qenerate': { status: 301, destination: '/products/qindle' },

    // Vanity paths, so a bare product name in a deck or an email resolves.
    '/fabriq': { status: 301, destination: '/products/fabriq' },
    '/qindle': { status: 301, destination: '/products/qindle' },

    // LaneScout was retired as a product line. Both its vanity path and its
    // product page point at the hub; nothing in the suite replaces it.
    '/lanescout': { status: 301, destination: '/products' },
    '/products/lanescout': { status: 301, destination: '/products' },

    // The five "What we do" pages were retired when Solutions became a set of
    // persona pages. Nothing in the new IA maps to them one-to-one.
    '/ai-strategy': { status: 301, destination: '/' },
    '/engineering': { status: 301, destination: '/' },
    '/go-to-market': { status: 301, destination: '/' },
    '/operations': { status: 301, destination: '/' },
    '/business-applications': { status: 301, destination: '/' }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    // Exclude only the llms.txt endpoints, which are not HTML pages. The
    // podcast and episode pages now canonical to basiq.work (see
    // PODCAST_CANONICAL_ORIGIN in src/lib/podcast.ts), so they belong in the
    // sitemap. Any episode also published on gettopiq.ai needs its canonical
    // dropped there, or the two sites compete for the same queries.
    sitemap({
      filter: (page) => !page.includes('/llms')
    })
  ]
});