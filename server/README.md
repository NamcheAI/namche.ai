# Gateway Server

Single Hono server that:

- serves static sites by `Host` header
- handles webhook proxy endpoints (`/webhooks/:source`)

## Config

Default config path:

- `server/hosts.config.json`

Override config path:

- `NAMCHE_HOST_CONFIG=/path/to/config.json`

Config schema:

```json
{
  "listen": { "host": "0.0.0.0", "port": 8443 },
  "defaultSite": "namche",
  "sites": {
    "namche": {
      "hosts": ["namche.ai", "www.namche.ai"],
      "staticDir": "dist/sites/namche",
      "webhookSecretEnv": "WEBHOOK_SECRET_NAMCHE"
    }
  }
}
```

`webhookSecretEnv` is optional. If set and env var exists, `x-webhook-secret` must match.

## Build + Run

```bash
npm run build:sites
npm start -- --target gateway
```
