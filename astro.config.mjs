// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vue from '@astrojs/vue';
import vercel from '@astrojs/vercel';

export default defineConfig({
  devToolbar: { enabled: false },
  integrations: [vue({ appEntrypoint: '@/lib/VueQueryPlugin.ts' })],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'server',
  adapter: vercel(),
});
