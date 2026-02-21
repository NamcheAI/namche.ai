# Agents

Each agent has its own static site content and deployment config in this directory.

- `tashi` (`agents/tashi`)
- `nima` (`agents/nima`)
- `pema` (`agents/pema`)

A single root Hono gateway (`server/index.mjs`) serves static files by host and proxies webhooks.

## Build Static Sites

From repo root:

```bash
npm run build:sites
```

This creates:

- `dist/sites/namche` (Astro build)
- `dist/sites/tashi` (copied from `agents/tashi/public`)
- `dist/sites/nima` (copied from `agents/nima/public`)
- `dist/sites/pema` (copied from `agents/pema/public`)

## Run Gateway

From repo root:

```bash
npm start -- --target gateway
```

Or config-driven defaults via `run.config.json`.

## Agent Files

Each agent folder contains:

- `public/` static content
- `.env.example` webhook/tls env template
- `host.config.json.example` host -> staticDir mapping for the gateway
- `deploy/*.plist.template` launchctl user-space template
