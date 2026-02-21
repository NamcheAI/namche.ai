# Agents

Per-agent runtime configuration for the shared Hono gateway.

Each agent folder contains:

- `.env.example`
- `host.config.json.example`

The gateway can run with one shared host map (`server/hosts.config.json`) or one per-agent host config (`agents/<agent>/host.config.json`).

## Single launchctl Template

Template:

- `agents/deploy/ai.namche.agent.plist.template`

Replace:

- `__WORKDIR__` with absolute repo path
- `__AGENT__` with `tashi`, `nima`, or `pema`

Then save as:

- `agents/deploy/ai.namche.<agent>.plist`
