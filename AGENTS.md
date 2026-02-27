# AGENTS.md — namche.ai

## Project

namche.ai is the central hub for Jodok Batlogg's AI work.
Named after Namche Bazaar, the gateway to the Himalayas.

## Language

Everything in this project is in English: code, content, docs, commit messages.

## Principles

Buddhist-inspired, not religious:

- **Mindfulness** — act deliberately, don't just react
- **Cause and effect** — understand, don't blame
- **Reduction of noise** — less is clearer
- **Beginner's mind** — stay open, even to the familiar
- **Right action** — be useful without causing harm

## Brand

Follows the Mycelia brand system (`docs/Mycelia Styleguide v0.1.pdf`).
Color palette: Slate (primary) + Amber (secondary).
Logos built on the 3x3 block grid. Fonts: Inter / Ginto Nord / Space Mono.
Current UI direction: geometric, whitespace-heavy, minimal.

## Scope

This repository contains only the Astro static site generator for:

- `namche.ai`
- `tashi.namche.ai`
- `nima.namche.ai`
- `pema.namche.ai`

Webhook proxy is maintained separately:

- `https://github.com/NamcheAI/webhook-proxy`

## Structure

- `src/sites/` — one Astro file per site (metadata + content)
- `src/layouts/Base.astro` — shared page shell
- `src/styles/global.css` — shared CSS design system
- `public/favicons/` — per-site SVG favicons
- `scripts/build-sites.mjs` — build all four sites into `dist/sites/<site>`
- `.github/workflows/deploy.yaml` — CI deploy workflow to `bertrand.batlogg.com`
- `docs/Mycelia Styleguide v0.1.pdf` — design and brand system
- `docs/logos/` — logo assets

## GitHub Operations

This section is intended to be reusable across repositories.

### Branching

1. Always `git pull origin main` before starting work.
2. Create a feature branch with prefix `codex/`.
3. Never commit directly to `main`.

### Commit Messages

Use Conventional Commits format for every commit:

- `type(scope): summary`
- Example: `feat(site): add per-site favicon routing`
- Allowed types: `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `build`, `ci`, `chore`

### Pull Requests

1. Push to the feature branch.
2. Open or update a PR.
3. Address review feedback on the same branch.
4. Merge immediately after explicit `ack`/approval.

### Post-Merge

1. Watch the deployment workflow run.
2. Confirm success in the PR thread/chat response.

## Development

- Dev server: `npm run dev -- --site namche`
- Build all sites: `npm run build:sites`
- Build single site: `npm run build:site -- --site tashi`
- Preview build: `npm start`
- Note: `/agents/*` preview routes are dev-only and excluded from production builds.

## Deployment

On each push/merge to `main`, GitHub Actions builds all sites and deploys via SSH/rsync to:

- `/var/www/html/namche.ai`
- `/var/www/html/tashi.namche.ai`
- `/var/www/html/nima.namche.ai`
- `/var/www/html/pema.namche.ai`

Target directories must already exist and be writable by the deploy user.

Required GitHub secrets:

- `DEPLOY_SSH_KEY`

Required GitHub variables:

- `DEPLOY_KNOWN_HOSTS`

## Tone

- Clear, calm, direct
- No marketing speak
- No pathos, no emojis
- Substance over style
