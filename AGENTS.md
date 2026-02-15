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
/              — homepage, overview
/tashi         — Tashi Backlogg, Jodok's AI assistant
```

More pages as needed.

## Git Workflow

1. Always `git pull origin main` before starting work
2. Create a feature branch with `tashi/` prefix (`git checkout -b tashi/<branch-name>`)
3. Commit and push to the branch
4. Open a pull request on GitHub (`gh pr create`)
5. Wait for Jodok's approval
6. After approval, merge to main (`gh pr merge --squash`)

Never commit directly to main.

## Development

Use OpenAI Codex (via `sessions_spawn` with `model: codex`) for coding tasks.
Spawn a sub-agent with the coding task, let it work on the branch, then review and PR.

## Technology

- Astro (static site generator)
- Deployment: TBD
- Domain: namche.ai
- Dev server: `npx astro dev --host 0.0.0.0 --port 4321`

## Tone

- Clear, calm, direct
- No marketing speak
- No pathos, no emojis
- Substance over style

## Files

- `docs/STYLEGUIDE.md` — colors, typography, logo construction
- `logos/` — SVG logos (symbol, wordmark, favicon, tashi)
- `src/` — Astro source (pages, layouts, components, styles)
