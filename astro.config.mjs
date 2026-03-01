import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.ASTRO_SITE ?? 'https://greenlightapprovals.io',
  base: process.env.ASTRO_BASE ?? '/',
  integrations: [react(), sitemap()],
  output: 'static',
  server: {
    port: 4173,
    strictPort: false,
  },
});
