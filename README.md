# namche.ai

Central hub for Jodok Batlogg's AI work.

This repository now contains only the Astro site generator for:

- `namche`
- `tashi`
- `nima`
- `pema`

Webhook proxy functionality was moved to:

- `https://github.com/NamcheAI/webhook-proxy`

## Architecture

- `src/layouts/` -> shared Astro layouts
- `src/components/pages/` -> per-site Astro page content
- `src/pages/` -> routes (`/` and `/agents/<site>`)
- `scripts/build-sites.mjs` -> builds all four static sites

## Quick Start

Install dependencies:

```bash
npm install
```

Run dev for a specific site:

```bash
npm run dev -- --site namche
npm run dev -- --site tashi
```

Build all sites:

```bash
npm run build:sites
```

Build one site:

```bash
npm run build:site -- --site pema
```

Preview a built site:

```bash
npm start
```

## Site Selection

`NAMCHE_SITE` selects which site is rendered at `/` during dev/build.
