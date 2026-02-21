# Agent Runtime Model

`namche.ai` serves only the main homepage.

Agent websites are deployed and served independently on their own machines:

- `tashi` -> own machine, own website, own runtime
- `nima` -> own machine, own website, own runtime
- `pema` -> own machine, own website, own runtime

## Webhook Proxy

Each agent machine runs a local webhook proxy service.

Responsibilities:

- terminate incoming webhook requests
- verify shared secrets and provider signatures
- normalize/route events to the local agent runtime
- isolate failures per agent (no shared runtime blast radius)

Recommended per-agent routes:

- `/webhooks/github`
- `/webhooks/hubspot`
- `/webhooks/krisp`

Each machine should keep its own:

- `.env` with webhook secrets and tokens
- TLS cert/key configuration
- process supervisor setup (for example `launchd` on macOS)
- logs (`stdout` and `stderr`)

## Deployment Boundaries

- This repo (`namche.ai`) is static main-page only.
- Agent repos/services handle:
  - agent homepage content
  - agent runtime
  - webhook proxy endpoints
