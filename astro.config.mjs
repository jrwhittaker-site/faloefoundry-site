// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://jrwhittaker-site.github.io',
  base: '/faloefoundry-site',
  vite: {
    plugins: [tailwindcss()]
  }
});