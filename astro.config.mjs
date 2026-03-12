import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.ASTRO_SITE ?? 'https://greenlightapprovals.io',
  base: process.env.ASTRO_BASE ?? '/',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  output: 'static',
  server: {
    port: 4173,
    strictPort: false,
  },
});
