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
/content        — per-site content source (namche, tashi, nima, pema)
/docs/examples  — per-agent env + host config examples
/docs/deploy    — launchctl template
/server        — host-based Hono gateway (static serving + webhooks)
```

`namche.ai` itself serves only `/`.
Gateway behavior can be host-based multi-site or one-site-per-machine via config.

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
- Tailwind CSS (styling for `src/` pages/components)
- Hono (single gateway server in `server/` for host-based static serving + webhooks)
- Deployment: TBD
- Domain: namche.ai
- Unified runner: `npm run dev -- --target namche` or `npm start -- --target gateway`

## Tone

- Clear, calm, direct
- No marketing speak
- No pathos, no emojis
- Substance over style

## Files

- `docs/STYLEGUIDE.md` — colors, typography, logo construction
- `docs/examples/` — env and host-config examples per agent
- `docs/deploy/` — launchctl templates
- `docs/logos/` — SVG logos (symbol, wordmark, favicon, tashi)
- `content/` — content for all sites
- `src/` — Astro renderer source (shared templates/layouts)
- `server/` — host-based Hono gateway
