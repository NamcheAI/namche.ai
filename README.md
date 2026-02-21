# namche.ai

Central hub for Jodok Batlogg's AI work.

## Architecture

- `src/` -> Astro source for the main `namche.ai` site
- `agents/` -> per-agent static content and host/env config
- `server/` -> single Hono gateway (host-based static serving + webhooks)

## Quick Start

Install dependencies:

```bash
npm install
```

Run main site in dev mode:

```bash
npm run dev -- --target namche
```

Build all static sites:

```bash
npm run build:sites
```

Run gateway:

```bash
npm start -- --target gateway
```

## Per-Agent Setup

For each agent (`tashi`, `nima`, `pema`):

```bash
cp agents/<agent>/.env.example agents/<agent>/.env
cp agents/<agent>/host.config.json.example agents/<agent>/host.config.json
```

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
