// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
// import node from '@astrojs/node';
import vercel from '@astrojs/vercel';

// const deployEnv = process.env.DEVELOPMENT; // e.g. "vercel" | "node"
// const deployEnv = import.meta.env.DEV; // e.g. "vercel" | "node"
// console.log('deployEnv', deployEnv);

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [vue()],
  // adapter: import.meta.env.DEVELOPMENT ? node({ mode: 'standalone' }) : vercel(),
  // adapter: node({ mode: 'standalone' }),
  adapter: vercel(),
  output: 'static',
});