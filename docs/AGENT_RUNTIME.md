# Agent Runtime Model

`namche.ai` serves only the main homepage.

All agent runtimes live in this repository under `agents/`, each in its own isolated subdirectory:

- `agents/tashi`
- `agents/nima`
- `agents/pema`

Each agent is deployed and served independently on its own machine.

## Webhook Proxy

Each agent machine runs its own local webhook proxy service using Hono.

Responsibilities:

- terminate incoming webhook requests
- verify shared secrets and provider signatures
- normalize/route events to the local agent runtime
- isolate failures per agent (no shared runtime blast radius)

Default per-agent routes:

- `/webhooks/github`
- `/webhooks/hubspot`
- `/webhooks/krisp`

Each agent keeps its own:

- `.env` with webhook secrets and tokens
- TLS cert/key configuration
- process supervisor setup (for example `launchd` on macOS)
- logs (`stdout` and `stderr`)

## Deployment Boundaries

- This repo (`namche.ai`) is static main-page only.
- Agent services in `agents/*` handle:
  - agent homepage content
  - agent runtime
  - webhook proxy endpoints
