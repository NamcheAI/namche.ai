# namche.ai

Central hub for Jodok Batlogg's AI work.

## Architecture

- `content/` -> content source for all websites (`namche`, `tashi`, `nima`, `pema`)
- `src/` -> Astro renderer for all sites (selected by `NAMCHE_SITE`)
- `server/` -> single Hono gateway (host-based static serving + webhooks)
- `agents/` -> per-agent runtime config (`.env`, host config, launchctl)

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

Build all four static sites:

```bash
npm run build:sites
```

Run gateway:

```bash
npm start -- --target gateway
```

## Content Model

Each site has one markdown content file:

- `content/namche/site.md`
- `content/tashi/site.md`
- `content/nima/site.md`
- `content/pema/site.md`

Astro builds one static site per content folder into:

- `dist/sites/namche`
- `dist/sites/tashi`
- `dist/sites/nima`
- `dist/sites/pema`

## launchctl (Single Template)

Template:

- `agents/deploy/ai.namche.agent.plist.template`

Replace placeholders:

- `__WORKDIR__` -> absolute repo path
- `__AGENT__` -> `tashi`, `nima`, or `pema`

Then install in user space:

```bash
cp agents/deploy/ai.namche.<agent>.plist ~/Library/LaunchAgents/
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/ai.namche.<agent>.plist
```
