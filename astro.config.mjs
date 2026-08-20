// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
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
    '/lanescout': { status: 301, destination: '/products/lanescout' }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    // Exclude the llms.txt endpoints — they are not HTML pages.
    sitemap({ filter: (page) => !page.includes('/llms') })
  ]
});