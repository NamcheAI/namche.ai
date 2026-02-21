# AGENTS.md — namche.ai

## Project

namche.ai is the central hub for Jodok Batlogg's AI work.
Named after Namche Bazaar, the gateway to the Himalayas.

## Language

Everything in this project is in English. Code, content, documentation, commit messages.

## Principles

Buddhist-inspired, not religious:

- **Mindfulness** — act deliberately, don't just react
- **Cause and effect** — understand, don't blame
- **Reduction of noise** — less is clearer
- **Beginner's mind** — stay open, even to the familiar
- **Right action** — be useful without causing harm

## Brand

Follows the Mycelia brand system (see docs/STYLEGUIDE.md).
Color palette: Slate (primary) + Amber (secondary).
Logos built on the 3x3 block grid. Fonts: Inter / Ginto Nord / Space Mono.

## Structure

```
/              — main homepage, overview
/agents        — isolated agent runtimes (tashi, nima, pema)
```

`namche.ai` itself serves only `/`.
Each agent serves its own website from its own machine/runtime.

## Git Workflow

1. Always `git pull origin main` before starting work
2. Create a feature branch with `codex/` prefix (`git checkout -b codex/<branch-name>`)
3. Once a task is completed, commit and push to the branch
4. Open or update a pull request on GitHub (`gh pr create`)
5. Jodok reviews, requests changes, and leaves comments as needed
6. Address review feedback on the same `codex/` branch and push updates
7. Merge to `main` only after Jodok explicitly approves the PR

Never commit directly to main.

## Development

Use OpenAI Codex on the local machine for coding tasks.
All completed work must go through the `codex/` branch and PR workflow above.

## Technology

- Astro (static site generator for `namche.ai` main page)
- Hono (agent runtimes in `agents/*`)
- Deployment: TBD
- Domain: namche.ai
- Unified runner: `npm run dev -- --target <namche|tashi|nima|pema>`

## Tone

- Clear, calm, direct
- No marketing speak
- No pathos, no emojis
- Substance over style

## Files

- `docs/STYLEGUIDE.md` — colors, typography, logo construction
- `docs/AGENT_RUNTIME.md` — runtime model and webhook-proxy boundaries
- `logos/` — SVG logos (symbol, wordmark, favicon, tashi)
- `src/` — Astro source (pages, layouts, components, styles)
- `agents/` — per-agent Hono runtimes and static homepages
