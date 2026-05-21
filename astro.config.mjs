// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.basiq.work',

  redirects: {
    '/topiq': { status: 301, destination: 'https://gettopiq.ai' },
    '/epiq': { status: 301, destination: '/' }
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