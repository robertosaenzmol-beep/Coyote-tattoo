import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://coyote-tattoo.vercel.app',
  integrations: [tailwind(), sitemap()],
  output: 'hybrid',
  adapter: vercel(),
});
