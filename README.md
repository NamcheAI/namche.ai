# namche.ai

Central hub for Jodok Batlogg's AI work.

## Architecture

- `src/layouts/` -> shared Astro layouts
- `src/components/pages/` -> per-site Astro page content (`namche`, `tashi`, `nima`, `pema`)
- `src/pages/` -> entry routes (`/` and `/agents/<site>`)
- `server/` -> single Hono gateway (host-based static serving + webhooks)
- `docs/examples/` -> per-agent env + host config examples
- `docs/deploy/` -> launchctl template

## Quick Start

Install dependencies:

```bash
npm install
```

Run any site in dev mode:

```bash
npm run dev -- --target namche --site namche
npm run dev -- --target namche --site tashi
```

In dev mode, preview individual site pages at:

- `/agents/namche`
- `/agents/tashi`
- `/agents/nima`
- `/agents/pema`

Build all four static sites:

```bash
npm run build:sites
```

Run gateway:

```bash
npm start -- --target gateway
```

## Site Selection

`NAMCHE_SITE` selects which Astro page is rendered at `/` during a build/run:

- `namche`
- `tashi`
- `nima`
- `pema`

Examples:

```bash
npm run build:namche -- --site tashi
npm run build:namche -- --site pema
```

## launchctl (Single Template)

Template:

- `docs/deploy/ai.namche.agent.plist.template`

Replace placeholders:

- `__WORKDIR__` -> absolute repo path
- `__AGENT__` -> `tashi`, `nima`, or `pema`
- `__ENV_FILE__` -> absolute path to runtime env file
- `__HOST_CONFIG__` -> absolute path to gateway host config file

Create concrete plist:

```bash
cp docs/deploy/ai.namche.agent.plist.template docs/deploy/ai.namche.<agent>.plist
```

Install in user space:

```bash
cp docs/deploy/ai.namche.<agent>.plist ~/Library/LaunchAgents/
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/ai.namche.<agent>.plist
```
