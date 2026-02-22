# namche.ai

Central hub for Jodok Batlogg's AI work.

This repository is split into two services:

1. Site Generator (Astro) - builds static output for `namche`, `tashi`, `nima`, `pema`
2. API Proxy (Hono) - runs on `api.namche.ai` and forwards webhooks to agent hosts via Tailscale

## Project Layout

- `src/` -> Astro pages, layouts, and components for all sites
- `scripts/build-sites.mjs` -> loops all site builds into `dist/sites/<site>`
- `api-proxy/` -> Hono webhook proxy service
- `docs/examples/` -> env and proxy config examples
- `docs/deploy/` -> launchctl template

## Quick Start

Install dependencies:

```bash
npm install
```

Run Astro dev for a specific site:

```bash
npm run dev -- --target site-generator --site namche
npm run dev -- --target site-generator --site tashi
```

Build all static sites:

```bash
npm run build:sites
```

Build one site only:

```bash
npm run build:site -- --site pema
```

Run API proxy:

```bash
npm start -- --target api-proxy
```

## API Proxy

Webhook ingress route:

- `POST /webhooks/:agent/:source`

Example:

- `POST https://api.namche.ai/webhooks/tashi/github`

Proxy config:

- default file: `api-proxy/routes.config.json`
- override: `NAMCHE_PROXY_CONFIG=/path/to/routes.config.json`

Use examples:

- `docs/examples/proxy-config/routes.config.json.example`
- `docs/examples/env/api-proxy.env.example`

## launchctl Template

Template:

- `docs/deploy/ai.namche.agent.plist.template`

Replace placeholders:

- `__WORKDIR__` -> absolute repo path
- `__AGENT__` -> service label suffix
- `__ENV_FILE__` -> absolute env file path
- `__PROXY_CONFIG__` -> absolute routes config file path
