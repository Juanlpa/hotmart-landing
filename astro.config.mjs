// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://hotmart-landing.vercel.app',
  output: 'static',
  adapter: vercel(),
  integrations: [
    react(),
    sitemap({
      filter: (page) => page !== 'https://hotmart-landing.vercel.app/',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['framer-motion'],
    },
  },
});
