# Agent Runtime Model

`namche.ai` static pages and all agent static pages are served by one Hono gateway.

Agent content/config lives in this repository under `agents/`:

- `agents/tashi`
- `agents/nima`
- `agents/pema`

Deploy modes:

- single machine serving multiple hosts (`namche.ai`, `tashi.namche.ai`, ...)
- one machine per agent using host-specific config (`agents/<agent>/host.config.json`)

## Unified Local Entry Point

Root scripts dispatch to either Astro dev mode or the Hono gateway:

- `npm run dev -- --target namche` -> Astro dev server
- `npm start -- --target gateway` -> Hono gateway

Static build:

- `npm run build:sites`

Target selection precedence:

1. `--target ...`
2. `NAMCHE_TARGET` environment variable
3. `run.config.json` (`target`)
4. default: `namche` for `dev`, `gateway` for `start`

## Webhook Proxy

The Hono gateway exposes host-aware webhook endpoints:

Responsibilities:

- terminate incoming webhook requests
- verify shared secret per mapped host/site
- normalize/route events to downstream automation

Default routes:

- `/webhooks/github`
- `/webhooks/hubspot`
- `/webhooks/krisp`

Configuration:

- `server/hosts.config.json` (multi-host mapping)
- `agents/<agent>/host.config.json` (single-agent host mapping)
- `.env` for webhook secrets and tokens
- user-space `launchctl` templates in `agents/*/deploy`

## Deployment Boundaries

- Astro builds static output (`dist/sites/namche`).
- Agent folders provide static source and host-specific configs.
- One Hono gateway serves static pages by host and handles webhooks.
