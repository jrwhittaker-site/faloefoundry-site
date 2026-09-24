// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://faloefoundry.com',
  integrations: [sitemap()],
  build: {
    // Emit every script and stylesheet as its own file rather than inlining any
    // of them. That keeps the pages free of inline <script> and <style>
    // elements, which lets the Content Security Policy in Layout.astro use a
    // strict script-src of 'self' with no hashes or 'unsafe-inline'.
    // The matching script setting is vite.build.assetsInlineLimit below.
    inlineStylesheets: 'never'
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // 0 stops small bundled scripts from being inlined into the HTML, which
      // would otherwise be blocked by the script-src 'self' policy
      assetsInlineLimit: 0
    }
  }
});
