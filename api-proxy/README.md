# API Proxy

Hono service for `api.namche.ai`.

Purpose:
- receive external webhooks
- route by agent path (`/webhooks/:agent/:source`)
- forward to agent hosts over Tailscale

## Config

Default config file:

- `api-proxy/routes.config.json`

Override with env:

- `NAMCHE_PROXY_CONFIG=/path/to/routes.config.json`

Schema:

```json
{
  "listen": { "host": "0.0.0.0", "port": 8787 },
  "agents": {
    "tashi": {
      "targetBaseUrl": "http://100.64.0.11:8787",
      "ingressSecretEnv": "WEBHOOK_SECRET_TASHI_IN",
      "forwardSecretEnv": "WEBHOOK_SECRET_TASHI_OUT",
      "timeoutMs": 15000
    }
  }
}
```

- `ingressSecretEnv` (optional): expected `x-webhook-secret` for incoming webhook.
- `forwardSecretEnv` (optional): set `x-webhook-secret` sent to the target agent.
- `timeoutMs` (optional): forward timeout per agent.

## Endpoints

- `GET /healthz`
- `POST /webhooks/:agent/:source`

## Run

```bash
npm start -- --target api-proxy
```
