# Agents

Each agent has its own isolated runtime in this directory.

- `tashi` (`agents/tashi`)
- `nima` (`agents/nima`)
- `pema` (`agents/pema`)

All three use Hono, serve their own static homepage, and expose local webhook proxy endpoints.

## Agent Docs

- `agents/tashi/README.md`
- `agents/nima/README.md`
- `agents/pema/README.md`

## Routes

Each agent runtime exposes:

- `GET /healthz`
- `POST /webhooks/:source`
- static homepage from `public/`

## Run

```bash
cd agents/<agent>
npm install
cp .env.example .env
npm run dev
```

Environment variables:

- `PORT` (default: `8443`)
- `WEBHOOK_SECRET` (optional header check against `x-webhook-secret`)

## launchd Templates

- `agents/tashi/deploy/ai.namche.tashi.plist.template`
- `agents/nima/deploy/ai.namche.nima.plist.template`
- `agents/pema/deploy/ai.namche.pema.plist.template`
