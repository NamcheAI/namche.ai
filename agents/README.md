# Agents

Each agent has its own isolated runtime in this directory.

- `tashi` (`agents/tashi`)
- `nima` (`agents/nima`)
- `pema` (`agents/pema`)

All three use Hono, serve their own static homepage, and expose local webhook proxy endpoints.

## Routes

Each agent runtime exposes:

- `GET /healthz`
- `POST /webhooks/:source`
- static homepage from `public/`

## Run

```bash
cd agents/<agent>
npm install
npm run dev
```

Environment variables:

- `PORT` (defaults: `8443` for tashi, `8444` for nima, `8445` for pema)
- `WEBHOOK_SECRET` (optional header check against `x-webhook-secret`)
