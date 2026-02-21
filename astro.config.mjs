// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  outDir: process.env.NAMCHE_OUT_DIR ?? './dist',
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['thame.silverside-mermaid.ts.net'],
    },
  },
});
