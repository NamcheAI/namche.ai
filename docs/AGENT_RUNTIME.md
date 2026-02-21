# Agent Runtime Model

`namche.ai` static pages and all agent static pages are served by one Hono gateway.

## Content-Driven Sites

All website content lives under `content/`:

- `content/namche/site.json`
- `content/tashi/site.json`
- `content/nima/site.json`
- `content/pema/site.json`

Astro uses one shared renderer (`src/`) and builds four distinct static outputs via `NAMCHE_SITE`.

## Build

```bash
npm run build:sites
```

Build outputs:

- `dist/sites/namche`
- `dist/sites/tashi`
- `dist/sites/nima`
- `dist/sites/pema`

## Gateway

Single Hono runtime (`server/index.mjs`) provides:

- host-based static serving
- webhook proxy endpoint: `POST /webhooks/:source`

Config options:

- `server/hosts.config.json` (multi-host mapping)
- `agents/<agent>/host.config.json` (single-agent deployment)

## launchctl

Single template for all agents:

- `agents/deploy/ai.namche.agent.plist.template`

Replace:

- `__WORKDIR__` with absolute repo path
- `__AGENT__` with `tashi`, `nima`, or `pema`
