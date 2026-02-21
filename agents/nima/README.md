# Nima Agent

Nima static site content and host-specific deployment config for the shared gateway.

## Setup

```bash
cp .env.example .env
cp host.config.json.example host.config.json
```

## Build

From repo root:

```bash
npm run build:sites
```

## Run (Local)

From repo root:

```bash
NAMCHE_HOST_CONFIG=agents/nima/host.config.json npm start -- --target gateway
```

## launchctl Template (User Space)

Template file:

- `deploy/ai.namche.nima.plist.template`

Replace placeholders:

- `__WORKDIR__` -> absolute path to repo root (`namche.ai`)

Create concrete plist:

```bash
cp deploy/ai.namche.nima.plist.template deploy/ai.namche.nima.plist
```

Install in user space:

```bash
cp deploy/ai.namche.nima.plist ~/Library/LaunchAgents/
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/ai.namche.nima.plist
```
