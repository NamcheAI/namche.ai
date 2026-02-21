# Shared Agent Runtime

Shared Hono runtime code used by all agent services.

- `src/runtime.ts` provides `startAgentRuntime(...)`
- per-agent entrypoints in `agents/*/src/index.ts` only set `agentId`

This keeps route behavior and webhook handling identical across Tashi, Nima, and Pema.
