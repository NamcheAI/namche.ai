// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  outDir: process.env.NAMCHE_OUT_DIR ?? './dist',
  vite: {
    server: {
      allowedHosts: ['thame.silverside-mermaid.ts.net'],
    },
  },
});
